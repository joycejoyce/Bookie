import { Component } from "react";
import "./scss/App.scss";
import Navbar from "./components/Navbar.js";
import Home from "./components/Home.js";
import CreateAccount from "./components/CreateAccount.js";
import SignIn from "./components/SignIn.js";
import ForgotPassword from "./components/ForgotPassword.js";
import SetNewPassword from "./components/SetNewPassword.js";
import SetNewPasswordConfirm from "./components/SetNewPasswordConfirm.js";
import Welcome from "./components/Welcome.js";
import UserProfile from "./components/UserProfile.js";
import Explore from "./components/Explore.js";
import ExploreResult from "./components/ExploreResult.js";
import LoadingIcon from "./components/sub/LoadingIcon.js";
import Library from "./components/Library.js";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Auth } from 'aws-amplify';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#118AB2'
    },
    secondary: {
      main: '#073B4C'
    }
  },
  typography: {
    fontFamily: '"Roboto-Regular", "Montserrat-SemiBold"'
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      user: null
    }
  }

  setIsAuthenticated = (isAuthenticated) => {
    this.setState({ isAuthenticated });
  }

  setUser = (user) => {
    this.setState({ user });
  }

  async componentDidMount() {
    try {
      const session = await Auth.currentSession();
      this.setIsAuthenticated(true);
      console.log({ session });

      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user);
      console.log({ user });
    } catch(err) {
      console.error("App.js / componentDidMount()", { err });
    }

    this.setState({ isAuthenticating: false });
  }

  render() {
    const auth = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setIsAuthenticated: this.setIsAuthenticated,
      setUser: this.setUser
    };

    const userAuth = this.state.user ? { username: this.state.user.username } : null;

    return (
      !this.state.isAuthenticating &&
      <ThemeProvider theme={theme}>
        <Router>
          <div className="container">
            <Navbar auth={auth} />
            <LoadingIcon />
            <Switch>
              <Route path="/createAccount" component={CreateAccount} />
              <Route path="/welcome" component={Welcome} />
              <Route path="/signIn" render={(props) => <SignIn {...props} auth={auth} /> } />
              <Route path="/userProfile" render={(props) => <UserProfile auth={auth} />} />
              <Route path="/explore" component={Explore} />
              <Route path="/exploreResult" render={(props) => <ExploreResult {...props} userAuth={userAuth} /> } />
              <Route path="/library" render={(props) => <Library {...props} userAuth={userAuth} /> } />
              <Route path="/forgotPassword" component={ForgotPassword} />
              <Route path="/setNewPassword" component={SetNewPassword} />
              <Route path="/setNewPasswordConfirm" component={SetNewPasswordConfirm} />
              <Route path="/" component={SetNewPasswordConfirm} />
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
