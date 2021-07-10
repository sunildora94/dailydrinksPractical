import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionType from './Store/Actions';
import './App.css';

class HomePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      orderId: '',
      orderName: '',
      orderPrice: '',
      orderDesc: '',
      submitted: false,
      errorMsg: '',
      editOrderFlag: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  isEmpty = value => {    
    let k = value === null || value === undefined || value.length === 0;
    return k
  }

  getOrdersList = () => {
    let allOrders = this.props.allOrders;

    let orderList = (
      allOrders.map((orderData, index) => {
        return(
          <tr key={index}>
            <td>{orderData.orderId}</td>
            <td>{orderData.orderName}</td>
            <td>{orderData.price}</td>
            <td>{orderData.desc}</td>
            <td>
              <button onClick={this.handeleEdit.bind(this, orderData.orderId)}>Edit</button> | <button href="#" onClick={this.handeleDelete.bind(this, orderData.orderId)}>Delete</button>
            </td>
          </tr>
        )
      })
    );

    return orderList;
  }

  handeleDelete = (orderId, event) => {     
    let elmBLock = [];
    this.props.allOrders.forEach((order, index) => {
            if(order.orderId !== orderId){
                elmBLock.push(order);
            }
    });
    this.props.manageDeleteOrder(elmBLock)
  }

  handeleEdit = (orderId, event) => {   
    let editOrder = this.props.allOrders.filter(user => (user.orderId === orderId) );
    if( !this.isEmpty(editOrder) ){
      this.props.manageEditOrder(editOrder);
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    console.log(name, value)
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let allOrders = this.props.allOrders;

    this.setState({ submitted: true });
    let editOrderData = this.props.editOrderData;
    const { orderId, orderName, orderPrice, orderDesc } = this.state;
    if (orderName && orderPrice) {
      if( !this.isEmpty(editOrderData) ){
        let elmBLock = [];
        allOrders.forEach((order, index) => {
          if(order.orderId === orderId){
            
            order.orderName = orderName;
            order.price = orderPrice;
            order.desc = orderDesc;
          }
          elmBLock.push(order);
        });
        this.setState({orderId: '', orderName: '', orderPrice: '', orderDesc: '', editOrderFlag: false, submitted: false})
        this.props.manageUpdateOrder(allOrders);
        this.props.manageEditOrder(null);
      } else{
        let newOrderId = 'order_' + (allOrders.length + 1);
        allOrders.push({orderId: newOrderId, orderName: orderName, price: orderPrice, desc: orderDesc});
        this.setState({orderId: '', orderName: '', orderPrice: '', orderDesc: '', submitted: false})
        this.props.manageInsertOrder(allOrders);
      }
    }
  }

  handeleLogout = () => {
    this.props.manageLoginStatus(false);
    this.props.history.push("/");
  }

  static getDerivedStateFromProps(props, state){
    let editOrderData = props.editOrderData;
    if( editOrderData !== null && editOrderData !== undefined && state.editOrderFlag === false ){
      editOrderData = editOrderData[0];
      return {...state, ...{orderId: editOrderData.orderId, orderName: editOrderData.orderName, orderPrice: editOrderData.price, orderDesc: editOrderData.desc, editOrderFlag: true}};
    } else return {...state};
  }

  render() {
    const { orderName, orderPrice, orderDesc, submitted, errorMsg } = this.state;
    return (
      <div className="container">
          <h1>Manage Orders</h1> 
          <div className="text-right">
            <a href="#" onClick={this.handeleLogout}>Logout</a>
          </div>
          

          <div className="row">
            <div className="col-md-12">
              <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !orderName ? ' has-error' : '')}>
                        <label htmlFor="orderName">Order Name</label>
                        <input type="text" className="form-control" name="orderName" value={orderName} onChange={this.handleChange} />
                        {submitted && !orderName &&
                            <div className="help-block">order Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !orderPrice ? ' has-error' : '')}>
                        <label htmlFor="orderPrice">Order Price</label>
                        <input type="number" className="form-control" name="orderPrice" value={orderPrice} onChange={this.handleChange} />
                        {submitted && !orderPrice &&
                            <div className="help-block">order Price is required</div>
                        }
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor="orderDesc">Order Description</label>
                        <input type="text" className="form-control" name="orderDesc" value={orderDesc} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                      {submitted && !this.isEmpty(errorMsg) &&
                        <div className="help-block">{errorMsg}</div>
                      }
                      <button className="btn btn-primary">Submit Order</button>
                    </div>
                </form>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              {/* <div className="card">
                <h5 className="card-title">All Order</h5> */}
                <table id="orders">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Order Name</th>
                      <th>Order Price</th>
                      <th>Order Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                    
                  <tbody>
                  {this.getOrdersList()}  
                  </tbody>
                </table>
                
              {/* </div> */}
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
    },
    manageDeleteOrder: (orders) => {
      dispatch({
          type: actionType.DELETE_ORDER,
          data: orders
      });
    },
    manageInsertOrder: (orders) => {
      dispatch({
          type: actionType.INSERT_ORDER,
          data: orders
      });
    },
    manageEditOrder: (orders) => {
      dispatch({
          type: actionType.EDIT_ORDER,
          data: orders
      });
    },
    manageUpdateOrder: (orders) => {
      dispatch({
          type: actionType.UPDATE_ORDER,
          data: orders
      });
    },
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
