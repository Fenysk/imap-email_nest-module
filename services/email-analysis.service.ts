import { Injectable } from '@nestjs/common';
import { simpleParser } from 'mailparser';

@Injectable()
export class EmailAnalysisService {

    async parseEmail(_email: string): Promise<any> {
        return new Promise((resolve, reject) => {
            simpleParser(_email, (error: any, parsedEmail: any) => {
                if (error) return reject(error);

                const emailObject = {
                    from: parsedEmail.from.value[0].address,
                    to: parsedEmail.to.value[0].address,
                    subject: parsedEmail.subject,
                    text: parsedEmail.text,
                    html: parsedEmail.html,
                    date: parsedEmail.date
                };

                resolve(emailObject);
            });
        });
    }
}
