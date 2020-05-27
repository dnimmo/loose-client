import React from "react";
import styled from "styled-components";


const SearchBarWrapper =
  styled.div`
    display: grid;
    grid-template-columns: 95% 5%;
    background-color: #350d36;
    height: 5vh;
    min-height: 40px;
    width: 100%`;


const HelpButton = 
  styled.button`
  border: 0;
  background: none;
  margin: 3px;
  cursor: pointer;
  outline: none;`;

const HelpIcon =
  styled.img`
  height: 30px;
  width: 20px;`;


const SearchBar = 
  () => 
      <SearchBarWrapper>
        <span></span>
        <HelpButton>
          <HelpIcon src="/images/question.svg"/>
        </HelpButton>
      </SearchBarWrapper>;

export default SearchBar;