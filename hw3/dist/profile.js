/**
 * Created by Lu on 9/20/16.
 */
'use strict'
window.onload = function() {

    $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();
    });

    document.getElementById("update").onclick=function(){
        var infos=document.getElementsByName("update")
        var state=true
        //this loop checks for format of inputs, except for password
        infos.forEach(function(information){
            var inputEntry=information.getElementsByTagName("input")[0]
            var notification=information.getElementsByTagName("span")[0]
            var notification2=information.getElementsByTagName("span")[1]
            if(notification2){
                notification2.style="display: none"
            }
            notification.style="display: none"
            var input=inputEntry.value
            if ((input!='')&& (inputEntry.type!="password")){
                var re=new RegExp(inputEntry.pattern)
                //if input does not match required format, alert the user
                if(!re.test(input)){
                    state=false
                    notification.style="display: block;"
                    //window.alert("Your input for "+ inputEntry.name+" does NOT match the required format!")
                }
            }
        })


        //validate password inputs
        var pass1=infos[4].getElementsByTagName("input")[0].value
        var pass2=infos[5].getElementsByTagName("input")[0].value
        if(pass1!=pass2){
            infos[5].getElementsByTagName("span")[0].style="display:block"
            state=false
        }
        if((pass1!='')&&(pass1===pass2)){
            infos[5].getElementsByTagName("span")[1].style="display:block"
            infos[4].getElementsByTagName("input")[0].value=''
            infos[5].getElementsByTagName("input")[0].value=''
        }

        //if all inputs have correct format, then update them in the display field.
        if(state){
            infos.forEach(function(information){
                var inputEntry=information.getElementsByTagName("input")[0]
                var input=inputEntry.value
                var t=document.getElementsByClassName("disp")
                //update the field with non-empty input except for password!
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
        }

    }
}