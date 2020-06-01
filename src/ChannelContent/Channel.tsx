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
  position: fixed;
  width: 100%;
  background-color: #fff;
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


const ThreadLinkWrapper =
  styled.div`
  margin-top: 10px;
  `

const ThreadLinkImage = 
  styled.img`
  border-radius: 50px;
  height:20px;`

const ThreadLinkText =
  styled.button`
  text-decoration: none;
  font-size: 14px;
  margin-left: 5px;
  vertical-align: top;
  font-weight: bold;
  background: none;
  border: none;
  cursor: pointer;
  color: #1264A3;
  margin-top: 1px;
  &:hover{
    text-decoration: underline;
  }`

const ThreadLink =
  ({ replies, openThreadFunction }) => 
    <ThreadLinkWrapper>
      <ThreadLinkImage
        src={"/images/nimmo.png"}/>
      <ThreadLinkText onClick={ openThreadFunction }>
        {`${replies.length} ${replies.length === 1 ? 'reply' : 'replies'}`}
      </ThreadLinkText>
    </ThreadLinkWrapper>


const ThreadWrapper =
  styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background: #fff;
  width: 50%;
  height: 100%;
  border-left: 1px solid #d8d8d8;
  overflow: scroll;
  `


const CloseThreadButton =
  styled.button`
  background: none;
  border: 1px solid #777;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px 0;
  cursor: pointer;
  `


const Channel =
  () => {
      const {
          channelId
      } =
        useParams();


      const {
          channelState,
          requestChannelInfo,
          openThread,
          closeThread
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
        channelState.name === "LOADED" || channelState.name === "DISPLAYING_THREAD"
            ? channelState.channelDetails
            : { name : "", slug: "", description: "", content: [], id: "" }; // It isn't really possible to get to this point without the application being in the "LOADED" state, but Typescript doesn't seem to have a way to know this sadly.


      const { name, slug, description, content } = 
          channelDetails


      const posts = 
        channelState.name === "LOADED" || channelState.name === "DISPLAYING_THREAD"
          ? content
          : []

      const threadPosts = 
        channelState.name === "DISPLAYING_THREAD"
          ? channelState.threadContent
          : []

      const threadTitle =
        channelState.name === "DISPLAYING_THREAD"
          ? channelState.title
          : "Error"


      return (
          <ChannelWrapper>
              <ChannelHeader>
                <ChannelTitle>{(name) || ""}</ChannelTitle>
                <ChannelSubtitle> (#{slug})</ChannelSubtitle>
                <ChannelDescription>
                  {(description) || ""}
                </ChannelDescription>
              </ChannelHeader>
              <div style={{marginTop: '80px'}}></div>
              { 
                posts.map(
                    ({ mainPostContent, date, link, linkText, threadContent }) => 
                    <div style={
                      channelState.name === "DISPLAYING_THREAD"
                        ? { opacity: 0.3 }
                        : { opacity: 1  }
                    }>
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
                          {
                            threadContent && threadContent.length > 0
                              ? <ThreadLink
                                  replies={threadContent} 
                                  openThreadFunction={() => openThread({ threadContent, channelDetails, title: mainPostContent })}
                                />
                              : null
                          }
                        </PostContent>
                      </PostWrapper>
                    </div>
                  ) 
              }
              { channelState.name === "DISPLAYING_THREAD" 
                ? <ThreadWrapper>
                    <ChannelHeader>
                        <ChannelTitle>Thread</ChannelTitle>
                        <ChannelDescription>
                          { threadTitle }
                        </ChannelDescription>
                        <CloseThreadButton
                          onClick={() => closeThread({ channelDetails })}>
                          Close thread
                        </CloseThreadButton>
                    </ChannelHeader>
                    <div style={{marginTop: '110px'}}></div>
                    { threadPosts.map(
                        ({ text, link, linkText }) =>
                        <PostWrapper>
                        <Avatar
                          src="/images/nimmo.png"
                        />
                        <PostContent>
                          <Username>Nimmo</Username>
                          {text}
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
                        )  
                    }
                  </ThreadWrapper>
                : null 
              }
          </ChannelWrapper>
      );
  };


export default Channel;