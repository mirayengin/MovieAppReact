import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STOTAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


export const CreateUser = async (email, password, navigate, displayName,setCurrentUser,setMessage) => {
  console.log("firebasecreate",displayName)
 await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log("create işlemi yapldı");
    const user = userCredential.user;
    const { email, displayName} = user;
    console.log("create user", user);
    console.log("create user", user.displayName);
    setCurrentUser({ email, displayName })
    setMessage("");
    
  })
  .catch((error) => {

    setMessage(error.message);
  });
  
  await  updateProfile(auth.currentUser, {
    displayName: displayName,
  })
  navigate("/");

}


// export const CreateUser = async(email, password, navigate) => {
//   let userCredential = await createUserWithEmailAndPassword(
//     auth,
//     email,
//     password
//   );
//   //? kullanıcı profilini güncellemek için kullanılan firebase metodu
//   await updateProfile(auth.currentUser, {
//     displayName: displayName,
//   });
//   navigate("/");
// }
 




export const SingInUser = (email,password,navigate, setError, setMessage) => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log("sing in");
    const user = userCredential.user;
    console.log("singIn user", user);
    setMessage("")
    navigate("/")
  })
  .catch((error) => {
    // const errorCode = error.code;
    const errorMessage = error.message;
    setError(true)
    setMessage(errorMessage)
    // console.log(errorMessage);
  });

}


export const LogoutSingUser = (navigate) => {
  signOut(auth)
  .then(() => {
    // Sign-out successful.
    navigate("/")

  })
  .catch((error) => {
    // An error happened.
  });

}


export const singWithGoogle = (navigate) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
    console.log('result :>> ', result);
    // The signed-in user info.
      const user = result.user;
      console.log('usergooge:>> ', user);
      navigate("/")
  })
  .catch((error) => {
    // Handle Errors here.
    console.log(error);
  });
}


export const resetPassword = (email,setError, setMessage) => {
  sendPasswordResetEmail(auth, email)
  .then(() => {
    setMessage("Password reset email sent!");
    setError(false)
  })
  .catch((error) => {
    const errorMessage = error.message;
    setMessage(errorMessage)
  });
}











export const loginStatus = (setCurrentUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user.displayName)
      const { email, displayName} = user;
      setCurrentUser({email, displayName})
      // User is signed in, see docs for a list of available properties
    
      // https://firebase.google.com/docs/reference/js/firebase.User
      console.log("user sing in")
      console.log("loginuser " ,user)
    } else {
      setCurrentUser({email:"", displayName:""})

      // User is signed out
      console.log("loginuser " ,user)
      console.log("User is signed out")
      // console.log(user)
    }
  });
  }