//Months are counted from 0 - 11
const pulicHolidaysSRB = [new Date(2023,10,11)]
const lengthPH = pulicHolidaysSRB.length;

function dateToDMY(date) 
{
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
    		return true
    	}
}

function salaryDateForThisMonth(date) 
{
	var y = date.getFullYear()
	var m = date.getMonth()
    	var d = date.getDate()
    
  	var workingDaysNeeded = 3
    	var workingDaysPassed = 0
	var newDate = new Date(y, m, 1)
    	newDate.setHours(0, 0, 0, 0)
    
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

function isSalaryThisMonth(date1, date2) 
{
	var y1 = date1.getFullYear()
	var m1 = date1.getMonth()
	var d1 = date1.getDate()
	
	var y2 = date2.getFullYear()
	var m2 = date2.getMonth()
	var d2 = date2.getDate()
    
	//We are not in December, calculate normally
	if(y1 == y2 && m1 == m2 && d1 == d2)
	{
		//salary is TODAY!
		return 0
	}
	else if(y1 == y2 && m1 == m2 && d1 > d2)
	{
		return 1
	}
	else if(y1 == y2 && m1 == m2 && d1 < d2)
	{
		return 2
	}
}


// Update header text
//document.querySelector('#header').innerHTML = message
//var currDate = new Date()
var currDate = new Date(2023,11,6)
currDate.setHours(0, 0, 0, 0)

const salaryDateThisMonth = salaryDateForThisMonth(currDate)
var thisMonth = isSalaryThisMonth(salaryDateThisMonth, currDate)
if(thisMonth == 0)
{
	//SALARY IS TODAY
	document.getElementById("header1").innerHTML = "Current date: " + dateToDMY(currDate)
	document.getElementById("header2").innerHTML = "Next salary date: " + dateToDMY(salaryDateThisMonth)
	document.getElementById("header3").innerHTML = "Days until next salary: " + dateDiffInDays(currDate, salaryDateThisMonth)
	document.getElementById("header4").innerHTML = "HAPPY PAYDAY!" 
	document.getElementById("header5").innerHTML = "#ThankYouContinental"
}
else if (thisMonth == 1)
{
	//SALARY IS THIS MONTH
	document.getElementById("header1").innerHTML = "Current date: " + dateToDMY(currDate)
	document.getElementById("header2").innerHTML = "Next salary date: " + dateToDMY(salaryDateThisMonth)
	document.getElementById("header3").innerHTML = "Days until next salary: " + dateDiffInDays(currDate, salaryDateThisMonth)
	document.getElementById("header4").innerHTML = "Tako blizu, a tako daleko." 
}
else if (thisMonth == 2)
{
	//SALARAY WAS ALREADY PAID THIS MONTH, CALCULATE NEXT MONTH SALARY DATE
	//CHECK IF DECEMBER FIRST, USUALLY WE GET IT ON 28TH
	var currMonth = currDate.getMonth()
	var currYear = currDate.getFullYear()
    
	if(currMonth == 11)
	{
		//Usually on 28th Decemmber
		const nextSalary = new Date(currYear, currMonth , 28)
		document.getElementById("header1").innerHTML = "Current date: " + dateToDMY(currDate)
		document.getElementById("header2").innerHTML = "Next salary date: " + dateToDMY(nextSalary)
		document.getElementById("header3").innerHTML = "Days until next salary: ~" + dateDiffInDays(currDate, nextSalary)
		document.getElementById("header4").innerHTML = "December salary usually comes earlier, tipically on 28th or 29th."
		document.getElementById("header5").innerHTML = "#ThankYouContinental"
	}
	else
	{
		//Not December, calculate noramlly
		const nextSalary = nextSalaryDate(currDate)
		document.getElementById("header1").innerHTML = "Current date: " + dateToDMY(currDate)
		document.getElementById("header2").innerHTML = "Next salary date: " + dateToDMY(nextSalary)
		document.getElementById("header3").innerHTML = "Days until next salary: " + dateDiffInDays(currDate, nextSalary)
		document.getElementById("header4").innerHTML = "There's a long way to go sailor."  
	}

}

















