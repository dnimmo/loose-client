import React, { useContext, useEffect } from "react";
import { ApplicationContext, State } from "./ApplicationContext";
import styled from "styled-components";
import { BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import SearchBar from "../SearchBar";
import Sidebar from "../Sidebar/Sidebar";
import ChannelIndex from "../ChannelContent/ChannelIndex";


const Wrapper = 
  styled.div`
  display: grid;
  grid-template-columns: 257px 1fr;
  min-height: 95vh;
  color: white;
  font-family: 'Hind', sans-serif;
  `;


const App = 
  () => {
        const { 
            applicationState,
            loadApplicationData
        } =
            useContext(ApplicationContext);

    
        useEffect(() => {
            if (applicationState.name === "INITIAL_LOAD") {
                // TODO: Don't just hardcode the user ID here! :D 
                loadApplicationData("Nimmo");
            }
        });


        const chooseState = 
            (state : State) => {
                switch(state.name) {
                case "INITIAL_LOAD":
                case "LOADING":
                    return; // TODO: Some sort of loading view;


                case "DATA_LOADED":
                    return (
                        <Wrapper>
                            <Sidebar/>
                            <Switch>
                                <Route 
                                    path="/channel/:channelId"
                                    render={props => 
                                        <ChannelIndex 
                                            // Key set to channelId to force re-render on channel switch
                                            key={props.match.params.channelId}
                                        />
                                    }
                                >   
                                </Route>
                            </Switch>
                        </Wrapper>
                    );
                }
            };

        return (
            <Router>
                <SearchBar/>
                { chooseState(applicationState) }
            </Router>
        );
  };


export default App;
