var tank, tank_img;
var Bullet, bullet_img;
var explosion, explosion_img;
var zombie, zombie_img;
var restart, restart_img;
var road, road_img;
var bulletG, zombieG;

var skelton, skelton_img;
var xavier, xavier_img;

var PLAY = 1;
var END = 2 ;
var gameState = PLAY;

var end1;
var kills = 0;

var explosionG;

var skeltonG, xavierG;

var die, growl;
var explosion_sound;
var shot;

var smll_die, small_growl;

function preload(){

    tank_img = loadAnimation("t1.png","t2.png","t3.png","t4.png");
    bullet_img = loadImage("b3.png");
    explosion_img = loadAnimation("e1.png","e2.png","e3.png","e4.png","e5.png");
    zombie_img = loadAnimation("Z1.png","Z2.png","Z3.png");
    endImg = loadImage("gameover.png");
    restart_img = loadImage("restart.png");
    road_img = loadImage("1Tank.png");
    die = loadSound("Die.mp3");
    growl = loadSound("growl.mp3");
    explosion_sound = loadSound("EXP.mp3");
    shot = loadSound("shot.mp3");
    skelton_img = loadAnimation("s1.png","s2.png","s3.png","s4.png");
    xavier_img = loadAnimation("x1.png","x2.png","x3.png");
    baba = loadSound("Dies.mp3");
    babo = loadSound("diess.mp3")
    smll_die = loadSound("zw3.mp3")
    small_growl = loadSound("zw1.mp3");
}

function setup() {

    createCanvas(windowWidth, windowHeight);

    road = createSprite(width/2 + 100, height/2);
    road.addImage(road_img);
    road.x = width/2;

    end1 = createSprite(width/2-20, height/2-150);
    end1.addImage(endImg);
    
    restart = createSprite(width/2, height/2+ 100);
    restart.addImage(restart_img);
    restart.scale= .3

    tank = createSprite(width/2 - 600,height/2)
    tank.addAnimation("tank_r",tank_img);
    tank.scale = 3
    

    zombieG = new Group();
    bulletG = new Group();
    explosionG = new Group();
    skeltonG = new Group();
    xavierG = new Group();
}

function draw(){
    background(0);

    if (gameState === PLAY){
        
        zombie1();
        skullton();
        xavier12();
        tank.y = World.mouseY
        road.velocityX = -(4 + 1* kills);
        
        restart.visible = false;
        end1.visible = false;

        if (road.x < 320 ){
            road.x = road.width/2
        }
        
        if (keyWentDown ("space")){
            bullet1();
            shot.play();
        }


        if (bulletG.isTouching(zombieG)){
            bulletG.destroyEach();
            zombieG.destroyEach();
            kills = kills + 1
            die.play()
        }
        
        if (tank.isTouching(zombieG)){
            gameState = END;
            explosion_sound.play(); 
            end11();
        }
///////////////////////////////////////////////////////
        if (bulletG.isTouching(skeltonG)){
            bulletG.destroyEach();
            skeltonG.destroyEach();
            kills = kills + 1;
            baba.play();
            
        }

        if (tank.isTouching(skeltonG)){
            gameState = END;
            explosion_sound.play();
            end11();
        }
//////////////////////////////////////////////////////
        if (bulletG.isTouching(xavierG)){
            bulletG.destroyEach();
            xavierG.destroyEach();
            kills = kills + 1;
            smll_die.play();
        }
        
        if (tank.isTouching(xavierG)){
            gameState = END;
            explosion_sound.play();
            end11();
        }
////////////////////////////////////////////////////////
    }
    else if (gameState === END){
        
        restart.visible = true;
        end1.visible = true;

        zombieG.destroyEach();
        skeltonG.destroyEach();
        
        road.velocityX = 0;
        if (mousePressedOver(restart)){
            reset();
        }
        
        
    }
    drawSprites();
    textSize(20);
    fill(255);
    text ("kills: "+ kills, 50, 50);
}

function bullet1(){
    bullet = createSprite (200, 200, 20,);
    bullet.addImage(bullet_img);
    bullet.y = tank.y + 2;
    bullet.x = tank.x + 55;
    bullet.velocityX = +(10 + 1*kills);
    bullet.scale = .1;
    bullet.lifetime = 130
    bulletG.add(bullet);
}
function zombie1(){
    if (frameCount % 200 === 0){
        zombie = createSprite(width+20, height-300, 20, 30);
        zombie.addAnimation("z12", zombie_img);
        zombie.velocityX = -(6 + 1*kills);
        zombie.y = Math.round(random(100, 600))
        zombie.scale = .4
        zombieG.add(zombie);
        zombie.setCollider ("circle", 10, 10, 80);
    }
    if (frameCount % 500 === 0){
        growl.play()
    }
    
}
function skullton(){
    if (frameCount % 320 === 0){
        
        skelton = createSprite(width+20, height-300, 20, 30);
        skelton.addAnimation("s13", skelton_img);
        skelton.velocityX = -(6 + 1*kills);
        skelton.y = Math.round(random(100, 600))
        skelton.scale = 1.5
        skeltonG.add(skelton);
    }
    
}


function xavier12(){
    if (frameCount % 410 === 0){
        xavier = createSprite(width+20, height-300, 20, 30);
        xavier.addAnimation("s13", xavier_img);
        xavier.velocityX = -(6 + 1*kills);
        xavier.y = Math.round(random(100, 600))
        xavier.scale = 2
        xavierG.add(xavier);
    }
}
function end11(){
    
    explosion = createSprite (width/2, height/2);
    explosion.addAnimation("expsooo",explosion_img);
    explosion.x = tank.x
    explosion.y = tank.y
    explosion.scale = 1
    explosionG.add(explosion);
    
}
function reset(){
    gameState = PLAY;
    kills = 0
    explosionG.destroyEach();
}