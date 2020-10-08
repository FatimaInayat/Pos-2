import React,{ useEffect ,useRef, Fragment} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";

const classes = {
    Tabs: {
     
      marginTop: 10,   
    },
    Dialog: {
        width: "90%",

    },
    dialogCustomizedWidth: {
        'max-width': '80%'
      }
}
const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      maxWidth: '40em',
    },
  });
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


export default function SurchargeDialogModel() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChangeTabs = (event, newValue) => {
      setValue(newValue);
    };
  const [open, setOpen] = React.useState(true);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [percentage, setPercentage] = React.useState(null);
  const [amount, setAmount] = React.useState(null);
  const [None, setNone] = React.useState(true);
  const [Default, setDefault] = React.useState(false);
  const [SChargesAndGst, setSChargesAndGst] = React.useState(false);

  const handleClose = () => {
    setOpen(false)
  };
 
  const ByDefault = () => {
    setSChargesAndGst(true)
    setDefault(false)
  };
  const ShowNone = () => {
    setNone(false);
    setDefault(false);
    setSChargesAndGst(false)

  };
  const SCharges = () => {
 
    setDefault(true);
    setSChargesAndGst(false)
  };

  
const handleChange = (event) => {
  
  if (event.target.name === 'percentage') {
      setPercentage(event.target.value);
  }
  else if(event.target.name === 'amount'){
    setAmount(event.target.value);
  }
}


  return (
    <div>

      
     <Dialog 
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} >
      
        <DialogTitle style= {{backgroundColor:'#cd450b',color:'white'}} id="customized-dialog-title" onClose={handleClose}>
         Surcharge
        </DialogTitle>
        <DialogContent dividers>
        <Paper square className={classes.root}>
      <Tabs 
        className={classes.Tabs}
        value={value}
        onChange={handleChangeTabs}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example" >
        <Tab label="None" onClick={ShowNone} />
        <Tab label="Default" onClick={ByDefault}/>
        <Tab label="S.Charges" onClick={SCharges}/>
       <Tab label="GST" onClick={SCharges}/>
      </Tabs>
    </Paper>
  
    
                    <Grid  container style={{display:'flex',justifyContent:'center'}}>
                    {
                      Default && 
                      <Fragment Default={Default}>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
                          <TextField
                              label="Percentage"
                              id="outlined-margin-normal"
                              margin="normal"
                              variant="outlined"
                              type="number"
                              name='percentage'
                              value={percentage}
                              onChange={handleChange}
                              style={{ width: '98%'}}
                          
                          />
                          </Grid>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
                          <TextField
                              label="Amount"
                              id="outlined-margin-normal"
                              margin="normal"
                              variant="outlined"
                              name='amount'
                              value={amount}
                              onChange={handleChange}
                              style={{ width: '96%'}}
                          />
                          
                          </Grid>
                          </Fragment>
                    }
                    {
                   SChargesAndGst && 
           
                    <Fragment SChargesAndGst={SChargesAndGst}>
                         <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                         <Paper square className={classes.root}>
                        <Tabs 
                            className={classes.Tabs}
                            value={value}
                            onChange={handleChangeTabs}
                            variant="fullWidth"
                            indicatorColor="secondary"
                            textColor="secondary"
                            aria-label="icon label tabs example">
                            <Tab label="16%" />
                            <Tab label="5%" />
                            
                        </Tabs>
                        </Paper>
                        </Grid>
                    </Fragment>
                  

                    }
       
    </Grid>
  
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} style={{color:'#cd450b'}}>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
