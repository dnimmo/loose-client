import React from "react";
import ChannelListProvider from "./ChannelListContext";
import ChannelList from "./ChannelList";


const ChannelListIndex = 
  () =>  
      <ChannelListProvider>
          <ChannelList/>
      </ChannelListProvider>;


export default ChannelListIndex;