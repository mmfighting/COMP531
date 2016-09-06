window.onload = function() {
	var abtn=document.getElementById("btn")
	document.getElementById("btn").addEventListener("mouseover", movebtn, false)
	abtn.onclick=function(){
		if (abtn.value=="Click Me!"){
			console.log("clicked button")
			won()
		}
		else if (abtn.value=="Restart!"){
			console.log(restart)
			restart()
		}
	}

	function won(){
		document.getElementById("congrats").style="display: block;"
		document.getElementById("btn").value="Restart!"
		document.getElementById("btn").removeEventListener("mouseover", movebtn)
		abtn.style="top: 10px; left: 10px"
	}

	function restart(){
		document.getElementById("congrats").style="display: none"
		abtn.value="Click Me!"
		abtn.addEventListener("mouseover", movebtn, false)
	}

	function movebtn(){
		var abtn=document.getElementById("btn")
		e=window.event
		if(!e.shiftKey){
			var x=500*Math.random()
			var y=500*Math.random()
			abtn.style.left=x+'px'
			abtn.style.top=y+'px'
		}
		console.log("mouse in button area")
	}

}