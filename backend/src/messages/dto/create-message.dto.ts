import { IsNotEmpty, IsString, MaxLength, MinDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateMessageDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(64)
  name: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(512)
  message: string;

  @MinDate(new Date())
  @Type(() => Date)
  @ApiProperty()
  time: Date;
}
