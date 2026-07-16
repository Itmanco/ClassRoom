// src/services/studentService.js

import { db } from "../firebase-init";
import {
    collection,
    getDocs,
    setDoc,
    doc,
    onSnapshot
} from "firebase/firestore";

export async function getStudents(schoolId) {

    const studentsCollectionRef = collection(
        db,
        `artifacts/${schoolId}/students`
    );

    const snapshot = await getDocs(studentsCollectionRef);

    return snapshot.docs.map(doc => ({
        id: parseInt(doc.id),
        ...doc.data()
    }));
}

export async function saveStudents(schoolId, students) {

    const studentsCollectionRef = collection(
        db,
        `artifacts/${schoolId}/students`
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

export function watchStudents(schoolId, callback) {

    const studentsCollectionRef = collection(
        db,
        `artifacts/${schoolId}/students`
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