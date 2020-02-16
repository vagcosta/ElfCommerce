import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import LoginForm from './login/LoginForm';
import ResetForm from './login/ResetForm';
import Footer from '../components/Footer';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFlipped: false,
    };
  }

  onFlip = () => {
    this.setState({
      isFlipped: !this.state.isFlipped,
    });
  }

  render() {
    return (
      <div className="login-page">
        <div id="login-box" style={{ transform: `perspective(600px) rotateY(${!this.state.isFlipped ? '0deg' : '-180deg'})` }}>
          <p id="login-site-name">
            <FormattedMessage id="site.name" />
          </p>
          <LoginForm /><br />
          <Button color="link" id="forgot-pwd" onClick={this.onFlip}>
            <FormattedMessage id="sys.forgotPwd" />
          </Button>
        </div>
        <div id="pwd-box" style={{ transform: `perspective(600px) rotateY(${!this.state.isFlipped ? '180deg' : '0deg'})` }}>
          <p id="login-site-name">
            <FormattedMessage id="sys.forgotPwd" />
          </p>
          <ResetForm /><br />
          <Button color="link" id="forgot-pwd" onClick={this.onFlip}>
            <FormattedMessage id="sys.signin" />
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;
