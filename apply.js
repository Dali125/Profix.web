document.addEventListener('DOMContentLoaded', (event) => {
    // Firebase configuration
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
    const app = firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore(app);

    // Form submission event listener
   let subut =  document.getElementById('subut');
   


   // 
   subut.addEventListener('click', (event) =>{
     event.preventDefault();
     
     const firstName = document.getElementById('firstName').value;
     const lastName = document.getElementById('lastName').value;
     const email = document.getElementById('email').value;
     const phoneNumber = document.getElementById('phoneNumber').value;
     const maritalStatus = document.getElementById('maritalStatus').value;
     const address = document.getElementById('address').value;
     const aadhaarNumber = document.getElementById('aadhaarNumber').value;
     const loanAmount = document.getElementById('loanAmount').value;
     const loanType = document.getElementById('loanType').value;
     const currentOccupaton = document.getElementById('currentOccupation').value;
     const netMonthlyIncome = document.getElementById('netMonthlyIncome').value;


     //Data to be posted

     var myData = {
      firstName : firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      maritalStatus: maritalStatus,
      address: address,
      NRC: aadhaarNumber,
      loanAmount: loanAmount,
      loanType: loanType,
      currentOccupaton: currentOccupaton,
      netMonthlyIncome: netMonthlyIncome
      

     }

     //Calling the function to post to the database.
     postData(db, myData )
       
        
     
   });
   
   
   
   
});


// Function to show toast notification
function showToast(message) {
  Toastify({
    text: message,
    duration: 3000,  // Duration in milliseconds
    newWindow: true,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: 'right', // `left`, `center` or `right`
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    stopOnFocus: true, // Prevents dismissing of toast on hover
  }).showToast();
}


function postData(databaseReference, data){


  //Define the collection where the loans will go
  var usersCollection = databaseReference.collection('loanRequests');



  usersCollection.add(data)
  .then(function (docRef){
    //If posting is succesful
    showToast("Data added successfully!");



  }).catch(function(error){

    //If we fail to post the data.
    showToast("Failed to add data: " + error.message + "Please Try Again Later."); 

  });
}
