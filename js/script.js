//Listen for form event
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// save bookmark
function saveBookmark(e){
	
	// get form values
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;


	if(!validateForm(siteName, siteUrl)){
		return false;
	};

	var bookmark ={
		name : siteName,
		site : siteUrl
	}

	// console.log(bookmark);

	//local storage test
	// localStorage.setItem('test', 'Hello World');
	// console.log(localStorage.getItem('test'));
	// localStorage.removeItem('test');
	// console.log(localStorage.getItem('test'));

	//check if bookmarks is null
	if (localStorage.getItem('bookmarks') ==="null"){
		
		//init array
		var bookmarks = [];

		//add to the array
		bookmarks.push(bookmark);
		//set to local storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}else{
		//get bookmarks and parse to a string(local storage only accepts strings)
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//add to array
		bookmarks.push(bookmark);
		//and set it in local storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}
	//clear form
	document.getElementById('myForm').reset();
	//re fetch bookmarks
	fetchBookmark();
	// prevent form from submitting
	e.preventDefault();
}
//delete bookmark
function deleteBookmark(url){
	//get bookmarks from local storage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	//loop through bookmarks
	for(var i=0; i<bookmarks.length; i++){
		if(bookmarks[i].site == url){
			//remove from array
			bookmarks.splice(i, 1)
		}

	}
	//reset back to local storage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	//re fetch bookmarks
	fetchBookmark();
}
// fetch bookmark
function fetchBookmark(){
	//get bookmars from local storage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	//get output id
	var bookmarkResults = document.getElementById('bookmarksResult');
	
	//build output
	bookmarkResults.innerHTML = '';	

	for(var i=0; i<bookmarks.length; i++){
		var name = bookmarks[i].name;
		var site = bookmarks[i].site;

		bookmarkResults.innerHTML += '<div class="well">'+
										'<h3>' +name+
										' <a class="btn btn-default" target="_blank" href="'+site+'">Visit</a> '+
										' <a onclick="deleteBookmark(\''+site+'\')" class="btn btn-danger"  href="#">Delete</a> '
										'</h3>' +
										'</div>';
	}

}

function validateForm(siteName, siteUrl){

	if(!siteName || !siteUrl){
		alert('Please fill in the form');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteUrl.match(regex)){
		alert("please use a valid URL");
		return false;
	}
	return true;
}





