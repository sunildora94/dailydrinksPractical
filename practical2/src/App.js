import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import './assets/css/bootstrap.min.css';
import * as actionType from './store/Actions';
import {TransactionsComponent}  from './Transactions';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
        enteredAmount: '',
        errorMsg: ''
    };

    this.handleChange = this.handleChange.bind(this);//=== to handle the input value changes
    this.handleAddExpense = this.handleAddExpense.bind(this);//=== to handle the add expense value
    this.handleRemoveExpense = this.handleRemoveExpense.bind(this);//=== to handle the remove expense value
  }

  /************************************************************
   * Handle input values
   ************************************************************/
  handleChange = (e) => {

    const amount_val = e.target.value;
    if( this.isEmpty(amount_val) ){
      this.setState({ enteredAmount: ''});
    } else if( typeof parseInt(amount_val) === "number" && parseInt(amount_val) > 0 ){
      this.setState({ enteredAmount: amount_val, errorMsg: ''});
    } else{
      this.setState({errorMsg: 'Enter positive number.'});
    }
    
  }

  /************************************************************
   * Handle Add button to increase expense
   ************************************************************/
  handleAddExpense = () => {

    let amount_val = this.state.enteredAmount;
    let totalAmount = this.props.totalAmount;
    let expenseEntries = this.props.expenseEntries;
    if( !this.isEmpty(amount_val) && typeof parseInt(amount_val) === "number" && parseInt(amount_val) > 0 ){
      var now = new Date();
      var isoString = now.toISOString();
      expenseEntries.push({'time': isoString, 'amount': parseInt(amount_val), 'action': 'Add'});
      this.props.onUpdateExpenses(expenseEntries);
      this.props.onUpdateExpenseTotalAmount( parseInt(totalAmount) + parseInt(amount_val) );
      this.setState({ enteredAmount: ''});
    } else{
      this.setState({errorMsg: 'Enter positive number.'});
    }

  }

  /************************************************************
   * Handle Remove button to ecrease expense
   ************************************************************/
  handleRemoveExpense = () => {

    const amount_val = this.state.enteredAmount;
    let totalAmount = this.props.totalAmount;
    let expenseEntries = this.props.expenseEntries;
    if( !this.isEmpty(amount_val) && typeof parseInt(amount_val) === "number" && parseInt(amount_val) > 0 ){
      var now = new Date();
      var isoString = now.toISOString();
      expenseEntries.push({'time': isoString, 'amount': parseInt(amount_val), 'action': 'Remove'});
      this.props.onUpdateExpenses(expenseEntries);
      this.props.onUpdateExpenseTotalAmount( parseInt(totalAmount) - parseInt(amount_val) );
      this.setState({ enteredAmount: ''});
    } else{
      this.setState({errorMsg: 'Enter positive number.'});
    }

  }

  /************************************************************
   * Check weather values is empty or not
   ************************************************************/
  isEmpty = value => {    
    let k = value === null || value === undefined || value.length === 0;
    return k
  }

  /************************************************************
   * Render the component output
   ************************************************************/
  render() {

    return (
      <div class="container">
        <div className="row">
          <div className="col-md-12">
            <br/>
            <center><h1 className="font-weight-bold">Expense Tracker - Basic</h1></center>
            <div className="card">
              <div className="card-body text-center">
                <h5 className="card-title">Balance : {this.props.totalAmount}</h5>
                <div className="card-text">

                  <div className={'form-group' + (!this.isEmpty(this.state.errorMsg) ? ' has-error' : '')}>
                    <input type="number" className="" min="1" name="amount" value={this.state.enteredAmount} onChange={this.handleChange}/>  
                  </div>

                  {!this.isEmpty(this.state.errorMsg) &&
                    <div className="alert alert-danger" role="alert">
                      {this.state.errorMsg}
                    </div>
                  }

                  <div className={'form-group'}>
                    <button className="mr-2" onClick={this.handleAddExpense}>Add</button>
                    <button onClick={this.handleRemoveExpense}>Remove</button>
                  </div>

                </div>
              </div>
            </div>

            <div className="card mt-5">
              <div className="card-body">
                <h5 className="card-title font-weight-bold">Transactions : </h5>
                <div className="card-text transaction_list scrollbar">
                  <TransactionsComponent/>
                </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
  
/************************************************************
   * Manage redux actions & state values
   ************************************************************/
const mapStateToProps = state => {
  return {
    totalAmount: state.totalAmount,
    expenseEntries: state.expenseEntries
  }
};

const mapDispatchToProps = dispatch => {

  return {
    onUpdateExpenses: (remove_value) => {
      dispatch({
          type: actionType.MANAGE_EXPENSE,
          data: remove_value
      });
    },
    onUpdateExpenseTotalAmount: (amount_value) => {
      dispatch({
          type: actionType.UPDATE_TOTAL_AMOUNT,
          data: amount_value
      });
    }
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(App);

