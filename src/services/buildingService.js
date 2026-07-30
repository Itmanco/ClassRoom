// src/services/buildingService.js

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
    throw new Error("A schoolId is required to access buildings.");
  }
}

function normalizeBuildingCode(code) {
  if (typeof code !== "string" || !code.trim()) {
    throw new Error("A building code is required.");
  }

  return code.trim().toUpperCase();
}

function validateBuilding(building) {
  if (!building || typeof building !== "object") {
    throw new Error("A building is required.");
  }

  const code = normalizeBuildingCode(building.code);
  const name = typeof building.name === "string" ? building.name.trim() : "";
  const floorCount = Number(building.floorCount);

  if (!name) {
    throw new Error("A building name is required.");
  }

  if (!Number.isInteger(floorCount) || floorCount < 1) {
    throw new Error("floorCount must be a positive integer.");
  }

  return {
    code,
    name,
    floorCount,
    active: building.active !== false,
  };
}

function getBuildingsRef(schoolId) {
  requireSchoolId(schoolId);
  return collection(db, "schools", schoolId, "buildings");
}

function mapBuilding(documentSnapshot) {
  return {
    id: documentSnapshot.id,
    ...documentSnapshot.data(),
  };
}

function sortBuildings(buildings) {
  return buildings.sort((first, second) =>
    first.code.localeCompare(second.code, undefined, {
      numeric: true,
      sensitivity: "base",
    }),
  );
}

export async function getBuildings(schoolId) {
  const snapshot = await getDocs(getBuildingsRef(schoolId));
  return sortBuildings(snapshot.docs.map(mapBuilding));
}

export function watchBuildings(schoolId, onChange, onError) {
  return onSnapshot(
    getBuildingsRef(schoolId),
    (snapshot) => {
      onChange(sortBuildings(snapshot.docs.map(mapBuilding)));
    },
    onError,
  );
}

export async function saveBuilding(schoolId, building) {
  const normalizedBuilding = validateBuilding(building);
  const buildingRef = doc(
    getBuildingsRef(schoolId),
    normalizedBuilding.code,
  );
  const existingDocument = await getDoc(buildingRef);

  const data = {
    ...normalizedBuilding,
    updatedAt: serverTimestamp(),
  };

  if (!existingDocument.exists()) {
    data.createdAt = serverTimestamp();
  }

  await setDoc(buildingRef, data, { merge: true });
  return buildingRef.id;
}

export async function archiveBuilding(schoolId, buildingId) {
  const normalizedBuildingId = normalizeBuildingCode(buildingId);
  const buildingRef = doc(
    getBuildingsRef(schoolId),
    normalizedBuildingId,
  );
  const existingDocument = await getDoc(buildingRef);

  if (!existingDocument.exists()) {
    throw new Error(`Building ${normalizedBuildingId} does not exist.`);
  }

  await updateDoc(buildingRef, {
    active: false,
    updatedAt: serverTimestamp(),
  });
}