import { Injectable } from '@nestjs/common';
import { CreateMessageDto, CreateMessageDtoService } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Socket } from 'socket.io';
import { PrismaService } from 'src/prisma.service';

interface Client {
  socket: Socket;
  userId: string;
}

@Injectable()
export class MessagesService {
    constructor(private readonly prisma: PrismaService) {}

  #clients: Client[] = [];

  addClient(client: Socket, userId: Client['userId']) {
    this.#clients.push({
      socket: client,
      userId,
    });
  }

  removeClient(id: string) {
    this.#clients = this.#clients.filter(client => client.socket.id !== id)
  }

  getClientId(id: string): Client {
    return this.#clients.find((client) => client.socket.id === id);
  }

  getUserId(id: string): Client {
    return this.#clients.find((client) => client.userId === id);
  }

  create({ from, text, to }: CreateMessageDtoService) {
    return this.prisma.message.create({
      data: {
        from: Number(from),
        to: Number(to),
        text,
      },
    });
  }

  findAll() {
    return `This action returns all messages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
