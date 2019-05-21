A jQuery plugin to enable the october request api.
https://octobercms.com/docs/ajax/introduction

installation:

     npm install @tschallacka/jquery.request

# $('#').request( method, data )

See the documentation available at https://octobercms.com/docs/ajax/javascript-api

# Example:

     var $ = require('jquery');
     require('@tschallacka/jquery.request');
     
     $(document).request('onGetUserName', {
         success: function(data){
             console.log('Username is', data.username);
         }
     });
