function handleSave(){
  // Getting the value of the text input field
  let textInput = document.getElementById('textInput').value;
  // Getting the paragraph element for response gender
  let paragraphInput = document.getElementById('response gender');
  // Checking if the male radio button is checked
  let radioMale = document.getElementById('male radio').checked;
  // Checking if the female radio button is checked
  let radioFemale = document.getElementById('female radio').checked;
  
  // If male radio button is checked, store the text input with value "male" in the local storage
  if (radioMale == true){
    localStorage.setItem(textInput, "male");
  }
  // If female radio button is checked, store the text input with value "female" in the local storage
  else if (radioFemale == true){
    localStorage.setItem(textInput, "female");
  }
  // If neither male nor female radio is checked
  else{
    // Check if the paragraph input contains specific error message
    if (paragraphInput.textContent == "The name provided doesn't exist in API database.") {
      // Set the response gender paragraph to an error message
      document.getElementById('response gender').innerHTML = "The name provided doesn't exist in API database.";
      // Clear the response probability paragraph
      document.getElementById('response probability').innerHTML = "";
    }
    // If the paragraph input is empty
    else if (paragraphInput.textContent == ""){
      // Set the response gender paragraph to a different error message
      document.getElementById('response gender').innerHTML = "There is no name provided by API to store.";
      // Clear the response probability paragraph
      document.getElementById('response probability').innerHTML = "";
    }
    // If none of the above conditions are met
    else if (paragraphInput.textContent == "male" || paragraphInput.textContent == "female"){
      // Store the text input value with the content of the response gender paragraph in the local storage
      localStorage.setItem(textInput, paragraphInput.textContent);
    }
    else {
            // Set the response gender paragraph to an error message
            document.getElementById('response gender').innerHTML = "API call failed.";
            // Clear the response probability paragraph
            document.getElementById('response probability').innerHTML = "";
    }
  }

  // Call a function to handle the saved storage
  savedStorage();
}

function handleClear(){
  let textInput = document.getElementById('textInput').value;
  // Clear all items from local storage
  localStorage.removeItem(textInput);
  // Update the text content of an element with the id "saved" to notify the user that local storage has been cleared
  document.getElementById("saved").innerText = "Local storage has been cleared";
}

function handleSubmit(event) {
  // Prevent the default form submission behavior
  event.preventDefault();
  // Get the value of the text input with the id "textInput"
  let textInput = document.getElementById('textInput').value;
  // Check whether the "male" radio button is checked
  let radioMale = document.getElementById('male radio').checked;
  // Check whether the "female" radio button is checked
  let radioFemale = document.getElementById('female radio').checked;

  // Make a GET request to the genderize API with the provided text input
  fetch('https://api.genderize.io/?name=' + textInput, {
    method: "GET"
  })
    // Handle the response from the API
    .then(response => {
      // Check if the response is not OK, throw an error
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Parse the response as JSON
      return response.json();
    })
    // Handle the data received from the API
    .then(data => {
      // Check if the gender value in the response data is null
      if (JSON.stringify(data.gender) == "null"){
        // Update the HTML content of an element with the id "response gender" to show that the name doesn't exist in the API database
        document.getElementById('response gender').innerHTML = "The name provided doesn't exist in the API database.";
        // Clear the HTML content of an element with the id "response probability"
        document.getElementById('response probability').innerHTML = "";
      }
      else{
        // Update the HTML content of an element with the id "response gender" to show the gender from the API response
        const responseElementGender = document.getElementById('response gender');
        responseElementGender.innerHTML = data.gender;
  
        // Update the HTML content of an element with the id "response probability" to show the probability from the API response
        const responseElementProbability = document.getElementById('response probability');
        responseElementProbability.innerHTML = JSON.stringify(data.probability);
      }
    })
    // Handle any errors that occurred during the fetch or data processing
    .catch(error => {
      // Show error message in response gender part
      document.getElementById('response gender').innerHTML = error.message;
      // Clear the HTML content of an element with the id "response probability"
      document.getElementById('response probability').innerHTML = "";
    });
}

// Add an event listener to the form with the id "myForm" to handle the form submission
document.getElementById('myForm').addEventListener('submit', handleSubmit);

function savedStorage() {
  let textInput = document.getElementById('textInput').value;
  // Retrieves the value entered in the input field with the id 'textInput'
  
  if (typeof(Storage) !== "undefined") {
    // Checks if local storage is supported by the current browser
    var savedItem = localStorage.getItem(textInput);
    // Retrieves the item with key as the value of the text input from local storage

    if (savedItem) {
      document.getElementById("saved").innerText = savedItem;
      // Displays the retrieved item in an element with id 'saved' if it exists in local storage
    } else {
      document.getElementById("saved").innerText = "No item found in local storage.";
      // Displays a message indicating no item was found in local storage
    }
  } else {
    document.getElementById("saved").innerText = "Local storage is not supported.";
    // Displays a message indicating that local storage is not supported in the current browser
  }

}

