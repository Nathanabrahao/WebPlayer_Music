import React, { FC } from "react";
import App from "../App";
import '../Assests/css/card.css';
import Songs from '../Assests/Data/infos';

interface CardProps {
    musicNumber: number;
    setMusicNumber: React.Dispatch<React.SetStateAction<number>>;
}

const Card: FC<{ props: CardProps }> = ({ props: { musicNumber, setMusicNumber } }) => {
    console.log(Songs)
    return (
        <div className="card">
            <div className="nav">
                <i className="material-icons">expand_more</i>
                <span>Now Playing {musicNumber + 1}/{Songs.length} </span>
                <i className="material-icons">queue_music</i>
            </div>


            <div className="img">
                <img src={Songs[musicNumber].cover} alt="" />
            </div>

            <div className="details">
                <p className="title">{Songs[musicNumber].name}</p>
            </div>

            <div className="progress">
                <input type="range" min={0} max={100} />
            </div>

            <div className="timer">
                <span>00:00</span>
                <span>03:16</span>
            </div>

            <div className="controls">
                <i className="material-icons">repeat</i>

                <i className="material-icons" id="prev">skip_previous</i>

                <div className="play">
                    <i className="material-icons">play_arrow</i>
                </div>

                <i className="material-icons" id="next">skip_next</i>

                <i className="material-icons">volume_up</i>

                <div className="volume">
                    <i className="material-icons">volume_up</i>
                    <input type="range" min={0} max={100} />
                    <span>50</span>
                </div>

            </div>


            <audio src={Songs[musicNumber].audio} hidden></audio>

        </div>
    );
}

export default Card;
