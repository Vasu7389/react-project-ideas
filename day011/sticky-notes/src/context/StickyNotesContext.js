import { createContext, useContext, useEffect, useState } from "react";

const StickyNotesContext = createContext();

// StickyNotesContext.Provider is a component that wraps around the entire app
const StickyNotesProvider = ({ children }) => {
    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || []);

    // Save notes to localStorage every time the notes array changes
    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    function addNewNote() {
        setNotes(prevNotes => {
            return [...prevNotes, {
                id: Date.now(),
                title: 'Click to edit title',
                content: 'Click to edit content',
                color: '#ffd500'
            }];
        });
    }

    function updateNote(note) {
        setNotes(prevNotes => {
            const updatedNotes = prevNotes.map(prevNote => {
                if (prevNote.id === note.id) {
                    return { ...prevNote, ...note };
                }
                return prevNote;
            });
            return updatedNotes;
        });
    }

    function deleteNote(id) {
        setNotes(prevNotes => {
            return prevNotes.filter(note => note.id !== id);
        });
    }

    return (
        <StickyNotesContext.Provider value={{
            notes,
            addNewNote,
            updateNote,
            deleteNote
        }}>
            {children}
        </StickyNotesContext.Provider>
    );
}

export default StickyNotesProvider;

// Custom hook to use the StickyNotesContext
export const useStickyNotes = () => {
    return useContext(StickyNotesContext);
}