$("MP1.3.html").ready(function(){
    
    var root = 'https://jsonplaceholder.typicode.com';
        
    getPosts();
    
    
    function getPosts()
    {
         var j=10
        $("#more").show();
        $("#moreUser").hide();
        $("#main").append("<h2>Newsfeed</h2>");
        var postRequest = new XMLHttpRequest();
        var userRequest = new XMLHttpRequest();
        
        postRequest.open('GET', root+"/posts")
        userRequest.open('GET', root+"/users")
        
    
        postRequest.onload = function()
        {
            var postsData= JSON.parse(postRequest.responseText);
            postsData.reverse();
            
            userRequest.onload= function()
            {
                var userData= JSON.parse(userRequest.responseText);
                
                  $.each(postsData, function(i) {
                                
                    
                    if(i<j)
                        $("#main").append('<div class="article"><div class="name" value='+(postsData[i].userId -1)+'>'+(userData[postsData[i].userId -1].username)+'</div><div class="title">'+postsData[i].title+'</div><div class="text">'+postsData[i].body+'</div><div class="space"></div></div>')
                                    
                             
                            
                            });
            
             $("#more").click(function(){
                    $("#main").empty();
                        j+=10;
                        $.each(postsData, function(i) {
                                
                            if(i<j)
                                $("#main").append('<div class="article"><div class="name" value='+(postsData[i].userId -1)+'>'+(userData[postsData[i].userId -1].username)+'</div><div class="title">'+postsData[i].title+'</div><div class="text">'+postsData[i].body+'</div><div class="space"></div></div>')
                            
                            if(j===100)
                                $("#more").hide();
                             
                        
                });
                            });
            
            };
          
        };
    
        
        
        postRequest.send();
        userRequest.send();
        
        
    }
    
       
                
                //$("#newsfeed_inner").append('"<div class="article"><div class="name">'+tempname+'</div><div class="title">lol</div><div class="text">lol</div><div class="clr"></div></div>"');
            
        $("#users").click(function(){
            
            $("#main").empty();
            $("#main").append("<h2>User Accounts</h2>");
            $("#more").hide();
            $("#moreUser").hide();
            var userRequest = new XMLHttpRequest();
            userRequest.open('GET', root+"/users")
            
            userRequest.onload=function()
            {
                var userData= JSON.parse(userRequest.responseText);
                $.each(userData, function(i){
                    $("#main").append('<div class="article"><div id="name" class="name" value='+i+'>'+userData[i].name+'</div><div class="space"></div></div>')
                });
                
                
            };
            
            userRequest.send();
            
        });
    
    $("div").on("click", '.name', function(){
        var x=5;
        var id= $(this).attr('value');
        console.log(id);
        
        $("#main").empty();
        var userProfRequest = new XMLHttpRequest();
        var userPostRequest = new XMLHttpRequest();
        $("#more").hide();
        $("#moreUser").show();
        userProfRequest.open('GET', root+"/users")
        userPostRequest.open('GET', root+"/posts?userId="+(parseInt(id)+1))
        //console.log(id+1);
        
        //console.log(root+"/posts");
        
        
        
        //console.log(userProfRequest);
        userProfRequest.onload=function()
        {
            
            var userProfData=JSON.parse(userProfRequest.responseText);
            //console.log(userProfData.length);
            
            $("#main").append('<p>'+userProfData[id].name+'</p>');
            $("#main").append('<p>'+userProfData[id].username+'</p>');
            $("#main").append('<p>'+userProfData[id].email+'</p>');
            $("#main").append('<p>'+userProfData[id].address.street+'</p>');
            $("#main").append('<p>'+userProfData[id].address.suite+'</p>');
            $("#main").append('<p>'+userProfData[id].address.city+'</p>');
            $("#main").append('<p>'+userProfData[id].address.zipcode+'</p>');
            $("#main").append('<p>'+userProfData[id].phone+'</p>');
            $("#main").append('<p>'+userProfData[id].website+'</p>');
            $("#main").append('<p>'+userProfData[id].company.name+'</p>');
            $("#main").append('<p>'+userProfData[id].company.catchPhrase+'</p>');
            $("#main").append('<p>'+userProfData[id].company.bs+'</p>');
            
            userPostRequest.onload=function()
        {
            var test = JSON.parse(userPostRequest.responseText);
            test.reverse();
            console.log(test);
            $.each(test, function(i) {
                                
                    
                    if(i<x)
                        $("#main").append('<div class="article"><div class="name" value='+id+'>'+(userProfData[id].username)+'</div><div class="title">'+test[i].title+'</div><div class="text">'+test[i].body+'</div><div class="space"></div></div>')
                                    
                             
                            
                            });
                $("#moreUser").click(function(){
                    $("#main").empty();
                        x+=5;
                        $.each(test, function(i) {
                                
                            if(i<x)
                        $("#main").append('<div class="article"><div class="name" value='+id+'>'+(userProfData[id].username)+'</div><div class="title">'+test[i].title+'</div><div class="text">'+test[i].body+'</div><div class="space"></div></div>')
                                    
                            
                            if(x>test.length)
                                $("#moreUser").hide();
                             
                        
                });
                            });
        };
        
             userPostRequest.send();
            
            
            
        };
        userProfRequest.send();
       
        
        
        
        
        
    });
     
    $("#home").click(function(){
        $("#main").empty();
       getPosts(); 
    });
    
});

