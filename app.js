var selectingplayer = document.getElementById("start");
var playboard = document.getElementsByClassName("playboard");
var boxes = document.getElementsByClassName("box");
var resultpage = document.getElementsByClassName("resultbox");
var restartBtn = document.getElementsByClassName("restart-btn");
var winText = document.getElementById("winText");
var match = document.getElementById("match");
var runBot = true;
for (let i = 0; i < boxes.length; i++) {
    boxes[i].setAttribute("onclick", "selectbox(this)")

}
var playerx = document.getElementById("player1");
var playero = document.getElementById("player2");
var playerSign = "X";

function selectplayer(player) {
    selectingplayer.classList.add("hide");
    playboard[0].classList.remove("hide");
    document.getElementById(player).classList.add("active")
}
function selectbox(e) {
    if (playerx.classList.contains("active")) {
        console.log(playerSign + "1");

        e.innerHTML = `<i class = "fas fa-times"></i>`
        e.style.pointerEvents = "none";
        playerx.classList.remove("active")
        playero.classList.add("active")
        e.setAttribute("id", playerSign)
    } else {
        e.innerHTML = `<i class = "fas fa-circle"></i>`
        e.style.pointerEvents = "none";

        playerx.classList.add("active")
        playero.classList.remove("active")
        playerSign = "O";
        e.setAttribute("id", playerSign)
        console.log(playerSign + "2");
    }
    selectWinner();
    var randomDelayTime = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(() => {
        bot(runBot);
    }, randomDelayTime);
}
function bot(runBot) {
    if (runBot) {
        playerSign = "O"
        var arr = [];
        for (let i = 0; i < boxes.length; i++) {
            if (boxes[i].childElementCount == 0) {
                arr.push(i)
            }

        }
        var randomBox = arr[Math.floor(Math.random() * arr.length)];
        if (arr.length > 0) {
            if (playerx.classList.contains("active")) {
                playerSign = "X"
                console.log(playerSign + "3");
                boxes[randomBox].innerHTML = `<i class = "fas fa-times"></i>`
                playerx.classList.remove("active");
                playero.classList.add("active")
                boxes[randomBox].setAttribute("id", playerSign)

            } else {
                playerSign = "O"
                boxes[randomBox].innerHTML = `<i class = "fas fa-circle"></i>`
                playero.classList.remove("active")
                playerx.classList.add("active")
                boxes[randomBox].setAttribute("id", playerSign)
                console.log(playerSign + "4");
            }
            selectWinner(runBot);
        }
        boxes[randomBox].style.pointerEvents = "none";
        playerSign = "X"
    }

}
function getID(idname) {
    return document.querySelector(".boxn" + idname).id;
}
function checkIDs(val1, val2, val3, sign) {
    if (getID(val1) == sign && getID(val2) == sign && getID(val3) == sign) {
        return true;

    }
}
function selectWinner() { 
    if (checkIDs(1, 2, 3, playerSign) || checkIDs(4, 5, 6, playerSign) || checkIDs(7, 8, 9, playerSign) || checkIDs(1, 4, 7, playerSign) || checkIDs(2, 5, 8, playerSign) || checkIDs(3, 6, 9, playerSign) || checkIDs(1, 5, 9, playerSign) || checkIDs(3, 5, 7, playerSign)) {
        runBot = false;
        bot(runBot);
        setTimeout(() => {
            playboard[0].classList.add("hide");
            resultpage[0].classList.remove("hide");
        }, 700);
        winText.innerHTML = playerSign; 
    } else { 
        if (getID(1) != "" && getID(2) != "" && getID(3) != "" && getID(4) != "" && getID(5) != "" && getID(6) != "" && getID(7) != "" && getID(8) != "" && getID(9) != "") {
            runBot = false;
            bot(runBot); 
            setTimeout(() => { 
                playboard[0].classList.add("hide");
                resultpage[0].classList.remove("hide");
            }, 700);
            match.textContent = "Match has been drawn!"; 
        }
    }
}
function restart(){
window.location.reload();
}
