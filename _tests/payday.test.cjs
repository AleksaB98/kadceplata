const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const read = file => fs.readFileSync(path.join(__dirname, "..", file), "utf8");
const html = read("index.html");
const messageScript = read("payday-messages.js");
const pageScript = read("scripts.js");

function makePage(instant, saved = new Map()) {
  const elements = new Map();
  const celebration = new Set();
  let tick;
  let onVisibilityChange;

  class FixedDate extends Date {
    constructor(...args) {
      super(...(args.length ? args : [instant]));
    }
  }

  function element(id) {
    assert.ok(html.includes(`id="${id}"`), `Missing page element ${id}`);
    if (!elements.has(id)) {
      elements.set(id, { textContent: "", hidden: false });
    }
    return elements.get(id);
  }

  const countdown = {
    hidden: false,
    classList: {
      toggle(name, enabled) {
        if (enabled) celebration.add(name);
        else celebration.delete(name);
      },
    },
  };
  element("countdown-tile").content = {
    firstElementChild: {
      cloneNode: () => ({ children: Array.from({ length: 4 }, () => ({ dataset: {} })) }),
    },
  };
  element("countdown-flaps").replaceChildren = (...children) => {
    element("countdown-flaps").children = children;
  };
  Object.assign(element("background-video"), { pause() {}, addEventListener() {} });

  const context = vm.createContext({
    Date: FixedDate,
    document: {
      getElementById: element,
      querySelector(selector) {
        assert.equal(selector, ".countdown");
        return countdown;
      },
      addEventListener(name, listener) {
        assert.equal(name, "visibilitychange");
        onVisibilityChange = listener;
      },
    },
    sessionStorage: {
      getItem: key => saved.get(key) ?? null,
      setItem: (key, value) => saved.set(key, value),
    },
    window: {
      matchMedia: () => ({ matches: true, addEventListener() {} }),
      setInterval(listener) { tick = listener; },
    },
  });
  vm.runInContext(messageScript, context, { filename: "payday-messages.js" });
  vm.runInContext(pageScript, context, { filename: "scripts.js" });

  return {
    element,
    countdown,
    celebration,
    advanceTo(nextInstant, fromVisibilityChange = false) {
      instant = nextInstant;
      (fromVisibilityChange ? onVisibilityChange : tick)();
    },
  };
}

test("the third Serbian working day accounts for Easter and observed holidays", () => {
  const page = makePage("2027-05-01T12:00:00Z");
  assert.equal(page.element("payday-date").dateTime, "2027-05-07");
  assert.equal(page.element("payday-weekday").textContent, "Friday");
  assert.equal(page.element("countdown").textContent, "6");

  page.advanceTo("2026-05-01T12:00:00Z", true);
  assert.equal(page.element("payday-date").dateTime, "2026-05-06");
});

test("an open page rolls over at Belgrade midnight in winter and summer", () => {
  const page = makePage("2026-12-02T22:59:59Z");
  assert.equal(page.element("countdown").textContent, "1");
  page.advanceTo("2026-12-02T23:00:00Z");
  assert.equal(page.element("current-date").dateTime, "2026-12-03");
  assert.equal(page.element("countdown").textContent, "0");
  assert.ok(page.celebration.has("is-payday"));

  page.advanceTo("2026-07-02T21:59:59Z");
  assert.equal(page.element("current-date").dateTime, "2026-07-02");
  page.advanceTo("2026-07-02T22:00:00Z", true);
  assert.equal(page.element("current-date").dateTime, "2026-07-03");
  assert.equal(page.element("countdown").textContent, "0");
});

test("an unconfirmed December payday stays pending through year-end", () => {
  const page = makePage("2026-12-29T12:00:00Z");
  assert.equal(page.element("countdown").textContent, "~0");
  assert.equal(page.element("payday-label").textContent, "Estimated payday");
  assert.ok(!page.celebration.has("is-payday"));

  for (const day of [30, 31]) {
    page.advanceTo(`2026-12-${day}T12:00:00Z`);
    assert.ok(page.countdown.hidden);
    assert.ok(page.element("payday-date").hidden);
    assert.ok(!page.element("payday-pending").hidden);
    assert.ok(!page.element("payday-date-pending").hidden);
    assert.equal(page.element("countdown").textContent, "");
  }

  page.advanceTo("2027-01-01T12:00:00Z");
  assert.ok(!page.countdown.hidden);
  assert.ok(page.element("payday-pending").hidden);
  assert.equal(page.element("payday-date").dateTime, "2027-02-03");
});

test("confirmed December payroll dates are preserved", () => {
  const page = makePage("2025-12-29T12:00:00Z");
  assert.equal(page.element("countdown").textContent, "0");
  assert.ok(page.celebration.has("is-payday"));
  page.advanceTo("2025-12-30T12:00:00Z");
  assert.equal(page.element("payday-date").dateTime, "2026-02-04");
  assert.ok(!page.countdown.hidden);
});

test("successive page loads rotate jokes within the same countdown range", () => {
  const saved = new Map();
  const first = makePage("2026-11-23T12:00:00Z", saved);
  const next = makePage("2026-11-23T12:00:00Z", saved);
  const firstMessage = first.element("payday-message").textContent;
  const nextMessage = next.element("payday-message").textContent;
  assert.ok(firstMessage && nextMessage);
  assert.notEqual(firstMessage, nextMessage);
});
