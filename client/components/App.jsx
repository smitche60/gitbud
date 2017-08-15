import React from 'react';
<<<<<<< HEAD
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
=======
import { BrowserRouter, Route, Switch} from 'react-router-dom';
>>>>>>> Create reducer for projects list, pass props down from App to ProjectList
import { connect } from 'react-redux';
import axios from 'axios';

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import ActionHome from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';
import { fullWhite } from 'material-ui/styles/colors';

import Nav from './Nav';
import AppDrawer from './AppDrawer';
import Landing from './Landing';
import UserDetails from './UserDetails';
import ProjectDetails from './ProjectDetails';
import ProjectList from './ProjectList';
import Questionnaire from './Questionnaire';
import NotFound from './NotFound';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
    };
    this.getUsers();
    this.getProjects();
    this.navTap = this.navTap.bind(this);
  }

  getUsers() {
    axios.get('/API/users')
      .then(users => {
        this.props.addUsers(users.data);
      })
      .catch(console.error);
  }

  getProjects() {
    axios.get('/API/projects/')
      .then((project) => {
        // console.log('line 41: ', project.data);
        this.props.listProjects(project.data); //project.data => array
      })
      .catch(console.error);
  }

  navTap() {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <AppBar title='GitBud' onLeftIconButtonTouchTap={ this.navTap } iconElementRight={ <Link to='/'><IconButton><ActionHome color={ fullWhite }/></IconButton></Link> }/>
          <AppDrawer open={ this.state.drawerOpen } changeOpenState={ open => this.setState({ drawerOpen: open }) } closeDrawer={ () => this.setState({ drawerOpen: false}) }/>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/signup" component={Questionnaire} />
            <Route exact path="/projects"
              render={() => (
                <ProjectList projects={this.props.projects} />
              )}
            />
            {/* <Route exact path="/projects" component={ProjectList} /> */}
            <Route path="/projects/:id" component={ProjectDetails} />
            <Route path="/user/:id" component={UserDetails} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.message,
    projects: state.projects
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeString: () => dispatch({
      type: 'CHANGE_STRING',
      text: 'some other message'
    }),
    addUsers: users => dispatch({
      type: 'USERS_ADD',
      users: users
    }),
    listProjects: (projects) => dispatch({
      type: 'LIST_PROJECTS',
      projects: projects,
    }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
