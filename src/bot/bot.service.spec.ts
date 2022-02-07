import { BotService } from './bot.service';

class TestBot {
  from = {
    first_name: 'Mery',
  };
  chat = { id: 1000 };
  messageListener = [];
  actionCallback = {};
  telegram = {
    sendMessage: (chatId, message) => {
      this.messageListener.forEach((item) => {
        item(message);
      });
    },
  };

  on(type, callback) {}

  action(actionType, callback) {
    if (!this.actionCallback[actionType]) {
      this.actionCallback[actionType] = [];
    }
    this.actionCallback[actionType].push(callback);
  }
  launch() {}

  fireAction(type, ctx) {
    const callbacks = this.actionCallback[type];
    if (Array.isArray(callbacks)) {
      callbacks.forEach((item) => {
        item(ctx);
      });
    }
  }
}

describe('BotService', () => {
  let service: BotService;
  let bot;
  beforeEach(async () => {
    bot = new TestBot();
    service = new BotService(bot);
  });

  it('testing Hi', async () => {
    await service.botMessage();
    const msgListener = (message) => {
      expect(message).toEqual('Hi Mery');
    };
    bot.messageListener.push(msgListener);
    bot.fireAction('Hi', bot);
  });

  it('testing Bye', async () => {
    await service.botMessage();
    const msgListener = (message) => {
      const date = new Date();
      const currantDate =
        [date.getHours(), date.getMinutes(), date.getSeconds()].join(':') +
        ' ' +
        [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('/');
      expect(message).toEqual(`Bye at ${currantDate}`);
    };
    bot.messageListener.push(msgListener);
    bot.fireAction('Bye', bot);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getCurrentDate', () => {
    const getDate = service.getCurrentDate();

    const date = new Date();
    const currantDate =
      [date.getHours(), date.getMinutes(), date.getSeconds()].join(':') +
      ' ' +
      [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('/');
    expect(getDate).toEqual(currantDate);
  });

  it('getName', () => {
    const data = {
      from: {
        first_name: 'Mery',
      },
    };
    const name = service.getUserName(data);
    expect(name).toEqual('Mery');
  });

  it('checkReplyMessage', () => {
    const replyConfig = {
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
    expect(service.replyConfig).toMatchObject(replyConfig);
  });

  it('getHiMessage', () => {
    const data = {
      from: {
        first_name: 'Mery',
      },
    };
    const name = service.getHiMessage(data);
    expect(name).toEqual('Hi Mery');
  });

  it('getByeMessage', () => {
    const date = new Date();
    const currantDate =
      [date.getHours(), date.getMinutes(), date.getSeconds()].join(':') +
      ' ' +
      [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('/');
    const byeMessage = service.getByeMessage();
    expect(byeMessage).toEqual(`Bye at ${currantDate}`);
  });
});
