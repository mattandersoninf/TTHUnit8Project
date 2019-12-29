/* app.js */

// modal element
const modal = $(".modal");

//modal container element
const modalContainer = $(".modal-container");

// employees container
const employeesContainer = $(".employees-container");

const modalEmployeeContent = $(".modal-employee-content");

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

      var employeeContainers = document.querySelector(".employees-container").querySelectorAll('[class*="employee-container"]');

      employeeContainers.forEach(employeeContainer =>{
        employeeContainer.addEventListener("click", function(){
          modal.show();
        });
      });

      /*
      // get the last employee-container that was added to the employees-container
      let currentEmployee = $('.employees-container .employee-container:last-child');

      //currentEmployee.addClass("grid-section grid");

      // add an event listener to the current employee
      currentEmployee.click(function(e){

        // show the modal
        modal.show();

      });
      */

      // form the html for the modal
      let employeeModalInfoHTML = ` 
        <div class="employee-modal-text-container" style="display: none;">
          <div class="employee-container-`+i+`">
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

  });

});


// add event listener for the modal close button
var closeButton = document.querySelector(".modal-close");

closeButton.addEventListener("click", function(){

  let employeeContentList = modalEmployeeContent.find(".employee-modal-text-container");

  employeeContentList.forEach(employeeContent => {
    employeeContent.hide();
  });

  modal.hide();

});


// close the modal if the modal is present and it's clicked, not including the area for the modal-container
window.addEventListener("click", function(){
  if (event.target.classList.contains("modal")){
    modalContainer.empty();
    modal.hide(); 
  }
});