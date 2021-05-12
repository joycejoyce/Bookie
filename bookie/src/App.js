import './scss/App.scss';
import CreateAccount from './components/CreateAccount';
import SignIn from './components/SignIn';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={CreateAccount} />
        <Route path="/createAccount" component={CreateAccount} />
        <Route path="/signIn" component={SignIn} />
      </Switch>
    </Router>
  );
}

export default App;
