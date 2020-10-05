import {CASHACCEPTOR_CONNECTION } from '../store/actions/actions';

const initialState = []

export default (state = initialState, action) => {
  
  switch (action.type) {
    case CASHACCEPTOR_CONNECTION:
      {
        return {   
         ...state,       
         cashAcceptorConnection : action.payload
        }
       }
    

    default:
      return state;
  }
}


