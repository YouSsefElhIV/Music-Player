import { useState, useRef, useEffect } from 'react'
import song1file from './assets/songs/song1.mp3'
import song2file from './assets/songs/song2.mp3'
import song3file from './assets/songs/song3.mp3'
import song1img from './assets/images/song1.png'
import song2img from './assets/images/song2.png'
import song3img from './assets/images/song3.png'
import pauseicon from './assets/images/pause.png'
import playicon from './assets/images/play.png'
import midicon from './assets/images/mid.png'
import muteicon from './assets/images/mute.png'
import highicon from './assets/images/high.png'
import lowicon from './assets/images/low.png'
import previcon from './assets/images/prev.png'
import nexticon from './assets/images/next.png'

import './App.css'

async function prevSong(index, setIndex, songs, file, setPlay, setX, setSongtimer, loading, setLoading){
  if (loading === true)
      return ;
  setLoading(true)
  let prev;
  if (index - 1 < 0)
    prev = songs.length - 1
  else
    prev = (index - 1)
  setIndex(prev)
  file.src = songs[prev].song
  try{
    await file.play()
    setPlay(pauseicon)
    setX(1)
    setSongtimer(0)
  }
  catch (err){
    console.log(err)
  }
  finally{
    setLoading(false)
  }
}

async function pauseSong(x, setX, file, setPlay, songtimer){
  if (file && songtimer < Math.floor(file.duration / 60))
  {
    let img;
    if (x % 2 === 0)
    {
      try{
        await file.play()
        img = pauseicon
      }
      catch(err)
      {
        console.log(err)
      }
    }
    else
    {
      file.pause()
      img = playicon
    }
    setX(x + 1);
    setPlay(img)
  }
}

async function nextSong(index, setIndex, songs, file, setPlay, setX, setSongtimer, loading, setLoading){
  if (loading === true)
      return ;
  setLoading(true)
  let next
  if (index + 1 >= songs.length)
    next = 0
  else
    next = index + 1
  setIndex(next)
  file.src = songs[next].song
  try{
    await file.play()
    setPlay(pauseicon)
    setX(1)
    setSongtimer(0)
  }
  catch (err){
    console.log(err)
  }
  finally{
    setLoading(false)
  }
}

function App() {

  const songs = [
    {
      name: "سورة الكهف ",
      singer: "ياسر الدوسري",
      song: song1file,
      duration: "25.01",
      image: song1img
    },
    {
      name: "سورة مريم ",
      singer: "ياسر الدوسري",
      song: song2file,
      duration: "16.25",
      image: song2img
    },
    {
      name: "سورة المؤمنون",
      singer: "ياسر الدوسري",
      song: song3file,
      duration: "21.01",
      image: song3img
    }
  ]
  const [ loading, setLoading ] = useState(false)
  const [ index, setIndex ] = useState(0)
  const song = useRef(new Audio(songs[index].song));
  const [ x, setX ] = useState(0)
  const [ songtimer, setSongtimer ] = useState(0)
  const [ play, setPlay ] = useState(playicon)
  const [ volumeRange, setVolumeRange ] = useState(0.5)
  const [ volumeimg, setVolumeimg ] = useState(midicon)


  useEffect(() => {
  const img = new Image();
  img.src = songs[index].image;
}, [index]);

  useEffect(() => {
  
    const updateTimer = () => {
      let min = Math.floor(song.current.currentTime / 60)
      let sec = Math.floor(song.current.currentTime % 60)
      setSongtimer(Number(`${min}.${sec.toString().padStart(2, "0")}`))
    };
  
    song.current.addEventListener("timeupdate", updateTimer);
  
    return () => {
      song.current.removeEventListener("timeupdate", updateTimer);
    };
  }, []);
  


  return (
    <>
      <div className='wrapper'>
        <div className='data-div'>
          <div className='song-singer-name'>
            <span className='song-name'> {songs[index].name}</span><br />
            <span className='singer-name'> {songs[index].singer} </span>
            <input type='range' className='volume-bar' min="0" max="100" value={volumeRange * 100} onChange={(e) => {
              setVolumeRange(e.target.value / 100)
              song.current.volume = (e.target.value / 100).toFixed(1)
              if (e.target.value <= 0)
                  setVolumeimg(muteicon)
              else if (e.target.value <= 30)
                setVolumeimg(lowicon)
              else if (e.target.value <= 80)
                setVolumeimg(midicon)
              else
                setVolumeimg(highicon)
            }
            }></input>
            <img src={volumeimg} className='volume-icon'></img>
          </div> 
          <div className='icon-div'>
            <img src={songs[index].image} className='im'></img>
          </div>
        </div>
        <div className='bar'>
          <span className='timer'>{songtimer.toFixed(2)}</span>
          <input className='song-dur' type="range" value={songtimer} min="0" max={songs[index].duration} step="0.01" onChange={(e) => {
            setSongtimer(Number(e.target.value))
            song.current.currentTime = e.target.value * 60
            if (Number(e.target.value) >= Number(songs[index].duration))
              setPlay(playicon)
          }
          }/>
          <span className='duration'>{(songs[index].duration)}</span>
        </div>
        <div className='controls-div'>
          <button className='prev-btn' onClick={() => prevSong(index, setIndex, songs,  song.current, setPlay, setX, setSongtimer, loading, setLoading)}>
            <img className='play-icon' src={previcon}></img>
          </button>
          <button className='pause-btn' onClick={() => pauseSong(x, setX, song.current, setPlay, songtimer)} >
            <img className='play-icon' src={play}></img>
          </button>
          <button className='next-btn' onClick={() => nextSong(index, setIndex, songs, song.current, setPlay, setX, setSongtimer, loading, setLoading)} >
            <img className='play-icon' src={nexticon}></img>
          </button>
        </div>
      </div>
    </>
  )
}


export default App
