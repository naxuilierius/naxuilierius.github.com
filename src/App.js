import React, { Component } from 'react';
import { Player } from 'video-react';
import videoUrl from './mp4.mp4';


class App extends Component {
  state = {
    videoBlob: '',
    isLoading: true,
    isPauseDisabled: false,
    isPlaying: false
  }
  componentDidMount() {
    const that = this;
    this.prefetch_file(videoUrl, this.onSuccess, this.onProgress, this.onError, that);
  }
  playVideo() {
      var video = document.getElementById('video')

      if (video) {
          video.play().then(_ => {
              console.log('played!')
              this.setState({isPauseDisabled: true})
          });
      }
  }

  onSuccess(url, that) {
      var video = document.createElement('VIDEO')
      if (!video.src) {
        console.log('success',url)
        that.setState({videoBlob: url})

        setTimeout(() => {
          that.setState({isLoading: false})
        }, 3000);
          // video.id = 'video';
          // document.body.appendChild(video);
          // video.src = url
      }
  }

  onProgress() {

  }

  onError() {

  }

  play() {
    this.setState({isPlaying: true})
    this.refs.player.play();
  }

  prefetch_file(url,
                        fetched_callback,
                        progress_callback,
                        error_callback, that) {      
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "blob";

      xhr.addEventListener("load", function () {
          if (xhr.status === 200) {
              var URL = window.URL || window.webkitURL;
              var blob_url = URL.createObjectURL(xhr.response);
              fetched_callback(blob_url, that);
          } else {
              error_callback();
          }
      }, false);

      var prev_pc = 0;
      xhr.addEventListener("progress", function (event) {
          if (event.lengthComputable) {
              var pc = Math.round((event.loaded / event.total) * 100);
              if (pc != prev_pc) {
                  prev_pc = pc;
                  progress_callback(pc);
              }
          }
      });
      xhr.send();
  }
  render() {
    const { videoBlob, isLoading, isPauseDisabled, isPlaying } = this.state;

    return (
      <div className="nxlr">
        <div className={`preloader__wrap${!isLoading ? ' hide' : ''}`}>
          <div className='preloader'/>
          <div className='preloader__text'>KRAUNASI NAXUJ, PALAUKIT SKATINOS</div>
        </div>
        <div className={`play-btn${isPlaying ? ' hide' : ''} ${!isLoading ? ' show' : ''}`} onClick={() => this.play()}>važiuojam!</div>
        {videoBlob && (
          <div className={`video-wrap${!isLoading ? ' show' : ''} ${isPauseDisabled ? ' disable-pause' : ''} ${isPlaying ? ' playing' : ''}`}>
            <Player playsInline={true} ref="player" poster={false}>
              <source src={videoBlob} />
            </Player>
          </div>
        )}
      </div>
    );
  }
}

export default App;
