$("MP1.3.html").ready(function(){
    
    var root = 'https://jsonplaceholder.typicode.com';
        
    getPosts();
    
    
    function getPosts()
    {
         var j=10
        
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
                        $("#main").append('<div class="article"><div class="name" value='+(postsData[i].userId -1)+'>'+(userData[postsData[i].userId -1].name)+'</div><div class="title">'+postsData[i].title+'</div><div class="text">'+postsData[i].body+'</div><div class="space"></div></div>')
                                    
                             
                            
                            });
            
             $("#more").click(function(){
                    $("#main").empty();
                        j+=10;
                        $.each(postsData, function(i) {
                                
                            if(i<j)
                                $("#main").append('<div class="article"><div class="name" value='+(postsData[i].userId -1)+'>'+(userData[postsData[i].userId -1].name)+'</div><div class="title">'+postsData[i].title+'</div><div class="text">'+postsData[i].body+'</div><div class="space"></div></div>')
                                    
                             
                        
                });
                            });
            
            };
          
        };
    
        
        
        postRequest.send();
        userRequest.send();
    }
    
       
                
                //$("#newsfeed_inner").append('"<div class="article"><div class="name">'+tempname+'</div><div class="title">lol</div><div class="text">lol</div><div class="clr"></div></div>"');
            
        $("#users").click(function(){
            $("#more").hide;
            $("#main").empty();
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
        var id= $(this).attr('value');
        //console.log(id);
        
        $("#main").empty();
        var userProfRequest = new XMLHttpRequest();
        userProfRequest.open('GET', root+"/users")
        
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
            
            
        };
        userProfRequest.send();
        
    });
     
    $("#home").click(function(){
        $("#main").empty();
       getPosts(); 
    });
    
});

