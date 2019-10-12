import { Controller, Get, Param, Redirect } from '@nestjs/common';

@Controller()
export class AppController {

  @Get('go/:id')
  @Redirect('/client/order/', 301)
  FastOrder(@Param('id') id: string) {
    return { url: '/client/#/order/' + id };
  }
}
