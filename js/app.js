/* Summary
- Focus is added to the first form field. I decided to add this directly
  to the HTML to increase user experience even without JavaScript.
- "Other"-field under Job Role is added where you can manually write your job role.
- The t-shirt color option is reveald after choosing a theme, and only theme
  related colors are available.
- It is not possible to choose two competing activities.
- Total cost is calculated when you register for activities.
- Only relevant payment information is showed to the visitor and Credit
  card is the default option.
- Credit Card is the default payment option.
- Form validation:
  * To register you need to add a name, email, choose a shirt theme and register
    for minimum 1 activity.
  * Name only accepts letters - no digits.
  * Email must be a valid email adress.
  * CC number, Zip code and CVV only accepts numbers. Letters give error message.
- Validation messages:
  * Error messages are shown with a red border and red text.
  * Errors are added to all form elements and appear in real time (not only when submiting)
  * I added a conditional error message to the credit card number. Try to enter
    a number shorter than 13 and one longer than 16 digits. And a card Number
    with letters in it.
- Lastly, I added a success message to simulate a successful registration.
*/

const title = document.getElementById("title");
const jobValidate = document.getElementById("other-title");
const ccValidate = document.getElementById("cc-num");
const zipValidate = document.getElementById("zip");
const cvvValidate = document.getElementById("cvv");
const shirtValitate = document.getElementById("design");
const newRole = document.getElementById("other-title");
const colorMenu = document.getElementById("colors-js-puns");
const colorChoices = document.getElementById("color");
const design = document.getElementById("design");
const color = document.getElementById("color");
const activities = document.getElementById("items");
const mainConference = document.getElementsByName("all");
const tuesday9am = document.getElementsByName("js-frameworks");
const tuesday1pm = document.getElementsByName("js-libs");
const tuesday9am2 = document.getElementsByName("express");
const tuesday1pm2 = document.getElementsByName("node");
const wednesday9am = document.getElementsByName("build-tools");
const wednesday1pm = document.getElementsByName("npm");
const $mainConference = $(".all");
const $tuesday9am = $(".js-frameworks");
const $tuesday9am2 = $(".express");
const $tuesday1pm = $(".js-libs");
const $tuesday1pm2 = $(".node");
const $wednesday9am = $(".build-tools");
const $wednesday1pm = $(".npm");
let alt1 = false;
let alt2 = false;
let alt3 = false;
let alt4 = false;
let alt5 = false;
let alt6 = false;
let alt7 = false;
let totalBalance = 0;
const paymentOption = document.getElementById("payment");
const creditCard = document.getElementById("credit-card");
const paypalInfo = document.getElementById("paypal-info");
const bitcoinInfo = document.getElementById("bitcoin-info");
const registerButton = document.getElementById("registerButton");
const nameField = document.getElementById("name");
const mailField = document.getElementById("mail");
const designField = document.getElementById("design");
const ccNum = document.getElementById("cc-num");
const zipField = document.getElementById("zip");
const cvvField = document.getElementById("cvv");
const nameDiv = document.getElementById("nameDiv");
const mailDiv = document.getElementById("mailDiv");
const otherField = document.getElementById("other-title");
const otherTitle = document.getElementById("title");
const otherDiv = document.getElementById("otherDiv");
const shirtDiv = document.getElementById("shirtDiv");
const container = document.getElementById("container");
const paymentInfo = document.getElementById("payError");
const totalLabel = document.createElement("label");
const nameError = document.createElement("label");
const shirtError = document.createElement("label");
const activityError = document.createElement("label");
const emailError = document.createElement("label");
const otherError = document.createElement("label");
const paymentError = document.createElement("label");
const zipError = document.createElement("label");
const cvvError = document.createElement("label");
const successMessage = document.createElement("label");
let success = true;

// Hiding the "other" job role field.
newRole.style.display = "none";

// Showing the other job role field if "other" is selected.
title.addEventListener("change", () => {
  if (title.value === "other"){
    newRole.style.display = "block";
  } else {
    newRole.style.display = "none";
    $(".otherError").hide();
  }
});

// Hiding t-shirt color menu
colorMenu.style.display = "none";

// Design theme
design.addEventListener("change", () => {

  // Hiding all color choices
  for(var i = 0; i < colorChoices.length; i++){
    colorChoices[i].style.display = "none";
  }

  // Displaying only the relevant color choices
  if (design.value === "heart js") {
    colorMenu.style.display = "block";
    for(var i = 3; i < 6; i++){
      colorChoices[i].style.display = "block";
      color.value = colorChoices[3].value; // Adding the first choice
    }
  } else if (design.value === "js puns") {
    colorMenu.style.display = "block";
    for(var i = 0; i < 3; i++){
      colorChoices[i].style.display = "block";
      color.value = colorChoices[0].value; // Adding the first choice
    }
  } else { // In case the visitor go back to "select theme"
    colorMenu.style.display = "none";
    for(var i = 0; i < 6; i++){
      colorChoices[i].style.display = "none";
    }
  }
});

// Activities
// Function to disable competing activities and add class for CSS color
function disable(activity){
  activity.attr("disabled", true);
  activity.parent().addClass("disabled");
}

// Function to enable previously competing activities and remove the class
function enable(activity){
  activity.attr("disabled", false);
  activity.parent().removeClass("disabled");
}

// Running total
// Function to add to the total balance
function addBalance(dollar){
  let balance = totalBalance + dollar;
  totalBalance = balance;
  return balance;
}

// Function to subtract to the total balance
function removeBalance(dollar){
  balance = totalBalance - dollar;
  totalBalance = balance;
  return balance;
}

// Calculating total balance when registering for activities and disable
// competing alternatives
activities.addEventListener("change", () => {

  // Main Conference - alternative 1
  if (mainConference[0].checked && alt1 === false) {
    addBalance(200);
    alt1 = true
  } else if (mainConference[0].checked === false && alt1 === true) {
    removeBalance(200);
    alt1 = false;
  }

  // JS Frameworks - alternative 2
  else if (tuesday9am[0].checked && alt2 === false) {
    addBalance(100);
    alt2 = true;
    disable($tuesday9am2);
  } else if (tuesday9am[0].checked === false && alt2 === true) {
    removeBalance(100);
    alt2 = false;
    enable($tuesday9am2);
  }

  // JS Libraries - alternative 3
  else if (tuesday1pm[0].checked && alt3 === false) {
    addBalance(100);
    alt3 = true;
    disable($tuesday1pm2);
  } else if (tuesday1pm[0].checked === false && alt3 === true) {
    removeBalance(100);
    alt3 = false;
    enable($tuesday1pm2);
  }

  // Express Workshop - alternative 4
  else if (tuesday9am2[0].checked && alt4 === false) {
    addBalance(100);
    alt4 = true;
    disable($tuesday9am);
  } else if (tuesday9am2[0].checked === false && alt4 === true) {
    removeBalance(100);
    alt4 = false;
    enable($tuesday9am);
  }

  // Node.js - alternative 5
  else if (tuesday1pm2[0].checked && alt5 === false) {
    addBalance(100);
    alt5 = true;
    disable($tuesday1pm);
  } else if (tuesday1pm2[0].checked === false && alt5 === true) {
    removeBalance(100);
    alt5 = false;
    enable($tuesday1pm);
  }

  // Build tools - alternative 6
  else if (wednesday9am[0].checked && alt6 === false) {
    addBalance(100);
    alt6 = true;
  } else if (wednesday9am[0].checked === false && alt6 === true) {
    removeBalance(100);
    alt6 = false;
  }

  // npm workshop - alternative 7
  else if (wednesday1pm[0].checked && alt7 === false) {
    addBalance(100);
    alt7 = true;
  } else if (wednesday1pm[0].checked === false && alt7 === true) {
    removeBalance(100);
    alt7 = false;
  }
});

// Appending total balance
totalLabel.className = "balance";
activities.appendChild(totalLabel);
$(".balance").hide();

// Show total balance if more than 0
activities.addEventListener("change", () => {
  if(totalBalance > 0) {
    totalLabel.innerHTML = "<b>Total Balance: $" + totalBalance + "</b>";
    $(".balance").show();
    $(".activityError").hide(); // Removing the error message if visible
  } else {
    $(".balance").hide();
  }
});

// Payment
// Function to hide payment information
function hidePayment(){
  creditCard.style.display = "none";
  paypalInfo.style.display = "none";
  bitcoinInfo.style.display = "none";
}

// Hiding PayPal and Bitcoin options from start
paypalInfo.style.display = "none";
bitcoinInfo.style.display = "none";

// Show relevant payment information based on payment options
paymentOption.addEventListener("change", () => {
  hidePayment(); // Resetting payment options in case visitor changes

  if(paymentOption.value === "credit card"){
    creditCard.style.display = "block";
  } else if (paymentOption.value === "paypal"){
    paypalInfo.style.display = "block";
  } else if (paymentOption.value === "bitcoin"){
    bitcoinInfo.style.display = "block";
  }
});

// Register button events
registerButton.addEventListener("click", (e) => {
  e.preventDefault();
  success = true;

  validateName();
  validateEmail(mailField);
  validateJob();
  validateShirt();
  validateActivities();

  if(paymentOption.value === "credit card"){
    validateCCnum();
    validateZip();
    validateCVV();
  }

  // If all fields are ok, then run success message.
  if(success === true) {
    $("form").hide();
    $(registerFor).hide();
    $(".successMessage").show();
  }
});

// Form validation
// Error message for non-input fields: t-shirt and activities
function errorMessage(errorName, errorDiv, textInput){
  errorName.className = errorName + " error";
  errorName.textContent = textInput;
  errorDiv.appendChild(errorName);
  $(errorName).show();
  success = false;
}

// Error message for input fields
function errorVisualization(fieldName, errorName, errorDiv, errorMessage, successValue){
  fieldName.style.borderColor = "red";
  errorName.textContent = errorMessage;
  errorName.className = errorName + " error";
  errorDiv.appendChild(errorName);
  $(errorName).show();
  success = false;
}

// Function for correct field validation
function correctVisualization(fieldName, errorName){
  fieldName.style.borderColor = "green";
  $(errorName).hide();
}

// Function to validate name input
function validateName(){
  if(validateWord(nameField.value) === false){
    errorVisualization(nameField, nameError, nameDiv, "Are you sure that's your name?");

  } else if(nameField.value == ""){
    errorVisualization(nameField, nameError, nameDiv, "Please enter a valid name.");

  } else {
    correctVisualization(nameField, nameError);
  }
}

// Function to validate email input
function validateEmail(inputText) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(inputText.value.match(mailformat)) {
    correctVisualization(mailField, emailError);
  } else {
    errorVisualization(mailField, emailError, mailDiv, "Please enter a valid email adress.");
  }
}

// Function to validate other job input
function validateJob(){
  if(otherTitle.value === "other"){
    if (newRole.value === ""){
      errorVisualization(newRole, otherError, otherDiv, "Please tell us what your current job role is.");
    } else {
      correctVisualization(newRole, otherError);
    }
  }
}

// Function to validate T-shirt Theme
function validateShirt(){
  if(designField.value === "Select Theme"){
    errorMessage(shirtError, shirtDiv, "Please choose a complimentary T-shirt.");
  } else {
    $(shirtError).hide();
  }
}

// Function to validate activities
function validateActivities(){
  if (totalBalance === 0){
    errorMessage(activityError, activities, "Please register for minimum one activity.");
  } else {
    $(activityError).hide();
  }
}

// Function to validate Card Number with conditional messages
function validateCCnum(){

  // If field is empty
  if(ccNum.value === ""){
    errorVisualization(ccNum, paymentError, paymentInfo, "Please enter a valid card number.");

    // If numeric
  } else if (IsNumeric(ccNum.value) === false){
    errorVisualization(ccNum, paymentError, paymentInfo, "Obs, your Credit Card number doesn't look like a number..");

    // If field is shorter than 13 digits
  } else if (ccNum.value.length < 13){
    errorVisualization(ccNum, paymentError, paymentInfo, "Great job, you just need " + (13 - ccNum.value.length) + " additional number(s).");

    // If field is longer than 16 digits
  } else if (ccNum.value.length > 16){
    errorVisualization(ccNum, paymentError, paymentInfo, "You are close, unfortunately that is " + (ccNum.value.length - 16) + " number(s) too long.");

    // If between 13 and 16 digits
  } else {
    correctVisualization(ccNum, paymentError);
  }
}

// Function to validate Zip Code with conditional messages
function validateZip(){
  if(zipField.value === ""){
    errorVisualization(zipField, zipError, paymentInfo, "Please enter a valid zip code.");

  } else if (IsNumeric(zipField.value) === false){
    errorVisualization(zipField, zipError, paymentInfo, "Obs, your Zip Codes doesn't look like a number..");

  } else if(zipField.value.length !== 5){
    errorVisualization(zipField, zipError, paymentInfo, "Your Zip Code should be 5 digits.");

  } else {
    correctVisualization(zipField, zipError);
  }
}

// Function to validate CVV with conditional messages
function validateCVV(){
  if(cvvField.value === ""){
    errorVisualization(cvvField, cvvError, paymentInfo, "Please enter a valid CVV number.");

  } else if (IsNumeric(cvvField.value) === false){
    errorVisualization(cvvField, cvvError, paymentInfo, "Obs, your CVV doesn't look like a number..");

  } else if(cvvField.value.length !== 3){
    errorVisualization(cvvField, cvvError, paymentInfo, "Your CVV should be 3 digits.");

  } else {
    correctVisualization(cvvField, cvvError);
  }
}

// Function to validate if a string is a string (used in name field)
function validateWord(text){
  const re = /^[a-zA-Z]*$/;
  return re.test(text);
}

// Function to validate if int is an int (used in credit card fields)
function IsNumeric(val) {
  const re = /^\d+$/;
  return re.test(val);
}

// Event listeners for every element in the form.
nameField.addEventListener("keyup", () =>{
  validateName();
});

mailField.addEventListener("keyup", () =>{
  validateEmail(mailField)
});

jobValidate.addEventListener("keyup", () =>{
  validateJob();
});

shirtValitate.addEventListener("change", () =>{
  validateShirt();
});

activities.addEventListener("change", () =>{
  validateActivities();
});

ccValidate.addEventListener("keyup", () =>{
  validateCCnum();
  $(cvvError).hide(); // Hiding Zip and CVV errors
  $(zipError).hide();
});

zipValidate.addEventListener("keyup", () =>{
  validateZip();
  $(paymentError).hide();  // Hiding Credit Card and CVV errors
  $(cvvError).hide();
});

cvvValidate.addEventListener("keyup", () =>{
  validateCVV();
  $(paymentError).hide();  // Hiding Credit Card and Zip errors
  $(zipError).hide();
});

// Success message
successMessage.className = "successMessage";
successMessage.innerHTML = "<h1>Wohoo, you are registered!</h1>";
successMessage.innerHTML += "<p>We look forward to see you on Full Stack Conf!</p>";
successMessage.innerHTML += "<img src='http://www.googlecover.com/_asset/_cover/Happy-Homer-Simpson_676.jpg'>";
container.appendChild(successMessage);
$(".successMessage").hide();
