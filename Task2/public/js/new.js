let form = document.querySelector("form");

form.addEventListener("submit",(e)=>{
    let confirmation = confirm("Do You Want To Create New Instagram Feed ?");   
    if(!confirmation){
        e.preventDefault();
        alert("Your Request To Create New Instagram Feed Has Been Cancelled");
    }
    else{
        alert("Your New Instagram Feed Has Been Created Successfully");
    }
});

