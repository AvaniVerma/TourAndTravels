$(document).ready(function(){

    console.log("Ready...!")

    $('#UserLoginFormButton').click(function () {
        $.post('/user/login', {
            username : $('#username').val(),
            password : $('#password').val()    
          },
          function (data) {
            console.log(data);
          })
    
      })


      

      
    $('#signUpButton').click(function () {
        $.post('/user/signUp', {
            username : $('#newUsername').val(),
            password : $('#newPassword').val(),
            first_name : $('#first_name').val(), 
            last_name : $('#last_name').val(), 
            gender : $('#gender').val(), 
            contact : $('#contact').val(), 
            id : $('#id').val(), 
            email : $('#email').val()  
          },
          function (data) {
            console.log(data);
          })
    
      })

});