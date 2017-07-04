//Listen for form event
// Listen to see when submit gets 
// pressed and calls function saveBookmark
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// save bookmark takes 1 parameter
// and uses the method preventDefault()
// to prevent the form from submitting to
// show the results on the window
function saveBookmark(e){
	
	// get form values
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

	// calls function to validate form
	// if the function returns false
	// this if statement returns false
	// and doesn't submit form
	if(!validateForm(siteName, siteUrl)){
		return false;
	};

	// bookmark object is created
	// with keys named name and site, 
	// with property siteName and siteUrl
	// with values the user typed in
	var bookmark ={
		name : siteName,
		site : siteUrl
	}

	//check if bookmarks is null (the user didn't type anything)
	// in other words looks to check if the used had saved bookmarks already
	// if not then it'll create an array called bookmarks
	if (localStorage.getItem('bookmarks') ==="null"){
		
		//init array
		var bookmarks = [];

		//add to the array
		bookmarks.push(bookmark);
		//set to local storage
		// HTML5 localStorage object is used here with the
		// method setItem and sets it in a key called bookmarks, and 
		// you pass the array you created above called bookmarks
		// but since localStorage only takes strings, JSONs stringify
		// method is used here to convert the array into a string
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}else{
		//get bookmarks and parse so it can turn back into an object so it can 
		// be used to used it as an array
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

	// loops thruoug the bookmarks object
	// and assigns the name and site key values
	// to variable name and site so they can used to create a DIV
	for(var i=0; i<bookmarks.length; i++){
		var name = bookmarks[i].name;
		var site = bookmarks[i].site;

		// create a div with two buttons 
		bookmarkResults.innerHTML += '<div class="well">'+
										'<h3>' +name+
										' <a class="btn btn-default" target="_blank" href="'+site+'">Visit</a> '+
										// onclick it call the deleBookmark function and takes 1 parameter which will
										// delete the current div
										' <a onclick="deleteBookmark(\''+site+'\')" class="btn btn-danger"  href="#">Delete</a> '
										'</h3>' +
										'</div>';
	}

}
// checks to see if the form has been filled in
// takes the two values from user
function validateForm(siteName, siteUrl){

	if(!siteName || !siteUrl){
		alert('Please fill in the form');
		return false;
	}
	// this expression is used to check if the user typed http://
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteUrl.match(regex)){
		alert("please use a valid URL");
		return false;
	}
	return true;
}





