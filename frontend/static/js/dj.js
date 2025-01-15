

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyCXDT04M79hEgG_fTgIFzY4Wp8vbf3aBMs",
  authDomain: "livetap-891da.firebaseapp.com",
  projectId: "livetap-891da",
  storageBucket: "livetap-891da.appspot.com",
  messagingSenderId: "556672856671",
  appId: "1:556672856671:web:95190b7b22d5461ce921ea",
  measurementId: "G-SF7EGC4E8X"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


document.addEventListener('DOMContentLoaded', async()=> {

    try {
        const docRef = await addDoc(collection(db, "users"), {
          first: "Ada",
          last: "Lovelace",
          born: 1815
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
})