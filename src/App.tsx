import React from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar/Sidebar";
import MainContent from "./MainContent";


const Wrapper = 
  styled.div`
  display: grid;
  grid-template-columns: 257px 1fr;
  min-height: 95vh;
  color: white;
  font-family: 'Hind', sans-serif;
  `;


const App = 
  () => 
      <div>
          <SearchBar/>
          <Wrapper>
              <Sidebar/>
              <MainContent/>
          </Wrapper>
      </div>;


export default App;
