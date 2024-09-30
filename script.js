let digit = 6;
let diff = 0.75;
let level = digit * digit;
let Board = document.querySelector("#board");
let MBoard = document.querySelector("#Mboard");
let Over = document.querySelector("#Over");
let Score = document.querySelector("#Score");
let HScore = document.querySelector("#HScore");
let ScoreStore = 0;
let HighScoreStore = 0;
let MineHighScore = localStorage.getItem("MineHighScore");
let miniBox = document.querySelectorAll(".miniBox div");
let difficultyLevel = {
  easy: { digit: 5, diff: 0.85 },
  medium: { digit: 6, diff: 0.45 },
  hard: { digit: 7, diff: 0.2 },
};
Board.style.display = "grid";
Board.style.gridTemplateColumns = `repeat(${digit}, 1fr)`;
Board.style.gridTemplateRows = `repeat(${digit}, 1fr)`;

//!=======================> Create Boxes <==================================
function createBoard(num) {
  let store = [];
  for (let i = 1; i <= num; i++) {
    let Random = Math.random() < diff ? "💎" : "💣";
    store += ` <div class="miniBox select-none	 border-sky-900 border bg-sky-700   bg-transparent  h-full w-full  ">
     <div class="w-full  opacity-0 cursor-pointer h-full border border-sky-800 flex items-center justify-center text-5xl  " id=${Random} > ${Random} </div>
     </div>`;
  }
  Board.innerHTML = store;
}
createBoard(level);

//!<======================> create a level <=================================>
let ActiveBtn = null;
function changeLevel(levelName) {
  //? <==== Active Button
  const ClickBtn = document.getElementById(
    levelName.charAt(0).toUpperCase() + levelName.slice(1)
  );
  if (ActiveBtn) ActiveBtn.classList.remove("active");
  ClickBtn.classList.add("active");
  ActiveBtn = ClickBtn;
  //?===========>

  digit = difficultyLevel[levelName].digit;
  diff = difficultyLevel[levelName].diff;
  level = digit * digit;
  Board.style.gridTemplateColumns = `repeat(${digit} , 1fr )`;
  Board.style.gridTemplateRows = `repeat(${digit} , 1fr) `;
  createBoard(level);
  GameRestart(level);
}

if (MineHighScore === null) {
  HighScoreStore = 0;
  localStorage.setItem("MineHighScore", JSON.stringify(HighScoreStore));
} else {
  HighScoreStore = JSON.parse(MineHighScore);
  HScore.innerHTML = `Highest Score  : ${HighScoreStore} `;
}

//! =============================> Game Restart <==============================

function GameRestart(level) {
  let Restart = document.querySelector("#restart");
  Over.classList.add("hidden");
  Over.classList.remove("flex");
  ScoreStore = 0;
  Score.innerText = ` Score :  ${ScoreStore}`;
  createBoard(level);
}

//! ======================> Game Over function <==============================

function GameOver() {
  Over.classList.remove("hidden");
  Over.classList.add("flex");
  //? Show all diamonds and bombs
  document.querySelectorAll(".miniBox div").forEach((box) => {
    box.style.opacity = 100;
  });
}

//! ===================> Show Mine logic <===================
Board.addEventListener("click", function check(event) {
  const clickNum = event.target.innerText;
  if (event.target.style.opacity == 100) return;
  event.target.style.opacity = 100;
  miniBox.forEach((box) => {
    box.addEventListener("mouseover", () => {
      box.classList.add = "blue";
    });
    box.addEventListener("mouseout", () => {
      box.style.backgroundColor = "";
    });
  });
  if (clickNum === "💎") {
    ScoreStore += 1;
    Score.innerText = ` Score :  ${ScoreStore}`;
    if (ScoreStore > HighScoreStore) {
      HighScoreStore = ScoreStore;
      localStorage.setItem("MineHighScore", JSON.stringify(HighScoreStore));
      HScore.innerHTML = ` Highest Score  : ${HighScoreStore} `;
    }
  } else {
    event.target.style.backgroundColor = "red";
    GameOver();
  }
});
