import React from "react";

import Layout from "../src/components/Layout";

import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedComponentsWithType,
  findRenderedComponentWithType,
  isElementOfType,
  Simulate,
} from "react-dom/test-utils";

import Paragraph from "../src/components/Paragraph";

import History from "../src/components/History";

describe("View", function () {
  it("should render layout with Layout component", function () {
    const isLayoutComponent = isElementOfType(<Layout />, Layout);

    expect(isLayoutComponent).toEqual(true);
  });

  it("should be one Paragraph component on the page", function () {
    const paragraph = scryRenderedComponentsWithType(renderIntoDocument(<Layout />), Paragraph);

    expect(paragraph.length).toEqual(1);
  });

  it("should be one History component on the page", function () {
    const history = scryRenderedComponentsWithType(renderIntoDocument(<Layout />), History);

    expect(history.length).toEqual(1);
  });

  it("should return right result for addition in Paragraph and History", function () {
    const layout = renderIntoDocument(<Layout />);

    const button = findRenderedDOMComponentWithClass(layout, "btn-success");
    const inputField = findRenderedDOMComponentWithClass(layout, "form-control");

    inputField.value = "1.28+2.89";

    Simulate.change(inputField);

    Simulate.submit(button);

    const paragraph = findRenderedComponentWithType(layout, Paragraph);
    const history = findRenderedComponentWithType(layout, History);

    expect(paragraph.props.content).toEqual("1.28 + 2.89 = 4.17");
    expect(history.props.history.length).toEqual(1);
    expect(history.props.history[0].result).toEqual("1.28 + 2.89 = 4.17");
  });

  it('should render "Wrong input!" in paragraph when wrong input given', function () {
    const layout = renderIntoDocument(<Layout />);

    const button = findRenderedDOMComponentWithClass(layout, "btn-success");
    const inputField = findRenderedDOMComponentWithClass(layout, "form-control");

    inputField.value = "string";

    Simulate.change(inputField);

    Simulate.submit(button);

    const paragraph = findRenderedComponentWithType(layout, Paragraph);
    const history = findRenderedComponentWithType(layout, History);

    expect(paragraph.props.content).toEqual("Wrong input!");
    expect(history.props.history.length).toEqual(0);
  });
  it('should clear history when "Clear-Button" is clicked', function () {
    const layout = renderIntoDocument(<Layout />);

    const button = findRenderedDOMComponentWithClass(layout, "btn btn-info");

    Simulate.click(button);

    const history = findRenderedComponentWithType(layout, History);

    expect(history.props.history).toEqual([]);
  });

  it("should delete history item when trashcan icon is clicked", function () {
    const layout = renderIntoDocument(<Layout />);

    const submitButton = findRenderedDOMComponentWithClass(layout, "btn-success");
    const inputField = findRenderedDOMComponentWithClass(layout, "form-control");

    inputField.value = "1.28+2.89";

    Simulate.change(inputField);

    Simulate.submit(submitButton);

    const history = findRenderedComponentWithType(layout, History);

    const trashcanButtton = findRenderedDOMComponentWithClass(layout, "btn-danger");

    Simulate.click(trashcanButtton);

    expect(history.props.history).toEqual([]);
  });

  it("should copy the mathematical expression to the input field when clipboard icon is clicked", function () {
    const layout = renderIntoDocument(<Layout />);

    const submitButton = findRenderedDOMComponentWithClass(layout, "btn-success");
    const inputField = findRenderedDOMComponentWithClass(layout, "form-control");

    inputField.value = "1.28+2.89";

    Simulate.change(inputField);

    Simulate.submit(submitButton);

    inputField.value = "4";

    const history = findRenderedComponentWithType(layout, History);

    const clipboardButtton = findRenderedDOMComponentWithClass(layout, "btn btn-primary");

    Simulate.click(clipboardButtton);

    expect(inputField.value).toEqual("1.28 + 2.89");
  });
});
