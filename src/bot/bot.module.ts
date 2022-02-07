import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
function getBotService(): BotService {
  return new BotService({});
}
@Module({
  providers: [
    {
      provide: BotService,
      useFactory: getBotService,
    },
  ],
})
export class BotModule {}
