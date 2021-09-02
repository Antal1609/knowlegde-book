import { IsString, Length } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @Length(6, 64)
  name: string;

  @IsString()
  @Length(1, 512)
  text: string;
}
