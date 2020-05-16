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
  `;


const SidebarTitleWrapper = 
  styled.div`
  padding: 2px 0 2px 12px;
  margin-top: 10px;
  margin-bottom: 0;
  opacity: 0.8;
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
              {` ${title}`}
          </SidebarButton>
          
      </SidebarTitleWrapper>;


SidebarTitle.propTypes = {
    collapseFunction: PropTypes.func,
    expandFunction: PropTypes.func,
    title: PropTypes.string,
    isExpanded: PropTypes.bool
};


export default SidebarTitle;