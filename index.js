const firebaseConfig = {
    apiKey: "AIzaSyDbYYsuhFJ5rK9ioPD6U8Fhdv74DLyBq7o",
    authDomain: "wildlife-care-37bbc.firebaseapp.com",
    databaseURL: "https://wildlife-care-37bbc-default-rtdb.firebaseio.com",
    projectId: "wildlife-care-37bbc",
    storageBucket: "wildlife-care-37bbc.appspot.com",
    messagingSenderId: "871385386521",
    appId: "1:871385386521:web:c7f485ef6ad88031366488",
    measurementId: "G-6LWX9L6GEB"
};

firebase.initializeApp(firebaseConfig);

var contactFormDB = firebase.database().ref("User");

document.getElementById("User").addEventListener("submit",submitForm);

function submitForm(e) {
  e.preventDefault();
  var user = getElementVal("namefield");
  var email = getElementVal("emailfield");
  var phone = getElementById("phone");
  var msg = getElementVal("msg");
  saveMessages(user,email,phone,msg);
  document.querySelector(".alert").style.display = "block";
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);
  document.getElementById("User").reset();
}

const saveMessages = (user,email,phone, msg) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    f_name: f_name,
    l_name: l_name,
    user: user,
    email: email,
    phone: phone,
    msg: msg,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
