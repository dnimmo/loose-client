import React, { createContext } from "react";
import PropTypes from "prop-types";
import { channels } from '../data/channels';

export
type State = 
  { name : "DATA_LOADED", 
      username: string, 
      channels: { 
        id: string, 
        slug: string, 
      }[]  }


const initialState : State =
  { 
    name : "DATA_LOADED",
    username: "Nimmo",
    channels: channels.map(({ id, slug }) => ({ id, slug })),
   };


interface ApplicationContextValue {
  applicationState : State,
  // loadApplicationData: (string) => Promise<void>
}


export
const ApplicationContext =
  createContext<ApplicationContextValue>({
      applicationState: initialState,
      // loadApplicationData: async (userId: string) => {}
  });


const ApplicationProvider =
  ({ children }) => {
      const value : ApplicationContextValue = { 
          applicationState: initialState, 
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