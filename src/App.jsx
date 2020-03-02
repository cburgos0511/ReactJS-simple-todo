import React from "react";
import "./styles.css";

export default class App extends React.Component {
  state = {
    list: [
      { id: 0, text: "Finish App", done: true },
      { id: 1, text: "Go to bed", done: false }
    ],
    input: "",
    error: "Add Todo"
  };

  addItem(e) {
    e.preventDefault();
    if (this.state.input.trim() === "") {
      this.setState({ error: "Cannot Enter Empty Input" });
    } else {
      const item = {
        id: Math.floor(Math.random() * 100),
        text: this.state.input,
        done: false
      };
      this.setState({
        list: [...this.state.list, item]
      });
    }
    this.setState({ input: "" });
  }

  toggleComplete(id) {
    const updateList = this.state.list.map((item, i) => {
      return id === item.id ? { ...item, done: !item.done } : item;
    });

    this.setState({
      list: [...updateList]
    });
  }
  renderList() {
    return this.state.list.map((item, i) => {
      const completed = item.done ? "line-through" : "none";
      const blur = item.done ? "blur(1px)" : "blur(0)";

      return (
        <li
          onClick={() => this.toggleComplete(item.id)}
          className="to-do"
          style={{ textDecoration: completed, filter: blur }}
          key={i}
        >
          - {item.text}
        </li>
      );
    });
  }
  render() {
    return (
      <div className="App">
        <h1>List</h1>
        <div className="input-wrap">
          <input
            value={this.state.input}
            onChange={e => this.setState({ input: e.target.value })}
            placeholder={this.state.error}
            type="text"
          />
          <button onClick={e => this.addItem(e)}>Add</button>
        </div>
        <div className="list-wrap">
          <ul>{this.renderList()}</ul>
        </div>
      </div>
    );
  }
}
