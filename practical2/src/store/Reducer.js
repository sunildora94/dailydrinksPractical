import * as actionsTypes from './Actions';

/* Initial state */
const initialState = {
    totalAmount: 0,
    expenseEntries: []
}

const reducer = (state = initialState, action) => {

    switch(action.type){
        
        case actionsTypes.MANAGE_EXPENSE:

            return manage_expense(state, action);

        case actionsTypes.UPDATE_TOTAL_AMOUNT:

            return update_total_amount(state, action);
            
        default:    

            return state;
    }

}

/* pdate state based on the Action functions */
const manage_expense = (state, action) => {
    return { ...state, expenseEntries: action.data};
}

const update_total_amount = (state, action) => {
    return { ...state, totalAmount: action.data};
}

export default reducer;