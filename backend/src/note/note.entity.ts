import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column({ nullable: true })
  tags: string[];
}
