import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBeP5VS1OEvSOA8jxbz88n64TnSd9DAYEI',
  authDomain: 'synergy-blog-9b33b.firebaseapp.com',
  projectId: 'synergy-blog-9b33b',
  storageBucket: 'synergy-blog-9b33b.appspot.com',
  messagingSenderId: '261067500212',
  appId: '1:261067500212:web:a2f6a201546fe4837e85e1'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// @ts-ignore Hack package firebase to window.
window.firebase = firebase;
// @ts-ignore Usage of localized firebaseUI script.
const authUI = new window.firebaseui.auth.AuthUI(firebase.auth());

export const startAuthUI = (container: string) => {
  authUI.start(container, {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  });
}

export const initAuthStateChanged = (callback: (user: firebase.User | null) => void) => firebase.auth().onAuthStateChanged(callback);

export const signOut = () => firebase.auth().signOut();

const db = firebase.firestore();
const postsCollection = db.collection('posts');

export type Post = {
  id: string;
  title: string;
  url: string;
  text: string;
  createdAt: number;
  email: string;
  isPublic: boolean;
};

export const upsertPost = (post: Post) => postsCollection.doc(post.id).set(post);

db.collection('posts').where('isPublic', '==', true).get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
});
