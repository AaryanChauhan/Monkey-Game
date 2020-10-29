var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime = 0;
var ground;
var END = 0;
var PLAY = 1;
var gameState = PLAY;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,1200,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
  background(255);
  
  if(gameState===PLAY) {
    stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,500,500);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.round(frameCount/frameRate());
  text("Survival Time : " + survivalTime,100,50);
  
  if(ground.x < 0) {
    ground.x = ground.width/2;
  }
  
  if(keyDown("space") && monkey.y >= 314.3) {
    monkey.velocityY = -12;
   }
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);
    
  food();
  obstacles();
  }
  
  else if (gameState===END) {
    monkey.visible = false;
    ground.visible = false;
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    survivalTime = 0;
  }
  
  if(obstacleGroup.isTouching(monkey)) {
  gameState = END;
  }
  
  drawSprites();
}

function food() {
  
  if(frameCount%80 === 0) {
    banana = createSprite(250,120,25,25);
    banana.addImage(bananaImage);
    banana.scale =0.1;
    banana.y = Math.round(random(120,200));
    banana.velocityX = -5;
    banana.lifetime = 100;
    FoodGroup.add(banana);
  }
}


function obstacles(){
 if (frameCount%300===0){
   obstacle = createSprite(400,322,10,40);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -12;     
    obstacle.scale = 0.15;
    obstacle.lifetime = 150;
    obstacleGroup.add(obstacle);
 }
}