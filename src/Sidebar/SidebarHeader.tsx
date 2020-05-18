import React, { useContext } from "react";
import styled from "styled-components";
import { ApplicationContext } from "../Application/ApplicationContext";

const colours = {
    background: "#3F0E40",
    active: "#2BAC76"
};


const SidebarHeaderWrapper =
  styled.div`
  display: grid;
  grid-template-columns: 160px 1fr;
  border-top: 1px solid rgb(82,38,83);
  padding: 0 20px;
  background-color: ${colours.background}
  `;


const MainHeading = 
  styled.h1`
  font-size: 16px;
  margin-bottom: 0;
  `;


interface StatusIndicatorProps {
  active : boolean
}

const StatusIndicator = 
  styled.span<StatusIndicatorProps>`
    background-color: ${
    props => 
        props.active 
            ? colours.active 
            : colours.background };
    width: 10px;
    border: 1px solid ${colours.active};
    color: ${
    props => 
        props.active 
            ? colours.active 
            : colours.background };
    border-radius: 100%;
    height: 10px;
    margin-top: 3px;
  `;


const UserNameWrapper =
  styled.div`
  display: grid;
  grid-template-columns: 20px 1fr;
  font-size: 12px;
  margin-top: 0;
  `;


const UserName =
  styled.span`
  opacity: 0.8;
  margin-top: -1px;
  margin-left: -5px;
  `;

const NewMessageButton =
  styled.button`
  border-radius: 50px;
  margin: 13px;
  width: 37px;
  height: 37px;
  cursor: pointer;`;


const NewMessageIcon =
  styled.img`
  height: 16px;
  width: 16px;`;


const SidebarHeader = 
  () => {
      const {
          applicationState
      } =
      useContext(ApplicationContext);


      const username =
        applicationState.name === "DATA_LOADED"
            ? applicationState.username
            : "Unknown";


      return (
          <SidebarHeaderWrapper>
              <div>
                  <MainHeading>My Loose workspace</MainHeading>
                  <UserNameWrapper>
                      <StatusIndicator 
                          active={true}/>
                      <UserName>{ username }</UserName>
                  </UserNameWrapper>
              </div>
              <NewMessageButton>
                  <NewMessageIcon src="/images/new-post.svg"/>
              </NewMessageButton>
          </SidebarHeaderWrapper>
      );
  };


export default SidebarHeader;