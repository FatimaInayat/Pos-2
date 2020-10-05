import React, {Component} from 'react';
import { Button, Grid, Container, Paper, TextField, Typography } from '@material-ui/core';
import axios from "axios";
import _ from 'lodash';

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
        padding: '2em',
        marginTop:20
    },
    Fields:{
        width: '100%'
    },
    buttonLogin:{
        width: '100%',
        backgroundColor: '#51bf76',
        marginTop: '2em',
        height: '3.5em'

    },
    gridTitle:{
        paddingBottom: '2em'

    },
    ForgetText:{
        marginTop: '1em'
    }
    
  }
 
class Login extends Component{
constructor(props) {
    super(props);
    this.state = {
      data: [],
      phoneError:'',
      passwordError:'',
      error:''

    }
    this.handleChange = this.handleChange.bind(this);
}
validate(phone, password) {

    if (phone === "" || phone === null || phone === undefined) {
        this.setState({
            phoneError: "Phone is required"
        })
        return false;
    }
    if (phone.length !== 11) {
        this.setState({
            phoneError: "Please enter 11 digit phone number"
        })
        return false;
    }

    if (password === "" || password === null || password === undefined) {
        this.setState({
            passwordError: "password is required"
        })
        return false;
    }
    return true;
}
async onLogin() {
    this.props.history.push('/Home');
    let phone = this.state.phone;
    let password = this.state.password;

    const isValid = this.validate(phone, password);
    if (isValid) {
    let LoginRequestObject = {
        phoneno:  "03007237999",
        password: "startapp123"
    }
    const res = await axios({
        method: 'post',
        url: 'https://uat.dsmeglobal.com/api/Account/Login',
        headers: { 
            'Content-Type' : 'application/json' 
        },
        data: LoginRequestObject
    });
    let result = res.data;
    let array = result.data.map(a => a.Id);

    if (result !== undefined) {
        localStorage.setItem("userId",array);
        let resultData = _.get(result, 'error_code');
        let resultDataMessage = _.get(result, 'error_message');
        console.log(resultDataMessage)
        if (resultData === "0") {
            this.props.history.push('/Home');
        }
        else{
            this.setState({
                error: "Validation error"
            })
        }
    }
    console.log("error login failed !!!");
}
}
handleChange(event) {

    if (event.target.name === 'phone') {
        this.setState({ phone: event.target.value });
    }
    else {
        this.setState({ password: event.target.value });
    }
}
    render()
    {
        return(
            <Container maxWidth="sm">
                
                <Grid container>
                <Paper style={classes.paper}>
                    <Grid item md={12} style={classes.gridTitle}>
                    {this.state.error ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.error}</div> : null}
                        <Typography style={classes.Heading}>
                            Login
                        </Typography>
                        <Typography style={classes.Title}>
                            Enter email and password to continue
                        </Typography>
                    </Grid>
                    {this.state.error ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.error}</div> : null}
                    <Grid item md={12}>
                        <TextField
                            label="Phone Number"
                            id="outlined-margin-normal"
                            margin="normal"
                            variant="outlined"
                            type="number"
                            name='phone'
                            value={this.state.phone}
                            onChange={this.handleChange}
                            style={classes.Fields}
                        />
                         {this.state.phoneError ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.phoneError}</div> : null}
                    </Grid>
                    
                    <Grid item md={12}>
                        <TextField
                            label="Password"
                            id="outlined-margin-normal"
                            margin="normal"
                            variant="outlined"
                            type="password"
                            name='password'
                            value={this.state.password}
                            onChange={this.handleChange}
                            style={classes.Fields}

                        />
                           {this.state.passwordError ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.passwordError}</div> : null}
                    </Grid>

                    <Grid item md={12} style={classes.gridTitle}>
                        <Button style={classes.buttonLogin} variant="contained" color="primary" component="span"  
                        
                        onClick={() => {
                      this.onLogin();
                    }}>Login</Button>
{/*                         
                        <Typography  style={classes.ForgetText}>
                            Forget your password ?
                        </Typography> */}

                    </Grid>

                    {/* <Grid item md={12} style={classes.gridTitle}>
                        <Typography  style={classes.Title}>
                            Don't you have an account? Register
                        </Typography>

                    </Grid> */}
                    </Paper>
                </Grid>
             
            </Container>
        );
        
    }

}

export default Login;