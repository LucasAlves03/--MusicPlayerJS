//variables
window.addEventListener('DOMContentLoaded', () => {
  const audioPlayer = document.getElementById('audio-player');
  const playpauseButton = document.getElementById('playpause-button');
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  const progressBar = document.getElementById('progress-bar');
  const currentTimeSpan = document.getElementById('current-time');
  const totalTimeSpan = document.getElementById('total-time');

  // Event listener for updating the current time of the audio when the progress bar value changes
  progressBar.addEventListener('input', () => {
    const progress = progressBar.value;
    const duration = audioPlayer.duration;
    const currentTime = (progress / 100) * duration;
  
    audioPlayer.currentTime = currentTime;
  });

  // Event listener for updating the progress bar and checking if the song is near the end
  audioPlayer.addEventListener('timeupdate', () => {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    const progress = (currentTime / duration) * 100;
    
    progressBar.value = progress;
    if (duration - currentTime <= 5) {
      goNext();
    }
  });

  // Function for going to the next song
  const goNext = () => {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
      currentSongIndex = 0;
    }
    updatePlayer();
  };

  // Function for updating the current and total times of the audio
  const updateTimes = () => {
    currentTimeSpan.textContent = formatTime(audioPlayer.currentTime);
    totalTimeSpan.textContent = formatTime(audioPlayer.duration);
  };

  // Function for formatting time in minutes:seconds format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Event listeners for updating the times during audio playback
  audioPlayer.addEventListener('loadedmetadata', updateTimes);
  audioPlayer.addEventListener('timeupdate', updateTimes);

  // Music Data
  const songs = [
    {
      title: 'Embarrassed',
      artist: 'Don Toliver (feat. Travis Scott)',
      coverImage: 'media/lovesickness.jpg',
      audioFile: 'media/Don Toliver - Embarrassed (feat. Travis Scott) [Official Visualizer].mp3',
    },
    {
      title: 'Too Many Nights',
      artist: 'Don Toliver',
      coverImage: 'media/h&v.jpg',
      audioFile: 'media/Too Many Nights.mp3',
    },
    {
      title: 'Trance',
      artist: 'Young Thug (feat. Travis Scott)',
      coverImage: 'media/h&v.jpg',
      audioFile: 'media/Trance.mp3',
    },
    {
      title: 'MAFIA',
      artist: 'Travis Scott',
      coverImage: 'media/mafia.png',
      audioFile: 'media/Travis Scott - MAFIA (Official Audio).mp3',
    }
  ];

  let currentSongIndex = 0;

  // Function for updating the player with the current song
  const updatePlayer = () => {
    const currentSong = songs[currentSongIndex];
    audioPlayer.src = currentSong.audioFile;
    document.querySelector('.player-card img').src = currentSong.coverImage;
    document.querySelector('.player-card h2').textContent = currentSong.title;
    document.querySelector('.player-card p').textContent = currentSong.artist;
    playpauseButton.innerHTML = '<i class="bi bi-play-fill"></i>';
  };

  // Function for toggling play/pause of the audio
  const togglePlayPause = () => {
    if (audioPlayer.paused) {
      audioPlayer.play();
      playpauseButton.innerHTML  = `<i class="bi bi-pause-fill"></i>`;
    } else if(!audioPlayer.paused) {
      audioPlayer.pause();
      playpauseButton.innerHTML  = '<i class="bi bi-play-fill"></i>';
    }
  };

  // Function for playing the next song
  const nextSong = () => {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
      currentSongIndex = 0;
    }
    updatePlayer();
    audioPlayer.play();
    playpauseButton.innerHTML = '<i class="bi bi-pause-fill"></i>';
  };

  // Function for playing the previous song
  const prevSong = () => {
    currentSongIndex--;
    if (currentSongIndex < 0) {
      currentSongIndex = songs.length - 1;
    }
    updatePlayer();
    audioPlayer.play();
    playpauseButton.innerHTML = '<i class="bi bi-pause-fill"></i>';
  };

  // Event listener for play/pause button click
  playpauseButton.addEventListener('click', togglePlayPause);

  // Event listener for next button click
  nextButton.addEventListener('click', nextSong);

  // Event listener for previous button click
  prevButton.addEventListener('click', prevSong);

  // Initialize the player with the first song
  updatePlayer();
});

