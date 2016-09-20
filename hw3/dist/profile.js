'use strict'
window.onload = function() {

    document.getElementById("update").onclick=function(){
        var infos=document.getElementsByName("update")
        var message=[]
        var state=true
        //this loop checks for format of inputs, except for password
        infos.forEach(function(information){
            var intputEntry=information.getElementsByTagName("input")[0]
            //console.log(intputEntry)
            var input=intputEntry.value
            if ((input!='')&& (intputEntry.type!="password")){
                var re=new RegExp(intputEntry.pattern)
                //if input does not match required format, alert the user
                if(!re.test(input)){
                    state=false
                    message=[]
                    window.alert("Your input for "+ intputEntry.name+" does NOT match the required format!")
                }else{
                    //if input format is correct, add a message for later
                    if(intputEntry.type!='password'){
                        message.push("Your "+intputEntry.name+" has been updated!\n")
                    }
                }
            }
        })
        console.log(infos)
        var pass1=infos[4].getElementsByTagName("input")[0].value
        var pass2=infos[5].getElementsByTagName("input")[0].value
        if(pass1!=pass2){
            window.alert("Your passwords do not match!")
            state=false
        }
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

        if(state){
            infos.forEach(function(information){
                var inputEntry=information.getElementsByTagName("input")[0]
                var input=inputEntry.value
                var t=document.getElementsByClassName("disp")
                console.log(t)
                if(input!=''){
                    var index
                    if (inputEntry.type=="text"){
                        index=0
                    }else if(inputEntry.type=="email"){
                        index=1
                    }else if(inputEntry.type=="tel") {
                        index=3
                    }else if(inputEntry.type=="number"){
                        index=4
                    }
                    var m=t[index].getElementsByTagName("span")[0]
                    while(m.firstChild){
                        m.removeChild(m.firstChild)
                    }
                    m.appendChild(document.createTextNode(input))
                    inputEntry.value=''
                }
            })
            //window.alert(message)
        }

    }
}