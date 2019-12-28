/* app.js */

// modal element
const modal = $(".modal");

//modal container element
const modalContainer = $(".modal-container");

// employees container
const employeesContainer = $(".employees-container");

// use fetch api to set up th e
$(document).ready(function(){

  const url = "https://randomuser.me/api/?results=12&inc=picture,name,email,location,cell,dob";

  modal.hide();

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
        <div class="employee-container">
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

      employeesContainer.append(employeeInfoHTML); 

      // get the last employee-container that was added to the employees-container
      let currentEmployee = $('.employees-container .employee-container:last-child');

      currentEmployee.addClass("grid-section grid");

      // add an event listener to the current employee
      currentEmployee.click(function(e){
        
        // form the html for the modal
        let employeeModalCloseHTML = '<div class="modal-close">&times;</div>';

        let employeeModalInfoHTML = `
          <div class="prev-container">
            <img src="../images/icons/Caret_left_font_awesome.svg" alt="prev">
          </div>
          <div class="employee-modal-text-container">
          <div class="employee-img-container">
            <img src="${employee.picture.large}" class="img-rounded" alt="${employee.email}">
          </div>
          <div class="employee-text-container">
            <div class="employee-primary-text">${employee.name.first + " " + employee.name.last}</div>
            <div class="employee-secondary-text">${employee.email}</div>
            <div class="employee-secondary-text">${employee.location.city}</div>
          </div>   
            <div class="employee-secondary-text">${employee.cell}</div>
            <div class="employee-secondary-text">${employee.location.street+" "+employee.location.city+", "+employee.location.state+" "+employee.location.postcode}</div>
            <div class="employee-secondary-text">${employee.dob.date}</div>
          </div>
          <div class="next-container">
            <img src="../images/icons/Caret_right_font_awesome.svg" alt="next">
          </div>
        `

        // add the employee information to he the modal container
        modalContainer.append(employeeModalCloseHTML);
        modalContainer.append(employeeModalInfoHTML);

        // show the modal
        modal.show();

        
        // add event listener for the modal close button
        $(".modal-close").click(function(){
          modalContainer.empty();
          modal.hide();
        });

        // close the modal if the modal is present and it's clicked
        window.onclick = function(){
          if (event.target == modal){
            modalContainer.empty();
            modal.hide(); 
          }
        };

      });

    });

  });

});

