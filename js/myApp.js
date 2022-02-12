  // function for Show Success or Error Messages
  function message(message, status){
    if(status == true){
      $("#success-message").html(message).slideDown();
      $("#error-message").slideUp();
      setTimeout(function(){
        $("#success-message").slideUp();
      },4000);

    }else if(status == false || status == 'exit'){
      $("#error-message").html(message).slideDown();
      $("#success-message").slideUp();
      setTimeout(function(){
        $("#error-message").slideUp();
      },4000);
    }
  }

  // Function for form Data to JSON Object
  function jsonData(targetForm){
      var arr = $(targetForm).serializeArray();
    
      var obj = {};
      for(var a= 0; a < arr.length; a++){
        if(arr[a].value == ""){
          return false;
        }
        obj[arr[a].name] = arr[a].value;
      }
      
      var json_string = JSON.stringify(obj);

      return json_string;      
  }

  // Function for fetch all notices
  function getAllNotices(){    
    $.ajax({ 
      url : './api/api.viewNotice.php',
      type : "POST",
      success : function(data){
        
        /* Denied for unauthorized user access */
        if(data.status=='exit'){
          message(data.message, data.status);
          setTimeout(()=>{
            $(location).attr('href','./');
          },1000);
        }
        else if(data.status==true){
          for (var i = 0; i < data.notice.length; i++) {
            $("#load-data").append("<b>✔ </b>"+data.notice[i].notice+"<hr/>");
          }
        }else{
          $("#load-data").append("<b>"+data.message+"<b/>");
        }

      }
    });
  }

  // view profile
  function viewProfile(){
    $.ajax({ 
      url : './api/api.profile.php',
      type : "POST",
      success : function(data){
        /* Denied for unauthorized user access */
        if(data.status=='exit'){
          message(data.message, data.status);
          setTimeout(()=>{
            $(location).attr('href','./');
          },1000);
        }
        else if(data.status == true){
          let name = data.profile[0].name.split(" ");
          if(name[1]){
            $("#hi-user").append(name[0]+" "+name[1]);
          }else{
            $("#hi-user").append(name[0]);
          }
        }

      }
    });
  }

  function loadFriendPage(){
    getFriends();
    getPendingFriends();
    getUsers();
  }

   // Function for fetch all friends
  function getFriends(){  
    $.ajax({ 
      url : './api/api.getFriends.php',
      type : "POST",
      success : function(data){

        /* Denied for unauthorized user access */
        if(data.status=='exit'){
          message(data.message, data.status);
          setTimeout(()=>{
            $(location).attr('href','./');
          },1000);
        }
        else if(data.status==true){
          try{
            for (var i = data.allFriend.length - 1; i >= 0; i--) {
              $("#all-friends").append("<a title='"+data.allFriend[i].mobile+", "+data.allFriend[i].email+"' class='add-friend-btn'>&#9825;</a>"+data.allFriend[i].name+"<hr/>");
            }
          }catch(e){
            $("#all-friends").append("&#9888; Error");
          }
        }else{
          $("#all-friends").append("&#9888; "+data.message);
        }

      }
    });
  }

   // Function for fetch all pending friends
  function getPendingFriends(){  
    $.ajax({ 
      url : './api/api.getPendingFriend.php',
      type : "POST",
      success : function(data){
        
        /* Denied for unauthorized user access */
        if(data.status=='exit'){
          message(data.message, data.status);
          setTimeout(()=>{
            $(location).attr('href','./');
          },1000);
        }
        else if(data.status==true){
          try{
            for (var i = data.allPendingFriend.length - 1; i >= 0; i--) {
              $("#pending-friends").append("<a title='Accept Friend Request' data-af='"+data.allPendingFriend[i].usr_id+"' id='af-"+data.allPendingFriend[i].usr_id+"' class='add-friend-btn bg-green'>Accept</a><a title='Delete Friend Request' data-rejf='"+data.allPendingFriend[i].usr_id+"' id='rejf-"+data.allPendingFriend[i].usr_id+"' class='add-friend-btn bg-red'>Reject</a>"+data.allPendingFriend[i].name+"<hr/>");
            }
          }catch(e){
            $("#pending-friends").append("&#9888; Error");
          }
        }else{
          $("#pending-friends").append("&#9888; "+data.message);
        }

      }
    });
  }

   // Function for fetch all users
  function getUsers(){  
    $.ajax({ 
      url : './api/api.getUsers.php',
      type : "POST",
      success : function(data){

        /* Denied for unauthorized user access */
        if(data.status=='exit'){
          message(data.message, data.status);
          setTimeout(()=>{
            $(location).attr('href','./');
          },1000);
        }
        else if(data.status==true){
          try{
            for (var i = data.allUser.length - 1; i >= 0; i--) {
              $("#all-users").append("<a title='"+data.allUser[i].mobile+", "+data.allUser[i].email+"' data-rf='"+data.allUser[i].usr_id+"' id='rf-"+data.allUser[i].usr_id+"' class='add-friend-btn bg-blue'>Add Friend</a>"+data.allUser[i].name+"<hr/>");
            }
          }catch(e){
            $("#all-users").append("&#9888; Error");
          }
        }else{
          $("#all-users").append("&#9888; "+data.message);
        }

      }
    });
  }
  
/*********************** When document is completely loded ****************************/

 $(document).ready(function(){

  $('#signup-btn').click(function(){
    $('#signupForm').slideUp();
    $('#loginForm').slideDown();
    $('#loginForm')[0].reset();
  });
 
  $('#login-btn').click(function(){
    $('#loginForm').slideUp();    
    $('#signupForm').slideDown();
    $('#signupForm')[0].reset();
  });

  // User login
  $("#login").on("click",function(e){
    e.preventDefault();

      const mob = $('#mob').val();
      const pass = $('#pass').val();

      if(mob == "" || pass == ""){
        message("All Fields are required.",false);
      }else{
        $.ajax({ 
        url : './api/api.login.php',
        type : "POST",
        data : {mob : mob, pass : pass},
        success : function(data){
          message(data.message, data.status);
          if(data.status==true){
            setTimeout(()=>{
              $(location).attr('href','./dashboard.html');
            },700);            
          }
        }
      });
    }
  });

  // User Signup
  $("#signup").on("click",function(e){
    e.preventDefault();

      const name = $('#name').val();
      const mobile = $('#mobile').val();
      const email = $('#email').val();
      const password = $('#password').val();

      if(name == "" || mobile == "" || email == "" || password == ""){
        message("All Fields are required.",false);
      }else{
        $.ajax({ 
        url : './api/api.signup.php',
        type : "POST",
        data : {name : name, mobile : mobile, email : email, password : password},
        success : function(data){
          message(data.message, data.status);
          $('#name').val(''); 
          $('#mobile').val(''); 
          $('#email').val(''); 
          $('#password').val(''); 
        }
      });
    }
  });

  // Upload new notice
  $("#addNotice").on("click",function(e){
    e.preventDefault();

      const notice = $('#notice').val();

      if(notice == ""){
        message("Notice Fields are required.",false);
      }else{
        $.ajax({ 
        url : './api/api.sendNotice.php',
        type : "POST",
        data : {notice : notice},
        success : function(data){
          message(data.message, data.status);
          $('#load-data').empty();
          $('#notice').val('');          
          getAllNotices();
        }
      });
    }
  });


  /* code for request friend */
  $(document).on("click",'a[data-rf]', function() {
    const request_id = $(this).attr("data-rf");
    clickedId = "#rf-"+request_id;
  
    $(clickedId).on("click",function(e){
      e.preventDefault();
      $.ajax({ 
        url : './api/api.requestFriend.php',
        type : "POST",
        data : {request_id : request_id},
        success : function(data){

          if(data.status=='exit'){
            message(data.message, data.status);
            setTimeout(()=>{
              $(location).attr('href','./');
            },1000);
          }
          else if(data.status==true){
            message(data.message, data.status);
          }else{
            message(data.message, data.status);
          }

        }
      });
    });
  }); 

  /* code for accept friend */
  $(document).on("click",'a[data-af]', function() {
    const request_id = $(this).attr("data-af");
    clickedId = "#af-"+request_id;

    console.log(request_id);
  
    $(clickedId).on("click",function(e){
      e.preventDefault();
      $.ajax({ 
        url : './api/api.acceptFriend.php',
        type : "POST",
        data : {request_id : request_id},
        success : function(data){

          if(data.status=='exit'){
            message(data.message, data.status);
            setTimeout(()=>{
              $(location).attr('href','./');
            },1000);
          }
          else if(data.status==true){
            $('#pending-friends').empty();
            getPendingFriends();
            $('#all-friends').empty();
            getFriends();
            message(data.message, data.status);
          }else{
            message(data.message, data.status);
          }

        }
      });
    });
  }); 

  /* code for reject friend */
  $(document).on("click",'a[data-rejf]', function() {
    const request_id = $(this).attr("data-rejf");
    clickedId = "#rejf-"+request_id;
  
    $(clickedId).on("click",function(e){
      e.preventDefault();
      $.ajax({ 
        url : './api/api.rejectFriend.php',
        type : "POST",
        data : {request_id : request_id},
        success : function(data){

          if(data.status=='exit'){
            message(data.message, data.status);
            setTimeout(()=>{
              $(location).attr('href','./');
            },1000);
          }
          else if(data.status==true){
            $('#pending-friends').empty();
            getPendingFriends();
            message(data.message, data.status);
          }else{
            message(data.message, data.status);
          }

        }
      });
    });
  }); 

});
  
/***************************************************************************/
