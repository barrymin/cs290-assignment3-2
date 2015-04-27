var faveList = [];
window.onload = function () {
  displayFavourites();

};
function Gist (id, desc, url) {
  this.id = id;
  this.desc = desc;
  this.url = url;
}

function displayFavourites() {
  if(localStorage.getItem("gists") != null){
    var temp = JSON.parse(localStorage.getItem("gists"));
	console.log(temp);
    var i;
    for(i = 0; i < temp.length; i++){
      addFavourite(createGistDiv(temp[i].id, temp[i].desc, temp[i].url));
    }
  }
}
function addFavourite(gist) {
  var i;
  //check if gist was already added
  for (i = 0; i < faveList.length; i++) {
    if(faveList[i].id == gist.childNodes[0].getAttribute("id"))
		return;
  }
  gist.setAttribute('class', 'FaveGist');
  gist.childNodes[0].setAttribute('value', '-');
  gist.childNodes[0].onclick = function() {
    deleteFavourite(gist);
  }
  var faves = document.getElementById('faves');
  faves.appendChild(gist);
  faveList[faveList.length] = new Gist (gist.childNodes[0].getAttribute("id"),
      gist.childNodes[1].childNodes[0].textContent,
      gist.childNodes[1].childNodes[1].textContent
    );
	console.log(faveList);
    localStorage.setItem("gists",JSON.stringify(faveList));
}
function deleteFavourite(gist){
  console.log("in delete yay!");
}
function fetchData() {
  var httpRequest;
  if (window.XMLHttpRequest) {
    httpRequest = new XMLHttpRequest();
  }
  if (!httpRequest) {
    alert('Cannot create XMLHTTP');
    return;
  }
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        var response = JSON.parse(this.responseText);
        createGistsList(response);
      }
    }
  };
  httpRequest.open('GET', ' https://api.github.com/gists');
  httpRequest.send();
}

function createGistsList(gistsList) {
  deleteGistsList();
  var gistsDiv = document.getElementById('gists');
  var i;
  for (i = 0; i < gistsList.length; i++) {
    //if it wasnt in fave
    if(!inFaveList(gistsList[i].id)){
      gistsDiv.appendChild(
      createGistDiv(gistsList[i].id,
      gistsList[i].description, gistsList[i].url));
    }
  }
}
function createGistDiv(id, desc, url) {
	  var button;
	  var gistDiv;
	  var p;
	  var a;
      gistDiv = document.createElement('div');
      gistDiv.setAttribute('class', 'gist');
      button = document.createElement('input');
      button.setAttribute('type', 'button');
      button.setAttribute('name', 'faveButton');
      button.setAttribute('value', '+');
      button.setAttribute("id", id);
	  button.onclick = function () {
		document.getElementById(id).parentNode.remove();
	    addFavourite(createGistDiv(id,desc,url));
      };
	  p = document.createElement('p');
      p.innerHTML = desc + " ";
      a = document.createElement('a');
      a.setAttribute("href", url);
      a.innerHTML = " " + url;
      p.appendChild(a);
      gistDiv.appendChild(button);
      gistDiv.appendChild(p);
	  return gistDiv;
}

function deleteGistsList() {
  var gists = document.getElementById('gists');
  var gist = document.getElementsByClassName('gist');
  var i;
  var length = gist.length;
  for (i = 0; i < length; i++) {
    gists.removeChild(gist[0]);
  }
}
function inFaveList(id) {
  var i;
  for (i = 0; i < faveList.length; i++) {
    if(faveList[i].id == id)
		return true;
  }
  return false;
}