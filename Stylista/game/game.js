const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mode = "songSelect"; 
let scrollY = 0;
let songs = [
  { title: "チュートリアル", file: "songs/tutorial.sla" },
  { title: "テスト曲1", file: "songs/song1.sla" }
];
let selectedSong = null;

// 🎵 ノーツ関連
let notes = [];
let startTime = null;
let lastJudge = "";

// === 選曲画面 ===
function drawSongSelect() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = "#fff";
  ctx.font = "32px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("=== Stylista 選曲 ===", canvas.width/2, 80);

  songs.forEach((song, i) => {
    const y = i * 100 + 150 + scrollY;
    ctx.fillStyle = "#888";
    ctx.fillRect(canvas.width/2 - 200, y-40, 400, 80);
    ctx.fillStyle = "#fff";
    ctx.fillText(song.title, canvas.width/2, y+10);
  });
}

// === プレイ画面 ===
function drawPlay() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  // 判定ライン
  const lineY = canvas.height - 150;
  ctx.fillStyle = "red";
  ctx.fillRect(0, lineY, canvas.width, 4);

  // ノーツ描画
  const now = (performance.now() - startTime);
  notes.forEach(note => {
    const noteY = lineY - ((note.time - now) * 0.3); // 落下速度
    if (noteY > -50 && noteY < canvas.height + 50) {
      ctx.fillStyle = "#fff";
      ctx.fillRect(note.lane * canvas.width/4 + canvas.width/8 - 30, noteY, 60, 20);
    }
  });

  // 判定結果表示
  if (lastJudge) {
    ctx.fillStyle = "#fff";
    ctx.font = "28px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(lastJudge, canvas.width/2, lineY - 50);
  }
}

// === ループ ===
function gameLoop() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if (mode === "songSelect") drawSongSelect();
  else if (mode === "play") drawPlay();
  requestAnimationFrame(gameLoop);
}
gameLoop();

// === 入力処理 ===
function judge() {
  if (mode !== "play") return;
  const now = performance.now() - startTime;
  let hit = false;

  notes.forEach(note => {
    const diff = now - note.time;
    if (Math.abs(diff) <= 30 && !note.hit) {
      lastJudge = "StylistaPerfect";
      note.hit = true;
      hit = true;
    } else if (Math.abs(diff) <= 40 && !note.hit) {
      lastJudge = diff < 0 ? "Perfect (Fast)" : "Perfect (Late)";
      note.hit = true;
      hit = true;
    } else if (Math.abs(diff) <= 60 && !note.hit) {
      lastJudge = diff < 0 ? "Great (Fast)" : "Great (Late)";
      note.hit = true;
      hit = true;
    } else if (Math.abs(diff) <= 80 && !note.hit) {
      lastJudge = diff < 0 ? "Good (Fast)" : "Good (Late)";
      note.hit = true;
      hit = true;
    }
  });

  if (!hit) {
    lastJudge = "Over";
  }
}

// 📱 タッチ判定
canvas.addEventListener("touchstart", e => { judge(); });
canvas.addEventListener("click", e => { judge(); });
window.addEventListener("keydown", e => {
  if (["d","f","j","k"].includes(e.key)) judge();
});

// === 譜面読み込み ===
async function loadSong(file) {
  let res = await fetch(file);
  let text = await res.text();
  console.log("譜面データ", text);

  // 仮: 1秒ごとに1ノーツを配置
  notes = [];
  for (let i=0; i<10; i++) {
    notes.push({ time: (i+1)*1000, lane: i%4, hit: false });
  }

  startTime = performance.now();
  mode = "play";
}

// === 選曲入力 ===
canvas.addEventListener("touchend", e => {
  if (mode !== "songSelect") return;
  let touchY = e.changedTouches[0].clientY - scrollY;
  let index = Math.floor((touchY - 150) / 100);
  if (songs[index]) {
    selectedSong = songs[index];
    loadSong(selectedSong.file);
  }
});

canvas.addEventListener("click", e => {
  if (mode !== "songSelect") return;
  const clickY = e.clientY - scrollY;
  let index = Math.floor((clickY - 150) / 100);
  if (songs[index]) {
    selectedSong = songs[index];
    loadSong(selectedSong.file);
  }
});
