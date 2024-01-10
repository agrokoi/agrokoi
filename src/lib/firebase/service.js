import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

export async function retriveData(collectionName) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function retriveDataById(collectionName, id) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();

  return data;
}

export async function signUp(userData, callback) {
    try {
      const { email, phone } = userData;
  
      const emailQuery = query(
        collection(firestore, "users"),
        where("email", "==", email)
      );
      const emailSnapshot = await getDocs(emailQuery);
      const existingEmailUsers = emailSnapshot.docs.map((doc) => doc.data());
  
      const phoneQuery = query(
        collection(firestore, "users"),
        where("phone", "==", phone)
      );
      const phoneSnapshot = await getDocs(phoneQuery);
      const existingPhoneUsers = phoneSnapshot.docs.map((doc) => doc.data());
  
      if (existingEmailUsers.length > 0 || existingPhoneUsers.length > 0) {

        callback(false);
      } else {
        if (!userData.role) {
          userData.role = "member";
        }
  
        userData.password = await bcrypt.hash(userData.password, 10);
  
        await addDoc(collection(firestore, "users"), userData);
        callback(true);
      }
    } catch (error) {
      console.error("Error during user registration:", error);
      callback(false);
    }
  }
  