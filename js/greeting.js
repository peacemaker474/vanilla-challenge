// 입력 부분 //
const enterDiv = document.querySelector(".enterName");
const enterForm = document.querySelector("#inputName");
const enterInput = enterForm.querySelector("#enter");
// left, right 부분 //
const leftUl = document.querySelector(".clockSection");
const rightUl = document.querySelector(".listSection");
// 인사말 부분 //
const greetingDiv = document.querySelector(".jsGreeting");
const h1 = greetingDiv.querySelector("h1");
const changeName = greetingDiv.querySelector("button");
// 명언 부분 //
const famous = document.querySelector(".famousWrite");
// 날씨 부분 //
const weatherBox = document.querySelector(".jsWeather");

// 로컬스토리지 및 이름 입력 class 명 //
const USER_NAME = "USERNAME";
const SHOWING = "showing"

const saveUserName = (text) => {
    localStorage.setItem(USER_NAME, text);
}

const handleChangeName = () => {
    localStorage.removeItem(USER_NAME);
}

const submitName = (event) => {
    event.preventDefault();
    const currentValue = enterInput.value;
    paintGreeting(currentValue);
    saveUserName(currentValue);
}

const askYourName = () => {
    enterDiv.classList.add(SHOWING);
    enterForm.addEventListener("submit", submitName);
}

const paintGreeting = (text) => {
    enterDiv.classList.remove(SHOWING);
    enterForm.style.display = "none";
    leftUl.style.left = "0%";
    rightUl.style.right = "0%";
    famous.style.bottom = "6%";
    weatherBox.style.right = "2%";
    h1.innerText = `안녕하세요. ${text}님 어서오세요!`;
    changeName.addEventListener("click", handleChangeName);
}


const loadedUserDate = () => {
    const userInfo = localStorage.getItem(USER_NAME);
    userInfo === null ? askYourName() : paintGreeting(userInfo);
}


function greeting () {
    loadedUserDate();
}

greeting();