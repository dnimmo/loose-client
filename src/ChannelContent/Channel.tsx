import React, { useContext } from "react";
import { ApplicationContext } from "../Application/ApplicationContext";
import styled from "styled-components";
import {
    useParams
} from "react-router-dom";


const ChannelWrapper =
  styled.section`
  background-color: #fff;
  box-shadow: inset 5px 5px 10px rgba(0,0,0,0.1);
  color: #000;
  `;


const ChannelView =  
  styled.div`
  padding: 40px;`;


const Channel =
  () => {
      const {
          channelId
      } =
        useParams();

      
      const {
          applicationState
      } =
        useContext(ApplicationContext);


      const channels =
        applicationState.name === "DATA_LOADED"
            ? applicationState.channels
            : []; // It isn't really possible to get to this point without the application being in the "DATA_LOADED" state, but Typescript doesn't have a way to know this sadly.


      const activeChannel = 
          channels.find(({ id }) => id === channelId);


      return (
          <ChannelWrapper>
              <ChannelView>{(activeChannel && activeChannel.name) || "none"}</ChannelView>
          </ChannelWrapper>
      );
  };


export default Channel;