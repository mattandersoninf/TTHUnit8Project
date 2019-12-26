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

    data.results.forEach(employee => {

      // build the employee-container

      employeeInfoHTML = `
      <div class="employee-container grid-section grid">
        <div class="employee-img-container">
          <img src="${employee.picture.thumbnail}" class="img-rounded" alt="${employee.email}"></img>
        </div>
        <div class="employee-txt-container">
          <div class="employee-name-container">${employee.name.first + " " + employee.name.last}</div>
          <div class="employee-email-container">${employee.email}</div>
          <div class="employee-city-container">${employee.location.city}</div>
        </div>          
      </div>
      `;

      var currentEmployee = $('.employees-container').append(employeeInfoHTML);

      
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


// add Eventlisteners to display overlay to each employee div container
$('.employee-container')
