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
            <img src="${employee.picture.thumbnail}" class="img-rounded" alt="${employee.email}">
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
        let employeeModalCloseHTML = '<span class="modal-close">&times;</span>';

        let employeeModalInfoHTML = `
          <div class="employee-modal-txt-container">
            <div class="employee-secondary-text">${employee.cell}</div>
            <div class="employee-secondary-text">${employee.location.street+" "+employee.location.city+", "+employee.location.state+" "+employee.location.postcode}</div>
            <div class="employee-secondary-text">${employee.dob.date}</div>
          </div>
        `

        // add the employee information to he the modal container
        modalContainer.append(employeeModalCloseHTML);
        modalContainer.append(employeeInfoHTML);
        modalContainer.append(employeeModalInfoHTML);

        // show the modal
        modal.show();

      });

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


// add event listener for the modal close button
$(".modal-close").click(function(){
  modalContainer.empty();
  modal.hide();
});

// close the modal if the modal is present and it's clicked
window.onclick = () => {
  if (event.target == modal){
    modalContainer.empty();
    modal.hide();
  }
};