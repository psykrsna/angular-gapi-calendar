angular.module('calendar')
.controller('LoginController', function(){
    this.login_button_text = 'Login With Google';
    this.login = function(){
        this.login_button_text = 'Authenticating...';
        handleAuthClick();
    }
});
