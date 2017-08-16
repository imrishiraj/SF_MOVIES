var city
  $(document).ready(function(){
  $("#submitweather").click(function(){
      city = $("#city").val();
      //for cordinate of globe
    var geocoder =  new google.maps.Geocoder();
          geocoder.geocode( { 'address': city}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var lati=results[0].geometry.location.lat();
            var long=results[0].geometry.location.lng();
            var mapapi=myMap(lati,long);
            $("#googleMap").html(mapapi);
            //alert("location : " +lati + "," +long); 
          } 
          else
          {
            alert("Something got wrong " + status);
          }
        });

    
    //for input city name from user

    if(city!=''){
      $.ajax({
        url:'https://data.sfgov.org/resource/wwmu-gmzc.json?&locations='+city,
        type:"GET",
        dataType:"json",
        success:function(data){
         $("#show").html(' ');
         for(var i=0;i<1000;i++)
         {
          //view of resultset
         document.getElementById("show").innerHTML = 
         document.getElementById("show").innerHTML+'<div class="list-group"> <a href="#" class="list-group-item"><table class="table table-bordered"> <tbody><tr><td>Title</td><td>'+data[i].title+'</td></tr><tr>  <td>actor_1</td> <td>'+data[i].actor_1+'</td>  </tr><tr><td>actor_2</td> <td>'+data[i].actor_2+'</td>  </tr> <tr><td>actor_3</td> <td>'+data[i].actor_3+'</td> </tr><tr><td>Director</td> <td>'+data[i].director+'</td> </tr><tr><td>Year</td> <td>'+data[i].release_year+'</td> </tr><tr><td>Company</td> <td>'+data[i].production_company+'</td> </tr><tr><td>Location</td> <td>'+data[i].locations+'</td> </tr></tbody></table></div></a></div>';

         }
        }
      });
    }
    else
    {
      //if textfield is empty
      $("#error").html('<div class="alert alert-danger alert-dismissable" id="errorcity"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Field cannot be empty!!</div>');
    }
  });
  

});
//end of function

//for map api to show city location
    
function myMap(lati,long) {
  var mapProp= {
        center:new google.maps.LatLng(lati,long),
            zoom:20,
        };
        var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}
function isEmpty()
{
  if(document.getElementById("city").value.length!=city)
  {
    document.getElementById("show").innerHTML = "";
    document.getElementById("googleMap").innerHTML = "";

  }
}

