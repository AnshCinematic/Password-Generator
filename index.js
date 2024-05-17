const inputSlider = document.querySelector("[data-lengthSlider]");
const lenghtDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[ data-PasswordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".GeneratePassword");
const allCheckBox = document.querySelector("input[type=checkbox]");
const symbolCheck = document.querySelector("#symbols");
const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

let password = "";
let passwordLength = 10;
let checkCount = 1;
handleSlider();
//set strength color to grey
setIndicator("#ccc");

//set password length
function handleSlider() {
    inputSlider.value = passwordLength;
    lenghtDisplay.innerHTML = passwordLength;


}
function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow =`0px 0px 12px 1px ${color}`;
    

}
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;

}
function generateRndNumber() {
    return getRandomInteger(0, 9);
}
function generateLowerCase() {
    return String.fromCharCode(getRandomInteger(97, 123));
}
function generateUpperCase() {
    return String.fromCharCode(getRandomInteger(65, 91));
}
function generateSymbol() {
    const randNum = getRandomInteger(0, symbols.length);
    return symbols.charAt(randNum);
}
function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numberCheck.checked) hasNum = true;
    if (symbolCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator('#0f0');
    }
    else if ((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6) {
        setIndicator("#ff0");
    }
    else {
        setIndicator("#f00")
    }
}
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerHTML = "copied";
        
    }
    catch (e) {
        copyMsg.innerHTML = "failed";
    }
    copyMsg.classList.add("active");
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value) {
        copyContent();
    }
})


//for all the checkboxes

function handleCheckBoxChange() {
    checkCount = 0;
    Array.from(allCheckBox).forEach((checkbox) => {
        if (checkbox.checked) {
            checkCount++;
        }
    })
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

}

//shuffle passss

function shufflePassword(array) {
    //Fisher Yates Method

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;

}

Array.from(allCheckBox).forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

generateBtn.addEventListener('click', () => {
    console.log("i am insieasdf");
    if (checkCount <= 0) {
        return;
    }
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    password = "";

    console.log("handled");

    let funcArr = [];
    if (uppercaseCheck.checked) {
        funcArr.push(generateUpperCase);
    }
    if (lowercaseCheck.checked) {
        funcArr.push(generateLowerCase);
    }
    if (numberCheck.checked) {
        funcArr.push(generateRndNumber);
    }
    if (symbolCheck.checked) {
        funcArr.push(generateSymbol);
    }
    console.log("pass pushed");

    //compulsary Addition
    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
        
    }
    console.log("compulsary addition done");
    //remaining addition 

    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let randIndex = getRandomInteger(0, funcArr.length);
        password += funcArr[randIndex]();
        

    }
    console.log("remaining addition done");

    //shuffle the password

    password = shufflePassword(Array.from(password));
    console.log("Password shuffled");


    passwordDisplay.value = password;
    calcStrength();
})