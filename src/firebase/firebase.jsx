// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, onValue, child, remove } from "firebase/database";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId,
    databaseURL: import.meta.env.VITE_databaseURL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const writeContactData = (id, username, phone, gender) => {
    const reference = ref(db, "contacts/" + id);

    set(reference, {
        id: id,
        username: username,
        phone: phone,
        gender: gender,
    });
};

export const getAllContacts = (setContacts) => {
    const reference = ref(db);

    get(child(reference, "contacts/")).then((snapshot) => {
        const contacts = [];
        snapshot.forEach((childSnapshot) => {
            contacts.push(childSnapshot.val());
        });
        setContacts(contacts);
        console.log(contacts);
    });
};

export const deleteContact = (id) => {
    const reference = ref(db, "contacts/" + id);
    remove(reference);
};

export const getContact = (id, setEditContact) => {
    const reference = ref(db);

    get(child(reference, `contacts/${id}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                setEditContact(snapshot.val());
            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
};
