import "./scss/App.scss";
import CreateAccount from "./components/CreateAccount.js";
import SignIn from "./components/SignIn.js";
import VerifyCreateAccount from "./components/VerifyCreateAccount.js";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/createAccount" component={CreateAccount} />
        <Route path="/signIn" component={SignIn} />
        <Route path="/" component={SignIn} />
        {/*<Route path="/welcome" component={Welcome} />*/}
        {/*<Route path="/verifyCreateAccount" component={VerifyCreateAccount} />*/}
      </Switch>
    </Router>
  );
}

export default App;
