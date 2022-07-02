import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { padding } from '../../functions/functions';
import { Timer } from './style';

export function TimerComponent(props: {
    isStart: boolean;
    isSend: boolean;
    isAuthOK: boolean;
    setIsSend: Dispatch<SetStateAction<boolean>>;
    callBack: () => void;
}) {
    const maxTimer = 120;
    const intervalID = useRef<NodeJS.Timer | null>(null);
    const timer = useRef<number>(maxTimer);

    const getMin = () => {
        return padding(Math.floor(timer.current / 60), 2);
    };
    const getSec = () => {
        return padding(timer.current % 60, 2);
    };
    const [min, setMin] = useState<string>(getMin());
    const [sec, setSec] = useState<string>(getSec());

    useEffect(() => {
        if (props.isSend) {
            timer.current = maxTimer;
            if (intervalID.current !== null) {
                clearInterval(intervalID.current);
                setMin(getMin());
                setSec(getSec());
            }
            intervalID.current = setInterval(() => {
                timer.current -= 1;
                setMin(getMin());
                setSec(getSec());
            }, 1000);
        }
        return () => clearInterval(intervalID.current as NodeJS.Timer);
    }, [props.isStart]);

    useEffect(() => {
        if (timer.current <= 0) {
            props.setIsSend(false);
            clearInterval(intervalID.current as NodeJS.Timer);
        }
    }, [sec]);

    useEffect(() => {
        if (props.isAuthOK) {
            clearInterval(intervalID.current as NodeJS.Timer);
        }
    }, [props.isAuthOK]);

    return (
        <Timer
            style={{ color: !props.isAuthOK && props.isSend ? 'blue' : 'gray' }}
        >
            {min}:{sec}
        </Timer>
    );
}
