/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

const itemsPerpage = 9;
let currentPage =1;
/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list,page){
  let startIndex = (page  * itemsPerpage) - itemsPerpage;
  let endIndex = page  * itemsPerpage;
  let studentList = document.querySelector('.student-list') ;
  studentList.innerHTML = "";

  if(list.length > 0){
    for (let i = 0; i < list.length; i++){
      if(i >= startIndex && i < endIndex){
          let studentItem = `
          <li class="student-item cf">
          <div class="student-details">
            <img class="avatar" src=${list[i].picture.large} alt="Profile Picture">
          <h3>${list[i].name.first} ${list[i].name.last}</h3>
            <span class="email">${list[i].email}</span>
          </div>
          <div class="joined-details">
            <span class="date">Joined ${list[i].registered.date}</span>
          </div>
        </li>
          `
        studentList.insertAdjacentHTML('beforeend' , studentItem);
      };
    }
  }else {
    studentList.insertAdjacentHTML('beforeend', '<h1> No Results Found</h1>');
  };
};




/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {

// create a variable to calculate the number of pages needed
   let numberOfItems = Math.ceil(list.length / itemsPerpage);
// select the element with a class of `link-list` and assign it to a variable

  let linkList = document.querySelector('.link-list');
// set the innerHTML property of the variable you just created to an empty string
  linkList.innerHTML = "";
  // loop over the number of pages needed
  for (let i = 1; i <= numberOfItems; i++) {
     // create the elements needed to display the pagination button
    let button = `<li>
    <button type="button"${currentPage === i ? 'class="active"' : '' }>${i}</button>
    </li>`;
    // insert the above elements
    linkList.insertAdjacentHTML('beforeend', button);
  };

  let buttonActive = document.querySelector('button');
  // give the first pagination button a class of "active"
  buttonActive.className = 'active';



// Call functions
// create an event listener on the `link-list` element
 linkList.addEventListener('click', event => {
   // if the click target is a button:
      if(event.target.tagName == 'BUTTON') {
        // remove the "active" class from the previous button
         document.querySelectorAll('.active').forEach( (el) => { el.className = ''; });
         // Add the "active" class to the current clicked button
         event.target.className = 'active';
         currentPage = event.target.textContent;
         showPage(list, event.target.textContent);
      };
   });
};
let searchBar = document.createElement('form');
searchBar.innerHTML = `
<label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button #id="submit" class = "searchButton" type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>`

document.querySelector('header').appendChild(searchBar);

let searchButton = document.querySelector('.searchButton');
let searchForm = document.querySelector('#search');

function searchIt (entry, list){
   let searchResultat = [];
   for (let i = 0; i < list.length; i++){
      let fullName = list[i].name.first + list[i].name.last;
      let input = entry.value
         if(input !== 0 && fullName.toLowerCase().includes(input.toLowerCase())){
            searchResultat.push(list[i]);
            addPagination(searchResultat);
         }
      }
  showPage(searchResultat, 1)
}


searchButton.addEventListener('click', (e) =>{
   searchIt(searchForm, data);
})


searchForm.addEventListener('keyup', (e) =>{
   searchIt(searchForm, data);

})



// Call functions
addPagination(data);
showPage(data,1);
