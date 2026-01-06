import axios, { AxiosResponse } from 'axios';
import { Note, NoteTag } from '../types/note';

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> = await api.get(
    '/notes',
    { params }
  );
  return response.data;
};

export const createNote = async (
  payload: CreateNotePayload
): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.post('/notes', payload);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return response.data;
};
