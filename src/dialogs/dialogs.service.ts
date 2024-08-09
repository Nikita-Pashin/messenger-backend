import { Injectable } from '@nestjs/common';
import { CreateDialogDto } from './dto/create-dialog.dto';
import { UpdateDialogDto } from './dto/update-dialog.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DialogsService {
  constructor(private readonly prisma: PrismaService) {}

  // create(createDialogDto: CreateDialogDto) {
  //   return 'This action adds a new dialog';
  // }

  findAll(id: string) {
    return this.prisma.message.findMany({
      where: {
        from: Number(id),
      }
    });
  }

  // findOne(id: number) {
  //   return this.prisma.message.findMany({
  //     where: {
  //       from: 1,
  //     }
  //   });
  // }

  // update(id: number, updateDialogDto: UpdateDialogDto) {
  //   return `This action updates a #${id} dialog`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} dialog`;
  // }
}
