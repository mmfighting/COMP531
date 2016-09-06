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
	}

	function restart(){
		document.getElementById("congrats").style="display: none"
		document.getElementById("btn").value="Click Me!"
		document.getElementById("btn").addEventListener("mouseover", movebtn, false)
	}

	function movebtn(){
		var abtn=document.getElementById("btn")
		e=window.event
		if(!e.shiftKey){
			var x=300*Math.random()
			var y=400*Math.random()
			abtn.style="top: "+x+'px'
			abtn.style="left: "+y+'px'
		}
		console.log("mouse in button area")
	}

}