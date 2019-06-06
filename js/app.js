"use strict";
let score = 0;
// Get the modal
let modal = document.getElementById('myModal');
let btn = document.getElementById("play-again");
let span = document.getElementsByClassName("close")[0];

const restartGame = document.getElementById('restart');
restartGame.addEventListener('click', function () {
    document.location.reload(true);
})

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
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
    this.x += this.speed * dt;
    if (this.x >= 505) {
        this.x = -60;
        this.speed = 100 + Math.floor((Math.random() * 100) + 1);
    }
    if (this.x < player.x + 60 &&
        this.x + 60 > player.x &&
        this.y < player.y + 40 &&
        40 + this.y > player.y)
        {
                player.reset();
                modal.style.display = "block";
                document.getElementById('winning').textContent = `Awh Man! Your score is ${score}!!!`;
                document.getElementById("score").innerText = "Score : " + 0;
                dismissModal();
        }
        
    };

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let Player = function (x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {

    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.y > 400) {
        this.y = 400;
    }
    if (this.y < 0) {
        this.y = 0;
        setTimeout(() => {
            player.reset();
            score = score + 1;
            document.getElementById("score").innerText = "Score : " + score;
            if (score === 10) {
                modal.style.display = "block";
                document.getElementById('winning').textContent = `Congratulations!!! Your score is ${score}.`;
                dismissModal();
                document.getElementById("score").innerText = "Score : " + 0;
                }
            }, 100);
    }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (arrowKeyPress){
    if (arrowKeyPress == 'right') {
        this.x += 101;
    }

    if (arrowKeyPress == 'left') {
        this.x -= 101;
    }

    if (arrowKeyPress == 'up') {
        this.y -= 84;
    }

    if(arrowKeyPress == 'down') {
        this.y += 84; 
    }

};

//Resetting player's position as soon as hits water or collides with bugs
Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [new Enemy(0, 60, 90), new Enemy(0, 140, 60), new Enemy(0, 225, 80)];
let player = new Player(200, 400);

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

// To dismiss the modal
function dismissModal () {

    //Play again button restarts the game and removes the modal
    btn.onclick = function() {
    modal.style.display = "none";
    player.reset();
    document.location.reload(true);
    }
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    player.reset();
    document.location.reload(true);
    }       

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            player.reset();
            score = 0;
            document.location.reload(true);
        }
    }
}

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);