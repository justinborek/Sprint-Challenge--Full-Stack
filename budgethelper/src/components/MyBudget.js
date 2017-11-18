import React, { Component } from 'react';
import axios from 'axios';

class MyBudget extends Component{
  render(){
    const budgetEndpoint = "http://localhost:3000/api/accounts";
    const budget = axios.get(budgetEndpoint);
    console.log(budget);
    return (
      <div>
        <div>test</div>
      </div>
    )
  }
}

export default MyBudget;