import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './message.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async create(data: CreateMessageDto): Promise<Message> {
    return this.messageRepository.save(this.messageRepository.create(data));
  }

  async findAll(): Promise<Message[]> {
    return this.messageRepository.find();
  }

  async findOne(id: string): Promise<Message> {
    return this.messageRepository.findOne({ id });
  }

  async update(id: string, data: UpdateMessageDto): Promise<void> {
    await this.messageRepository.update({ id }, data);
  }

  async remove(id: string) {
    await this.messageRepository.delete({ id });
  }
}
