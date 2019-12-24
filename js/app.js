/* app.js */

// use fetch api to set up th e
$(document).ready(function(){

  const url = "https://randomuser.me/api/?results=12&inc=picture,name,email,location,cell,dob";

  // call the fetch api to grab information from the provided url
  // format the response into json
  // disect the json information
  // IMPORTANT: fetch returns objects
  fetch(url)
  .then((response) => response.json())
  .then(function(data){

    data.results.forEach(user => {

      // build the user-container

      userInfoHTML = `
      <div class="user-container grid-section grid">
        <div class="user-img-container">
          <img src="${user.picture.medium}" class="img-rounded" alt="${user.email}"></img>
        </div>
        <div class="user-txt-container">
          <span class="user-name-container">${user.name.first + " " + user.name.last}</span>
          <span class="user-email-container">${user.email}</span>
          <span class="user-city-container">${user.location.city}</span>
        </div>          
      </div>
      `;

      var currentUser = $('.users-container').append(userInfoHTML);

      
    });

    // handle fetch requests asynchronously
    /*

    async function getRandomUsers(url){
      const randomUserResponse = await fetch(url);
      const randomUserJSON = await randomUserResponse.json();

      
    }

    */
    

  });


});

// form user div container


// provide classes 
