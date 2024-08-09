import { Module } from '@nestjs/common';
import { DialogsModule } from './dialogs/dialogs.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  // controllers: [AppController],
  imports: [DialogsModule, UserModule, AuthModule, MessagesModule],
  // exports: [AppService],
})
export class AppModule {}
