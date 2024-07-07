import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Note } from './note.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  // Create Notes
  async createNote(title: string, content: string): Promise<Note> {
    const note = this.noteRepository.create({ title, content });
    await this.noteRepository.save(note);
    return note;
  }

  // Get Note by ID and updates it
  async updateNote(id: number, title: string, content: string): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { id } });
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    note.title = title;
    note.content = content;
    await this.noteRepository.save(note);
    return note;
  }

  // Get Note by ID and deletes it
  async deleteNote(id: number): Promise<void> {
    const result = await this.noteRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
  }

  // Get all notes
  async getNotes(archived: boolean): Promise<Note[]> {
    return this.noteRepository.find({ where: { archived } });
  }

  async archiveNote(id: number, archived: boolean): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { id } });
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    note.archived = archived;
    await this.noteRepository.save(note);
    return note;
  }

  async addTag(id: number, tag: string): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { id } });
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    if (!note.tags) {
      note.tags = [];
    }
    note.tags.push(tag);
    await this.noteRepository.save(note);
    return note;
  }

  async removeTag(id: number, tag: string): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { id } });
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    note.tags = note.tags.filter((t) => t !== tag);
    await this.noteRepository.save(note);
    return note;
  }

  async getNotesByTag(tag: string): Promise<Note[]> {
    return this.noteRepository.find({ where: { tags: Like(`%${tag}%`) } });
  }
}
