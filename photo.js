function goToProfile(x){
    sessionStorage.setItem('userId', x);
    window.location.assign("user.html");
}

function goToAlbum(x){
    sessionStorage.setItem("albumId", x);
    window.location.assign("albums.html");
}

function openModal(imgId, albumId, userId){
    $("#modalImg").empty();
    $.ajax({
        url: root + '/photos/' + imgId,
        type: "GET",
        dataType: "json",
        success: function(data) {
            
            $.ajax({
                url: root + "/albums/" + albumId,
                type: "GET",
                dataType: "json",
                success: function (dat){
                    
                     $.ajax({
                        url: root + "/users/" + userId,
                        type: "GET",
                        dataType: "json",
                        success: function (da){    
                            console.log(data);
                            $("#modalImg").append("<div><b>Title: </b> " + data.title + "</div>");
                            $("#modalImg").append("<div><img src='" + data.url + "'/></div>");
                            $("#modalImg").append('<div class="nameLarge" onclick="goToProfile(' + da.id + ')">By @'+ da.username+'</div>' +
                                                 " in the <b>Album</b>: <span class='nameLarge' onclick='goToAlbum(" + dat.id + ")'>" + dat.title + "</span>");
                            $("#modalView").fadeIn(200);
                        }
                    })

                }
            });
        }
    });
}

var root = 'https://jsonplaceholder.typicode.com';

$(document).ready(function(){
    
    $("#modalView").click(function(e){
        if(!$(e).is("#modalImg")){
            $("#modalView").fadeOut(200);
        }
    })
    
    $("#closeModal").click(function(){
       $("#modalView").fadeOut(200);
    });
    
        
        var j=12
        var z = 0;
        var arr;
                $.ajax({
//						url: root + '/photos?id=' + inputid,
                        url: root + '/photos',
						type: "GET",
                        dataType: "json",
						success: function(data) {
                                
                            data.reverse();
                            $.each(data, function(i) {
                                var albumId = data[i].albumId;
                                
                                if(i<j)
                                    $.ajax({
                                        url: root + "/albums/" + albumId,
                                        type: "GET",
                                        dataType: "json",
                                        success: function (dat){
                                            var userId = dat.userId;
                                            
                                             $.ajax({
                                                url: root + "/users/" + userId,
                                                type: "GET",
                                                dataType: "json",
                                                success: function (da){
                                                    $("#main").append('<div class="image"><img src="' + data[i].thumbnailUrl + '" onclick="openModal(' + data[i].id + ', ' + dat.id + ', ' + da.id + ')"></div>'); 
                                                    z++;
                                                }
                                            })
                                            
                                        }
                                    })
                            });
                            
                        $("#more").click(function(){
                            $("#main").empty();
                            
                            $("#main").append("<h2>Photos</h2>")
                            j+=12;
                            $.each(data, function(i) {
                                i = i + z;
                                var albumId = data[i].albumId;
                                
                                if(i<j)
                                    $.ajax({
                                        url: root + "/albums/" + albumId,
                                        type: "GET",
                                        dataType: "json",
                                        success: function (dat){
                                            var userId = dat.userId;
                                            
                                             $.ajax({
                                                url: root + "/users/" + userId,
                                                type: "GET",
                                                dataType: "json",
                                                success: function (da){
                                                    $("#main").append('<div class="image"><img src="' + data[i].thumbnailUrl + '" onclick="openModal(' + data[i].id + ', ' + dat.id + ', ' + da.id + ')"></div>'); 
                                                }
                                            })
                                            
                                        }
                                    })
                            });
                            
                        });

}
                    
                    
					});
                
                //$("#newsfeed_inner").append('"<div class="article"><div class="name">'+tempname+'</div><div class="title">lol</div><div class="text">lol</div><div class="clr"></div></div>"');
    
    
});