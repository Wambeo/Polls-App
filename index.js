fetch("http://localhost:3000/polls")
 .then((response)=>response.json())
 .then((polls)=>{
    
  displayPosts(polls)
  console.log(polls)
 })

function displayPosts(polls)
{


  let cardsContainer = document.getElementById("cardsContainer");

  for(poll of polls){
    cardsContainer.innerHTML += `
    

<div class="max-w-sm mx-auto p-7 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${poll.title}</h5>
<p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${poll.question}</p>
<select name="Political">
                    <option value="Null"> Choose Political Party</option>
                        <option value="${poll.option1}">${poll.option1}</option>
                        <option value="${poll.option2}">${poll.option2}</option>
                        
</select><br>
<div class="my-2">Deadline: ${poll.deadline}</div>
<button type="button" onclick="editPost(${poll.id})" class="text-white bg-green-500 my-2 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</button>
<button type="button" onclick="deletePost(${poll.id})"  class="text-white bg-red-500 my-2 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
</div>

    
    `
  }

}
document.getElementById("form").addEventListener("submit", (event)=>{
    event.preventDefault()
  
    const title = document.getElementById("company").value
    const question = document.getElementById("question").value
    const deadline = document.getElementById("deadline").value
    const first = document.getElementById("option1").value
    const second = document.getElementById("option2").value
  
  
    
    fetch("http://localhost:3000/polls/", {
      method: "POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify({title: title, question: question, deadline: deadline, option1: first, option2: second})
    } )
    .then((data)=> data.json() )
    .then((response)=>{
  
      alert("Post added successfully")
    })
  
  
  })
  function deletePost(id)

{
  fetch(`http://localhost:3000/polls/${id}`, {
    method: "DELETE"
  })
  .then((data)=> data.json())
  .then((polls)=>{

    displayPosts(polls)
    alert("Post deleted successfully")

  })
}
function editPost(id)
{
  fetch(`http://localhost:3000/polls/${id}`)
  .then((data)=> data.json())
  .then((poll)=>{
     const update_container = document.getElementById("update_container")

     update_container.innerHTML = `
     
     <div>        
                  
                  <form id="form">
                  <h1>Update a Poll</h1>
                    <fieldset>
                        <label for="company">Company Name:</label>&nbsp &nbsp
                        <input value="${poll.title}" type="text" id="company_update" name="company"><br>
                        
                        <label for="question">Question:</label>&nbsp &nbsp
                        <input value="${poll.question}" type="text" id="question_update" name="question" required><br>
                        
                        <label for="option1">Option 1:</label>&nbsp &nbsp
                        <input value="${poll.option1}" type="text" id="option1_update" name="option1" required><br>
                        
                        <label for="option2">Option 2:</label>&nbsp &nbsp
                        <input value="${poll.option2}" type="text" id="option2_update" name="option2" required><br>                             

                        <label for="deadline">Deadline:</label>&nbsp &nbsp
                        <input value="${poll.deadline}" type="datetime-local" id="deadline_update" name="deadline"><br><br>
                    </fieldset>                
                      <input type="submit" onclick="update_post(${id})" value="Update Poll">
                  </form> 
                </div>              
          
        </div>
     
     `
  })
}

// update poll
function update_post(id){


  const title = document.getElementById("company_update").value
  const question = document.getElementById("question_update").value
  const deadline = document.getElementById("deadline_update").value
  const first = document.getElementById("option1_update").value
  const second = document.getElementById("option2_update").value
        
        fetch(`http://localhost:3000/polls/${id}`, {
          method: "PATCH",
          headers:{"Content-Type": "application/json"},
          body: JSON.stringify({title: title, question: question, deadline: deadline, option1: first, option2: second})
        } )
        .then((data)=> data.json())
        .then((poll)=>{

          alert("Post updated successfully")
        }).catch((error)=>{
          console.log(error)
        })


}
fetch("http://localhost:3000/polls/")
 .then((res)=>res.json())
 .then()