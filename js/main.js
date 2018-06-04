var isStarted = false;

(function () {
  var vidElem = document.getElementsByTagName("video")[0];
  vidElem.addEventListener("play", function () {
    setTimeout(function () {
      document.getElementsByClassName("textContainer")[0].className += " show";
    }, 6500);
  }, false);
})();

function start() {
  if (isStarted) return;
  isStarted = true;

  var vidElem = document.getElementsByTagName("video")[0];
  var audio = document.getElementsByTagName("audio")[0];

  audio.volume = 1;
  audio.play();
  vidElem.play();
}
