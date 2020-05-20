class App extends React.Component {
    //constructor helps initialize view from the start to load on the screen
    constructor(props) {
        super(props);
        this.state = {
            'total_amount': 1000,
            'amount': 100,
            'email': '',
        }
    }
    async componentDidMount() {
        //get info and add to the states
        //mounts info we get or causes an error on the screen
        const result = await axios.get('/get_total_amount');
        console.log(result.data["0"].total_amount);
        this.setState({total_amount: result.data["0"].total_amount});
    }
    onSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('/post_info', {
            amount: this.state.amount,
            email: this.state.email
        });
        console.log(response);
    }
    render() {
        return (
            <div>
                <h1> Lottery application </h1>
                <div>
                    <p>Total lottery amount is {this.state.total_amount}</p>
                </div>
                <form onSubmit={this.onSubmit}>
                    <input placeholder="Amount" value = {this.state.amount}
                    onChange = {event => this.setState({amount:event.target.value})}></input>
                    <input placeholder="Email" value = {this.state.email}
                    onChange = {event => this.setState({email:event.target.value})}></input>
                    <button type="submit">Participate</button>
                </form>
            </div>
        )
    }
};

function tick() {
    const element = (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
      </div>
    );
    ReactDOM.render(element, document.getElementById('root'));
  }
  
  setInterval(tick, 1000);

ReactDOM.render(
    <div>
        <App />
    </div>
    , document.getElementById('reactBinding'));