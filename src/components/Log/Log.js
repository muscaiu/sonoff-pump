import React, { Component } from 'react'

export default class Log extends Component {

  state = {
    logFile: []
  }

  componentDidMount() {
    fetch('/log')
      .then(response => response.json())
      .then(data => this.setState({ logFile: data }));
  }

  render() {
    const { logFile } = this.state;

    return (
      <div>
        {logFile.reverse().map((line, i) => {
          return (
            <div key={i}>
              {line}
            </div>)
        })}
      </div>
    )
  }
}
