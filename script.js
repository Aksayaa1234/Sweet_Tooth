const full=document.querySelector(".full");
const ballooncontainer=document.querySelector(".b-container");
const gamearea=document.querySelector(".game-area");
const mark=document.querySelector("#mark");
const cake=document.querySelector("#cake");
const candy=document.querySelector("#candy");
const chilli=document.querySelector("#chilli");
const basket=document.querySelector("#basket");
const over=document.querySelector(".over");
const score=document.querySelector(".score");
const mark2=document.querySelector(".mark");
const inputspeed=document.querySelector(".speed");
let speed=5;
let bposition=220;
let s=0;
let interval;

const start=()=>{
    s=0;
    full.style.display="none";
    ballooncontainer.style.display="none";
    mark2.style.display="block";
    gamearea.style.display="block";
    //console.log(typeof(inputspeed.value))
    speed=parseInt(inputspeed.value);
    document.addEventListener('keydown',(event)=>{
        if(event.key==='ArrowLeft' && bposition>0)
            bposition-=12;
        else if(event.key==='ArrowRight' && bposition<420)
            bposition+=12;
        basket.style.left=`${bposition}px`;
    })
    gamestart();
};

const gamestart=()=>{
    resetObject(cake,'cake');
    resetObject(chilli,'chilli');
    resetObject(candy,'candy');
    interval=setInterval(()=>{       
        moveObject(cake,'cake');
        moveObject(chilli,'chilli');
        moveObject(candy,'candy');
        checkCollision();
    },40)
}

const resetObject=(object,type)=>{
    object.style.top='-90px';
    object.style.left=`${Math.floor(Math.random()*500)}px`;
    
}

const moveObject=(object,type)=>{
    let objectTop=parseInt(window.getComputedStyle(object).getPropertyValue('top'));
    if(objectTop>600)
        resetObject(object,type);
    else
        object.style.top=`${speed+objectTop}px`;
}

const checkCollision=()=>{
    let b=basket.getBoundingClientRect();
    let ca=cake.getBoundingClientRect();
    let ch=chilli.getBoundingClientRect();
    let can=candy.getBoundingClientRect();
    // console.log(b);
    // console.log(ca);
    if(b.left<ca.right && b.right>ca.left && b.top<ca.bottom && b.bottom>ca.top)
    {
        s++;
        mark.textContent=s;
        resetObject(cake,'cake');
    }

    if(b.left<can.right && b.right>can.left && b.top<can.bottom && b.bottom>can.top)
    {
        s++;
        mark.textContent=s;
        resetObject(candy,'candy');
    }

    if(b.left<ch.right && b.right>ch.left && b.top<ch.bottom && b.bottom>ch.top)
    {
        clearInterval(interval);
        full.style.display="flex";
        ballooncontainer.style.display="flex";
        gamearea.style.display="none";
        over.style.display="flex";
        mark2.style.display="none";
        score.textContent=s;
    }
}