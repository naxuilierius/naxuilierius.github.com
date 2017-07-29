// =======================
function onDoorHover(evt) {
  console.log('onDoorHover');
  var audio = document.getElementsByTagName("audio")[0];
  //playSound(backgroundMusicSource);
  audio.play();
}

function onDoorLeave(evt) {
  console.log('onDoorLeave');
  // var audio = document.getElementsByTagName("audio")[0];
  //audio.pause();
}

function onFirstClick(evt) {
  var audio = document.getElementsByTagName("audio")[0];
  //audio.play();
  var firstDiv = document.getElementsByClassName('first')[0];
  var secondDiv = document.getElementsByClassName('second')[0];
  firstDiv.className += ' hidden';
  secondDiv.classList.remove('hidden');
}
