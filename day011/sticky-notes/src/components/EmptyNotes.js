import React from 'react'
import { useStickyNotes } from '../context/StickyNotesContext';
import { PlusSvgIcon } from './SvgIcons';
import "./EmptyNotes.css"

const EmptyNotes = () => {
    const { notes, addNewNote } = useStickyNotes();

    // If there are notes, return null
    if (notes.length > 0) return null

    return (
        <div className='empty-notes-container'>
            <img className="empty-notes-image" src="add_new_note.png" alt="empty notes" />
            <div className="empty-notes">Not notes yet. Please add a new note clicking on the button below.</div>
            <button className="add-note-button" onClick={addNewNote}>
                <PlusSvgIcon />
                Add new note
            </button>
        </div>
    )
}

export default EmptyNotes