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
         name: string, 
         content: string[],
         slug: string
        }[] }


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
      type: "UPDATE_APP_DATA_FROM_SERVER", 
      username: string,
      channels: { 
        id: string, 
        name: string, 
        slug: string, 
        content: string[] 
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

      case "UPDATE_APP_DATA_FROM_SERVER":
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
                  await fetch("http://localhost:8000/");

                const response = 
                  await applicationInfo.json();

                const data =
                  JSON.parse(response.body); 

                dispatch({ 
                    type: "UPDATE_APP_DATA_FROM_SERVER", 
                    username: data.username, 
                    channels: data.channels
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