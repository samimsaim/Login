import React,{useState} from 'react';
import LoginForm from "./component/LoginForm";
import Cod from "./component/cod";
import { config } from './config';
import { PublicClientApplication } from "@azure/msal-browser";
import { Component } from "react";
import Header from './component/header';
import Footer from './component/footer';

class App extends Component {

constructor(props) {
  super(props);
  this.state = {
    error: null,
    isAuthenticated: false,
    user: {}
  };
  this.login = this.login.bind(this)

  this.PublicClientApplication = new PublicClientApplication({
    auth: {
      clientId: config.appId,
      redirectUri: config.redirectUri,
      authority: config.authority
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: true
    }
  });
}
async login(){
  try {
    await this.PublicClientApplication.loginPopup(
      {
      scopes:config.scopes,
      prompt: "select_account"
    });
    this.setState({isAuthenticated:true})
  }
  catch(err){
    this.setState({
      isAuthenticated:false,
      user: {},
      error: err
    });
  }
}

logout() {
  this.PublicClientApplication.logout();
}

render(){
  return (
    <div>
  <Header />
  <Cod />
  <Footer />
    </div>
  );
}


}






export default App;
