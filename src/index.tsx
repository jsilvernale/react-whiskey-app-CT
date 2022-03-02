import React from 'react';
import ReactDOM from 'react-dom';
import { Home, Whiskey, SignIn } from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './main.css';
import { FirebaseAppProvider, AuthCheck } from 'reactfire';
import { Provider } from 'react-redux';
import 'firebase/auth';
import reportWebVitals from './reportWebVitals';
import { firebaseConfig } from './firebaseConfig'
import { store } from './Redux/store';

let myTitle = 'The Whiskey Collection'

ReactDOM.render(
    <React.StrictMode>
        <FirebaseAppProvider firebaseConfig={firebaseConfig} suspence={true}>
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path='/'>
                            <Home title={myTitle} />
                        </Route>
                        <Route path='/Whiskey'>
                            <Whiskey></Whiskey>
                        </Route>
                        <Route path='/SignIn'>
                            <SignIn></SignIn>
                        </Route>
                    </Switch>
                </Router>
            </Provider>
        </FirebaseAppProvider>
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
