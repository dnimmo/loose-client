import React, { useContext, useEffect } from "react";
import { ChannelContext } from "./ChannelContext";
import styled from "styled-components";
import {
    useParams
} from "react-router-dom";


const ChannelWrapper =
  styled.section`
  background-color: #fff;
  color: #000;
  @media screen and (min-width:450px){
    box-shadow: inset 5px 5px 10px rgba(0,0,0,0.1);
    height: 100vh;
    overflow: overlay;
  };
  `;


const ChannelHeader =  
  styled.header`
  padding: 11px 15px 4px;
  border-bottom: 1px solid #d8d8d8;
  width: 100%;
  background-color: #fff;
  @media screen and (min-width:450px){
    position: fixed;
  }
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


interface PostDisplayManagerInterface {
  hidePost : boolean
}


const PostDisplayManager =
  styled.div`
  display: ${(props : PostDisplayManagerInterface) => 
    props.hidePost 
    ? 'none' 
    : 'block'
  };
  @media screen and (min-width:450px){
    display: block;
    opacity: ${(props : PostDisplayManagerInterface) => 
      props.hidePost 
      ? '0.3' 
      : '1'
    };
  }
  `


const PostWrapper = 
  styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: 50px 1fr;
  border-top: 1px solid rgb(216, 216, 216);
  margin-top: -15px;
  z-index: 9;
  @media screen and (min-width:450px){
    &:last-of-type{
      margin-bottom: 40px;
    } 
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
  grid-template-columns: 20% 60% 20%;
  @media screen and (min-width:800px){
    grid-template-columns: 40% 20% 40%;
  }
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
  width: 100%;
  height: 100%;
  border-left: 1px solid #d8d8d8;
  overflow: scroll;
  @media screen and (min-width:450px){
    width: 50%;
  };
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

const ChannelTopSpacing =
  styled.div`
  height: 20px;
  @media screen and (min-width:450px) {
    height: 80px;
  };
  `

const ThreadSpacing =
  styled.div`
  height: 14px;
  @media screen and (min-width:450px) {
    height: 110px;
  }
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
              <ChannelTopSpacing></ChannelTopSpacing>
              { 
                posts.map(
                    ({ mainPostContent, date, link, linkText, threadContent }) => 
                    <PostDisplayManager 
                      hidePost={channelState.name === "DISPLAYING_THREAD"}
                    >
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
                    </PostDisplayManager>
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
                    <ThreadSpacing></ThreadSpacing>
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