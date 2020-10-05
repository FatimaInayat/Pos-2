import axios from "axios";
import * as signalR from '@aspnet/signalr';

export const FETCH_DATA = "FETCH_DATA";
export const FETCH_HISTORY = 'FETCH_HISTORY';
export const FETCH_HEADER_DATA = "FETCH_HEADER_DATA";
export const FETCH_LOGIN = "FETCH_LOGIN";
export const CASHACCEPTOR_CONNECTION = "CASHACCEPTOR_CONNECTION";

export const cashAcceptorConnectionBuilder = () => {
  return(dispatch)=>{

  let connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/cashAcceptorApp")
    .build();
    connection.start().then(() => console.log("SignalR connected"));
    connection.on("CashAcceptorError", (isError, errorCode, errorStatus) => {
      
      if(isError)
      {
        if(errorCode === 100070)
        {
          localStorage.setItem('errorStatus', "true");
          localStorage.setItem('errorMessage', errorStatus);
          localStorage.setItem('redirectTo', "/CashCollectorLogin");
          window.location = "/";
        }
        else if (errorCode === 100040)
        {
          // ILLEGAL COMMAND, No action should be taken
        }
        else
        {
          localStorage.setItem('errorStatus', "true");
          localStorage.setItem('errorMessage', errorStatus);
          localStorage.setItem('redirectTo', "/KioskError");          
          window.location = "/";
        }
      }
      else
      {
        if (errorCode === 100040)
        {
          // ILLEGAL COMMAND, No action should be taken
        }
        else if (errorCode === 100070)
        {
          let CashCollectorStatus = localStorage.getItem('CashCollectorStatus');

          if(CashCollectorStatus !== "0")
          {
            localStorage.setItem('redirectTo', "");
            localStorage.setItem('errorStatus', "false");
            window.location = "/";
          }
          else
          {
            localStorage.setItem('errorStatus', "false");
            localStorage.setItem('redirectTo', "/CashCollectorLogin");
            window.location = "/";
          }
        }
        else
        {
          localStorage.setItem('redirectTo', "");
          localStorage.setItem('errorStatus', "false");
          window.location = "/";
        }
        
      }
    });
    
    connection.on("ResponseCashAcceptor", (NoteInsertedId, NoteInsertedValue, Amount, Completed, Message) => {      

      let responceCash = {
        NoteInsertedId : NoteInsertedId,
        NoteInsertedValue : NoteInsertedValue,
        Amount : Amount,
        Completed : Completed,
        Message : Message,
      }

      let result = {
        connection: connection,
        ResponseCashAcceptor: responceCash
      }

      dispatch({
        type: CASHACCEPTOR_CONNECTION, payload: result
      });
      
    });

    connection.onclose(function (e) {
      debugger;
      alert('Connection Closed');
  });

    let result = {
      connection: connection,
      ResponseCashAcceptor: null
    }

  dispatch({
    type: CASHACCEPTOR_CONNECTION, payload: result
  })
  
}
}

export const getAllData = () =>{
  return(dispatch)=>{
    let MainPaymentsRequest = {
      "country": "BHR",
      "session-id": "aa1f6c8c-cef0-40b4-af05-d37da8a9c105",
      "locale": "en-US"
  }
    axios.post(process.env.REACT_APP_BASEURL + 'api/v2/ksk-ven-sdd/payments/available',
    JSON.stringify(MainPaymentsRequest))
    .then((res) => {

    dispatch({ 
      type: FETCH_DATA, payload:res.data
     })}
   )}; 
}

export const getHistory = () =>{
  return(dispatch)=>{
    let sessionId = localStorage.getItem('sessionId');
    let historyRequestObject = {

      'session-id': sessionId,
      'offset': 0,
      'count': 0,
      'day-filter': 1,
      'transaction-type-filter': 1,
      'locale': 0,
  }
  axios.post(process.env.REACT_APP_BASEURL + 'api/web/v1/Payments/History',
  JSON.stringify(historyRequestObject))
    .then((res) => {
  
    dispatch({ 
      type: FETCH_HISTORY, payload:res.data
     })}
   )};
  
}

export const getHeaderInfo = (cartItemCount,isLoggin) => {
  return {
    type: FETCH_HEADER_DATA,
    cartItemCount: cartItemCount,
    isLoggin: isLoggin
  };
}
