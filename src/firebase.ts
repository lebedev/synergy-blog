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
const postsCollection = db.collection('posts') as firebase.firestore.CollectionReference<Post>;

type Email = string;

export type Post = {
  id: string;
  title: string;
  url: string;
  text: string;
  createdAt: number;
  email: Email;
  isPublic: boolean;
  tags: string[];
};

export type Subscriptions = {
  subscriptions: Email[];
};

export type Comment = {
  text: string;
  createdAt: number;
  email: Email;
};

export const upsertPost = (post: Post) => postsCollection.doc(post.id).set(post);

export const getPublicPosts = async () =>
  postsCollection
    .where('isPublic', '==', true)
    .orderBy('createdAt', 'desc')
    .get()
    .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()));

export const getMyPosts = async (email: string) =>
  postsCollection
    .where('email', '==', email)
    .orderBy('createdAt', 'desc')
    .get()
    .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()));

export const getTaggedPosts = async (tag: string) =>
  postsCollection
    .where('isPublic', '==', true)
    .where('tags', 'array-contains', tag)
    .orderBy('createdAt', 'desc')
    .get()
    .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()));

export const getPost = async (id: string) => postsCollection.doc(id).get().then((querySnapshot) => querySnapshot.data());

export const subscribeToPostComments = (id: string, callback: Function) => {
  const commentsSubcollection = postsCollection.doc(id).collection('comments') as firebase.firestore.CollectionReference<Comment>;

  return commentsSubcollection.onSnapshot((querySnapshot) => {
    callback(querySnapshot.docs.map((doc) => doc.data()));
  });
};

export const addPostComment = async (postId: string, comment: Comment) =>
  postsCollection
    .doc(postId)
    .collection('comments')
    .add(comment);

export const deletePost = async (id: string) => postsCollection.doc(id).delete();

const subscriptionsCollection = db.collection('subscriptions') as firebase.firestore.CollectionReference<Subscriptions>;

export const addSubscription = async (email: string, subscription: string) =>
  subscriptionsCollection.doc(email).update({
    subscriptions: firebase.firestore.FieldValue.arrayUnion(subscription),
  });

export const removeSubscription = async (email: string, subscription: string) =>
  subscriptionsCollection.doc(email).update({
    subscriptions: firebase.firestore.FieldValue.arrayRemove(subscription),
  });

export const subscribeToSubscriptions = (email: string, callback: Function) => {
  const subscriptions = subscriptionsCollection.doc(email);
  return subscriptions.onSnapshot((querySnapshot) => {
    const subscriptionsData = querySnapshot.data();

    if (!subscriptionsData) {
      subscriptions.set({}, { merge: true });
    }

    callback(subscriptionsData?.subscriptions ?? []);
  });
};

export const getSubscribedPosts = async (emails: string[]) =>
  postsCollection
    .where('email', 'in', emails)
    .where('isPublic', '==', true)
    .orderBy('createdAt', 'desc')
    .get()
    .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()));
