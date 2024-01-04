
document.getElementById('myForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const textInput = formData.get('textInput');
  const apiOption = formData.get('apiOption');

  fetch('https://api.genderize.io/?name=' + textInput + '&option=' + apiOption)
    .then(response => response.json())
    .then(data => {
      const responseElement = document.getElementById('response');
      responseElement.innerHTML = JSON.stringify(data);
    })
    .catch(error => console.error('Error:', error));
});
