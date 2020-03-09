import { Injectable, HttpException } from '@nestjs/common';
import axios = require('axios');

@Injectable()
export class PaymentService {
  async LINE_PAY_APPLY(orderID: string, amount: number) {
    const headers = {
      'Content-Type': 'application/json',
      'X-LINE-ChannelSecret': process.env.LINE_PAY_CHANNEL_SECRET,
      'X-LINE-ChannelId': process.env.LINE_PAY_CHANNEL_ID,
    };

    const data = {
      productName: 'menu.fitのお会計',
      productImageUrl:
        'https://raw.githubusercontent.com/Shuangbing/menu-fit-dev/master/docs/logo.png',
      amount: amount,
      currency: 'JPY',
      orderId: orderID,
      confirmUrl: process.env.LINE_PAY_CONFIRM_URL + '/' + orderID,
      cancelUrl: process.env.LINE_PAY_CONFIRM_URL,
      capture: true,
      confirmUrlType: 'CLIENT',
    };

    return await axios.default
      .post('https://sandbox-api-pay.line.me/v2/payments/request', data, {
        headers: headers,
      })
      .then(res => {
        if (res.data.returnCode === '0000') {
          return {
            transactionId: res.data.info.transactionId,
            paymentURL: res.data.info.paymentUrl.web,
          };
        } else {
          throw new HttpException('支払いの申請ができませんでした', 403);
        }
      })
      .catch(error => {
        throw new HttpException('支払いの申請ができませんでした', 403);
      });
  }

  async LINE_PAY_CONFIRM(amount: number, transactionId: string) {
    const headers = {
      'Content-Type': 'application/json',
      'X-LINE-ChannelSecret': process.env.LINE_PAY_CHANNEL_SECRET,
      'X-LINE-ChannelId': process.env.LINE_PAY_CHANNEL_ID,
    };

    const data = {
      amount: amount,
      currency: 'JPY',
    };

    return await axios.default
      .post(
        'https://sandbox-api-pay.line.me/v2/payments/' +
          transactionId +
          '/confirm',
        data,
        { headers: headers },
      )
      .then(res => {
        if (res.data.returnCode === '0000') {
          return {
            payment: 'line-pay',
            status: 1,
            transactionId: res.data.transactionId,
            orderId: res.data.orderId,
          };
        } else {
          throw new HttpException('支払いの確認ができませんでした', 403);
        }
      })
      .catch(error => {
        throw new HttpException('支払いの確認ができませんでした', 403);
      });
  }
}
