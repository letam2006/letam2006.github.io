<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>討伐UI</title>
  <style>
    body {
      background: #111;
      color: white;
      text-align: center;
      font-family: sans-serif;
      margin-top: 50px;
    }

    .container {
      position: relative;
      width: 200px;
      height: 200px;
      margin: 0 auto;
    }

    .core {
      width: 60px;
      height: 60px;
      background: black;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 2;
      cursor: pointer;
    }

    .orbit {
      width: 100%;
      height: 100%;
      position: absolute;
      animation: rotate 5s linear infinite;
    }

    .orb {
      width: 30px;
      height: 30px;
      background: red;
      border-radius: 50%;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, 0);
      cursor: pointer;
    }

    .orb:nth-child(1) { transform: rotate(0deg) translate(80px) rotate(0deg); }
    .orb:nth-child(2) { transform: rotate(120deg) translate(80px) rotate(-120deg); }
    .orb:nth-child(3) { transform: rotate(240deg) translate(80px) rotate(-240deg); }

    .defeated {
      background: #555 !important;
      cursor: default;
    }

    @keyframes rotate {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }

    .status {
      margin-top: 20px;
      font-size: 20px;
    }

    button {
      margin: 5px;
      padding: 6px 12px;
      font-size: 14px;
    }
  </style>
</head>
<body>

  <div class="container" id="boss">
    <div class="orbit">
      <div class="orb" id="orb0" onclick="openOrbLink(0)"></div>
      <div class="orb" id="orb1" onclick="openOrbLink(1)"></div>
      <div class="orb" id="orb2" onclick="openOrbLink(2)"></div>
    </div>
    <div class="core" id="core" onclick="openCoreLink()"></div>
  </div>

  <div class="status">
    LIFE: <span id="life">100</span><br>
    緩和Lv.<span id="reliefLevel">1</span>
  </div>

  <div>
    <button onclick="changeLife(10)">LIFE +10</button>
    <button onclick="changeLife(-10)">LIFE -10</button>
    <button onclick="changeRelief(1)">緩和+1</button>
    <button onclick="changeRelief(-1)">緩和-1</button><br>
    <button onclick="defeatOrb(0)">Orb1 討伐</button>
    <button onclick="defeatOrb(1)">Orb2 討伐</button>
    <button onclick="defeatOrb(2)">Orb3 討伐</button>
    <button onclick="reviveAll()">全復活</button>
  </div>

  <script>
    let life = 100;
    let reliefLevel = 1;
    const lifeDisplay = document.getElementById("life");
    const reliefDisplay = document.getElementById("reliefLevel");

    const orbLinks = [
      "https://example.com/orb1",
      "https://example.com/orb2",
      "https://example.com/orb3"
    ];

    const coreLink = "https://example.com/core";

    const orbStatus = [false, false, false]; // false = 生存中, true = 討伐済み

    function updateStatus() {
      lifeDisplay.textContent = life;
      reliefDisplay.textContent = reliefLevel;
    }

    function changeLife(amount) {
      life = Math.max(0, life + amount);
      updateStatus();
    }

    function changeRelief(amount) {
      reliefLevel = Math.max(0, reliefLevel + amount);
      updateStatus();
    }

    function defeatOrb(index) {
      orbStatus[index] = true;
      document.getElementById(`orb${index}`).classList.add("defeated");
    }

    function reviveAll() {
      for (let i = 0; i < 3; i++) {
        orbStatus[i] = false;
        document.getElementById(`orb${i}`).classList.remove("defeated");
      }
    }

    function openOrbLink(index) {
      if (!orbStatus[index]) {
        window.open(orbLinks[index], "_blank");
      }
    }

    function openCoreLink() {
      if (orbStatus.every(status => status === true)) {
        window.open(coreLink, "_blank");
      }
    }

    updateStatus();
  </script>

</body>
</html>
