
let SelectedItem;
let list = document.getElementById('CoursesList');
let ActualList = [];
// Get all list items


// Add click event listener to each item



document.getElementById('button').onclick = function() {
if (SelectedItem == null)
return;

let newItem = document.createElement('li');
newItem.textContent = SelectedItem.textContent;
let sl = document.getElementById('SelectedCoursesList');
sl.appendChild(newItem);


};


///////////////////////////
//  this for getting data from database
// DONT DELETE

fetch("/db").then(res => res.json()).then(data => data.forEach( element => {
    ActualList.push(element.course_id);  
}))
updateList();





/////////////////////////////

//console.log(ActualList);


// function SendData()
// {
//     fetch("/send" , {
//         method: "POST",
//         headers: {
//             "Content-type" : "application/json"
//         },
//         body: JSON.st
//     })
// }

document.getElementById('update').onclick = function() 
{
    list.innerHTML = "";
    ActualList.forEach( (input) => {
        console.log(input);
        let newItem = document.createElement('li');
        newItem.textContent = input;

        newItem.addEventListener('click', () => {
            // Remove selection from other items
            list.forEach(li => li.classList.remove('selected'));
            // Add selection to the clicked item
            newItem.classList.add('selected');
            // Retrieve the selected item's data (e.g., ID)
            // const selectedId = newItem.getAttribute('data-id');
            SelectedItem = newItem;
            // console.log(`Selected item ID: ${selectedId}`);
            // You can perform further actions based on the selection
        });


        list.appendChild(newItem);
    });
    //console.log(ActualList.length);
}
