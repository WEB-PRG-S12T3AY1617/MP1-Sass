
var root = 'https://jsonplaceholder.typicode.com';

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
                            $("#modalImg").append("<div><b>Title: </b> " + data.title + "</div>");
                            $("#modalImg").append("<div><img src='" + data.url + "'/></div>");
                            $("#modalImg").append('<div class="nameLarge" onclick="goToProfile(' + da.id + ')">By @'+ da.username+'</div>' +
                                                 " in the <b>Album</b>: " + dat.title);
                            $("#modalView").fadeIn(200);
                        }
                    })

                }
            });
        }
    });
}

$(document).ready(function () {
   
    var albumId = sessionStorage.getItem("albumId");
    var z = 0, j = 12;
    
    if(albumId == null)
        albumId = 1;
    
    $("#modalView").click(function(e){
        if(!$(e).is("#modalImg")){
            $("#modalView").fadeOut(200);
        }
    })
    
    $("#closeModal").click(function(){
       $("#modalView").fadeOut(200);
    });
    
    $.ajax({
        url: root + "/albums/" + albumId,
        method: "GET",
        dataType: "json",
        success: function (album){
            $("#title").html(album.title);
            $.ajax({
                url: root + "/photos",
                method: "GET",
                dataType: "json",
                success: function (photos){
                    $.each(photos, function (i, x){
                       
                        if(photos[i].albumId == albumId && z < j){
                            $("#main").append('<div class="image"><img src="' + photos[i].thumbnailUrl + '" onclick="openModal(' + photos[i].id + ', ' + album.id + ', ' + album.userId + ')"></div>'); 
                            z++;
                        }
                        
                    });
                }
            });
            
             $("#more").click(function(){
                    $("#main").empty();

                    $("#main").append("<h2 id='title'>" + album.title + "</h2>")
                    j+=12;
                 var x = z;
                 $.ajax({
                     url: root + "/photos",
                     method: "GET",
                     dataType: "json",
                     success: function (photos){
                         $.each(photos, function(i, photo){
                            i = i + z;
                             if(photo.albumId == albumId && x < j){
                                $("#main").append('<div class="image"><img src="' + photos[i].thumbnailUrl + '" onclick="openModal(' + photos[i].id + ', ' + album.id + ', ' + album.userId + ')"></div>');
                                 x++;
                            }
                         });
                     }
                 }).then(function (){
                     z = x;
                 })

            });
        }
    })
    
});