import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import { Checkbox } from '@material-ui/core';

export default function EachAlreadyUploadedFile({_key, _file, _isSubmitted, _isChecked, _checkHandler}) {

    return (
        <Grid item xs={12} md={6} lg={3}  key={_key}>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia sx={{opacity: 1}} component="img" height="140" image={_file.url}  />
                {!_isSubmitted &&
                <CardActions sx={{ justifyContent: "space-between" }} >
                    <div><Checkbox onClick={()=>{_checkHandler(_file.file_id)}} checked={_isChecked} /><span>{_file.file_name.split(".")[0]} &nbsp;</span></div>
                </CardActions>
                }
            </Card>
        </Grid>
    )
}