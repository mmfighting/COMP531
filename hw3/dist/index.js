function getTimeStamp() {
    document.getElementById("timestamp").value = new Date(Date.now())
}

function calculateAge(form) {
    var today = new Date(Date.now())
    var birthd = new Date(form.dob.value)
    var age = today.getFullYear() - birthd.getFullYear()
    var month = today.getMonth() - birthd.getMonth()
    var date = today.getDate() - birthd.getDate()
    console.log(month)
    if (month < 0) {
        age--
    }
    if (month == 0 && date < 0) {
        age--
    }
    return age
}

function validation(form) {
    if (form.password1.value != form.password2.value) {
        window.alert("The password and confirmation you entered do not match!!")
        return false
    }

    if (calculateAge(form) < 18) {
        window.alert("You are not 18 years old or older so that you cannot register!")
        return false
    } else {
        return true
    }
}