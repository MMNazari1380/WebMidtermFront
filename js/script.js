
function handleSave(){

  let textInput = document.getElementById('textInput').value;
  let paragraphInput = document.getElementById('response gender');
  let radioMale = document.getElementById('male radio').checked;
  let radioFemale = document.getElementById('female radio').checked;
  
  if (radioMale == true){
    localStorage.setItem(textInput.value, "male");
  }
  else if (radioFemale == true){
    localStorage.setItem(textInput.value, "female");
  }
  else{
    if (paragraphInput.textContent == "The name provided doesn't exist in API database.") {
      document.getElementById('response gender').innerHTML = "The name provided doesn't exist in API database.";
      document.getElementById('response probability').innerHTML = "";
    }
    else if (paragraphInput.textContent == ""){
      document.getElementById('response gender').innerHTML = "There is no name provided by API to store.";
      document.getElementById('response probability').innerHTML = "";
    }
    else {
      localStorage.setItem(textInput.value, paragraphInput.textContent);
    }
  }

  savedStorage();
}

function handleClear(){
  localStorage.clear();
  document.getElementById("saved").innerText = "Local storage has been cleared";
}

function handleSubmit(event) {
  event.preventDefault();
  let textInput = document.getElementById('textInput').value;
  let radioMale = document.getElementById('male radio').checked;
  let radioFemale = document.getElementById('female radio').checked;

  
    fetch('https://api.genderize.io/?name=' + textInput, {
      method: "GET"
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (JSON.stringify(data.gender) == "null"){
          document.getElementById('response gender').innerHTML = "The name provided doesn't exist in API database.";
          document.getElementById('response probability').innerHTML = "";
        }
        else{
          const responseElementGender = document.getElementById('response gender');
          responseElementGender.innerHTML = JSON.stringify(data.gender);
    
          const responseElementProbability = document.getElementById('response probability');
          responseElementProbability.innerHTML = JSON.stringify(data.probability);
        }
      })
      .catch(error => console.error('Error:', error));

  }


  

document.getElementById('myForm').addEventListener('submit', handleSubmit);

function savedStorage(){
  let textInput = document.getElementById('textInput').value;
  // Check if local storage is supported
  if (typeof(Storage) !== "undefined") {
  // Retrieve the item from local storage
  var savedItem = localStorage.getItem(textInput.value);

  // Display the item
  if (savedItem) {
    document.getElementById("saved").innerText = savedItem;
  } else {
    document.getElementById("saved").innerText = "No item found in local storage.";
  }
  } else {
    document.getElementById("saved").innerText = "Local storage is not supported.";
  }

}

