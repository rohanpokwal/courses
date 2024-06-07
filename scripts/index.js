"use strict";

window.onload = () => {
  populateTable();
};

async function populateTable() {
  //get thecourses from the API
  let courses = await getCourses();

  let tbody = document.querySelector("#courseTableBody");

  //get a hold of the table body where the data is going to go
  //loop over all the courses and work with a single course
  courses.forEach((course) => {
    //call a function to build the row
    //pass it where the row goes (tBody)
    //pass it what goes in the row (data/source)
    buildRow(tbody, course);
  });
}

//the function that takes a table body and some data and puts the data in the table body
function buildRow(someTableBody, someData) {
  //create the row for the table
  let row = someTableBody.insertRow();

  //create the cell for the department
  let departmentCell = row.insertCell();
  //put the relevant course data in the
  departmentCell.innerHTML = someData.dept;

  //create the cell for the department
  let courseNumCell = row.insertCell();
  //put the relevant course data in the
  courseNumCell.innerHTML = someData.courseNum;

  //create the cell for the department
  let courseNameCell = row.insertCell();
  //put the relevant course data in the
  courseNameCell.innerHTML = someData.courseName;
}

async function getCourses() {
  //the try says try these things if it doesnt work fout, fall ointo the catch
  //and deak with the error
  try {
    //make the API call to get all the courses
    let response = await fetch("http://localhost:8081/api/courses");
    let courses = await response.json();

    return courses;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
