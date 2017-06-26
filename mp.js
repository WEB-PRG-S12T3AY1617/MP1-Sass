

$(document).ready(function( ){

        var aDiv= document.createElement('div');
                
        var root = 'https://jsonplaceholder.typicode.com';
        
        for(i=100; i>90; i--)
            {
                $.ajax({
//						url: root + '/photos?id=' + inputid,
                        url: root + '/posts/?id='+i,
						type: "GET",
                        dataType: "json",
						success: function(data) {
                                console.log(data[0].title);
                                console.log(data[0].userId);
                                console.log(data[0].body);
                            
                            
                            console.log(tempname);
                            
                            $("#newsfeed_inner").append('<div class="article"><div class="name">'+data[0].userId+'</div><div class="title">'+data[0].title+'</div><div class="text">'+data[0].body+'</div><div class="space"></div></div>')    
                        }
					});
                
                //$("#newsfeed_inner").append('"<div class="article"><div class="name">'+tempname+'</div><div class="title">lol</div><div class="text">lol</div><div class="clr"></div></div>"');
            }
        
   
    
    

});

        
   
   
    
