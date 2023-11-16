import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailRetrievalService } from './services/email-retrieval.service';
import { ImapConnectionService } from './services/imap-connection.service';
import { EmailAnalysisService } from './services/email-analysis.service';
import { EmailService } from './email.service';

@Module({
  providers: [
    EmailRetrievalService,
    EmailAnalysisService,
    ImapConnectionService,
    EmailService
  ],
  controllers: [EmailController],
})
export class EmailModule { }