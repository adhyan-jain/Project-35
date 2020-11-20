var dog, database, foodS, foodStock;
var dogImg, dogHappyImg;

function preload(){

  dogImg = loadImage("images/dogImg.png");
  dogHappyImg = loadImage("images/dogImg1.png");
}

function setup(){

  database = firebase.database();

  createCanvas(500, 500);
  
  dog = createSprite(250,300,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  foodStock.set(50);
}

function draw() {  

  background(46,139,87)

  if(foodS !== 0){

    if(keyWentDown(UP_ARROW)){

      writeStock(foodS);
      dog.addImage(dogHappyImg);
    }

    if(keyWentUp(UP_ARROW)){
  
      writeStock(foodS);
      dog.addImage(dogImg);
    }
  }

  if(foodS == 0){
  
    dog.addImage(dogImg);
    foodS = 50;
  }
  
  drawSprites();
  
  textSize(20)
  fill("cyan");
  text("Milk Bottles Remaining  " + foodS,120,130);
}

function readStock(data){

  foodS = data.val();
}

function writeStock(x){

  if(x <= 0){

    x = 0;
  }else{

    x=x-1
  }

  database.ref('/').update({
    food:x
  })
}