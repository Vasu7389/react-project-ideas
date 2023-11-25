import React, { useEffect, useState } from 'react'
import useDebounce from '../hooks/useDebounce'
import ColorCustomizer from './ColorCustomizer'
import { ColorSvgIcon, CrossSvgIcon } from './SvgIcons'
import "./StickyNote.css"

const StickyNote = (props) => {
    const [title, setTitle] = useState(props.note.title);
    const [content, setContent] = useState(props.note.content);
    const [editingTitle, setEditingTitle] = useState(false);
    const [editingContent, setEditingContent] = useState(false);
    const [isColorCustomizerVisible, setIsColorCustomizerVisible] = useState(false);

    // Debounce the title and content so that we only update the context once the user has stopped typing
    const debouncedTitle = useDebounce(title, 500);
    const debouncedContent = useDebounce(content, 500);
    // Update the context with the new title and content if they have changed
    useEffect(() => {
        // Don't send an update if the title or content is empty
        if (debouncedTitle === '' || debouncedContent === '') return;
        // Don't send an update if the title and content have not changed
        if (debouncedTitle === props.note.title && debouncedContent === props.note.content) return;
        // Send the update to the context
        props.onNoteChange({ id: props.note.id, title: debouncedTitle, content: debouncedContent });
    }, [debouncedTitle, debouncedContent, props]);


    function handleOnTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleOnContentChange(e) {
        setContent(e.target.value);
    }

    function handleInputOnBlur() {
        if (title === '') {
            setTitle('Enter the note title');
            return
        }
        setEditingTitle(false)
    }

    function handleInputKeyDown(e) {
        if (e.key === 'Enter') {
            if (title === '') {
                setTitle('Enter the note title');
                return
            }
            setEditingTitle(false);
        }
    }

    function handleTextAreaOnBlur() {
        if (content === '') {
            setContent('Enter the note content');
            return
        }
        setEditingContent(false)
    }

    function handleOnColorChange(color) {
        props.onNoteChange({ id: props.note.id, color });
        setIsColorCustomizerVisible(false);
    }

    return (
        <div className='sticky-note' style={{ backgroundColor: props.note.color }}>
            <div className='sticky-header'>
                <button className='sticky-note-circular-button' title="Color" onClick={() => setIsColorCustomizerVisible(!isColorCustomizerVisible)}>
                    <ColorSvgIcon />
                </button>
                <button className='sticky-note-circular-button' title='Delete' onClick={() => props.onDelete(props.note.id)}>
                    <CrossSvgIcon />
                </button>
            </div>
            {isColorCustomizerVisible && <ColorCustomizer onColorChange={handleOnColorChange} />}
            <>
                {!editingTitle && <div className='sticky-note-title' onClick={() => !isColorCustomizerVisible && setEditingTitle(true)}>{title}</div>}
                {editingTitle && !isColorCustomizerVisible &&
                    <input
                        className='sticky-note-title-input'
                        autoFocus
                        type="text"
                        value={title}
                        onChange={handleOnTitleChange}
                        onBlur={handleInputOnBlur}
                        onKeyDown={handleInputKeyDown}
                    />
                }
            </>
            <>
                {!editingContent && <div className='sticky-note-content' onClick={() => !isColorCustomizerVisible && setEditingContent(true)}>{content}</div>}
                {editingContent && !isColorCustomizerVisible &&
                    <textarea
                        className='sticky-note-content-input'
                        cols={30}
                        rows={10}
                        autoFocus
                        value={content}
                        onChange={handleOnContentChange}
                        onBlur={handleTextAreaOnBlur} />
                }
            </>
        </div>
    )
}

export default StickyNote