'use strict'
window.onload = function() {

	document.getElementById("update").onclick=function(){
		var infos=document.getElementsByName("info")
		var message=[]
		var state=true
		//this loop checks for format of inputs, except for password
		infos.forEach(function(information){
			var inputTag=information.getElementsByTagName("input")[0]
			var input=inputTag.value
			if ((input!='')&& (inputTag.type!="password")){
				var re=new RegExp(inputTag.pattern)
				//if input does not match required format, alert the user
				if(!re.test(input)){
					state=false
					message=[]
					window.alert("Your input for "+ inputTag.name+" does NOT match the required format!")
				}else{
					//if input format is correct, add a message for later
					if(inputTag.type!='password'){
						message.push("Your "+inputTag.name+" has been updated!\n")	
					}
				}
			}
		})
		
		var pass1=infos[4].getElementsByTagName("input")[0].value
		var pass2=infos[5].getElementsByTagName("input")[0].value
		if(state){

			if((pass1!='')&&(pass1===pass2)){
				message.push("Your password has been updated!\n")
				var pw=infos[4].getElementsByTagName("span")[1]
				while(pw.firstChild){
						pw.removeChild(pw.firstChild)
					}
					pw.appendChild(document.createTextNode(pass1))
				infos[4].getElementsByTagName("input")[0].value=''
				infos[5].getElementsByTagName("input")[0].value=''
			}

			infos.forEach(function(information){
				var inputTag=information.getElementsByTagName("input")[0]
				var input=inputTag.value
				var t=information.getElementsByTagName("span")[1]
				if ((input!='')&& (inputTag.type!="password")){
					while(t.firstChild){
						t.removeChild(t.firstChild)
					}
					t.appendChild(document.createTextNode(input))
					inputTag.value=''
				}
			})
			window.alert(message)
		}

	}
}