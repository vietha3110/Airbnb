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
import { Footer } from './components/Footer';
import { UserProfile } from './components/UserProfile';
function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);
  
  return (
    <div className='page-container'>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <ListingSpots />
            <Footer/>
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
          <Route path='/bookings'>
            <UserProfile/>
          </Route>
          <Route >
            <div className='not-found'>
              <h2>"Page Not Found"</h2>
            </div>   
        </Route>
        </Switch>
      )}
    </div>
  );
}


export default App;
