const ELM_HOME = document.getElementById('home');
const ELM_CONTAINER = document.getElementsByClassName('container')[0];
const ELM_END_MSG = document.getElementById('out-of-words');
const ELM_IMG = document.getElementById('card-img');
const ELM_OPERATE = document.getElementsByClassName('operate')[0];
const ELM_COUNT = document.getElementsByClassName('count')[0];
const ELM_COUNT_WORDS = document.getElementById('count-words');
const ELM_ANSWER = document.getElementById('answer');

let words;
let count = 0;
let answer = '';

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        words = data;
    });

function start() {
    ELM_HOME.style.display = 'none';
    ELM_CONTAINER.style.display = 'grid';
}

function displayRandomCard() {

    if (words.length === 0) {
        end();
        return;
    }

    const randomIndex = Math.floor(Math.random() * words.length);
    const currentWord = words.splice(randomIndex, 1)[0];
    answer = currentWord.japanese;
    count++;

    ELM_COUNT_WORDS.innerHTML = count;
    ELM_IMG.setAttribute('src', currentWord.imgUrl);
    ELM_ANSWER.innerHTML = '';
}

function showAnswer() {
    ELM_ANSWER.innerHTML = answer;
}

function end() {
    ELM_END_MSG.style.display = 'block';
    ELM_IMG.style.display = 'none';
    ELM_OPERATE.style.display = 'none';
    ELM_COUNT.style.display = 'none';
    ELM_ANSWER.style.display = 'none';
}