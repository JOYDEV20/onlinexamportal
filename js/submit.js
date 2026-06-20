// import { API_URL } from "./config.js";

async function submitExam() {

   const confirmSubmit = confirm(
      "Are you sure?\nAfter submission you cannot change your answers."
   );

   if (!confirmSubmit) {
      return;
   }

   const loader =
      document.getElementById(
         "submitLoader"
      );

   const submitBtn =
      document.getElementById(
         "submitBtn"
      );

   const student =
      JSON.parse(
         localStorage.getItem(
            "student"
         )
      );

   if (!student) {
      alert(
         "Session expired. Please login again."
      );

      window.location =
         "login.html";

      return;
   }

   const answers = {};

   document
      .querySelectorAll(
         'input[type="radio"]:checked'
      )
      .forEach(input => {

         const qid =
            input.name.replace(
               "q",
               ""
            );

         answers[qid] =
            input.value;
      });

   try {

      // Show Loader
      loader.style.display =
         "flex";

      // Disable Button
      submitBtn.disabled =
         true;

      submitBtn.innerText =
         "Submitting...";

      const url =
         `${API_URL}?action=submit
&roll=${encodeURIComponent(
            student.roll
         )}
&set=${encodeURIComponent(
            student.set
         )}
&answers=${encodeURIComponent(
            JSON.stringify(
               answers
            )
         )}`.replace(/\n/g, "");

      const response =
         await fetch(
            url
         );

      const data =
         await response.json();

      if (data.success) {

         // Hide Loader
         loader.style.display =
            "none";

         // Save Result
         localStorage.setItem(
            "result",
            JSON.stringify(
               data
            )
         );

         localStorage.setItem(
            "submittedStudent",
            JSON.stringify(
               student
            )
         );

         // Clear Exam Session
         localStorage.removeItem(
            "examTime"
         );

         localStorage.removeItem(
            "examStarted"
         );

         localStorage.removeItem(
            "student"
         );

         // Redirect
         window.location =
            "result.html";
      }
      else {

         loader.style.display =
            "none";

         submitBtn.disabled =
            false;

         submitBtn.innerText =
            "Submit Exam";

         alert(
            data.message
         );
      }

   }
   catch (error) {

      console.error(
         error
      );

      loader.style.display =
         "none";

      submitBtn.disabled =
         false;

      submitBtn.innerText =
         "Submit Exam";

      alert(
         "Unable to submit answers.\nPlease check your internet connection and try again."
      );
   }
}

document
   .getElementById(
      "submitBtn"
   )
   .addEventListener(
      "click",
      submitExam
   );