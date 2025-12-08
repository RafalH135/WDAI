const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const getready1 = document.getElementById("getReady");
const restartButton = document.getElementById("restartButton");
const scores = document.getElementById("scores")
const gravity = 0.1;
let points = 0;
const xOfBird = 50;
const startingYOfBird = canvas.height / 3;
const scale = 0.5;
const pipeScale =0.4;
const jump = 4;
const bestScores = [0,0,0,0,0,0];
let gameRunning = false;
let obstaclesUp = [];
let obstaclesDown = [];

const GAP = 50;                   
const PIPE_WIDTH = 52;             
const MIN_PIPE_HEIGHT = 10;        
const MAX_PIPE_HEIGHT = (canvas.height - GAP - 20)/2;
const PIPE_DISTANCE_MAX = 150;
const PIPE_DISTANCE_MIN = 80;       
const obstacleSpriteHeight = 320;

const digitImg = new Array(10);
const digitPath = ["assets/UI/Numbers/0.png","assets/UI/Numbers/1.png","assets/UI/Numbers/2.png","assets/UI/Numbers/3.png","assets/UI/Numbers/4.png","assets/UI/Numbers/5.png","assets/UI/Numbers/6.png","assets/UI/Numbers/7.png","assets/UI/Numbers/8.png","assets/UI/Numbers/9.png"];
for(i=0;i<=9;i++){
    digitImg[i]=new Image();
    digitImg[i].src=digitPath[i];
}

const wingSound = new Audio("assets/Sound Efects/wing.wav");
const swooshSound = new Audio("assets/Sound Efects/swoosh.wav");
const pointSound = new Audio("assets/Sound Efects/point.wav");
const hitSound = new Audio("assets/Sound Efects/hit.wav");
const dieSound = new Audio("assets/Sound Efects/die.wav");


class Sprite{
    constructor({position,imgSource}){
        this.position=position;
        this.image = new Image();
        this.loaded=false;
        this.image.onload = () => {
            this.width = this.image.width;
            this.height = this.image.height;
            this.loaded=true;
        }
        this.image.src=imgSource;
    }
    
    draw(){
        if(!this.loaded) return;
        ctx.imageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.drawImage(this.image,this.position.x,this.position.y,this.width*scale,this.height*scale);
    }

    update(){
        this.draw();
    }
}


const dx = 1;
class Obstacle extends Sprite{
    constructor({position,imgSource}){
        super({
            position:position,
            imgSource:imgSource
        })
    }

    draw(){
        if(!this.loaded) return;
        ctx.imageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.drawImage(this.image,this.position.x,this.position.y,this.width*pipeScale,this.height*pipeScale);
    }

    update(){
        this.position.x-=dx;
        this.draw();
    }
}
class Player extends Sprite{
    constructor({position,imgSource}){
        super({
            position:position,
            imgSource:imgSource
        })
        this.position=position;
        this.velocity=0;
        this.obstacleUp = null;
        this.obstacleDown = null;
        this.MAX_FRAMES = 12;
        this.animationFramesCounter = 0;
        this.frames=[]
        this.framePaths=["assets/Flappy Bird/yellowbird-upflap.png","assets/Flappy Bird/yellowbird-midflap.png","assets/Flappy Bird/yellowbird-downflap.png"]
        for(i=0;i<3;i++){
            this.frames[i]=new Image();
            this.frames[i].src=this.framePaths[i];
        }
    }

    update(){
        this.applygravity();
        this.collisionDetector();
        this.draw();
    }

    fly(){
        wingSound.currentTime=0;
        wingSound.play();
        this.animationFramesCounter=this.MAX_FRAMES;
        this.velocity-=jump;
    }
    draw(){
        if(!this.loaded) return;
        ctx.imageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        let angleRad=0;
        if(this.animationFramesCounter===0){
            angleRad = 10 * Math.PI /180;
            this.image=this.frames[0];
        }
        else{
            angleRad = -30 * Math.PI /180;
            if(this.animationFramesCounter===this.MAX_FRAMES) this.image=this.frames[0];
            else if(this.animationFramesCounter>=this.MAX_FRAMES-1) this.image=this.frames[1];
            else if(this.animationFramesCounter>=this.MAX_FRAMES-5) this.image=this.frames[2];
            else if(this.animationFramesCounter>=this.MAX_FRAMES-8) this.image=this.frames[1];
            else if(this.animationFramesCounter>=this.MAX_FRAMES-10){ 
                this.image=this.frames[1];
            }
            this.animationFramesCounter--;
        }
        ctx.save();
        ctx.translate(this.position.x + this.width * scale / 2, this.position.y + this.height * scale / 2)
        ctx.rotate(angleRad);
        ctx.drawImage(this.image,-this.image.width/2*scale,-this.image.height/2*scale,this.width*scale,this.height*scale);
        ctx.restore();
    }

    applygravity(){
        this.position.y+=this.velocity;
        this.velocity+=gravity;

        if (this.position.y < 0) {
            this.position.y = 0;
            obstaclesDown = [];
            obstaclesUp = [];
            hitSound.currentTime=0;
            hitSound.play();
            stopgame();
        }

        if (this.position.y + this.height * scale > canvas.height-20) {
            this.position.y = canvas.height - this.height * scale-20;
            obstaclesDown = [];
            obstaclesUp = [];
            hitSound.currentTime=0;
            hitSound.play();
            stopgame();
        }
    }

    collisionDetector(){
        if(this.obstacleUp && this.obstacleDown){
            if (
                this.position.x + this.width * scale > this.obstacleUp.position.x &&
                this.position.x < this.obstacleUp.position.x + PIPE_WIDTH * pipeScale &&
                this.position.y + this.height * scale > this.obstacleUp.position.y &&
                this.position.y < this.obstacleUp.position.y + this.obstacleUp.height * pipeScale
            ){
                hitSound.currentTime=0;
                hitSound.play();
                this.downFall();
                stopgame();
            }
            if (
                this.position.x + this.width * scale > this.obstacleDown.position.x &&
                this.position.x < this.obstacleDown.position.x + PIPE_WIDTH * pipeScale &&
                this.position.y + this.height * scale > this.obstacleDown.position.y &&
                this.position.y < this.obstacleDown.position.y + this.obstacleDown.height * pipeScale
            ){ 
                hitSound.currentTime=0;
                hitSound.play();
                this.downFall();
                stopgame()
            };
        }
    }

    downFall(){
        this.position.y+=this.velocity;
        this.velocity+=gravity;
        ctx.imageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        const angleRad=90 * Math.PI /180;
        
        ctx.clearRect(0,0,canvas.width,canvas.height);        
        const n = obstaclesDown.length;
        for(let i = 0; i<n; i++){
            obstaclesDown[i].draw();
            obstaclesUp[i].draw();
        }

        ctx.save();
        ctx.translate(this.position.x + this.width * scale / 2, this.position.y + this.height * scale / 2)
        ctx.rotate(angleRad);
        ctx.drawImage(this.image,-this.image.width/2*scale,-this.image.height/2*scale,this.width*scale,this.height*scale);
        ctx.restore();
        if(this.position.y+this.width*scale<=canvas.height-20 && this.position.x+this.width<this.obstacleDown.position.x+20) requestAnimationFrame(() => this.downFall());
        else {
            hitSound.currentTime=0;
            hitSound.play();
            this.velocity=0;
            obstaclesDown = [];
            obstaclesUp = [];
        }
     }
}

const bird = new Player({
        position:{
            x:xOfBird,
            y:startingYOfBird
        },
        imgSource: "assets/Flappy Bird/yellowbird-upflap.png"
    });
let canJump = true;

function initControls() {
    document.addEventListener("keydown", jumpListener);
}

function obstacleUpdater(){
    if(!gameRunning) return;
    if(bird.obstacleDown===null){
        bird.obstacleDown=obstaclesDown[0];
        bird.obstacleUp=obstaclesUp[0];
    }
    else if(bird.position.x>bird.obstacleDown.position.x+PIPE_WIDTH*pipeScale){
        pointSound.currentTime=0;
        pointSound.play();
        points++;
        bird.obstacleDown=obstaclesDown[1];
        bird.obstacleUp=obstaclesUp[1];
    }
    const n = obstaclesDown.length;
    for(let i = 0; i<n; i++){
        obstaclesDown[i].update();
        obstaclesUp[i].update();
    }

    if(obstaclesUp.length>0 && obstaclesUp[0].position.x+PIPE_WIDTH*pipeScale<=0){
        obstaclesUp.shift();
        obstaclesDown.shift();
    }
}
function showScore(){
    const scoreGap=2;
    let l = 1;
    const numScale=0.5;
    const kody = ["assets/UI/Numbers/0.png","assets/UI/Numbers/1.png","assets/UI/Numbers/2.png","assets/UI/Numbers/3.png","assets/UI/Numbers/4.png","assets/UI/Numbers/5.png","assets/UI/Numbers/6.png","assets/UI/Numbers/7.png","assets/UI/Numbers/8.png","assets/UI/Numbers/9.png"];
    const width = 24;
    const height = 36;
    let x = canvas.width-5 - width*numScale;
    if (points>0){
        l = parseInt(Math.log10(points))+1;
    }
    let tmp=points;

    while(l>0){
        const cyfra = tmp%10;
        tmp/=10;
        tmp=parseInt(tmp);
        ctx.drawImage(digitImg[cyfra], x, 5, width * numScale, height * numScale);
        x-=scoreGap+width*numScale;
        l--;
    }
}
function gameLoop(){

    if(!gameRunning) return;
    obstacleAdder();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    obstacleUpdater();
    bird.update();
    showScore();
    requestAnimationFrame(gameLoop);
}


function addObstacle() {

    let x = canvas.width;

    if (obstaclesUp.length > 0) {
        x = obstaclesUp[obstaclesUp.length - 1].position.x + Math.floor(Math.random() * (PIPE_DISTANCE_MAX - PIPE_DISTANCE_MIN)) + PIPE_DISTANCE_MIN;
    }

    const topHeight = Math.floor(Math.random() * (MAX_PIPE_HEIGHT - MIN_PIPE_HEIGHT)) + MIN_PIPE_HEIGHT;

    const obstacleUp = new Obstacle({
        position: {
            x: x,
            y: topHeight - obstacleSpriteHeight*pipeScale,   
        },
        imgSource: "assets/Flappy Bird/pipe-green.png"
    });

    const obstacleDown = new Obstacle({
        position: {
            x: x,
            y: topHeight + GAP,  
        },
        imgSource: "assets/Flappy Bird/pipe-green1.png"
    });

    obstaclesUp.push(obstacleUp);
    obstaclesDown.push(obstacleDown);
}

function obstacleAdder(){
    if(!gameRunning) return;
    if(obstaclesUp.length<4){
        addObstacle();
    }

}
function startGameLoop(){
    getready1.innerHTML="";
    gameRunning=true;

    addObstacle();
    
    bird.animationFramesCounter=0;

    initControls();
    gameLoop();
}

function startgame(){
    points = 0;

    getready1.innerHTML="";

    getready1.innerHTML = `
        <img src = "assets/UI/message.png">
    `;

    bird.position.y=startingYOfBird;
    bird.velocity=0;
    bird.obstacleDown=null;
    bird.obstacleUp=null;
    
    document.addEventListener("click", startGameLoop, {once:true})
}

function jumpListener(event) {
    if(!canJump) return;
    if(event.code === "Space") {
        bird.fly();
        canJump=false;
        setTimeout(() => {
            canJump = true;
        }, 250);
    }
}
function restartGame(){
    restartButton.classList.remove("visible");
    scores.classList.remove("visible");
    restartButton.innerHTML = ``;
    scores.innerHTML=``;
    startgame();
}

function stopgame(){
    gameRunning=false;
    bird.velocity=0;
    document.removeEventListener("keydown", jumpListener);

    
    if (!bestScores.includes(points))
    {
        bestScores[5]=points;
    }
    bestScores.sort((a, b) => b - a);
    bestScores[5]=0;
    getready1.innerHTML="";

    getready1.innerHTML = `
        <img src = "assets/UI/gameover.png">
    `;

    restartButton.innerHTML = `<span>Zagraj ponownie</span>`;
    restartButton.classList.add("visible");

    scores.innerHTML=`
    <span style="font-size:30px">Best scores</span>
    <span>Last game ${points} points</span>
    <ol>
        <li>${bestScores[0]} points</li>
        <li>${bestScores[1]} points</li>
        <li>${bestScores[2]} points</li>
        <li>${bestScores[3]} points</li>
        <li>${bestScores[4]} points</li>
    </ol>`
    scores.classList.add("visible");

    restartButton.addEventListener("click",restartGame,{once:true});
}


document.addEventListener("DOMContentLoaded", startgame);