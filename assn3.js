window.onload = function () {
  displayFavourites();
};
function displayFavourites() {
}
function addFavourite(gist) {
  gist.childNodes[0].setAttribute('value', '-');
  gist.childNodes[0].onclick = function() {
    deleteFavourite(gist);
  }
  var faves = document.getElementById('faves');
  faves.appendChild(gist);
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
    gistsDiv.appendChild(
	  createGistDiv(gistsList[i].id,
	    gistsList[i].description, gistsList[i].url));
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