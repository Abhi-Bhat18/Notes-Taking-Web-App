console.log("This is Note Book App");
showNote();
// Getting notes from the user
let noteArea = document.getElementById("noteArea");
let addBtn = document.getElementById("addBtn");

//Saving the notes in Localstorage
addBtn.addEventListener("click", () => {
  let note = noteArea.value;
  let notes = localStorage.getItem("notes"); // getiing a string form localstorage if it exists
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }
  //if conditon for if we enter blanck
  if (note.length != 0) {
    noteObj.push(note);

    localStorage.setItem("notes", JSON.stringify(noteObj));
  }

  noteArea.value = ""; // clearing the textarea
  showNote(); // Display the note as you save it
});

// Function to display the notes
function showNote() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);

    let html = "";
    //Display card to show notes
    noteObj.forEach((element, index) => {
      html =
        html +
        `<div class="card  my-2 mx-2" style="width: 18rem;">
    
    <div class="card-body" id='${index}'>
      <h5 class="card-title">Note ${index + 1}</h5>
      <p >${element}</p>
      <button onclick="deleteNote(${index})" class="btn btn-primary">Delete Note</button>
    </div>
  </div>
           `;
    });
    let display = document.getElementById("display");
    display.innerHTML = html;
  }
}

// Deleting the note
function deleteNote(id) {
  console.log("I am deleting the Note");
  console.log("Id is " + id);
  let notes = localStorage.getItem("notes");
  console.log(typeof notes);
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }
  console.log(noteObj);
  noteObj.splice(id, 1);
  localStorage.setItem("notes", JSON.stringify(noteObj));
  showNote();
}

//Searching the note
let searchBtn = document.getElementById("searchBtn");
let searchBar = document.getElementById("searchBar");
//function to search the notes
function searchNote() {
  let inputVal = searchBar.value;
  let display = document.getElementById('display').children;
  console.log(display.children);
  // let card = document.getElementById('card');
  Array.from(display).forEach((element)=>{
    let cardTxt = element.getElementsByTagName('p')[0].innerText;
    // console.log(typeof cardTxt);
    if(cardTxt.includes(inputVal)){
      element.style.display = 'block';
    }
    else{
      element.style.display = 'none';
    }
  })





   
  searchBar.value = "";
}
searchBtn.addEventListener("click", searchNote);
