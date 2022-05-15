import { firestore } from './firebase';


const getUsers = async () => {
  const snapshot = await firestore.collection('users').get();
  return snapshot.docs.map(doc =>  doc.data());
}

const createUser = async (user) => {
  //find user by username and veryfy if it exists
  const snapshot = await firestore.collection('users')
                                   .where('username', '==', user.username)
                                   .get();
  if (snapshot.empty) {
    //if user does not exist, create user
    await firestore.collection('users').add(user);
    return true;

  } else {
    //if user exists, change its token and expiration date
    const doc = snapshot.docs[0];
    await doc.ref.update({
      token: user.token,
      expiration_date: user.expiration_date
    });
    return false;
  }

}

export { getUsers, createUser };