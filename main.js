const hidden_word_container = document.querySelector(".hidden_word_container");
const keys_container = document.querySelector(".keys_container");
let wrong_h3 = document.querySelector(".wrong_guesses_left")
let stickman = document.querySelector(".wrong");
const resetBtn = document.querySelector(".reload");
resetBtn.addEventListener("click", () => {
  window.location.reload();
})
let wrong_guesses_left = 8;
let wrong = 0;

let word = '';
let rightGuesses = [];

const drawHiddenWord = (word, guess) => {
  
  hidden_word_container.innerHTML = '';

  if(word.includes(guess)){
        for(let i=0; i<word.length; i++) {
        if (word[i] === guess) {
          rightGuesses[i] = true;
        }
    }
  }
  else{ 
    wrong_guesses_left--;
    wrong_h3.innerText = `Du har ${wrong_guesses_left} liv kvar`
    
    
    if(wrong>0){
      stickman.innerHTML= `<img src="stickfigure/${wrong}.jpg" alt="stickman">`;
    }
    wrong ++;

    if(wrong_guesses_left === 0){
      keys_container.style.display="none";
    }
  }
  
  let foundLetters = 0;
  for (let i = 0; i < word.length; i++) {
    if (rightGuesses[i]) {
      hidden_word_container.innerHTML += `<span class="line">${word[i]}</span>`;
      foundLetters++;

      if(foundLetters === word.length){
        let game_wrapper = document.querySelector(".game_wrapper");
        game_wrapper.classList.add("winner");
        game_wrapper.innerHTML = `Du klarade det! 
        GRATTIS!!`;
       
      }
    } else {
      hidden_word_container.innerHTML += `<span class="line">&nbsp;</span>`;
    }
  }
 };
const generateWord = async () =>{
  const jsonResponse = await fetch("./words.json");
  const wordData = await jsonResponse.json();
  const wordArray = wordData.words;
  word = wordArray[Math.floor(Math.random()*wordArray.length)];
 
  drawHiddenWord(word);
  drawKeys();
};
generateWord()

const drawKeys = () => {
  const key_letters = "abcdefghijklmnopqrstuvwxyzåäö"
  for (let i = 0; i < key_letters.length; i++) {
    keys_container.innerHTML += `<button class="key" value="${key_letters[i]}"> ${key_letters[i]}</button>`
  }
};

const key = document.querySelectorAll(".key");

let used = [];
keys_container.addEventListener("click", (evt) => {
  let clickedLetter = evt.target.value;
  evt.target.classList.add(("clickedBtn"))
  evt.target.disabled = true
  
  if(!used.includes(clickedLetter)){
    used.push(clickedLetter);
    
    drawHiddenWord(word, clickedLetter);
  }
 
});
  
