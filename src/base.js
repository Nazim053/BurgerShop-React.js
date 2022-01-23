
import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBFlPZf0-cIX6Ua0iw2dcizaUF7yTq_F_w",
  authDomain: "date-burger-58b3f.firebaseapp.com",
  databaseURL: "https://date-burger-58b3f-default-rtdb.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;
