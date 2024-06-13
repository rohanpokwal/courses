"use strict";

window.onload = () => {
  //get the create form off the page
  const createCourseForm = document.querySelector("#createCourseForm");

  //listen for the form submission and call createACourse
  createCourseForm.addEventListener("submit", createACourse);
};

//method/function to create a course
//CRUD: (C)reate a course
const createACourse = async (event) => {
  //call preventDefault to keep the page from reloading
  event.preventDefault();

  //generate a new form data object
  let formData = new FormData(event.target);

  //generate a JavaScript Object from the formData object created above
  let formDataAsObject = Object.fromEntries(formData);

  //try catch for error handling
  try {
    //make a fetch (POST) request to create a comment in the API
    let response = await fetch("http://localhost:8081/api/courses/", {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      //take the data from the form and build the body of the request
      body: JSON.stringify(formDataAsObject),
    });
    //turn the response in to something we can work with
    let newCourse = await response.json();

    //put the comments in the console
    console.log(newCourse, "this should show up if I created a new todo");

    window.location.href = "./index.html";
  } catch (err) {
    //what the hell happend
    console.log("something went south");
  }
};
