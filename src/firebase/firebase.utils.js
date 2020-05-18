import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyB1qDvS-l5n3zFmvAID64CtO-0H_nthGBA",
    authDomain: "crwn-db-ad6bd.firebaseapp.com",
    databaseURL: "https://crwn-db-ad6bd.firebaseio.com",
    projectId: "crwn-db-ad6bd",
    storageBucket: "crwn-db-ad6bd.appspot.com",
    messagingSenderId: "50630354660",
    appId: "1:50630354660:web:0bc391d5a79a55a6696ef1",
    measurementId: "G-TVS51FJNP3"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const { displayName, email} = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user' , error.message );
      }
    }
    return userRef;
};

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account '});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;

