/* This code was done by Andrew Vieira */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/* Where we show the current input or solution given by an operation */
function Display(props){
	return <h1 className="display">{props.value}</h1>
}

function Button(props) {
	return <button className={props.name} onClick={props.onClick}>{props.value}</button>
}

/* Includes all the buttons, display, and operations that a calculator would do in a single entity */
class Calculator extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			value1 : 0,
			input : '0',
			output : '0',
			inputLength : 0,
			nextNumberReady : false,
			isFirstValueSet : false,
			operator : '+',
			currentOperation: "",
		}
	}

	countDigits(number){
		let temp = number;
		if (typeof temp !== 'string'){
			temp = String(temp);
		}

		temp = temp.replace('.', '');
		temp = temp.replace('-', '');
		return temp.length;
	}

	/* Make sure numbers don't get too big with this function */
	limitDigits(number){
		let temp = number;
		if (this.countDigits(temp) > 10){
			if (temp > 9999999999)
				temp = temp.toPrecision(6);
			else
				temp = temp.toPrecision(10);
		}

		return temp;
	}

	handleClick(value) {
		
		if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(value) && (this.state.inputLength < 10 || this.state.nextNumberReady === true)){
			if (this.state.nextNumberReady === true)
			{
				this.setState((state) => ({
					nextNumberReady : false,
					input : '',
					inputLength : 0,
				}));
			}

			if (this.state.inputLength === 0 && value !== '0'){
				this.setState((state) => ({
					input : value,
					inputLength : state.inputLength + 1,
				}));
			}
			else if (this.state.inputLength !== 0){
				this.setState((state) => ({
					input : state.input + value,
					inputLength : state.inputLength + 1,
				}));
			}
		}
		else if (['÷', 'x', '-', '+'].includes(value) && this.state.isFirstValueSet === false){
			this.setState((state) => ({
				nextNumberReady : true,
				isFirstValueSet : true,
				/*value1 : Number(state.input),*/
				value1 : parseFloat(state.input),
				operator : value
			}));
		}
		else if (['÷', 'x', '-', '+'].includes(value) && this.state.isFirstValueSet === true){
			this.setState((state) => ({
				operator : value
			}));
		}
		else if (value === '=' && this.state.isFirstValueSet === true){
			let value2 = Number(this.state.input);
			let solution = 0;

			if (this.state.operator === '÷'){
				solution = this.state.value1 / value2;
			}
			else if (this.state.operator === 'x'){
				solution = this.state.value1 * value2;
			}
			else if (this.state.operator === '-'){
				solution = this.state.value1 - value2;
			}
			else if (this.state.operator === '+'){
				solution = this.state.value1 + value2;
			}

			solution = this.limitDigits(solution);

			this.setState((state) => ({
				input : String(solution),
				inputLength : state.input.length,
				nextNumberReady : true,
				isFirstValueSet : false,
			}));
		}
		else if (value === 'Clear'){
			this.setState((state) => ({
				input : '0',
				inputLength : 0,
				nextNumberReady : false,
				isFirstValueSet : false,
			}));
		}
		else if (value === '.'){
			if (this.state.input.includes('.') !== true)
			{
				this.setState((state) => ({
					input : state.input + '.',
				}));
			}
		}
		else if (value === '+/-'){
			/*let opposite = Number(this.state.input);*/
			let opposite = parseFloat(this.state.input);
			/*opposite = -Math.abs(opposite);*/
			opposite = opposite * -1;
			this.setState((state) => ({
				input : String(opposite),
			}));
		}
		/*console.log(this.state.input);*/
	}

	render() {
		return (
			<div className="calculator">
				<div className="row">
					<Display value={this.state.input}/>
				</div>
				<div className="row">
					<Button name="clear" value='Clear' onClick={() => this.handleClick('Clear')} />
				</div>
				<div className="row">
					<Button name="number" value='9' onClick={() => this.handleClick('9')} />
					<Button name="number" value='8' onClick={() => this.handleClick('8')} />
					<Button name="number" value='7' onClick={() => this.handleClick('7')} />
					<Button name="operator" value='÷' onClick={() => this.handleClick('÷')} />
				</div>
				<div className="row">
					<Button name="number" value='6' onClick={() => this.handleClick('6')} />
					<Button name="number" value='5' onClick={() => this.handleClick('5')} />
					<Button name="number" value='4' onClick={() => this.handleClick('4')} />
					<Button name="operator" value='x' onClick={() => this.handleClick('x')} />
				</div>
				<div className="row">
					<Button name="number" value='3' onClick={() => this.handleClick('3')} />
					<Button name="number" value='2' onClick={() => this.handleClick('2')} />
					<Button name="number" value='1' onClick={() => this.handleClick('1')} />
					<Button name="operator" value='-' onClick={() => this.handleClick('-')} />
				</div>
				<div className="row">
					<Button name="number" value='0' onClick={() => this.handleClick('0')} />
					<Button name="number" value='.' onClick={() => this.handleClick('.')} />
					<Button name="number" value='+/-' onClick={() => this.handleClick('+/-')} />
					<Button name="operator" value='+' onClick={() => this.handleClick('+')} />
				</div>
				<div className="row">
					<Button name="operator" value='=' onClick={() => this.handleClick('=')} />
				</div>
			</div>
		);
	}
}

class App extends React.Component {
	render() {
		return (
			<div>
				<div className="description">
					<h1>Web Calculator</h1>
					<h3>A calculator made with ReactJS. Try it out!</h3>
				</div>
				<div>
					<Calculator/>
				</div>
			</div>
			
			);
	}
}

/*ReactDOM.render(<Calculator />, document.getElementById('root'));*/
ReactDOM.render(<App />, document.getElementById('root'));
