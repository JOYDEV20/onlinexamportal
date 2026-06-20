const API_URL =
   "https://script.google.com/macros/s/AKfycbxb4F8gDUYqwwho--DVkBu462aOj6-ubl6_JowZVyuJRqMdNAPiZl09YL1WMPiWjtNI3Q/exec";

const student =
   JSON.parse(
      localStorage.getItem(
         "student"
      )
   );

if (
   !student ||
   localStorage.getItem(
      "examStarted"
   ) !== "true"
) {

   window.location =
      "instructions.html";

}

document
   .getElementById(
      "studentName"
   )
   .innerHTML =
   student.name;


loadQuestions();

async function
   loadQuestions() {

   const response =
      await fetch(

         `${API_URL}
?action=questions
&set=${student.set}`

      );

   const data =
      await response.json();

   if (
      data.success
   ) {

      renderQuestions(
         data.questions
      );

   }

}

function renderQuestions(
   questions
) {

   let html = "";

   questions.forEach(
      (
         q,
         index
      ) => {

         html += `

      <div class="question">

      <h3>

      ${index + 1}.
      ${q.question}

      </h3>

      <label>
      <input
      type="radio"
      name="q${q.id}"
      value="A">

      ${q.a}
      </label>

      <label>
      <input
      type="radio"
      name="q${q.id}"
      value="B">

      ${q.b}
      </label>

      <label>
      <input
      type="radio"
      name="q${q.id}"
      value="C">

      ${q.c}
      </label>

      <label>
      <input
      type="radio"
      name="q${q.id}"
      value="D">

      ${q.d}
      </label>

      </div>

      `;
      }
   );

   document
      .getElementById(
         "questions"
      )
      .innerHTML =
      html;
}

startTimer();

function startTimer() {

   let duration =
      localStorage.getItem(
         "examTime"
      );

   if (!duration) {

      duration = 30 * 60;

   } else {

      duration =
         parseInt(duration);

   }

   const timer =
      setInterval(() => {

         let minutes =
            Math.floor(
               duration / 60
            );

         let seconds =
            duration % 60;

         minutes =
            String(minutes)
               .padStart(
                  2,
                  "0"
               );

         seconds =
            String(seconds)
               .padStart(
                  2,
                  "0"
               );

         document
            .getElementById(
               "timer"
            )
            .innerHTML =
            `${minutes}:${seconds}`;

         localStorage
            .setItem(
               "examTime",
               duration
            );

         duration--;

         if (duration < 0) {

            clearInterval(
               timer
            );

            alert(
               "Time is over. Exam will be submitted automatically."
            );

            submitExam();

         }

      }, 1000);

}