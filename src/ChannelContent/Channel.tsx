import React, { useContext, useEffect } from "react";
import { ChannelContext } from "./ChannelContext";
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


const ChannelHeader =  
  styled.header`
  padding: 11px 15px 4px;
  border-bottom: 1px solid #d8d8d8;
  `;


const ChannelTitle =
  styled.h1`
  display: inline;
  margin: 0;
  font-size: 14px;
  `


const ChannelSubtitle =
  styled.span`
  font-size: 14px;
  color: #999;
  `


const ChannelDescription =
  styled.p`
  font-size: 14px;
  margin: 0;
  color: #999;
  `


const Channel =
  () => {
      const {
          channelId
      } =
        useParams();


      const {
          channelState,
          requestChannelInfo
      } =
        useContext(ChannelContext);


      useEffect(
        () => {
          if (channelState.name === "INITIAL_LOAD") {
            requestChannelInfo(channelId)
          }
        }
      )


      const channelDetails =
        channelState.name === "LOADED"
            ? channelState.channelDetails
            : { name : "", slug: "", description: "" }; // It isn't really possible to get to this point without the application being in the "LOADED" state, but Typescript doesn't seem to have a way to know this sadly.


      const { name, slug, description } = 
          channelDetails


      return (
          <ChannelWrapper>
              <ChannelHeader>
                <ChannelTitle>{(name) || ""}</ChannelTitle>
                <ChannelSubtitle> (#{slug})</ChannelSubtitle>
                <ChannelDescription>{(description) || ""}</ChannelDescription>
              </ChannelHeader>
          </ChannelWrapper>
      );
  };


export default Channel;