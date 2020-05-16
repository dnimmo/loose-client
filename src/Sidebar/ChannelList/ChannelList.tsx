import React from "react";
import styled from "styled-components";
import { v4 as generateId } from "uuid";
import SidebarTitle from "../SidebarTitle";
import { ChannelListContext, Channel } from "./ChannelListContext";
import { Link } from "react-router-dom";

const ChannelListWrapper =
  styled.div`
  border-top: 1px solid rgb(82,38,83);
  `;


const ChannelListMenu =
  styled.div`
  `;


const channels : Channel[] =
  [
      {name: "general", slug: "general"}, 
      {name: "random", slug: "random"}
  ];


const ChannelLink =
  styled.p`
  font-size: 15px;
  font-weight: bold;
  text-decoration: none;
  color: #cfc3cf;
  display: block;
  opacity: 0.8;
  padding: 2px 42px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover{
    opacity: 1;
    background-color: #350d36;
  }`;


const ChannelList =  
  () => {
      const { 
          channelListModel : { state },
          collapseChannelList,
          expandChannelList
      } =
        React.useContext(ChannelListContext);


      const isExpanded =
        state === "EXPANDED";
      
        
      return (
          <ChannelListWrapper>
              <ChannelListMenu>
                  <SidebarTitle 
                      collapseFunction={collapseChannelList}
                      expandFunction={expandChannelList}
                      title="Channels"
                      isExpanded={isExpanded}
                  />
                  {isExpanded 
                    && channels.map(
                        x => 
                            <Link 
                                to={`/channel/${x.slug}`}
                                key={generateId()}
                            >
                                <ChannelLink>
                                  # {x.name}
                                </ChannelLink>
                            </Link>
                    )
                  }
              </ChannelListMenu>
          </ChannelListWrapper>
      );

  };

export default ChannelList;