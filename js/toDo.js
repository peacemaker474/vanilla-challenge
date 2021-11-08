const form = document.querySelector("#inputToDo");
const writeList = form.querySelector("#writeList");
const toDoListUl = document.querySelector(".toDoList");
const fnToDoListUl = document.querySelector(".fnToDoList");

const TODOLIST_NOW = "TODOLIST";
const TODOLIST_FN = "FNTODOLIST";

let toDoList = [];
let fnToDoList = [];

const handleSendNow = (event) => {
    const returnDate = event.path[2];
    fnToDoListUl.removeChild(returnDate);
    const sendFnDate = fnToDoList.filter(toDo => toDo.id === parseInt(returnDate.id));
    const sendText = sendFnDate[0].text;
    // const sendId = sendFnDate[0].id;
    paintNow(sendText);
    const changeNowDate = fnToDoList.filter(toDo => toDo.id !== parseInt(returnDate.id));
    fnToDoList = changeNowDate;
    saveLocalDate();
};

const handleSendFn = (event) => {
    const clearDate = event.path[2];
    toDoListUl.removeChild(clearDate);
    const sendNowDate = toDoList.filter(toDo => toDo.id === parseInt(clearDate.id));
    const sendText = sendNowDate[0].text;
    const sendId = sendNowDate[0].id;
    paintFinish(sendText, sendId);
    const changeNowDate = toDoList.filter(toDo => toDo.id !== parseInt(clearDate.id));
    toDoList = changeNowDate;
    saveLocalDate();
};


const handleDeleteFn = (event) => {
    const deleteDate = event.path[2];
    fnToDoListUl.removeChild(deleteDate);
    const deleteNowList = fnToDoList.filter(toDo => toDo.id !== parseInt(deleteDate.id));
    fnToDoList = deleteNowList;
    saveLocalDate();
};

const handleDeleteNow = (event) => {
    const deleteDate = event.path[2];
    toDoListUl.removeChild(deleteDate);
    const deleteNowList = toDoList.filter(toDo => toDo.id !== parseInt(deleteDate.id));
    toDoList = deleteNowList;
    saveLocalDate();
};


const saveLocalDate = () => {
    localStorage.setItem(TODOLIST_NOW, JSON.stringify(toDoList));
    localStorage.setItem(TODOLIST_FN, JSON.stringify(fnToDoList));
};

const paintFinish = (text, id) => {
    const li = document.createElement("li");
    const buttonBox = document.createElement("div"); // 버튼과 텍스트 부분을 양옆으로 하기 위해 div 생성
    const deleteBtn = document.createElement("button");
    const returnBtn = document.createElement("button");
    const span = document.createElement("span");

    deleteBtn.innerText = "🔥";
    returnBtn.innerText = "🔄";

    deleteBtn.addEventListener("click", handleDeleteFn);
    returnBtn.addEventListener("click", handleSendNow);
    span.innerText = text;
    li.appendChild(buttonBox);
    buttonBox.appendChild(deleteBtn);
    buttonBox.appendChild(returnBtn);
    li.prepend(span);
    li.id = id;
    fnToDoListUl.appendChild(li);

    const finishObj = { text, id };
    fnToDoList.push(finishObj);

    saveLocalDate();
};


const paintNow = (text, id = Date.now()) => {
    const li = document.createElement("li");
    const buttonBox = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const clearBtn = document.createElement("button");
    const span = document.createElement("span");

    deleteBtn.innerText = "🔥";
    clearBtn.innerText = "✅";

    deleteBtn.addEventListener("click", handleDeleteNow);
    clearBtn.addEventListener("click", handleSendFn);

    span.innerText = text;
    li.appendChild(buttonBox);
    buttonBox.appendChild(deleteBtn);
    buttonBox.appendChild(clearBtn);
    li.prepend(span);
    li.id = id;
    toDoListUl.appendChild(li);

    const nowObj = { text, id };
    toDoList.push(nowObj);

    saveLocalDate();
};

// submit 했을 때, 할일 목록에 text 값으로 input.value를 넘겨줌

const handleSubmitList = (event) => {
    event.preventDefault();
    const currentValue = writeList.value;
    // 공백을 입력헀을시, 다시 입력할 수 있게끔 수정하였습니다.
    if (currentValue === "") {
        alert("아무 것도 입력하지 않으셨어요! 다시 입력하세요!");
        return;
    }
    paintNow(currentValue);
    // submit 했을 때, 할일 목록에 text 값으로 input.value를 넘겨줌
    writeList.value = "";
    // input.value 값을 초기화
};

const loadedDate = () => {
    const nowLists = localStorage.getItem(TODOLIST_NOW);
    const fnLists = localStorage.getItem(TODOLIST_FN);

    if (nowLists !== null) {
        const parseNow = JSON.parse(nowLists);
        parseNow.forEach(toDo => paintNow(toDo.text, toDo.id));
    }
    if (fnLists !== null) {
        const parseFn = JSON.parse(fnLists);
        parseFn.forEach(toDo => paintFinish(toDo.text, toDo.id));
    }
};

function showToDoList() {
    loadedDate();
    form.addEventListener("submit", handleSubmitList);
}

showToDoList();