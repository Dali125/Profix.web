document.addEventListener('DOMContentLoaded', (event) => {
 
    



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
     postData( myData )
       
        
     
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


function postData(data) {
  var templateParams = {
    name: 'James',
    notes: 'Check this out!',
  };

  emailjs.init({
    publicKey: 'dDNXhI9KMvhiBvJs7',
    // Do not allow headless browsers
    blockHeadless: false,
    blockList: {
      // Block the suspended emails
      list: ['foo@emailjs.com', 'bar@emailjs.com'],
      // The variable contains the email address
      watchVariable: 'userEmail',
    },
    limitRate: {
      // Set the limit rate for the application
      id: 'app',
      // Allow 1 request per 10s
      throttle: 10000,
    },
  });
  

  emailjs.send("service_jdb7o3e","template_ab531jh",{
    to_name: "Profix Web",
    from_name: "Profix Website",
    message: "A loan of '" + data.loanAmount + "' has been requested by " + data.firstName + ""+data.lastName+". ",
    }).then(
    (response) => {
      console.log('SUCCESS!', response.status, response.text);
    },
    (error) => {
      console.log('FAILED...', error);
    },
  );

 
}

