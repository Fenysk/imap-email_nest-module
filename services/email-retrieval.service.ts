import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailRetrievalService {
    async getLastEmail(_imapInstance: any): Promise<any> {
        return new Promise((resolve, reject) => {
            _imapInstance.openBox('INBOX', false, () => {
                _imapInstance.search(['1:*'], (error: any, results: []) => {
                    if (error) return reject(error);
                    if (results.length === 0) return resolve(null);

                    const lastEmailId = results[results.length - 1];
                    const lastEmail = _imapInstance.fetch(lastEmailId, { bodies: '' });
                    lastEmail.on('message', (msg: any) => {
                        msg.on('body', (email: any) => resolve(email));
                    });
                    lastEmail.once('error', (error: any) => reject(error));
                    lastEmail.once('end', () => resolve(null));
                });
            });
        });
    }
}