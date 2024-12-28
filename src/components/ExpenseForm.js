import { Component } from "react";
import "./Expense.css";
import {MdSend} from "react-icons/md";

{/* props(): 컴퍼넌트끼리 주고받을때 쓰는거 
    properties 속성*/}
const ExpenseForm = ({handleCharge, charge, handleAmount, amount, handleSubmit, edit})=>{
        return(
            <form onSubmit={handleSubmit}>
                <div className="form-center">
                    <div className="form-group">
                        <label htmlFor="charge">지출내용</label>
                        <input type="text"
                        className="form-control"
                        id="charge"
                        name="charge" 
                        value={charge}
                        placeholder="예)주유비"
                        onChange={handleCharge}/>
                        
                    </div>
                    <div className="form-group">
                    <label htmlFor="amount">비용</label>
                        <input type="number"
                        className="form-control"
                        id="amount"
                        name="amount" 
                        value={amount}
                        placeholder="예)100"
                        onChange={handleAmount}/>
                    </div>
                </div>

                <button type="submit" className="btn">
                    {edit?"수정":"제출"}<MdSend className="btn"/>
                </button>
            </form>
        )
    
}
export default ExpenseForm