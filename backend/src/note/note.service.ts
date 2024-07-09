import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  async createNote(
    title: string,
    content: string,
    archived: boolean,
  ): Promise<Note> {
    const note = this.noteRepository.create({
      title,
      content,
      archived,
    });
    return await this.noteRepository.save(note);
  }

  async updateNote(
    id: number,
    title: string,
    content: string,
    archived: boolean,
  ): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { id } });
    if (!note) {
      throw new Error(`Note with id ${id} not found`);
    }
    note.title = title;
    note.content = content;
    note.archived = archived;
    return await this.noteRepository.save(note);
  }

  async deleteNote(id: number): Promise<void> {
    const result = await this.noteRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
  }

  async getNotes(archived?: boolean): Promise<Note[]> {
    if (archived !== undefined) {
      return this.noteRepository.find({ where: { archived } });
    } else {
      return this.noteRepository.find();
    }
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
}

/* 
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
 */
