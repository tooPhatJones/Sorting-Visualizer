import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 100;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  heapSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  bubbleSort(){
    var arrayBars = document.getElementsByClassName('array-bar');
    var i = 0;
    let interval = setInterval(function () {
      if (i < arrayBars.length - 1) {
        for(var b =0; b< arrayBars.length -i-1; b++){
        if (parseInt(arrayBars[b].style.height) > parseInt(arrayBars[b + 1].style.height)) {
          // document.getElementById("array-bar").backgroundColor = "turquoise"
          let temp1 = arrayBars[b].style.height
          let temp2 = arrayBars[b + 1].style.height
          arrayBars[b + 1].style.height = temp1
          arrayBars[b + 1].style.backgroundColor = 'red'
          arrayBars[b].style.height = temp2
          arrayBars[b].style.backgroundColor = 'turquoise'
          if(b == arrayBars.length-i)arrayBars[b + 1].style.backgroundColor = 'turquoise'

        }
      }
        i++
      } else {
        clearInterval(interval)
      }
    }, 900);
    // function setter(newstate) {
    //   this.setState({ array: newstate })
    // }
    // const update = (newstate) => {  this.setState({ array: newstate })}
     

    // var arrayBars = this.state.array;
    // var i = 0;
    // var arrayreturn = this.state.array;
    // let interval = setInterval(function () {
    
    //   arrayreturn[0] = 5;
    //   update(arrayreturn)
    //   const update = () => { setter(arrayreturn ) }
    //   update()
    //   if (i < arrayBars.length - 1) {
    //     for(var b =0; b< arrayBars.length -i-1; b++){
    //     console.log(arrayBars[b])
    //     console.log(b);
    //     if (arrayBars[b] < arrayBars[b + 1] ) {
    //       let temp1 = arrayBars[b]
    //       let temp2 = arrayBars[b + 1]
    //       arrayBars[b + 1] = temp1
    //       arrayBars[b] = temp2
    //     }
    //     // this.setState({array: arrayBars})
    //     //setter(arrayBars)
    //     const update = () => {this.setState({array: arrayBars})}
    //     update()
    //   }
    //     i++
    //   } else {
    //     clearInterval(interval)
    //   }
    // }, 10);
  }

  
  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }

  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button onClick={() => this.testSortingAlgorithms()}>
          Test Sorting Algorithms (BROKEN)
        </button>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
