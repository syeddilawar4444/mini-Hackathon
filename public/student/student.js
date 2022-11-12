console.log("connevted ")
import { addStudentToDataBase, studentUploadImage,getOptions } from "../config/firebase.js"




window.addStudent = async function () {
    const allInputs = document.getElementsByTagName("input");
    const fullName = allInputs[0].value;
    const fatherName = allInputs[1].value;
    const rollNo = allInputs[2].value;
    const contactNo = allInputs[3].value;
    const cnic = allInputs[4].value;
    const course = document.getElementById('course-name').value
    const image = document.getElementById("uploadImage").files[0];
    // console.log('images',image)
  
    console.log("additem.js", { fullName, fatherName, rollNo, contactNo, cnic, image, course });

    if (

        fullName !== '' &&
        fatherName !== '' &&
        rollNo !== '' &&
        contactNo !== '' &&
        cnic !== '' &&
        course !== '' &&
        image !== undefined) {
        try {
            //   document.getElementsByClassName("submit")[0].style.display = "none";
            //   document.getElementsByClassName("loading")[0].style.display = "block";

            const imageurl = await studentUploadImage(image);
            await addStudentToDataBase(
                { fullName, fatherName, rollNo, contactNo, cnic, course },
                imageurl
            );
            //   document.getElementsByClassName("submit")[0].style.display = "block";
            //   document.getElementsByClassName("loading")[0].style.display = "none";
            Swal.fire({
                icon: 'success',
                title: 'Successfully Add Product',
                showConfirmButton: false,
                timer: 2200
            })
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


async function courseDropDown(){
    const option = await getOptions()
    console.log("option" ,option)
    const adsElm = document.getElementById("course-name")
    for (let item of option) 
        adsElm.innerHTML+=`<option value="${item.courseName},${item.classTiming},${item.schedule},${item.batchNumber},${item.sectionName},${item.teacherName}">Course ${item.courseName} / Time ${item.classTiming} / Schedule ${item.schedule}</option>`
        // ${item.courseName},${item.time},${item.sectionName},${item.batchNumber},${item.section},${item.teacherName}">Course ${item.courseName} / Time ${item.classTiming} / Schedule ${item.schedule}
}

courseDropDown();