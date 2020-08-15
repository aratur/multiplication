import React from 'react';
import Equation from './Equation';
import OptionButton from './OptionButton';
import Progress from './Progress';
import happyFaceImg from './img/happyFace.png';
import sadFaceImg from './img/sadFace.png';
import shallowequal from 'shallowequal';

class QuestionForm extends React.Component {
  possibleAnswers = 6;
  constructor(props){
    super(props);
    const getNewResultsList = (from, to) => {
      const result = {};
      for(let i=from;i<=to;i++){
        const sub = {};
        for(let j=from;j<=to;j++){
          sub[j] = 0;
        }
        result[i] = sub;
      }
      return result;
    }
    this.state = {
      resultsArray: getNewResultsList(props.minValue, props.maxValue),
      xValue: 0,
      yValue: 0,
      correctAnswer: "?",
      innerState: {
        isAsking: true,
        isHappy: false,
        isSad: false,
        isWinner: false
      }
    }
    this.onOptionSelected = this.onOptionSelected.bind(this);
  }

  getRandomIntInclusive = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getOptionsValues(xValue, yValue, fromValue, toValue) {
    let results = [xValue * yValue];
    const maxValue = toValue*toValue;
    const minValue = fromValue*toValue;
    while(results.length < this.possibleAnswers
      && results.length < (maxValue - minValue + 1)){
      const randomValue = this.getRandomIntInclusive(minValue, maxValue);
      if (results.findIndex(item => item === randomValue) === -1){
        results.push(randomValue);
      }
    }
    return results.sort((a,b) => a-b);
  }

  onOptionSelected(e){
    const answer = Number(e.target.innerText);
    const correctAnswer = this.state.xValue * this.state.yValue;
    if(answer === correctAnswer){
      const newResults = this.state.resultsArray;
      newResults[this.state.xValue][this.state.yValue] = 1;
      this.setState({
        correctAnswer: correctAnswer,
        resultsArray: newResults,
        innerState: {
          isAsking: false,
          isHappy: true,
          isSad: false,
          isWinner: false
        },
      });
    } else {
      this.setState({
        correctAnswer: correctAnswer,
        innerState: {
          isAsking: false,
          isHappy: false,
          isSad: true,
          isWinner: false
        }
      });
    }
    setTimeout(() => {
      this.setState({
        xValue: this.getRandomIntInclusive(this.props.fromValue,
          this.props.toValue),
        yValue: this.getRandomIntInclusive(this.props.fromValue,
          this.props.toValue),
        correctAnswer: "?",
        innerState: {
          isAsking: true,
          isHappy: false,
          isSad: false,
          isWinner: false
        }
      });
    }, 2000);
  }
  getRandomIntInclusive = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.fromValue !== this.props.fromValue
      || nextProps.toValue !== this.props.toValue
      || nextState.xValue !== this.state.xValue
      || nextState.yValue !== this.state.yValue
      || !shallowequal(nextState.innerState, this.state.innerState) ){
        return true;
    } else {
      console.log("Component shall not update")
      return false;
    }
  }

  componentDidMount(){
    this.setState({
      xValue: this.getRandomIntInclusive(this.props.fromValue,
        this.props.toValue),
      yValue: this.getRandomIntInclusive(this.props.fromValue,
        this.props.toValue)
    });
  }

  componentDidUpdate(prevProps){
    if(prevProps.fromValue !== this.props.fromValue
      || prevProps.toValue !== this.props.toValue){
        this.setState({
          xValue: this.getRandomIntInclusive(this.props.fromValue,
            this.props.toValue),
          yValue: this.getRandomIntInclusive(this.props.fromValue,
            this.props.toValue)
        });
      }
  }

  renderInnerState(){
    if(this.state.innerState.isAsking) {
      return this.getOptionsValues(this.state.xValue, this.state.yValue
      , this.props.fromValue, this.props.toValue)
      .map( item =>
        <OptionButton
          buttonClassName="btn btn-info btn-lg"
          handleOnClick={this.onOptionSelected}
          key={item}
          id={item}
        />);
    } else if (this.state.innerState.isHappy){
      return <img src={happyFaceImg} alt="Good job!" height="200" />;
    } else if (this.state.innerState.isSad){
      return <img src={sadFaceImg} alt="Ohh no!" height="200" />;
    }
  }

  render(){

    return (
      <div className="row">
        <Equation
          xValue = {this.state.xValue}
          yValue = {this.state.yValue}
          correctAnswer = {this.state.correctAnswer}
        />
        <div className="button-group">
          {this.renderInnerState()}
        </div>
        <Progress
          results={this.state.resultsArray}
          minValue={this.props.minValue}
          maxValue={this.props.maxValue}
        />
      </div>
    );
  }
}

export default QuestionForm;
