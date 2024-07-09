export class CreateNoteDto {
  title: string;
  content: string;
  archived?: boolean;
  tags: string[];
}

export class UpdateNoteDto {
  title?: string;
  content?: string;
  archived?: boolean;
  tags?: string[];
}
