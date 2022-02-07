import { Injectable } from '@nestjs/common';

@Injectable()
export class BotService {
  bot;
  replyConfig = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Hi',
            callback_data: 'Hi',
          },
          {
            text: 'Bye',
            callback_data: 'Bye',
          },
        ],
      ],
    },
  };

  constructor(bot) {
    this.bot = bot;
  }

  async botMessage() {
    this.bot.on('message', (msg) => {
      const message = `Click me`;
      this.bot.telegram.sendMessage(msg.chat.id, message, this.replyConfig);
    });
    this.bot.action('Hi', (ctx) => {
      ctx.telegram.sendMessage(ctx.chat.id, this.getHiMessage(ctx));
    });
    this.bot.action('Bye', (ctx) => {
      ctx.telegram.sendMessage(ctx.chat.id, this.getByeMessage());
    });
    await this.bot.launch();
  }

  getHiMessage(data) {
    return `Hi ${this.getUserName(data)}`;
  }

  getByeMessage() {
    return `Bye at ${this.getCurrentDate()}`;
  }

  getCurrentDate() {
    const date = new Date();
    const currantDate =
      [date.getHours(), date.getMinutes(), date.getSeconds()].join(':') +
      ' ' +
      [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('/');

    return currantDate;
  }
  getUserName(userData) {
    return userData.from.first_name;
  }
}
