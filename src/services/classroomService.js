import { db } from "../firebase-init";


import {
    collection,
    doc,
    getDocs,
    onSnapshot,
    setDoc,
} from "firebase/firestore";

export async function getClassrooms(appId) {

    const snapshot = await getDocs(

        collection(
            db,
            `artifacts/${appId}/classrooms`
        )

    );

    return snapshot.docs.map(doc => ({

        id: doc.id,

        ...doc.data()

    }));

}

export function watchClassrooms(
    appId,
    onChange,
    onError
) {

    return onSnapshot(

        collection(
            db,
            `artifacts/${appId}/classrooms`
        ),

        snapshot => {

            onChange(snapshot);

        },

        error => {

            if (onError)
                onError(error);

        }

    );

}
export async function saveClassroomLayout(appId, tabData, docId = null) {
  const classroomsRef = collection(
    db,
    `artifacts/${appId}/classrooms`,
  );

  const documentRef = docId
    ? doc(classroomsRef, docId)
    : doc(classroomsRef);

  await setDoc(documentRef, {
    title: tabData.title,
    creationDate: tabData.creationDate,
    studentAssignments: tabData.studentAssignments,
  });

  return documentRef.id;
}