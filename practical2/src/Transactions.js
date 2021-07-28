import React from 'react';
import { useSelector } from 'react-redux';

// const TransactionsComponent = ({ value }) => {
// const TransactionsComponent = (props) => {
export const TransactionsComponent = (props) => {
  const expenseEntries = useSelector((state) => state.expenseEntries);
  let expenseList = (
    expenseEntries.map((expenseData, index) => {
        return (<><span key={index}>{expenseData.time} - {expenseData.amount} - {expenseData.action} </span><br/></>);
    })
  );

  return expenseList;
}

//  export default TransactionsComponent;

