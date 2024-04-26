import React, { useState, useEffect, FC } from "react";
import '../Assests/css/list.css';
import songs from '../Assests/Data/infos';

interface ListProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    musicNumber: number;
    setMusicNumber: React.Dispatch<React.SetStateAction<number>>;
}

const List: FC<{ props: ListProps }> = ({ props: { open, setOpen, musicNumber, setMusicNumber } }) => {
    return (
        <div className={`list ${open ? 'show' : ''}`}>
            <div className="header">
                <div>
                    <i className="material-icons">queue_music</i>
                    <span>Music List</span>
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
                                <span>{music.name}</span>
                                <p>{music.artist}</p>
                            </div>
                            <Duration music={music} />
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default List;

const Duration = ({music}:any) => {
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const audio = new Audio(music.audio);
        console.log(music)
    }, [music]);

    return (
        <span className="duration">03:32</span>
    )
}