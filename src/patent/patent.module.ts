import { Module } from '@nestjs/common'
import { PatentService } from './patent.service'
import { PatentController } from './patent.controller'
import { DbService } from 'src/db/db.service'

@Module({
  controllers: [PatentController],
  providers: [PatentService, DbService],
})
export class PatentModule {}
