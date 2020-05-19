import React from 'react'
import Channel from './Channel'
import ChannelProvider from './ChannelContext'

const ChannelIndex =  
  () =>   
    <ChannelProvider>
      <Channel></Channel>
    </ChannelProvider>


export default ChannelIndex