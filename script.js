
// Camelcase
function searchButton() {
  var userInput = document.getElementById ("search_input").value
  console.log(userInput)
  var apiGiphyKey = "RBndWFUU3JZNPgZpC5u2EuWLAEZRQ1eJ"
  var apiSuperHeroKey ="10221123479452152"
  var superHeroApi = `https://superheroapi.com/api.php/${apiSuperHeroKey}`
  var giphy_Api = `https://api.giphy.com/v1/gifs/search?q=${userInput}&rating=g&api_key=${apiGiphyKey}`

  // async
  let searchUrl = `${superHeroApi}/search/${userInput}`

  // EMPTY PREVIOUS RESULTS
  SUPERHEROAPI_RESULTS = {}

  // FETCH SUPERHERO -> STORE DATA -> RENDER
  fetch(searchUrl)
    .then((data) => data.json())
    .then((json) => {
     
      
      updateDetailsBox(json.results[0])
    
    })

  // FETCH GIPHY -> RENDER
  fetch(giphy_Api).then(function(data){
    console.log(data)
    return data.json()
  })
  .then(function (responseBody) {
    var giphyContainer = document.getElementsByClassName("giphy-results")[0]

    giphyContainer.innerHTML = ""


    for (let imageInfo of responseBody.data.slice(0, 8)) {
      var imgPath = imageInfo.images.fixed_height.url
      var img = document.createElement("img")
      img.setAttribute("class", "giphy-img")
      img.setAttribute("src", imgPath)
      giphyContainer.append(img)
    }
  })
}
  
function updateDetailsBox(current) {
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

  let indentDiv = document.createElement("div")
  indentDiv.className = "indent"
  indentDiv.append(detailsTitle, description)

  let detailsBox = document.getElementsByClassName("details-box")[0]
  detailsBox.append(detailsImage, indentDiv)
  detailsBox.style.padding = "30px"

 
}