const body = document.querySelector("body");

// API KEY // 
const imageAPI = "dQ7oSVvPUp0NswQORah4H8wUQhZn37U-Nl8l3kl6CWg";

function getRandomImage () {
    fetch(`https://api.unsplash.com/photos/random/?client_id=${imageAPI}`)
    .then(reponse => {
        return reponse.json();
    })
    .then(function (json) {
        const {urls: {regular : bgImage}} = json;
        const image = new Image();
        image.src = `${bgImage}`;
        image.alt = "backgroundImage";
        image.classList.add("randomImage");
        body.prepend(image);
    })
    // unsplash api Demo는 시간당 50번의 요청만 가능.
    // 그렇기에 데이터를 받아오지 못 할 경우, 자체 폴더 내에서 랜덤으로 이미지를 불러오도록 
    // error handling
    .catch(() => {
        const randomNumber = Math.round(Math.random () * 4) + 1;
        const image = new Image();
        image.src = `images/${randomNumber}.jpg`;
        image.alt = "backgroundImage";
        image.classList.add("randomImage");
        body.prepend(image);
    })
}

getRandomImage();