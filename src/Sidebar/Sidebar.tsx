import React from "react";
import styled from "styled-components";
import SidebarHeader from "./SidebarHeader";
import ChannelListIndex from "./ChannelList/ChannelListIndex";

const SidebarWrapper =
  styled.div`
  background-color: #3F0E40;
  `;


const Sidebar = 
  () => 
      <SidebarWrapper>
          <SidebarHeader/>
          <ChannelListIndex/>
      </SidebarWrapper>;
      

export default Sidebar;