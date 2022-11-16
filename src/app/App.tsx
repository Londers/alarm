import React, {useEffect, useState} from 'react';
import './App.sass';
import AppBar from "../features/AppBar";
import AlertTable from "../features/AlertTable";
import {Alarm, AlarmMessage} from "../common";

function App() {
    const [alarm, setAlarm] = useState<Alarm>()
    const [url, setUrl] = useState("")

    useEffect(() => {
        const ws = new WebSocket("wss://192.168.115.134:4443/user/Admin/alarmW?Region=1&Area=1&Area=2&Area=3")

        ws.onopen = () => console.log("opened")
        ws.onerror = (e) => console.log("error", e)
        ws.onclose = (e) => console.log("closed", e)
        ws.onmessage = (e) => {
            const data: AlarmMessage = JSON.parse(e.data)
            if (data.type === "alarm") {
                setAlarm(data.data.alarm)
            } else if (data.type === "close") {
                window.close()
            }
        }
    }, [])

    return (
        <>
            <div style={{width: "100%"}}>
                <AppBar url={url} ring={alarm?.ring}/>
            </div>
            {alarm && <AlertTable alarm={alarm} setUrl={setUrl}/>}
        </>
    )
}

export default App;
