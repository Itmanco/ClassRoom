// src/services/roomService.js

import { db } from "../firebase-init";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

function requireSchoolId(schoolId) {
  if (!schoolId || typeof schoolId !== "string") {
    throw new Error("A schoolId is required to access rooms.");
  }
}

function normalizeIdentifier(value, fieldName) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${fieldName} is required.`);
  }

  return value.trim().toUpperCase();
}

function requirePositiveInteger(value, fieldName) {
  const number = Number(value);

  if (!Number.isInteger(number) || number < 1) {
    throw new Error(`${fieldName} must be a positive integer.`);
  }

  return number;
}

function requireNonNegativeInteger(value, fieldName) {
  const number = Number(value);

  if (!Number.isInteger(number) || number < 0) {
    throw new Error(`${fieldName} must be a non-negative integer.`);
  }

  return number;
}

function validateRoom(room) {
  if (!room || typeof room !== "object") {
    throw new Error("A room is required.");
  }

  const code = normalizeIdentifier(room.code, "Room code");
  const buildingId = normalizeIdentifier(room.buildingId, "Building");
  const name = typeof room.name === "string" ? room.name.trim() : "";
  const floor = requirePositiveInteger(room.floor, "Floor");
  const roomNumber = requirePositiveInteger(room.roomNumber, "Room number");
  const deskCount = requireNonNegativeInteger(room.deskCount, "Desk count");
  const seatsPerDesk = requirePositiveInteger(
    room.seatsPerDesk,
    "Seats per desk",
  );

  if (!name) {
    throw new Error("A room name is required.");
  }

  return {
    code,
    name,
    buildingId,
    floor,
    roomNumber,
    deskCount,
    seatsPerDesk,
    capacity: deskCount * seatsPerDesk,
    active: room.active !== false,
  };
}

function getRoomsRef(schoolId) {
  requireSchoolId(schoolId);
  return collection(db, "schools", schoolId, "rooms");
}

function mapRoom(documentSnapshot) {
  return {
    id: documentSnapshot.id,
    ...documentSnapshot.data(),
  };
}

function sortRooms(rooms) {
  return rooms.sort((first, second) =>
    first.code.localeCompare(second.code, undefined, {
      numeric: true,
      sensitivity: "base",
    }),
  );
}

export async function getRooms(schoolId) {
  const snapshot = await getDocs(getRoomsRef(schoolId));
  return sortRooms(snapshot.docs.map(mapRoom));
}

export function watchRooms(schoolId, onChange, onError) {
  return onSnapshot(
    getRoomsRef(schoolId),
    (snapshot) => {
      onChange(sortRooms(snapshot.docs.map(mapRoom)));
    },
    onError,
  );
}

export async function saveRoom(schoolId, room) {
  const normalizedRoom = validateRoom(room);
  const buildingRef = doc(
    db,
    "schools",
    schoolId,
    "buildings",
    normalizedRoom.buildingId,
  );
  const buildingDocument = await getDoc(buildingRef);

  if (!buildingDocument.exists()) {
    throw new Error(`Building ${normalizedRoom.buildingId} does not exist.`);
  }

  const building = buildingDocument.data();

  if (building.active === false) {
    throw new Error(`Building ${normalizedRoom.buildingId} is archived.`);
  }

  if (normalizedRoom.floor > Number(building.floorCount)) {
    throw new Error(
      `Floor ${normalizedRoom.floor} exceeds ${normalizedRoom.buildingId}'s ${building.floorCount} floors.`,
    );
  }

  const roomRef = doc(getRoomsRef(schoolId), normalizedRoom.code);
  const existingDocument = await getDoc(roomRef);
  const data = {
    ...normalizedRoom,
    updatedAt: serverTimestamp(),
  };

  if (!existingDocument.exists()) {
    data.createdAt = serverTimestamp();
  }

  await setDoc(roomRef, data, { merge: true });
  return roomRef.id;
}

export async function archiveRoom(schoolId, roomId) {
  const normalizedRoomId = normalizeIdentifier(roomId, "Room ID");
  const roomRef = doc(getRoomsRef(schoolId), normalizedRoomId);
  const existingDocument = await getDoc(roomRef);

  if (!existingDocument.exists()) {
    throw new Error(`Room ${normalizedRoomId} does not exist.`);
  }

  await updateDoc(roomRef, {
    active: false,
    updatedAt: serverTimestamp(),
  });
}
