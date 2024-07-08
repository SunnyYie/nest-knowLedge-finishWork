import { Global, Module } from '@nestjs/common/decorators'
import { DbService } from './db.service'

@Global()
@Module({
  providers: [
    {
      provide: DbService,
      useValue: new DbService(),
    },
  ],
  exports: [DbService],
})
export class DbModule {}
