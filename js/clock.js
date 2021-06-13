const clock = document.querySelector(".jsClock"),
    h2 = clock.querySelector("h2");
    // h3 = clock.querySelector("h3"); // 추후 D-Day 계산기

const calendar = document.querySelector("#dDay");

// 화면에 현재 시간을 출력 //

const getTime = () => {
    const nowTime = new Date();
    const nowHours = nowTime.getHours();
    const nowMinutes = nowTime.getMinutes();
    const nowSeconds = nowTime.getSeconds();

    h2.innerText = `현재 시간은 
    ${
        String(nowHours).padStart(2, 0)}시 ${
        String(nowMinutes).padStart(2, 0)}분 ${
        String(nowSeconds).padStart(2, 0)}초`;
};

const showNowTime = () => {
    getTime();
    setInterval(getTime, 1000);
};

showNowTime();

// D-Day 계산 //

// const calculateDay = () => {

//     const countDay = new Date(`${calendar.value}:00:00:00+0900`);
//     const addDate = new Date();
//     const calculatedDay = countDay - addDate;
    
//     const day = Math.floor(calculatedDay / (1000 * 60 * 60 * 24));

//     if (day > 0) {
//         h3.innerHTML = `D-Day까지 ${String(day).padStart(2, 0)}일 남았습니다.`;
//     } else if (day < -1) {
//         h3.innerHTML = `D-Day가 지났습니다.`
//     } else (
//         h3.innerHTML = `D-Day 입니다.`
//     )
// };

// calendar.addEventListener("change", calculateDay);

// 시간까지 정확하게 계산하고 싶은데 그러기 위해서는 type+"text"로 해야할 것 같음.
// 시간까지 할 수 있도록 조정해보자!
