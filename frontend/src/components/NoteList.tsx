import React, { useEffect, useState } from "react";
import { fetchNotes, deleteNote, Note } from "../api/notes";
import NoteItem from "./NoteItem";
import NoteForm from "./NoteForm";

const NoteList: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [editingNote, setEditingNote] = useState<Note | null>(null);

    useEffect(() => {
        const getNotes = async () => {
            const fetchedNotes = await fetchNotes();
            setNotes(fetchedNotes);
        };
        getNotes();
    }, []);

    const handleSave = () => {
        setEditingNote(null);
        const getNotes = async () => {
            const fetchedNotes = await fetchNotes();
            setNotes(fetchedNotes);
        };
        getNotes();
    };

    const handleEdit = (note: Note) => {
        setEditingNote(note);
    };

    const handleDelete = async (id: number) => {
        await deleteNote(id);
        const getNotes = async () => {
            const fetchedNotes = await fetchNotes();
            setNotes(fetchedNotes);
        };
        getNotes();
    };

    return (
        <div>
            <h1>Notes</h1>
            {editingNote ? (
                <NoteForm note={editingNote} onSave={handleSave} />
            ) : (
                <NoteForm onSave={handleSave} />
            )}
            {notes.map((note) => (
                <NoteItem
                    key={note.id}
                    note={note}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
};

export default NoteList;
