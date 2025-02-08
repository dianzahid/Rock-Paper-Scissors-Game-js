

    
//Get saved score object in local storage   

let computerChoice;
let userChoice;
let outcome;
let myInt;

// get score object(made into a string), turn it back into an object and save into variable score
const storedScore = localStorage.getItem('score');
const score = storedScore ? JSON.parse(storedScore) : { Wins: 0, Losses: 0, Ties: 0 };
const scoreString = `
Wins: ${score.Wins}
Losses: ${score.Losses}
Ties: ${score.Ties}
`
document.querySelector('.score').textContent = scoreString;

function computerPick() {

 let randomNumber = Math.random();

 if(0<=randomNumber && randomNumber<1/3){
   
   computerChoice = `Rock`;
 }
 else if(0.33<=randomNumber && randomNumber<0.66){
   
   computerChoice = `Paper`;
 }
 else{
  
   computerChoice = `Scissors`;
 };

}

function result (userPick){

 computerPick();
 
 if(computerChoice === userPick){

outcome = `Tied with me`;
score.Ties++; 

} else if((computerChoice === 'Rock')&&(userPick === 'Paper')||(computerChoice === 'Scissors')&&(userPick === 'Rock')|| 
(computerChoice === 'Paper')&&(userPick === 'Scissors')) {

outcome = `Win`;
score.Wins++;

} else {
outcome = `Lost`;
score.Losses++;
}


 // Save score into local storage, only takes string value, convert score object into string ONLY SUPPORTS STRINGS
 localStorage.setItem('score', JSON.stringify(score)); 

 const message1 = `you picked ${userPick}, I picked ${computerChoice}`
 const message2 = `You ${outcome}!`  
 const message3 = `Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`

 document.querySelector('.picks').innerHTML = 
 `You picked <img class="button-icon-info" src="img/${userPick}-icon.png">, i picked <img class="button-icon-info" src="img/${computerChoice}-icon.png">`;
 document.querySelector('.result').textContent =`${message2}`;
 document.querySelector('.score').textContent = `${message3}`;
}

function resetGame () {
 score.Wins=0;
 score.Losses=0;
 score.Ties=0;

   // Incase of reset aswell
   localStorage.setItem('score', JSON.stringify(score)); 

   document.querySelector('.picks').textContent ='';
   document.querySelector('.result').textContent = '';
   document.querySelector('.score').textContent = (`Wins: ${score.Wins} Losses: ${score.Losses} Ties: ${score.Ties}`);
}

function autoPlay(){

  const auto = document.querySelector('.autoplayButton');

  if(auto.textContent === 'Auto Play'){

  myInt = setInterval(() => {

    const random = Math.random();

    if(random < 0.33){
    result('Paper');
    }
    else if (random < 0.66){
      result('Rock');
    }
    else{
      result('Scissors')
    }
  }, 1000);

  document.querySelector('.autoplayButton').textContent = 'Stop Play';
  }
  else if (auto.textContent === 'Stop Play')
    {
    document.querySelector('.autoplayButton').textContent = 'Auto Play';
    clearInterval(myInt);

  }
};

document.querySelector('.js-rock-button')
.addEventListener('click',()=>{
  result('Rock')
});

document.querySelector('.js-paper-button')
.addEventListener('click',()=>{
  result('Paper')
});

document.querySelector('.js-scissors-button')
.addEventListener('click',()=>{
  result('Scissors')
});

document.querySelector('.js-reset-button')
.addEventListener('click',()=>{
  resetGame();
});

document.querySelector('.js-autoplay-button')
.addEventListener('click',()=>{
  autoPlay();
});

document.body.addEventListener('keydown', (event) => {
  
if (event.key === 'r'){
  result('Rock')
}
else if (event.key === 'p'){
result('Paper');
}
else if (event.key === 's'){
  result('Scissors');

}
});

