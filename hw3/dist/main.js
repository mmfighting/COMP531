'use strict'
window.onload = function () {

    document.getElementById("status_update").onclick=function(){
        //add onclick event to status_update button.
        document.getElementById("disp_status").innerHTML = document.getElementById("statusinput").value
        document.getElementById("statusinput").value=''
    }


}