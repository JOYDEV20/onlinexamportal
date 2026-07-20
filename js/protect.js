<<<<<<< HEAD
const student =
JSON.parse(
  localStorage.getItem(
    "student"
  )
);

if (!student) {
  window.location =
    "login.html";
}

document
  .getElementById("name")
  .innerHTML =
=======
const student =
JSON.parse(
  localStorage.getItem(
    "student"
  )
);

if (!student) {
  window.location =
    "login.html";
}

document
  .getElementById("name")
  .innerHTML =
>>>>>>> ab7ecf0c5f5f48419b5469d4f7a220f7c394d8fa
  student.name;