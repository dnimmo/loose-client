import React, { useContext } from "react";
import { ApplicationContext, State } from "./ApplicationContext";
import styled from "styled-components";
import { BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import ChannelIndex from "../ChannelContent/ChannelIndex";


const Wrapper = 
  styled.div`
  min-height: 95vh;
  color: white;
  font-family: 'Hind', sans-serif;
  @media(min-width: 450px){
    display: grid;
    grid-template-columns: 257px 1fr;
  }
  `;


const App = 
  () => {
        const { 
            applicationState
        } =
            useContext(ApplicationContext);

    
        // useEffect(() => {
        //     if (applicationState.name === "INITIAL_LOAD") {
        //         // TODO: Don't just hardcode the user ID here! :D 
        //         loadApplicationData("Nimmo");
        //     }
        // });


        const chooseState = 
            (state : State) => {
                switch(state.name) {
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
                { chooseState(applicationState) }
            </Router>
        );
  };


export default App;
