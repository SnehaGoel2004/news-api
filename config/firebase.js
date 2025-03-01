//const admin = require('firebase-admin');
//const path = require('path');

//const serviceAccount = require(path.join(__dirname,  '../firebase-adminsdk.json'));

//admin.initializeApp({
 // credential: admin.credential.cert(serviceAccount)
//});

//module.exports = admin;




const admin = require("firebase-admin");
const path=require("path");

// Load Firebase credentials from environment variables
const firebaseConfig = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"), // ✅ Fixes new lines
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
};

// Initialize Firebase with the loaded credentials
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

module.exports = admin;
