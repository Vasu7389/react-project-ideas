import React from 'react'
import { tracks } from '../data'
import './PlayList.css'
import { useTrack } from '../context/TrackContext'
import useTracksDuration from '../hooks/useTrack'
import { BiEqualizer } from "react-icons/bi";

const PlayList = ({ trackIndex, onClick }) => {
    const { isPlayListOpen } = useTrack()
    const { durations } = useTracksDuration(tracks);

    if (!isPlayListOpen) return null

    return (
        <div className='animate__animated animate__slideInLeft'>
            <div className='playlist'>
                <div className='playlist-container'>
                    {tracks.map((track, index) => (
                        <div key={track.displayName} className='playlist-item' onClick={() => onClick(index)}>
                            <div className='playlist-item-info-wrapper'>
                                <img src={track.coverUrl} alt='track' />
                                <div className='playlist-item-info'>
                                    <h3>{track.displayName}</h3>
                                    <p>{track.artist}</p>
                                </div>
                            </div>
                            <div className='playlist-item-duration'>
                                <p>{durations[index]}</p>
                                {trackIndex === index && <button className='equalizer'><BiEqualizer /></button>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PlayList