import { Injectable, HttpException } from '@nestjs/common';
import axios = require('axios');

@Injectable()
export class PaymentService {
    async LINE_PAY(orderID: string, amount: number) {

        const headers = {
            'Content-Type': 'application/json',
            'X-LINE-ChannelSecret': process.env.LINE_PAY_CHANNEL_SECRET,
            'X-LINE-ChannelId': process.env.LINE_PAY_CHANNEL_ID,
        };

        const data = {
            productName: 'Menu.fitのお会計',
            productImageUrl: 'https://popcorn-images-aws.s3.ap-northeast-1.amazonaws.com/popcorn_white.png',
            amount: amount,
            currency: 'JPY',
            orderId: orderID,
            confirmUrl: process.env.LINE_PAY_CALLBACK_URL + '?orderID=' + orderID,
            cancelUrl: process.env.LINE_PAY_CALLBACK_URL + '?orderID=' + orderID,
            capture: true,
            confirmUrlType: 'CLIENT',
        };

        return await axios.default.post('https://sandbox-api-pay.line.me/v2/payments/request', data, { headers: headers })
            .then(res => {
                if (res.data.returnCode === '0000') {
                    return {
                        paymentURL: res.data.info.paymentUrl.web,
                    };
                } else {
                    throw new HttpException('支払いの申請ができませんでした', 403);
                }
            })
            .catch(error => { throw new HttpException('支払いの申請ができませんでした', 403); });
    }
}
