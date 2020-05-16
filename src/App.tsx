import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router,
    Switch,
    Route 
} from "react-router-dom";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar/Sidebar";
import Channel from "./Channel";


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
      <Router>
          <SearchBar/>
          <Wrapper>
              <Sidebar/>
              <Switch>
                  <Route path="/channel/:id">
                      <Channel></Channel>
                  </Route>
              </Switch>
          </Wrapper>
      </Router>;


export default App;
