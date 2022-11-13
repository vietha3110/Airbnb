import React, {useState, useEffect} from 'react';
import { Switch } from 'react-router-dom';
// import SignUpFormPage from './components/SignupFormModal';
import { useDispatch } from "react-redux";
import * as sessionActions from "./store/session";
import Navigation from './components/Navigation';
import { ListingSpots } from './components/Listing-Spots';
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
         <ListingSpots/>
        </Switch>
      )}
    </>
  );
}


export default App;
