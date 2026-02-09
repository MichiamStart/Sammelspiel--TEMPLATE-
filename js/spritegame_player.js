/***********************************
 * SCRIPT REFERENCES
 ***********************************/
/// <reference path="spritegame_detectCollisions.js" />
/// <reference path="spritegame_keyevents.js" />



/***********************************
 * PLAYER
 ***********************************/
let PLAYER = {
    box: document.getElementById('player'),
    spriteImg: document.getElementById('spriteImg'),
    spriteImgNumber: 0, // current animation frame of sprite image
    spriteDirection: 1,
    coinCount: 0
}



/***********************************
 * MOVE
 * **********************************/
/**
 * @param {number} dx - player x move offset in pixel
 * @param {number} dy - player y move offset in pixel
 * @param {number} dr - player heading direction (-1: look left || 1: look right)
 */
function movePlayer(dx, dy, dr) {
    // current position
    let currentX = parseFloat(PLAYER.box.style.left) || 0;
    let currentY = parseFloat(PLAYER.box.style.top) || 0;

    // target position
    let targetX = currentX + dx;
    let targetY = currentY + dy;

    // smoothing factor (lower = smoother, higher = snappier)
    const SMOOTHING = 0.25;

    // interpolate (lerp)
    let newX = currentX + (targetX - currentX) * SMOOTHING;
    let newY = currentY + (targetY - currentY) * SMOOTHING;

    // apply position
    PLAYER.box.style.left = newX + "px";
    PLAYER.box.style.top = newY + "px";

    // update sprite direction
    if (dr !== 0 && dr !== PLAYER.spriteDirection) {
        PLAYER.spriteDirection = dr;
        PLAYER.box.style.transform = `scaleX(${dr})`;
    }
}

/***********************************
 * ANIMATE PLAYER
 * **********************************/
function animatePlayer() {
    if (jumping) {
        PLAYER.spriteImgNumber = 6;
        PLAYER.spriteImg.style.right = 78 * 5 + "px";
        return;
    }

    if (PLAYER.spriteImgNumber < 3) {
        PLAYER.spriteImgNumber++;
        let x = parseFloat(PLAYER.spriteImg.style.right);
        x += 78.0;
        PLAYER.spriteImg.style.right = x + "px";
    } else { 
        PLAYER.spriteImg.style.right = "78px";
        PLAYER.spriteImgNumber = 1;
    }
}

function resetAnimatePlayer() {
    PLAYER.spriteImg.style.right = "0px";
    PLAYER.spriteImgNumber = 0;
}