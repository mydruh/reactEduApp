import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Profile from './Profile';
import AddProject from './AddProject';
import ListProjects from './ListProjects';
import EditProject from './EditProject';
import PassProject from './PassProject';
import EditProfile from './EditProfile';
import EditUserEmail from './EditUserEmail';
import EditUserPassword from './EditUserPassword';
import ProjectPage from './ProjectPage';
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={ListProjects} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/add_project" component={AddProject} />
          <PrivateRoute exact path="/list_projects" component={ListProjects} />
          <PrivateRoute exact path="/edit_project" component={EditProject} />
          <PrivateRoute exact path="/pass_project" component={PassProject} />
          <PrivateRoute exact path="/edit_profile" component={EditProfile} />
          <PrivateRoute exact path="/edit_user_email" component={EditUserEmail} />
          <PrivateRoute exact path="/edit_user_password" component={EditUserPassword} />
          <PrivateRoute exact path="/project_page" component={ProjectPage} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
