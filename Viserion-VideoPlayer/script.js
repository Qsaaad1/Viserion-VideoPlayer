const playPauseBtn = document.querySelector(".play-pause-btn")
const theaterBtn = document.querySelector(".theater-btn")
const fullScreenBtn = document.querySelector(".full-screen-btn")
const miniPlayerBtn = document.querySelector(".mini-player-btn")
const muteBtn = document.querySelector(".mute-btn")
const currentTimeElem = document.querySelector(".current-time")
const totalTimeElem = document.querySelector(".total-time")
const volumeSlider = document.querySelector(".volume-slider")
const videoContainer = document.querySelector(".video-container")
const video = document.querySelector("video")



document.addEventListener("keydown", e => {
    switch (e.key.toLowerCase()) {
        case " ":
            togglePlay()
            break
            case "f":
                toggleFullScreenMode()
                break
                case "i":
                    toggleMiniPlayerMode()
                    break    
                    case "t":
                        toggleTheaterMode()
                        break
                        case "m":
                            toggleMute()
                            break
                            case "arrowleft":
                              case "j":
                                skip(-5)
                                break
                              case "arrowright":
                              case "l":
                                skip(5)
                                break
    }
})

// Duration

video.addEventListener("loadeddata", () => {
  totalTimeElem.textContent = formatDuration(video.duration)
})

video.addEventListener("timeupdate", () => {
  currentTimeElem.textContent = formatDuration(video.currentTime)
})

const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2
})
function formatDuration(time) {
  const seconds = Math.floor(time % 60)
  const minutes = Math.floor(time / 60) % 60
  const Hours = Math.floor(time / 3600)
  if (Hours === 0) {
    return `${minutes}:${leadingZeroFormatter.format(seconds)}`
  } else {
    return `${hours}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(seconds)}`

  }
}

function skip(duration) {
  video.currentTime += duration
  video.play()
}

// V0lume

muteBtn.addEventListener("click", toggleMute)
volumeSlider.addEventListener("input", e => {
  video.volume = e.target.value
  video.muted = e.target.value === 0
})

function toggleMute() {
  video.muted = !video.muted
}

video.addEventListener("volumechange", () => {
  volumeSlider.value = video.volume
  let volumeLevel
  if (video.muted || video.volume === 0) {
    volumeSlider.value = 0
    volumeLevel = "muted"
  } else if (video.volume >= 0.5) {
    volumeLevel = "high"
  } else {
    volumeLevel = "low"
  }

  videoContainer.dataset.volumeLevel = volumeLevel
})

// View Modes

theaterBtn.addEventListener("click", toggleTheaterMode)
fullScreenBtn.addEventListener("click", toggleFullScreenMode)
miniPlayerBtn.addEventListener("click", toggleMiniPlayerMode)

function toggleTheaterMode() {
    videoContainer.classList.toggle("theater")
}

function toggleFullScreenMode() {
    if (document.webkitFullscreenElement == null) {
      videoContainer.webkitRequestFullscreen()
    } else {
      document.webkitExitFullscreen()
    }
  }
  
  function toggleMiniPlayerMode() {
    if (videoContainer.classList.contains("mini-player")) {
      document.exitPictureInPicture()
    } else {
      video.requestPictureInPicture()
    }
  }
  
  document.addEventListener("fullscreenchange", () => {
    videoContainer.classList.toggle("full-screen", document.webkitFullscreenElement)  // REMOVE IT LATER
  })
  
  video.addEventListener("enterpictureinpicture", () => {
    videoContainer.classList.add("mini-player")
  })
  
  video.addEventListener("leavepictureinpicture", () => {
    videoContainer.classList.remove("mini-player")
  })
  
// Play/Pause

playPauseBtn.addEventListener('click', togglePlay)
video.addEventListener("click", togglePlay)

function togglePlay(){
    video.paused ? video.play() : video.pause()
}

video.addEventListener("play", () => {
    videoContainer.classList.remove("paused")
})
  
  video.addEventListener("pause", () => {
    videoContainer.classList.add("paused")
})
