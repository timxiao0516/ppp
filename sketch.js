var captureGraphics;
var capture_width = 640;
var capture_height = 480;
var span = 5;
var radioElement;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.size(capture_width, capture_height);
  captureGraphics = createGraphics(capture_width, capture_height);
  captureGraphics.translate(capture_width, 0);
  captureGraphics.scale(-1, 1);
  capture.hide();

  radioElement = createRadio();
  radioElement.position(width / 2 - 300, 20);
  radioElement.option("方塊");
  radioElement.option("圓圈");
  radioElement.option("亮度");
  radioElement.option("紅底");
  radioElement.option("文字");
  radioElement.style("color", "#fff");
  radioElement.style("font-size", "30px");
}

function draw() {
  background(0);
  push();
  span = 5 + map(mouseX, 0, width, 0, 20);
  noStroke();
  translate(width / 2 - capture_width / 2, height / 2 - capture_height / 2);
  captureGraphics.image(capture, 0, 0);
  captureGraphics.loadPixels();
  for (var x = 0; x < captureGraphics.width; x += span) {
    for (var y = 0; y < captureGraphics.height; y += span) {
      var index = (x + y * captureGraphics.width) * 4;
      var r = captureGraphics.pixels[index];
      var g = captureGraphics.pixels[index + 1];
      var b = captureGraphics.pixels[index + 2];
      var pixelColor = color(r, g, b);
      fill(pixelColor);
      switch (radioElement.value()) {
        case "方塊":
          rect(x, y, span);
          break;
        case "圓圈":
          ellipse(x, y, span);
          break;
        case "亮度":
          var brightnessValue = (r + g + b) / 3;
          fill(brightnessValue);
          ellipse(x, y, span * map(brightnessValue, 0, 255, 0, 1));
          break;
        case "紅底":
          colorMode(HSB);
          fill((r + g + b) / 3, 80, 80);
          rectMode(CENTER);
          rect(x, y, span * 0.8);
          ellipse(x, y, 3);
          break;
        case "文字":
          const density = 'Ñ@#W$9876543210?!abc;:+=-,._ ';
          let txt = "一二三四五田雷電龕龘";
          var brightnessId = int(map((r + g + b) / 3, 0, 255, 9, 0));
          textSize(span);
          textStyle(BOLD);
          text(txt[brightnessId], x, y);
          break;
      }
    }
  }
  pop();
}