/* app.js */

const userContainer = $('.user-container');

const randomUserUrl = "https://randomuser.me/api/?results=12&inc=picture,name,email,location";

// use fetch api to set up th e
$.ready(function(url){

  // call the fetch api to grab information from the provided url
  // format the response into json
  // disect the json information
  fetch(url)
  .then((response) => (response.json()))
  .then(function(data){
    console.log(data);
  });

});

/*
// use ajax to call the random user generator API
$.ajax({
  url: 'https://randomuser.me/api/?inc=picture,name,email,location',
  dataType: 'json',
  success: function(data) {
    console.log(data);
  }
});
*/

/*
//generate user content into containers
function getRandomEmployeeData(url){
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 && xhr.status === 200){
      let data = JSON.parse(xhr.responseText);
      // to be replace with returning the JSON information into a new employee object
      data.map(p => console.log);
    }
  };
}
*/