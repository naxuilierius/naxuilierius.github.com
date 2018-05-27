(function () {
  var vidElem = document.getElementsByTagName("video")[0];
  vidElem.addEventListener("play", function () {
    setTimeout(function () {
      document.getElementsByClassName("textContainer")[0].className += " show";
    }, 13500);
    setTimeout(function () {
      var audio = document.getElementsByTagName("audio")[0];
      audio.play();
    }, 13600);
  }, false);
})();
