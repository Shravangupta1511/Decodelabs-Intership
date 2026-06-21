let feeds = document.querySelectorAll('.feeds');

feeds.forEach((feed) => {
    feed.addEventListener("click", (e) => {
        if(e.target.classList.contains("see")){
            let confirmation = confirm("Do You Want To See Your Feed In Detail ?");
            if(!confirmation){
                e.preventDefault();
                alert("Your Request To See Feed In Detail Has Been Cancelled");
            }   
            else{
                alert("You are Redirecting To See Your Feed In Detail");
            }
        }
        else if(e.target.classList.contains("update")){
            let confirmation = confirm("Do You Want To Update Your Feed ?");    
            if(!confirmation){
                e.preventDefault();
                alert("Your Request To Update Your Feed Has Been Cancelled");
            }
            else{
                alert("You are Redirecting To Update Your Feed");
            }
        }
        else if(e.target.classList.contains("delete")){
            let confirmation = prompt("Are You Sure You Want To Delete This Feed ? Type Yes To Confirm");
            if(confirmation === "yes"){
                alert("Your Feed Has Been Deleted Successfully");
            }
            else{
                e.preventDefault();
                alert("Your Feed Deletion Has Been Cancelled");
            }
        }
    });
});


let createButton = document.querySelector(".create");

createButton.addEventListener("click",(e)=>{
    let confirmation = confirm("Do You Want To Create New Instagram Feed ?");
    if(!confirmation){
        e.preventDefault();
        alert("Your Request To Create New Instagram Feed Has Been Cancelled");
    }
    else{
        alert("You are Redirecting To Create New Instagram Feed");
    }
});

