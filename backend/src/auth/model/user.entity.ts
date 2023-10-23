import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;
}
