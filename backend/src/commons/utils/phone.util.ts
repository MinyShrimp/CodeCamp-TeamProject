import coolsms from 'coolsms-node-sdk';

interface SMSResult {
    isOK: boolean;
    token: string;
}

export class PhoneUtil {
    private constructor() {}

    private static getRandomInteger(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    private static getRandomToken() {
        const digit = 6;
        return String(this.getRandomInteger(0, 10 ** digit)).padStart(
            digit,
            '0',
        );
    }

    static async sendSMS(
        phone: string, //
    ): Promise<SMSResult> {
        const msgService = new coolsms(
            process.env.SMS_KEY,
            process.env.SMS_SECRET,
        );

        const token = this.getRandomToken();
        try {
            if (process.env.MODE === 'LOCAL') {
                return {
                    isOK: true,
                    token: token,
                };
            } else {
                const res = await msgService.sendOne({
                    to: phone,
                    from: process.env.SMS_SENDER,
                    text: `[${process.env.PROJECT_NAME}] 인증번호 : ${token}`,
                    autoTypeDetect: true,
                });
                return {
                    isOK: res.statusCode === '2000',
                    token: token,
                };
            }
        } catch (e) {
            return {
                isOK: false,
                token: e.message,
            };
        }
    }
}
