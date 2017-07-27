// =========== AUDIO ================
window.onload = init;
var context;
var bufferLoader;
var backgroundMusicSource;
var filter;
var isPlaying = false;

function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}
BufferLoader.prototype.loadBuffer = function (url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function () {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function (buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length) {
          loader.onload(loader.bufferList);
        }
      },
      function (error) {
        console.error('decodeAudioData error', error);
      }
    );
  }

  request.onerror = function () {
    alert('BufferLoader: XHR error');
  }

  request.send();
}
BufferLoader.prototype.load = function () {
  for (var i = 0; i < this.urlList.length; ++i)
    this.loadBuffer(this.urlList[i], i);
}

function init() {
  // Fix up prefixing
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();

  bufferLoader = new BufferLoader(
    context,
    [
      'media/background.mp3'
    ],
    finishedLoading
  );

  bufferLoader.load();
}

function finishedLoading(bufferList) {
  // Create two sources and play them both together.
  backgroundMusicSource = context.createBufferSource();
  backgroundMusicSource.buffer = bufferList[0];
}

function playSound(buffer) {
  var source = context.createBufferSource(); // creates a sound source
  source.buffer = buffer;                    // tell the source which sound to play
  source.connect(context.destination);       // connect the source to the context's destination (the speakers)
  source.start(0);                           // play the source now
                                             // note: on older systems, may have to use deprecated noteOn(time);
}


function toggleFilter() {
  if (isPlaying) {
    isPlaying = false;
    backgroundMusicSource.suspend();
  } else {
    if (backgroundMusicSource && backgroundMusicSource.connect) {
      var filter = context.createBiquadFilter();
      backgroundMusicSource.connect(filter);
      filter.connect(context.destination);
      // Create and specify parameters for the low-pass filter.
      filter.type = 'lowpass'; // Low-pass filter. See BiquadFilterNode docs
      filter.frequency.value = 440; // Set cutoff to 440 HZ
      backgroundMusicSource.start(0);                           // play the source now
      isPlaying = true;
      return filter;
    }
  }
}

// =======================
function onDoorHover(evt) {
  console.log('onDoorHover');
  var audio = document.getElementsByTagName("audio")[0];
  //playSound(backgroundMusicSource);
  if (isPlaying) {
    return;
  }
  filter = toggleFilter(backgroundMusicSource);
  //audio.play();
}

function onDoorLeave(evt) {
  console.log('onDoorLeave');
  //var audio = document.getElementsByTagName("audio")[0];
  //audio.pause();
}

function onFirstClick(evt) {
  var audio = document.getElementsByTagName("audio")[0];
  //audio.play();
  filter.frequency.value = 20000; // Set cutoff to 440 HZ
  var firstDiv = document.getElementsByClassName('first')[0];
  var secondDiv = document.getElementsByClassName('second')[0];
  firstDiv.className += ' hidden';
  secondDiv.classList.remove('hidden');
}
