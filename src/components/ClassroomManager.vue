<template>
  <div class="classroom-manager">

    <div class="login-button-container">
      <svg @click="toggleLoginStatus" 
           xmlns="http://www.w3.org/2000/svg" 
           width="24" height="24" 
           :fill="isLoggedIn ? 'red' : 'green'" 
           class="bi bi-box-arrow-in-right" 
           viewBox="0 0 16 16"
           :class="{'logged-in': isLoggedIn}">
        <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/>
        <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
      </svg>
    </div>

    <h1>教室の管理</h1>
    <h2>{{ classroomName }}</h2>
    <div class="tabs-container">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="selectTab(tab.id)"
        :class="{ 'active-tab': tab.id === activeTabId, 'temporary-tab': tab.id === 'temp-randomized' }"
        :title="tab.title + ' (Created: ' + tab.creationDate + ')'"
      >
        {{ tab.title }}
      </button>
    </div>
    <div class="tabs-container action-buttons">
      <button @click="randomizeCurrentList" v-if="isLoggedIn">再編成する</button>
      <button @click="saveAsNewTab" v-if="currentTab && isLoggedIn">選択内容を保存</button> 
    </div>
            
    <MyClassroom
      :desks="currentDeskLayout"
      :classroomTitle="currentTab ? currentTab.title : '教室のレイアウト'"
      v-if="currentDeskLayout.length > 0 && initialLoadComplete"
    />
    <div v-else class="loading-message">
      教室のレイアウトを読み込み中．．．
    </div>
    <div class="tabs-container">
      <button @click="downloadCurrentTab" v-if="currentTab && isLoggedIn">Excelにダウンロード</button>
    </div>
    
    <LoginModal :isVisible="showLoginModal" @close="showLoginModal = false" @login-success="handleLoginSuccess" />
    
  </div>
</template>

<script>
import MyClassroom from './MyClassroom.vue';
import LoginModal from './LoginModal.vue';
import { onBeforeUnmount } from 'vue';
import { db, auth, authReadyPromise, appId } from '../firebase-init';
import { collection, doc, setDoc, onSnapshot, getDoc, getDocs } from 'firebase/firestore'; 
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInAnonymously,
  linkWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import * as XLSX from 'xlsx-js-style';

export default {
  name: 'ClassroomManager',
  components: {
    MyClassroom,
    LoginModal
  },
  data() {
    return { 
      isLoggedIn: false, 
      isAnonymous: false, 
      showLoginModal: false,
      classroomName: "Java プログラミング①",
      masterStudentList: [], 
      allStudentsMap: new Map(), 
      tabs: [],
      activeTabId: null,
      emptyStudentPlaceholder: { id: 'empty-slot', name: '', hiragana: '', gender_id: 0, isEmpty: true },
      isFirestoreReady: false,
      initialLoadComplete: false,
      masterListSaved: false,
      user: null, // Add a user property to hold the Firebase user object
      c1: {
        creationDate: "2025年5月22日",
        studentAssignments: [
          { studentId: 16, deskNumber: 1 }, { studentId: 3, deskNumber: 1 },
          { studentId: 15, deskNumber: 2 }, { studentId: 7, deskNumber: 2 },
          { studentId: 10, deskNumber: 3 }, { studentId: 5, deskNumber: 3 },
          { studentId: 14, deskNumber: 4 }, { studentId: 11, deskNumber: 4 },
          { studentId: 19, deskNumber: 5 }, { studentId: 18, deskNumber: 5 },
          { studentId: 17, deskNumber: 6 }, { studentId: 6, deskNumber: 6 },
          { studentId: 8, deskNumber: 7 }, { studentId: 9, deskNumber: 7 },
          { studentId: 2, deskNumber: 8 }, { studentId: 4, deskNumber: 8 },
          { studentId: 13, deskNumber: 9 }, { studentId: 12, deskNumber: 9 }
        ],
        title: "一第"
      },
      c2: {
        creationDate: "2025年7月7日",
        studentAssignments: [
          { studentId: 13, deskNumber: 1 }, { studentId: 10, deskNumber: 1 },
          { studentId: 8, deskNumber: 2 }, { studentId: 6, deskNumber: 2 },
          { studentId: 11, deskNumber: 3 }, { studentId: 19, deskNumber: 3 },
          { studentId: 9, deskNumber: 4 }, { studentId: 18, deskNumber: 4 },
          { studentId: 3, deskNumber: 5 }, { studentId: 17, deskNumber: 5 },
          { studentId: 12, deskNumber: 6 }, { studentId: 2, deskNumber: 6 },
          { studentId: 4, deskNumber: 7 }, { studentId: 5, deskNumber: 7 },
          { studentId: 15, deskNumber: 8 }, { studentId: 14, deskNumber: 8 },
          { studentId: 16, deskNumber: 9 }, { studentId: 7, deskNumber: 9 }
        ],
        title: "二第"
      },
      c3: {
        creationDate: "2025年7月30日",
        studentAssignments: [
          { studentId: 4, deskNumber: 1 }, { studentId: 8, deskNumber: 1 },
          { studentId: 5, deskNumber: 2 }, { studentId: 15, deskNumber: 2 },
          { studentId: 17, deskNumber: 3 }, { studentId: 2, deskNumber: 3 },
          { studentId: 18, deskNumber: 4 }, { studentId: 10, deskNumber: 4 },
          { studentId: 7, deskNumber: 5 }, { studentId: 12, deskNumber: 5 },
          { studentId: 11, deskNumber: 6 }, { studentId: 9, deskNumber: 6 },
          { studentId: 6, deskNumber: 7 }, { studentId: 14, deskNumber: 7 },
          { studentId: 3, deskNumber: 8 }, { studentId: 19, deskNumber: 8 },
          { studentId: 16, deskNumber: 9 },
        ],
        title: "三第"
      },
      c4: {
        creationDate: "2025年8月22日",
        studentAssignments: [
          { studentId: 12, deskNumber: 1 }, { studentId: 17, deskNumber: 1 },
          { studentId: 19, deskNumber: 2 }, { studentId: 10, deskNumber: 2 },
          { studentId: 4, deskNumber: 3 }, { studentId: 18, deskNumber: 3 },
          { studentId: 16, deskNumber: 4 }, { studentId: 2, deskNumber: 4 },
          { studentId: 11, deskNumber: 5 }, { studentId: 5, deskNumber: 5 },
          { studentId: 14, deskNumber: 6 }, { studentId: 8, deskNumber: 6 },
          { studentId: 15, deskNumber: 7 }, { studentId: 3, deskNumber: 7 },
          { studentId: 7, deskNumber: 8 }, { studentId: 6, deskNumber: 8 },
          { studentId: 9, deskNumber: 9 },
        ],
        title: "四第"
      },
      studentsUnsubscribe: null,
      tabsUnsubscribe: null,
      unsubscribeAuth: null
    };
  },
  async created() {
    await authReadyPromise;
    this.isFirestoreReady = true;

    // Store the unsubscribe function from onAuthStateChanged in your data
    this.unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      this.user = user;
      this.isLoggedIn = !!user && !user.isAnonymous;
      this.isAnonymous = !!user && user.isAnonymous;

      if (user) {
        console.log('ユーザーがログインしました。UID:', user.uid, '匿名ユーザー:', user.isAnonymous);
        if (!this.initialLoadComplete) {
            await this.loadInitialDataAndSetupListeners();
        }
      } else {
        console.log('ユーザーが見つかりませんでした。匿名でサインインします...');
        if (!auth.currentUser) {
            try {
              await signInAnonymously(auth);
              console.log('匿名ユーザーがサインインしました。');
            } catch (error) {
              console.error("匿名サインインに失敗しました:", error);
            }
        }
      }
    });
  },
  beforeUnmount() {
    // Call the unsubscribe function here to clean up the listener
    if (this.unsubscribeAuth) {
        this.unsubscribeAuth();
    }
  },
  computed: {
    currentTab() {
      return this.tabs.find(tab => tab.id === this.activeTabId) || null;
    },
    currentDeskLayout() {
      return this.currentTab ? this.currentTab.deskLayout : [];
    }
  },
  methods: {
    
    // Step 1: Centralized data processing helper method
    async fetchAndProcessClassrooms(querySnapshot) {
      const loadedTabsData = [];
      const studentIdsToFetch = new Set();
      querySnapshot.forEach((doc) => {
          const data = doc.data();
          const assignments = Array.isArray(data.studentAssignments) ? data.studentAssignments : [];
          assignments.forEach(assignment => studentIdsToFetch.add(assignment.studentId));
          loadedTabsData.push({ ...data, id: doc.id, firestoreDocId: doc.id, studentAssignments: assignments, deskLayout: [] });
      });
      const fetchedStudentsMap = new Map();
      if (studentIdsToFetch.size > 0) {
        const studentDocPromises = Array.from(studentIdsToFetch).map(id => getDoc(doc(db, `artifacts/${appId}/students`, String(id))));
        const studentDocs = await Promise.all(studentDocPromises);
        studentDocs.forEach(docSnap => {
          if (docSnap.exists()) {
            const studentData = { id: parseInt(docSnap.id), ...docSnap.data() };
            fetchedStudentsMap.set(studentData.id, studentData);
          }
        });
      }
      this.tabs = loadedTabsData.map(tab => {
          const rehydratedStudents = tab.studentAssignments.map(assignment => {
              const fullStudentData = fetchedStudentsMap.get(assignment.studentId);
              return fullStudentData ? { ...fullStudentData, deskNumber: assignment.deskNumber } : { ...this.emptyStudentPlaceholder };
          }).filter(s => !s.isEmpty);
          const { deskLayout, studentsWithDeskNumbers } = this.assignStudentsToDesks(rehydratedStudents);
          return {
              ...tab,
              studentAssignments: studentsWithDeskNumbers.map(s => ({ studentId: s.id, deskNumber: s.deskNumber })),
              deskLayout: deskLayout
          };
      });
      
      // this.tabs.sort((a, b) => a.id - b.id);
      this.tabs.sort((a, b) => {
          // Keep the temporary tab at the end of the list
          if (a.id === 'temp-randomized') return 1;
          if (b.id === 'temp-randomized') return -1;

          // Sort regular tabs by their numerical kanji value
          const numA = this.convertKanjiToNumber(a.title);
          const numB = this.convertKanjiToNumber(b.title);
          return numA - numB;
      });

      if (this.tabs.length > 0 && !this.activeTabId) {
          this.activeTabId = this.tabs[0].id;
      }
        },

    // Step 2: Simplify initial load to just call listener setup
    async loadInitialDataAndSetupListeners() {
      if (this.studentsUnsubscribe) this.studentsUnsubscribe();
      if (this.tabsUnsubscribe) this.tabsUnsubscribe();
      
      this.initialLoadComplete = false;

      const studentsCollectionRef = collection(db, `artifacts/${appId}/students`);
      const studentsSnapshot = await getDocs(studentsCollectionRef);
      const loadedStudents = [];
      const tempStudentMap = new Map();
      studentsSnapshot.forEach((doc) => {
        const studentData = { id: parseInt(doc.id), ...doc.data() };
        loadedStudents.push(studentData);
        tempStudentMap.set(studentData.id, studentData);
      });
      this.masterStudentList = loadedStudents;
      this.allStudentsMap = tempStudentMap;

      if (this.masterStudentList.length === 0) {
        console.log("マスター生徒リストが見つかりませんでした。デフォルトを初期化します。");
        this.initializeDefaultMasterStudentList();
        await this.saveMasterStudentListInit();
      }
      
      this.initialLoadComplete = true;
      console.log("Initial data load complete.");
      this.setupRealtimeListeners();
    },

    // Step 2 (cont.): Consolidate all listening logic here
    setupRealtimeListeners() {
      if (!auth.currentUser || !this.isFirestoreReady) {
        console.warn("Cannot set up real-time listeners: user not authenticated or Firestore not ready.");
        return;
      }
      const studentsCollectionRef = collection(db, `artifacts/${appId}/students`);
      this.studentsUnsubscribe = onSnapshot(studentsCollectionRef, (querySnapshot) => {
        const loadedStudents = [];
        const tempStudentMap = new Map();
        querySnapshot.forEach((doc) => {
            const studentData = { id: parseInt(doc.id), ...doc.data() };
            loadedStudents.push(studentData);
            tempStudentMap.set(studentData.id, studentData);
        });
        this.masterStudentList = loadedStudents;
        this.allStudentsMap = tempStudentMap;
        if (loadedStudents.length > 0) {
            this.masterListSaved = true;
        }
      }, (error) => { console.error("Error listening to master student list from Firestore:", error); });
      
      const classroomsCollectionRef = collection(db, `artifacts/${appId}/classrooms`);
      this.tabsUnsubscribe = onSnapshot(classroomsCollectionRef, async (querySnapshot) => {
        // Use the new helper method here
          await this.fetchAndProcessClassrooms(querySnapshot);
      }, (error) => { console.error("Error listening to tabs from Firestore:", error); });
    },

    initializeDefaultMasterStudentList() {
      this.masterStudentList = [
        { id: 2, name: "熱田", hiragana: "あつた", gender_id: 2, isActive: true },
        { id: 3, name: "大塚", hiragana: "おおつか", gender_id: 1, isActive: true },
        { id: 4, name: "岡田", hiragana: "おかだ", gender_id: 2, isActive: true },
        { id: 5, name: "河井", hiragana: "かわい", gender_id: 1, isActive: true },
        { id: 6, name: "川口", hiragana: "かわぐち", gender_id: 2, isActive: true },
        { id: 7, name: "川田", hiragana: "かわた", gender_id: 2, isActive: true },
        { id: 8, name: "MOTTA", hiragana: "もった", gender_id: 1, isActive: true },
        { id: 9, name: "里舘", hiragana: "さとだて", gender_id: 1, isActive: true },
        { id: 10, name: "塩田", hiragana: "しおた", gender_id: 1, isActive: true },
        { id: 11, name: "新岡", hiragana: "にいおか", gender_id: 1, isActive: true },
        { id: 12, name: "樋口", hiragana: "ひぐち", gender_id: 2, isActive: true },
        { id: 13, name: "堀口", hiragana: "ほりぐち", gender_id: 2, isActive: false },
        { id: 14, name: "松井", hiragana: "まつい", gender_id: 1, isActive: true }, 
        { id: 15, name: "松川", hiragana: "まつかわ", gender_id: 1, isActive: true },
        { id: 16, name: "水上", hiragana: "みずかみ", gender_id: 2, isActive: true },
        { id: 17, name: "宮澤", hiragana: "みやざわ", gender_id: 1, isActive: true }, 
        { id: 18, name: "山角", hiragana: "やまかど", gender_id: 1, isActive: true }, 
        { id: 19, name: "山田", hiragana: "やまだ", gender_id: 1, isActive: true }, 
      ];
      this.masterStudentList.forEach(student => {
        this.allStudentsMap.set(student.id, student);
      });
    },

    async saveMasterStudentListInit() {
      if (!auth.currentUser || !this.isFirestoreReady) {
        console.warn("Firestore not ready or user not authenticated, cannot save.");
        return;
      }
      if (this.masterListSaved) {
        alert("マスター学生リストはすでに保存されています。");
        return;
      }
      const studentsCollectionRef = collection(db, `artifacts/${appId}/students`);
      try {
        const studentsSnapshot = await getDocs(studentsCollectionRef);
        if (!studentsSnapshot.empty) {
          console.log("Master student list already exists in Firestore. Skipping save.");
          alert("マスター学生リストはすでに存在します。");
          this.masterListSaved = true;
          return;
        }
        for (const student of this.masterStudentList) {
          await setDoc(doc(studentsCollectionRef, String(student.id)), {
            name: student.name,
            hiragana: student.hiragana,
            gender_id: student.gender_id,
            isActive: student.isActive
          });
        }
        console.log("Master student list successfully saved to /students collection.");
        const classroomsCollectionRef = collection(db, `artifacts/${appId}/classrooms`);
        const classroomsSnapshot = await getDocs(classroomsCollectionRef);
        if (classroomsSnapshot.empty) {
            console.log("No classroom tabs found. Creating initial layouts from cLists.");
            const initialLists = [this.c1, this.c2, this.c3, this.c4];
            for (const item of initialLists) {
                await this.addTab(item.title, item.studentAssignments, true);
            }
            console.log("Initial cLists successfully saved as tabs.");
        }
        alert("マスター学生リストがFirestoreに保存されました。");
        this.masterListSaved = true;
      } catch (e) {
        console.error("Error saving master student list:", e);
        alert("マスター学生リストの保存中にエラーが発生しました。");
      }
    },

    assignStudentsToDesks(studentList) {
      const numDesks = 9;
      const desks = Array.from({ length: numDesks }, (_, i) => ({ id: `desk-${i + 1}`, name: `${i + 1}`, students: [] }));
      const studentsToAssign = studentList.map(s => ({ ...s })); 
      const preAssignedStudentsMap = new Map();
      studentsToAssign.forEach(student => {
        if (student.deskNumber && !student.isEmpty) {
          if (!preAssignedStudentsMap.has(student.deskNumber)) {
            preAssignedStudentsMap.set(student.deskNumber, []);
          }
          preAssignedStudentsMap.get(student.deskNumber).push(student);
        }
      });
      const placedStudentIds = new Set();
      preAssignedStudentsMap.forEach((studentsAtDesk, deskNumber) => {
        const deskIndex = deskNumber - 1;
        if (desks[deskIndex]) {
          for (let k = 0; k < Math.min(studentsAtDesk.length, 2); k++) {
            desks[deskIndex].students.push(studentsAtDesk[k]);
            placedStudentIds.add(studentsAtDesk[k].id);
          }
        }
      });
      const unassignedStudents = studentsToAssign.filter(s => !placedStudentIds.has(s.id));
      let unassignedIndex = 0;
      desks.forEach(desk => {
        while (desk.students.length < 2) {
          if (unassignedIndex < unassignedStudents.length) {
            const student = unassignedStudents[unassignedIndex++];
            student.deskNumber = parseInt(desk.name);
            desk.students.push(student);
            placedStudentIds.add(student.id);
          } else {
            desk.students.push({ ...this.emptyStudentPlaceholder, id: `empty-${desk.name}-${desk.students.length + 1}` });
          }
        }
      });
      const studentsWithDeskNumbers = desks.flatMap(desk => desk.students.filter(s => !s.isEmpty));
      return { deskLayout: desks, studentsWithDeskNumbers: studentsWithDeskNumbers };
    },

    async addTab(title, studentsArray, autoSave = false) {
      const newTabId = this.tabs.length > 0 ? Math.max(...this.tabs.map(t => t.id)) + 1 : 1;
      const creationDate = new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
      const { deskLayout, studentsWithDeskNumbers } = this.assignStudentsToDesks(studentsArray);
      const studentAssignments = studentsWithDeskNumbers.map(s => ({ studentId: s.id, deskNumber: s.deskNumber }));
      const newTab = {
        id: newTabId, title: title, creationDate: creationDate,
        studentAssignments: studentAssignments, deskLayout: deskLayout, firestoreDocId: null
      };
      this.tabs.push(newTab);
      this.tabs.sort((a, b) => a.id - b.id);
      if (autoSave && this.isFirestoreReady) {
        const docRefId = await this.saveTabToFirestore(newTab);
        newTab.firestoreDocId = docRefId;
      }
    },

    toggleLoginStatus() {
        console.log("doing: his.isLoggedIn = false");
      if (this.isAnonymous) {
        console.log("->: if (this.isAnonymous)");
        this.showLoginModal = true;
        this.isLoggedIn = false;
      } else if (this.isLoggedIn) {
        try {
            console.log("->: if (this.isLoggedIn)");
            signOut(auth);
            console.log("after: signOut(auth)");
            alert("ログアウトしました。");    
            window.location.reload();       
          
        } catch (error) {
          console.error("ログアウトに失敗しました:", error);
          alert("ログアウト中にエラーが発生しました。");
        }
      }
    },
    
    handleLoginSuccess() {
      this.showLoginModal = false;
      //this.isLoggedIn = true;
    },

    async randomizeCurrentList() {
        if (!this.masterStudentList.length > 0) { 
            alert("マスター学生リストが空です。"); 
            return; 
        }
        
        const studentsToRandomize = this.masterStudentList.filter(student => student.isActive);
        
        if (studentsToRandomize.length === 0) {
            alert("アクティブな学生がマスター学生リストに見つかりませんでした。");
            return;
        }

        const { studentsByDesk, deskmates } = this.getHistoricalData(this.tabs);
        
        const availableDesks = Array.from({ length: 9 }, (_, i) => i + 1);
        const newStudentAssignments = [];
        const assignedStudentIds = new Set();
        this.shuffleArray(studentsToRandomize);
        for (const deskNumber of availableDesks) {
            const deskStudents = [];
            while (deskStudents.length < 2 && studentsToRandomize.length > 0) {
                const studentToPlace = this.findValidStudent(
                    studentsToRandomize, deskNumber, deskStudents, studentsByDesk, deskmates, assignedStudentIds
                );
                if (studentToPlace) {
                    deskStudents.push(studentToPlace);
                    assignedStudentIds.add(studentToPlace.id);
                    studentsToRandomize.splice(studentsToRandomize.findIndex(s => s.id === studentToPlace.id), 1);
                } else {
                    break;
                }
            }
            deskStudents.forEach(s => { if (!s.isEmpty) { newStudentAssignments.push({ studentId: s.id, deskNumber: deskNumber }); } });
        }
        
        const tempTabId = 'temp-randomized';
        const creationDate = new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
        const newTitle = `おすすめの順番`;
        const rehydratedStudents = newStudentAssignments.map(assignment => ({
            id: assignment.studentId, deskNumber: assignment.deskNumber, ...this.allStudentsMap.get(assignment.studentId)
        }));
        const { deskLayout, studentsWithDeskNumbers } = this.assignStudentsToDesks(rehydratedStudents);
        const newTempTab = {
            id: tempTabId, title: newTitle, creationDate: creationDate,
            studentAssignments: studentsWithDeskNumbers.map(s => ({ studentId: s.id, deskNumber: s.deskNumber })),
            deskLayout: deskLayout, firestoreDocId: null
        };
        
        // Create a local copy of the tabs array
        let updatedTabs = [...this.tabs];

        // Remove the old temporary tab if it exists
        const existingTempIndex = updatedTabs.findIndex(t => t.id === tempTabId);
        if (existingTempIndex !== -1) {
            updatedTabs.splice(existingTempIndex, 1);
        }
        
        // Push the new temporary tab
        updatedTabs.push(newTempTab);
        
        // Sort the new array
        updatedTabs.sort((a, b) => {
            if (a.id === 'temp-randomized') return 1;
            if (b.id === 'temp-randomized') return -1;
            const numA = this.convertKanjiToNumber(a.title);
            const numB = this.convertKanjiToNumber(b.title);
            return numA - numB;
        });

        // Update the component's state with the single, final array
        this.tabs = updatedTabs;
        this.activeTabId = tempTabId;
    },
    findValidStudent(allStudents, deskNumber, currentDeskmates, studentsByDesk, deskmates, assignedStudentIds) {
      const shuffledStudents = this.shuffleArray([...allStudents]);
      for (const student of shuffledStudents) {
        const studentId = student.id;
        if (student.isActive === false) { continue; }
        if (assignedStudentIds.has(studentId)) { continue; }
        const previousDesks = studentsByDesk.get(studentId) || new Set();
        if (previousDesks.has(String(deskNumber))) { continue; }
        let isValidDeskmate = true;
        const previousDeskmates = deskmates.get(studentId) || new Set();
        for (const deskmate of currentDeskmates) { if (previousDeskmates.has(deskmate.id)) { isValidDeskmate = false; break; } }
        if (isValidDeskmate) { return student; }
      }
      return null;
    },

    async saveAsNewTab() {
      if (!this.masterStudentList.length > 0) { alert("まず、マスター学生リストを保存してください。"); return; }
      const newTitle = `第${this.convertToKanji(this.tabs.length)}回`;
      if (this.tabs.some(tab => tab.title === newTitle)) {
        alert("このタイトルの教室は既に存在します。");
        return;
      }
      const studentsToSave = this.currentTab ? this.currentTab.deskLayout.flatMap(desk => desk.students.filter(s => !s.isEmpty)) : [...this.masterStudentList];
      await this.addTab(newTitle, studentsToSave, true);
      this.selectTab(this.tabs[this.tabs.length - 1].id);
    },

    selectTab(id) {
      this.activeTabId = id;
    },

    async saveTabToFirestore(tabData, docId = null) {
      if (!auth.currentUser || !this.isFirestoreReady) { console.warn("Firestore not ready or user not authenticated, cannot save."); return null; }
      const collectionRef = collection(db, `artifacts/${appId}/classrooms`);
      try {
        let docRef;
        if (docId) { docRef = doc(collectionRef, docId); } else { docRef = doc(collectionRef); tabData.id = docRef.id; }
        await setDoc(docRef, { title: tabData.title, creationDate: tabData.creationDate, studentAssignments: tabData.studentAssignments });
        console.log("Classroom layout document successfully written with ID: ", docRef.id);
        return docRef.id;
      } catch (e) { console.error("Error writing document to Firestore: ", e); return null; }
    },

    
    dateShortFormat(dateString) {
      const parts = dateString.split(/年|月|日/).filter(Boolean);
      const month = parts[1];
      const day = parts[2];
      const formattedDate = month.padStart(2, '0') + day.padStart(2, '0');
      return formattedDate;
    },

    getHistoricalData(tabsArray = this.tabs) {
      const studentsByDesk = new Map();
      const deskmates = new Map();

      tabsArray.forEach(tab => {
        tab.deskLayout.forEach(desk => {
          const studentIds = desk.students.map(s => s.id).filter(id => id !== 'empty-slot');
          
          studentIds.forEach(studentId => {
            if (!studentsByDesk.has(studentId)) {
              studentsByDesk.set(studentId, new Set());
            }
            studentsByDesk.get(studentId).add(desk.name);
          });

          if (studentIds.length === 2) {
            const [student1, student2] = studentIds;
            if (!deskmates.has(student1)) {
              deskmates.set(student1, new Set());
            }
            if (!deskmates.has(student2)) {
              deskmates.set(student2, new Set());
            }
            deskmates.get(student1).add(student2);
            deskmates.get(student2).add(student1);
          }
        });
      });

      return { studentsByDesk, deskmates };
    },
      
        // A helper method that was not there
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },

    convertToKanji(num){
      const kanjiMap = [
        '零', '一', '二', '三', '四', '五', '六', '七', '八', '九',
        '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九'
      ];
      if (num >= 0 && num < kanjiMap.length) {
        return kanjiMap[num];
      } else {
        return num.toString();
      }
    },
    
    convertKanjiToNumber(title) {
        const kanjiMap = {
          '零': 0, '一': 1, '二': 2, '三': 3, '四': 4, '五': 5,
          '六': 6, '七': 7, '八': 8, '九': 9, '十': 10,
          '十一': 11, '十二': 12, '十三': 13, '十四': 14,
          '十五': 15, '十六': 16, '十七': 17, '十八': 18, '十九': 19,
          '二十': 20, '二十一': 21, '二十二': 22, '二十三': 23, '二十四': 24,
          '二十五': 25, '二十六': 26, '二十七': 27, '二十八': 28, '二十九': 29,
          // 您可以根据需要继续添加更多数字
        };
        
        // 移除标题中的非数字部分，只留下汉字数字
        const kanjiNumberString = title.replace(/[^零一二三四五六七八九十]/g, '');
        
        // 使用 Object.keys 找到匹配的键，以处理像“十一”这样的多字符数字
        for (const key of Object.keys(kanjiMap)) {
          if (kanjiNumberString.startsWith(key)) {
            return kanjiMap[key];
          }
        }
        
        return 0;
    },

    downloadCurrentTab() {
      if (!this.currentTab || !this.currentTab.deskLayout) { alert("ダウンロードする教室のタブを選択してください。"); return; }
      const desks = this.currentTab.deskLayout;
      const totalDeskRows = 5;
      const getStudent = (deskNumber, studentIndex) => {
        const desk = desks.find(d => d.name === deskNumber.toString());
        return desk && desk.students.length > studentIndex ? desk.students[studentIndex] : null;
      };
      const formatStudentData = (student) => { if (!student) return ''; return `${student.name || ''}\n${student.hiragana || ''}`; };
      const masterData = Array(totalDeskRows + 2).fill().map(() => Array(7).fill(''));
      desks.forEach(desk => {
        const deskNumber = parseInt(desk.name);
        let newCol1 = -1, newCol2 = -1;
        let newRow = -1;
        const originalRowIndex = Math.floor((deskNumber - 1) / 2);
        newRow = totalDeskRows - 1 - originalRowIndex;
        if (deskNumber % 2 !== 0) {
          newCol1 = 5;
          newCol2 = 6;
        } else {
          newCol1 = 1;
          newCol2 = 2;
        }
        if (desk.students[0]) { masterData[newRow][newCol2] = formatStudentData(desk.students[0]); }
        if (desk.students[1]) { masterData[newRow][newCol1] = formatStudentData(desk.students[1]); }
      });
      masterData[totalDeskRows + 1][1] = 'K09 ' + this.dateShortFormat(this.currentTab.creationDate);
      masterData[totalDeskRows + 1][5] = '講師席';
      const worksheet = XLSX.utils.aoa_to_sheet(masterData);
      const cellStyle = {
        alignment: { vertical: 'center', horizontal: 'center', wrapText: true },
        border: { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } },
        font: { sz: 14 }
      };
      const codeCellStyle = { font: { sz: 16 } };
      worksheet['!pageSetup'] = { orientation: 'landscape' };
      worksheet['!cols'] = [ { wch: 4 }, { wch: 23 }, { wch: 23 }, { wch: 2 }, { wch: 2 }, { wch: 23 }, { wch: 23 } ];
      worksheet['!rows'] = Array(masterData.length).fill({ hpt: 70 });
      if (worksheet['!rows'][totalDeskRows + 1]) { worksheet['!rows'][totalDeskRows + 1] = { hpt: 20 }; }
      const studentCols = [1, 2, 5, 6];
      for (let r = 0; r < totalDeskRows; r++) {
        for (const c of studentCols) {
          const cellAddress = XLSX.utils.encode_cell({ r: r, c: c });
          if (worksheet[cellAddress] && worksheet[cellAddress].v) {
            if (!worksheet[cellAddress].s) worksheet[cellAddress].s = {};
            Object.assign(worksheet[cellAddress].s, cellStyle);
          }
        }
      }
      const codeCellAddress = XLSX.utils.encode_cell({ r: totalDeskRows + 1, c: 1 });
      if (worksheet[codeCellAddress]) {
        if (!worksheet[codeCellAddress].s) worksheet[codeCellAddress].s = {};
        Object.assign(worksheet[codeCellAddress].s, codeCellStyle);
      }
      const instructorCellAddress = XLSX.utils.encode_cell({ r: totalDeskRows + 1, c: 5 });
      if (worksheet[instructorCellAddress]) {
        if (!worksheet[instructorCellAddress].s) worksheet[instructorCellAddress].s = {};
        Object.assign(worksheet[instructorCellAddress].s, cellStyle);
      }
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, '座席表');
      const file_options = { pageSetup: { orientation: "landscape" } };
      const fileName = `${this.currentTab.title}_座席表.xlsx`;
      XLSX.writeFile(workbook, fileName, file_options);
    }
  }
};
</script>

<style scoped>
.classroom-manager {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: sans-serif;
  min-width: 320px;
  position: relative;
}
h1 {
  margin-bottom: 30px;
  color: #333;
}
.tabs-container {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  max-width: 100%;
}
.action-buttons {
  display: flex;
  gap: 10px;
}
.tabs-container button {
  padding: 8px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  flex-shrink: 0;
}
.tabs-container button:hover:not(.active-tab) {
  background-color: #e0e0e0;
}
.tabs-container button.active-tab {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
  font-weight: bold;
}
.tabs-container button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: #f8f9fa;
  color: #6c757d;
}
.tabs-container button.temporary-tab {
  background-color: #f0ad4e;
  border-color: #eea236;
  color: white;
}
.tabs-container button.temporary-tab.active-tab {
  background-color: #ec971f;
  border-color: #d58512;
  color: white;
}
.loading-message {
  margin-top: 50px;
  font-style: italic;
  color: #666;
}
.login-button-container {
  position: absolute;
  top: 20px;
  right: 20px;
}
.login-button-container svg {
  cursor: pointer;
  transition: transform 0.3s ease;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}
.login-button-container .logged-in {
  fill: #dc3545;
}
.login-button-container svg:not(.logged-in) {
  fill: #28a745;
}
</style>