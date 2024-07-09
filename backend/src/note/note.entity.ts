import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { tagsTransformer } from '../transformers/tags.transformer';

@Entity('notes') // Check this, it's not working
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: false })
  archived: boolean;

  @Column({ type: 'text', transformer: tagsTransformer, default: '' })
  tags: string[];
}
