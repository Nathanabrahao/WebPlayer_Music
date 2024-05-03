import React, { FC, useState, useRef, useEffect } from "react";
import App from "../App";
import '../Assests/css/card.css';
import Songs from '../Assests/Data/infos';
import { timer } from "../utils/timer";

interface CardProps {
    musicNumber: number;
    setMusicNumber: React.Dispatch<React.SetStateAction<number>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Card: FC<{ props: CardProps }> = ({ props: { musicNumber, setMusicNumber, setOpen } }) => {
    const [duration, setDuration] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [play, setPlay] = useState(false);
    const [lyricsOpen, setLyricsOpen] = useState(false)

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleMicIconClick = () => {
        setLyricsOpen(prevState => !prevState);
    };

    function handleLoadStart(e: React.SyntheticEvent<HTMLAudioElement, Event>) {
        const src: string = e.currentTarget.src;
        const audio = new Audio(src);
        audio.onloadedmetadata = function () {
            if (audio.readyState > 0) {
                setDuration(audio.duration)
            }
        }
    }

    function handlePlayingAudio() {
        if (play && audioRef.current) {
            audioRef.current.pause();
            setPlay(false);
        } else if (audioRef.current) {
            audioRef.current.play();
            setPlay(true);
        }
    }
    
    function handleTimeUpdate() {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    }

    function changeCurrentTime(e: any){
        if (audioRef.current) {
            audioRef.current.currentTime = Number(e.target.value);
        }
    }

    function handleNextPrev(e: any) {
        if (audioRef.current) {
            if (play) {
                audioRef.current.pause();
                setPlay(false);
            }
            if (e === -1) {
                if (musicNumber === 0) {
                    setMusicNumber(Songs.length - 1);
                } else {
                    setMusicNumber(musicNumber - 1);
                }
            } else {
                if (musicNumber === Songs.length - 1) {
                    setMusicNumber(0);
                } else {
                    setMusicNumber(musicNumber + 1);
                }
            }
        }
    }

    return (
        <div className="card">
            <div className="nav">
                <i className="material-icons" onClick={handleMicIconClick}>mic</i>
                <span>Now Playing {musicNumber + 1}/{Songs.length} </span>
                <i className="material-icons" onClick={() => setOpen(prev => !prev)}>queue_music</i>
            </div>


            <div className="img">
                <img src={Songs[musicNumber].cover} alt="" />
            </div>

            <div className="details">
                <p className="title">{Songs[musicNumber].name}</p>
                <p className="artist">{Songs[musicNumber].artist}</p>
            </div>

            <div className="progress">
                <input type="range" min={0} max={duration} 
                value={currentTime} onChange={e => changeCurrentTime(e)} />
            </div>

            <div className="timer">
                <span>{timer(currentTime)}</span>
                <span>{timer(duration)}</span>
            </div>

            <div className="controls">
                <i className="material-icons">repeat</i>

                <i className="material-icons" id="prev"
                onClick={() => handleNextPrev(-1)}>skip_previous</i>

                <div className="play" onClick={handlePlayingAudio}>
                    <i className="material-icons">
                        {play ? "pause" : "play_arrow"}
                    </i>
                </div>

                <i className="material-icons" id="next"
                onClick={() => handleNextPrev(1)}>skip_next</i>

                <i className="material-icons">shuffle</i>

                <div className="volume">
                    <i className="material-icons">volume_up</i>
                    <input type="range" min={0} max={100} />
                    <span>50</span>
                </div>

            </div>


            <audio src={Songs[musicNumber].audio} hidden ref={audioRef}
                onLoadStart={handleLoadStart} onTimeUpdate={handleTimeUpdate}></audio>

        </div>
    );
}

export default Card;
