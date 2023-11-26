import React from 'react'
import DisplayTrack from './DisplayTrack'
import Controls from './Controls'
import ProgressBar from './ProgressBar'
// import { tracks } from '../data'
import Header from './Header'
import PlayList from './PlayList'
import 'animate.css';
import './MusicPlayer.css'
import { useTrack } from '../context/TrackContext'

const MusicPlayer = () => {
    const { trackIndex, handlePlayListItemClick, showPlayList } = useTrack()

    return (
        <div className='music-player'>
            <Header onClickPlayList={showPlayList} />
            <div className='music-player-body'>
                <div className='player'>
                    <DisplayTrack />
                    <ProgressBar />
                    <Controls />
                </div>
                <div className='animate__animated animate__slideInLeft'>
                    <PlayList trackIndex={trackIndex} onClick={handlePlayListItemClick} />
                </div>
            </div>
        </div>
    )
}

export default MusicPlayer