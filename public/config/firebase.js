


// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
  import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
  } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
  import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
  } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
  

  import {
    getFirestore,
    collection,
    addDoc,
    setDoc,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    onSnapshot,
    orderBy,
  } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCoCO34FQ4aNkEHjEvU9XY_mJ5ZniXzZ1c",
    authDomain: "mini-hackathon-95153.firebaseapp.com",
    projectId: "mini-hackathon-95153",
    storageBucket: "mini-hackathon-95153.appspot.com",
    messagingSenderId: "786105295866",
    appId: "1:786105295866:web:90df1740af59ab13ed7a43"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const storage = getStorage(app);
const db = getFirestore(app)
  console.log("Authentication ----->", auth);

  function signInFirebase(email, password) {
    // console.log("before",auth.currentUser.uid)
    return signInWithEmailAndPassword(auth, email, password);
    // console.log("after",auth.currentUser.uid)
  }

  async function studentUploadImage(image) {
    //call the function to import the line No #5
    const storageRef = ref(storage, `studentImg/${image.name}${Date.now()}`);
  
    // 'file' comes from the Blob or File API
    //call the function to import the line No #5
    const snapshot = await uploadBytes(storageRef, image);
    console.log("success the uploadImages function run");
    const url = await getDownloadURL(snapshot.ref);
    return url;
  }

  function addStudentToDataBase(studentInfo, imageurl) {
    const { fullName, fatherName, rollNo, contactNo, cnic, course } = studentInfo;
    const userID = auth.currentUser.uid;
    //===========call the function to import line No #4

  
    return addDoc(collection(db, "student"),{ fullName, fatherName, rollNo, contactNo, cnic, course } );
  }

  function addClassesToDataBase(classInfo) {
    const { teacherName,classTiming,schedule, sectionName,courseName,batchNumber } = classInfo;
    const userID = auth.currentUser.uid;
    //===========call the function to import line No #4

  
    return addDoc(collection(db, "Classes"),{ teacherName,classTiming,schedule, sectionName,courseName,batchNumber } );
  }



  ///SELECTION OPTIONS
  async function getOptions() {
    const querySnapshot = await getDocs(collection(db, "Classes"))
    const option = []
    querySnapshot.forEach((doc) => {
      option.push({ id: doc.id, ...doc.data() });
    })
    return option
  }

  export{signInFirebase,addStudentToDataBase,studentUploadImage,addClassesToDataBase,getOptions}