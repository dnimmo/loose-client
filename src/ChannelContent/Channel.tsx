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
  height: 100vh;
  overflow: overlay;
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


const PostWrapper = 
  styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: 50px 1fr;
  border-top: 1px solid rgb(216, 216, 216);
  margin-top: -15px;
  z-index: 9;
  &:last-of-type{
    margin-bottom: 40px;
  }`


const Avatar =
  styled.img`
  height: 37px;
  border-radius: 37px;
  `


const PostContent =
  styled.div`
  display: grid;
  grid-layout-rows: 20% 1fr;
  `


const Username = 
  styled.span`
  font-weight: bold;
  `

const DateWrapper =
  styled.div`
  display: grid;
  grid-template-columns: 40% 20% 40%;
  `

const Date = 
  styled.div`
  text-align: center;
  font-size: 13px;
  font-weight: bold;  
  background-color: white;
  padding: 3px 10px;
  border: 1px solid rgb(216, 216, 216);
  border-radius: 20px;
  `


const Link =
  styled.a``


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
            : { name : "", slug: "", description: "", content: [] }; // It isn't really possible to get to this point without the application being in the "LOADED" state, but Typescript doesn't seem to have a way to know this sadly.


      const { name, slug, description, content } = 
          channelDetails


      const posts = 
        channelState.name === "LOADED"
          ? content
          : []


      return (
          <ChannelWrapper>
              <ChannelHeader>
                <ChannelTitle>{(name) || ""}</ChannelTitle>
                <ChannelSubtitle> (#{slug})</ChannelSubtitle>
                <ChannelDescription>
                  {(description) || ""}
                </ChannelDescription>
              </ChannelHeader>
              { 
                posts.map(
                    ({ mainPostContent, date, link, linkText }) => 
                    <div>
                      <DateWrapper>
                        <span></span>
                        <Date>{ date }</Date>
                        <span></span>
                      </DateWrapper>
                      <PostWrapper>
                        <Avatar
                          src="/images/nimmo.png"
                        />
                        <PostContent>
                          <Username>Nimmo</Username>
                          {mainPostContent}
                          { 
                          link && 
                            <Link 
                              href={link}
                              target="_blank"
                            >
                              {linkText}
                            </Link>
                          }
                        </PostContent>
                      </PostWrapper>
                    </div>
                  ) 
              }
          </ChannelWrapper>
      );
  };


export default Channel;