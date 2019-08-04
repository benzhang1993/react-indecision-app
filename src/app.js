let app = {
  title: "Indecision App",
  subtitle: "lol",
  options: ['First item']
};

const onFormSubmit = (e) => {
  e.preventDefault(); // prevents page refresh on submit

  const option = e.target.elements.option.value; 

  if (option) {
    app.options.push(option);
    e.target.elements.option.value = "";  // clears value in input field
    renderApp();
  }
};

const removeOptions = () => {
    app.options = [];
    renderApp();
}

const appRoot = document.getElementById("app");

const renderApp = () => {
  const template = (
    <div>
      <p>{app.title}</p>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.options.length > 0 ? "yes" : "no"}</p>
      <p>{app.options.length}</p>
      <ol>
        {app.options.map((item) => <li key={item}>{item}</li>)}
      </ol>
      <button onClick={removeOptions}>Remove</button>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option" />
        <button>Add Option</button>
      </form>
    </div>
  );
  ReactDOM.render(template, appRoot);
};

renderApp();
