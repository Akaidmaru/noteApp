import React from "react";
import { Note } from "../api/notes";

interface NoteItemProps {
    note: Note;
    onEdit: (note: Note) => void;
    onDelete: (id: number) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onEdit, onDelete }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-yellow-200 m-4">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{note.title}</div>
                <p className="text-gray-700 text-base">{note.content}</p>
                <p className="text-gray-600 text-sm">
                    {note.archived ? "✔ Archived" : "❌ Not Archived"}
                </p>
            </div>
            <div className="px-6 py-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => onEdit(note)}
                >
                    Edit
                </button>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => onDelete(note.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default NoteItem;
