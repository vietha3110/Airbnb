import React, {useState, useEffect} from 'react';
import { Switch, Route } from 'react-router-dom';
// import SignUpFormPage from './components/SignupFormModal';
import { useDispatch } from "react-redux";
import * as sessionActions from "./store/session";
import Navigation from './components/Navigation';
import { ListingSpots } from './components/Listing-Spots';
import { CreateSpotForm } from './components/CreateNewSpot/CreateSpotForm';
import { SpotDetail } from './components/Listing-Spots/ListingSpotDetail';
import { UserSpots } from './components/UserSpots';
function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    console.log(`im running`);
    dispatch(sessionActions.restoreUser()).then(() => {
      console.log(`*************************`);
      setIsLoaded(true)
    });
    return (() => {
      console.log(`Use Effect return running`)
    });
  }, [dispatch]);
  
  return (
    <div>
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
          <Route path='/hosting'>
            <UserSpots/>
          </Route>
        </Switch>
      )}
    </div>
  );
}


export default App;
