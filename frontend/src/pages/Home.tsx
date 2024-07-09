// src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import { fetchNotes } from "../api/notes";
import NoteForm from "../components/NoteForm";

interface Note {
    id: number;
    title: string;
    content: string;
    tags: string[];
}

const Home: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        const fetchNotesList = async () => {
            try {
                const data = await fetchNotes();
                setNotes(data);
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        };

        fetchNotesList();
    }, []);

    return (
        <div>
            <h1>Notes</h1>
            <NoteForm onSave={() => fetchNotes()} /> <h2>All Notes</h2>
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>
                        <p>Tags: {note.tags.join(", ")}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
