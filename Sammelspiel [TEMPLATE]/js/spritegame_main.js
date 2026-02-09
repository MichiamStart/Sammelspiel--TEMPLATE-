/***********************************
 * SCRIPT REFERENCES
 ***********************************/
/// <reference path="spritegame_detectCollisions.js" />
/// <reference path="spritegame_keyevents.js" />
/// <reference path="spritegame_player.js" />
/***********************************
 * START SCREEN
 ***********************************/
let a = 0;
mainScreenAnimate();
function mainScreenAnimate() {
    if (a % 2 === 0) {
        document.querySelector("#start img").src = "img/mainMenu.png";
    } else {
        document.querySelector("#start img").src = "img/mainMenu2.png";
    }
    a++;
    setTimeout(mainScreenAnimate, 1000);
}
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        console.log("Enter-Taste wurde gedrückt!");
        startGame();
    }
});
/***********************************
 * GAME SCREEN
 ***********************************/
let GAME_SCREEN = {
    surface: document.getElementById('surface'),
    surfaceScale: '80%',
    redbox: document.getElementById('redBox'),
    startButton: document.getElementById('startButton'),
    debug_output: document.getElementById('debug_output')
}

// Scale the surface to xx% of the screen width
GAME_SCREEN.surface.style.transform = `scale(${parseFloat(GAME_SCREEN.surfaceScale) / 100 * (window.innerWidth / GAME_SCREEN.surface.clientWidth)})`;



/***********************************
 * GAME CONFIG
 ***********************************/
let GAME_CONFIG = {
    gameSpeed: 24, // game loop refresh rate (pictures per second)
    characterSpeed: 22 // move offset in PX
}

PLAYER.physics = {
    vy: 0,
    gravity: 1.8,
    jumpStrength: -60
};


/***********************************
 * START GAME
 * **********************************/
function startGame() {
    document.getElementById("start").style = "display: none";
    document.getElementById("game").style = "display: block";
    PLAYER.box.style.left = '350px'; // starting position
    PLAYER.box.style.top = '180px'; // starting position
    PLAYER.box.style.opacity = '1'; // show player
    PLAYER.spriteImg.style.right = '0px'; // starting animation

    GAME_SCREEN.startButton.innerHTML = 'STARTED';
    GAME_SCREEN.startButton.removeAttribute('onclick');

    gameLoop();
}



/***********************************
 * DRAW HUD (debugger box)
 * **********************************/
function updateHUD() {
    // print values in debugger box
    GAME_SCREEN.debug_output.innerHTML = `x: ${PLAYER.box.style.left} | y: ${PLAYER.box.style.top} | animation: ${PLAYER.spriteImgNumber} | count: ${PLAYER.coinCount}`;
}

