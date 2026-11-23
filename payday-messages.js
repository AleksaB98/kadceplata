const paydayMessages = [
  // Payday
  [
    "The only ‘quick sync’ I asked for was between payroll and my bank.",
    "Marked ‘salary received’ as Done. Someone reopened it to ask for a screenshot.",
    "HR says we’re a family. Funny how much better that sounds after the deposit.",
    "I told my wife we got paid. She said, ‘Great. The washing machine’s been making a noise.’",
    "My landlord finally found a company value he can get behind. Direct deposit.",
    "My payslip is a two-act tragedy. The acts are called Gross and Net.",
    "My salary got here before the minutes from last month’s all-hands.",
    "The payslip has a line for everything except the time I spent finding it.",
    "Today’s deposit did more for employee engagement than the last three surveys.",
    "The salary came through. The raise is still in a separate workstream.",
    "I took a screenshot of the deposit for the next time someone asks what motivates me.",
    "My friend paid me back. I’d already filed that dinner under ‘cost of friendship’.",
    "I’ve blocked one minute to enjoy my paycheck. My direct debits accepted the invite.",
    "The kids heard ‘payday’ and started with, ‘Remember when you said maybe?’",
    "Finance approved two fireworks. Please keep the receipt.",
    "Do not spend everything at once please, you were visiting this page a lot recently."
  ],
  // One to three days left, including the day of an estimated payday
  [
    "My boss says we’re in the final stretch. I think we’re looking at different calendars.",
    "You can finally say ‘payday soon’ with a straight face.",
    "I’ve submitted my timesheet. Now it’s somebody else’s turn to make it urgent.",
    "You can close this tab. We’re close enough to trust the calendar.",
    "I’m saving my last bit of enthusiasm for the bank notification.",
    "I’m doing the math for the third time because I like the answer.",
    "The kids asked when they could get ice cream. They can now explain our payroll schedule.",
    "My girlfriend sent me three dinner spots. I sent her the countdown.",
    "The bills I’ve been politely ignoring are about to get a personal reply.",
    "My friend said, ‘I’ve got this.’ I heard, ‘I know when you get paid.’",
    "If you’re down to counting hours, I respect the commitment.",
    "If anticipation paid interest, we’d be set.",
    "Nearly there. I hope payday takes something off your mind.",
    "I’d tell you to be patient, but you’ve clearly done that part.",
  ],
  // Four to seven days left
  [
    "We’re close enough to RSVP ‘yes’ with a straight face.",
    "You’ve entered the ‘ask me again next week’ stage.",
    "The office coffee tastes better the week before payday. ‘Free’ is a surprisingly good flavor.",
    "The bills have been unusually polite about waiting. I suspect a trap.",
    "We’re down to a week. The refresh button can take the afternoon off.",
    "A week is short, unless you’re refreshing a banking app.",
    "My shopping list is currently a wish list with deadlines.",
    "We set a budget for the birthday gift. Then came the taxi, the drinks, and the gift wrap.",
    "‘We’ll figure out the bill later’ is a promise my friends interpret very differently.",
    "If payday had a waiting room, this is where they’d call you to the desk.",
    "My friend promised to pay me back this week. Sunday at 11:59 is doing a lot of work.",
    "I hope the next deposit makes an ordinary thing a little easier.",
    "The spare change is doing its best.",
    "The budget’s fine. Nobody open the school email titled ‘A small contribution’.",
  ],
  // Eight to fourteen days left
  [
    "I checked the calendar. It stands by its decision.",
    "If reopening this page sped things up, we’d all be paid by now.",
    "Our team has a dashboard for everything. Mine has one number and I still refresh it.",
    "The bills are punctual enough to make the paycheck look rude.",
    "Past me bought lentils. Present me understands why.",
    "My girlfriend follows the grocery list. I’m the reason it has a sequel.",
    "I’m looking for hobbies with a generous free tier.",
    "The budget meeting lasted four minutes. We’ll reconvene on payday.",
    "A couple of weeks can feel long. I hope something good turns up in the meantime.",
    "I’ve put the impulse buys on a two-week probation.",
    "A refund would get a hero’s welcome around now.",
    "Today’s lunch is yesterday’s dinner with a different fork.",
    "Here’s to the friend who texts ‘come over’ when the group chat is pricing restaurants.",
    "My husband bought a drill to save on repairs. Its first job was putting up a shelf for his tools.",
    "The company’s webinar on financial stress was at lunchtime. Lunch was on us.",
    "My parents looked at our budget and asked how many kinds of television we needed.",
    "Some days, getting to the end of the day is a perfectly good achievement.",
    "My wishlist has a waiting room.",
    "If this number looks familiar, that’s because it’s still today.",
    "Whoever scheduled the bills and the paycheck clearly works in different departments.",
    "The calculator is right. I’d have preferred a typo.",
    "The group chat says ‘something cheap’. I’d like that in writing.",
    "My kid asked for a raise in allowance and brought market research from the playground.",
    "I checked the price, checked the date, and checked myself.",
    "Somewhere between here and payday is a perfectly good weekend.",
    "I hope your week has at least one surprise that’s free and good.",
    "The most exciting line on my budget right now is ‘carried forward’.",
    "A week and change. The change is in a jar by the door.",
    "We tracked the project in three spreadsheets. My reimbursement is in a fourth one nobody can open.",
    "The calendar is finally showing a number I can say without sighing.",
    "Funny how the friend who ordered three starters suddenly believes in equality.",
    "There’s no prize for checking the balance again. I checked.",
    "Some days all I want from the budget is a quiet evening.",
    "You’ve got time to change your mind about the thing you swore you needed.",
    "Payday is getting closer. So is the expiry date on the yogurt.",
    "A walk with a friend is still a Saturday plan.",
    "I’ve spent all morning trying to make ‘you owe me for dinner’ sound like a casual hello.",
    "I tried asking for a smaller number. It said to come back tomorrow.",
    "We put the dog under ‘miscellaneous’. The dog has since become a major department.",
    "In the meantime, you’re still allowed to enjoy an ordinary Tuesday.",
  ],
  // Fifteen days or more
  [
    "There’s time before payday for a meeting to be canceled, rescheduled, and made weekly.",
    "My bank balance is practicing minimalism.",
    "At this distance, the deposit is a rumor.",
    "If you’re here by habit, welcome back. Pull up a chair.",
    "My budget has entered its historical fiction era.",
    "Leadership asked us to do more with less. Finally, something I can put down as a core skill.",
    "If counting days were billable, this website would pay for itself.",
    "So far away I might have to use a bookmark.",
    "There’s still a lot of month left. I hope some of it is good to you.",
    "Our bonus depends on company performance. So does the wording of the email about why there isn’t one.",
    "My wife color-coded the family budget. It turns out all my hobbies are red.",
    "I blocked my calendar to get some work done. Someone booked over it to ask how work was going.",
    "By the time the paycheck gets here, I’ll have forgotten why I needed it yesterday.",
    "The bills are having a reunion. The paycheck sent its regrets.",
    "We’re in ‘check again next week’ territory. I know. You’ll be back tomorrow.",
    "The cart has been open so long it feels like a spare room.",
    "The budget is asking whether I have any hobbies with a one-time fee.",
    "There’s enough time for a free trial to become a paid subscription I forgot to cancel.",
    "Three different apps have offered to help me spend money I haven’t received.",
    "My bank asked me to rate my experience. I said to ask me on payday.",
    "I could mail myself a letter and it would get here first.",
    "At this point, ‘just browsing’ is a legally binding agreement with myself.",
    "If payday had parcel tracking, we’d still be on ‘label created’.",
    "The calendar and I have agreed to meet again next week.",
    "If silence is golden, my bank notifications are doing very well.",
    "My girlfriend suggested sharing dessert to save money. So far I’ve saved three quarters of a dessert.",
    "The part of the bill marked ‘due immediately’ has a lot of nerve.",
    "I showed the kids this page to explain where money comes from. Their follow-up was, ‘Can you make it go faster?’",
    "The days are taking the local bus to payday.",
    "Even my impulse buys are, by this point, fairly considered.",
    "Dad lectured me about saving money. Then he started up the lawn mower he bought on sale.",
    "We made a budget category for the car. The car took it as a challenge.",
    "My friend said we’d save money by booking now. Then he sent me a payment request labeled ‘savings’.",
    "Someone will suggest splitting the bill evenly before all of this is over.",
    "The next deposit is far away. The weekend has better timing.",
    "The next deposit has a date. So does every bill. Only one side seems excited about it.",
    "The month will get there in its own time. I’m going for a walk.",
    "My friend still owes me for dinner. That debt has been to three of his birthdays.",
  ],
];

function pickPaydayMessage(daysUntilPayday, estimated) {
  const thresholds = [0, 3, 7, 14, Infinity];
  const days = estimated ? Math.max(1, daysUntilPayday) : daysUntilPayday;
  const messages = paydayMessages[thresholds.findIndex(limit => days <= limit)];
  const storageKey = "kadceplata.paydayMessages";
  let shown = [];

  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey));
    if (Array.isArray(saved)) {
      shown = saved.filter(message => messages.includes(message));
    }
  } catch {
    // The countdown still works when storage is unavailable.
  }

  let choices = messages.filter(message => !shown.includes(message));
  if (choices.length === 0) {
    choices = messages.filter(message => message !== shown.at(-1));
    shown = [];
  }

  const message = choices[Math.floor(Math.random() * choices.length)];
  try {
    sessionStorage.setItem(storageKey, JSON.stringify([...shown, message]));
  } catch {
    // A random message is still available without storing its history.
  }
  return message;
}
