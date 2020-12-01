$(document).ready(function () {

    $("#login").click(function () {
        var username = $("#username").val();
        var password = $("#password").val();
        console.log(username);
        console.log(password);
        if(username === 'admin' && password === '12345') {
            alert("Authentication Success! Click ok to continue.")
            $(location).attr('href','dashboard.html');
        } else {
            alert("Authentication Failed! Please try again.")
        }
    })

});
