const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const MouseConstraint = Matter.MouseConstraint;
const Mouse = Matter.Mouse;
var gameState= "onSling";
var mConstraint;
var engine, world;
var box1, pig1;
var backgroundImg,platform;
var bird, slingShot;
var score =0;
var sling1, sling2;

function preload() {
     backgroundImg = loadImage("sprites/bg.png");
    sling1 = loadImage("sprites/sling1.png");
    sling2 = loadImage("sprites/sling2.png");

    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,600);
    engine = Engine.create();
    world = engine.world;

    ground = new Ground(600,590,1200,20);
    platform = new Ground(150, 475, 300, 240);

    box1 = new Box(800,540,70,70);
    box2 = new Box(1000,540,70,70);
    pig1 = new Pig(900, 540);
    log1 = new Log(900,500,280, PI/2);

    box3 = new Box(800,450,70,70);
    box4 = new Box(1000,450,70,70);
    pig2 = new Pig(900, 450);

    log3 =  new Log(900,410,280, PI/2);

    box5 = new Box(900,360,70,70);
    log4 = new Log(840,360,150, PI/7);
    log5 = new Log(960,360,150, -PI/7);
   

    bird = new Bird(270,170);

   // log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:270,y:170});
    var canvasMouse = Mouse.create(canvas.elt);
    var options={
        mouse: canvasMouse
    }
    mConstraint= MouseConstraint.create(engine,options);
    World.add(world,mConstraint);
}

function draw(){
    background(backgroundImg);
    noStroke();
    textSize(35);
    fill("white");
    text("score " +score , width-300,50);

    Engine.update(engine);
    strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    pig2.score();
    log1.display();

    box3.display();
    box4.display();
    pig2.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    image (sling1,270,155);
    bird.display();
    image (sling2,245,155);
    platform.display();
   // log6.display();
    slingshot.display();    
    if(gameState === "launched"){
        World.remove(world,mConstraint);
    }


// function mouseDragged(){
//     Matter.Body.setPosition(bird.body,{x: mouseX,y: mouseY})
  
}

function mouseReleased(){
    setTimeout(function(){ 
        slingshot.fly();

    },150);

    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && bird.body.speed<1){
        Matter.Body.setPosition(bird.body,{x:270, y:170});
        Matter.Body.setVelocity(bird.body,{x:0, y:0});
        slingshot.attach(bird.body);
        Matter.Body.setAngle(bird.body,0);

        gameState = "onSling";
        World.add(world,mConstraint);
    }
}

async function getBackgroundImg(){
var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
var responseJson = await response.json();
console.log(responseJson);
var dayTime =responseJson.datetime;
console.log(dayTime);
var hour = dayTime.slice(11,13);
console.log(hour);
if(hour>=6 && hour<=18){
    bg = "sprites/bg.png";
}
else{
    bg = "sprites/bg2.jpg";
}
backgroundImg = loadImage(bg);
}