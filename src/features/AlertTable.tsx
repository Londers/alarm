import React, {useState} from "react";
import {Alarm} from "../common";
import {createTheme, ThemeProvider} from "@mui/material";
import {DataGrid, GridCellParams, GridColDef, ruRU} from "@mui/x-data-grid";


const theme = createTheme(
    {
        palette: {
            primary: {main: "#1976d2"},
        },
    },
    ruRU,
);

const columns: GridColDef[] = [
    {
        field: "region",
        headerName: "Регион",
        flex: 0.3,
    }, {
        field: "area",
        headerName: "Район",
        flex: 0.3,
    }, {
        field: "idd",
        headerName: "ID",
        flex: 0.3,
    }, {
        field: "id",
        headerName: "№ модема",
        flex: 0.3,
    }, {
        field: "describe",
        headerName: "Описание",
        flex: 1,
    }, {
        field: "status",
        headerName: "Статус",
        flex: 1,
    }, {
        field: "time",
        headerName: "Время",
        flex: 0.6,
    },
]

function AlertTable(props: { alarm: Alarm, setUrl: Function }) {
    const rows = props.alarm.CrossInfo.map(al => {
        return {
            ...al,
            idd: al.id,
            id: al.idevice,
            time: new Date(al.time).toLocaleString('ru-RU', {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone})
        }
    })

    return (
        <div style={{height: "80vh", width: "100%"}}>
            <ThemeProvider theme={theme}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    onSelectionModelChange={(newSelectionModel) => {
                        const device = props.alarm.CrossInfo.find(al => al.idevice === Number(newSelectionModel))
                        props.setUrl(
                            (window.location.origin + window.location.pathname)
                                .replace('alarm', 'cross') +
                            `?Region=${device?.region}&Area=${device?.area}&ID=${device?.id}`
                        )
                    }}
                    hideFooter
                />
            </ThemeProvider>
        </div>
    )
}

export default AlertTable;