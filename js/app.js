/* app.js */

// modal element
const modal = $(".modal");

// modal container element
const modalContainer = $(".modal-container");

// employees container
const employeesContainer = $(".employees-container");

// append the employee model information to this element
const modalEmployeeContent = $(".modal-employee-content");

// add event listener for the modal close button
const closeButton = document.querySelector(".modal-close");

// variable to hold the visible employees after a search
var visibleEmployeesList = [];

// use fetch api to set up the employee containers
$(document).ready(function(){

  const url = "https://randomuser.me/api/?results=12&inc=picture,name,email,location,cell,dob";

  modal.hide();

  let i = 0;

  // call the fetch api to grab information from the provided url
  // format the response into json
  // disect the json information
  // IMPORTANT: fetch returns objects
  fetch(url)
  .then((response) => response.json())
  .then(function(data){

    data.results.forEach(employee => {

      // build the employee-container

      let employeeInfoHTML = `
        <div class="employee-container-`+i+` grid-section grid">
          <div class="employee-img-container">
            <img src="${employee.picture.large}" class="img-rounded" alt="${employee.email}">
          </div>
          <div class="employee-txt-container">
            <div class="employee-primary-text">${employee.name.first + " " + employee.name.last}</div>
            <div class="employee-secondary-text">${employee.email}</div>
            <div class="employee-secondary-text">${employee.location.city}</div>
          </div>          
        </div>
      `;

      // add the html of the employee container to the employees-container element
      employeesContainer.append(employeeInfoHTML); 

      // form the html for the modal
      let employeeModalInfoHTML = ` 
        <div class="employee-modal-text-container employee-container-`+i+`" style="display: none;">
          <div class="employee-primary-container">
            <div class="employee-img-container">
              <img src="${employee.picture.large}" class="img-rounded" alt="${employee.email}">
            </div>
            <div class="employee-text-container">
              <div class="employee-primary-text">${employee.name.first + " " + employee.name.last}</div>
              <div class="employee-secondary-text">${employee.email}</div>
              <div class="employee-secondary-text">${employee.location.city}</div>
            </div>
          </div>
          <div class="employee-secondary-container">
            <div class="employee-secondary-text">${employee.cell}</div>
            <div class="employee-secondary-text">${employee.location.street.number+" "+employee.location.street.name+" "+employee.location.city+", "+employee.location.state+" "+employee.location.postcode}</div>
            <div class="employee-secondary-text">${employee.dob.date}</div>
          </div>
        </div>
      `;

      // add the employee information to he the modal container
      modalEmployeeContent.append(employeeModalInfoHTML);



      i++;

    });
    
    // apply an eventlistener to every employee-container
    var employeeContainers = document.querySelector(".employees-container").querySelectorAll('[class*="employee-container"]');

    //
    employeeContainers.forEach(employeeContainer =>{
      
      employeeContainer.addEventListener("click", function(){

        // get the visible employee-container element's class numbers and store them in visibleEmployeesList
        for(j = 0; j < employeesContainer.find('[class*="employee-container-"]:visible').length; j++){
          
          visibleEmployeesList.push(employeesContainer.find('[class*="employee-container-"]:visible')[j]);

        }

        // show the employee modal element that matches the class of the employee container that was clicked
        $(".modal-employee-content ."+employeeContainer.classList[0]).show();

        // show the modal
        modal.show();
      
      });
    
    });

  });

  // add event listener for the modal close button
  $(".modal-close").click(function(){
    
    $(".modal-employee-content").find(".employee-modal-text-container").hide();

    modal.hide();

  });


});


// close the modal if the modal is present and it's clicked, not including the area for the modal-container
window.addEventListener("click", function(){
  if (event.target.classList.contains("modal")){
    modalContainer.empty();
    modal.hide(); 
  }
});