import React, {useEffect, useState} from "react";
import {Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

const soundMap = {
    'vizg_svini': new Audio('/free/resources/vizg_svini.mp3'),
    'annoying_alarm': new Audio('/free/resources/annoying_alarm.mp3'),
    'desk_bells': new Audio('/free/resources/desk_bells.mp3'),
    'fire_pager': new Audio('/free/resources/fire_pager.mp3'),
    'woop_woop': new Audio('/free/resources/woop_woop.mp3')
}

function playSound(audio: HTMLAudioElement) {
    let promise = audio.play();
    if (promise !== undefined) {
        promise.then(() => {
            console.log('Play sound')
            // Autoplay started
        }).catch(error => {
            console.log('Play sound error', error.message)
        })
    }
}

function AppBar(props: { url: string, ring: boolean | undefined }) {
    const [sound, setSound] = useState<string>(window.localStorage.getItem("alarmSound") ?? Object.keys(soundMap)[0])
    const [muted, setMuted] = useState<boolean>(false)

    useEffect(() => {
        if (props.ring) playSound(soundMap[sound as keyof typeof soundMap])
    }, [props.ring, sound])

    const handleSoundSelectChange = (event: SelectChangeEvent) => {
        setSound(event.target.value)
        window.localStorage.setItem("alarmSound", event.target.value)
    }

    const handlePlaySound = () => {
        playSound(soundMap[sound as keyof typeof soundMap])
    }

    const handleMuteSound = () => {
        setMuted(!muted)
        Object.values(soundMap).forEach(sound => sound.muted = muted)
    }

    const handleOpenCross = () => {
        if (props.url !== "") window.open(props.url)
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            style={{margin: "8px", width: "90%"}}
        >
            <div>
                <FormControl sx={{width: "fit-content", minWidth: "220px"}}>
                    <InputLabel id="demo-simple-select-label">Выберите звук предупреждения</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        value={sound}
                        label="Выберите звук предупреждения"
                        onChange={handleSoundSelectChange}
                    >
                        {Object.keys(soundMap).map((sound, i) => <MenuItem value={sound}
                                                                           key={i}>Звук {i + 1}</MenuItem>)}
                    </Select>
                </FormControl>
                <Button variant="outlined" onClick={handlePlaySound} style={{marginLeft: "20px", marginTop: "10px"}}>
                    Прослушать
                </Button>
            </div>
            <Button variant="outlined" onClick={handleMuteSound}>
                {muted ? "Включить" : "Выключить"} звук
            </Button>
            <Button variant="outlined" onClick={handleOpenCross}>
                Открыть перекрёсток
            </Button>
        </Grid>
    )
}

export default AppBar;