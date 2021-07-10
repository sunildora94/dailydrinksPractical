import * as actionsTypes from './Actions';

/* Initial states */
const initialState = {
    allOrders: [{orderId: 'order_1', orderName: 'Soft Drink', price: 25, desc: ''}, {orderId: 'order_2', orderName: 'Milk Shack', price: 50, desc: ''}],
    editOrderData: null,
    loginStatus: false, //false = not logged in & true = logged in
    loginUserDetails: [{userName: 'deny', password: 'deny123'}, {userName: 'roy', password: 'roy123'}, {userName: 'maddy', password: 'maddy123'}]
}

const reducer = (state = initialState, action) => {

    switch(action.type){
        
        case actionsTypes.INSERT_ORDER:

            return insert_order(state, action);

        case actionsTypes.EDIT_ORDER:

            return edit_order(state, action);

        case actionsTypes.UPDATE_ORDER:

            return update_order(state, action);

        case actionsTypes.DELETE_ORDER:

            return delete_order(state, action);
            
        default:    

            return state;
    }

}

const insert_order = (state, action) => {
    return { ...state, allOrders: action.data};
}

const edit_order = (state, action) => {
    return { ...state, editOrderData: action.data};
}

const update_order = (state, action) => {
    return { ...state, allOrders: action.data};
}
const delete_order = (state, action) => {
    return { ...state, allOrders: action.data};
}

export default reducer;