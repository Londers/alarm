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
    },{
        field: "area",
        headerName: "Район",
        flex: 0.3,
    }, {
        field: "id",
        headerName: "ID",
        flex: 0.3,
    }, {
        field: "idevice",
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
        flex: 1,
    },
]

function AlertTable(props: { alarm: Alarm, setUrl: Function}) {
    const [selected, setSelected] = useState<number[]>([])

    const rows = props.alarm.CrossInfo.map(al => {
        return {...al, time: new Date(al.time).toLocaleString('ru-RU', {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone})}
    })

    return (
        <div style={{height: "60vh", width: "100%"}}>
            <ThemeProvider theme={theme}>
                <DataGrid
                    // components={{
                    //     Toolbar: CustomTableToolbar,
                    // }}
                    rows={rows}
                    columns={columns}
                    checkboxSelection={true}
                    onSelectionModelChange={(newSelectionModel) => {
                        // setSelected([Number(newSelectionModel)])
                        console.log([Number(newSelectionModel)])
                    }}
                    selectionModel={selected}
                    hideFooter
                    // componentsProps={{
                    //     toolbar: {
                    //         search: {
                    //             value: searchText,
                    //             onChange: (event: ChangeEvent<HTMLInputElement>) => requestSearch(event.target.value),
                    //             clearSearch: () => requestSearch(""),
                    //         },
                    //         filter: {
                    //             value: filter,
                    //             onChange: handleFilterChange,
                    //         }
                    //     },
                    // }}
                />
            </ThemeProvider>
        </div>
    )
}

export default AlertTable;