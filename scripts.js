const DAY_MS = 86_400_000;
const JANUARY = 0;
const DECEMBER = 11;
const DECEMBER_ESTIMATE_DAY = 29;
const announcedDecemberPaydays = new Map([
  [2023, 28],
  [2024, 27],
  [2025, 29],
]);

const belgradeDateFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Belgrade",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const weekdayFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: "UTC",
  weekday: "long",
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function belgradeCalendarDate(now) {
  const parts = Object.fromEntries(
    belgradeDateFormat.formatToParts(now).map(({ type, value }) => [type, value]),
  );

  // Store the Belgrade calendar date at UTC midnight for whole-day arithmetic.
  return new Date(Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day)));
}

function dateToDMY(date) {
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${day}.${month}.${date.getUTCFullYear()}.`;
}

function orthodoxEaster(year) {
  // Calculate Easter in the Julian calendar, then convert it to Gregorian.
  const lunarCorrection = (19 * (year % 19) + 15) % 30;
  const weekdayCorrection = (2 * (year % 4) + 4 * (year % 7) - lunarCorrection + 34) % 7;
  const julianDate = lunarCorrection + weekdayCorrection + 114;
  const month = Math.floor(julianDate / 31);
  const day = julianDate % 31 + 1;
  const calendarOffset = Math.floor(year / 100) - Math.floor(year / 400) - 2;
  return Date.UTC(year, month - 1, day + calendarOffset);
}

function serbianPublicHolidays(year) {
  const stateHolidays = [
    Date.UTC(year, JANUARY, 1),
    Date.UTC(year, JANUARY, 2),
    Date.UTC(year, 1, 15),
    Date.UTC(year, 1, 16),
    Date.UTC(year, 4, 1),
    Date.UTC(year, 4, 2),
    Date.UTC(year, 10, 11),
  ];
  const easter = orthodoxEaster(year);
  const holidays = new Set([
    ...stateHolidays,
    Date.UTC(year, JANUARY, 7),
    easter - 2 * DAY_MS,
    easter - DAY_MS,
    easter,
    easter + DAY_MS,
  ]);

  for (const holiday of stateHolidays) {
    if (new Date(holiday).getUTCDay() !== 0) {
      continue;
    }

    // A Sunday state holiday carries over to the next working day.
    let observed = new Date(holiday + DAY_MS);
    while (!isWorkingDay(observed, holidays)) {
      observed = new Date(observed.getTime() + DAY_MS);
    }
    holidays.add(observed.getTime());
  }

  return holidays;
}

function isWorkingDay(date, holidays) {
  const weekday = date.getUTCDay();
  return weekday !== 0 && weekday !== 6 && !holidays.has(date.getTime());
}

function regularPayday(year, month) {
  const holidays = serbianPublicHolidays(year);
  const date = new Date(Date.UTC(year, month, 1));
  let workingDays = Number(isWorkingDay(date, holidays));
  while (workingDays < 3) {
    date.setUTCDate(date.getUTCDate() + 1);
    workingDays += Number(isWorkingDay(date, holidays));
  }
  return date;
}

function earlyDecemberPayday(year) {
  const announcedDay = announcedDecemberPaydays.get(year);
  const date = new Date(Date.UTC(year, DECEMBER, announcedDay ?? DECEMBER_ESTIMATE_DAY));
  if (announcedDay !== undefined) {
    return { date };
  }

  const holidays = serbianPublicHolidays(year);
  while (!isWorkingDay(date, holidays)) {
    date.setUTCDate(date.getUTCDate() - 1);
  }
  return { date, estimated: true };
}

function nextPayday(today) {
  const year = today.getUTCFullYear();
  const month = today.getUTCMonth();

  if (month === JANUARY) {
    return { date: regularPayday(year, 1) };
  }

  const thisMonth = regularPayday(year, month);
  if (today <= thisMonth) {
    return { date: thisMonth };
  }

  if (month === DECEMBER) {
    const december = earlyDecemberPayday(year);
    if (today <= december.date) {
      return december;
    }
    return { date: december.estimated ? null : regularPayday(year + 1, 1) };
  }

  return { date: regularPayday(year, month + 1) };
}

let displayedDate;

function showDate(dateId, weekdayId, date) {
  const element = document.getElementById(dateId);
  element.dateTime = date.toISOString().slice(0, 10);
  element.textContent = dateToDMY(date);
  document.getElementById(weekdayId).textContent = weekdayFormat.format(date);
}

function setTileValue(tile, digit) {
  const [top, bottom] = tile.children;
  top.dataset.value = digit;
  bottom.dataset.value = digit;
}

async function flipDigit(tile, from, to, halfDuration) {
  if (from === to) {
    return;
  }

  const [top, bottom, outgoing, incoming] = tile.children;
  top.dataset.value = to;
  outgoing.dataset.value = from;
  incoming.dataset.value = to;

  const fold = outgoing.animate([
    { visibility: "visible", transform: "rotateX(0deg)", filter: "brightness(1)", easing: "ease-in" },
    { visibility: "visible", transform: "rotateX(-26deg)", filter: "brightness(0.89)", offset: 0.45 },
    { visibility: "visible", transform: "rotateX(-90deg)", filter: "brightness(0.55)" },
  ], { duration: halfDuration });
  const land = incoming.animate([
    { visibility: "visible", transform: "rotateX(90deg)", filter: "brightness(0.62)", easing: "ease-out" },
    { visibility: "visible", transform: "rotateX(25deg)", filter: "brightness(0.94)", offset: 0.55, easing: "ease-out" },
    { visibility: "visible", transform: "rotateX(0deg)", filter: "brightness(1)" },
  ], { duration: halfDuration, delay: halfDuration });

  await Promise.allSettled([fold.finished, land.finished]);
  bottom.dataset.value = to;
}

async function showCountdown(daysUntilPayday, estimated) {
  const count = document.getElementById("countdown");
  const previousValue = count.textContent;
  const nextValue = `${estimated ? "~" : ""}${daysUntilPayday}`;
  if (previousValue === nextValue) {
    return;
  }
  count.textContent = nextValue;
  document.getElementById("countdown-estimate").hidden = !estimated;

  const flaps = document.getElementById("countdown-flaps");
  const template = document.getElementById("countdown-tile").content.firstElementChild;
  let steps = [daysUntilPayday];
  if (!reducedMotion.matches && typeof flaps.animate === "function") {
    steps = previousValue
      ? [Number(previousValue.replace("~", "")), daysUntilPayday]
      : [3, 2, 1, 0].map(offset => daysUntilPayday + offset);
  }

  const width = Math.max(2, ...steps.map(value => String(value).length));
  const values = steps.map(value => String(value).padStart(width, "0"));
  const tiles = Array.from(values[0], digit => {
    const tile = template.cloneNode(true);
    setTileValue(tile, digit);
    return tile;
  });
  flaps.replaceChildren(...tiles);

  for (let index = 1; index < values.length; index += 1) {
    if (reducedMotion.matches) {
      const finalDigits = values.at(-1);
      tiles.forEach((tile, position) => setTileValue(tile, finalDigits[position]));
      return;
    }
    const halfDuration = index === values.length - 1 ? 135 : 90;
    await Promise.all(tiles.map((tile, position) =>
      flipDigit(tile, values[index - 1][position], values[index][position], halfDuration)
    ));
    if (count.textContent !== nextValue) {
      return;
    }
  }
}

function renderCountdown() {
  const today = belgradeCalendarDate(new Date());
  if (today.getTime() === displayedDate) {
    return;
  }

  const payday = nextPayday(today);
  const pending = payday.date === null;
  const countdown = document.querySelector(".countdown");
  const message = document.getElementById("payday-message");
  const notice = document.getElementById("payday-notice");

  showDate("current-date", "current-weekday", today);
  document.getElementById("payday-label").textContent =
    payday.estimated ? "Estimated payday" : "Next payday";
  document.getElementById("payday-date").hidden = pending;
  document.getElementById("payday-date-pending").hidden = !pending;
  document.getElementById("payday-pending").hidden = !pending;
  countdown.hidden = pending;
  message.hidden = pending;

  notice.textContent = pending
    ? "The estimate has passed. The next regular payday is in February."
    : payday.estimated ? "December payday is an estimate until the employer announces the date." : "";
  notice.hidden = !notice.textContent;
  document.getElementById("payday-summary").hidden = false;
  displayedDate = today.getTime();

  if (pending) {
    document.getElementById("countdown").textContent = "";
    document.getElementById("payday-weekday").textContent = "";
    return;
  }

  const daysUntilPayday = (payday.date - today) / DAY_MS;
  showDate("payday-date", "payday-weekday", payday.date);
  countdown.classList.toggle("is-payday", daysUntilPayday === 0 && !payday.estimated);
  message.textContent = pickPaydayMessage(daysUntilPayday, payday.estimated);
  showCountdown(daysUntilPayday, payday.estimated);
}

function setupBackgroundVideo() {
  const video = document.getElementById("background-video");
  video.defaultPlaybackRate = 0.9;

  function applyMotionPreference() {
    video.hidden = reducedMotion.matches;
    if (reducedMotion.matches) {
      video.pause();
      return;
    }

    if (!video.hasAttribute("src")) {
      video.src = video.dataset.src;
    }
    video.playbackRate = video.defaultPlaybackRate;
    // The countdown works even if autoplay is blocked.
    if (!video.ended) {
      video.play().catch(() => {});
    }
  }

  video.addEventListener("error", () => {
    video.hidden = true;
  });
  reducedMotion.addEventListener("change", applyMotionPreference);
  applyMotionPreference();
}

renderCountdown();
window.setInterval(renderCountdown, 30_000);
document.addEventListener("visibilitychange", renderCountdown);
setupBackgroundVideo();
