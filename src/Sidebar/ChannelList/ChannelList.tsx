import React, { useContext } from "react";
import styled from "styled-components";
import { v4 as generateId } from "uuid";
import { Link } from "react-router-dom";
import SidebarTitle from "../SidebarTitle";
import { ChannelListContext, Channel } from "./ChannelListContext";
import { ApplicationContext } from "../../Application/ApplicationContext";

const ChannelListWrapper =
  styled.div`
  border-top: 1px solid rgb(82,38,83);
  `;


const ChannelListMenu =
  styled.div`
  `;


const ChannelLink =
  styled.p`
  font-size: 15px;
  font-weight: bold;
  text-decoration: none;
  color: #cfc3cf;
  display: block;
  opacity: 0.8;
  padding: 2px 42px;
  margin: 2px 0;
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
        useContext(ChannelListContext);


      const {
          applicationState 
      } =
        useContext(ApplicationContext);


      const isExpanded =
        state.expanded;
      

      const channels =
          applicationState.name === "DATA_LOADED"
              ? applicationState.channels
              : [];

        
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
                                to={`/channel/${x.id}`}
                                key={generateId()}
                                style={ {textDecoration: "none"} }
                            >
                                <ChannelLink>
                                  # {x.slug}
                                </ChannelLink>
                            </Link>
                    )
                  }
              </ChannelListMenu>
          </ChannelListWrapper>
      );

  };

export default ChannelList;