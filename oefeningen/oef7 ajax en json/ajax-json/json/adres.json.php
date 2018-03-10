<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
?>
{
   "results" : [
      {
         "address_components" : [
            {
               "long_name" : "Brussel",
               "short_name" : "Brussel",
               "types" : [ "locality", "political" ]
            },
            {
               "long_name" : "Brussel",
               "short_name" : "Brussel",
               "types" : [ "administrative_area_level_1", "political" ]
            },
            {
               "long_name" : "België",
               "short_name" : "BE",
               "types" : [ "country", "political" ]
            }
         ],
         "formatted_address" : "Brussel, België",
         "geometry" : {
            "bounds" : {
               "northeast" : {
                  "lat" : 50.91370999999999,
                  "lng" : 4.43697990
               },
               "southwest" : {
                  "lat" : 50.79624010,
                  "lng" : 4.31380
               }
            },
            "location" : {
               "lat" : 50.85033960,
               "lng" : 4.35171030
            },
            "location_type" : "APPROXIMATE",
            "viewport" : {
               "northeast" : {
                  "lat" : 50.91370999999999,
                  "lng" : 4.43697990
               },
               "southwest" : {
                  "lat" : 50.79624010,
                  "lng" : 4.31380
               }
            }
         },
         "types" : [ "locality", "political" ]
      },
      {
         "address_components" : [
            {
               "long_name" : "Brussel",
               "short_name" : "Brussel",
               "types" : [ "locality", "political" ]
            },
            {
               "long_name" : "Brussel",
               "short_name" : "Brussel",
               "types" : [ "administrative_area_level_1", "political" ]
            },
            {
               "long_name" : "België",
               "short_name" : "BE",
               "types" : [ "country", "political" ]
            },
            {
               "long_name" : "1000",
               "short_name" : "1000",
               "types" : [ "postal_code" ]
            }
         ],
         "formatted_address" : "1000 Brussel, België",
         "geometry" : {
            "location" : {
               "lat" : 50.84999999999999,
               "lng" : 4.350
            },
            "location_type" : "APPROXIMATE",
            "viewport" : {
               "northeast" : {
                  "lat" : 50.85134898029149,
                  "lng" : 4.351348980291502
               },
               "southwest" : {
                  "lat" : 50.84865101970849,
                  "lng" : 4.348651019708497
               }
            }
         },
         "types" : [ "locality", "political" ]
      }
   ],
   "status" : "OK"
}
