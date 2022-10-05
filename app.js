const birthdate = document.querySelector("#birth-date");
const checkBtn = document.querySelector(".check-button");
const output = document.querySelector(".output-msg");


function reverseStr(str) {
    var splitStr = str.toString().split('');
    var reverseSplitStr = splitStr.reverse();
    var reversedStr = reverseSplitStr.join('');

    return reversedStr;
}


function checkIfPalindrome(str) {
    var reverse = reverseStr(str);
    return str === reverse;
}


function checkPalindromeForAllFormats(date) {
    var listOfPalindromes = getAllDateFormats(date);
    var isPalindrome = false;

    for (var i = 0; i < listOfPalindromes.length; i++) {

        if (checkIfPalindrome(listOfPalindromes[i])) {
            console.log(listOfPalindromes[i]);
            isPalindrome = true;
            break;
        }
    }

    return isPalindrome;
}


function convertDateToStr(date) {
    var dateStr = {day: '', month: '', year: ''};

    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    } else {
        dateStr.day = date.day.toString();
    }
    
    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}


function getAllDateFormats(date) {
    var dateStr = convertDateToStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
    
    
    var allDateFormats = [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
    return allDateFormats;
}


function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }

    if (year % 100 === 0) {
        return false;
    }

    if(year % 4 === 0) {
        return true;
    }

    return false;
} 


function getNextDate (date) {
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; 
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    // checking if Feb
    if (month === 2) {
        // checking if Feb is leap year
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month = month + 1;
            }
        } else {
            if (day > 28) {
                day = 1;
                month = month + 1;
            }
        }      
    } else {   
        //checking days doesnt exceed max days 
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month = month + 1;
        }
    }    
    
    //checking months doesnt exceed max months
        
    if (month > 12) {
        month = 1;
        year = year + 1;
    }

    // returning updated next date    
    return {
        day: day,
        month: month,
        year: year
    };
}


function getNextPalindromeDate (date) {
    
    // count for days until next palindrome date
    var nextPalindromeDays = 0;
    var nextDate = getNextDate(date); 
    console.log(nextDate);

    while (1) {
        nextPalindromeDays += 1;
        var isPalindrome = checkPalindromeForAllFormats(nextDate);
        
        if (isPalindrome) {
            break;
        } else {
            nextDate = getNextDate(nextDate); 
        }
    }   

    return [nextPalindromeDays, nextDate];
}




var date = {
    day: 28,
    month: 2,
    year: 2020,
};


function clickHandler(e) {
    var bdayStr = birthdate.value;
    

    if (bdayStr !== '') {
        var bday = bdayStr.split('-');
        

        var date = {
            day: Number(bday[2]),
            month: Number(bday[1]),
            year: Number(bday[0])
        };
        
        var isPalindrome = checkPalindromeForAllFormats(date);

        if (isPalindrome) {
            output.innerText = "Yayy! Your birthday is a palindrome. 🎉"
        } else {
            var [nextPalindromeDays, nextDate] = getNextPalindromeDate(date);
            output.innerHTML =  (nextPalindromeDays != 1) ? `<span style="color:#dc2626">Opps! Your birthday is not a palindrome. <br>The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${nextPalindromeDays} days.<span>` : `<span style="color:#dc2626">Opps! Your birthday is not a palindrome. <br>The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${nextPalindromeDays} day.<span>`
        }
    // console.log("Enterd Birthdate",bdayStr);
    // console.log("Split Birthdate", bday); 
    // console.log("converted to date object", date);
    // console.log("Date to string", dateStr);
    // console.log("All possible date formats",getAllDateFormats(date));
    // console.log("Reversed String", reversedStr);
    // console.log("Checking for palindrome for all formats",checkPalindromeForAllFormats(date));
    // console.log("Next Palindrome Date",getNextDatePalindrome(date));
    }


}





checkBtn.addEventListener("click", clickHandler);


