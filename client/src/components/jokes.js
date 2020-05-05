import React, { Component } from "react";

import axiosWithAuth from "../axioswithAuth.js";

export default class jokes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokeList: [],
    };
  }
  componentDidMount() {
    axiosWithAuth()
      .get("/jokes")
      .then((jokeList) => {
        console.log("Jokes", jokeList);
        this.setState({
          jokeList: jokeList.data,
        });
      })
      .catch((err) => console.log(err));
  }
  logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    this.props.history.push("/");
  };
  render() {
    return (
      <main>
        <div className="joke-header">
          <h1 className="heading-primary">{localStorage.getItem("welcome")}</h1>
          <span onClick={this.logout} className="btn-inline logout">
            Logout
          </span>
        </div>
        <section className="jokes">
          <h2 className="heading-secondary">We found these jokes</h2>
          <div className="user__table">
            <table id="user-table">
              {this.state.jokeList.map((joke) => (
                <JokeCard key={joke.id} joke={joke} />
              ))}
            </table>
          </div>
        </section>
      </main>
    );
  }
}

function JokeCard(props) {
  const { joke } = props.joke;
  return (
    <tr className="users__row">
      <td className="users__data">{joke}</td>
    </tr>
  );
}
