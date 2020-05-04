export default class Calculation {
  constructor(expression) {
    this.expression = expression;
  }

  calculate() {
    /**
     * @TODO Implement it
     */
    var calc = this.expression;
    var operator = [
        { "^": (a, b) => Math.pow(a, b) },
        { "*": (a, b) => a * b, "/": (a, b) => a / b },
        { "+": (a, b) => a + b, "-": (a, b) => a - b },
      ],
      newCalc = [],
      currentOperator;
    for (var i = 0; i < operator.length; i++) {
      for (var j = 0; j < calc.length; j++) {
        if (operator[i][calc[j]]) {
          currentOperator = operator[i][calc[j]];
        } else if (currentOperator) {
          newCalc[newCalc.length - 1] = currentOperator(newCalc[newCalc.length - 1], calc[j]);
          currentOperator = null;
        } else {
          newCalc.push(calc[j]);
        }
      }
      calc = newCalc;
      newCalc = [];
    }

    if (calc.length > 1) {
      return false;
    } else {
      console.log(calc[0]);
      return calc[0];
    }
  }
}
