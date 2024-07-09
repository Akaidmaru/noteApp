import React from "react";
import { Note } from "../api/notes";

interface NoteItemProps {
    note: Note;
    onEdit: (note: Note) => void;
    onDelete: (id: number) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onEdit, onDelete }) => {
    return (
        <div>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <p>{note.tags.join(", ")}</p>
            <button onClick={() => onEdit(note)}>Edit</button>
            <button onClick={() => onDelete(note.id)}>Delete</button>
        </div>
    );
};

export default NoteItem;
