class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);       
        this.state= {
            options : props.options
        };
    }

    componentDidMount() {
        try {
            const optionsJSON = localStorage.getItem('options');
            const options = JSON.parse(optionsJSON);
            
            if (options) {
                this.setState(()=> ({ options }))     
            }       
        } catch (e) {
            // Do nothing if invalid JSON
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length && this.state.options.length != 0) {
            const optionsJSON = JSON.stringify(this.state.options);
            localStorage.setItem('options', optionsJSON);
        }
    }

    handleDeleteOptions () {
        this.setState(()=> ({ options: [] }));
    }

    handleDeleteOption(option) {
        this.setState((prev) => ({ 
            options: prev.options.filter((item) => item !== option )
        }))
    }

    handlePick () {
        let randomIndex = Math.floor(Math.random() * this.state.options.length);
        alert(this.state.options[randomIndex])
    }

    handleAddOption(option) {
        if(option == '') {
            return 'String is empty'
        }
        if (this.state.options.indexOf(option) > -1) {
            return 'Option already exists'
        }

        this.setState((prevState)=> ({ options : prevState.options.concat(option) }));
    }

    render() {

        return (
            <div>
                <Header/>
                <Action 
                    hasOptions={this.state.options.length > 0}
                    handlePick = {this.handlePick}
                    />
                <Options 
                    options = {this.state.options}
                    handleDeleteOptions = {this.handleDeleteOptions}
                    handleDeleteOption = {this.handleDeleteOption}
                />
                <AddOption
                    handleAddOption = {this.handleAddOption}
                />
            </div>
        );
    }
}

IndecisionApp.defaultProps = {
    options: ['Default option 1', 'Default option 2']
}

const Header = (props) => {
    return (
            <div>
                <h1>{props.title}</h1>
                {props.subtitle && <h2>{props.subtitle}</h2>}
            </div>
        );
}

Header.defaultProps = {
    title: 'Indecision App',
    subtitle: 'Put your life decision in the hands of a Computer'
}

const Action = (props) => {
    return (
            <div>
                <button 
                    onClick={props.handlePick}
                    disabled = {!props.hasOptions}
                >
                    What should I do?
                </button>
            </div>
        );
}

const Options = (props) => {
    return (
            <div>
                {props.options.length === 0 && <p>No options yet</p>}
                <button onClick={props.handleDeleteOptions}>Remove All</button>
                <ol>
                    {props.options.map((option) => (
                        <Option 
                            option={option}  
                            key={option}
                            handleDeleteOption = {props.handleDeleteOption}
                            />
                    ))}
                </ol>
            </div>
        );
}

const Option = (props) => {
    return (
        <li>
            {props.option}
            <button 
                onClick= {(e) => {
                    props.handleDeleteOption(props.option)
                }}
            >
                Remove
            </button>
        </li>
    )
}

class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error : undefined
        }
    }

    handleAddOption(e) {
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        let error = this.props.handleAddOption(option);

        this.setState(()=> ({error}));

        if (!error) {
            e.target.elements.option.value = '';
        }
    }
    
    render() {
        return (
            <div>
            {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"/>
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}

// const User = (props) => {
//     return (
//         <div>
//             <p>Name: {props.name}</p>
//             <p>Age: {props.name}</p>
//         </div>
//     )
// }

ReactDOM.render(<IndecisionApp options={['hello']}/>, document.getElementById('app'));