import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";


export
interface Channel {
  name: string,
  slug: string,
  id: string
}


export
type State =
  { 
    active: true,
    expanded : boolean,
    selected : string }
  | {
    active : false,
    expanded : boolean
  }


type Model = { 
  state : State,
  channelList : Channel[],
}


const initialModel : Model = 
  { state: {
      active: false,
      expanded: true
  }, 
  channelList: []
  };


interface ChannelListValue {
  channelListModel : Model,
  expandChannelList : () => void,
  collapseChannelList : () => void,
}


export
const ChannelListContext = 
    createContext({} as ChannelListValue);


type Action = 
      { type: "OPEN" }
    | { type: "CLOSE" }


const update = 
  (model: Model, action : Action) : Model => {
      switch (action.type) {
      case "OPEN": 
          return {
              ...model,
              state: {
                  ...model.state,
                  expanded: true
              }
          };

      case "CLOSE":
          return {
              ...model,
              state: {
                  ...model.state,
                  expanded: false
              }
          };

      default: 
          return model;
      }
  };


const ChannelListProvider = 
  ({ children }) => {
      const [
          channelListModel, 
          dispatch
      ] = 
        useReducer(update, initialModel);


      const expandChannelList = 
        () => {
            dispatch({ type: "OPEN" });
        };


      const collapseChannelList = 
        () => {
            dispatch({ type: "CLOSE" });
        };


      const value = { 
          channelListModel,
          expandChannelList,
          collapseChannelList
      };

      
      return (
          <ChannelListContext.Provider value={value}>
              {children}
          </ChannelListContext.Provider>
      );
  };


ChannelListProvider.propTypes = 
  { 
      children : PropTypes.object
  };


export default ChannelListProvider;