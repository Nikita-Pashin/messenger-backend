import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect,  } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  cors: {
    origin: '*',
  }
})
export class MessagesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
// export class MessagesGateway {
  constructor(private readonly messagesService: MessagesService, private jwtService: JwtService) {}
  @WebSocketServer() server: Server;

  async handleConnection(
    @ConnectedSocket() client: Socket, ...args
  ) {
    try {
      const token = client.handshake.headers.token;

      if (Array.isArray(token)) {
        return;
      }

      const token2 = token.split(' ')[1];

      const decodeToken = await this.jwtService.verifyAsync(token2);

      if (!this.messagesService.getClientId(client.id)) {
        this.messagesService.addClient(client, decodeToken.sub)
      }
    } catch (error) {
      console.error('error_1', error);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    try {
      if (this.messagesService.getClientId(client.id)) {
        this.messagesService.removeClient(client.id)
      }
    } catch (error) {
      console.error(error);
    }
  }

  afterInit(server: Server) {
    console.log('afterInit');
  }

  @SubscribeMessage('createMessage')
  create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const toSendClient = this.messagesService.getUserId(createMessageDto.toUserId);
    const formSendClient = this.messagesService.getClientId(client.id);

    const message = this.messagesService.create({
      to: createMessageDto.toUserId,
      from: formSendClient.userId,
      text: createMessageDto.text,
    }).then((res) => {
      if (toSendClient) {
        toSendClient.socket.emit('createMessage', res);
      }
      client.emit('createMessage', res);
    })


    return message;
  }

  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messagesService.findAll();
  }

  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: number) {
    return this.messagesService.findOne(id);
  }

  @SubscribeMessage('updateMessage')
  update(@MessageBody() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(updateMessageDto.id, updateMessageDto);
  }

  @SubscribeMessage('removeMessage')
  remove(@MessageBody() id: number) {
    return this.messagesService.remove(id);
  }
}
