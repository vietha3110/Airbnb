import React, {useState, useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
// import SignUpFormPage from './components/SignupFormModal';
import { useDispatch } from "react-redux";
import * as sessionActions from "./store/session";
import Navigation from './components/Navigation';

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
         
        </Switch>
      )}
    </>
  );
}


export default App;
