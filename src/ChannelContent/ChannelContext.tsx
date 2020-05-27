import React, { createContext, useReducer } from 'react'


export
type State =
    { name : "INITIAL_LOAD" }
  | { name : "LOADING_CHANNEL_INFO" }
  | { name : "LOADED", 
      channelDetails: ChannelDetails
    }


interface ChannelContextValue {
  channelState : State,
  requestChannelInfo : (string) => Promise<void>
}


export
const ChannelContext = 
  createContext({} as ChannelContextValue);


type ChannelDetails = {
    id: string, 
    name: string, 
    slug: string, 
    content: { 
      mainPostContent: string, 
      threadContent: string[],
      date: string,
      link: string,
      linkText: string
    }[],
    description: string,
}


const initialState : State = 
    ({ name : "INITIAL_LOAD" })


type Action =
    { type : "REQUEST_CHANNEL_INFO" }
  | { type: "UPDATE_CHANNEL_INFO", channelDetails : ChannelDetails }
    

const update =
    (state : State, action : Action) : State => {
      switch(action.type) {
        case "REQUEST_CHANNEL_INFO":
          return { name : "LOADING_CHANNEL_INFO" }

        case "UPDATE_CHANNEL_INFO":
          return { name : "LOADED", channelDetails: action.channelDetails }
      }
    }


const ChannelProvider =
  ({ children }) => {
    const [
      channelState,
      dispatch
    ] =
      useReducer(update, initialState)


    const requestChannelInfo =
      async (channelId : string) => 
         {
            dispatch({ type: "REQUEST_CHANNEL_INFO" });

            const response =
              await fetch(`http://localhost:8000/channel/${channelId}`)
              
            const responseJson =
              await response.json();
            
            
            dispatch({ type: "UPDATE_CHANNEL_INFO", channelDetails: JSON.parse(responseJson.body)})
         } 
      

    const value = {
      channelState,
      requestChannelInfo
    }


    return (
      <ChannelContext.Provider value={value}>
        {children}
      </ChannelContext.Provider>
    )
  }  


export default ChannelProvider