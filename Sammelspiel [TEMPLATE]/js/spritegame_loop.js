/***********************************
 * SCRIPT REFERENCES
 ***********************************/
/// <reference path="spritegame_detectCollisions.js" />
/// <reference path="spritegame_keyevents.js" />
/// <reference path="spritegame_player.js" />
/// <reference path="spritegame_main.js" />

/***********************************
 * GAME LOOP
 * **********************************/

let delay = 1;

let animationDelay = 0;
const ANIMATION_SPEED = 6;
let jumping = false;

function gameLoop() {
    let moved = false;

    const physics = PLAYER.physics;
    const onGround = touchingFloor();

    let horizontalMoved = false;

    if (KEY_EVENTS.leftArrow) {
        movePlayer(-GAME_CONFIG.characterSpeed, 0, -1);
        moved = true;
        horizontalMoved = true;
    } else if (KEY_EVENTS.rightArrow) {
        movePlayer(GAME_CONFIG.characterSpeed, 0, 1);
        moved = true;
        horizontalMoved = true;
    }

    if (KEY_EVENTS.upArrow && onGround) {
        physics.vy = physics.jumpStrength;
        jumping = true;
        moved = true;
    }

    // Apply gravity only if airborne or jumping
    if (!onGround || physics.vy !== 0) {
        physics.vy += physics.gravity;
        movePlayer(0, physics.vy, 0);
        // Only count moved if vertical displacement occurs
        if (physics.vy !== 0) moved = true;

    }

    // Landing
    if (onGround && physics.vy > 0) {
        physics.vy = 0;
        jumping = false;
        PLAYER.box.style.top = "382px";
    }

    if (moved) {
        animationDelay++;

        if (animationDelay >= ANIMATION_SPEED) {
            animatePlayer();
            animationDelay = 0;
        }

        updateHUD();
    } else {
        resetAnimatePlayer();
        animationDelay = 0;
    }

    setTimeout(gameLoop, 1000 / GAME_CONFIG.gameSpeed);
}





