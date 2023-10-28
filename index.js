// Game Constants & Variable
let inputDir = {x: 0, y: 0};
const foodSound = new Audio('./assets/food.wav');
const gameOverSound = new Audio('./assets/gameOver.wav');
const moveSound = new Audio('./assets/move.wav');
let speed = 15;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x:10, y:15}
]
food = {x:13, y:15};
// Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime)/1000 < 1/speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snakeArr){
    // If you bump into yourself
    for (let index = 1; index < snakeArr.length; index++) {
        if (snakeArr[index].x===snakeArr[0].x && snakeArr[index].y===snakeArr[0].y) {
            return true;
        }
    }
    if(snakeArr[0].x <= 0 || snakeArr[0].x >= 18 || snakeArr[0].y <= 0 || snakeArr[0].y >= 18){
        return true;
    }
    return false;
}

function gameEngine(){
    // Part-1: Updating the snake array and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        inputDir = {x:0, y:0};
        alert("Game Over. Click on OK to play again");
        snakeArr = [{x:12, y:12}];
        //musicSound.play();
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
    }

    // If you have eaten the food, increment the score and regenerate the food
    if (snakeArr[0].x===food.x && snakeArr[0].y===food.y) {
        foodSound.play();
        score+=1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "High Score: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x, y:snakeArr[0].y+inputDir.y});
        let a = 2;
        let b = 16;
        food = {x:Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())};
        if(food.x in snakeArr.x && food.y in snakeArr.y){
            food = {x:Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())};
        }
    }

    // Moving the snake
    for (let i = snakeArr.length-2; i >= 0; i--) {
        // const element = array[i];
        snakeArr[i+1] = {...snakeArr[i]};
        
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part-2: Render/Display the snake and food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('snakehead');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Game Loop Logic
let hiscore = localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score: " + hiscoreval;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    //musicSound.play();
    inputDir = {x:0, y:1} // Start the game
    switch (e.key) {
        case "ArrowUp":
            //console.log("ArrowUp");
            moveSound.play();
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            //console.log("ArrowDown");
            moveSound.play();
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            //console.log("ArrowLeft");
            moveSound.play();
            inputDir.x = -1;
            inputDir.y = 0;
            break;
 
        case "ArrowRight":
            //console.log("ArrowRight");
            moveSound.play();
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
});

