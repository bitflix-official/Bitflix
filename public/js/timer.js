const imdb_id = document.getElementById("imdb_id").innerText;
window.setTimeout(function() {
    window.location.href = "/stream/" + imdb_id;
}, 20000);
setTimeout(start, 5000);

var i = 0;
var num = document.getElementById('loading-time');

function start() {
  setInterval(increase, 1000);
}

function increase() {
    if (i < 90) {
      i = i + Math.floor(Math.random() * 6) + 3  ;
      num.innerText = i;
    }
}
