const famousWrite = document.querySelector(".famousWrite");

function getFamousApi () {
    fetch(`https://api.adviceslip.com/advice`)
    .then(reponse => {
        return reponse.json();
    })
    .then(json => {
        const {slip: {advice}} = json;
        famousWrite.innerText = advice;
    })
    .catch( error => {
        famousWrite.innerText = `서버로부터 데이터를 아직 받지 못 했습니다.`;
    }) 
}

getFamousApi();