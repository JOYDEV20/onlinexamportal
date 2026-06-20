const API_URL =
   "https://script.google.com/macros/s/AKfycbxb4F8gDUYqwwho--DVkBu462aOj6-ubl6_JowZVyuJRqMdNAPiZl09YL1WMPiWjtNI3Q/exec";

async function login() {

   const roll =
      document
         .getElementById("roll")
         .value
         .trim();

   const password =
      document
         .getElementById("password")
         .value
         .trim();

   if (!roll || !password) {

      alert(
         "Please enter Roll Number and Password"
      );

      return;
   }

   const loader =
      document.getElementById(
         "loaderOverlay"
      );

   const loginBtn =
      document.getElementById(
         "loginBtn"
      );

   try {

      // Show Loader
      loader.style.display =
         "flex";

      // Disable Button
      loginBtn.disabled =
         true;

      loginBtn.innerText =
         "Logging In...";

      const url =
         `${API_URL}?action=login&roll=${encodeURIComponent(
            roll
         )}&password=${encodeURIComponent(
            password
         )}`;

      const response =
         await fetch(
            url
         );

      const data =
         await response.json();

      // Hide Loader
      loader.style.display =
         "none";

      if (data.success) {

         localStorage.setItem(
            "student",
            JSON.stringify(
               data.student
            )
         );

         window.location =
            "instructions.html";

      }
      else {

         loginBtn.disabled =
            false;

         loginBtn.innerText =
            "Login";

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

      loginBtn.disabled =
         false;

      loginBtn.innerText =
         "Login";

      alert(
         "Unable to connect to server."
      );
   }
}

document
   .getElementById(
      "loginBtn"
   )
   .addEventListener(
      "click",
      login
   );