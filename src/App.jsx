import React, { useState, useRef, useEffect } from 'react';
import './App.css';

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

  // Artist data with their songs
  const artists = {
    MdRafi: {
      name: 'Mohammad Rafi',
      displayName: 'MdRafi',
      songs: [
        { title: 'Aa Gale Lagja', src: '/audio/rafi/song1.mp3' },
        { title: 'Aaja Aaja Main Hoon Pyar Tera', src: '/audio/rafi/song2.mp3' },
        { title: 'Aa Ja Re Aa Zara', src: '/audio/rafi/song3.mp3' },
        { title: 'Aajkal Tere Mere Pyar Ke Charche', src: '/audio/rafi/song4.mp3' },
        { title: 'Aaj Purani Rahose', src: '/audio/rafi/song5.mp3' },
        { title: 'Aa Raat Jati Hai Chupke Se', src: '/audio/rafi/song6.mp3' },
        { title: 'Aasman Se Aaya Farishta', src: '/audio/rafi/song7.mp3' },
        { title: 'Ae Chand Ki Zebai Tu', src: '/audio/rafi/song8.mp3' },
        { title: 'Akela Hoon Main', src: '/audio/rafi/song9.mp3' },
        { title: 'Akela Hoon Main Jaal', src: '/audio/rafi/song10.mp3' },
        { title: 'Akele Akele Kahan Ja Rahe Ho', src: '/audio/rafi/song11.mp3' },
        { title: 'An Evening In Paris', src: '/audio/rafi/song12.mp3' },
        { title: 'Chale The Saath Milkar', src: '/audio/rafi/song13.mp3' },
        { title: 'Chaudhvin Ka Chand Ho', src: '/audio/rafi/song14.mp3' },
        { title: 'Chhalka Yeh Jaam', src: '/audio/rafi/song15.mp3' },
        { title: 'Chura Liya Hai Tumne Jo Dil Ko', src: '/audio/rafi/song16.mp3' },
        { title: 'Dheere Dheere Chal Chand', src: '/audio/rafi/song17.mp3' },
        { title: 'Dilbar Dilbar Kahte Kahte Hua Diwana', src: '/audio/rafi/song18.mp3' },
        { title: 'Dil Beqarar Sa Hai', src: '/audio/rafi/song19.mp3' },
        { title: 'Dil Ke Jharokhe Mein', src: '/audio/rafi/song20.mp3' },
        { title: 'Dil Ne Pyar Kiya Hai', src: '/audio/rafi/song21.mp3' },
        { title: 'Dil Tera Diwana Hai Sanam', src: '/audio/rafi/song22.mp3' },
        { title: 'Diwane Ka Naam To Poochho', src: '/audio/rafi/song23.mp3' },
        { title: 'Ek Tha Gul Aur Ek Thi Bulbul', src: '/audio/rafi/song24.mp3' },
        { title: 'Gulabi Aankhen Jo Teri Dekhi', src: '/audio/rafi/song25.mp3' },
        { title: 'Gun Guna Rahe Hai Bhanvare', src: '/audio/rafi/song26.mp3' },
        { title: 'Jag Dil Le Diwana', src: '/audio/rafi/song27.mp3' },
        { title: 'Jane Chaman Shola Badan', src: '/audio/rafi/song28.mp3' },
        { title: 'Kabhi Raat Din Hum Door The', src: '/audio/rafi/song29.mp3' },
        { title: 'Kah Do Koi Na Kare Yahan Pyar', src: '/audio/rafi/song30.mp3' },
        { title: 'Kaun Hai Jo Sapnon Mein Aaya', src: '/audio/rafi/song31.mp3' },
        { title: 'Khuli Palak Mein Jhoota Gussa', src: '/audio/rafi/song32.mp3' },
        { title: 'Likhe Jo Khat Tujhe', src: '/audio/rafi/song33.mp3' },
        { title: 'Love In Tokyo', src: '/audio/rafi/song34.mp3' },
        { title: 'Main Chali Main Chali', src: '/audio/rafi/song35.mp3' },
        { title: 'Maine Rakkha Hai Mohabbat', src: '/audio/rafi/song36.mp3' },
        { title: 'Main Gaoon Tum So Jao', src: '/audio/rafi/song37.mp3' },
        { title: 'Main Kahin Kavi Na Ban Jaoon', src: '/audio/rafi/song38.mp3' },
        { title: 'Mera Dushman Tu Meri Dosti Ko Tarse', src: '/audio/rafi/song39.mp3' },
        { title: 'Mera To Jo Bhi Kadam', src: '/audio/rafi/song40.mp3' },
        { title: 'Mile Na Phool To Kanton Se Dosti', src: '/audio/rafi/song41.mp3' },
        { title: 'Nain Mila Kar Chain Churana', src: '/audio/rafi/song42.mp3' },
        { title: 'Na Ja Kahin Ab Na Ja', src: '/audio/rafi/song43.mp3' },
        { title: 'Na Tu Zameen Ke Liye', src: '/audio/rafi/song44.mp3' },
        { title: 'Na Tu Zameen Ke Liye', src: '/audio/rafi/song45.mp3' },
        { title: 'Nazar Na Lag Jaye Kisiki Rahon Mein', src: '/audio/rafi/song46.mp3' },
        { title: 'O Nanhe Se Farishtey', src: '/audio/rafi/song47.mp3' },
        { title: 'O Sathi O Sathi O', src: '/audio/rafi/song48.mp3' },
        { title: 'Panchhi Re O Panchhi', src: '/audio/rafi/song49.mp3' },
        { title: 'Parda Hata Do', src: '/audio/rafi/song50.mp3' },
        { title: 'Pukarta Chala Hoon Mai', src: '/audio/rafi/song51.mp3' },
        { title: 'Rang Aur Noor Ki Barat', src: '/audio/rafi/song52.mp3' },
        { title: 'Rimjhim Gire Saawan', src: '/audio/rafi/song53.mp3' },
        { title: 'Sachcha Hai Pyar Mera Agar', src: '/audio/rafi/song54.mp3' },
        { title: 'Sau Baar Janam Lenge', src: '/audio/rafi/song55.mp3' },
        { title: 'Suhani Raat Dhal Chuki', src: '/audio/rafi/song56.mp3' },
        { title: 'Teri Galiyon Mein', src: '/audio/rafi/song57.mp3' },
        { title: 'Tu Mere Sapnon Ki Rani Banegi', src: '/audio/rafi/song58.mp3' },
        { title: 'Tumhari Nazar Kyon Khafa Ho Gayi', src: '/audio/rafi/song59.mp3' },
        { title: 'Yeh Anjaan Raahen', src: '/audio/rafi/song60.mp3' }
      ]
    },
    Kishore: {
  name: 'Kishore Kumar',
  displayName: 'Kishore',
  songs: [
  { "title": "Aaj Unse Pehli Mulaqat Hogi", "src": "/audio/kishore/01 - Aaj Unse Pehli Mulaqat Hogi.mp3" },
  { "title": "Aanewala Pal Janewala Hai", "src": "/audio/kishore/02 - Aanewala Pal Janewala Hai.mp3" },
  { "title": "Aasman Ke Neeche", "src": "/audio/kishore/03 - Aasman Ke Neeche.mp3" },
  { "title": "Aise Na Mujhe", "src": "/audio/kishore/04 - Aise Na Mujhe.mp3" },
  { "title": "Apni To Jaise Taise", "src": "/audio/kishore/05 - Apni To Jaise Taise.mp3" },
  { "title": "Are Jaane Kaise Kab Kahan", "src": "/audio/kishore/06 - Are Jaane Kaise Kab Kahan.mp3" },
  { "title": "Baad Muddat Ke Hum Tum Mile", "src": "/audio/kishore/07 - Baad Muddat Ke Hum Tum Mile.mp3" },
  { "title": "Baap Ki Kasam", "src": "/audio/kishore/08 - Baap Ki Kasam.mp3" },
  { "title": "Bhool Gaya Sab Kuch", "src": "/audio/kishore/09 - Bhool Gaya Sab Kuch.mp3" },
  { "title": "Bye Bye Miss Goodnight", "src": "/audio/kishore/10 - Bye Bye Miss Goodnight.mp3" },
  { "title": "Chala Jata Hoon", "src": "/audio/kishore/11 - Chala Jata Hoon.mp3" },
  { "title": "Chalte Chalte Mere Yeh Geet", "src": "/audio/kishore/12 - Chalte Chalte Mere Yeh Geet.mp3" },
  { "title": "Chhukar Mere Man Ko", "src": "/audio/kishore/13 - Chhukar Mere Man Ko.mp3" },
  { "title": "Dilbar Mere Kab Tak Mujhe", "src": "/audio/kishore/14 - Dilbar Mere Kab Tak Mujhe.mp3" },
  { "title": "Dil Ki Batein Dil Ki Jane", "src": "/audio/kishore/15 - Dil Ki Batein Dil Ki Jane.mp3" },
  { "title": "Dil Kya Kare", "src": "/audio/kishore/16 - Dil Kya Kare.mp3" },
  { "title": "Ek Ajnabi Hasina Se", "src": "/audio/kishore/17 - Ek Ajnabi Hasina Se.mp3" },
  { "title": "Ek Ladki Bheegi Bhagisi", "src": "/audio/kishore/18 - Ek Ladki Bheegi Bhagisi.mp3" },
  { "title": "Gum Hai Kisi Mein", "src": "/audio/kishore/19 - Gum Hai Kisi Mein.mp3" },
  { "title": "Guzar Jayen Din Din", "src": "/audio/kishore/20 - Guzar Jayen Din Din.mp3" },
  { "title": "Haan Pehli Bar", "src": "/audio/kishore/21 - Haan Pehli Bar.mp3" },
  { "title": "Haare Na Insaan", "src": "/audio/kishore/22 - Haare Na Insaan.mp3" },
  { "title": "Hum Apki Ankon Mein", "src": "/audio/kishore/23 - Hum Apki Ankon Mein.mp3" },
  { "title": "Hum Hai Raahi Pyar Ke", "src": "/audio/kishore/24 - Hum Hai Raahi Pyar Ke.mp3" },
  { "title": "Ik Rasta Hai Zindagi", "src": "/audio/kishore/25 - Ik Rasta Hai Zindagi.mp3" },
  { "title": "Inteha Ho Gayi", "src": "/audio/kishore/26 - Inteha Ho Gayi.mp3" },
  { "title": "Jawani Jawani Jalti Jawani", "src": "/audio/kishore/27 - Jawani Jawani Jalti Jawani.mp3" },
  { "title": "Jawani Ka Khazana", "src": "/audio/kishore/28 - Jawani Ka Khazana.mp3" },
  { "title": "Jeevan Ke Din", "src": "/audio/kishore/29 - Jeevan Ke Din.mp3" },
  { "title": "Jeevan Ke Safar Mein", "src": "/audio/kishore/30 - Jeevan Ke Safar Mein.mp3" },
  { "title": "Jeevan Mitana Hai", "src": "/audio/kishore/31 - Jeevan Mitana Hai.mp3" },
  { "title": "Kabhi Hoti Nahi Hai", "src": "/audio/kishore/32 - Kabhi Hoti Nahi Hai.mp3" },
  { "title": "Kaise Kahen Hum", "src": "/audio/kishore/33 - Kaise Kahen Hum.mp3" },
  { "title": "Kehna Hai Kehna Hai", "src": "/audio/kishore/34 - Kehna Hai Kehna Hai.mp3" },
  { "title": "Koi Bhi Dil Men Na Aaya Tha", "src": "/audio/kishore/35 - Koi Bhi Dil Men Na Aaya Tha.mp3" },
  { "title": "Koi Roko Na Priyatama", "src": "/audio/kishore/36 - Koi Roko Na Priyatama.mp3" },
  { "title": "Koya Koya Rahe Teri", "src": "/audio/kishore/37 - Koya Koya Rahe Teri.mp3" },
  { "title": "Mere Dil Mein Aaj Kya Hai", "src": "/audio/kishore/38 - Mere Dil Mein Aaj Kya Hai.mp3" },
  { "title": "Mere Pyase Man Ki Bahar", "src": "/audio/kishore/39 - Mere Pyase Man Ki Bahar.mp3" },
  { "title": "Mere Mehboob Qayamat Hogi", "src": "/audio/kishore/40 - Mere Mehboob Qayamat Hogi.mp3" },
  { "title": "Mere Sapnon Ki Rani", "src": "/audio/kishore/41 - Mere Sapnon Ki Rani.mp3" },
  { "title": "Muskurata Hua", "src": "/audio/kishore/42 - Muskurata Hua.mp3" },
  { "title": "Neeli Neeli Ambar", "src": "/audio/kishore/43 - Neeli Neeli Ambar.mp3" },
  { "title": "Oh Hansini", "src": "/audio/kishore/44 - Oh Hansini.mp3" },
  { "title": "Oh Mere Dil Ke Chain", "src": "/audio/kishore/45 - Oh Mere Dil Ke Chain.mp3" },
  { "title": "Oh Nigahein Mastana", "src": "/audio/kishore/46 - Oh Nigahein Mastana.mp3" },
  { "title": "Pal Pal Dil Ke Paas", "src": "/audio/kishore/47 - Pal Pal Dil Ke Paas.mp3" },
  { "title": "Phoolon Ke Rang Se", "src": "/audio/kishore/48 - Phoolon Ke Rang Se.mp3" },
  { "title": "Pyar Deewana Hota Hai", "src": "/audio/kishore/49 - Pyar Deewana Hota Hai.mp3" },
  { "title": "Roop Tera Mastana", "src": "/audio/kishore/50 - Roop Tera Mastana.mp3" },
  { "title": "Saath Mein Pyara Saathi Hai", "src": "/audio/kishore/51 - Saath Mein Pyara Saathi Hai.mp3" },
  { "title": "Sama Hai Suhana Suhana", "src": "/audio/kishore/52 - Sama Hai Suhana Suhana.mp3" },
  { "title": "Sara Zamana", "src": "/audio/kishore/53 - Sara Zamana.mp3" },
  { "title": "Sheeshe Gharon Mein", "src": "/audio/kishore/54 - Sheeshe Gharon Mein.mp3" },
  { "title": "Takatu Taka Tai", "src": "/audio/kishore/55 - Takatu Taka Tai.mp3" },
  { "title": "Tera Peeche Na Chhodunga", "src": "/audio/kishore/56 - Tera Peeche Na Chhodunga.mp3" },
  { "title": "Tere Humsafar Geet Hain Tere", "src": "/audio/kishore/57 - Tere Humsafar Geet Hain Tere.mp3" },
  { "title": "Tere Jaisa Mukhda To", "src": "/audio/kishore/58 - Tere Jaisa Mukhda To.mp3" },
  { "title": "Tujh Sa Haseen", "src": "/audio/kishore/59 - Tujh Sa Haseen.mp3" },
  { "title": "Tum Aa Gaye Ho Noor", "src": "/audio/kishore/60 - Tum Aa Gaye Ho Noor.mp3" },
  { "title": "Tum Bin Jaoon Kahan", "src": "/audio/kishore/61 - Tum Bin Jaoon Kahan.mp3" },
  { "title": "Tum Saath Ho Jab Apne", "src": "/audio/kishore/62 - Tum Saath Ho Jab Apne.mp3" },
  { "title": "Wadon Nahi Rasmon Se Pyar Se", "src": "/audio/kishore/63 - Wadon Nahi Rasmon Se Pyar Se.mp3" },
  { "title": "Waqt Se Pehle", "src": "/audio/kishore/64 - Waqt Se Pehle.mp3" },
  { "title": "Yeh Dil Na Hota Bechara", "src": "/audio/kishore/65 - Yeh Dil Na Hota Bechara.mp3" },
  { "title": "Yeh Jo Mohabbat Hai", "src": "/audio/kishore/66 - Yeh Jo Mohabbat Hai.mp3" },
  { "title": "Yeh Lal Rang", "src": "/audio/kishore/67 - Yeh Lal Rang.mp3" },
  { "title": "Yeh Shaam Mastani", "src": "/audio/kishore/68 - Yeh Shaam Mastani.mp3" },
  { "title": "Yeh Wada Raha", "src": "/audio/kishore/69 - Yeh Wada Raha.mp3" },
  { "title": "Zindagi Ek Safar Hai Suhana", "src": "/audio/kishore/70 - Zindagi Ek Safar Hai Suhana.mp3" },
  { "title": "Zindagi Ka Safar", "src": "/audio/kishore/71 - Zindagi Ka Safar.mp3" },
  { "title": "Aate Jate Khoobsurat Awara", "src": "/audio/kishore/72 - Aate Jate Khoobsurat Awara.mp3" },
  { "title": "Aisa Kabhi Hua Nahin", "src": "/audio/kishore/73 - Aisa Kabhi Hua Nahin.mp3" },
  { "title": "Bachna Ae Haseeno", "src": "/audio/kishore/74 - Bachna Ae Haseeno.mp3" },
  { "title": "Koi Bhi Dil Men Na Aaya Tha Laparwah", "src": "/audio/kishore/75 - Koi Bhi Dil Men Na Aaya Tha Laparwah.mp3" },
  { "title": "Yaadon Ki Baarat Nikli Hai", "src": "/audio/kishore/76 - Yaadon Ki Baarat Nikli Hai.mp3" }
 ]
},

    Mukesh: {
      name: 'Mukesh',
      displayName: 'Mukesh',
      songs: [
        { title: 'Ae Pyase Dil Bezuban', src: '/audio/mukesh/song1.mp3' },
        { title: 'Chandi Ki Deewar', src: '/audio/mukesh/song2.mp3' },
        { title: 'Dil Ki Nazar Se', src: '/audio/mukesh/song3.mp3' },
        { title: 'Duniya Walon Se Door', src: '/audio/mukesh/song4.mp3' },
        { title: 'Ek Din Bik Jayega Mati Ke Mol', src: '/audio/mukesh/song5.mp3' },
        { title: 'Gaa Diwane Jhoom Ke', src: '/audio/mukesh/song6.mp3' }, 
        { title: 'Joshe Jawani Hai Re', src: '/audio/mukesh/song7.mp3' },
        { title: 'Jo Chala Gaya Use Bhool Ja', src: '/audio/mukesh/song25.mp3' },
        { title: 'Jo Tumko Ho Pasand', src: '/audio/mukesh/song8.mp3' },
        { title: 'Kai Baar Yun Bhi Dekha Hai', src: '/audio/mukesh/song9.mp3' },
        { title: 'Kisi Ki Muskurahaton Se', src: '/audio/mukesh/song10.mp3' },
        { title: 'Kya Khoob Lagti Ho', src: '/audio/mukesh/song11.mp3' },
        { title: 'Mana Ki Tere Pyar Mein', src: '/audio/mukesh/song12.mp3' },
        { title: 'Mehtab Tera Chehra', src: '/audio/mukesh/song13.mp3' },
        { title: 'Mere Toote Huye Dil Se', src: '/audio/mukesh/song14.mp3' },
        { title: 'Nayan Hamare Sanjh Sakare', src: '/audio/mukesh/song15.mp3' },
        { title: 'O Shama Mujhe Phoonk De', src: '/audio/mukesh/song16.mp3' },
        { title: 'Suhani Chandni Raaten', src: '/audio/mukesh/song17.mp3' },
        { title: 'Taron Mein Sajke', src: '/audio/mukesh/song18.mp3' },
        { title: 'Teri Yaad Dil Se Bhulane Chala Hoon', src: '/audio/mukesh/song19.mp3' },
        { title: 'Woh Tere Pyar Ka Gham', src: '/audio/mukesh/song20.mp3' },
        { title: 'Woh Zindagi Sapnon Ka Saudagar', src: '/audio/mukesh/song21.mp3' },
        { title: 'Zindagi Mein Aap Aaye', src: '/audio/mukesh/song22.mp3' },
        { title: 'Zuban Pe Dard Bhari Dastan', src: '/audio/mukesh/song23.mp3' },
        { title: 'Insaan Hanse Ya Roye', src: '/audio/mukesh/song24.mp3' },
      ]
    },
    Lata: {
      name: 'Lata Mangeshkar',
      displayName: 'Lata',
      songs: [
        { title: 'Aa Jaane Jaan', src: '/audio/lata/song1.mp3' },
        { title: 'Aa Ja Re Ab Mera Dil Pukare', src: '/audio/lata/song2.mp3' },
        { title: 'Aap Ki Nazron Ne Samjha', src: '/audio/lata/song3.mp3' },
        { title: 'Ajib Dastan Hai Yeh', src: '/audio/lata/song4.mp3' },
        { title: 'Aye Dil-E-Nadan', src: '/audio/lata/song5.mp3' },
        { title: 'Do Ghoont Mujhe Bhi Pila De', src: '/audio/lata/song6.mp3' },
        { title: 'Gumnaam Hai Koi', src: '/audio/lata/song7.mp3' },
        { title: 'Hum The Jinke Sahare', src: '/audio/lata/song8.mp3' },
        { title: 'Itna Na Mujhse Tu Pyar Badha', src: '/audio/lata/song9.mp3' },
        { title: 'Ja Re Ja Re Ud Ja Re Panchhi', src: '/audio/lata/song10.mp3' },
        { title: 'Kabhi Main Kahoon', src: '/audio/lata/song11.mp3' },
        { title: 'Kitna Haseen Hain Mausam', src: '/audio/lata/song12.mp3' },
        { title: 'Kuchh Dil Ne Kaha Kuchh Bhi Nahin', src: '/audio/lata/song13.mp3' },
        { title: 'Lag Ja Gale Se Phir', src: '/audio/lata/song14.mp3' },
        { title: 'Lehra Ke Aaya Hai Jhoka Bahar Ka', src: '/audio/lata/song15.mp3' },
        { title: 'Lo Aa Gayi Unki Yaad', src: '/audio/lata/song16.mp3' },
        { title: 'Mera Dil Yeh Pukare Aaja', src: '/audio/lata/song17.mp3' },
        { title: 'Mere Naseeb Mein Tu Hai Ki', src: '/audio/lata/song18.mp3' },
        { title: 'Mubarak Ho Tujhe Ae Dil', src: '/audio/lata/song19.mp3' },
        { title: 'Na Jane Kyon Hota Hai', src: '/audio/lata/song20.mp3' },
        { title: 'Rajnigandha Phool Tumhare', src: '/audio/lata/song21.mp3' },
        { title: 'Rangeela Re', src: '/audio/lata/song22.mp3' },
        { title: 'Roz Sham Aati Hai Magar Aesi Imtihan', src: '/audio/lata/song23.mp3' },
        { title: 'Ruk Ja Raat', src: '/audio/lata/song24.mp3' },
        { title: 'Tera Jana', src: '/audio/lata/song25.mp3' },
        { title: 'Unse Mili Nazar Ke Mere Hosh Ud Gai', src: '/audio/lata/song26.mp3' },
        { title: 'Wada Kar Le Sajna', src: '/audio/lata/song27.mp3' },
        { title: 'Woh Bhooli Dastan Lo Phir Yaad', src: '/audio/lata/song28.mp3' },
        { title: 'Yeh Raat Bheegi Bheegi', src: '/audio/lata/song29.mp3' },
        { title: 'Yeh Raaten Julie', src: '/audio/lata/song30.mp3' },
        { title: 'Ye Samaa Samaa Hai Pyar Ka', src: '/audio/lata/song31.mp3' }
      ]
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
  const handleArtistSelect = (artist) => {
    setCurrentArtist(artist);
    setCurrentSongIndex(0);
    setIsPlaying(true);
  };

  // Play/Pause toggle
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Next song
  const nextSong = () => {
    const nextIndex = (currentSongIndex + 1) % sortedSongs.length;
    setCurrentSongIndex(nextIndex);
    setIsPlaying(true);
  };

  // Previous song
  const prevSong = () => {
    const prevIndex = (currentSongIndex - 1 + sortedSongs.length) % sortedSongs.length;
    setCurrentSongIndex(prevIndex);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    setProgress(audioRef.current.currentTime);
  };
  
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };
  
  const handleSeek = (e) => {
    const newTime = Number(e.target.value);
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  const formatTime = (time) => {
    if (!time) return "0:00";
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
    const analyser = analyserRef.current;
    if (!analyser) return;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const animate = () => {
      analyser.getByteFrequencyData(dataArray);

      // Average volume
      const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

      // Normalize glow strength
      const glow = Math.min(avg / 50, 3);

      document.documentElement.style.setProperty(
        "--beat-glow",
        `${glow}`
      );

      requestAnimationFrame(animate);
    };

    animate();
  };

  const resumeAudioContext = async () => {
    if (!audioContextRef.current) return;

    if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
      console.log("AudioContext resumed");
    }
  };

  const dataArrayRef = useRef(null); // Add this ref for particles

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

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const data = dataArrayRef.current;
      let beat = 0;

      if (analyserRef.current && data) {
        analyserRef.current.getByteFrequencyData(data);
        beat = data[2] / 255; // bass feel
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

      requestAnimationFrame(animate);
    };

    animate();
  };

  // Handle song ended
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => {
        nextSong();
      };
    }
  }, [currentSongIndex]);

  // Auto-play when song changes
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(e => console.log("Auto-play prevented:", e));
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (!audioContextRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();

      sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
      analyserRef.current = audioContextRef.current.createAnalyser();

      analyserRef.current.fftSize = 256;
      
      // Initialize dataArrayRef
      dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);

      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);
    }
  }, []);

  return (
    <div className="music-player">
      {/* Background Music Symbols */}
      <div className="bg-music-symbol left">𝄞</div>   {/* Treble Clef */}
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
        <h1>
          <span className="music-icon-left">𝄞</span>
          Golden Era Music Player
          <span className="music-icon-right">♪</span>
        </h1>
        <p className="subtitle">Experience the legends of Indian music</p>
      </header>

      {/* Animated Artist Images */}
      <div className="artists-container">
        {Object.entries(artists).map(([key, artist]) => (
          <div 
            key={key}
            className={`artist-card ${currentArtist === key ? 'active' : ''}`}
            onClick={() => handleArtistSelect(key)}
          >
            <div className="artist-image-wrapper">
              <img 
                src={`/images/${key.toLowerCase()}.jpg`} 
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
          <h3>{currentSong.title}</h3>
          <p>Song {currentSongIndex + 1} of {currentArtistData.songs.length}</p>
        </div>

        <div className="controls">
          <button className="control-btn prev" onClick={prevSong} title="Previous">
            ⏮
          </button>
          
          <button className="control-btn play-pause" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? '⏸' : '▶️'}
          </button>
          
          <button className="control-btn next" onClick={nextSong} title="Next">
            ⏭
          </button>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <span>{formatTime(progress)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={progress}
            onChange={handleSeek}
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
                onClick={() => {
                  setCurrentSongIndex(index);
                  setIsPlaying(true);
                }}
              >
                {index + 1}. {song.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Animated Buttons */}
      <div className="artist-buttons">
        {Object.keys(artists).map((artist) => (
          <button
            key={artist}
            className={`artist-btn ${currentArtist === artist ? 'active-btn' : ''}`}
            onClick={() => handleArtistSelect(artist)}
          >
            <span className="btn-text">Play {artist === 'MD' ? 'Mohammad Rafi' : artists[artist].name}</span>
            <span className="btn-icon">🎵</span>
          </button>
        ))}
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentSong?.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={async () => {
          setIsPlaying(true);
          await resumeAudioContext();
          startBeatGlow();
          startParticles();
          console.log("Playing");
        }}
        onPause={() => setIsPlaying(false)}
        controls={false}
      />

      {/* Canvas for particles */}
      <canvas ref={canvasRef} id="particles-canvas"></canvas>

      <footer>
        <p>Made with ❤️ for classic music lovers</p>
      </footer>
    </div>
  );
};

export default App;