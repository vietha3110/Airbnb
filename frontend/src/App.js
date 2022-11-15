import React, {useState, useEffect} from 'react';
import { Switch, Route } from 'react-router-dom';
// import SignUpFormPage from './components/SignupFormModal';
import { useDispatch } from "react-redux";
import * as sessionActions from "./store/session";
import Navigation from './components/Navigation';
import { ListingSpots } from './components/Listing-Spots';
import { CreateSpotForm } from './components/CreateNewSpot/CreateSpotForm';
import { SpotDetail } from './components/Listing-Spots/ListingSpotDetail';
function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <ListingSpots />
          </Route>
          <Route path='/spots/new'>
              <CreateSpotForm/>
          </Route>
          <Route path='/spots/:spotId'>
            <SpotDetail/>
          </Route>
        </Switch>
      )}
    </>
  );
}


export default App;
