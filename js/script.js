/*
function handleSubmit(event){
    document.getElementById('myForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const textInput = formData.get('textInput');
        //const apiOption = formData.get('apiOption');
      
        fetch('https://api.genderize.io/?name=' + textInput, {
            method: "GET"
        }) //+ '&option=' + apiOption)
          .then(response => {
            
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            const responseElement = document.getElementById('response');
            responseElement.innerHTML = JSON.stringify(data);
          })
          .then(html => this.innerHTML)
          .catch(error => console.error('Error:', error));
          
      });
}
*/

function handleSubmit(event) {
  event.preventDefault();
  const textInput = document.getElementById('textInput').value;

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
      const responseElement = document.getElementById('response');
      responseElement.innerHTML = JSON.stringify(data);
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById('myForm').addEventListener('submit', handleSubmit);
