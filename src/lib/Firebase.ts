import app from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyC-xQVimFgoz9Ulrbo6_uDcNQK5viDs8C4",
  authDomain: "smite-source.firebaseapp.com",
  databaseURL: "https://smite-source.firebaseio.com",
  projectId: "smite-source",
  storageBucket: "smite-source.appspot.com",
  messagingSenderId: "447248344749",
  appId: "1:447248344749:web:41b9138254263a99"
};

export class Firebase {
  auth: app.auth.Auth;
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }

  doCreateUserWithEmailAndPassword = (email: string, password: string) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignItWithEmailAndPassword = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password: string) => {
    if (this.auth.currentUser)
      return this.auth.currentUser.updatePassword(password);
  };
}
