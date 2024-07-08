import { Module } from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { ProposalController } from './proposal.controller';
import { DbService } from 'src/db/db.service';

@Module({
  controllers: [ProposalController],
  providers: [ProposalService, DbService],
  exports: [ProposalService],
})
export class ProposalModule {}
