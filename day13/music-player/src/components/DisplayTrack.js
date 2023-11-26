import React from 'react'
import './DisplayTrack.css'
import { useTrack } from '../context/TrackContext'

const DisplayTrack = () => {
    const { track, audioRef, setDuration, progressBarRef, handleNext } = useTrack()

    function onLoadedMetadata() {
        const duration = audioRef.current.duration
        setDuration(duration)
        progressBarRef.current.max = duration
    }

    return (
        <div className='display-track-container'>
            <img className='track-image-preview-rounded' src={track.coverUrl} alt='track' />
            <div className='track-info'>
                <h4 className='track-title'>{track.displayName}</h4>
                <p className='track-artist'>{track.artist}</p>
            </div>
            <audio src={track.audioSrc} ref={audioRef} onLoadedMetadata={onLoadedMetadata} onEnded={handleNext} />
        </div>
    )
}

export default DisplayTrack