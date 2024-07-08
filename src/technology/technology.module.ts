import { Module } from '@nestjs/common'
import { TechnologyService } from './technology.service'
import { TechnologyController } from './technology.controller'
import { DbService } from 'src/db/db.service'

@Module({
  controllers: [TechnologyController],
  providers: [TechnologyService, DbService],
  exports: [TechnologyService],
})
export class TechnologyModule {}
