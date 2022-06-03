
// url api.giphy.com

// GLOBAL VARIABLE (FOR STORING RESPONSE)
let SUPERHEROAPI_RESULTS = {}
let GIPHY_RESULTS = {}
let CURRENT_DISPLAY_KEYWORD = ""

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

  // XOA' PREVIOUS RESULTS
  SUPERHEROAPI_RESULTS = {}

  fetch(searchUrl)
    .then((data) => data.json())
    .then((json) => {
      for (let result of json.results) {
        SUPERHEROAPI_RESULTS[result.name] = result
      }

      CURRENT_DISPLAY_KEYWORD = json.results[0].name

      console.log(SUPERHEROAPI_RESULTS)
      
      updateDetailsBox()
      displayResults()
    })

  // fetch giphy -> store results



  

  // fetch(giphy_Api).then(function(data){
  //   console.log(data)
  //   return data.json()
  // })
  // .then(function (json) {
  //   console.log(json.data[0].images.fixed_height.url)
  //   var imgPath = json.data[0].images.fixed_height.url
  //   var img = document.createElement("img")
  //   img.setAttribute("src", imgPath)
  //   document.body.appendChild(img)
  // })

  //
  //resultsSection 
  // var resultSection = $("gif-results")

  // function assignResultToMainPage(hitArray) {
  //   console.log(hitArray)
  //     resultSection.empty();
  //     for (var i=0; i<hitArray.length; i++){
  //       var gifBox =$("<button>");
  //       gifBox.addClass("card mx-auto m-4 p-2");
  //       var albumgif = $(`<img src="${hitArray[i].result.header_image_thumbnail_url}">`);
  //       albumgif.addClass("album-art card-img-top");
        

  //       // cardContainer.on('click', { songObject: hitArray[i] }, function (event) {
  //       //   assignSelectedSongToSecondaryPage(event.data.songObject);
  //       // });

  //       gifBox.append(albumgif);
        
  //     }
  //     }
  //   }
    // Luu json response vo local storage
    // setItem("results", json);

    // let results = getItem("results")
    // lay api from mavel.com

}

function updateDetailsBox() {
  let current = SUPERHEROAPI_RESULTS[CURRENT_DISPLAY_KEYWORD]
  // LAY' MAY CAI ELEMENTS THUOC VE DETAILS BOX DE UPDATE NOI. DUNG
  var detailsImage = document.getElementsByClassName("details-hero-image")[0]
  detailsImage.src = current.image.url

  let detailsTitle = document.getElementsByClassName("details-title")[0]
  detailsTitle.innerText = current.name
  
  let description = document.getElementsByClassName("description")[0]
  detailsTitle.innerText = `
    Full Name: ${current.biography["full-name"]}
    Place of birth:${current.biography["place-of-birth"]}
    Publisher:${current.biography.publisher}
  `
}

function displayResults() {
  var resultContainer = document.getElementsByClassName("gif-results")[0]

  resultContainer.innerHTML = ""

  for (let key in SUPERHEROAPI_RESULTS) {
    let result = SUPERHEROAPI_RESULTS[key]
    console.log(result)
    let card = displayCard(
      result.image.url, 
      result.name, 
      result.biography["full-name"], 
      result.biography["place-of-birth"],
      result.biography.publisher,
    )
    resultContainer.append(card)
  }
}

function displayCard(imageSrc, title, fullname, pob, publisher) {
  var cardElement = document.createElement("section")
  cardElement.className = "gif-box"
  
  var imageElement = document.createElement("img")
  imageElement.className = "project-image"
  imageElement.src = imageSrc
  imageElement.width = 288

  var titleElement = document.createElement("h3")
  titleElement.className = "gif-title"
  titleElement.innerText = title

  var generalInfoElement = document.createElement("p")
  generalInfoElement.innerText = `
    Full Name: ${fullname}
    Place of birth:${pob}
    Publisher:${publisher}
  `

  cardElement.append(imageElement, titleElement, generalInfoElement)

  cardElement.onclick = () => {
    CURRENT_DISPLAY_KEYWORD = title
    console.log(CURRENT_DISPLAY_KEYWORD)
    updateDetailsBox()
  }

  return cardElement;
}

// function displayResults() {
//   var resultSection = document.getElementsByClassName("result")[0]
//   resultSection.setAttribute("src", "results.html")
// }