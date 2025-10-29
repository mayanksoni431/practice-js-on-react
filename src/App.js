import React from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const [promiseState, newPromiseState] = React.useState("Unresolved");
  const [eventCount, setEventCount] = React.useState(0);
  const [inputArr, setInputArr] = React.useState("1,5,2,7,3");
  const inputRef = React.useRef();

  //closure
  const myclosure = () => {
    let count = 0;
    const inc = () => {
      count = count + 1;
      return count;
    };
    return inc;
  };
  const mycounter = myclosure();

  //promise
  const mypromise = () => {
    const tempPromise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("Resolved"), 3000);
    });
    newPromiseState(tempPromise);
  };

  //event throttling
  const throttle = (func, limit) => {
    return function () {
      console.log(this, arguments);
      func.apply(this, arguments);
    };
  };

  // document.addEventListener("keypress", throttle(() => {
  //   console.log('keypress')
  //   setEventCount(prev => prev + 1)
  // }), 2000)

  //js micro task example
  const exampleMicroTask = () => {
    console.log("Start");
    queueMicrotask(() => {
      console.log("Microtask: queueMicrotask");
    });
    console.log("End");
  };

  //js exampleHoisting
  const exampleHoisting = () => {
    console.log(vr1);
    var vr1 = "var Hello";
    try {
      console.log(vr2);
      let vr2 = "Let Hello";
    } catch (error) {
      console.log(error);
    }

    try {
      console.log(vr3);
      const vr3 = "const Hello";
    } catch (error) {
      console.log(error);
    }
  };

  //js use of this context expalanation
  const exampleBind = () => {
    const bookstore = {
      name: "mybookstore",
      getName: function () {
        return `${this.name} has good books`;
      },
    };

    console.log("Check This", bookstore.getName());

    const bookStoreGetName2 = bookstore.getName.bind(bookstore);
    console.log(
      "Check This bookStoreGetName2 binded with obj",
      bookStoreGetName2()
    );

    try {
      const bookStoreGetName = bookstore.getName;
      console.log("Check This bookStoreGetName", bookStoreGetName());
    } catch (error) {
      console.log(error);
    }
  };

  //js exampleMergeSort
  const merge = (arr, l, midPlsOne, h) => {
    let aSize = midPlsOne;
    let bSize = h + 1;
    let cArr = new Array();
    let i = l;
    let j = midPlsOne;
    while (i < aSize && j < bSize) {
      if (arr[i] <= arr[j]) {
        cArr.push(arr[i]);
        i++;
      } else {
        cArr.push(arr[j]);
        j++;
      }
    }
    while (i < aSize) {
      cArr.push(arr[i]);
      i++;
    }
    while (j < bSize) {
      cArr.push(arr[j]);
      j++;
    }

    let c = 0;
    while (c < cArr.length) {
      arr[l + c] = cArr[c];
      c++;
    }
  };

  const mergeSort = (arr, l, h) => {
    if (l >= h) {
      return;
    }
    let m = Math.trunc((l + h) / 2);
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, h);
    merge(arr, l, m + 1, h);
  };

  const exampleMergeSort = () => {
    let arr1 = inputArr.split(",").map((ele) => Number.parseInt(ele));
    console.log(arr1);
    mergeSort(arr1, 0, arr1.length - 1);
    console.log(arr1);
  };

  // js code for quick sort
  const quicksort = (arr, l, h, p) => {
    if (l < h) {
      let i = l;
      let j = l;
      while (i < h) {
        if (arr[i] <= arr[p]) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          i++;
          j++;
        } else {
          j = Math.min(i, j);
          i++;
        }
      }
      [arr[p], arr[j]] = [arr[j], arr[p]];
      quicksort(arr, l, j - 1, j - 1);
      quicksort(arr, j + 1, h, h);
    }
  };

  const exampleQuickSort = () => {
    alert(inputRef.current.value);
    let arr1 = inputArr.split(",").map((ele) => Number.parseInt(ele));
    console.log(arr1);
    quicksort(arr1, 0, arr1.length - 1, arr1.length - 1);
    console.log(arr1);
  };

  // example array methods
  const exampleArrayMeths = () => {
    const arr = inputRef.current.value;
    const arr1 = arr
      .split(",")
      .map((ele) => ({ id: Number.parseInt(ele), value: ele * 2 }));
    console.log(arr1);
    arr1.sort((ele1, ele2) => ele1.id - ele2.id);
    console.log(arr1);

    //flatMap
    var ar = [1, [2, 3], [4]]
    ar.flatMap(a => a) // flats and Maps --> returns [1,2,3,4]
    ar.flat() // returns [1,2,3,4]
  };

  // example for js currying
  const onChangeExCurry = (name) => {
    return (event) => {
      alert(`${name} : ${event.target.value}`);
    };
  };

  //example for js proxy objects (Vue.js way not React way( using Class ) )
  const exampleProxy = () => {
    const target = {
      message: "Hello",
    };

    const handler = {
      get: function (obj, prop) {
        return prop in obj ? obj[prop] : "Property not found";
      },

      set: function (target, prop, value) {
        console.log(`Setting ${prop} to ${value}`);
        target[prop] = value;
        return true;
      },
    };

    const proxy = new Proxy(target, handler);
    proxy["newMessage"] = "new Message";
    console.log(proxy.message); // "Hello"
    console.log(proxy.nonExistent); // "Property not found"
  };

  // example for js event propogation
  React.useEffect(() => {
    let i = 0;
    document.getElementById("mybuttonevent").addEventListener(
      "click",
      (e) => {
        console.log("button event captured", i++);
      }
    );
  }, []);

  const exampleEventPropo = (e) => {
    console.log("button event bubble");

    // js add element
    document.body.appendChild(<>This is added</>)

    //js ways to select an element 4 (name, id, class, tag)
    document.getElementById()
  };

  // react redux and middlewares
  const count = useSelector((store) => store.count)
  const dispatcher = useDispatch();
  const incCount = () => {
    dispatcher({ type: 'INC' })
  }

  return (
    <>
      <div>
        <h3>
          {
            "This is closure functions {used as default access modifiers as js only has publis and private(using#before names) }"
          }
        </h3>
        <p>
          {mycounter()}
          {mycounter()}
          {mycounter()}
          {mycounter()}
          {mycounter()}
        </p>
      </div>

      <div>
        <h3>{"This is promise resolve in 3 sec"}</h3>
        <div>{promiseState}</div>
        <button
          onClick={() => {
            mypromise();
          }}
        >
          Resolve It
        </button>
      </div>

      <div>
        <h3>{"This is event throtling 3 sec on resize window"}</h3>
        <button>Throttle: {eventCount}</button>
      </div>

      <div>
        <h3>
          {
            "This is js microtask example and how it gets executed: check console"
          }
        </h3>
        <button onClick={exampleMicroTask}>Example</button>
      </div>

      <div>
        <h3>{"This is js hoisting"}</h3>
        <button onClick={exampleHoisting}>Example</button>
      </div>

      <div>
        <h3>{"This is js use of context and bind context"}</h3>
        <button onClick={exampleBind}>Example</button>
      </div>

      <div>
        <h3>{"Practice sorting js - merge sort (in-place sorting)"}</h3>
        <input
          type="text"
          value={inputArr}
          onChange={(v) => setInputArr(v.target.value)}
        />
        <button onClick={exampleMergeSort}>Merge Sort</button>
      </div>

      <div>
        <h3>
          {
            "Practice sorting js - Quick sort (in-place sorting) with {uncontrolled input field}"
          }
        </h3>
        <input
          ref={inputRef}
          type="text"
          value={inputArr}
          onChange={(v) => setInputArr(v.target.value)}
        />
        <button onClick={exampleQuickSort}>Quick Sort</button>
      </div>

      <div>
        <h3>{"Array Input Implements {filter, sort"}</h3>
        <input defaultValue={inputArr} ref={inputRef} type="text" />
        <button onClick={exampleArrayMeths}>Array Methods</button>
      </div>

      <div>
        <h3>
          {
            "Currying technique for returning {filter's predicate, sort's comparator, event listners"
          }
        </h3>
        <input type="text" name="name" onChange={onChangeExCurry("name")} />
        <input type="email" name="email" onChange={onChangeExCurry("email")} />
        <input
          type="number"
          name="number"
          onChange={onChangeExCurry("number")}
        />
      </div>

      <div>
        <h3>{"Basic proxy object to intersapt objects"}</h3>
        <button onClick={exampleProxy}>Check Console</button>
      </div>

      <div id="mybuttonevent">
        <h3>{"Check EVent propogation for it"}</h3>
        <button onClick={exampleEventPropo}>Event Propo</button>
      </div>

      <div>
        <h3>{"Check Logging with 2 middlewares for redux counter"}</h3>
        <p>My Redux store counter value {count}</p>
        <button onClick={incCount}>Inc</button>
      </div>
    </>
  );
}

export default App;