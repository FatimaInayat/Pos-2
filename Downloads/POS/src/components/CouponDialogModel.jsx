import React,{ useEffect ,useRef} from 'react';
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
import TextField from '@material-ui/core/TextField';
import axios from "axios";
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


export default function CouponDialogModel() {
  const [open, setOpen] = React.useState(true);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [percentage, setPercentage] = React.useState(null);
  const [amount, setAmount] = React.useState(null);
  const [reason, setReason] = React.useState(null);
  const [data, setData] = React.useState([]);
  const componentIsMounted = useRef(true)
  
  const handleClose = () => {
    setOpen(false);
  };
  
const handleChange = (event) => {
  
  if (event.target.name === 'percentage') {
      setPercentage(event.target.value);
  }
  else if(event.target.name === 'amount'){
    setAmount(event.target.value);
  }
  else if(event.target.name === 'reason'){
    setReason(event.target.value);
  
  }
}
const getCoupon = (index)  =>  {
  let newArr = [...data];
  newArr.map(el => {
    el.color = undefined;
    return el;
  })
  newArr[index]['color'] = "#cd450a";
  setData(newArr);
}
useEffect(async() => {

  let isMounted = true;
  const result =  await axios.get(
    'https://uat.dsmeglobal.com/api/Restaurant/GetCouponList',
  );
 if (isMounted) {
  setData(result.data.data);
 }
 return () => { isMounted = false };
  
},[]);

  return (
    <div>
      
     <Dialog 
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
         Discount
        </DialogTitle>
        <DialogContent dividers>
    
                    <Grid container style={{display:'flex',justifyContent:'center'}}>
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
                        
          <Grid container>
          <Grid item md={12}>
                        <TextField
                            label="Reason"
                            id="outlined-margin-normal"
                            margin="normal"
                            variant="outlined"
                            name='reason'
                            value={reason}
                            onChange={handleChange}
                            style={{ width: '98%'}}
                        />  
                    </Grid>
                 </Grid>
    </Grid>
    <Grid container spacing={1}>
     {data.map((item, index) => (
    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}  key={index}>
      <Paper  elevation={3}
            style={{
              backgroundColor: item.color === undefined ? "white":item.color,
              color: item.color === undefined ? "black" : "white",
              height: "4.5em",   
              margin: "0.5em 0.5em",
              paddingLeft: 5,
              paddingRight: 5,
              paddingTop:5,
              paddingBottom:5,
              display:'flex',
              justifyContent:'center',
              alignItems:'center'
      }}  
      onClick={() => getCoupon(index)}
      >      
       <Grid container >
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{display:'flex',justifyContent:'center'}}>
            <Typography>{item.purpose}</Typography>   
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{display:'flex',justifyContent:'center'}}>
            <Typography>{item.value+"%"}</Typography>  
         </Grid>
         </Grid>
      </Paper>
     
     </Grid>
  ))} 
      </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
