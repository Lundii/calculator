
const postFixCreator = (infix) => {
  const stack = [];
  const postFix = [];
  const prec = {
    "*": 2,
    "/": 2,
    "+": 1,
    "-": 1,
    "(": 0
  }
  const tokens = infix.split(/([()+*/-])/);
  tokens.forEach(token => {
    if ( token === "(") {
      stack.push(token);
    }
    else if ( token === ")") {
      let top = stack.pop();
      while (top && top != "("){
        postFix.push(top);
        top = stack.pop();
      }
    }
    else if (prec.hasOwnProperty(token)){
      while(stack.length && prec[stack[stack.length-1]] >= prec[token])
        postFix.push(stack.pop());
      stack.push(token);
    }
    else if ( token === ""){}
    else{
      postFix.push(token);
    }
  })
  while(stack.length){
    postFix.push(stack.pop());
  }
  console.log(postFix);
  return postFix;
}

const postFixEval = (postFixExpre) => {
  const stack = [];

  postFixExpre.forEach(token => {
    if (parseFloat(token) || parseFloat(token) === 0 ){
      stack.push(token)
    }
    else {
      const secondOperand = stack.pop();
      const firstOperand = stack.pop();
      const eval = solve(parseFloat(firstOperand), parseFloat(secondOperand), token)
      stack.push(eval);
    }
  })
  console.log(stack.pop());
};


const solve = (firstOperand, secondOperand, operator) => {
  if (operator === '*'){
    return firstOperand * secondOperand;
  }
  if (operator === '/'){
    return firstOperand / secondOperand;
  }
  if (operator === '+'){
    return (firstOperand + secondOperand).toFixed(2);
  }
  if (operator === '-'){
    return firstOperand - secondOperand;
  }
}
// const post = postFixCreator("(234.90+65)*908-(98.89-23)*(54.65+23)");
const post = postFixCreator('3*0')
const result = postFixEval(post);