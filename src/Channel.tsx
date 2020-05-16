import React from "react";
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
  styled.div``;


const Channel =
  () => {
      const { id } = useParams();

      return (
          <ChannelWrapper>
              <ChannelView>{id}</ChannelView>
          </ChannelWrapper>
      );
  };


export default Channel;