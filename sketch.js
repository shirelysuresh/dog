var backImg,dog,cage,happy_jerry,sad_jerry,tom_running;
var tom;
var scene;
var obstacleGroup;
var invisibleGround;
var gameState = "play"
function preload(){
  tom_running=loadAnimation("tom1.png","tom2.png","tom3.png","tom4.png")
  dog=loadImage("dog.png")
  cage=loadImage("cage.png")
  happy_jerry=loadImage("happyjerry.png")
  sad_jerry=loadImage("sadjerry.png")
  backImg=loadImage("background.png")

}



    
function setup() {
  createCanvas(1600,900);

  scene=createSprite(0,0,1600,900);
  scene.addImage(backImg);
  scene.scale=5.0;

  tom=createSprite(200,580,20,50);
  tom.addAnimation("running",tom_running);
  tom.scale=1.0;
  tom.debug=false;
  tom.setCollider("circle",0,0,50)

  invisibleGround=createSprite(900,810,1700,10);
  invisibleGround.visible=false;
  scene.velocityX=-5;

  obstacleGroup=createGroup()
  life=4
  
}

function draw() {
  background("pink"); 
  drawSprites();

  fill("black")
  textSize(25)
  text("life = "+life,100,50)
  
  if(gameState==="play") {
        if(scene.x<0){
          scene.x=scene.width/2;
        }
        spawnObstacles();

        if(keyDown("space")){
          tom.velocityY=-15
        }
        //gravity
        tom.velocityY+= 3
        //tom stop falling 
       
        
        if(tom.isTouching(obstacleGroup)){
          gameState="end"
          life=life-1
        }
  }
  
if(gameState==="end"){
  scene.velocityX=0
  obstacleGroup.setVelocityXEach(0)
  obstacleGroup.setLifetimeEach(-1)
}


tom.collide(invisibleGround)
  
  
}








function spawnObstacles(){
  if(frameCount%200===0){
    var obstacle=createSprite(1600,680,20,50);
    obstacle.addImage(dog);
    obstacle.velocityX=-6;
    obstacle.lifetime=270;
    obstacle.debug=false;
    obstacle.setCollider("circle",0,0,59)


    obstacleGroup.add(obstacle)
  }
}