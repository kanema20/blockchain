class App extends React.Component {
    //constructor helps initialize view from the start to load on the screen
    constructor(props) {
        super(props);
        this.state = {
            'total_amount': 1000
        }
    }
    render() {
        return (
            <div>
                <h1> Lottery application </h1>
                <div>
                    <p>Total lottery amount is {this.state.total_amount}</p>
                </div>
                <form>
                    <input placeholder="Amount"></input>
                    <input placeholder="Email"></input>
                    <button>Participate</button>
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