
// Creating Function for Search Button to tied API Keys
function searchButton() {
  // Creating Variables for API Keys and User Input
  var userInput = document.getElementById("search_input").value
  console.log(userInput)
  var apiGiphyKey = "RBndWFUU3JZNPgZpC5u2EuWLAEZRQ1eJ"
  var apiSuperHeroKey = "10221123479452152"
  var superHeroApi = `https://superheroapi.com/api.php/${apiSuperHeroKey}`
  var giphy_Api = `https://api.giphy.com/v1/gifs/search?q=${userInput}&rating=g&api_key=${apiGiphyKey}`

  // Taking User Input from Search Button and applying to Super Hero API to get results
  let searchUrl = `${superHeroApi}/search/${userInput}`


  // This is telling the Super Hero API to send us the requested data from userInput
  fetch(searchUrl)
    .then((data) => data.json())
    .then((json) => {


      updateDetailsBox(json.results[0])

    })

  // This is telling the Giphy API to send us the requested data based on userInput
  fetch(giphy_Api).then(function (data) {
    console.log(data)
    return data.json()
  })
    .then(function (responseBody) {
      var giphyContainer = document.getElementsByClassName("giphy-results")[0]

      giphyContainer.innerHTML = ""

      // Tells API to only provide 10 results per userInput 
      for (let imageInfo of responseBody.data.slice(0, 10)) {
        var imgPath = imageInfo.images.fixed_height.url
        var img = document.createElement("img")
        img.setAttribute("class", "giphy-img")
        img.setAttribute("src", imgPath)
        giphyContainer.append(img)
      }
    })
}
// Takes Data from API and applies it to the placeholders designated in HTML 
function updateDetailsBox(current) {
  // This applies data from Super Hero API to placeholders
  let detailsImage = document.createElement("img")
  detailsImage.className = "details-hero-image"
  detailsImage.src = current.image.url
  detailsImage.width = 288
  detailsImage.height = 377

  let detailsTitle = document.createElement("h3")
  detailsTitle.className = "details-title"
  detailsTitle.innerText = current.name

  let description = document.createElement("p")
  description.className = "description"
  description.innerText = `
    Full Name: ${current.biography["full-name"]}
    Place of birth:${current.biography["place-of-birth"]}
    Publisher:${current.biography.publisher}
  `
  // This applies data from Giphy API to placesholders 
  let indentDiv = document.createElement("div")
  indentDiv.className = "indent"
  indentDiv.append(detailsTitle, description)

  let detailsBox = document.getElementsByClassName("details-box")[0]
  detailsBox.innerHTML = ''
  detailsBox.append(detailsImage, indentDiv)
  detailsBox.style.padding = "30px"

}