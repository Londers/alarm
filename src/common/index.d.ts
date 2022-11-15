export interface AlarmMessage {
    type: string;
    data: Data;
}

export interface Data {
    alarm: Alarm;
}

export interface Alarm {
    ring: boolean;
    CrossInfo: CrossInfo[];
}

export interface CrossInfo {
    time: Date;
    region: number;
    area: number;
    id: number;
    subarea: number;
    idevice: number;
    describe: string;
    status: string;
    inputError: boolean;
}