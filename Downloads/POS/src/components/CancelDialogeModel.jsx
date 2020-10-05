import React,{ useEffect ,useRef,Fragment} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import axios from "axios";
import _ from "lodash";
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


export default function CancelDialogModel(props) {

  const [open, setOpen] = React.useState(true);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [cartItem, setCartItem] = React.useState(props.state);
  const [checked, setChecked] = React.useState(true);
  const [cancelItem, setcancelItem] = React.useState([]);

  const ConfirmCancel = () => {
    let orderId = localStorage.getItem("orderId");
    let CancelOrderRequestObj;  
    CancelOrderRequestObj = Object.assign({ 
      "OrderId": orderId,
      "Isdelete": true,
      "IsFromCancelFlow": true,
      "food_item_list": cancelItem,
    }, CancelOrderRequestObj);
    axios.post('https://uat.dsmeglobal.com/api/Restaurant/DeleteOrder',CancelOrderRequestObj)
    .then(res => {
      const  result = res.data;
      if (result !== undefined) {
        let resultData = _.get(result, 'error_code');
        let resultDataMessage = _.get(result, 'error_message');
        console.log(resultDataMessage)
        if (resultData === "0") {
           
        }
        else{
           alert("error while canceling order");
        }
    }
    })
    
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
    
  };
  const handleClose= () => {
    setOpen(false)
    
  };
  const SelectCancelFoodItems = (item) => {
   
    let cancelItemsArray = [];
    cancelItemsArray.push(item);
  
  
  }
  return (
      
    <div>
     <Dialog 
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
         Cancel
        </DialogTitle>
        <DialogContent dividers>
        <Grid container style={{maxHeight:'35em',minHeight:'17em', overflowY: 'scroll'}}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            >
        {cartItem.map((item, i) => (
            <Fragment>
               <Grid container style = {{borderBottom:"1px solid lightgrey" }}>
               <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>

        <ListItem button >
            <ListItemText  primary={item.name}/>
        </ListItem>
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
        <Checkbox
      //  checked={checked}
        defaultChecked={false} 
        onChange={handleChange}
        inputProps={{ 'aria-label': 'secondary checkbox' }}
        onClick={SelectCancelFoodItems(item)}
      />
      </Grid>
      </Grid>
      </Fragment>  
  ))}
      </List>
    </Grid>
    </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            No
          </Button>
          <Button autoFocus onClick={ConfirmCancel} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
