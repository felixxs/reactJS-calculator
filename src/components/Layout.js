import React from "react";
import Paragraph from "./Paragraph";
import Calculation from "../logic/calculation";
import History from "./History";
import Parser from "../logic/parser";
import { v4 as uuidv4 } from "uuid";

/** @namespace React.Component */
export default class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      content: "",
      history: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleHistoryClear() {
    this.setState({ history: [] });
  }

  handleDeleteHistoryItem(id) {
    const history = this.state.history;
    this.setState({ history: history.filter((item) => history[id] !== item) });
  }

  handleCopyToClipboard(id) {
    const history = this.state.history;
    const toBeCopied = history.find((item) => history[id] == item);
    let parser = new Parser("");

    this.setState({ value: parser.mathematicalExpressionFromResultstring(toBeCopied.result) });
  }

  handleChange(event) {
    /**
     * @TODO Implement it
     */
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    /**
     * @TODO Implement it
     */

    event.preventDefault();

    let content = "Wrong input!";

    let parser = new Parser(this.state.value);
    let parsedInput = parser.parseCalculationString();

    if (parsedInput !== false) {
      let calculation = new Calculation(parsedInput);
      let result = calculation.calculate();
      const resultString = parser.parseResultString(parsedInput, result);
      this.setState({
        content: resultString,
        history: [{ id: uuidv4(), result: resultString }].concat(this.state.history),
      });
    } else {
      this.setState({ content: content });
    }
  }

  render() {
    return (
      <div>
        <div className="row">
          <h1 className="col-md-8 col-md-offset-2 text-center">itdesign - React calculator</h1>
        </div>

        <div className="container">
          <div className="row">
            <form className="col-md-6 col-md-offset-3 text-center" onSubmit={this.handleSubmit}>
              <input
                type="text"
                className="form-control col-md-9"
                placeholder="expression..."
                onChange={this.handleChange}
                value={this.state.value}
              />
              <input className="btn btn-success" type="submit" value="Submit" style={{ margin: 2 }} />
            </form>
          </div>

          <Paragraph content={this.state.content} />
          <History
            clearHistory={this.handleHistoryClear.bind(this)}
            history={this.state.history}
            deleteHistoryItem={this.handleDeleteHistoryItem.bind(this)}
            copyToClipboard={this.handleCopyToClipboard.bind(this)}
          ></History>
        </div>
      </div>
    );
  }
}
