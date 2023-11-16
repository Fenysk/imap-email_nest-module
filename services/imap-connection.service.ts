import { Injectable } from '@nestjs/common';
import ImapConfigDto from '../dto/imap-config.dto';
const Imap = require('imap');

@Injectable()
export class ImapConnectionService {

    connect(_config: ImapConfigDto): Promise<any> {
        return new Promise((resolve, reject) => {
            const imapInstance = new Imap(_config);

            imapInstance.once('ready', () => resolve(imapInstance));
            imapInstance.once('error', (error: any) => reject(error));
            imapInstance.connect();
        });
    }

    disconnect(_imapInstance: any): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                resolve(_imapInstance.end());
            } catch (error) {
                reject(error);
            }
        });
    }
}