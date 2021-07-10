import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import './assets/css/bootstrap.min.css';
import * as actionType from './Store/Actions';

class App extends Component {

  constructor(props) {
    super(props);

    // reset login status
    // this.props.logout();

    this.state = {
        username: '',
        password: '',
        submitted: false,
        errorMsg: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let loginUserDetails = this.props.loginUserDetails;

    this.setState({ submitted: true });
    const { username, password } = this.state;
    if (username && password) {
      let chkUserExists = loginUserDetails.filter(user => (user.userName === username && user.password === password) );
      if( !this.isEmpty(chkUserExists) ){
        this.setState({errorMsg: ''});
        this.props.manageLoginStatus(true);
        // return (<Redirect to="/home" />);
        this.props.history.push("/home");
      } else{
        this.setState({errorMsg: 'Please enter correct username and password.'});
      } 
    }
  }

  isEmpty = value => {    
    let k = value === null || value === undefined || value.length === 0;
    return k
  }

  render() {
    const { username, password, submitted, errorMsg } = this.state;
    return (
      <div class="container">
        <div className="row">
        <div className="col-md-12">
            <h2>Login</h2>
            <form name="form" onSubmit={this.handleSubmit}>
                <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                    {submitted && !username &&
                        <div className="help-block">Username is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                    {submitted && !password &&
                        <div className="help-block">Password is required</div>
                    }
                </div>
                <div className="form-group">
                  {submitted && !this.isEmpty(errorMsg) &&
                    <div className="help-block">{errorMsg}</div>
                  }
                  <button className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
      </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    allOrders: state.allOrders,
    editOrderData: state.editOrderData,
    loginUserDetails: state.loginUserDetails,
    loginStatus: state.loginStatus
  }
};

const mapDispatchToProps = dispatch => {

  return {
    manageLoginStatus: (login_status) => {
        dispatch({
            type: actionType.LOGIN_STATUS,
            data: login_status
        });
    }
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(App);
