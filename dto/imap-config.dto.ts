export default interface ImapConfigDto {
    readonly user: string;
    readonly password: string;
    readonly host: string;
    readonly port: number;
    readonly tls: boolean;
}