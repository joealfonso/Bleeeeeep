/*global YT, onPlayerReady, onPlayerStateChange, stopVideo, $*/

// 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  var player;
  function onYouTubeIframeAPIReady () {
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: 'M7lc1UVf-VE',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady (event) {
    event.target.playVideo();
  }

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  var done = false;
  function onPlayerStateChange (event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
      setTimeout(stopVideo, 0);
      done = true;
    }
  }
  function stopVideo () {
    player.stopVideo();
  }

  var userInput;
  var videoID;
  $(function () {
    var $selector = $('#input-8');

    // Prevent double-binding
    // (only a potential issue if script is loaded through AJAX)
    $(document.body).off('keyup', $selector);

    // Bind to keyup events on the $selector.
    $(document.body).on('keyup', $selector, function(event) {
      if (+event.keyCode === 13) { // 13 = Enter Key
        userInput = $('#input-8').val();
        videoID = userInput.replace(/^.*?(\?|&)(v=([^&]+)).*$/i,'$3');
        player.cueVideoById(videoID);
      }
    });
  });

  //1.When button is pressed 
  //1-1. Play sound
  //1-2. Continue to loop sound
  //2. Stop sound when button is released
  var bleep = new Wad({
    "source": "audio/censor-beep-10.mp3",
    "loop": true,
    pitch   : 800,
    "volume": 1.0,
    filter  : {
      frequency : 6400       // The frequency, in hertz, to which the filter is applied.
    }
  });

  $('body').on('mousedown', '#bleepBtn', function () {
    bleep.play();
    player.mute();
  });

  $('body').on('mouseup', '#bleepBtn', function () {
    bleep.stop();
    player.unMute();
  });
