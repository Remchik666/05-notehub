import axios from 'axios';
import type { CreateNoteDto, FetchNotesResponse, NoteResponse } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';

const token = import.meta.env.VITE_NOTEHUB_TOKEN;
const headers = {
    Authorization: `Bearer ${token}`,
};


export const fetchNotes = async (
    page = 1,
    perPage = 12,
    search = ''
): Promise<FetchNotesResponse> => {
    const response = await axios.get<FetchNotesResponse>(`${BASE_URL}/notes`, {
    params: { page, perPage, search },
    headers,
    });
    return response.data;
};

export const createNote = async (noteData: CreateNoteDto): Promise<NoteResponse> => {
    const response = await axios.post<NoteResponse>(`${BASE_URL}/notes`, noteData, { headers });
    return response.data;
};

export const deleteNote = async (id: string): Promise<NoteResponse> => {
    const response = await axios.delete<NoteResponse>(`${BASE_URL}/notes/${id}`, { headers });
    return response.data;
};