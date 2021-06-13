const weather = document.querySelector(".jsWeather"); // 날씨 정보를 담은 nav
const weatherText = weather.querySelector(".weatherText"); // 날씨 정보를 수정할 text 영역

const API_KEY = "8197ccfad723a06a22d33c9a48f13d04"; // 날씨 API
const MYLOCATION = "LOCATION"; // 로컬스토리지 key 이름


// 날씨 정보 가지고 오기
function getWeather (lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`)
    .then(response => response.json())
    .then(json => {
        const weatherIcon = json.weather[0].icon; // 날씨 아이콘
        const weatherDescription = json.weather[0].description; // 날씨 설명
        const temperature = json.main.temp; // 현재 기온
        const nowLocation = json.name; // 위치 정보
        
        // 날씨 정보를 TEXT 입력
        weatherText.innerText = `현재 날씨는 ${weatherDescription} @ 기온은 ${Math.floor(temperature)}℃`;
        
        // 날씨 정보 이미지 삽입
        const image = new Image ();
        image.src=`http://openweathermap.org/img/wn/${weatherIcon}.png`; // 날씨별 icon
        image.alt=`${weatherDescription}`;
        weather.prepend(image);
    })
    .catch(()=> { // 날씨 정보를 가지고 오지 못하면 Error handling
        weatherText.innerText = `날씨 정보를 가지고 올 수 없습니다.`; //
    })
}

// 위치 정보 로컬스토리지에 저장
const saveCoords = (coordsObj) => {
    localStorage.setItem(MYLOCATION, JSON.stringify(coordsObj));
};
// 위치 정보 Error handling
const handleGeoError = () => {
    weatherText.innerText = `위치 정보를 가지고 오지 못 했습니다.`;
};

// 위치 정보 가져오기
const handleGeoSuccess = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = { // 로컬 스토리지에 저장하기 위해 OBject로 저장
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}


function askLocationInfo () {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

// 로컬 스토리지에 위치정보 저장 후 조건문으로 출력 //
function loadLocation () {
    const loadedLocation = localStorage.getItem(MYLOCATION);
    if(loadedLocation === null) {
        askLocationInfo();
    } else {
        const parseCoords = JSON.parse(loadedLocation);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function showWeather () {
    loadLocation ();
}

showWeather();