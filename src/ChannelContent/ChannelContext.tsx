import React, { createContext, useReducer } from 'react';
import getChannel from '../data/channels';

export
type State =
    { name : "INITIAL_LOAD" }
  | { name : "LOADED", 
      channelDetails: ChannelDetails
    }
  | { name: "DISPLAYING_THREAD",
      channelDetails: ChannelDetails,
      threadContent: ThreadContent[],
      title: string
    }


interface ChannelContextValue {
  channelState : State,
  requestChannelInfo : (string) => void,
  openThread: ({ channelDetails, threadContent, title } : { channelDetails: ChannelDetails, threadContent: ThreadContent[], title: string }) => void,
  closeThread: ({ channelDetails } : { channelDetails : ChannelDetails }) => void
}


export
const ChannelContext = 
  createContext({} as ChannelContextValue);


type ThreadContent = { 
  text: string,
  link: string,
  linkText: string
}


type ChannelDetails = {
    id: string, 
    name: string, 
    slug: string, 
    content: { 
      mainPostContent: string, 
      threadContent: ThreadContent[],
      date: string,
      link: string,
      linkText: string
    }[],
    description: string,
}


const initialState : State = 
    { 
      name : "INITIAL_LOAD"
    }


type Action =
  { type : "UPDATE_CHANNEL_INFO", channelDetails : ChannelDetails }
  | 
  { type : "OPEN_THREAD", 
      threadContent : ThreadContent[],
      channelDetails : ChannelDetails,
      title : string
    }
  | { type : "CLOSE_THREAD",
      channelDetails : ChannelDetails
    }
    

const update =
    (state : State, action : Action) : State => {
      switch(action.type) {
        case "UPDATE_CHANNEL_INFO":
          return { 
            ...state,
            name : "LOADED", 
            channelDetails: action.channelDetails 
          }

        case "OPEN_THREAD": 
          return { 
            ...state,
            name : "DISPLAYING_THREAD",
            channelDetails: action.channelDetails,
            threadContent: action.threadContent,
            title: action.title
          }

        case "CLOSE_THREAD":
          return {
            ...state,
            name : "LOADED",
            channelDetails: action.channelDetails
          }
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
      (channelId : string) => 
         {
            dispatch({ type: "UPDATE_CHANNEL_INFO", channelDetails: getChannel(channelId)})
         } 
      

    const openThread =
         ( { channelDetails, threadContent, title } : { channelDetails : ChannelDetails, threadContent : ThreadContent[], title: string } ) => {
           dispatch({ 
             type: "OPEN_THREAD",
             channelDetails,
             threadContent,
             title,
           })
         }


    const closeThread =
         ( { channelDetails } : { channelDetails : ChannelDetails } ) => {
           dispatch({
             type: "CLOSE_THREAD",
             channelDetails,
           })
         }


    const value = {
      channelState,
      requestChannelInfo,
      openThread,
      closeThread
    }


    return (
      <ChannelContext.Provider value={value}>
        {children}
      </ChannelContext.Provider>
    )
  }  


export default ChannelProvider;