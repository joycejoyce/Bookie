import { Component } from "react";
import "./scss/App.scss";
import Navbar from "./components/Navbar.js";
import Home from "./components/Home.js";
import CreateAccount from "./components/CreateAccount.js";
import SignIn from "./components/SignIn.js";
import Welcome from "./components/Welcome.js";
import UserProfile from "./components/UserProfile.js";
import Explore from "./components/Explore.js";
import ExploreResult from "./components/ExploreResult.js";
import FilterList from "./components/sub/FilterList.js";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#118AB2'
    },
    secondary: {
      main: '#073B4C'
    }
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: null
    }
  }

  setIsAuthenticated = (isAuthenticated) => {
    this.setState({ isAuthenticated });
  }

  setUser = (user) => {
    this.setState({ user });
  }

  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setIsAuthenticated: this.setIsAuthenticated,
      setUser: this.setUser
    };

    return (
      <ThemeProvider theme={theme}>
        <Router>
          <div className="container">
            <Navbar auth={authProps} />
            <Switch>
              <Route path="/createAccount" component={CreateAccount} />
              <Route path="/welcome" component={Welcome} />
              <Route path="/signIn" render={(props) => <SignIn {...props} auth={authProps} />} />
              <Route path="/userProfile" render={(props) => <UserProfile {...props} auth={authProps} />} />
              <Route path="/explore" render={(props) => <Explore {...props} auth={authProps} />} />
              <Route path="/exploreResult" render={(props) => <ExploreResult {...props} auth={authProps} />} />
              <Route path="/" render={(props) => <Explore {...props} auth={authProps} />} />
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
