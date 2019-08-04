"use strict";

var app = {
  title: "Indecision App",
  subtitle: "lol",
  options: ['First item']
};

var onFormSubmit = function onFormSubmit(e) {
  e.preventDefault(); // prevents page refresh on submit

  var option = e.target.elements.option.value;

  if (option) {
    app.options.push(option);
    e.target.elements.option.value = ""; // clears value in input field
    renderApp();
  }
};

var removeOptions = function removeOptions() {
  app.options = [];
  renderApp();
};

var appRoot = document.getElementById("app");

var renderApp = function renderApp() {
  var template = React.createElement(
    "div",
    null,
    React.createElement(
      "p",
      null,
      app.title
    ),
    app.subtitle && React.createElement(
      "p",
      null,
      app.subtitle
    ),
    React.createElement(
      "p",
      null,
      app.options.length > 0 ? "yes" : "no"
    ),
    React.createElement(
      "p",
      null,
      app.options.length
    ),
    React.createElement(
      "ol",
      null,
      app.options.map(function (item) {
        return React.createElement(
          "li",
          { key: item },
          item
        );
      })
    ),
    React.createElement(
      "button",
      { onClick: removeOptions },
      "Remove"
    ),
    React.createElement(
      "form",
      { onSubmit: onFormSubmit },
      React.createElement("input", { type: "text", name: "option" }),
      React.createElement(
        "button",
        null,
        "Add Option"
      )
    )
  );
  ReactDOM.render(template, appRoot);
};

renderApp();
