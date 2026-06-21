let back = document.querySelector("#back");

back.addEventListener("click",(e)=>{
    let confirmation = confirm("Do You Want To Go Back To All Feeds ?");
    if(!confirmation){
        e.preventDefault();
        alert("Your Request To Go Back To All Feeds Has Been Cancelled");
    }
    else{
        alert("You are Redirecting To All Feeds");
    }
});
