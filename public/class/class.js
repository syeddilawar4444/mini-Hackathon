console.log("connected")
import{addClassesToDataBase} from "../config/firebase.js"


window.addClasses = async function (){


    const allIput= document.getElementsByTagName("input")
    const teacherName= allIput[0].value
    const classTiming= allIput[1].value
    
    const schedule= allIput[2].value
    
    const sectionName= allIput[3].value
    
    const courseName= allIput[4].value
    const batchNumber= allIput[5].value
console.log(teacherName,classTiming,schedule, sectionName,courseName,batchNumber)



if (teacherName !== '' &&
    classTiming !== '' &&
    schedule !== '' &&
    sectionName !== '' &&
    courseName !== '' &&
    batchNumber !== '' ) {
    try {
    

        
        await addClassesToDataBase(
            { teacherName,classTiming,schedule, sectionName,courseName,batchNumber },
            
        );
        //   document.getElementsByClassName("submit")[0].style.display = "block";
        //   document.getElementsByClassName("loading")[0].style.display = "none";
        Swal.fire({
            icon: 'success',
            title: 'ADD CLASSES SUCESSFULLY',
            showConfirmButton: false,
            timer: 2200
        })

        teacherName == ''
        classTiming == ''
        schedule == ''
        sectionName == ''
        courseName == ''
        batchNumber == '' 
    } catch (e) {
        console.log("error", e.message);
        // const showError = document.getElementById("error");
        // showError.innerHTML = e.message;
    }
} else {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill The Form',
    })
}
}

