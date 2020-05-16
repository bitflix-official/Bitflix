setTimeout(start, 5000);

var i = 0;
var num = document.getElementById('loading-time');

function start() {
  setInterval(increase, 1000);
}

function increase() {
    if (i < 90) {
      i = i + Math.floor(Math.random() * 10) + 6  ;
      num.innerText = i;
    }
}
