import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { Note } from './note.entity';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  createNote(
    @Body('title') title: string,
    @Body('content') content: string,
  ): Promise<Note> {
    return this.noteService.createNote(title, content);
  }

  @Put('/:id')
  updateNote(
    @Param('id') id: number,
    @Body('title') title: string,
    @Body('content') content: string,
  ): Promise<Note> {
    return this.noteService.updateNote(id, title, content);
  }

  @Delete('/:id')
  deleteNote(@Param('id') id: number): Promise<void> {
    return this.noteService.deleteNote(id);
  }

  @Get()
  getNotes(@Query('archived') archived: boolean): Promise<Note[]> {
    return this.noteService.getNotes(archived);
  }

  @Put('/:id/archive')
  archiveNote(
    @Param('id') id: number,
    @Query('archived') archived: boolean,
  ): Promise<Note> {
    return this.noteService.archiveNote(id, archived);
  }

  @Put('/:id/tags')
  addTag(@Param('id') id: number, @Query('tag') tag: string): Promise<Note> {
    return this.noteService.addTag(id, tag);
  }

  @Delete('/:id/tags')
  removeTag(@Param('id') id: number, @Query('tag') tag: string): Promise<Note> {
    return this.noteService.removeTag(id, tag);
  }

  @Get('/tags/:tag')
  getNotesByTag(@Param('tag') tag: string): Promise<Note[]> {
    return this.noteService.getNotesByTag(tag);
  }
}
