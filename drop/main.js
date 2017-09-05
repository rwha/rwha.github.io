'use strict';

const frame = document.getElementById("frame"); 
const fc = frame.getContext("2d");
const ruler = document.getElementById("ruler"); 
const rc = ruler.getContext("2d");
const imgs = document.getElementById("drop_frames");
let current = document.getElementById('f05');

frame.style.width = "375px";
ruler.style.width = "200px";
frame.style.height = ruler.style.height = "900px";

function insertFrame(e) {
  current.style.border = 'none';
  current = e ? e.target : current
  current.style.border = 'thin solid red';
  fc.drawImage(current, 0, 0);
}

function draw(e) {
  let y = e.clientY - frame.offsetTop;
  if (e.ctrlKey) {
    rc.beginPath();
    rc.arc(125, y-7, 6, 0, Math.PI * 2)
    rc.strokeStyle = 'green';
    rc.lineWidth = 1;
    rc.stroke();
    rc.fillStyle = 'black';
    rc.font = '12px sans-serif';
    rc.fillText(y, 100, y-3);
  } else {
    rc.beginPath()
    rc.moveTo(0,y);
    rc.lineTo(200,y);
    rc.closePath();
    rc.strokeStyle = 'black';
    rc.lineWidth = 1;
    rc.stroke();
    rc.font = '12px sans-serif';
    rc.fillText(y, 180, y-5);
  }
}

function trace(e) {
  let y = e.clientY - frame.offsetTop;
    fc.beginPath();
    fc.moveTo(0,y);
    fc.lineTo(375,y);
    fc.closePath();
    fc.strokeStyle = 'gray';
    fc.lineWidth = 1;
    fc.drawImage(current, 0, 0);
    fc.stroke();
    if(e.shiftKey) {
      fc.font = '12px sans-serif';
      fc.fillText(y, 200, y-5);
    }
}

frame.onmousemove = trace;
frame.onmouseup = draw;

imgs.addEventListener("click", insertFrame, true);
insertFrame();
