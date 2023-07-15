const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
//Months are counted from 0 - 11
const pulicHolidaysSRB = [new Date(2023,10,11), new Date(2023,7,1), new Date(2023,7,2), new Date(2023,7,3)]
//const pulicHolidaysSRB = [new Date(2023,10,11), new Date(2023,7,1)]
const lengthPH = pulicHolidaysSRB.length;

function dateToDMY(date) {
  var d = date.getDate();
  var m = date.getMonth() + 1; //Month from 0 to 11
  var y = date.getFullYear();
  return '' + (d <= 9 ? '0' + d : d) + '.' + (m <= 9 ? '0' + m : m) + '.' + y + '.';
}

// a and b are javascript Date objects
function dateDiffInDays(a, b) 
{
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function isPublicHoliday(newDate)
{
	var ph = false
    //check if public holiday
    for(var i = 0; i < lengthPH; i++)
    {
        var pbDate = pulicHolidaysSRB[i]
        pbDate.setHours(0, 0, 0, 0)

        if(dateToDMY(newDate) === dateToDMY(pbDate))
        {
            //public holiday, skip
            ph = true 
            console.log("PH - " + dateToDMY(newDate))
            break
        }
    }    
    
    return ph
}

function isWeeked(newDate)
{
	if(newDate.getDay() !== 0 && newDate.getDay() !== 6)
    {
    	return false 
    }
    else
    {
    	console.log("Weekend - " + dateToDMY(newDate))
    	return true
    }
}

function nextSalaryDate(date) 
{
	var y = date.getFullYear()
	var m = date.getMonth()
    var d = date.getDate()
    
  	var workingDaysNeeded = 3
    var workingDaysPassed = 0
	var newDate = new Date(y, m + 1, 1)
    newDate.setHours(0, 0, 0, 0)
    console.log("Date - " + dateToDMY(newDate))

    while(workingDaysPassed < workingDaysNeeded)
    {
        if(isWeeked(newDate) || isPublicHoliday(newDate))
        {
            newDate.setDate(newDate.getDate() + 1)
        }
        else
        {
        	workingDaysPassed++
            if(workingDaysPassed < workingDaysNeeded)
            {
            	newDate.setDate(newDate.getDate() + 1)
            }
        }
    }
  
  return newDate
}

// Update header text
//document.querySelector('#header').innerHTML = message
var currDate = new Date()
currDate.setHours(0, 0, 0, 0)
const nextSalay = nextSalaryDate(currDate)

document.getElementById("header1").innerHTML = "Current date: " + dateToDMY(currDate)
document.getElementById("header2").innerHTML = "Next salary date: " + dateToDMY(nextSalay)
document.getElementById("header3").innerHTML = "Days until next salary: " + dateDiffInDays(currDate, nextSalay)
