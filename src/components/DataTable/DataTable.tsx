import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { useGetData } from '../../CustomHooks';
import { server_calls } from '../../api';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { WhiskeyForm } from '../WhiskeyForm';

const columns: GridColDef[] = [
    { field: 'whiskey_id', headerName: 'Whisey ID', width: 90, hide: true},
    { field: 'brand', headerName: 'Whiskey Brand', flex: 1 },
    { field: 'type', headerName: 'Whiskey Type', flex: 1 },
    { field: 'alc_percent', headerName: 'Alcohol Percent', flex: 1 },
];

interface gridData {
    data: {
        whiskey_id?: string
    }
}

export const DataTable = () => {
    let { whiskeyData, getData } = useGetData();
    let [ open, setOpen ] = useState(false);
    const [ selectionModel, setSelectionModel ] = useState<any> ([]);

    let handleOpen = () => {
        setOpen(true)
    };

    let handleClose = () => {
        setOpen(false)
    };

    let deleteData = () => {
        server_calls.delete(selectionModel);
        getData()
        setTimeout( () => {window.location.reload(); }, 1000)
    }

  return (
    <div style={{ height: 400, width: '100%' }}>
        <h1>Whiskies</h1>

        <DataGrid 
        rows={whiskeyData} 
        columns={ columns } 
        pageSize={ 5 } 
        checkboxSelection={true}
        onSelectionModelChange={ (item) => {
            setSelectionModel(item)
        }} />
        
        <Button onClick={handleOpen}>Update</Button>
        <Button variant='contained' color='secondary' onClick={deleteData}>Delete Whiskey</Button>

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update Whiskey{selectionModel}</DialogTitle>
            <DialogContent>
                <WhiskeyForm id={selectionModel!} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Nevermind</Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}
