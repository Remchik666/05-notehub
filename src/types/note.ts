export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export interface Note {
    id: number;
    title: string;
    content: string;
    tag: NoteTag;
    createdAt: string;
    updatedAt: string;
}

export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

export interface CreateNoteDto {
    title: string;
    content: string;
    tag: NoteTag;
}

export interface NoteResponse {
    note: Note;
}