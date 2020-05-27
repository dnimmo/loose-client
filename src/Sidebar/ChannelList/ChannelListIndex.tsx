import React from "react";
// import { useParams } from "react-router-dom";
import ChannelListProvider from "./ChannelListContext";
import ChannelList from "./ChannelList";


const ChannelListIndex = 
  () =>  {
    //   const {
    //       channelId 
    //   } =
    //     useParams();


      return (
        <ChannelListProvider>
            <ChannelList/>
        </ChannelListProvider>
      )
  }


export default ChannelListIndex;