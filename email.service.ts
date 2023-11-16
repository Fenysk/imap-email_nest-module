import { Injectable } from '@nestjs/common';
import { EmailRetrievalService } from './services/email-retrieval.service';
import { EmailAnalysisService } from './services/email-analysis.service';
import { ImapConnectionService } from './services/imap-connection.service';

@Injectable()
export class EmailService {

    constructor(
        private readonly emailRetrievalService: EmailRetrievalService,
        private readonly emailAnalysisService: EmailAnalysisService,
        private readonly imapConnectionService: ImapConnectionService,
    ) { }

    async getLastEmail(): Promise<object> {

        const config = {
            user: 'user',
            password: 'password',
            host: 'host',
            port: 993, // port
            tls: true // tls
        }

        try {
            const imap = await this.imapConnectionService.connect(config);
            const lastEmail = await this.emailRetrievalService.getLastEmail(imap);
            await this.imapConnectionService.disconnect(imap);
            const emailObject = await this.emailAnalysisService.parseEmail(lastEmail);

            return emailObject;
        } catch (error) {
            throw error.message;
        }
    }
}