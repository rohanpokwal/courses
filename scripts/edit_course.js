"use strict";

window.onload = () => {
  //this allows us to get the urlParams to get the cariables in the url
  const urlParams = new URLSearchParams(location.search);

  console.log(urlParams);

  //we can access the individual params by calling .get on the variable that holds them
  //and requesting by name
  console.log(urlParams.get("courseid"));

  if (urlParams.has("courseid")) {
    //if we have the course id, display its details
    populateCourseForm(urlParams.get("courseid"));

    const updateCourseForm = document.querySelector("#updateCourseForm");

    updateCourseForm.addEventListener("submit", updateACourse);
  } else {
    //let them know we didn't have a valid course id and send them back
    //to the courses
    alert("no valid course id");
    window.location.href = "./index.html";
  }
};

const populateCourseForm = async (courseId) => {
  //get the single list based on what id user selects
  let course = await getCourse(courseId);

  //fill out the form with the data of the specific course that we just got from the API
  document.querySelector("#id").value = course.id;
  document.querySelector("#dept").value = course.dept;
  document.querySelector("#courseNum").value = course.courseNum;
  document.querySelector("#courseName").value = course.courseName;
  document.querySelector("#instructor").value = course.instructor;
  document.querySelector("#startDate").value = course.startDate;
  document.querySelector("#numDays").value = course.numDays;
};

//here we get the course based on the course id
const getCourse = async (courseId) => {
  try {
    //use fetch to get the details for the specific course
    const response = await fetch(
      "http://localhost:8081/api/courses/" + courseId
    );

    let data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

//update course from here
const updateACourse = async (event) => {
  event.preventDefault();

  //try catch for error handling
  try {
    let response = await fetch(
      "http://localhost:8081/api/courses/" + event.target.id.value,
      {
        method: "PUT",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          dept: event.target.dept.value,
          courseNum: event.target.courseNum.value,
          courseName: event.target.courseName.value,
          instructor: event.target.instructor.value,
          startDate: event.target.startDate.value,
          numDays: event.target.numDays.value,
        }),
      }
    );

    //turn those courses in to something we can work with
    //let updatedToDO = await response.json();

    //Display result to the user
    //let result = document.querySelector("#result");

    window.location.href = "./index.html";
  } catch (err) {
    //what the hell happend
    console.log("something went south", err);
  }
};
