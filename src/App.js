import React, { Component } from 'react';
import Movies from './components/movies';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/navBar';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import 'react-toastify/dist/ReactToastify.css';
import auth from './services/authService';
import './App.css';
import Logout from './components/logout';




class App extends Component {

  state = {};

  componentDidMount(){
   
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render(){
  return (
    <React.Fragment>
    <ToastContainer/>
     <NavBar user = {this.state.user} />

    <main className="container">
      
     <Switch>
      <Route path='/login' component={LoginForm}/>
      <Route path='/logout' component={Logout} />
      <Route path='/register' component={RegisterForm} />
      <Route 
             path="/movies/:id" 
             render={props => {
               if (!this.state.user) return <Redirect to='/login'/>;
               return <MovieForm {...props} />;
              }}
            />
      <Route path="/movies" 
             render={props => <Movies {...props} user={this.state.user}/>}     
             />
      <Route path="/customers" component={Customers}></Route>
      <Route path="/rentals" component={Rentals}></Route>
      <Route path="/not-found" component={NotFound}></Route>
      <Redirect exact from ='/' to='/movies'/>
      <Redirect to='/not-found' />
      </Switch>
    </main>
</React.Fragment>
  );
  }
}

export default App;
