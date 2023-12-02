// Executes when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
  // DOM element references
  const audio = document.getElementById('audio'); // Reference to the audio element
  const songImage = document.getElementById('songImage'); // Reference to the song image element
  const songTitle = document.getElementById('songTitle'); // Reference to the song title element
  const artistName = document.getElementById('artistName'); // Reference to the artist name element
  const playlist = document.getElementById('playlist'); // Reference to the playlist element
  const removeSongBtn = document.getElementById('removeSongBtn'); // Reference to the remove song button
  const availableSongs = document.getElementById('availableSongs'); // Reference to the available songs list

  // Track the current playing song index
  let currentSongIndex = 0;

  // Get all song items from the playlist and available songs list
  const songList = playlist.querySelectorAll('li'); // Query all songs in the playlist
  const availableList = availableSongs.querySelectorAll('li'); // Query all available songs

  // Function to play a selected song
  function playSong(songSrc, imgSrc, title, artist) {
    // Set song details and play the audio
    audio.src = songSrc;
    songImage.src = imgSrc;
    songTitle.textContent = title;
    artistName.textContent = artist;
    audio.play();
    changeBackgroundColor(); // Change background color on song change
  }

  // Function to play the first song from the playlist upon page load
  function playFirstSongFromPlaylist() {
    if (songList.length > 0) {
      const firstSong = songList[0];
      const songSrc = firstSong.getAttribute('data-src');
      const imgSrc = firstSong.getAttribute('data-img');
      const title = firstSong.getAttribute('data-title');
      const artist = firstSong.getAttribute('data-artist');
      playSong(songSrc, imgSrc, title, artist);
      currentSongIndex = 0;
    }
  }

  // Play the first song when the DOM content is loaded
  playFirstSongFromPlaylist();

  // Function to play a random song when the current song ends
  function playRandomSong() {
    let nextSongIndex = currentSongIndex;
    while (nextSongIndex === currentSongIndex) {
      nextSongIndex = Math.floor(Math.random() * songList.length);
    }
    const nextSong = songList[nextSongIndex];
    const songSrc = nextSong.getAttribute('data-src');
    const imgSrc = nextSong.getAttribute('data-img');
    const title = nextSong.getAttribute('data-title');
    const artist = nextSong.getAttribute('data-artist');
    playSong(songSrc, imgSrc, title, artist);
    currentSongIndex = nextSongIndex;
  }

  // Event listeners for songs in the playlist
  songList.forEach(function(song, index) {
    song.addEventListener('click', function() {
      const songSrc = this.getAttribute('data-src');
      const imgSrc = this.getAttribute('data-img');
      const title = this.getAttribute('data-title');
      const artist = this.getAttribute('data-artist');
      playSong(songSrc, imgSrc, title, artist);
      currentSongIndex = index;
    });
  });

  // Event listener for the audio element when a song ends
  audio.addEventListener('ended', function() {
    playRandomSong();
  });

  // Function to change the background color randomly
  function changeBackgroundColor() {
    const randomColor = getRandomColor();
    document.body.style.backgroundColor = randomColor;
  }

  // Function to generate a random color
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Event listener for available songs list
  availableSongs.addEventListener('click', function(e) {
    if (e.target && e.target.nodeName === 'LI') {
      const songSrc = e.target.getAttribute('data-src');
      const imgSrc = e.target.getAttribute('data-img');
      const title = e.target.getAttribute('data-title');
      const artist = e.target.getAttribute('data-artist');

      const newSong = document.createElement('li');
      newSong.setAttribute('data-src', songSrc);
      newSong.setAttribute('data-img', imgSrc);
      newSong.setAttribute('data-title', title);
      newSong.setAttribute('data-artist', artist);
      newSong.textContent = title;

      newSong.addEventListener('click', function() {
        playSong(songSrc, imgSrc, title, artist);
        currentSongIndex = Array.from(playlist.querySelectorAll('li')).indexOf(newSong);
      });

      playlist.appendChild(newSong);
      currentSongIndex = playlist.children.length - 1;
      if (currentSongIndex === 0) {
        playSong(songSrc, imgSrc, title, artist);
      }

      e.target.parentNode.removeChild(e.target);
    }
  });

  // Event listener for removing a song from the playlist
  removeSongBtn.addEventListener('click', function() {
    const selectedSong = playlist.querySelector('li:nth-child(' + (currentSongIndex + 1) + ')');
    if (selectedSong) {
      const songSrc = selectedSong.getAttribute('data-src');
      const imgSrc = selectedSong.getAttribute('data-img');
      const title = selectedSong.getAttribute('data-title');
      const artist = selectedSong.getAttribute('data-artist');

      const newSong = document.createElement('li');
      newSong.setAttribute('data-src', songSrc);
      newSong.setAttribute('data-img', imgSrc);
      newSong.setAttribute('data-title', title);
      newSong.setAttribute('data-artist', artist);
      newSong.textContent = title;

      newSong.addEventListener('click', function() {
        playSong(songSrc, imgSrc, title, artist);
        currentSongIndex = Array.from(playlist.querySelectorAll('li')).indexOf(newSong);
      });

      availableSongs.appendChild(newSong);
      playlist.removeChild(selectedSong);
      currentSongIndex = 0;
      audio.src = '';
      songImage.src = '';
      songTitle.textContent = 'Select a song';
      artistName.textContent = '';
    }
  });

});
