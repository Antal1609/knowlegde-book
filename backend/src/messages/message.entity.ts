import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinDate } from 'class-validator';
import { Type } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({ length: 64 })
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(64)
  name: string;

  @Column({ length: 512 })
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(512)
  message: string;

  @Column()
  @Type(() => Date)
  @MinDate(new Date())
  @ApiProperty()
  date: Date;
}
