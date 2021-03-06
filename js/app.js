// Enemies our player must avoid
var Enemy = function(row,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x= 200;
    this.y= 60 + (row-1)*80;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x= this.x + this.speed*dt;
    if(this.x>500){
        this.x= -100;
    }
    collide(this);
};

var collide = function (objcoll){
    if (player.y <= 0){
        player.x = 200;
        player.y = 400;
    }
    if (
        player.y + 100 >= objcoll.y + 90
        && player.x + 25 <= objcoll.x + 88
        && player.y + 75 <= objcoll.y + 135
        && player.x + 60 >= objcoll.x + 11) {
        player.x = 200;
        player.y = 400;
    }
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player=function(){
    this.x = 200;
    this.y = 400;
    this.sprite = "images/char-boy.png";
}

Player.prototype.update = function(){
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key){
    if ( key == 'left' && player.x > 0) {
            player.x = player.x - 100;
    }
    else if ( key == 'right' && player.x < 400) {
            player.x = player.x + 100;
    }
    else if ( key == 'up' && player.y > 0) {
            player.y = player.y - 70;
    }
    else if ( key == 'down'&& player.y < 400) {
            player.y = player.y + 70;
    }

}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies=[];
for (var i=0; i <5; i++) {
    var Rsp = randomNumberGenerator(10,31)*10;
    var Rno = randomNumberGenerator(1,4);
    allEnemies[i]= new Enemy(Rno,Rsp);
}

var player = new Player();
function randomNumberGenerator(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});