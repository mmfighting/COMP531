'use strict'

var createApp = function (canvas) {
    var c = canvas.getContext("2d");
    var cheeseScore = 100
    var score = 0

    //flag=0 not started. // flag=1 timeout // flag=2 cheese eaten //flag=3 manual exit //flag=4 level up
    var flag = 0

    function resetScore() {
        score = 0
    }

    //time
    var t = 0
    var mice = []
    var difficulty = 1
    const mouseInterval = 1000
    var refreshID
    var mouseID
    var gameoverID

    function initialize() {
        console.log("initialize with difficulty", difficulty)
        mice = []
        mouseID = setInterval(createMouse, mouseInterval/(3+difficulty))
        refreshID = setInterval(refresh, 20)
        gameoverID = setTimeout(endGame, 180000)
        cheeseScore = 100
        document.getElementById("start").innerHTML="Restart"
    }

    //create a mouse with random starting location and add it to the mice list
    var createMouse = function () {
        var mouse = {}
        mouse['t0'] = t
        if (Math.random() < 0.5) {
            mouse['x0'] = Math.random() * (canvas.width - 60)
            if (Math.random() < 0.5) {
                mouse['y0'] = 0
                mouse['img'] = 'img/mouse.png'
            } else {
                mouse['y0'] = canvas.height - 60
                mouse['img'] = 'img/mouse_up.png'
            }
        } else {
            mouse['y0'] = Math.random() * (canvas.height - 60)
            if (Math.random() < 0.5) {
                mouse['x0'] = 0
                mouse['img'] = 'img/mouse_right.png'
            } else {
                mouse['x0'] = canvas.width - 60
                mouse['img'] = 'img/mouse_left.png'
            }
        }
        mouse['vx'] = (300 - mouse['x0']) / canvas.width
        mouse['vy'] = (300 - mouse['y0']) / canvas.height
        mouse['t0'] = t
        mice.push(mouse)
        paintMouse(mouse)
    }

    //paint cheese image
    var cheeseImg = new Image(344, 304)
    cheeseImg.src = 'img/cheese.png'
    function paintCheese() {
        c.drawImage(cheeseImg, 280, 280, 120, 120)
    }

    //paint mouse
    function paintMouse(mouse) {
        var mouseImg = new Image(300, 300)
        mouseImg.src = mouse['img']
        c.drawImage(mouseImg, mouse['x0'] + difficulty * mouse['vx'] * ((t - mouse['t0']) / 20), mouse['y0'] + mouse['vy'] * difficulty * ((t - mouse['t0']) / 20), 60, 60)
    }

    function refresh() {
        t = t + 20
        //c.fillRect(0, 0, canvas.width, canvas.height)
        c.clearRect(0, 0, canvas.width, canvas.height)
        paintCheese()
        //if a mouse gets to the cheese, health minus 10.
        mice = mice.filter(function (ms) {
            var x = ms['x0'] + difficulty * ms['vx'] * (t - ms['t0']) / 20
            var y = ms['y0'] + difficulty * ms['vy'] * (t - ms['t0']) / 20
            if (x > 240 && x < 360 && y > 240 && y < 360) {
                cheeseScore = cheeseScore - 10
                console.log("lost 10 points")
                return false
            } else {
                return true
            }
        })
        mice.forEach(function (ms) {
            paintMouse(ms)
        })
        document.getElementById("score").innerHTML = score
        document.getElementById("cheesescore").innerHTML = cheeseScore
        var countdown = 180000 - t
        if (countdown < 0) {
            //flag=1 represent endgame is called due to time up
            flag = 1
            endGame()
        } else {
            var minutes = Math.floor(countdown / 60000)
            var seconds = ((countdown % 60000) / 1000).toFixed(0);
            document.getElementById("time").innerHTML = minutes + ":" + (seconds < 10 ? '0' : '') + seconds
            if (cheeseScore <= 0) {
                flag = 2
                endGame()
            } else if (score >= 100 * Math.pow(difficulty, 1.5)) {
                //flag = 4 represent endgame is called due to entering next level
                flag = 4
                difficulty = difficulty + 1
                endGame()
                setTimeout(initialize, 3000)
            }
        }


    }

    document.addEventListener("click", catchMouse, false)

    //if a mouse is clicked on, remove it from mice list.
    //also add some reward for eliminating a mouse
    function catchMouse() {
        var e = window.event
        var offsetX = canvas.getBoundingClientRect().left
        var offsetY = canvas.getBoundingClientRect().top
        var clickX = e.clientX - offsetX
        var clickY = e.clientY - offsetY
        mice = mice.filter(function (ms) {
            var msX = ms['x0'] + difficulty * ms['vx'] * (t - ms['t0']) / 20
            var msY = ms['y0'] + difficulty * ms['vy'] * (t - ms['t0']) / 20
            if (msX < clickX && clickX < (msX + 60) && msY < clickY && clickY < (msY + 60)) {
                score = score + 10 * difficulty
                return false
            } else {
                return true
            }
        })
    }

    function endGame() {
        clearInterval(refreshID)
        clearInterval(mouseID)
        clearTimeout(gameoverID)
        var text1, text2
        var msgcolor
        //message
        if (flag === 1) {
            // when game ends from time up
            c.fillStyle="#7cf968"
            c.fillRect(0, 0, canvas.width, canvas.height)
            text1 = "Time is up!"
            text2 = "Your best score is " + score + "!"
            displayMSG(text1, text2)
            flag = 0
            difficulty = 1
            t=0
            document.getElementById("start").innerHTML="Start"
        } else if (flag === 4) {
            //when level up
            c.fillStyle = "#e05e9f"
            c.fillRect(0, 0, canvas.width, canvas.height)
            text1 = "Level up to LEVEL " + difficulty + "!"
            text2 = ""
            displayMSG(text1, text2)
            flag = 0
        } else {
            // when stop button is pressed or cheese is eaten
            c.fillStyle = "#ea893a"
            c.fillRect(0, 0, canvas.width, canvas.height)
            text1 = "Game Over!"
            text2 = "Your best score is " + score + "!"
            displayMSG(text1, text2)
            score = 0
            difficulty = 1
            t=0
            document.getElementById("start").innerHTML="Start"
        }
    }

    function displayMSG(t1, t2) {
        c.fillStyle = "#000000"
        c.font = "70px bold"
        c.fillText(t1, 75, 250, 500);
        c.fillText(t2, 75, 450, 500);
    }

    return {
        initialize: initialize,
        resetScore: resetScore,
        endGame: endGame
    }
}

window.onload = function () {
    var app = createApp(document.querySelector("canvas"))
    document.getElementById("start").onclick = app.initialize
    document.getElementById("stop").onclick = app.endGame
}


