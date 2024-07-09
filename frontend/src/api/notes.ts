const API_URL = "http://localhost:3000";

export interface Note {
    id: number;
    title: string;
    content: string;
    archived: boolean;
}

export const fetchNotes = async (): Promise<Note[]> => {
    const response = await fetch(`${API_URL}/notes`);
    return await response.json();
};

export const createNote = async (note: Omit<Note, "id">): Promise<Note> => {
    const response = await fetch(`${API_URL}/notes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
    });
    return await response.json();
};

export const updateNote = async (
    id: number,
    note: Partial<Note>
): Promise<Note> => {
    const response = await fetch(`${API_URL}/notes/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
    });
    return await response.json();
};

export const deleteNote = async (id: number): Promise<void> => {
    await fetch(`${API_URL}/notes/${id}`, {
        method: "DELETE",
    });
};
