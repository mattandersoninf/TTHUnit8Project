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

  // the randomuser generator API site
  const url = "https://randomuser.me/api/?results=12&inc=picture,name,email,location,cell,dob";

  // hide the modal element from the start (this could have been done in the html as well)
  modal.hide();

  // this counter is for populating the employee-container with an unique class name
  let i = 0;

  /* FETCH API PROMISE
  // 1. Call the fetch api to grab information from the provided url
  // 2. Format the response into json
  // 3. Disect the json information and sort it's results into the employeeInfoHTML.
  // IMPORTANT: fetch returns objects
  */
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

    /* EMPLOYEE CONTAINER EVENT LISTENER
    // Clicking any of the employee containers triggers the following sequence of events
    // 1. Populate the visibleEmployeeList array with the visible (style.display != "none;") employee-container classes.
    // 2. Show the modal content that corresponds to the employee-container class that was clicked,
    // 3. Show the modal. 
    */
    employeeContainers.forEach(employeeContainer =>{
      
      employeeContainer.addEventListener("click", function(){

        // get the visible employee-container element's class numbers and store them in visibleEmployeesList
        for(j = 0; j < employeesContainer.find('[class*="employee-container-"]:visible').length; j++){
          
          visibleEmployeesList.push(employeesContainer.find('[class*="employee-container-"]:visible')[j].classList[0]);

        }

        // show the employee modal element that matches the class of the employee container that was clicked
        $(".modal-employee-content ."+employeeContainer.classList[0]).show();

        // show the modal
        modal.show();
      
      });
    
    });

  });

  /* MODAL CLOSE EVENT LISTENER
  // 1. Hide all of the employee-modal-text-containers.
  // 2. Empty the visibleEmployeesList by setting it's length to 0.
  // 3. Hide the modal.
  */
  $(".modal-close").click(function(){
    
    // hide all of the modal employee content
    $(".modal-employee-content").find(".employee-modal-text-container").hide();

    // clear the visibleEmployeeList
    visibleEmployeesList.length = 0;

    // hide the modal
    modal.hide();

  });

  /* PREVIOUS BUTTON EVENT LISTENER
  // 1. Get the employee-container class that is currently visible
  // 2. Get the employee-container class's index in the visibleEmployeeList
  // 3. Hide the currently visible container
  // 3. Decrement the index
  // 4. Check if the index falls into the range of the visibleEmployeeList
  // 4.a. if it doesn't reset the index to the length of the visibleEmployeeList
  // 5. Show the employee-container corresponding to the new index in the visibleEmployeeList
  */
  $(".prev-container").click(function(){

    let tempVisibleModalEmployee = $('.modal-employee-content [class*="employee-container-"]:visible')[0].classList[1];

    let currIndex = visibleEmployeesList.indexOf(tempVisibleModalEmployee);

    $('.modal-employee-content [class*="employee-container-"]:visible').hide();

    currIndex--;

    if(currIndex < 0){
      currIndex = visibleEmployeesList.length -1;
    }

    $(".modal-employee-content ."+ visibleEmployeesList[currIndex]).show();

  });

  /* NEXT BUTTON EVENT LISTENER
  // 1. Get the employee-container class that is currently visible
  // 2. Get the employee-container class's index in the visibleEmployeeList
  // 3. Hide the currently visible container
  // 3. Increment the index
  // 4. Check if the index falls into the range of the visibleEmployeeList
  // 4.a. if it doesn't reset the index to the length of the visibleEmployeeList
  // 5. Show the employee-container corresponding to the new index in the visibleEmployeeList
  */
  $(".next-container").click(function(){

    let tempVisibleModalEmployee = $('.modal-employee-content [class*="employee-container-"]:visible')[0].classList[1];

    let currIndex = visibleEmployeesList.indexOf(tempVisibleModalEmployee);

    $('.modal-employee-content [class*="employee-container-"]:visible').hide();

    currIndex++;

    if(currIndex >= visibleEmployeesList.length){
      currIndex = 0;
    }

    $(".modal-employee-content ."+ visibleEmployeesList[currIndex]).show();

  });

});


// close the modal if the modal is present and it's clicked, not including the area for the modal-container
window.addEventListener("click", function(){
  if (event.target.classList.contains("modal")){
    modalContainer.empty();
    modal.hide(); 
  }
});