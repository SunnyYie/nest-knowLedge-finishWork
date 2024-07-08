import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module'
import { UserModule } from './user/user.module';
import { ProposalModule } from './proposal/proposal.module';
import { PatentModule } from './patent/patent.module';
import { ProductModule } from './product/product.module';
import { TechnologyModule } from './technology/technology.module';
import { ProductPatentModule } from './product_patent/product_patent.module';
import { ProductProposalModule } from './product_proposal/product_proposal.module';

@Module({
  imports: [DbModule, UserModule, ProposalModule, PatentModule, ProductModule, TechnologyModule, ProductPatentModule, ProductProposalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
