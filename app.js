let gameseq=[];
let userseq=[];
let score=[];

let btns=['yellow','green','red','purple'];
let started=false;
let level=0;

let h2=document.querySelector("h2");
document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game is started");
        started=true;

        levelup();
    }

});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}
function levelup(){
    userseq=[];
    level++;
    h2.innerText=`Level ${level}`; 

    let randIdx=Math.floor(Math.random()*4);
    let randColor=btns[randIdx];
    let randbtn=document.querySelector(`.${randColor}`);
    gameseq.push(randColor);
    console.log(gameseq);
    gameFlash(randbtn);
}
function checkAns(idx){
    // don't redeclare idx; use the passed-in index directly
    if(userseq[idx]===gameseq[idx]){
        if(userseq.length===gameseq.length){
            setTimeout(levelup,1000);
        }        
    } else {
        h2.innerHTML=`Game over! Your Score was <b>${level} </b> <br> Highscore is ${Highscore()} <br> Press any key to Start`;
        document.querySelector("body").style.backgroundColor='red';
        setTimeout(function(){document.querySelector("body").style.backgroundColor='white'},150);

        reset();
    }
    
}

function Highscore(){
    score.push(level);
    max=0;
    for(let i=0;i<=score.length;i++){
        if(score[i]>max){
            max=score[i];
        }      
    }
     return max;
}

function btnPress(){
    
    let btn=this;
    userFlash(this);

    userColor=btn.getAttribute("id");
    userseq.push(userColor);

    checkAns(userseq.length-1);
}
let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    gameseq=[];
    userseq=[];
    level=0;
}

