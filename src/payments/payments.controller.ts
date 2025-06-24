import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentSessionDto } from './dto/payment-session.dto';
import { Request, Response } from 'express';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-payment-session')
  createPaymentsSession(@Body() paymentSessionDto: PaymentSessionDto) {
    return this.paymentsService.createPaymemtSession(paymentSessionDto);
  }

  @Get('success')
  success() {
    return {
      ok: true,
      message: 'Payment successfull',
    };
  }

  @Get('canceled')
  cancel() {
    return {
      ok: false,
      message: 'Payment canceled',
    };
  }

  @Post('webhook')
  async stripeWebHook(@Req() req: Request, @Res() res: Response) {
    console.log('Webhook called');
    return this.paymentsService.stripeWebhook(req, res);
  }
}
