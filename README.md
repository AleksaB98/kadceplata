# KadCePlata

A static countdown for an employer that pays on the third Serbian working day of the month. The December salary arrives early, so the schedule skips January. The countdown uses the date in Belgrade.

Serbian public holidays are calculated from recurring rules. Add the employer's confirmed late-December date to `announcedDecemberPaydays` in `scripts.js`. Until a date is confirmed, the estimate is the last working day on or before December 29. If the estimate passes, the site shows that the date is pending through the end of December.

Open `index.html` to preview the site locally. Run the regression tests from the repository root with:

```sh
node --test _tests/payday.test.cjs
```
