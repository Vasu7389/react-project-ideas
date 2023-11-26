import React, { useState } from 'react'
import Header from './Header'
import MusicPlayer from './MusicPlayer'
import './Player.css'
import PlayList from './PlayList'

const Player = () => {
    const [view, setView] = useState('player')

    return (
        <div className='player'>
            <Header onClickPlayList={() => setView('playlist')} />
            {view === 'player' ? <MusicPlayer /> : view === 'playlist' ? <PlayList /> : null}
        </div>
    )
}

export default Player