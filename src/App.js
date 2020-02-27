import React, { Component } from "react";
import "./styles.css";

// EmailInput wraps an HTML `input` and adds some app-specific styling.
const EmailInput = React.forwardRef((props, ref) => (
  <input ref={ref} {...props} type="email" className="AppEmailInput" />
));

const withHOC = Comp => {
  return class withHOC extends Component {
    render() {
      return (
        <div
          onClick={ev => {
            console.log(ev.currentTarget);
          }}
        >
          <Comp {...this.props} />
        </div>
      );
    }
  };
};

class Chart extends Component {
  state = { text: "" };

  onChangeHanlder = ev => {
    this.setState({ text: ev.currentTarget.value });
  };

  render() {
    return (
      <div ref={this.props.refs}>
        <span>Student Report </span>
        <div
          style={{ width: "200px", height: "200px", border: "1px solid red" }}
        >
          Chart...
          <input type="text" onChange={this.onChangeHanlder} />
        </div>
      </div>
    );
  }
}
const MyChart = withHOC(Chart);

class MainChart extends Component {
  chartRef = React.createRef();

  clickHandler = () => {
    console.log(this.chartRef.current);
  };

  render() {
    return (
      <div>
        <MyChart ref={this.chartRef} />
        <button onClick={this.clickHandler}>Check</button>
      </div>
    );
  }
}

class App extends Component {
  emailRef = React.createRef();
  chartRef = React.createRef();

  render() {
    return (
      <div>
        <EmailInput ref={this.emailRef} />
        <button onClick={() => this.onClickButton()}>
          Click me to focus email
        </button>
        <Chart ref={this.chartRef} />
        <MainChart />
      </div>
    );
  }

  // `this.emailRef.current` points to the `input` component inside of EmailInput,
  // because EmailInput is forwarding its ref via the `React.forwardRef` callback.
  onClickButton() {
    this.emailRef.current.value = "hello";
    console.log(this.chartRef.current);
  }
}
export default App;
