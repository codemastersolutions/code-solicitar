import {
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import {
  validate, IsEmail, IsDate, MaxLength, ValidationError, IsNotEmpty,
} from 'class-validator';
import bcrypt from 'bcrypt';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  active: boolean;

  @Column({ length: 150, nullable: false })
  @MaxLength(150)
  @IsNotEmpty()
  name: string;

  @Column({ length: 30, nullable: false, unique: true })
  @MaxLength(30)
  @IsNotEmpty()
  username: string;

  @Column({ length: 50, nullable: false, unique: true })
  @IsEmail()
  @MaxLength(50)
  @IsNotEmpty()
  email: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  password: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  @IsDate()
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  @IsDate()
  deletedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async encryptPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password || this.password, salt);
  }

  @BeforeInsert()
  @BeforeUpdate()
  setLowerCaseFields() {
    this.email = this.email?.toLocaleLowerCase();
    this.username = this.username?.toLocaleLowerCase();
  }

  public validate = (): Promise<ValidationError[]> => validate(this)
}

export default User;
