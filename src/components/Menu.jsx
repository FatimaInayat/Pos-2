import React, { Component, Fragment } from "react";
import { Grid, Container, Paper, Typography, Box ,Button} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import styles from '../content/css/styles';
import _ from "lodash";
import LocalBarIcon from '@material-ui/icons/LocalBar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import LocalDiningIcon from '@material-ui/icons/LocalDining';
import CancelDialog from './CancelDialogeModel';
const classes = {
  ContainerWidth: {
    width: "100%",
    marginTop: 70,
  },
};

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editableColor: "green",
      menuList: [],
      cartItem: [],
      totalAmount: null,
      addItem: [],
      color:false,
      categoryList:[],
      categoryColor:false,
      categoryListById:[],
      orderStatus:[],
      paymentOrder:[],
      showDialog:false,
      allCategoryColor:false,
      showCancelDialog:false,
      showDetail:false,
      placeOrder:false
    
    };
  }


  componentDidMount() {

    axios.get('https://uat.dsmeglobal.com/api/Restaurant/GetFoodItemList')
    .then(res => {
      const  menuList = res.data.data;
      this.setState({ menuList });
    })
  
    axios.get('https://uat.dsmeglobal.com/api/Restaurant/GetFoodCategoryList')
    .then(res => {
      const  categoryList = res.data.data;
      this.setState({ categoryList });
    })
    axios.get('https://uat.dsmeglobal.com/api/Restaurant/OrderStatus')
    .then(res => {
      const  orderStatus = res.data.data;
      this.setState({ orderStatus });
    })

  }
  AddItem(id,item) {
     item["color"] = "#cd450a";
    if (this.state.cartItem.length === 0) {
      item["qty"] = 1;
      this.state.addItem.push(item);
    } else {
      if (this.state.cartItem.find((item) => item.Id === id)) {
        item.qty = parseInt(item.qty) + 1;
      } else {
        item["qty"] = 1;
        this.state.addItem.push(item);
      }
    }
    var total = this.state.totalAmount + parseInt(item.sale_price);
    this.setState({
      totalAmount: total,
      cartItem: this.state.addItem,
    });
  }
  SubtractItem(id, item) {
    item.qty = parseInt(item.qty) - 1;

    if (item.qty === 0) {
      item["color"] = undefined;
      let cartList = this.state.cartItem;
      let index = cartList.indexOf(item);
      cartList.splice(index, 1);
      this.setState({ cartItem: cartList });
    }

    var total = this.state.totalAmount - parseInt(item.sale_price);
    this.setState({
      totalAmount: total,
    });
  }

  CloseItem(id, item) {
    var lst = this.state.menuList;
    lst.find((item) => item.Id === id).colour = "white";
    let cartList = this.state.cartItem;
    let index = cartList.indexOf(item);
    cartList.splice(index, 1);
    this.setState({ cartItem: cartList });
    var total = this.state.totalAmount - parseInt(item.sale_price);
    this.setState({
      totalAmount: total,
    });
  }

  CategoryItem() {
    this.setState({
      categoryColor:true,
      menuList:this.state.categoryList

    })
  }
  setAllColor(){
    this.setState({allCategoryColor:true})
    this.state.categoryList.map(el => {
      el.color = undefined;
      return el;
    })
    this.setState({
      allCategoryColor:false
    })
    axios.get('https://uat.dsmeglobal.com/api/Restaurant/GetFoodItemList')
    .then(res => {
      const  menuList = res.data.data;
      this.setState({ menuList });
    })
   
  }
  SwitchFoodCategory(Id, item){
    this.setState({allCategoryColor:true})
    this.state.categoryList.map(el => {
      el.color = undefined;
      return el;
    })
    item["color"] = "#cd450a";
    axios.get('https://uat.dsmeglobal.com/api/Restaurant/GetFoodItemByCategoryId?categoryId='+Id)
    .then(res => {
      const  categoryListById = res.data.data;
      this.setState({ menuList : categoryListById  });
    })
  }

  EditOrder(){
    this.setState({showDetail:true,
      placeOrder:true
    })
    var gst = (16 / 100) * this.state.totalAmount;
    let orderId = localStorage.getItem("orderId");
    let EditOrderRequestObj;  
    EditOrderRequestObj = Object.assign({ 
    "Id": orderId.toString(),
    "address_id": 0,
    "customer_id": 0,
    "delivery_amount": 0,
    "discount_amount": 0,
    "food_item_list": this.state.cartItem,
    "g_s_t": gst,
    "no_of_persons": localStorage.getItem("persons").toString(),
    "order_status": "1",
    "order_type": 0,
    "rider_id": 0,
    "service_tax": 0,
    "tableId": this.props.match.params.Id.toString(),
    "total_amount": this.state.totalAmount,
   // "userid": localStorage.getItem("userId").toString()
  }, EditOrderRequestObj);
  axios.post('https://uat.dsmeglobal.com/api/Restaurant/SaveOrder',EditOrderRequestObj)
  .then(res => {
    const  result = res.data;
    if (result !== undefined) {
      let resultData = _.get(result, 'error_code');
      let resultDataMessage = _.get(result, 'error_message');
      console.log(resultDataMessage)
      if (resultData === "0") {
         // this.props.history.push('/PaySuccessful');
      }
      else{
         alert("error while payment");
      }
  }
  })

  }
  SaveOrder(){
 
    this.setState({showDetail:true,
      placeOrder:true
    })
    let SaveOrderRequestObj;  
    SaveOrderRequestObj = Object.assign({ 
        "address_id": 0,
        "customer_id": 0,
        "delivery_amount": 0,
        "discount_amount": 0,
        "food_item_list":this.state.cartItem,
        "g_s_t": parseFloat(localStorage.getItem("gst")),
        "no_of_persons": localStorage.getItem("persons").toString(),
        "order_status": "1",
        "order_type": 0,
        "rider_id": 0,
        "service_tax": 0,
        "tableId": this.props.match.params.Id.toString(),
        "total_amount": this.state.totalAmount,
        "userid": localStorage.getItem("userId").toString()
      
     }, SaveOrderRequestObj);
    axios.post('https://uat.dsmeglobal.com/api/Restaurant/SaveOrder',SaveOrderRequestObj)
    .then(res => {
      const  result = res.data;
      if (result !== undefined) {
        let resultData = _.get(result, 'error_code');
        let resultDataMessage = _.get(result, 'error_message');
        console.log(resultDataMessage)
        if (resultData === "0") {
          
        }
        else{
           alert("error while payment");
        }
    }
    })
}
  handleDialogOpen(){
    this.setState({showDialog:true})
  }
  showCancelDialog(){
    this.setState({showCancelDialog:true})
  }
  render() {

    let tableStatus;
    if(tableStatus !== undefined){
      tableStatus = this.props.location.state.tableStatus;
    }
    
    return (
      <Container maxWidth="xl">
        <Grid container spacing ={1}>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography style={styles.categoryTypography}>Category</Typography>
          </Grid>
          </Grid>
          <Grid container style={{borderTop:"3px solid #cd450a" ,maxHeight:'35em',minHeight:'17em', overflowY: 'scroll'}}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
 
    >
    <ListItem button style={{
          backgroundColor: this.state.allCategoryColor === false?'#cd450a':'white',
          color:this.state.allCategoryColor === false?'white':'black',
      }}>
        <ListItemIcon style={{color:this.state.allCategoryColor === false?'white':'black',}} >
          <LocalDiningIcon />
        </ListItemIcon >
        <ListItemText primary='All'  onClick={() => {
                      this.setAllColor();
                    }}>
        </ListItemText>
        </ListItem>
      {this.state.categoryList.map((item, i) => (
      <ListItem button style={{
        backgroundColor: item.color === undefined ? "white":item.color,
        color: item.color === undefined ? "black" : "white",
        }}>
        <ListItemIcon
          style={{color: item.color === undefined ? "black" : "white"}}
         >
          <LocalDiningIcon />
        </ListItemIcon >
        <ListItemText primary={item.name}  
         onClick={() => {
                      this.SwitchFoodCategory(item.Id, item);
                    }} />
      </ListItem>
  ))}
    </List>
            </Grid>
            </Grid>        
        </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Grid container >
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography style={styles.menuTypography}>Menu</Typography>
            </Grid>
            </Grid>
            <Grid container spacing ={1} style={{borderTop:"3px solid #cd450a",marginLeft:3,maxHeight:'35em',minHeight:'17em', overflowY: 'scroll'}}>
              {this.state.menuList.map((item, i) => (
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Paper
                    elevation={3}
                    style={{
                      backgroundColor: item.color === undefined ? "white":item.color,
                      color: item.color === undefined ? "black" : "white",
                      height: "6.5em",
                      margin: "0.5em 0.5em",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingLeft: 5,
                      paddingRight: 5,
                      paddingTop:5,
                      paddingBottom:5
                    }}
                    onClick={() => {
                      this.AddItem(item.Id, item);
                    }}>
                    <Grid container>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Typography style={{}}>{item.name}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Typography >{"Rs." + item.sale_price }</Typography>
                      </Grid>       
                                   
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{marginTop:5}} >
                        <Typography style={{marginLeft: 9,fontSize: 14,float:'left'}}>{item.color === undefined?"":"x"+item.qty}</Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ))} 
            </Grid>
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
          <Grid container >
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{}}>
                <Typography style = {styles.cartTypography}>Cart</Typography>
            </Grid>
            </Grid>
            <Grid container style={{borderTop: "3px solid #cd450a",marginLeft:16,maxHeight:'22em',minHeight:'22em', overflowY: 'scroll'}}>
              {this.state.cartItem.length > 0 ? (
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                  {this.state.cartItem.map((item, i) => (               
                      <Paper
                        elevation={3}
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          width: "25em",
                          height: "3.5em",
                          margin: "0.5em 0.5em",
                          display: "flex",
                          alignItems: 'center',
                          justifyContent:"center"
                        }}>        
                            <Grid container style={{display: 'flex',alignIems: 'center'}}>
                              <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{display: 'flex',alignIems: 'center'}}>
                                <Typography style={{ display: 'flex',justifyContent: 'start',color:'#7d7d7d',marginLeft:15}}>{item.name}</Typography>             
                              </Grid>
                              <Grid item xs={8} sm={8} md={8} lg={8} xl={8} style={{ display: 'flex',alignItems:"center"}} >
                                <Grid container >
                                  <Grid item xs={1} sm={1} md={1} lg={1} xl={1} style={{marginLeft:'20%'}}>
                                    <RemoveIcon
                                      style={{
                                        color: "white",
                                        backgroundColor: "#51bf76",
                                      }}
                                      onClick={() => {
                                        this.SubtractItem(item.id, item);
                                      }}
                                    />
                                  </Grid>                                
                                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                    <Typography style={{color:'#7d7d7d'}}>
                                      {"Rs." +
                                       item.sale_price+
                                        " " +
                                        "| " +
                                        " " +
                                        item.qty +
                                        ".00"}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                                    <AddIcon
                                      style={{
                                        color: "white",
                                        backgroundColor: "#cd450a",
                                      }}
                                      onClick={() => {
                                        this.AddItem(item.Id,item);
                                      }}
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>                       
                        </Grid>             
                      </Paper>          
                  ))}
                </Grid>
              ) : (
                <Fragment></Fragment>
              )}
            </Grid>         
              <Fragment> 
              <Grid container>
                  <Grid item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    style={{
                      marginTop:'5%'            
                    }}>
                    <Typography  style={{ fontSize: 15,color:'#7d7d7d', float:'left',marginLeft:'6%'}}>
                     Quantity
                    </Typography>
                    <Typography style={{ fontSize: 15, color:'#7d7d7d',float:'right',marginRight:'6%'}}>
                       {this.state.cartItem.length}.00
                    </Typography>
                  </Grid>              
                </Grid>
                 <Grid container >
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}>
                    <Typography style={{ fontSize: 20,  fontWeight:'bold', float:'left',marginLeft:'6%'}}>
                      Total Price
                    </Typography>
                     <Typography style={{ fontSize: 20,  fontWeight:'bold', float:'right',marginRight:'6%'}}>
                      Rs. {this.state.totalAmount}.00
                    </Typography>
                  </Grid>          
                </Grid> 
                
                {this.state.placeOrder === true?
                <Fragment>
               {this.state.showDetail === true?
                 <Grid container style={{marginLeft:'18px',marginTop:10}} >
                 <Grid
                   item
                   xs={4}
                   sm={4}
                   md={4}
                   lg={4}
                   xl={4}>
                    <Button variant="contained"  size='medium' style={{
                       backgroundColor: "#e7726a",
                       fontSize: 14,
                       width: '9em',
                       height: '3em',
                       fontWeight:'bold',  
                       color: "white"}} 
                       onClick={() => {
                           this.showCancelDialog();
                       }}>
                         CANCEL 
                   </Button>  
                   {this.state.showCancelDialog === true?
                  <CancelDialog state={this.state.cartItem}/>
                  :
                  ""
                  } 
                 </Grid>
                 <Grid
                   item
                   xs={4}
                   sm={4}
                   md={4}
                   lg={4}
                   xl={4}>
                    <Button variant="contained"  size='large' style={{
                       backgroundColor: "#85929d",
                       fontSize: 14,
                       width: '9em',
                       height: '3em',
                       fontWeight:'bold',   
                       color: "white"}} >
                        PRINT
                   </Button>    
                    
                 </Grid>
                 <Grid
                   item
                   xs={4}
                   sm={4}
                   md={4}
                   lg={4}
                   xl={4}>
                    <Button variant="contained"  size='medium' style={{
                       backgroundColor: "#51bf76",
                       fontSize: 14,
                       width: '9em',
                       height: '3em',
                       fontWeight:'bold', 
                       color: "white"}} 
                       // onClick={() => {
                       //   this.PaymentOrder();
                       // }}
                       >
                        PAYMENT
                   </Button> 
                 </Grid>
                 </Grid>
                 
                 :
                 ""
  }
  </Fragment>
             :
            
        
             <Fragment>
                 {tableStatus === 'free'?
                <Grid container style={{marginLeft:'18px',marginTop:10}} >
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}>
                     <Button variant="contained"  size='medium' style={{
                        backgroundColor: "#51bf76",
                        fontSize: 14,
                        width: '28em',
                        height: '3em',
                        fontWeight:'bold',  
                        color: "white"}}  onClick={() => {
                          this.SaveOrder();
                        }}>
                          PLACE ORDER
                    </Button>             
                  </Grid>
                  </Grid>
                  :
                  <Grid container style={{marginLeft:'18px',marginTop:10}} >
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}>
                     <Button variant="contained"  size='medium' style={{
                        backgroundColor: "#51bf76",
                        fontSize: 14,
                        width: '28em',
                        height: '3em',
                        fontWeight:'bold',  
                        color: "white"}}  onClick={() => {
                          this.EditOrder();
                        }}>
                          PLACE ORDER
                    </Button>             
                  </Grid>
                  </Grid>
         
  }
 
  </Fragment>
  }
              </Fragment>  
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default Menu;
