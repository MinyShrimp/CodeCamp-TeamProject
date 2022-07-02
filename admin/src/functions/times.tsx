import { padding } from './functions';

export function getDate(time: string): Date {
    const tmp = new Date(time);
    tmp.setHours(tmp.getHours() + 9);
    return tmp;
}

export function getDateFormatting(time: Date): string {
    const year = time.getFullYear();
    const month = padding(time.getMonth());
    const date = padding(time.getDate());
    const hour = padding(time.getHours());
    const minute = padding(time.getMinutes());
    const second = padding(time.getSeconds());
    const milisecond = padding(time.getMilliseconds(), 3);
    return `${year}-${month}-${date} ${hour}:${minute}:${second}.${milisecond}`;
}
