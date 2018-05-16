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
  * This are added to all form elements and appear in real time (not only when submiting)
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
let alt1 = false
let alt2 = false
let alt3 = false
let alt4 = false
let alt5 = false
let alt6 = false
let alt7 = false
let totalBalance = 0;
const paymentOption = document.getElementById("payment");
const creditCard = document.getElementById("credit-card");
const paypalInfo = document.getElementById("paypal-info");
const bitcoinInfo = document.getElementById("bitcoin-info");
const registerButton = document.getElementById("registerButton");
const nameField = document.getElementById("name");
const nameLabel = document.getElementById("nameLabel");
const mailField = document.getElementById("mail");
const mailLabel = document.getElementById("mailLabel");
const designField = document.getElementById("design");
const designLabel = document.getElementById("designLabel");
const itemLabel = document.getElementById("itemLabel");
const ccNum = document.getElementById("cc-num");
const ccLabel = document.getElementById("creditLabel");
const zipField = document.getElementById("zip");
const zipLabel = document.getElementById("zipLabel");
const cvvField = document.getElementById("cvv");
const cvvLabel = document.getElementById("cvvLabel");
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
newRole.style.display = "none"

// Showing the other job role field if "other" is selected.
title.addEventListener("change", () => {
  if (title.value === "other"){
    newRole.style.display = "block"
  } else {
    newRole.style.display = "none"
    $(".otherError").hide()
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
    colorMenu.style.display = "block"
    for(var i = 3; i < 6; i++){
      colorChoices[i].style.display = "block";
      color.value = colorChoices[3].value; // Adding the first choice
      designLabel.style.color = "#000"; // Resetting label color after error
    }
  } else if (design.value === "js puns") {
    colorMenu.style.display = "block"
    for(var i = 0; i < 3; i++){
      colorChoices[i].style.display = "block";
      color.value = colorChoices[0].value; // Adding the first choice
      designLabel.style.color = "#000"; // Resetting label color after error
    }
  } else { // In case the visitor go back to "select theme"
    colorMenu.style.display = "none"
    for(var i = 0; i < 6; i++){
      colorChoices[i].style.display = "none";
    }
  }
});

// Activities
// Function to disable competing activities and add class for CSS color
function disable(activity){
  activity.attr("disabled", true)
  activity.parent().addClass("disabled")
}

// Function to enable previously competing activities and remove the class
function enable(activity){
  activity.attr("disabled", false)
  activity.parent().removeClass("disabled")
}

// Disabeling and enabeling competing activities
activities.addEventListener("change", () => {
  if (tuesday9am[0].checked) {
    disable($tuesday9am2);
  } else if (tuesday9am[0].checked === false) {
    enable($tuesday9am2);
  }

  if (tuesday9am2[0].checked) {
    disable($tuesday9am);
  } else if (tuesday9am2[0].checked === false) {
    enable($tuesday9am);
  }

  if (tuesday1pm[0].checked) {
    disable($tuesday1pm2);
  } else if (tuesday1pm[0].checked === false) {
    enable($tuesday1pm2);
  }

  if (tuesday1pm2[0].checked) {
    disable($tuesday1pm);
  } else if (tuesday1pm2[0].checked === false) {
    enable($tuesday1pm);
  }
});

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

// Calculating total balance when registering for activities
activities.addEventListener("change", () => {

  // Main Conference - alternative 1
  if (mainConference[0].checked && alt1 === false) {
    addBalance(200);
    alt1 = true
  } else if (mainConference[0].checked === false && alt1 === true) {
    removeBalance(200);
    alt1 = false
  }

  // JS Frameworks - alternative 2
  else if (tuesday9am[0].checked && alt2 === false) {
    addBalance(100);
    alt2 = true;
  } else if (tuesday9am[0].checked === false && alt2 === true) {
    removeBalance(100);
    alt2 = false;
  }

  // JS Libraries - alternative 3
  else if (tuesday1pm[0].checked && alt3 === false) {
    addBalance(100);
    alt3 = true;
  } else if (tuesday1pm[0].checked === false && alt3 === true) {
    removeBalance(100);
    alt3 = false;
  }

  // Express Workshop - alternative 4
  else if (tuesday9am2[0].checked && alt4 === false) {
    addBalance(100);
    alt4 = true;
  } else if (tuesday9am2[0].checked === false && alt4 === true) {
    removeBalance(100);
    alt4 = false;
  }

  // Node.js - alternative 5
  else if (tuesday1pm2[0].checked && alt5 === false) {
    addBalance(100);
    alt5 = true;
  } else if (tuesday1pm2[0].checked === false && alt5 === true) {
    removeBalance(100);
    alt5 = false;
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

// Total balance
totalLabel.className = "balance";
activities.appendChild(totalLabel);
$(".balance").hide()

// Adding total balance if more than 0
activities.addEventListener("change", () => {
  if(totalBalance > 0) {
    totalLabel.innerHTML = "<b>Total Balance: $" + totalBalance + "</b>";
    $(".balance").show()
    $(".activityError").hide() // Removing the error message if visible
    itemLabel.style.color = "#000" // Resetting label color after error
  } else {
    $(".balance").hide()
  }
});

// Payment
// Hiding payment information
function hidePayment(){
  creditCard.style.display = "none";
  paypalInfo.style.display = "none";
  bitcoinInfo.style.display = "none";
}

// Hiding all payment options from start
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

  validateName()
  validateEmail(mailField)
  validateJob()
  validateShirt()
  validateActivities()

  if(paymentOption.value === "credit card"){
    validateCCnum();
    validateZip();
    validateCVV();
  }

  if(success === true) {
    // Hide everything and show success message
    $("form").hide()
    $(registerFor).hide()
    $(".successMessage").show();
  }
});

// Name error message (if visitor enters a invalid name)
nameError.className = "nameError error";
nameError.textContent = "Please enter a valid name.";
nameDiv.appendChild(nameError);
$(".nameError").hide()

// Mail error message (if visitor enters a invalid email adress)
emailError.className = "emailError error";
emailError.textContent = "Please enter a valid email adress.";
mailDiv.appendChild(emailError);
$(".emailError").hide()

// Other Job Role error message (if visitor does not input other job role)
otherError.className = "otherError error";
otherError.textContent = "Please tell us what your current job role is.";
otherDiv.appendChild(otherError);
$(".otherError").hide()

// T-shirt error message (if visitor does not choose a theme)
shirtError.className = "shirtError error";
shirtError.textContent = "Please choose a complimentary T-shirt.";
shirtDiv.appendChild(shirtError);
$(".shirtError").hide()

// Activity error message (if visitor does not check any activities)
activityError.className = "activityError error";
activityError.textContent = "Please register for minimum one activity.";
activities.appendChild(activityError);
$(".activityError").hide()

// Card number error message (if visitor enters an invalid card number)
paymentError.className = "paymentError error";
paymentError.textContent = "Please enter a valid card number.";
paymentInfo.appendChild(paymentError);
$(".paymentError").hide();

// Zip code error message (if visitor enters an invalid zip code)
zipError.className = "zipError error";
zipError.textContent = "Please enter a valid zip code.";
paymentInfo.appendChild(zipError);
$(".zipError").hide();

// CVV error message (if visitor enters an invalid CVV code)
cvvError.className = "cvvError error";
cvvError.textContent = "Please enter a valid CVV code.";
paymentInfo.appendChild(cvvError);
$(".cvvError").hide();

// Form validation
// Function to validate name input
function validateName(){
  if(validateWord(nameField.value) === false){
    $(".nameError").show()
    nameField.style.borderColor = "red";
    nameError.textContent = "Are you sure that's your name?";
    success = false;
  } else if(nameField.value == ""){
    $(".nameError").show()
    nameField.style.borderColor = "red";
    nameError.textContent = "Please enter a valid name.";
    success = false;
  } else {
    $(".nameError").hide()
    nameField.style.borderColor = "green";
  }
}

// Function to validate email input
function validateEmail(inputText) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(inputText.value.match(mailformat)) {
    $(".emailError").hide()
    mailLabel.style.color = "#000";
    mailField.style.borderColor = "green";
  } else {
    $(".emailError").show()
    mailField.style.borderColor = "red";
    success = false;
  }
}

// Function to validate other job input
function validateJob(){
  if(otherTitle.value === "other"){
    if (newRole.value === ""){
      $(".otherError").show()
      newRole.style.borderColor = "red";
      success = false;
    } else {
      $(".otherError").hide()
      newRole.style.borderColor = "green";
    }
  }
}

// Function to validate T-shirt Theme
function validateShirt(){
  if(designField.value === "Select Theme"){
    $(".shirtError").show()
    success = false;
  } else {
    $(".shirtError").hide()
  }
}

// Function to validate activities
function validateActivities(){
  if (totalBalance === 0){
    $(".activityError").show()
    success = false;
  } else {
    $(".activityError").hide()
  }
}

// Function to validate Card Number with conditional messages
function validateCCnum(){

  // If field is empty
  if(ccNum.value === ""){
    paymentError.textContent = "Please enter a valid card number.";
    $(".paymentError").show();
    ccNum.style.borderColor = "red";
    success = false;

    // If numeric
  } else if (IsNumeric(ccNum.value) === false){
    paymentError.textContent = "Obs, it looks like there are some letters in your card number.";
    $(".paymentError").show();
    ccNum.style.borderColor = "red";
    success = false;

    // If field is shorter than 13 digits
  } else if (ccNum.value.length < 13){
    paymentError.textContent = "Great job, you just need " + (13 - ccNum.value.length) + " additional number(s).";
    $(".paymentError").show();
    ccNum.style.borderColor = "red";
    success = false;

    // If field is longer than 16 digits
  } else if (ccNum.value.length > 16){
    paymentError.textContent = "You are close, unfortunately that is " + (ccNum.value.length - 16) + " number(s) too long.";
    $(".paymentError").show();
    ccNum.style.borderColor = "red";
    success = false;

    // If between 13 and 16 digits
  } else {
    $(".paymentError").hide();
    ccLabel.style.color = "#000";
    ccNum.style.borderColor = "green";
  }
}

// Function to validate Zip Code
function validateZip(){
  if (IsNumeric(zipField.value) === false){
    $(".zipError").show();
    zipField.style.borderColor = "red";
    success = false;
  } else if(zipField.value.length !== 5){
    $(".zipError").show();
    zipField.style.borderColor = "red";
    success = false;
  } else {
    $(".zipError").hide();
    zipLabel.style.color = "#000";
    zipField.style.borderColor = "green";
  }
}

// Function to validate CVV
function validateCVV(){
  if (IsNumeric(cvvField.value) === false){
    $(".cvvError").show();
    cvvField.style.borderColor = "red";
    success = false;
  } else if(cvvField.value.length !== 3){
    $(".cvvError").show();
    cvvField.style.borderColor = "red";
    success = false;
  } else {
    $(".cvvError").hide();
    ccLabel.style.color = "#000";
    cvvField.style.borderColor = "green";
  }
}

// Function to validate if a string is a string
function validateWord(text){
  const re = /^[a-zA-Z]*$/;
  return re.test(text);
}

// Function to validate if int is an int
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
});

zipValidate.addEventListener("keyup", () =>{
  validateZip();
});

cvvValidate.addEventListener("keyup", () =>{
  validateCVV();
});

// Success message
successMessage.className = "successMessage";
successMessage.innerHTML = "<h1>Wohoo, you are registered!</h1>";
successMessage.innerHTML += "<p>We look forward to see you on Full Stack Conf!</p>";
successMessage.innerHTML += "<img src='http://www.googlecover.com/_asset/_cover/Happy-Homer-Simpson_676.jpg'>";
container.appendChild(successMessage);
$(".successMessage").hide();
