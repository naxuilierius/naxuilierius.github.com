(function () {
  var vidElem = document.getElementsByTagName("video")[0];
  vidElem.addEventListener("play", function () {
    setTimeout(function () {
      document.getElementsByClassName("textContainer")[0].className += " show";
      var audio = document.getElementsByTagName("audio")[0];
      audio.play();
    }, 15000);
  }, false);
})();
