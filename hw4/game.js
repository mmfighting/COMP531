'use strict'

var createApp = function(canvas) {
    var c = canvas.getContext("2d");

    //increase building height if a building is clicked on
    document.addEventListener("click", paintCheese, false)

    //paint and update the sun every second
    setInterval(update, 50)

    //time
    var t=0

    var cheeseImg=new Image(344, 304)
    cheeseImg.src='http://pngimg.com/upload/cheese_PNG11.png'
    function paintCheese(){
        c.drawImage(cheeseImg, 270, 270, 70, 60)
    }
    //paint the car image
    var mouseY=50
    var mouseX=270
    var mouseImg=new Image(300, 300)
    mouseImg.src='http://cliparts.co/cliparts/piq/KRy/piqKRyBxT.png'
    //mouseImg.src='http://www.clipartkid.com/images/183/brown-mouse-clip-art-at-clker-com-vector-clip-art-online-royalty-6qPIkj-clipart.png'
    //console.log(mouseImg)

    function paintMouse(){
        c.drawImage(mouseImg, mouseX, mouseY, 60, 60)
        //console.log("painted car")
    }

    //update location of location of mouse
    function update(){
        t+=50

    }

    var refresh=function(){
        paintCheese()
        paintMouse()
    }

    return {
        paintCheese: paintCheese,
        paintMouse: paintMouse,
        refresh: refresh
    }
}

window.onload = function() {
    var app = createApp(document.querySelector("canvas"))
    document.getElementById("start").onclick = app.refresh()
    setInterval(app.refresh,50)

}


