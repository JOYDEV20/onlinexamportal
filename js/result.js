const result =
   JSON.parse(
      localStorage.getItem(
         "result"
      )
   );

const student =
   JSON.parse(
      localStorage.getItem(
         "submittedStudent"
      )
   );

if (!result) {

   window.location =
      "login.html";

}

document.getElementById(
   "studentName"
).innerHTML =
   student.name;

document.getElementById(
   "studentRoll"
).innerHTML =
   "Roll No : " +
   student.roll;

document.getElementById(
   "marks"
).innerHTML =
   result.marks;

document.getElementById(
   "correct"
).innerHTML =
   result.marks;

const wrong =
   result.total -
   result.marks;

document.getElementById(
   "wrong"
).innerHTML =
   wrong;

const percentage =
   (
      result.marks /
      result.total
   ) * 100;

document.getElementById(
   "percentage"
).innerHTML =
   percentage.toFixed(2)
   + "%";



const status =
   document.getElementById(
      "status"
   );

if (
   percentage >= 40
) {

   status.innerHTML =
      "PASS";

   status.classList.add(
      "pass"
   );

}
else {

   status.innerHTML =
      "FAIL";

   status.classList.add(
      "fail"
   );

}

let html = "";

result.result.forEach(
   q => {

      const isCorrect =
         q.yourAnswer ===
         q.correctAnswer;

      html += `

    <div class="answer-card">

      <h3>
      ${q.question}
      </h3>

      <p>
      Your Answer :
      <span class="${isCorrect
            ? "correct"
            : "wrong"
         }">

      ${q.yourAnswer ||
         "Not Answered"
         }

      </span>
      </p>

      <p>
      Correct Answer :
      <span class="correct">

      ${q.correctAnswer}

      </span>
      </p>

    </div>

    `;
   }
);

document
   .getElementById(
      "answers"
   )
   .innerHTML =
   html;