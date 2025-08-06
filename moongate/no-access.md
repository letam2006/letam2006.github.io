<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>No Access</title>
  <style>
    body {
      margin: 0;
      background-color: #000;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      font-family: 'Courier New', monospace;
      color: #00ff00;
      font-size: 2em;
      text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00;
    }

    #message {
      white-space: pre;
    }
  </style>
</head>
<body>
  <div id="message"></div>

  <script>
    const text = "No access rights.\nPlease wait.";
    const element = document.getElementById("message");
    let index = 0;

    function typeText() {
      if (index < text.length) {
        element.textContent += text[index++];
        setTimeout(typeText, 100);
      }
    }

    typeText();
  </script>
</body>
</html>
