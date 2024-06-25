document.addEventListener('DOMContentLoaded', (event) => {

  // Select the form and the submit button
  const myForm = document.getElementById('myForm');
  const subut = document.getElementById('subut');

  // Add click event listener to the submit button
  subut.addEventListener('click', (event) => {
    event.preventDefault();

    // Fetch all input values
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const maritalStatus = document.getElementById('maritalStatus');
    const address = document.getElementById('address').value;
    const nrcOrLicense = document.getElementById('nrcOrLicense').value;
    const aadhaarNumber = document.getElementById('nrcNumber').value; // Assuming this is the ID number input
    const loanAmount = document.getElementById('loanAmount').value;
    const loanType = document.getElementById('loanType');
    const currentOccupation = document.getElementById('currentOccupation');
    const netMonthlyIncome = document.getElementById('netMonthlyIncome').value;
    const genderMale = document.getElementById('genderMale').checked;
    const genderFemale = document.getElementById('genderFemale').checked;

    const currentOcupationText = currentOccupation.options[currentOccupation.selectedIndex].text;
    const loanTypeText = loanType.options[loanType.selectedIndex].text;
    const maritalStatusText = maritalStatus.options[maritalStatus.selectedIndex].text;
    var isMarried;
    if(maritalStatusText === "Yes"){
      isMarried = "Married";

    }else{
      isMarried ="Single";

    }

    // Validate all required fields are filled
    if (
      firstName.trim() === '' ||
      lastName.trim() === '' ||
      email.trim() === '' ||
      phoneNumber.trim() === '' ||
      maritalStatus === '0' ||
      address.trim() === '' ||
      nrcOrLicense.trim() === '' ||
      aadhaarNumber.trim() === '' ||
      loanAmount.trim() === '' ||
      loanType === '4' ||
      currentOccupation === '0' ||
      netMonthlyIncome.trim() === '' ||
      (!genderMale && !genderFemale)
    ) {
      // Show toast notification for missing fields
      showToast('Please fill in all required fields.');
      return; // Exit function if fields are missing
    }

    // Data to be posted
    var myData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      maritalStatus: isMarried,
      address: address,
      nrcOrLicense: nrcOrLicense,
      aadhaarNumber: aadhaarNumber,
      loanAmount: loanAmount,
      loanType: loanTypeText,
      currentOccupation: currentOcupationText,
      netMonthlyIncome: netMonthlyIncome,
      gender: genderMale ? 'Male' : 'Female'
    };

    //Print to console
    console.log(myData);
    console.log(currentOcupationText);

    console.log(
      
      `${myData.firstName}  ${myData.lastName} (${myData.gender}),
        has made a ${myData.loanType}  request of '${myData.loanAmount}'.
         The current occupation is ${myData.currentOccupation} and the net monthly income is ${myData.netMonthlyIncome}.
         Their address is ${myData.address}.
          The email belonging to ${myData.firstName}  ${myData.lastName} is ${myData.email},
           the phone number is ${myData.phoneNumber}. The current Marital Status is ${myData.maritalStatus} ,and the ${myData.nrcOrLicense} number is ${myData.aadhaarNumber} `)

    // // Calling the function to post to the database
    // postData(myData);

  });

  // Function to show toast notification
  function showToast(message) {
    swal(message, "", "error");


  }

   // Function to show toast notification
   function showSuccess(message) {
    swal(message, "", "success");
  }

  function postData(data) {
    // Example emailjs.send function (you might need to adapt this to your specific setup)
    emailjs.send("service_jdb7o3e", "template_ab531jh",  {
      to_name: "Profix Web",
      from_name: "Profix Website",
      message: `${data.firstName}  ${data.lastName} (${data.gender}),
        has made a ${data.loanType}  request of '${data.loanAmount}'.
         Their address is ${data.address}.
          The email belonging to ${data.firstName}  ${data.lastName} is ${data.email},
           the phone number is ${data.phoneNumber}. The current Marital Status is ${data.maritalStatus} and the ${data.nrcOrLicense} number is ${data.aadhaarNumber} `,
    }).then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
        showSuccess("Application submitted Succesfully")
      },
      (error) => {
        console.log('FAILED...', error);
        showToast(error);
      }
    );
  }

});
