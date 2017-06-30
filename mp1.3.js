function goToProfile(x){
    sessionStorage.setItem('userId', x);
    window.location.assign("user.html");
}

$("MP1.3.html").ready(function(){
    
    var root = 'https://jsonplaceholder.typicode.com';
        
        var j=10
        var z = 0;
        var arr;
                $.ajax({
//						url: root + '/photos?id=' + inputid,
                        url: root + '/posts',
						type: "GET",
                        dataType: "json",
						success: function(data) {
                                
                            data.reverse();
                            $.each(data, function(i) {
                               
                                if(i<j)
                                    $.ajax({
                                        url: root + "/users",
                                        type: "GET",
                                        dataType: "json",
                                        success: function (dat){
                                            for(var x = 0; x < dat.length; x++){
                                                
                                                if(dat[x].id === data[i].userId){
                                                    $("#main").append('<div class="article"><div class="title">'+data[i].title+'</d iv><div class="name" onclick="goToProfile(' + dat[x].id + ')">By @'+dat[x].username+'</div><div class="text">'+data[i].body+'</div><div class="space"></div></div>');      
                                                    z++;
                                                    break;
                                                }
                                            }
                                        }
                                    })
                            });
                            
                        $("#more").click(function(){
                            $("#main").empty();
                            
                            $("#main").append("<h2>Newsfeed</h2>")
                            j+=10;
                            $.each(data, function(i) {
                               i = i + z;
                                if(i<j)
                                    $.ajax({
                                        url: root + "/users",
                                        type: "GET",
                                        dataType: "json",
                                        success: function (dat){
                                            for(var x = 0; x < dat.length; x++){
                                                
                                                if(dat[x].id === data[i].userId){
                                                    $("#main").append('<div class="article"><div class="title">'+data[i].title+'</div><div class="name" onclick="goToProfile(' + dat[x].id + ')"> By @'+dat[x].username+'</div><div class="text">'+data[i].body+'</div><div class="space"></div></div>');     
                                                    z++;
                                                    break;
                                                }
                                            }
                                        }
                                    })
                            });
                        });

}
                    
                    
					});
                
                //$("#newsfeed_inner").append('"<div class="article"><div class="name">'+tempname+'</div><div class="title">lol</div><div class="text">lol</div><div class="clr"></div></div>"');
    
    
});
