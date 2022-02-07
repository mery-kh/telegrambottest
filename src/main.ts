import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BotService } from './bot/bot.service';
import { Telegraf } from 'telegraf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  const token = '5051579121:AAFkk2FJC5CEtjBij3vX7EBDfgi71zgZKMg';

  const bot = new Telegraf(token);
  const botService = new BotService(bot);
  await botService.botMessage();
}
bootstrap();
