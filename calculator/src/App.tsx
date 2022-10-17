import './App.css';

function App() {
  //define the operations for trigger calculate process
  const operation=["+","-","*","/","%","="];
  //record the previous operator for calculation
  let pre_op="+";
  //record the previous number for calculation
  let pre_num=0;
  //set a flag to record the status; 
  //flag=0: next input will be a new calculation; flag=1: next input is a continue calculation
  let flag=0;
  
  //function for calculation process
  //input format: XXXY. XXX is the number, and Y is the operater.
  const calculate=(num_op: string)=>{
    //get the length of input string
    let n=num_op.length;
    //get the output element from HTML
    const cur_output_ele=document.getElementById("output") as HTMLDivElement;
    //get the current operator at last position
    let cur_op=num_op.charAt(n-1);
    //get the current number by disards last operator
    let cur_num=num_op.slice(0,n-1);

    //make a calculation based on previous operator
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
        //take care of divided by zero error
        if (cur_num==="0"){
          cur_output_ele.innerText="Divided by zero error!";
          return;
        }
        pre_num=pre_num/Number(cur_num);
        break;
      case "%":
         //take care of divided by zero error
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

    //update display in the element "output"
    cur_output_ele.innerText=pre_num.toString();
    //in case of current operator "=", start a new calculation from next input
    if (cur_op==="="){
      pre_num=0;
      pre_op="+";
      flag=0;
      return;
    }
    //in other cases, continue calculation with current operator
    pre_op=cur_op;
    flag=0;
    
  }

  //get input from user click
  //input format: string from the panel, defined in table in the HTML
  const click_button =async (fields: string) => { 
    //get the element "output"
    const cur_output_ele=document.getElementById("output") as HTMLDivElement;  

    //deal with all the input cases
    switch(fields){
      //"AC" means reset everthing and start new calculation
      case "AC":
        cur_output_ele!.innerText="0";
        pre_op="+";
        pre_num=0;
        flag=0;
        break;
      //"C" means delete last input
      case "C":
        if ( cur_output_ele!.innerText.length>1){
          cur_output_ele!.innerText= cur_output_ele!.innerText.slice(0,-1);
        }
        else{
          cur_output_ele!.innerText="0";
        }
        break;
      //"+/-" means change the sign of current number  
      case "+/-":
        if ( cur_output_ele!.innerText.charAt(0)!=="-"){
          cur_output_ele!.innerText= "-".concat(cur_output_ele!.innerText);
        }
        else{
          cur_output_ele!.innerText= cur_output_ele!.innerText.slice(1);
        }
        break;
      //default cases are numbers or operators
      default:
        //in case of a new calculation, set the inner text in element "output" and flag=1
        if ( flag===0){
          cur_output_ele!.innerText= fields;
          flag=1;
        }
        //in case of a continue calculation, display the new input at the end of current string
        else {
          cur_output_ele!.innerText=cur_output_ele!.innerText.concat(fields);
          //if the new input is a operator, start calculation process
          if (operation.includes(fields)){
            calculate(cur_output_ele!.innerText);
          }
        }
        break;
    }


  }

  return (
    <div className="App">
      <div id="instruction">
        <h1>Instruction for this calculator:</h1>
        <p>1 This is a calculator for Testout homework assignment only;</p>
        <p>2 This calculator can be used for plus (+), minus (-), production (*), divide (/), and module (%) calculation.</p>
        <p>3 The input number can be either int or float, posstive or negtive.</p>
        <p>4 "C" is used for delete last input number, while "AC" is used for reset the process.</p>
      </div>
      <div className='Frame'>
          <div id="output">0</div>
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
