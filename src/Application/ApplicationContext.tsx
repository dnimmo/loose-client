import React, { createContext, useReducer, useCallback } from "react";
import PropTypes from "prop-types";


export
type State = 
    { name : "INITIAL_LOAD" }
  | { name : "LOADING" }
  | 
  { name : "DATA_LOADED", 
      username: string, 
      channels: { 
        id: string, 
        slug: string, 
      }[]  }


const initialState : State =
  { name : "INITIAL_LOAD" };


interface ApplicationContextValue {
  applicationState : State,
  loadApplicationData: (string) => Promise<void>
}


export
const ApplicationContext =
  createContext<ApplicationContextValue>({
      applicationState: initialState,
      loadApplicationData: async (userId: string) => {}
  });


type Action =
    { type: "REQUEST_DATA", userId: string }
  | { 
      type: "UPDATE_CHANNEL_LIST_FROM_SERVER", 
      username: string,
      channels: { 
        id: string, 
        slug: string, 
      }[] 
    }


const update = 
  (state : State, action : Action) : State => {
      switch (action.type) {
      case "REQUEST_DATA":
          return {
              ...state,
              name: "LOADING"
          };

      case "UPDATE_CHANNEL_LIST_FROM_SERVER":
          return {
              ...state,
              name: "DATA_LOADED",
              username: action.username,
              channels: action.channels,
          };
      default:
          return state;
      }
  };
      


const ApplicationProvider =
  ({ children }) => {
      const [
          applicationState,
          dispatch
      ] =
        useReducer(update, initialState);


      const loadApplicationData =
        useCallback(
            async (userId : string) => {
                dispatch({ type: "REQUEST_DATA", userId });

                const applicationInfo = 
                  await fetch("http://localhost:8000/channelList/nimmo");
                  
                const response = 
                  await applicationInfo.json();

                const channels =
                  JSON.parse(response.body); 

                dispatch({ 
                    type: "UPDATE_CHANNEL_LIST_FROM_SERVER", 
                    username: "Nimmo", 
                    channels,
                });
            },
            [dispatch]);


      const value : ApplicationContextValue = { 
          applicationState, 
          loadApplicationData
      };

    
      return (
          <ApplicationContext.Provider value={value}>
              {children}
          </ApplicationContext.Provider>
      );
  };


ApplicationProvider.propTypes = {
    children: PropTypes.object
};


export default ApplicationProvider;