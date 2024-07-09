import React, { useState } from "react";
import { createNote, updateNote, Note } from "../api/notes";

interface NoteFormProps {
    note?: Note;
    onSave: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ note, onSave }) => {
    const [title, setTitle] = useState(note?.title ?? "");
    const [content, setContent] = useState(note?.content ?? "");
    const [tags, setTags] = useState(note?.tags.join(", ") ?? "");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const tagsArray = tags.split(",").map((tag) => tag.trim());
        if (note) {
            await updateNote(note.id, { title, content, tags: tagsArray });
        } else {
            await createNote({
                title,
                content,
                archived: false,
                tags: tagsArray,
            });
        }
        onSave();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="tags">Tags (comma separated)</label>
                <input
                    id="tags"
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default NoteForm;
