import './App.css';
import { KeyboardEvent } from 'react';

function App() {
  const operation=["+","-","*","/","%","="];
  let pre_op="+";
  let pre_num=0;
  let flag=0;
  
  
  const calculate=(num_op: string)=>{
    let n=num_op.length;
    const cur_output_ele=document.getElementById("output") as HTMLDivElement;
    let cur_op=num_op.charAt(n-1);
    let cur_num=num_op.slice(0,n-1);

    switch(pre_op){
      case "+":
        pre_num=pre_num+Number(cur_num);
        break;
      case "-":
        pre_num=pre_num-Number(cur_num);
        break;
      case "*":
        pre_num=pre_num*Number(cur_num);
        break;
      case "/":
        if (cur_num==="0"){
          cur_output_ele.innerText="Divided by zero error!";
          return;
        }
        pre_num=pre_num/Number(cur_num);
        break;
      case "%":
        if (cur_num==="0"){
          cur_output_ele.innerText="Divided by zero error!";
          return;
        }
        pre_num=pre_num%Number(cur_num);
        break;
      default:
        cur_output_ele.innerText="Error input";
        return;
    }
    cur_output_ele.innerText=pre_num.toString();
    if (cur_op==="="){
      pre_num=0;
      pre_op="+";
      flag=0;
      return;
    }
    pre_op=cur_op;
    flag=0;
    
  }

  const click_button =async (fields: string) => { 
    const cur_output_ele=document.getElementById("output") as HTMLDivElement;  

    switch(fields){
      case "AC":
        cur_output_ele!.innerText="0";
        pre_op="+";
        pre_num=0;
        flag=0;
        break;
      case "C":
        if ( cur_output_ele!.innerText!=="0"){
          cur_output_ele!.innerText= cur_output_ele!.innerText.slice(0,-1);
        }
        break;
      case "+/-":
        if ( cur_output_ele!.innerText.charAt(0)!=="-"){
          cur_output_ele!.innerText= "-".concat(cur_output_ele!.innerText);
        }
        else{
          cur_output_ele!.innerText= cur_output_ele!.innerText.slice(1);
        }
        break;
      default:
        if ( flag===0){
          cur_output_ele!.innerText= fields;
          flag=1;
        }
        else {
          cur_output_ele!.innerText=cur_output_ele!.innerText.concat(fields);
          if (operation.includes(fields)){
            calculate(cur_output_ele!.innerText);
          }
        }
        break;
    }


  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key);
    (document.getElementById("output") as HTMLDivElement)!.innerText="1";
  }

  return (
    <div className="App">
      <div className='Frame'>
          <div id="output" tabIndex={0} onKeyDown={handleKeyPress}>0</div>
          <table>
            <tbody>
            <tr className='num_oper'>
              <td><button onClick={()=>click_button("7")}>7</button></td>
              <td><button onClick={()=>click_button("8")}>8</button></td>
              <td><button onClick={()=>click_button("9")}>9</button></td>
              <td><button onClick={()=>click_button("+")}>+</button></td>
              <td><button onClick={()=>click_button("-")}>-</button></td>
            </tr>
            <tr className='num_oper'>
              <td><button onClick={()=>click_button("4")}>4</button></td>
              <td><button onClick={()=>click_button("5")}>5</button></td>
              <td><button onClick={()=>click_button("6")}>6</button></td>
              <td><button onClick={()=>click_button("*")}>*</button></td>
              <td><button onClick={()=>click_button("/")}>/</button></td>
            </tr>
            <tr className='num_oper'>
              <td><button onClick={()=>click_button("1")}>1</button></td>
              <td><button onClick={()=>click_button("2")}>2</button></td>
              <td><button onClick={()=>click_button("3")}>3</button></td>
              <td><button onClick={()=>click_button("%")}>%</button></td>
              <td><button onClick={()=>click_button("=")}>=</button></td>
            </tr>
            <tr className='num_oper'>
              <td><button onClick={()=>click_button("0")}>0</button></td>
              <td><button onClick={()=>click_button(".")}>.</button></td>
              <td><button onClick={()=>click_button("+/-")}>+/-</button></td>
              <td><button onClick={()=>click_button("C")}>C</button></td>
              <td><button onClick={()=>click_button("AC")}>AC</button></td>
            </tr>
            </tbody>
          </table>
      </div>
    </div>
  );
}

export default App;
