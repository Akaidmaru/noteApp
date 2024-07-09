import React, { useState } from "react";
import { createNote, updateNote, Note } from "../api/notes";

interface NoteFormProps {
    note?: Note;
    onSave: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ note, onSave }) => {
    const [title, setTitle] = useState(note?.title ?? "");
    const [content, setContent] = useState(note?.content ?? "");
    const [archived, setArchived] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (note) {
            await updateNote(note.id, { title, content, archived });
        } else {
            await createNote({ title, content, archived });
        }
        onSave();
    };

    return (
        <div className="bg-gray-200 p-4 rounded">
            <form id="Form" className="flex flex-col" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-gray-300 rounded p-2 mb-2"
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="border border-gray-300 rounded p-2 mb-2"
                />
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={archived}
                        onChange={(e) => setArchived(e.target.checked)}
                        className="mr-2"
                    />
                    Archived
                </label>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("Form");
    if (form) {
        form.addEventListener("submit", function () {
            setTimeout(function () {
                location.reload();
            }, 300);
        });
    }
});

export default NoteForm;
