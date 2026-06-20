document.addEventListener(
   "contextmenu",
   function (e) {

      e.preventDefault();

   }
);

document.addEventListener(
   "keydown",
   function (e) {

      if (
         e.key === "F12"
      ) {

         e.preventDefault();

      }

      if (
         e.ctrlKey &&
         e.key.toLowerCase() === "u"
      ) {

         e.preventDefault();

      }

      if (
         e.ctrlKey &&
         e.key.toLowerCase() === "c"
      ) {

         e.preventDefault();

      }

      if (
         e.ctrlKey &&
         e.key.toLowerCase() === "v"
      ) {

         e.preventDefault();

      }

      if (
         e.ctrlKey &&
         e.shiftKey &&
         e.key.toLowerCase() === "i"
      ) {

         e.preventDefault();

      }

      if (
         e.ctrlKey &&
         e.shiftKey &&
         e.key.toLowerCase() === "j"
      ) {

         e.preventDefault();

      }

   }
);


let warningCount = 0;

document.addEventListener(
   "visibilitychange",
   function () {

      if (
         document.hidden
      ) {

         warningCount++;

         alert(
            `Warning ${warningCount}/3
Do not switch tabs.`
         );

         if (
            warningCount >= 3
         ) {

            alert(
               "You switched tabs too many times. Exam will be submitted."
            );

            submitExam();

         }

      }

   }
);