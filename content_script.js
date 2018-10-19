var names = document.getElementsByClassName("name F-link");

/*for(var i=0; i < names.length; i++){
    console.log(names[i].innerHTML);
}*/
var namesArray = [];

for(var i=0; i < names.length; i++){
    namesArray.push(names[i].innerHTML);
}

chrome.storage.local.set({
	names: namesArray
}, function() {
});
