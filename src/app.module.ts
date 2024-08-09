import { Module } from '@nestjs/common';
import { DialogsModule } from './dialogs/dialogs.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [DialogsModule, UserModule, AuthModule, MessagesModule],
})
export class AppModule {}
