import { Controller, Get } from '@nestjs/common';
import { DialogsService } from './dialogs.service';
import { Headers } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('dialogs')
export class DialogsController {
  constructor(private readonly dialogsService: DialogsService, private jwtService: JwtService) {}

  // @Post()
  // create(@Body() createDialogDto: CreateDialogDto) {
  //   return this.dialogsService.create(createDialogDto);
  // }

  @Get()
  async findAll(@Headers() headers) {
    try {
      const token = headers.token;
      const token2 = token.split(' ')[1];
  
      const decodeToken = await this.jwtService.verifyAsync(token2);
  
      return this.dialogsService.findAll(decodeToken.sub);
    } catch (error) {
      console.error(error)
    }
  }

  // @Get(':id')
  // findOne(@Param('id') id: string, @Headers() headers) {
  //   const token = headers.token;
  //   const token2 = token.split(' ')[1];

  //   return this.dialogsService.findOne(token2.sub);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDialogDto: UpdateDialogDto) {
  //   return this.dialogsService.update(+id, updateDialogDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.dialogsService.remove(+id);
  // }
}
