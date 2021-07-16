import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
  import * as bcrypt from 'bcrypt';
 import { Task } from '../tasks/task.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

 
  @Column()
  dateofbirth: string;

  @Column()
  phone: number;

   @OneToMany(type => Task, task => task.user, { eager: true })
   tasks: Task[];

   async validatePassword(password: string): Promise<boolean> {
     const hash = await bcrypt.hash(password);
     return hash === this.password;
   }
}
