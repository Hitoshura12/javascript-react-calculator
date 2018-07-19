import React,{Component} from 'react'
import Buttons from './Buttons'
import Output from "./Output";
import Operation from "./Operation"


const isOperator = /[x/+‑]/,
    endsWithOperator = /[x+‑/]$/;

class Calculator extends Component{

    constructor(props) {
        super(props);
        this.state={
            currentValue:'0',
            prevValue:'0',
            operation:''
        };
        console.log(this.state.currentValue)
        console.log(this.state.prevValue)
        this.handleDecimal=this.handleDecimal.bind(this);
        this.handleOperators=this.handleOperators.bind(this);
        this.handleEvaluate=this.handleEvaluate.bind(this);
        this.handleNumbers=this.handleNumbers.bind(this);
        this.initialize=this.initialize.bind(this)
    }

    maxNumberWarning(){

            this.setState({
                currentValue:'Max Digit limit',
                prevValue:this.state.currentValue
            });
            setTimeout(()=>this.setState({currentValue:this.state.prevValue}),1000);
        }


    handleEvaluate(){
if(!this.state.currentValue.includes('limit')){
    let expression=this.state.operation;
    if(endsWithOperator.test(expression)) expression = expression.slice(0,-1);
    expression = expression.replace(/x/g, "*").replace(/‑/g, "-");
    let answer=Math.round(1000000000000 * eval(expression)) / 1000000000000;
this.setState({
    currentValue:answer.toString(),
    operation:expression.replace(/\*/g,'*').replace('/-/g','-') +'='+ answer,
    prevValue:answer,
    evaluated:true
        })

    }
}

    initialize(){
     this.setState({
         currentValue:'0',
         prevValue:'0',
         operation:''
     })

    }

    handleOperators(e){
if(!this.state.currentValue.includes('limit')){
    this.setState({currentValue:e.target.value,evaluated:false});
    if(this.state.operation.includes('=')){
        this.setState({operation:this.state.prevValue+e.target.value})
    }else {
        this.setState({
            prevValue:!isOperator.test(this.state.currentValue)
            ?this.state.operation : this.state.prevValue,
            operation:!isOperator.test(this.state.currentValue)
            ?this.state.operation+=e.target.value
            :this.state.prevValue+=e.target.value
            })
        }
    }
    }
    handleDecimal(){
        if (this.state.evaluated === true) {
            this.setState({
                currentValue: '0.',
                operation: '0.',
                evaluated: false});
        } else if (!this.state.currentValue.includes('.') &&
            !this.state.currentValue.includes('limit')) {
            this.setState({evaluated: false});
            if (this.state.currentValue.length > 21) {
                this.maxNumberWarning();
            } else if (endsWithOperator.test(this.state.operation) ||
                this.state.currentValue === '0' && this.state.operation === '') {
                this.setState({
                    currentValue: '0.',
                    operation: this.state.operation + '0.'
                });
            } else {
                this.setState({
                    currentValue: this.state.operation.match(/(-?\d+\.?\d*)$/)[0] + '.',
                    operation: this.state.operation + '.',
                });
            }
        }
    }
    handleNumbers(e) {
        if (!this.state.currentValue.includes('limit')) {
            this.setState({evaluated: false});
            if (this.state.currentValue.length > 21) {
                this.maxNumberWarning();
            }
            else if (this.state.evaluated === true) {
                this.setState({
                    currentValue: e.target.value,
                    operation: e.target.value !== '0' ? e.target.value : ''
                })
            } else {
                this.setState({
                    currentValue: this.state.currentValue === '0' || isOperator.test(this.state.currentValue)
                        ? e.target.value : this.state.currentValue + e.target.value,
                    operation: this.state.currentValue === '0' && e.target.value === '0'
                        ? this.state.operation :
                        /([^.0-9]0)$/.test(this.state.operation) ?
                            this.state.operation.slice(0, -1) + e.target.value
                            : this.state.operation + e.target.value

                })
            }
        }
    }

    render() {
        return (
            <div id="calculator">
                <Operation operation={this.state.operation.replace(/x/g,'X')}/>
               <Output currentValue={this.state.currentValue}/>
                <Buttons evaluate={this.handleEvaluate}
                         operator={this.handleOperators}
                         initialize={this.initialize}
                         decimal={this.handleDecimal}
                         number={this.handleNumbers} />
            </div>
        );
    }


}

export default Calculator