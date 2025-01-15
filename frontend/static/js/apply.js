document.addEventListener('DOMContentLoaded', (event) => {

  // Select the form and the submit button
  const myForm = document.getElementById('myForm');
  const subut = document.getElementById('subut');

  // Add click event listener to the submit button
  subut.addEventListener('click',async (event) => {
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
    const fileUpload = document.getElementById('fileUpload').files[0];

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
      (!genderMale && !genderFemale) ||
      !fileUpload
    ) {
      // Show toast notification for missing fields
      showToast('Please fill in all required fields.');
      return; // Exit function if fields are missing
    }

    // Data to be posted
    var myData = new FormData();
    myData.append('firstName', firstName);
    myData.append('lastName', lastName);
    myData.append('email', email);
    myData.append('phoneNumber', phoneNumber);
    myData.append('maritalStatus', isMarried);
    myData.append('address', address);
    myData.append('nrcOrLicense', nrcOrLicense);
    myData.append('aadhaarNumber', aadhaarNumber);
    myData.append('loanAmount', loanAmount);
    myData.append('loanType', loanTypeText);
    myData.append('currentOccupation', currentOcupationText);
    myData.append('netMonthlyIncome', netMonthlyIncome);
    myData.append('gender', genderMale ? 'Male' : 'Female');
    myData.append('fileUpload', fileUpload);

    //Print to console
    console.log(myData);

   const response = await postData(myData)

  });

  // Function to show toast notification
  function showToast(message) {
    swal(message, "", "error");


  }

   // Function to show toast notification
   function showSuccess(message) {
    swal(message, "", "success");
  }

  async function postData(data) {
    fetch('/api/loan-application', {
      method: 'POST',
      headers:{


      },
      body: data
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      showSuccess("Application submitted successfully");
    })
    .catch((error) => {
      console.error('Error:', error);
      showToast('Failed to submit application');
    });
  }

});
