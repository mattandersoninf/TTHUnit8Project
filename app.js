/* app.js */

// use ajax to call the random user generator API
$.ajax({
    url: 'https://randomuser.me/api/',
    dataType: 'json',
    success: function(data) {
      console.log(data);
    }
  });


//generate user content into containers