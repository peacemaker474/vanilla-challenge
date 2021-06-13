// 입력 부분 //
const enterDiv = document.querySelector(".enterName");
const enterForm = document.querySelector("#inputName");
const enterInput = enterForm.querySelector("#enter");
// 좌, 우측 부분 //
const leftUl = document.querySelector(".leftSection");
const rightUl = document.querySelector(".rightSection");
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
const SHOWING = "showing" // class명으로 <input> 태그 Control

const saveUserName = (text) => {
    localStorage.setItem(USER_NAME, text);
};

const handleChangeName = () => {
    localStorage.removeItem(USER_NAME);
};

const submitName = (event) => {
    event.preventDefault();
    const currentValue = enterInput.value;
    paintGreeting(currentValue);
    saveUserName(currentValue);
};

const askYourName = () => {
    enterDiv.classList.add(SHOWING);
    enterForm.addEventListener("submit", submitName);
};


const paintGreeting = (text) => {
    enterDiv.classList.remove(SHOWING);
    // 입력하기 전에 안에 내용을 숨기기 위해 position과 display를 감춤.
    enterForm.style.display = "none";
    leftUl.style.left = "0%";
    rightUl.style.right = "0%";
    famous.style.bottom = "6%";
    weatherBox.style.right = "3%";
    // 입력한 이후에 인삿말과 이름 출력 
    h1.innerText = `안녕하세요. 
    
    ${text}님

    어서오세요!`;
    // 버튼을 클릭 시 첫 화면으로 리로딩
    changeName.addEventListener("click", handleChangeName);
};

// 로컬 스토리지에 저장된 이름 유무 확인 

const loadedUserDate = () => {
    const userInfo = localStorage.getItem(USER_NAME);
    userInfo === null ? askYourName() : paintGreeting(userInfo);
};

function greeting () {
    loadedUserDate();
}

greeting();