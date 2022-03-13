var trex, trex_running, edges;
var groundImage;
var invisibleground;
var cloud;
var cloudImage;
var cactus10;
var Score=0;
var cloudsgroup;
var cactusgroup;
var JUGANDO = 1;
var FIN = 0;
var estadodejuego= JUGANDO;
var trexdead;
var GAMEOVER;
var RESTART;
var terminado;
var again;
var sound1;
var sound2;
var sound3;
//var local;

function preload(){
  trex_running = loadAnimation("trex1.png","trex4.png","trex3.png");
  groundImage = loadImage("ground2.png");
  cloudImage= loadImage("cloud.png");
  cactus1= loadImage ("obstacle1.png");
  cactus2= loadImage ("obstacle2.png");
  cactus3= loadImage ("obstacle3.png");
  cactus4= loadImage ("obstacle4.png");
  cactus5= loadImage ("obstacle5.png");
  cactus6= loadImage ("obstacle6.png");
  trexdead= loadImage ("trex_collided.png");
  GAMEOVER= loadImage ("gameOver.png");
  RESTART= loadImage ("restart.png");
  sound1=loadSound("checkPoint.mp3");
  sound2=loadSound("die.mp3");
  sound3=loadSound("jump.mp3");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  //crear sprite de Trex
  trex = createSprite(width/2-100,height-100,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("stop", trexdead);
  terminado = createSprite (width/2,height/2);
  again = createSprite (width/2,height/2+30 );
  terminado.addImage (GAMEOVER);
  again.addImage (RESTART);
  terminado.scale=.8;
  again.scale=.3;
  terminado.visible=false;
  again.visible=false;
  // para hacerlos invisibles si llevan true es para hacerlos visibles.
  
  edges = createEdgeSprites();
  cactusgroup=new Group ();
  cloudsgroup=new Group ();
  
  //agregar tamaño y posición al Trex
  trex.scale = 0.5;
  trex.x = 50
  //
  ground=createSprite(width/2,height-90,width, 5);
  ground.addImage(groundImage);
  invisibleground=createSprite(width/2,height-80,width, 5);
  invisibleground.visible=false;
  trex.setCollider ("rectangle",0,0,trex.width,trex.height); //width y height sirven para la altura y el ancho y no poner cordenadas sino que se adapte al trex y no este "impresiso".
  //setCollider sirve para establecer un radio de collision entre  tu sprite y tu siguiente sprite.
  //trex.debug=true; //Sirve para ver el radio de colisión.

}


function draw()
{

  //establecer color de fondo.
  background("white");
  if (estadodejuego == JUGANDO)
  {
  ground.velocityX=-(5 + Score/100);
  Score+=Math.round(getFrameRate()/60);
  if (Score%100==0){
  sound2.play();

  }
  if((touches.length>0 && trex.y>=height-130)||keyDown("space")&& trex.y>=height-130)
  {
    trex.velocityY = -10;
    //console.log(trex.y); 
    sound3.play();
    touches=[];

  }
  
  trex.velocityY = trex.velocityY + 0.5;
  if (ground.x<0)
  {
    ground.x=300;
  }
  createcloud();
  createcactus();
  if (cactusgroup.isTouching (trex))
  {
  estadodejuego=FIN;
  sound2.play();

  }



  }
  else if (estadodejuego==FIN){
  
  ground.velocityX=0;
  cactusgroup.setVelocityXEach(0);
  cloudsgroup.setVelocityXEach(0);
  trex.changeAnimation ("stop", trexdead);
  //cangeAnimation sirve para cambiar la animación.
  cactusgroup.setLifetimeEach (-1);
  cloudsgroup.setLifetimeEach (-1);
  trex.velocityY=0;
  terminado.visible=true;
  again.visible=true;
  if (mousePressedOver(again)){
  reset();
  }
  }
  text ("score..." + Score, width-100, height/2-100);

    //cargar la posición Y del Trex
  //console.log(trex.y)
  
  //hacer que el Trex salte al presionar la barra espaciadora
  
  //evitar que el Trex caiga
  trex.collide(invisibleground);
  //collide sirve para hacer que tu sprite coche con un borde en especifíco.
  drawSprites();
}
function createcloud(){
if (frameCount%100==0) {
  cloud=createSprite (width-50,height/2+70,70, 50);      //height-height+50 //Otra manera de poner el height
  cloud.velocityX=-5;
  cloud.addImage(cloudImage);
  cloud.y=Math.round(random(height/2-30, height/2+100));
  cloud.depth=trex.depth;
  trex.depth+=1;
  cloud.lifetime=120;
  cloudsgroup.add (cloud);
}
}
function createcactus (){
if (frameCount%90==0){
cactus10=createSprite (width-50,height-100, 30,45);
cactus10.velocityX=-(5 + Score/100);
var aleatorio=Math.round(random (1, 6));
switch(aleatorio){
case 1:cactus10.addImage (cactus1);
break;
case 2:cactus10.addImage (cactus2);
break;
case 3:cactus10.addImage (cactus3);
break;
case 4:cactus10.addImage (cactus4);
break;
case 5:cactus10.addImage (cactus5);
break;
case 6:cactus10.addImage (cactus6);
break;
default:break;
}
cactus10.lifetime=width/ground.velocityX;
cactus10.scale=.6;
cactusgroup.add (cactus10);
}
}

function reset (){
 estadodejuego=JUGANDO;
 terminado.visible=false;
 again.visible=false;
 cactusgroup.destroyEach();
 cloudsgroup.destroyEach();
 trex.changeAnimation("running", trex_running);
 Score=0;
}