//Component
import { useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Alert from "./components/Alert";

// class App extends Component{
const App = () =>{
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     expense : [
  //       {id:1,charge:"렌트비",amount:1600},
  //       {id:2, charge:"교통비", amount:400},
  //       {id:3, charge:"식비", amount:1200}
  //     ]
  //   }
  // }

  //항목목
const [charge, setCharge] = useState("");
//비용용
const [amount, setAmount] = useState(0);
//지출 리스트트
const [expense,setExpenses] = useState([]);
// 알림
const [alert, setAlert] = useState({show:false});
//수정 항목
const [id,setId] = useState('');
//수정 상태
const [edit, setEdit] = useState(false);


  const handleCharge = (e) =>{
    setCharge(e.target.value);
    console.log(e.target.value);
  }
  const handleAmount = (e) =>{
    setAmount(e.target.valueAsNumber);
    console.log(e.target.valueAsNumber);
  }

  const handleDelete = (id) =>{
    // console.log(id);
    const newExpense = expense.filter(expense => expense.id != id)
    console.log(newExpense);
    setExpenses(newExpense);
    handleAlert({type:"danger",text:"항목이 삭제되었습니다."});
    /*React State : 리액트에서 데이터가 변할 때 화면을 다시 렌더링 하는 것 */
  }
  const clearItem = () =>{
    setExpenses([]);
    handleAlert({type:"danger",text:"전체 항목 삭제되었습니다."});
  }

  const handleSubmit = (e) =>{
 // 밑의 prevent는 기본동작을 막겠다. 즉 새로고침 안되게
  e.preventDefault();
  if(charge !=="" && amount >= 0){
    if(edit){
      //수정
    const newExpenses = expense.map(item => {
      return item.id === id ? {...item, charge, amount} :item
    })
    setExpenses(newExpenses);
    handleAlert({type:"success",text:"수정이 완료되었습니다."});
    setEdit(false);
    setCharge("");
    setAmount(0);
    }else{
      //추가
    const newExpense = {id:crypto.randomUUID(),charge:charge,amount:amount};
    console.log(newExpense);
    const newExpenses = [...expense,newExpense]
    setExpenses(newExpenses);
    setCharge("");
    setAmount(0);
    handleAlert({type:"success",text:"항목에 추가되었습니다."});
    }
    }else{
      console.log("error");
      handleAlert({type:"danger",text:"값을 입력하세요."})
    }
  }
  const handleAlert = ({type,text}) =>{
    setAlert({show:true,type,text});
    console.log(type);
    setTimeout(() =>{
      setAlert({show:false});
    },3000);
  }
  const handleEdit = (id) =>{
    const exp = expense.find(item => item.id === id);
    // console.log('이이잉');
    // console.log(exp);
    setId(id);
    setCharge(exp.charge);
    setAmount(exp.amount);
    console.log(id);
    console.log(exp.charge);
    console.log(exp.amount);
    setEdit(true);
  }
    return (
      <div className="main-container" >
        {alert.show ? <Alert type={alert.type} text={alert.text}/>:null}
        <h1>예산계산기</h1>
        <div style={{width: '100%',backgroundColor: 'white',padding: '1rem'}}>
        {/*주석은 이렇게 적는거임 */}
        {/*여긴 입력폼 */}
        <ExpenseForm
                  handleCharge={handleCharge}
                  charge = {charge}
                  handleAmount={handleAmount}
                  amount = {amount}
                  handleSubmit = {handleSubmit}
                  edit = {edit}
                  />
        </div>
        <div style={{width: '100%',backgroundColor: 'white',padding: '1rem'}}>
        {/*리스트 */}
        <ExpenseList 
        initialExpense={expense}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        clearItem={clearItem}
        />
        </div>
        <div style={{display:'flex', justifyContent:'end', marginTop: '1rem'}}>
          <p style={{fontSize:'2rem'}}> 
            총지출 :<span>
              {/*.reduce() 배열의 각 요소에 대해 주어진
              reduce 함수를 실행하고 하나의 결과값을 반환
              acc:누산기, cur:현재값, idx:현재 인덱스,src:원본배열 */}
              {expense.reduce((acc, cur)=>{
                return(acc += cur.amount);
              } ,0)} 원 </span>
          </p>
        </div>
      </div>

    )
  
}

export default App;