import { Controller, Get } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('mail')
export class EmailController {

    constructor(private readonly mailService: EmailService) { }

    @Get('last')
    async getLastEmail(): Promise<object> {
        const emailObject = await this.mailService.getLastEmail();
        return emailObject;
    }
}