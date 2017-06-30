var root = 'https://jsonplaceholder.typicode.com';
function goToProfile(x){
    sessionStorage.setItem('userId', x);
    window.location.assign("user.html");
}

function goToAlbum(x){
    sessionStorage.setItem("albumId", x);
    window.location.assign("albums.html");
}


function loadAlbums(){
    var k = 3;
    var a = 0;
    
    var userId = sessionStorage.getItem("userId");
    
    $.ajax({
        url: root + "/albums",
        method: "GET",
        dataType: "json",
        success: function (albums){
            $.each(albums, function(i, x){
               if(albums[i].userId == userId && a < k){
                   var g = 0;
                   var album = $("<div class='album'><div class='title' onclick='goToAlbum(" + albums[i].id + ")'>" + albums[i].title + "</div></div");
                   
                   $.ajax({
                       url: root + "/photos",
                       method: "GET",
                       dataType: "json",
                       success: function (photos){
                         $.each(photos, function (m, p){
                            
                             if(photos[m].albumId == albums[i].id && g < 4){
                                 $(album).append("<div class='photo'> <img src='" + photos[m].thumbnailUrl + "'> </div>");
                                 g++;
                             }
                             
                         });
                       }
                   })
                   
                   $("#userAlbums").append(album);
                   a++;
               } 
            });
            
            $("#moreUserAlbum").click(function(){
                $("#userAlbums").empty();
                k += 3
                
                $.each(albums, function(i, x){
                    i = a + i;
                   if(albums[i].userId == userId && a < k){
                       var g = 0;
                       var album = $("<div class='album'><div class='title' onclick='goToAlbum(" + albums[i].id + ")'>" + albums[i].title + "</div></div");

                       $.ajax({
                           url: root + "/photos",
                           method: "GET",
                           dataType: "json",
                           success: function (photos){
                             $.each(photos, function (m, p){

                                 if(photos[m].albumId == albums[i].id && g < 4){
                                     $(album).append("<div class='photo'> <img src='" + photos[m].thumbnailUrl + "'> </div>");
                                     g++;
                                 }

                             });
                           }
                       })

                       $("#userAlbums").append(album);
                       a++;
                   } 
                });
            });
        }
    });
}


$(document).ready(function(){
    
    if(sessionStorage.getItem("userId") == null )
        sessionStorage.setItem("userId", 1);
    
    var j=5
    var c = 0;
    var i = 0;
    
        var arr;
        $.ajax({
            url: root + '/users/' + sessionStorage.getItem("userId"),
            type: "GET",
            dataType: "json",
            success: function(data){
                console.log(data);
                var elem = $("#userDetails");
                elem.append("<div class='fullname'>" + data.name + "</div>");
                elem.append("<div class='username name' id='username'>@" + data.username + "</div>")
                elem.append("<div class='email'>Email: <a href='mailto:" + data.email + "'>" + data.email + "</a></div>");
                elem.append("<div class='website'>Website: <a href='https://www." + data.website + "'>" + data.website + "</a></div>");
                elem.append("<div class='addressDetails'>" +
                    "<li><b>Address Details</b></li>" +
                    "<li>Street: <i>" + data.address.street + " </i></li>" +
                    "<li>Suite: <i>" + data.address.suite + "</i></li>" +
                    "<li>City: <i>" + data.address.city + "</i></li>" +
                    "<li>Zip Code: <i>" + data.address.zipcode + "</i></li></div>");
                elem.append("<div class='companyDetails'>" +
                    "<li><b>Company Details</b></li>" +
                    "<li>Name: <i>" + data.company.name + " </i></li>" +
                    "<li>Catchphrase: <i>" + data.company.catchphrase + "</i></li>" +
                    "<li>Business Strategy: <i>" + data.company.bs + "</i></li></div>");
                
            }
        })
                $.ajax({
                        url: root + '/posts',
						type: "GET",
                        dataType: "json",
						success: function(data) {
                            data.reverse();
                            while(i < j && c < data.length){
                                if(data[c].userId == sessionStorage.getItem("userId")){
                                        $("#mainUser").append('<div class="article"><div class="title">'+data[c].title+'</div><div class="text">'+data[c].body+'</div><div class="space"></div></div>');
                                    i++;
                                }
                                c++;
                            }
                            
                            $("#moreUserPost").click(function(){
                                $("#mainUser").children('.article').remove();
                                
                                j+=5;
                                while(i < j && c < data.length){
                                    if(data[c].userId == sessionStorage.getItem("userId")){
                                            $("#mainUser").append('<div class="article"><div class="title">'+data[c].title+'</div><div class="text">'+data[c].body+'</div><div class="space"></div></div>');
                                        i++;
                                    }
                                    c++;
                                }

                            });

                        }
                    
                    
					});
    
    loadAlbums();
});

