import React from 'react'
import "./StickyNotesGrid.css"
import StickyNote from './StickyNote'
import { useStickyNotes } from '../context/StickyNotesContext';

const StickyNotesGrid = () => {
    const { notes, updateNote, deleteNote } = useStickyNotes();
    if (notes.length === 0) return null

    return (
        <div className="grid-container">
            {notes.map(note => (
                <StickyNote
                    key={note.id}
                    note={note}
                    onNoteChange={note => updateNote(note)}
                    onDelete={id => deleteNote(id)}
                />
            ))}
        </div>
    )
}

export default StickyNotesGrid