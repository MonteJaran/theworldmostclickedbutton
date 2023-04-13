import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {

  apiKey: "AIzaSyDjgIHlp1eI76Mw9dr1XKC34-MHfaNdrto",

  authDomain: "the-world-most-clicked-button.firebaseapp.com",

  projectId: "the-world-most-clicked-button",

  storageBucket: "the-world-most-clicked-button.appspot.com",

  messagingSenderId: "349614396467",

  appId: "1:349614396467:web:972d377b23e3429db97f46",

  measurementId: "G-WDSS63P7NZ"

};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const countSpan = document.getElementById("span");
const counter = document.getElementById("counter");
const incrementBtn = document.getElementById("increment-btn");
const storageRef = firebase.storage().ref("value.json"); // reference to the file in Firebase Storage
let buttonPressed = false;
let clickAmount = 0;
let time = 0;
let timer;

// Attach a click event listener to the button
incrementBtn.addEventListener("click", function() {
  console.log("Started");
  buttonPressed = true;
  clickAmount++;
});

async function updateCounter() {
  if (!buttonPressed) {
    return;
  }

  if (time < 1) {
    countSpan.textContent = parseInt(countSpan.textContent) + 1;
    buttonPressed = false;
    return;
  }

  try {
    console.log("Trying");
    const valueSnapshot = await storageRef.getDownloadURL();
    const response = await fetch(valueSnapshot);
    console.log(response);
    const data = await response.json();
    console.log("1");
    if (data.value !== undefined) {
      counter.style.display = "inline-block"; // show counter element
      console.log("2");
      const newValue = parseInt(data.value) + clickAmount;
      console.log("newValue: "+ newValue);
      if (newValue !== parseInt(countSpan.textContent)) {
        // update the displayed value only if it has changed
        console.log("3");
        countSpan.textContent = newValue;
        // send the new value to Firebase
        await storageRef.putString(JSON.stringify({ value: clickAmount }));
        console.log("Done1");
      }
    } else {
      countSpan.textContent = parseInt(countSpan.textContent) + clickAmount;
      // send the new value to Firebase
      await storageRef.putString(JSON.stringify({ value: parseInt(countSpan.textContent) }));
      console.log("Done23");
    }
  }
  catch (error) {
    console.error('Error fetching data:', error);
  }

  buttonPressed = false;
  console.log("clickAmount" + clickAmount);
  clickAmount = 0;
  time = 0;
}

RefreshIt();

function RefreshIt() {
  buttonPressed = true;
  time++;
  updateCounter();
}

timer = setInterval(() => {
  buttonPressed = true;
  time++;
  updateCounter();
}, 5000);

// Attach a click event listener to the increment button
incrementBtn.addEventListener("click", () => {
  buttonPressed = true;
  updateCounter();
  // Make an AJAX request to the PHP script to increment the value in the file

    // Create the "+1" element
    const plusOne = document.createElement("span");
    plusOne.textContent = "+1";
    plusOne.classList.add("plus-one");

    // Calculate the top position for the "+1" element
    const screenHeight = window.innerHeight;
    const radius = screenHeight * 0.2;
    let topPosition = Math.floor(Math.random() * (screenHeight - radius * 2)) + radius;

    // Calculate the left position for the "+1" element
    const screenWidth = window.innerWidth;
    const leftPosition = Math.floor(Math.random() * (screenWidth - radius * 2)) + radius;

    // Check if the generated position is within the excluded area around the middle of the screen
    const excludedAreaHeight = screenHeight * 0.15;
    const excludedAreaWidth = screenWidth * 0.15;
    const middleHeight = screenHeight / 2;
    const middleWidth = screenWidth / 2;
    const topMin = middleHeight - excludedAreaHeight;
    const topMax = middleHeight + excludedAreaHeight;
    const leftMin = middleWidth - excludedAreaWidth;
    const leftMax = middleWidth + excludedAreaWidth;

    if (topPosition >= topMin && topPosition <= topMax && leftPosition >= leftMin && leftPosition <= leftMax) {
      // If the generated position is within the excluded area, recalculate the top position
      topPosition = topPosition <= middleHeight ? topMax + radius : topMin - radius;
    }

    // Set the top and left positions for the "+1" element
    plusOne.style.top = `${topPosition}px`;
    plusOne.style.left = `${leftPosition}px`;

    // Add the "+1" element to the chosen body
    document.getElementById("main-div").appendChild(plusOne);

    // Remove the "+1" element after 1 second
    setTimeout(() => {
      plusOne.classList.add("fade-out");
      setTimeout(() => {
        document.getElementById("main-div").removeChild(plusOne);
      }, 1000);
    }, 10);
    console.log("Done2");
});
