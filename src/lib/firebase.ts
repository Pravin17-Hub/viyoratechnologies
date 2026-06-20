import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if firebase is configured
export const isFirebaseConfigured = !!(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
);

let app;
let db: any = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
  } catch (error) {
    console.error("Firebase initialization failed:", error);
  }
} else {
  console.warn("Firebase environment variables are missing. Falling back to local storage.");
}

export { db };

// Helper to save a message
export async function dbSaveMessage(messageData: { name: string; email: string; subject: string; message: string }) {
  if (isFirebaseConfigured && db) {
    try {
      const colRef = collection(db, "contact_messages");
      await addDoc(colRef, {
        ...messageData,
        createdAt: new Date().toISOString(),
      });
      return true;
    } catch (e) {
      console.error("Error saving message to Firebase, falling back to local storage:", e);
    }
  }

  // Fallback to localStorage
  const msgs = JSON.parse(localStorage.getItem("contact_messages") || "[]");
  msgs.push({ id: Date.now().toString(), ...messageData, createdAt: new Date().toISOString() });
  localStorage.setItem("contact_messages", JSON.stringify(msgs));
  return false;
}

// Helper to get all messages
export async function dbGetMessages() {
  if (isFirebaseConfigured && db) {
    try {
      const colRef = collection(db, "contact_messages");
      const q = query(colRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const messages: any[] = [];
      querySnapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      return messages;
    } catch (e) {
      console.error("Error fetching messages from Firebase, falling back to local storage:", e);
    }
  }

  // Fallback to localStorage
  return JSON.parse(localStorage.getItem("contact_messages") || "[]").reverse();
}

// Helper to delete a message
export async function dbDeleteMessage(id: string) {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "contact_messages", id);
      await deleteDoc(docRef);
      return true;
    } catch (e) {
      console.error("Error deleting message from Firebase, falling back to local storage:", e);
    }
  }

  // Fallback to localStorage
  const msgs = JSON.parse(localStorage.getItem("contact_messages") || "[]");
  const next = msgs.filter((m: any) => m.id !== id);
  localStorage.setItem("contact_messages", JSON.stringify(next));
  return false;
}

// Helper to save job application
export async function dbSaveApplication(appData: { name: string; email: string; mobile: string; skills: string; projects: string }) {
  if (isFirebaseConfigured && db) {
    try {
      const colRef = collection(db, "job_applications");
      await addDoc(colRef, {
        ...appData,
        appliedAt: new Date().toISOString(),
      });
      return true;
    } catch (e) {
      console.error("Error saving job application to Firebase, falling back to local storage:", e);
    }
  }

  // Fallback to localStorage
  const apps = JSON.parse(localStorage.getItem("job_applications") || "[]");
  apps.push({ id: Date.now().toString(), ...appData, appliedAt: new Date().toISOString() });
  localStorage.setItem("job_applications", JSON.stringify(apps));
  return false;
}

// Helper to get all job applications
export async function dbGetApplications() {
  if (isFirebaseConfigured && db) {
    try {
      const colRef = collection(db, "job_applications");
      const q = query(colRef, orderBy("appliedAt", "desc"));
      const querySnapshot = await getDocs(q);
      const apps: any[] = [];
      querySnapshot.forEach((doc) => {
        apps.push({ id: doc.id, ...doc.data() });
      });
      return apps;
    } catch (e) {
      console.error("Error fetching job applications from Firebase, falling back to local storage:", e);
    }
  }

  // Fallback to localStorage
  return JSON.parse(localStorage.getItem("job_applications") || "[]").reverse();
}

// Helper to delete a job application
export async function dbDeleteApplication(id: string) {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "job_applications", id);
      await deleteDoc(docRef);
      return true;
    } catch (e) {
      console.error("Error deleting job application from Firebase, falling back to local storage:", e);
    }
  }

  // Fallback to localStorage
  const apps = JSON.parse(localStorage.getItem("job_applications") || "[]");
  const next = apps.filter((a: any) => a.id !== id);
  localStorage.setItem("job_applications", JSON.stringify(next));
  return false;
}
