'use strict'

var createApp = function(canvas) { 
	var c = canvas.getContext("2d");

	// Create the ground
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 

	var buildings=[]

	//create a building
	var build = function() { 
		var building={}
		building['x0']=Math.random()*canvas.width
		building['bldWidth']=(windowWidth+windowSpacing) * (2+Math.floor(Math.random()*10))
		building['bldHeight']=Math.random()*canvas.height/2
		building['color']=blgColors[ Math.floor(Math.random()*blgColors.length)]
		buildings.push(building)
		paintbld(building)
	}

	//paint buildings
	var paintbld = function(bld){
		c.fillStyle= bld.color
		c.fillRect(bld.x0, floor - bld.bldHeight, bld.bldWidth, bld.bldHeight)
		for (var y = floor - floorSpacing; y > floor - bld.bldHeight; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < bld.bldWidth - windowWidth; x += windowSpacing + windowWidth) {
				if (Math.floor(Math.random()*3)%2===1){
					c.fillStyle="black"
				}else{
					c.fillStyle="yellow"
				}
				c.fillRect(bld.x0 + x, y - windowHeight, windowWidth, windowHeight)
			}
		}
	}


	//increase building height if a building is clicked on
	document.addEventListener("click", bldGrow, false)

	var adjust=canvas.getBoundingClientRect().top

	function bldGrow(){
		var e=window.event
		console.log(e.clientX +'\n '+ e.clientY)
		buildings.forEach(function(bld){
			var x=e.clientX
			var y=e.clientY
			if (x>bld.x0 && x<bld.x0+bld.bldWidth && y>floor-bld.bldHeight+adjust && y<floor+adjust){
				//console.log("clicked on one building")
				bld.bldHeight+=10
				paintbld(bld)
			}
		})
	}

	//paint and update the sun every second
	setInterval(update, 50)

	//time
	var t=0

	//initial sun location
	var sunX=100
	var sunY=30 
	
	function paintSun(){
		fillCircle(sunX, sunY, 10, "#FFEF00")
	}

	function fillCircle(x,y,r,color){
		c.fillStyle=color
		c.beginPath()
		c.arc(x,y,r, 0, 2*Math.PI, false)
		c.closePath()
		c.fill()
	}

	//paint the car image
	var carY=floor-35
	var carX=50
	var carImg=new Image(800, 340)
	carImg.src='http://assets.volvocars.com/in/~/media/images/galleries/new-cars/packshots/large/png/s80modellineup_profile_studio_hisp_electricsilver_ret.png?w=800'
	console.log(carImg)

	function paintCar(){
		c.drawImage(carImg, carX, carY, 80, 40)
		//console.log("painted car")
	}

	//update location of sun and car
	function update(){
		t+= 
		sunX=Math.floor(sunX+10)%canvas.width
		sunY=50+40*Math.sin(t*0.001/Math.PI)
		carX=Math.floor(sunX+40)%canvas.width
	}

	var refresh=function(){
		c.clearRect(0, 0, canvas.width, floor)
		paintSun()
		buildings.forEach(paintbld)
		paintCar()
	}

	return {
		build: build, 
		refresh: refresh
	}
}

window.onload = function() {
	var app = createApp(document.querySelector("canvas"))
	document.getElementById("build").onclick = app.build
	setInterval(app.refresh,50)

}


