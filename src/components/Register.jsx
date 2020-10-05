import React, {Component} from 'react';
import {Button, Grid, Container, Paper, TextField, Typography } from '@material-ui/core';

const classes = {

    
    Heading:{
        fontWeight: '900',
        fontSize:'2em'

      },
    Title:{
      color: 'gray',
      fontSize: '0.8em' 
    },
    paper:{
        width: '100%',
        padding: '2em'
    },
    Fields:{
        width: '100%'
    },
    buttonLogin:{
        width: '100%',
        backgroundColor: '#2EAEE5',
        marginTop: '2em'

    },
    gridTitle:{
        paddingBottom: '2em'
    },
    ForgetText:{
        marginTop: '1em'
    }
    
     
      
  
  }
class Register extends Component
{

    render()
    {
        return(
            <Container maxWidth="sm">
                
                <Grid container>
                <Paper style={classes.paper}>
                    <Grid item md={12} style={classes.gridTitle}>
                        <Typography style={classes.Heading}>
                            Register
                        </Typography>
                        <Typography style={classes.Title}>
                            Enter your detail to create a new account
                        </Typography>
                    </Grid>

                    <Grid item md={12}>
                        <TextField
                            label="User Name"
                            id="outlined-margin-normal"
                            margin="normal"
                            variant="outlined"
                            style={classes.Fields}
                        />
                    </Grid>
                    
                    <Grid item md={12}>
                        <TextField
                            label="Email"
                            id="outlined-margin-normal"
                            margin="normal"
                            variant="outlined"
                            style={classes.Fields}

                        />
                    </Grid>
                    
                    <Grid item md={12}>
                        <TextField
                            label="Password"
                            id="outlined-margin-normal"
                            margin="normal"
                            variant="outlined"
                            style={classes.Fields}

                        />
                    </Grid>
                    
                    <Grid item md={12}>
                        <TextField
                            label="Confirm Password"
                            id="outlined-margin-normal"
                            margin="normal"
                            variant="outlined"
                            style={classes.Fields}

                        />
                    </Grid>

                    <Grid item md={12} style={classes.gridTitle}>
                        <Button style={classes.buttonLogin} variant="contained" color="primary" component="span">Register</Button>
                        
                        <Typography  style={classes.ForgetText}>
                            Already have an account? Login
                        </Typography>

                    </Grid>
                    
                    </Paper>
                </Grid>
             
            </Container>
        );
        
    }

}

export default Register;