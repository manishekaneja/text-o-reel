import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {firebaseKeys} from './firebase-keys';

firebase.initializeApp(firebaseKeys);
firebase.analytics();

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const serverTimeStamp = firebase.firestore.FieldValue.serverTimestamp;
const incrementCount = firebase.firestore.FieldValue.increment(1);
const decrementCount = firebase.firestore.FieldValue.increment(-1);
const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
const arrayRemove = firebase.firestore.FieldValue.arrayRemove;
export {
  projectAuth,
  projectFirestore,
  projectStorage,
  serverTimeStamp,
  incrementCount,
  decrementCount,
  arrayUnion,
  arrayRemove,
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
