import React from "react";

/** @namespace React.Component */
export default class History extends React.Component {
  constructor(props) {
    super(props);
    this.handleClearAll = this.handleClearAll.bind(this);
    this.handleCDeleteItem = this.handleDeleteItem.bind(this);
  }

  handleClearAll() {
    this.props.clearHistory();
  }

  handleDeleteItem(index) {
    this.props.deleteHistoryItem(index);
  }

  handleCopyToClipBoard(index) {
    this.props.copyToClipboard(index);
  }

  render() {
    return (
      <div>
        <div className="panel panel-default">
          <div class="btn-group pull-right">
            <button className="btn btn-info" style={{ margin: 1.5 }} onClick={this.handleClearAll}>
              Clear
            </button>
          </div>
          <p className="panel-heading">History</p>

          <ol className="list-group" style={{ listStylePosition: "inside" }}>
            {this.props.history.map((element, index) => (
              <li key={element.id} className="list-group-item" style={{ display: "list-item" }}>
                <div className="btn-toolbar pull-right">
                  <div className="btn-group" style={{ marginRight: "15px" }}>
                    <button
                      className="btn btn-danger"
                      style={{ margin: -7 }}
                      onClick={() => this.handleCDeleteItem(index)}
                    >
                      <i className="glyphicon glyphicon-trash"></i>
                    </button>
                  </div>
                  <div class="btn-group">
                    <span
                      className="d-inline-block"
                      data-toggle="tooltip"
                      title="Copy mathematical expression to input field"
                    >
                      <button
                        className="btn btn-primary"
                        style={{ margin: -7 }}
                        onClick={() => this.handleCopyToClipBoard(index)}
                      >
                        <i className="glyphicon glyphicon-paste"></i>
                      </button>
                    </span>
                  </div>
                </div>
                {element.result}
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
