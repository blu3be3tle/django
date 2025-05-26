function checkEvenOdd() {
    let input = prompt("Enter a number:");
    let number = parseInt(input);

    if (isNaN(number)) {
        console.log("Please enter a valid number.");
        return;
    }

    if (number % 2 === 0) {
        console.log(`${number} is even`);
    } else {
        console.log(`${number} is odd`);
    }
}
checkEvenOdd();


let arr = [15, 3, 12, 7, 20, 1, 9, 18, 4, 11, 6, 13, 2, 17, 5, 14, 8, 19, 10, 16];
let sortedArr = [];
for (let i = 1; i <= 20; i++) {
    for (let j = 0; j < arr.length; j++) {
        if (arr[j] === i) {
            sortedArr.push(i);
            break;
        }
    }
}
console.log(sortedArr);


function isLeapYear() {
    let year = parseInt(prompt("Enter a year: "));
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
        console.log(`${year} is a leap year`);
    } else {
        console.log(`${year} is not a leap year`);
    }
}
isLeapYear();


for (let i = 1; i <= 50; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log(i);
    }
}


var friends = ["rahim", "karim", "abdul", "sadsd", "heroAlom"];
let longest = friends[0];
for (let i = 1; i < 5; i++) {
    if (friends[i].length > longest.length) {
        longest = friends[i];
    }
}
console.log(longest);


var numbers = [1, 2, 3, 3, 4, 4, 5, 6, 7, 8, 9, 10];
let uniqueNumbers = [];
for (let i = 0; i < numbers.length; i++) {
    if (!uniqueNumbers.includes(numbers[i])) {
        uniqueNumbers.push(numbers[i]);
    }
}
console.log(uniqueNumbers);


var numbers = [1, 2, 3, 3, 4, 4, 5, 6, 7, 8, 9, 10];
let largestNumber = numbers[0];
for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > largestNumber) {
        largestNumber = numbers[i];
    }
}
console.log(largestNumber);


function monthlySavings(payments, livingCost) {
    if (!Array.isArray(payments) || typeof livingCost !== "number") {
        return "invalid input";
    }

    let totalIncome = 0;

    for (let amount of payments) {
        if (amount >= 3000) {
            totalIncome += amount * 0.8;
        } else {
            totalIncome += amount;
        }
    }

    let savings = totalIncome - livingCost;

    if (savings < 0) return "earn more";
    return savings;
}
