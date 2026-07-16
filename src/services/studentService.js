// src/services/studentService.js

import { db } from "../firebase-init";
import {
    collection,
    getDocs,
    setDoc,
    doc,
    onSnapshot
} from "firebase/firestore";

export async function getStudents(appId) {

    const studentsCollectionRef = collection(
        db,
        `artifacts/${appId}/students`
    );

    const snapshot = await getDocs(studentsCollectionRef);

    return snapshot.docs.map(doc => ({
        id: parseInt(doc.id),
        ...doc.data()
    }));
}

export async function saveStudents(appId, students) {

    const studentsCollectionRef = collection(
        db,
        `artifacts/${appId}/students`
    );

    for (const student of students) {

        await setDoc(
            doc(studentsCollectionRef, String(student.id)),
            {
                name: student.name,
                hiragana: student.hiragana,
                gender_id: student.gender_id,
                isActive: student.isActive,
                country: student.country ?? ""
            }
        );

    }

}

export function watchStudents(appId, callback) {

    const studentsCollectionRef = collection(
        db,
        `artifacts/${appId}/students`
    );

    return onSnapshot(
        studentsCollectionRef,
        (snapshot) => {

            const students = snapshot.docs.map(doc => ({
                id: parseInt(doc.id),
                ...doc.data()
            }));

            callback(students);

        }
    );

}