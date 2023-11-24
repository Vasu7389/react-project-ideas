import React from 'react'
import { useStickyNotes } from '../context/StickyNotesContext'
import { PlusSvgIcon } from './SvgIcons'
import "./Header.css"

const Header = () => {
    const { addNewNote } = useStickyNotes()

    return (
        <div className='header'>
            <div className='logo-container'>
                <img src="sticky-note-logo.png" alt="Sticky Notes Logo" width={45} />
                <h1 className='app-name'>Sticky Notes</h1>
            </div>
            <button className='new-button' onClick={addNewNote}>
                <PlusSvgIcon />
                Add new note
            </button>
        </div>
    )
}

export default Header