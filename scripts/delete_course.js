"use strict";

window.onload = () => {
  console.log("hello from details");

  //this allows us to get the urlParams to get the variables in the url
  const urlParams = new URLSearchParams(location.search);

  console.log(urlParams);
  //we can access the individual params by calling .get on the variable that holds the
  //and requesting by name
  console.log(urlParams.get("courseid"));

  if (urlParams.has("courseid")) {
    displayCourseDetails(urlParams.get("courseid"));

    const deleteCourseButton = document.querySelector("#deleteCourseButton");

    deleteCourseButton.addEventListener("click", (event) =>
      deleteTheDangCourse(event, urlParams.get("courseid"))
    );
  } else {
    alert("no valid course id");
    window.location.href = "./index.html";
  }
};

async function displayCourseDetails(courseId) {
  //get the course details
  let courseDetails = await getCourseDetails(courseId);

  let courseDetailsDiv = document.querySelector("#courseDetails");

  //JSON stringify the output
  //courseDetailsDiv.innerHTML = JSON.stringify(courseDetails);
  courseDetailsDiv.innerHTML = `
  <div> courseId: ${courseDetails.id}</div>
  <div> courseId: ${courseDetails.courseName}</div>
  <div> courseId: ${courseDetails.instructor}</div>
  <div> courseId: ${courseDetails.numDays}</div>
  `;
}

async function getCourseDetails(courseId) {
  try {
    //use fetch to get the details for the specific course
    let response = await fetch("http://localhost:8081/api/courses/" + courseId);

    //deal with the response to get the data
    let data = await response.json();

    //hand the data
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

//method/function to delete a course
//CRUD: (D)elete a course
const deleteTheDangCourse = async (event, courseId) => {
  event.preventDefault();

  //try catch for error handling
  try {
    //make a fetch (DELETE) request to remove a comment in the API
    let response = await fetch(
      "http://localhost:8081/api/courses/" + courseId,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      window.location.href = "./index.html";
    }
  } catch (err) {
    //what the hell happend
    console.log("something went south");
  }
};
