import {auth, database} from 'assets';
import * as firebase from 'firebase';

/**
 * Register the user using email and password
 *
 * @param {object} data
 * @param {function} callback
 */
function register(data, callback) {
  const {email, password, username} = data;
  auth.createUserWithEmailAndPassword(email, password)
    .then((resp) => createUser({username, uid: resp.user.uid}, callback))
    .catch((error) => callback(false, null, error));
}

/**
 * Sign the user in with their email and password
 *
 * @param {object} data
 * @param {function} callback
 */
function login(data, callback) {
  const {email, password} = data;
  auth.signInWithEmailAndPassword(email, password)
    .then((resp) => getUser(resp.user, callback))
    .catch((error) => callback(false, null, error));
}

/**
 * Create the user object in realtime database
 *
 * @param {object} user
 * @param {function} callback
 */
function createUser(user, callback) {
  const userRef = database.ref().child('users');

  userRef.child(user.uid).update({...user})
    .then(() => callback(true, user, null))
    .catch((error) => callback(false, null, {message: error}));
}

/**
 * extract necessary data from the facebook user object
 *
 * @param   {object} fbUser
 * @return  {object} user
 */
function extractDataFromFacebbokUser(fbUser) {
  return {
    fullname: fbUser.displayName,
    email: fbUser.email,
    uid: fbUser.uid,
    avatar: fbUser.photoURL,
  };
}

/**
 * Get the user object from the realtime database
 *
 * @param {object} user
 * @param {function} callback
 */
function getUser(user, callback) {
  database.ref('users').child(user.uid).once('value')
    .then(function(snapshot) {
      const exists = (snapshot.val() !== null);

      if (exists) {
        // if the user exist in the DB, replace the user variable with the returned snapshot
        user = snapshot.val();
        const data = {exists, user};

        callback(true, data, null);
      } else {
        // TODO: simplify callback!
        // if no user is found with the given uid create a new one
        createUser({...extractDataFromFacebbokUser(user)}, (success, user, error) => {
          callback(success, {exists: success, user}, error);
        });
      }
    })
    .catch((error) => callback(false, null, error));
}

/**
 * Send Password Reset Email
 *
 * @param {object} data
 * @param {function} callback
 */
function resetPassword(data, callback) {
  const {email} = data;
  auth.sendPasswordResetEmail(email)
    .then(() => callback(true, null, null))
    .catch((error) => callback(false, null, error));
}

/**
 * Sign out the current user
 *
 * @param {function} callback
 */
function signOut(callback) {
  auth.signOut()
    .then(() => {
      if (callback) callback(true, null, null);
    })
    .catch((error) => {
      if (callback) callback(false, null, error);
    });
}

/**
 * Sign user in using Facebook
 *
 * @param {string} fbToken
 * @param {function} callback
 * @return {Promise<T | never>}
 */
function signInWithFacebook(fbToken, callback) {
  const credential = firebase.auth.FacebookAuthProvider.credential(fbToken);
  return auth.signInWithCredential(credential)
    .then((user) => {
      getUser(user, callback);
    })
    .catch((error) => callback(false, null, error));
}

export const authAPI = {
  register,
  createUser,
  login,
  getUser,
  resetPassword,
  signOut,
  signInWithFacebook,
};
