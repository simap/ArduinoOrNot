import React from 'react'

const questions = [
  {
    question: "Is this for a hobby project?",
    choices: [{
      choice: "Yes",
      result: "Arduino is a great way to build hobby projects and learn along the way, and has an active community."
    }, {choice: "No", result: "Consider using vendor tools/SDK for professional embedded products."}]
  },
  {
    question: "Do you intend to release this as open source?",
    choices: [{choice: "Yes", result: "Great! Open source is the future!"}, {
      choice: "No",
      result: "Consider the LGPL licensing requirements. You'll need to also evaluate each library's " +
          "specific licensing terms. Some use GPL, while others are more permissive."
    }]
  },
];


let Question = (props) => {
  let choices = props.choices.map((c, i) => <button key={i}
                                                    onClick={(e) => {e.target.blur(); props.onAnswer(c.choice)}}>{c.choice}</button>)
  return (
      <div>
        <h3>{props.question}</h3>
        <div>
          {choices}
        </div>
      </div>
  )
}

let Result = (props) => {

  let question = questions[props.index];
  let result = question.choices.find(c => c.choice === props.choice);
  return (
      <div>
        <h3>{question.question}</h3>
        <p className="choiceReview">You answered <span className="choice">{props.choice}</span>.</p>
        <p className="result">{result.result}</p>
      </div>
  )
}


export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      mode: "init"
    }
  }

  static async getInitialProps({req}) {
    return {}
  }

  onGetStated = (e) => {
    this.setState({mode: 'questions'})
  }

  onAnswer = (answer) => {
    this.setState((state, props) => {
      let answers = [...state.answers, answer];

      let mode = state.mode;
      if (answers.length === questions.length)
        mode = "result";
      return {answers, mode};
    })
  }

  onRestart = () => {
    this.setState({
      answers: [],
      mode: "init"
    })
  }

  render() {
    let Content;
    let that = this;
    switch (this.state.mode) {
      default:
      case "init":
        Content = (
            <div>
              <h3>Welcome!</h3>
              <p>Take this brief survey to learn about Arduino. Should you use it in your project?</p>
              <button onClick={this.onGetStated}>Get Started</button>
            </div>
        )
        break
      case "questions":
        let nextIndex = this.state.answers.length;
        let qProps = questions[nextIndex];
        Content = (
            <div>
              <h2>Question {nextIndex + 1} of {questions.length}</h2>
              <Question {...qProps} onAnswer={this.onAnswer}/>
            </div>
        )
        break
      case "result":
        Content = (
            <div>
              <h2>Results:</h2>
              {this.state.answers.map((a, i) => <Result key={i} index={i} choice={a}/>)}
              <h2>Conclusion</h2>
              <p>
                In the end, this is your project, and you can chose whatever path you like.
                Our hope is to give you some food for thought, and share some information along the way.
              </p>
              <button onClick={this.onRestart}>Start Over</button>
            </div>
        )
    }

    return (
        <div>
          <header><h1>Arduino or Not?</h1></header>

          <section>
            {Content}
          </section>
          <hr className="style-two"/>
          <style jsx global>{`

button {
  background-color: #0049FF;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-right: 1em;
}

body {
  font-family: "Helvetica";
  margin: 0;
}
section {
  margin: 2em;
}
header {
  background: linear-gradient(to right, #00a7ad 0%,#8e8e8e 50%,#FFAB00 100%);
  box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.33);
}

header h1 {
  margin: 0;
  padding: 20px;
  color: white;
}
html {
  height: 100%;
}

.choiceReview {
  font-style: oblique;
}

.choice {
  color: #0049FF;
  font-weight: bold;
}


hr.style-two {
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
    margin-top: 4em;
}

    `}</style>
        </div>
    )
  }
}