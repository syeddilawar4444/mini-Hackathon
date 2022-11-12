import { signInFirebase } from "./config/firebase.js";


//function to login
window.login = async function () {
  //1)get the value in regsiter webpage
  const allInputs = document.getElementsByTagName("input");

  const email = allInputs[0].value;
  const password = allInputs[1].value;
  console.log("information", email, password);

  ///2)firebase ka function to call karaga jo ka firebase.js ka andr bana hu wa ha

  if (email !== "" && password !== "") {
        try {
        // document.getElementsByClassName("submit")[0].style.display = "none";
        // document.getElementsByClassName("loading")[0].style.display = "block";
        await signInFirebase(email, password);
        await Swal.fire({
            icon: "success",
            title: "Successfully LoggIn",
            showConfirmButton: false,
            timer: 1500,
        });
       

        location.href ="class/class.html";
        } catch (e) {
        switch (e.message) {
            case "Firebase: Error (auth/invalid-email).":
            // document.getElementsByClassName("loading")[0].style.display = "none";
            // document.getElementsByClassName("submit")[0].style.display = "block";

            Swal.fire({
                icon: "error",
                title: "Invalid Email",
                showConfirmButton: false,
                timer: 1500,
            });

            break;
            case "Firebase: Error (auth/wrong-password).":
            // document.getElementsByClassName("loading")[0].style.display = "none";
            // document.getElementsByClassName("submit")[0].style.display = "block";

            Swal.fire({
                icon: "error",
                title: "Invalid password",
                showConfirmButton: false,
                timer: 1500,
            });
            break;
            case "Firebase: Error (auth/user-not-found).":
            // document.getElementsByClassName("loading")[0].style.display = "none";
            // document.getElementsByClassName("submit")[0].style.display = "block";
            Swal.fire({
                icon: "error",
                title: "User Not Found",
                showConfirmButton: false,
                timer: 1500,
            });
            break;

            default:
            // document.getElementsByClassName("loading")[0].style.display = "none";
            // document.getElementsByClassName("submit")[0].style.display = "block";
            Swal.fire({
                icon: "error",
                title: "Unknown Error Occured",
                showConfirmButton: false,
                timer: 1500,
            });
        }
        }
    } else {
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Fill The Form",
        });
    }
};
