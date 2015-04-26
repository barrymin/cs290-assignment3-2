window.onload = function () {
  generateFavourites();
};
function generateFavourites () {
  
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
  httpRequest.onreadystatechange = function (){
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

function createGistsList(gistsList){
  deleteGidtsList();
  var gistsDiv = document.getElementById('gists');
  var button;
  var gistDiv;
  var p;
  var a;
  var i
  for(i = 0; i < gistsList.length; i++){
      gistDiv = document.createElement('div');
      gistDiv.setAttribute('class', 'gist');
      button = document.createElement('input');
      button.setAttribute('type', 'button');
      button.setAttribute('name', 'faveButton');
      button.setAttribute('value', '+');
      button.setAttribute("gistId", gistsList[i].id);
      //button.setAttribute('onclick', 'addFave()');
      p = document.createElement('p');
      p.innerHTML = gistsList[i].description + " ";
      a = document.createElement('a');
      a.setAttribute("href", gistsList[i].url);
      a.innerHTML = " " + gistsList[i].url;
      p.appendChild(a);
      gistDiv.appendChild(button);
      gistDiv.appendChild(p);
      gistsDiv.appendChild(gistDiv);
  }
}

function deleteGidtsList(){
  var gists = document.getElementById('gists');
  var gist = document.getElementsByClassName('gist');
  var i;
  var length = gist.length;
  for (i=0; i < length; i++){
    gists.removeChild(gist[0]);    
	}
	
}