import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const cmdRef = React.createRef();

class App extends Component {
  state = {
    cmd: "",
    terminalOutput: [
      {
        command: "init",
        result: ["Skroutz.gr cli tool"]
      }
    ]
  };

  componentDidMount() {
    window.addEventListener("visibilitychange", this.forceFocus);
    window.addEventListener("click", this.forceFocus);
  }

  forceFocus = e => {
    if (
      document.visibilityState === "visible" ||
      e.target.contains(cmdRef.current)
    )
      cmdRef.current && cmdRef.current.focus();
  };

  handleInputCommand = e => {
    this.setState({
      cmd: e.target.value
    });
  };

  submitCmd = e => {
    e.preventDefault();
    this.setState({
      ...this.state,
      terminalOutput: [
        ...this.state.terminalOutput,
        {
          command: this.state.cmd,
          result: [this.getResultOfCommand(this.state.cmd)]
        }
      ],
      cmd: ""
    });
  };

  getResultOfCommand = command => {
    switch (command) {
      case "":
        return "";
      case "foo":
        return "Found a command for foo!";
      default:
        return `No command found: ${command}`;
    }
  };

  render() {
    return (
      <div className="App">
        <div className="terminal-wrapper">
          <div className="output">
            {this.state.terminalOutput.map(item => {
              return (
                <PrefixOutput>
                  <p>{item.result}</p>
                </PrefixOutput>
              );
            })}
          </div>
          <div className="cmd">
            <form onSubmit={this.submitCmd}>
              <PrefixOutput>
                <input
                  autoFocus
                  style={{ width: `${this.state.cmd.length}ch` }}
                  value={this.state.cmd}
                  onChange={this.handleInputCommand}
                  ref={cmdRef}
                />
                <PseudoCursor />
              </PrefixOutput>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

// Blinking span after input
const PseudoCursor = () => <span className="pseudo-cursor" />;

// Prefix every cmd line with a `cli@skroutz.gr:~$` text
const PrefixOutput = ({ children }) => (
  <div className="prefix-output">
    <span>cli@skroutz.gr:~$</span>
    {children}
  </div>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

const dummyData = ["foo", "bar", "baz"];

// const subcats = {
//   homepage: {
//     [`Τεχνολογία`]: {},
//     [`Σπίτι-Κήπος`]: {
//       [`Οικιακές Συσκευές`]: {
//         [`Θέρμανση, Κλιματισμός`]: {
//           [`Κεντρική Θέρμανση`]: {
//             [`Λέβητες`]: ['φου', 'μπαρ']
//           },
//           [`Αφυγραντήρες`]: {}
//         }
//       }
//     }
//   }
// }
