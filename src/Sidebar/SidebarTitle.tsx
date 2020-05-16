import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const SidebarButton =
  styled.button`
  cursor: pointer;
  background: none;
  border: none;
  outline: 0;
  font-size: 16px;
  font-weight: normal;
  color: #cfc3cf;
  &:first-of-type{
      text-align: left;
  };
  &:hover{
      &:first-of-type{
          transform: none;
      };
      transform: scale(1.2);
  };
  transition: transform 0.1s linear;
  `;


const SidebarTitleWrapper = 
  styled.div`
  display: grid;
  grid-template-columns: 65% 1fr 1fr;
  padding: 2px 0 2px 12px;
  margin-top: 10px;
  margin-bottom: 0;
  opacity: 0.8;
  `;


const SidebarTitleText =
    styled.h2`
    display: inline;
    font-size: 18px;
    font-weight: normal;
    padding-left: 4px;
    `;


const SidebarTitle = 
  ({ 
      collapseFunction, 
      expandFunction, 
      title, 
      isExpanded 
  }) => 
      <SidebarTitleWrapper>
          <SidebarButton
              onClick={
                  isExpanded
                      ? collapseFunction
                      : expandFunction
              }>
              { isExpanded
                  ? <img alt="collapse" src="/images/menu-close.svg" />
                  : <img alt="expand" src="/images/menu-open.svg" />
              }
              <SidebarTitleText>{title}</SidebarTitleText>
          </SidebarButton>
          <SidebarButton>
              <img alt="options" src="/images/settings.svg" />
          </SidebarButton>
          <SidebarButton>
              <img alt="new" src="/images/create-new.svg" />
          </SidebarButton>
      </SidebarTitleWrapper>;


SidebarTitle.propTypes = {
    collapseFunction: PropTypes.func,
    expandFunction: PropTypes.func,
    title: PropTypes.string,
    isExpanded: PropTypes.bool
};


export default SidebarTitle;