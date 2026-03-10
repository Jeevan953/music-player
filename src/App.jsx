import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Equalizer from "./Equalizer";


const App = () => {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const canvasRef = useRef(null);
  const [currentArtist, setCurrentArtist] = useState('MdRafi');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [hasUserInteracted, setHasUserInteracted] = useState(false); // NEW: Track user interaction

  // Artist data with their songs - FIXED PATHS
    const BASE = import.meta.env.BASE_URL;
    const artists = {
    MdRafi: {
      name: 'Mohammad Rafi',
      displayName: 'MdRafi',
      songs: []
    },

    Kishore: {
  name: 'Kishore Kumar',
  displayName: 'Kishore',
  songs: [
{ title: "Aa Chal Ke Tujhe", src: `${BASE}audio/kishore/01 - Aa Chal Ke Tujhe.mp3` },
{ title: "Aachal Pe Tera Hi Naam Likha Aakhri Sanghursh 128 Kbps", src: `${BASE}audio/kishore/02 - Aachal Pe Tera Hi Naam Likha Aakhri Sanghursh 128 Kbps.mp3` },
{ title: "Aadhi Ye Raat Jale Jeene Ki Arzoo 128 Kbps", src: `${BASE}audio/kishore/03 - Aadhi Ye Raat Jale Jeene Ki Arzoo 128 Kbps.mp3` },
{ title: "Aai Ghir Ghir Sawan Ke", src: `${BASE}audio/kishore/04 - Aai Ghir Ghir Sawan Ke.mp3` },
{ title: "Aai Khuda Har Faisla", src: `${BASE}audio/kishore/05 - Aai Khuda Har Faisla.mp3` },
{ title: "Aaja Aaja Main Hoon Pyar Tera Teesri Manzil 128 Kbps", src: `${BASE}audio/kishore/06 - Aaja Aaja Main Hoon Pyar Tera Teesri Manzil 128 Kbps.mp3` },
{ title: "Aaja Aaja Nahin Abhi Nahin Man Mandir 128 Kbps", src: `${BASE}audio/kishore/07 - Aaja Aaja Nahin Abhi Nahin Man Mandir 128 Kbps.mp3` },
{ title: "Aaj Abhi Yahin Inquilaab 128 Kbps", src: `${BASE}audio/kishore/08 - Aaj Abhi Yahin Inquilaab 128 Kbps.mp3` },
{ title: "Aa Ja Pyare Aa Jao", src: `${BASE}audio/kishore/09 - Aa Ja Pyare Aa Jao.mp3` },
{ title: "Aaja Raat Beeti Jaye Begunah 128 Kbps", src: `${BASE}audio/kishore/10 - Aaja Raat Beeti Jaye Begunah 128 Kbps.mp3` },
{ title: "Aaja Tujhe Pyar Kar Loon", src: `${BASE}audio/kishore/11 - Aaja Tujhe Pyar Kar Loon.mp3` },
{ title: "Aaja Ya Aa Jane De Paas Ek Haseena Do Diwane 128 Kbps", src: `${BASE}audio/kishore/12 - Aaja Ya Aa Jane De Paas Ek Haseena Do Diwane 128 Kbps.mp3` },
{ title: "Aaj Bhadakti Aag Hai Dil Men Meri Dosti Tera Pyar 128 Kbps", src: `${BASE}audio/kishore/13 - Aaj Bhadakti Aag Hai Dil Men Meri Dosti Tera Pyar 128 Kbps.mp3` },
{ title: "Aaj Ka Din", src: `${BASE}audio/kishore/14 - Aaj Ka Din.mp3` },
{ title: "Aaj Kahin Na Ja Bade Dil Wala 128 Kbps", src: `${BASE}audio/kishore/15 - Aaj Kahin Na Ja Bade Dil Wala 128 Kbps.mp3` },
{ title: "Aaj Ka Ye Din", src: `${BASE}audio/kishore/16 - Aaj Ka Ye Din.mp3` },
{ title: "Aaj Ki Raat Mere Dil Ki Salami Lele", src: `${BASE}audio/kishore/17 - Aaj Ki Raat Mere Dil Ki Salami Lele.mp3` },
{ title: "Aaj Madhosh Hua Jaye Re Revival Sharmilee 128 Kbps", src: `${BASE}audio/kishore/18 - Aaj Madhosh Hua Jaye Re Revival Sharmilee 128 Kbps.mp3` },
{ title: "Aaj Mujhe Kuchh Kehna Hai", src: `${BASE}audio/kishore/19 - Aaj Mujhe Kuchh Kehna Hai.mp3` },
{ title: "Aaj Pyare Pyare Se Lagte Hai Aap", src: `${BASE}audio/kishore/20 - Aaj Pyare Pyare Se Lagte Hai Aap.mp3` },
{ title: "Aaj Rona Pada To Samjhe Girl Friend 1960 128 Kbps", src: `${BASE}audio/kishore/21 - Aaj Rona Pada To Samjhe Girl Friend 1960 128 Kbps.mp3` },
{ title: "Aaj Unse Pehli Mulaqat Hogi Paraya Dhan 128 Kbps", src: `${BASE}audio/kishore/22 - Aaj Unse Pehli Mulaqat Hogi Paraya Dhan 128 Kbps.mp3` },
{ title: "Aake Mil Ja", src: `${BASE}audio/kishore/23 - Aake Mil Ja.mp3` },
{ title: "Aanewala Pal Janewala Hai Gol Maal 128 Kbps", src: `${BASE}audio/kishore/24 - Aanewala Pal Janewala Hai Gol Maal 128 Kbps.mp3` },
{ title: "Aankhein Chaar From Tu Yaa Main", src: `${BASE}audio/kishore/25 - Aankhein Chaar (From Tu Yaa Main).mp3` },
{ title: "Aankhen Milayenge Baaten Sunayenge Bhanwar 128 Kbps", src: `${BASE}audio/kishore/26 - Aankhen Milayenge Baaten Sunayenge Bhanwar 128 Kbps.mp3` },
{ title: "Aankhen Tumhari Do Jahan Zameen Aasman 128 Kbps", src: `${BASE}audio/kishore/27 - Aankhen Tumhari Do Jahan Zameen Aasman 128 Kbps.mp3` },
{ title: "Aao Mere Paas Kaun Kaisey 128 Kbps", src: `${BASE}audio/kishore/28 - Aao Mere Paas Kaun Kaisey 128 Kbps.mp3` },
{ title: "Aao Mere Yaaro Aao", src: `${BASE}audio/kishore/29 - Aao Mere Yaaro Aao.mp3` },
{ title: "Aap Apne Nashe Mein Jeete Hai Swayamvar 128 Kbps", src: `${BASE}audio/kishore/30 - Aap Apne Nashe Mein Jeete Hai Swayamvar 128 Kbps.mp3` },
{ title: "Aap Ka Chehra Masha Allah", src: `${BASE}audio/kishore/31 - Aap Ka Chehra Masha Allah.mp3` },
{ title: "Aapke Anurodh Pe Anurodh 128 Kbps", src: `${BASE}audio/kishore/32 - Aapke Anurodh Pe Anurodh 128 Kbps.mp3` },
{ title: "Aapke Shahar Mein Aai Hoon Mehbooba 128 Kbps", src: `${BASE}audio/kishore/33 - Aapke Shahar Mein Aai Hoon Mehbooba 128 Kbps.mp3` },
{ title: "Aap Ki Ankhon Mein Kuch Ghar 128 Kbps", src: `${BASE}audio/kishore/34 - Aap Ki Ankhon Mein Kuch Ghar 128 Kbps.mp3` },
{ title: "Aap Sa Koi Haseen Chandi Sona 128 Kbps", src: `${BASE}audio/kishore/35 - Aap Sa Koi Haseen Chandi Sona 128 Kbps.mp3` },
{ title: "Aap Yahan Aaye Kisliye", src: `${BASE}audio/kishore/36 - Aap Yahan Aaye Kisliye.mp3` },
{ title: "Aashiq Hoon Baharon Ka Aashiq Hoon Baharon Ka 128 Kbps", src: `${BASE}audio/kishore/37 - Aashiq Hoon Baharon Ka Aashiq Hoon Baharon Ka 128 Kbps.mp3` },
{ title: "AASMAN KE NEECHE JEWEL THIEF", src: `${BASE}audio/kishore/38 - AASMAN KE NEECHE - JEWEL THIEF.mp3` },
{ title: "Aate Jate Khoobsurat Awara", src: `${BASE}audio/kishore/39 - Aate Jate Khoobsurat Awara.mp3` },
{ title: "Aaye Tum Yaad Mujhe Lofi Flip", src: `${BASE}audio/kishore/40 - Aaye Tum Yaad Mujhe Lofi Flip.mp3` },
{ title: "Ab Jo Hoga So Hone Do", src: `${BASE}audio/kishore/41 - Ab Jo Hoga So Hone Do.mp3` },
{ title: "Ab Ke Sawan Mein Jee Dare", src: `${BASE}audio/kishore/42 - Ab Ke Sawan Mein Jee Dare.mp3` },
{ title: "Achha Chalo Ji Baba Maaf Kar Do", src: `${BASE}audio/kishore/43 - Achha Chalo Ji Baba Maaf Kar Do.mp3` },
{ title: "Achha To Hum Chalte Hain", src: `${BASE}audio/kishore/44 - Achha To Hum Chalte Hain.mp3` },
{ title: "Achhe Bachche Nahin Rote Hain", src: `${BASE}audio/kishore/45 - Achhe Bachche Nahin Rote Hain.mp3` },
{ title: "Achhi Nahin Sanam Dillagi", src: `${BASE}audio/kishore/46 - Achhi Nahin Sanam Dillagi.mp3` },
{ title: "Ae Haseeno Nazneeno", src: `${BASE}audio/kishore/47 - Ae Haseeno Nazneeno.mp3` },
{ title: "Ae Lo Pyar Ke Din Aaye", src: `${BASE}audio/kishore/48 - Ae Lo Pyar Ke Din Aaye.mp3` },
{ title: "Ae Mere Watan Ke Logon", src: `${BASE}audio/kishore/49 - Ae Mere Watan Ke Logon.mp3` },
{ title: "Ae Oh Aa Zara Mudke", src: `${BASE}audio/kishore/50 - Ae Oh Aa Zara Mudke.mp3` },
{ title: "Ae Sagar Ki Laheron", src: `${BASE}audio/kishore/51 - Ae Sagar Ki Laheron.mp3` },
{ title: "Aesi Haseen Chandni", src: `${BASE}audio/kishore/52 - Aesi Haseen Chandni.mp3` },
{ title: "Ae Wadiye Kashmir", src: `${BASE}audio/kishore/53 - Ae Wadiye Kashmir.mp3` },
{ title: "Ae Yaar Sun Yaari Teri", src: `${BASE}audio/kishore/54 - Ae Yaar Sun Yaari Teri.mp3` },
{ title: "Agar Mujhse Mohabbat Hai", src: `${BASE}audio/kishore/55 - Agar Mujhse Mohabbat Hai.mp3` },
{ title: "Agar Tum Na Hote", src: `${BASE}audio/kishore/56 - Agar Tum Na Hote.mp3` },
{ title: "Ai Mere Bete Sun", src: `${BASE}audio/kishore/57 - Ai Mere Bete Sun.mp3` },
{ title: "Aisa Ho To Kaisa Ho", src: `${BASE}audio/kishore/58 - Aisa Ho To Kaisa Ho.mp3` },
{ title: "Aise Na Mujhe", src: `${BASE}audio/kishore/59 - Aise Na Mujhe.mp3` },
{ title: "Aiyo Aiyo Kehdo Zamane Se", src: `${BASE}audio/kishore/60 - Aiyo Aiyo Kehdo Zamane Se.mp3` }
]
},

    Mukesh: {
      name: 'Mukesh',
      displayName: 'Mukesh',
      songs: []
    },

    Lata: {
      name: 'Lata Mangeshkar',
      displayName: 'Lata',
      songs: []
    }
  };

  // Alphabetically sorted songs (A–Z)
  const currentArtistData = artists[currentArtist];

  const sortedSongs = React.useMemo(() => {
    if (!currentArtistData) return [];
    return [...currentArtistData.songs].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }, [currentArtistData]);

  const currentSong = sortedSongs[currentSongIndex];

  // Handle artist selection
  const handleArtistSelect = async (artist) => {
    setCurrentArtist(artist);
    setCurrentSongIndex(0);
    
    // Don't auto-play, just set up
    setIsPlaying(false);
    
    // Ensure AudioContext is ready
    await resumeAudioContext();
  };

  // Play/Pause toggle - FIXED with user interaction tracking
  const togglePlay = async () => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }
    
    if (audioRef.current) {
      try {
        await resumeAudioContext(); // Resume AudioContext first
        
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error("Playback error:", error);
        setIsPlaying(false);
      }
    }
  };

  // Next song
  const nextSong = async () => {
    const nextIndex = (currentSongIndex + 1) % sortedSongs.length;
    setCurrentSongIndex(nextIndex);
    
    // Resume AudioContext before playing next song
    await resumeAudioContext();
    
    if (isPlaying && audioRef.current) {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.error("Auto-play prevented:", error);
        // Wait for user interaction
        setIsPlaying(false);
      }
    }
  };

  // Previous song
  const prevSong = async () => {
    const prevIndex = (currentSongIndex - 1 + sortedSongs.length) % sortedSongs.length;
    setCurrentSongIndex(prevIndex);
    
    // Resume AudioContext before playing previous song
    await resumeAudioContext();
    
    if (isPlaying && audioRef.current) {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.error("Auto-play prevented:", error);
        // Wait for user interaction
        setIsPlaying(false);
      }
    }
  };

  // Resume AudioContext - CRITICAL FIX
  const resumeAudioContext = async () => {
    if (!audioContextRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
      
      if (audioRef.current) {
        sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
        analyserRef.current = audioContextRef.current.createAnalyser();
        
        analyserRef.current.fftSize = 256;
        sourceRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
      }
    }
    
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
      console.log("AudioContext resumed");
    }
    
    return audioContextRef.current;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };
  
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  
  const handleSeek = (e) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const startBeatGlow = () => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);

    const animate = () => {
      analyserRef.current.getByteFrequencyData(dataArray);
      
      const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
      const glow = Math.min(avg / 50, 3);

      document.documentElement.style.setProperty("--beat-glow", `${glow}`);
      
      if (isPlaying) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  const startParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
      });
    }

    const dataArray = new Uint8Array(analyserRef.current?.frequencyBinCount || 0);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let beat = 0;
      if (analyserRef.current && isPlaying) {
        analyserRef.current.getByteFrequencyData(dataArray);
        beat = dataArray[2] / 255;
      }

      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        const glow = 5 + beat * 20;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + beat * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 200, ${0.3 + beat})`;
        ctx.shadowBlur = glow;
        ctx.shadowColor = "#00ffd5";
        ctx.fill();
      });

      if (isPlaying) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  // Handle song ended
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => {
        nextSong();
      };
      
      audio.addEventListener('ended', handleEnded);
      
      return () => {
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [currentSongIndex, isPlaying]);

  // Handle window resize for canvas
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Initialize canvas when playing starts
  useEffect(() => {
    if (isPlaying && hasUserInteracted) {
      startBeatGlow();
      startParticles();
    }
  }, [isPlaying, hasUserInteracted]);

  return (
    <div className="music-player">
      {/* Background Music Symbols */}
      <div className="bg-music-symbol left">𝄞</div>
      <div className="bg-music-symbol right">𝄞</div>

      {/* Floating notes animation */}
      <div className="floating-notes">
        <div className="note">♪</div>
        <div className="note">♫</div>
        <div className="note">♩</div>
        <div className="note">♬</div>
        <div className="note">♪</div>
        <div className="note">♫</div>
      </div>

      <header>
  <h1 className="title-animate">
    <span className="music-icon-left">𝄞</span>
    Golden Era Music Player
  </h1>

  <p className="subtitle subtitle-animate">
    Experience the legends of Indian music
  </p>
</header>

      {/* Animated Artist Images - FIXED image paths */}
      <div className="artists-container">
        {Object.entries(artists).map(([key, artist]) => (
          <div 
            key={key}
            className={`artist-card ${currentArtist === key ? 'active' : ''}`}
            onClick={() => handleArtistSelect(key)}
          >
            <div className="artist-image-wrapper">
              <img 
                src={`/music-player/images/${key.toLowerCase()}.jpg`} // Changed path
                alt={artist.name}
                className="artist-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://via.placeholder.com/200x200/3498db/ffffff?text=${artist.displayName}`;
                }}
              />
              <div className="artist-overlay">
                <span className="artist-initial">{artist.displayName}</span>
              </div>
            </div>
            <p className="artist-name">{artist.name}</p>
          </div>
        ))}
      </div>

      {/* Player Controls */}
      <div className="player-container">
        <div className="current-song-info">
          <h2>Now Playing: {currentArtistData.name}</h2>
          <h3>{currentSong?.title || 'Select a song'}</h3>
          <p>Song {currentSongIndex + 1} of {currentArtistData.songs.length}</p>
        </div>

        <div className="controls">
          <button className="control-btn prev" onClick={prevSong} title="Previous">
            ⏮
          </button>
          
          <button 
            className="control-btn play-pause" 
            onClick={togglePlay} 
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸' : '▶️'}
          </button>
          
          <button className="control-btn next" onClick={nextSong} title="Next">
            ⏭
          </button>
        </div>
       {isPlaying && <Equalizer isPlaying={isPlaying} />}

        {/* Progress Bar */}
        <div className="progress-container">
          <span>{formatTime(progress)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={progress}
            onChange={handleSeek}
            className="progress-slider"
          />
          <span>{formatTime(duration)}</span>
        </div>

        {/* Volume Control */}
        <div className="volume-control">
          <span className="volume-icon">🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
          
          <div style={{ color: "red", fontSize: "20px" }}>
        </div>
        <Equalizer isPlaying={isPlaying} />
          <span className="volume-percentage">{Math.round(volume * 100)}%</span>
        </div>

        {/* Playlist */}
        <div className="playlist">
          <h4>{currentArtistData.name}'s Playlist:</h4>
          <ul>
            {sortedSongs.map((song, index) => (
              <li 
                key={index}
                className={index === currentSongIndex ? 'active-song' : ''}
                onClick={async () => {
                  setCurrentSongIndex(index);
                  await resumeAudioContext();
                  setIsPlaying(true);
                }}
              >
                {index + 1}. {song.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Hidden Audio Element - REMOVED auto-play attributes */}
      <audio
        ref={audioRef}
        src={currentSong?.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => {
          console.log("Playing");
        }}
        onPause={() => {
          console.log("Paused");
          setIsPlaying(false);
        }}
        onError={(e) => {
          console.error("Audio error:", e);
          setIsPlaying(false);
        }}
        preload="metadata"
      />

      {/* Canvas for particles */}
      <canvas 
        ref={canvasRef} 
        id="particles-canvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: -1
        }}
      />

      <footer>
        <p>Made with ❤️ for classic music lovers By Jeevan</p>
        {!hasUserInteracted && (
          <p className="click-hint">👆 Click the play button to start music</p>
        )}
      </footer>
    </div>
  );
};

export default App;