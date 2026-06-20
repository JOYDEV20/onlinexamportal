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
  student.name;