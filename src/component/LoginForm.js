import React, {useState} from "react";
import Page from "./cod";
import { config } from '../config';
import { PublicClientApplication } from "@azure/msal-browser";
import { Component } from "react";

class LoginForm extends Component {

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
    {this.state.isAuthenticated ? <p><Page /></p>:
    <form className="form">
    <div className="form-inner">
    <h2>Login</h2>
    <div className="form-group">
    <label htmlFor="email">Email: </label>
    <input type="email" name="email" id="email" />
    </div>
    <div className="form-group">
    <label htmlFor="password">password: </label>
    <input type="password" name="password" id="password" />
    </div>
    <input type="submit" value="LOGIN" /> <br />
    <br />
    <input type="button" value="login with azure" onClick={() => this.login()} />

    </div>
    </form>
}
    </div>
  )
}
}
export default LoginForm;
