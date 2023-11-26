import React from 'react'
import { formatTime } from '../helpers'
import './ProgressBar.css'
import { useTrack } from '../context/TrackContext'

const ProgressBar = () => {
    const { progressBarRef, audioRef, timeProgress, duration } = useTrack()

    function handleProgressChange() {
        audioRef.current.currentTime = progressBarRef.current.value
    }

    return (
        <div className='progress-bar-container'>
            <span className='time current'>{formatTime(timeProgress)}</span>
            <input type='range' defaultValue={0} ref={progressBarRef} onChange={handleProgressChange} />
            <span className='time'>{formatTime(duration)}</span>
        </div>
    )
}

export default ProgressBar