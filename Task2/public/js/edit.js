let form = document.querySelector("form");

form.addEventListener("submit",(e)=>{
    let caption = document.querySelector("#caption");
    if(caption.value.trim() === ""){
        e.preventDefault();
        alert("Caption Field Cannot Be Empty");
    }else{
        let confirmation = confirm("Do You Want To Update Your Instagram Feed ?");
        if(!confirmation){
            e.preventDefault();
            alert("Your Request To Update Instagram Feed Has Been Cancelled");
        }   
        else{
            alert("Your Instagram Feed Has Been Updated Successfully");
        }
    }
});