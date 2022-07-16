import * as nm from 'nodemailer';
import { UserEntity } from '../../apis/user/entities/user.entity';

export class EmailUtil {
    private constructor() {}

    private static getWelcomeTemplate = (user: UserEntity) => {
        return `
        <html lang="ko">
            <head>
            </head>
            <body>
                <div>
                    <h3> ${user.name}님 가입을 환영합니다 </h3>
                </div>
            </body>
        </html>
        `;
    };

    private static sendEmail = async (props: {
        email: string;
        subject: string;
        html: string;
    }) => {
        try {
            const transporter = nm.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const result = await transporter.sendMail({
                from: process.env.EMAIL_SENDER,
                to: props.email,
                subject: props.subject,
                html: props.html,
            });

            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    };

    static sendWelcomeEmail = async (
        user: UserEntity, //
    ) => {
        return await this.sendEmail({
            email: user.email,
            subject: `[${process.env.PROJECT_NAME}] 가입을 환영합니다.`,
            html: this.getWelcomeTemplate(user),
        });
    };

    static sendAuthEmail = async (
        email: string, //
        token: string,
    ) => {
        return await this.sendEmail({
            email: email,
            subject: `[${process.env.PROJECT_NAME}] 인증 메일`,
            html: `링크 : ${process.env.FE_URL}/auth/email?token=${token}`,
        });
    };
}
