import React, { useState, useEffect, FC } from "react";
import '../Assests/css/list.css';
import songs from '../Assests/Data/infos';
import { timer } from "../utils/timer";

interface LyricsProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    musicNumber: number;
    setMusicNumber: React.Dispatch<React.SetStateAction<number>>;
}

const Lyrics: FC<{ props: LyricsProps }> = ({ props: { open, setOpen, musicNumber, setMusicNumber } }) => {
    return (
        <div className={`list ${open ? 'show' : ''}`}>
            <div className="header">
                <div>
                    <i className="material-icons">mic</i>
                    <span>Lyrics</span>
                </div>
                <i className="material-icons"
                onClick={() => setOpen(false)}>close</i>
            </div>


            <ul>
                {
                    songs.map((music, index) => (
                        <li key={music.id} onClick={() => setMusicNumber(index)}
                        className={`${musicNumber === index ? 'playing' : ''}`}>
                            <div className="row">
                                <p>{music.lyrics}</p>
                            </div>
                            <Duration music={music} />
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default Lyrics;

const Duration = ({music}:any) => {
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const audio = new Audio(music.audio);
        audio.onloadedmetadata = function(){
            if(audio.readyState > 0){
                setDuration(audio.duration);
            }
        }
    }, [music]);

    return (
        <span className="duration">{timer(duration)}</span>
    )
}