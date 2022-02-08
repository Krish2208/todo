import { Card, CardContent, CardHeader, CssBaseline, Grid } from '@mui/material';
import React from 'react';

export default function Summary(props) {
    return <div>
        <Grid container component="main">
            <CssBaseline />
            <Grid item xs={12} sm={4} justifyItems='center' justifyContent='center'>
                <center>
                    <Card sx={{marginX:3, background: 'linear-gradient(135deg, rgba(99,213,255,1) 0%, rgba(0,110,147,1) 100%)', color:'white'}} elevation={6}>
                        <CardHeader title="Total Tasks"/>
                        <CardContent>
                            Hello
                        </CardContent>
                    </Card>
                </center>
            </Grid>
            <Grid item xs={12} sm={4}>
                <center>
                    <Card sx={{marginX:3, marginTop:`${props.ma}`,background: 'linear-gradient(135deg, rgba(75,255,33,1) 0%, rgba(9,93,41,1) 100%)', color:'white'}} elevation={6}>
                        <CardHeader title="Completed Tasks"/>
                        <CardContent>
                            Hello
                        </CardContent>
                    </Card>
                </center>
            </Grid>
            <Grid item xs={12} sm={4} justifyItems='center' justifyContent='center'>
                <center>
                    <Card sx={{marginX:3, marginTop: `${props.ma}`, background: 'linear-gradient(135deg, rgba(255,201,93,1) 0%, rgba(228,80,0,1) 100%)', color:'white'}} elevation={6}>
                        <CardHeader title="Pending Tasks"/>
                        <CardContent>
                            Hello
                        </CardContent>
                    </Card>
                </center>
            </Grid>
        </Grid>
    </div>;
}
