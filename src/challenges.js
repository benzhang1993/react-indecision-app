// 1. utilize arrow functions and named ES6 function

const multiplier = {
    numbers:[1,2,3,4],
    multiplyBy:6,
    multiply(){ // this here is ES6 function that retains the use of this
        return this.numbers.map((num)=> num*this.multiplyBy);
    }
}

console.log(multiplier.multiply());


// 2. live update counter

let count = 0;
const addOne = () => {
  count++;
  renderCounterApp();
};

const renderCounterApp = () => {
    const templateTwo = (
      <div>
        <h1>Count: {count}</h1>
        <button onClick={addOne}>+1</button>
        <button onClick={minusOne}>-1</button>
      </div>
    );
    ReactDOM.render(templateTwo, appRoot);
  };
  
  renderCounterApp();