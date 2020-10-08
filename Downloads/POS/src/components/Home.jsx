import React, { Component, Fragment } from "react";
import { Grid, Container, Paper, Typography, Button,Card,CardContent } from "@material-ui/core";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import axios from "axios";
import "react-simple-keyboard/build/css/index.css";
import Keyboard from "react-simple-keyboard";
import styles from '../content/css/styles';
import "../content/css/index.css";
import _ from "lodash";
import Dialog from './CouponDialogModel';
import SurchargeDialogModel from './SurchargeDialogModel';
import {CardMembership, Person,Schedule} from '@material-ui/icons';


const classes = {
  ContainerWidth: {
    width: "90%",
    marginTop: 10,
    
  },

  // PaperHeight:{
  //   height:'11.5em',
  //   margin: '1em',
  //   backgroundColor:this.state.bgColor
  // },
  PaperInnerBox: {
    padding: "8%",
  },
  PaperInnerBoxTitle: {
    paddingTop: "6%",
  },
  gridTitle: {
    margin: "35px 0px 15px 0px",
  },
  gridSocialIcons: {
    margin: "30px 0px 5px 0px",
  },
  titleHeading: {
    color: "#2EAEE5",
  },
  BoxIcons: {
    backgroundColor: "#F2FAFD",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
  },
  CategoryCircle: {
    borderRadius: "50%",
    width: "70px",
    height: "70px",
    backgroundColor: "#f0f9fc",
    margin: "2em",
  },
  CategoryCircleContent: {
    position: "relative",
    top: "20%",
    color: "#2EAEE5",
  },

  CategoryCircleContentArrow: {
    fontSize: 20,
    position: "relative",
    top: 4,
    color: "#2EAEE5",
  },
  SocialCircle: {
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    backgroundColor: "#2EAEE5",
  },
  SocialCircleContent: {
    position: "relative",
    top: "20%",
    color: "#2EAEE5",
  },
  AddToCartBtn: {
    margin: "auto",
    backgroundColor: "#5E8C2A",
    marginBottom: "10%",
    width: "60%",
    fontSize: "medium",
  },
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editableColor: "green",
      selected: false,
      tableList: [],
      payment:false,
      cash:false,
      fieldClicked: null,
      fieldMin: null,
      fieldMax: null,
      categoryList:[],
      showDialog:false,
      layoutName: "default",
      input:"",
      hideInput:false,
      gstAmount:null,
      surcharge:false
    };
  }
  componentWillMount(){
  
    axios.get('https://uat.dsmeglobal.com/api/Restaurant/GetTableList')
    .then(res => {
      const tableList = res.data.data;
      this.setState({ tableList });
    })  
  }
  updateStatus(item,no_of_person,tableStatus) {
    
    localStorage.setItem("persons",no_of_person);
    localStorage.setItem("orderId",item.last_order_id);
    // item["color"] = "#cd450a";
    var lst = this.state.tableList;
    this.setState({
      tableList: lst,
    });
    this.props.history.push("/Menu/" + item.Id,{tableStatus});
  }
  tableStatus(){
    this.setState({payment:false})
  }
  paymentStatus(){
 
    this.setState({payment:true})
  }
  CashView(){
    this.setState({cash:true})
  }
 
  onChange = input => {
    this.setState({ input });
    console.log("Input changed", input);
  };

  onKeyPress = button => {
    console.log("Button pressed", button);
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  handleShift = () => {
    const layoutName = this.state.layoutName;
    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default"
    });
  };

  onChangeInput = event => {
    const input = event.target.value;
    this.setState({ input });
    this.keyboard.setInput(input);
  };

  SurchargeApi(){
    debugger
    this.setState({surcharge:true})
    
    let surchargeRequestObj;
    var gst = localStorage.getItem("gst");
    // surchargeRequestObj = Object.assign({ 
    //   "gst_amount": parseInt(gst),
    //   "Id": "54",
    //   "service_charges": 0,
    //   "total_amount": parseInt(localStorage.getItem("Total"))
    //  }, surchargeRequestObj);

    //  axios.post('https://uat.dsmeglobal.com/api/Restaurant/SurchargeApi',surchargeRequestObj)
    // .then(res => {
    //   let result = res.data;
    //   console.log(result)
    //     })
    // .catch((error) => {
    //    alert(error)
    //   })
  }
  
  handleDialogOpen(){
    this.setState({showDialog:true})
  }
  calculateGst  = () => {
    var gstNum = (16 / 100) * this.state.input;
    localStorage.setItem("gst", gstNum);
    return gstNum;
  }
  calculateNetAmount  = () => {
    let gst = localStorage.getItem("gst");
    let NetAmount = parseFloat(gst) + parseFloat(this.state.input);
    localStorage.setItem("Total",NetAmount);
    return NetAmount;
  }

  render() {
    
    return (
      <Container style={classes.ContainerWidth}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Paper elevation={0} className={classes.root}>
      <Tabs
        variant="fullWidth"
        aria-label="icon tabs example">
       <Tab label="Table" 
         onClick={() => {
          this.tableStatus();
        }}
        className={`${this.state.payment === false? "Selected-view" : "Unselected-view"}`}
        />
        <Tab label="Payment"
        className={`${this.state.payment !== false? "Selected-view" : "Unselected-view"}`}
        onClick={() => {
          this.paymentStatus();
        }}
        />      
      </Tabs>
    </Paper>
            </Grid>
            </Grid>
       {this.state.payment===false?
  
        <Grid container style={{marginTop:10}}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container spacing={1}>
           
              {this.state.tableList.map((item, i) => (
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                  <Paper
                    elevation={0}
                    className={`Table-box ${item.table_status === 'free'? "Table-free" : "Table-booked"}`}                    
                    onClick={() => {
                      this.updateStatus(item,item.no_of_person,item.table_status);
                    }}>  
                 <Grid container>
                 <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    
                    <Typography
                      className="Table-number-of-persons"
                    >
                      {item.table_status === 'free' ? "": <Fragment> <Person className="Table-number-of-persons-icon"/> <span className="Table-number-of-persons-number">{item.no_of_person}</span></Fragment>}
                    </Typography>
                   
                    </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography
                      style={{
                      
                        fontWeight: "bold",
                        fontSize:18,
                      }}>
                      <CardMembership/>
                    </Typography>
                  </Grid>
                 
                   <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography
                      style={{fontSize:18,padding: '5px 0px'}} >
                      {item.table_no}
                    </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{backgroundColor:"#9c958b", borderRadius:"0px 0px 15px 15px"}}>
                    <Typography
                      style={{fontSize:12,float:'left',padding: '0px 20px'}}
                    >
                      {item.table_status === 'free' ? "":<Fragment><Schedule className="time" /> {item.order_time.split(" ")[1].split(":")[0]+
                      ":"+item.order_time.split(" ")[1].split(":")[1]+" "+item.order_time.split(" ")[2]}</Fragment>}
                    </Typography>
                   
                    </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        :
        <Grid container>
               <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                 <Grid container style={{marginTop:10}}>
                 <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                 <Grid container spacing={1}>
      
           {this.state.tableList.filter(FilterTable =>FilterTable.table_status ==='busy').map((item, i) => (
             <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
               <Paper
                 elevation={0}
                 style={{
                   backgroundColor: item.table_status === 'free' ? "white":'#cd450b',
                   color: item.table_status === 'free' ? "black" : "white",
                   height: "6.5em",
                   margin: "0.5em",
                   display: "flex",
                   alignItems: "center",
                   justifyContent: "center"
                 }}
                 onClick={() => {
                   this.updateStatus(item.Id,item);
                 }}>  
              <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                 <Typography
                   style={{fontSize:15,float:'right',  padding: '0px 4px'}}
                 >
                   {item.table_status === 'free' ? "":item.no_of_person}
                 </Typography>
                
                 </Grid>
                   <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                 <Typography
                   style={{
                   
                     fontWeight: "bold",
                     fontSize:18,
                   }}>
                   Tables
                 </Typography>
               </Grid>
              
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                 <Typography
                   style={{fontSize:18,padding: '5px 0px'}} >
                   {item.table_no}
                 </Typography>
                 </Grid>
                 <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{backgroundColor:"#9c958b"}}>
                 <Typography
                   style={{fontSize:12,float:'left',padding: '0px 20px'}}
                 >
                   {item.table_status === 'free' ? "":item.order_time.split(" ")[1].split(":")[0]+
                   ":"+item.order_time.split(" ")[1].split(":")[1]+" "+item.order_time.split(" ")[2]}
                 </Typography>
                
                 </Grid>
                 </Grid>
               </Paper>
             </Grid>
           ))} 
         </Grid>
                 </Grid>
                 <Grid item xs={4} sm={4} md={4} lg={4} xl={4} >
                 <Paper
                 elevation={0}
                 style={{
                
                 //  height: "38em",
                   margin: "0.5em 0.5em",
                
                 }}>
                   
              <Grid container>
                  <Grid item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    style={{
                     marginTop:10
                    }}
                  >
                    <Typography  style={{ fontSize: 16, float:'left',marginLeft:'10%'}}>
                    Total Prize
                    </Typography>
                    <Typography style={{ fontSize: 16,float:'right',marginRight:'10%'}}>
                    {"Rs."+this.state.input+".00"}
                    </Typography>
                    {this.state.hideInput === true? 
                    <input
                      value={this.state.input}
                      placeholder={"Tap on the virtual keyboard to start"}
                      onChange={this.onChangeInput}
                   />    
                  :""}
                  </Grid>
                  
                </Grid>
                <Grid container>
                  <Grid item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}>
                    <Typography  style={{ fontSize: 16, float:'left',marginLeft:'10%'}}>
                     Discount
                    </Typography>
                    <Typography style={{ fontSize: 16,float:'right',marginRight:'10%'}}>
                    RS. 0.00
                    </Typography>
                  </Grid>
                
                </Grid>
                <Grid container>
                  <Grid item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12} >
                    <Typography  id="myText" style={{ fontSize: 16, float:'left',marginLeft:'10%'}}>
                     G.S.T
                    </Typography>
                    <Typography style={{ fontSize: 16,float:'right',marginRight:'10%'}}>
                    {this.calculateGst()}
                    </Typography>
                  </Grid>               
                </Grid>   
                <Grid container>
                  <Grid item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12} >
                    <Typography  style={{ fontSize: 16, float:'left',marginLeft:'10%'}}>
                    Service Charges
                    </Typography>
                    <Typography style={{ fontSize: 16,float:'right',marginRight:'10%'}}>
                      RS. 0.00
                    </Typography>
                  </Grid>                  
                </Grid>
                 <Grid container>
                  <Grid item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}>
                    <Typography  style={{ fontSize: 18,fontWeight:'bold',float:'left',marginLeft:'10%'}}>
                     Net Total
                    </Typography>
                    <Typography style={{ fontSize: 18,fontWeight:'bold',float:'right',marginRight:'10%'}} onChange={this.onChangeInput}>
                     {this.calculateNetAmount()}
                    </Typography>  
                  </Grid>
                </Grid>  
                <Grid container>
                  <Grid item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}>
                     <Typography  style={{ fontSize: 18, fontWeight:'bold',float:'left',marginLeft:'10%'}}>
                     Pay
                    </Typography>
                    <Typography style={{ fontSize: 18,fontWeight:'bold',float:'right',marginRight:'10%'}}>
                      RS. 0.00
                    </Typography>
                  
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12} >
                    <Typography  style={{ fontSize: 18, fontWeight:'bold',float:'left',marginLeft:'10%'}}>
                     Change
                    </Typography>
                    <Button variant="contained"  size='small' style={{
                        backgroundColor: "green",
                        float:"right",
                        marginRight:"10%",
                        fontSize: 14,
                        height: '2.5em',
                        fontWeight:'bold',
                        width:'28%',
                        marginBottom:'2%',
                        color:'white'
                      }}
                      onClick={() => {
                        this.SurchargeApi();
                       }}
                      >
                        SurCharge
                    </Button>   
                    {this.state.surcharge === true ?
                     <SurchargeDialogModel/>
                     :
                     ""     
                    } 

                  </Grid>
                </Grid>
                {this.state.cash === false?
                <Fragment>
                <Grid container style={{marginTop:25,marginBottom:10}}>
                  <Grid item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}>
                     <Button variant="contained"  size='large' style={{       
                        fontSize: 14,
                        height: '3.2em',
                        fontWeight:'bold',
                        width:'63%',
                    
                      }} onClick={() => {
                         this.CashView();
                        }}>
                       Cash + CREDIT
                    </Button>
                    </Grid>
                    </Grid>
                    <Grid container>
                  <Grid item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}>
                     <Button variant="contained"  size='large' style={{
                      fontSize: 14,
                      height: '3.2em',
                      fontWeight:'bold',
                      width:'63%',
                      marginBottom:30
                    }} onClick={() => {
                        //  this.CancelOrder();
                        }}>
                        On Account
                    </Button>
                    </Grid>
                    </Grid>
                    </Fragment>    
                 :
               <Fragment>
                <Card style={styles.card}>
                  <CardContent>
                
           <Grid container>
                  <Grid item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12} >
                       <Grid container >
                        <Grid item style={{backgroundColor:'red',cursor:'pointer'}}
                    xs={4}
                    sm={4}
                    md={4}
                    lg={4}
                    xl={4} 
                    onClick={() => {
                      this.handleDialogOpen();
                  }}
                    >
                  <Typography  style={{ fontSize: 18,color:'white'}}>
                    Discount
                    </Typography>    
                    {this.state.showDialog === true?
                  <Dialog/>
                  :
                  ""
                  }

                    </Grid>
                      <Grid item style={{backgroundColor:'grey'}}
                    xs={4}
                    sm={4}
                    md={4}
                    lg={4}
                    xl={4} >
                        <Typography  style={{ fontSize: 18,color:'white'}}>
                    Print
                    </Typography>  
                    </Grid>
                      <Grid item style={{backgroundColor:'green'}}
                    xs={4}
                    sm={4}
                    md={4}
                    lg={4}
                    xl={4} >
                        <Typography  style={{ fontSize: 18,color:'white'}}>
                    Pay
                    </Typography>  
                    </Grid>
                    </Grid>
                      </Grid>
                      </Grid>
                
                   <Keyboard
                      keyboardRef={r => (this.keyboard = r)}
                      layoutName={this.state.layoutName}
                      onChange={this.onChange}
                      onKeyPress={this.onKeyPress}
                      layout={
                       {
                       default: [
                         "1 2 3", "4 5 6", "7 8 9", "0", "{bksp}",
                           ],
                        }
                         }
                       theme="hg-theme-default hg-layout-numeric " />
                       </CardContent>
                       </Card>        
                </Fragment> 
  }               </Paper>
               </Grid>
    
               </Grid>    
        </Grid>
        
        </Grid>    
        }     
      </Container>

    );
  }
}

export default Home;
