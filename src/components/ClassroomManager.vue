<template>
  <div class="classroom-manager">
    <h1>教室の管理</h1>
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
        <button @click="randomizeCurrentList" >再編成する</button>
        <button @click="saveAsNewTab" :disabled="!currentTab">選択内容を保存</button> 
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
      <button @click="downloadCurrentTab" :disabled="!currentTab">Excelにダウンロード</button>
    </div>
    
  </div>
</template>

<script>
import MyClassroom from './MyClassroom.vue';
import { db, auth, authReadyPromise, appId } from '../firebase-init';
import { collection, doc, setDoc, onSnapshot, getDoc, getDocs } from 'firebase/firestore'; // Added getDocs
import * as XLSX from 'xlsx-js-style';

export default {
  name: 'ClassroomManager',
  components: {
    MyClassroom
  },
  data() {
    return {
      masterStudentList: [], // セットアップに使用される初期リスト / Initial list used for setup
      allStudentsMap: new Map(), // Firestoreの/studentsからロードされたIDをキーとする全生徒の詳細を格納する / Stores full student details keyed by ID, loaded from Firestore /students
      tabs: [], // { id, title, creationDate, studentAssignments, deskLayout, firestoreDocId }の配列 / Array of { id, title, creationDate, studentAssignments, deskLayout, firestoreDocId }
      activeTabId: null, // 現在選択されているタブのID / ID of the currently selected tab
      emptyStudentPlaceholder: { id: 'empty-slot', name: '', hiragana: '', gender_id: 0, isEmpty: true }, // 空の座席用のプレースホルダーオブジェクト / Placeholder object for an empty desk slot
      isFirestoreReady: false, // Firestoreが使用可能かを示すフラグ / Flag to indicate if Firestore is ready
      initialLoadComplete: false, // 初期データロードが完了したかを示すフラグ / Flag to indicate if the initial data load is complete
      masterListSaved: false, // マスターリストが最初に保存されたかどうかを示すフラグ / Flag to indicate if master list has been saved initially
      // 以下のリストは初期データとして使用される / The following lists are used for initial data
      c1: Object,
      c2: Object,
      c3: Object,
      c4: Object
    };
  },
  async created() {
    // Firebase認証が準備されるのを待つ / Wait for Firebase authentication to be ready
    await authReadyPromise;
    this.isFirestoreReady = true;

    // 最初に、全生徒のマスターリストをロードする / First, load the master list of all students
    await this.loadMasterStudentList();

    // マスターリストがロードされなかった場合、デフォルトを初期化して保存する / If no master student list was loaded, initialize a default one
    if (this.masterStudentList.length === 0) {
      console.log("No master student list found, initializing defaults.");
      this.initializeDefaultMasterStudentList();
    } else {
      this.masterStudentList.forEach(student => {
        this.allStudentsMap.set(student.id, student);
      });
      this.masterListSaved = true;
    }
    
    // 次に、既存の教室タブをロードする / Then, load existing classroom tabs
    await this.loadTabsFromFirestore();
    
    this.initialLoadComplete = true;
    if (this.tabs.length > 0 && !this.activeTabId) {
      this.activeTabId = this.tabs[0].id;
    }
  },
  computed: {
    // 現在アクティブなタブの完全なデータオブジェクトを返す / Returns the full data object for the currently active tab
    currentTab() {
      return this.tabs.find(tab => tab.id === this.activeTabId) || null;
    },
    // 現在アクティブなタブの座席レイアウト配列を返す / Returns the desk layout array of the active tab
    currentDeskLayout() {
      return this.currentTab ? this.currentTab.deskLayout : [];
    }
  },
  methods: {
    /**
     * デフォルトのマスター生徒リストを初期化する。 / Initializes the default master student list.
     * `isActive`プロパティを追加しました。 / Added `isActive` property.
     */
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

            // c1, c2, c3リストも初期データとして定義されている / c1, c2, and c3 lists are also defined as initial data
      this.c1 = {
        creationDate: "2025年5月22日",
        studentAssignments: [        
        { studentId: 16, deskNumber: 1 },
        { studentId: 3, deskNumber: 1 },
        { studentId: 15, deskNumber: 2 },
        { studentId: 7, deskNumber: 2 },
        { studentId: 10, deskNumber: 3 },
        { studentId: 5, deskNumber: 3 },
        { studentId: 14, deskNumber: 4 },
        { studentId: 11, deskNumber: 4 },
        { studentId: 19, deskNumber: 5 },
        { studentId: 18, deskNumber: 5 },
        { studentId: 17, deskNumber: 6 },
        { studentId: 6, deskNumber: 6 },
        { studentId: 8, deskNumber: 7 },
        { studentId: 9, deskNumber: 7 },
        { studentId: 2, deskNumber: 8 },
        { studentId: 4, deskNumber: 8 },
        { studentId: 13, deskNumber: 9 },
        { studentId: 12, deskNumber: 9 }
        ],
        title: "一第"
      };

        // { id: 16, name: "水上", hiragana: "みずかみ", gender_id: 2 },
        // { id: 3, name: "大塚", hiragana: "おおつか", gender_id: 1 },
        // { id: 15, name: "松川", hiragana: "まつかわ", gender_id: 1 },
        // { id: 7, name: "川田", hiragana: "かわた", gender_id: 2 },
        // { id: 10, name: "塩田", hiragana: "しおた", gender_id: 1 },
        // { id: 5, name: "河井", hiragana: "かわい", gender_id: 1 },
        // { id: 14, name: "松井", hiragana: "まつい", gender_id: 1 }, 
        // { id: 11, name: "新岡", hiragana: "にいおか", gender_id: 1 },
        // { id: 19, name: "山田", hiragana: "やまだ", gender_id: 1 },
        // { id: 18, name: "山角", hiragana: "やまかど", gender_id: 1 },
        // { id: 17, name: "宮澤", hiragana: "みやざわ", gender_id: 1 }, 
        // { id: 6, name: "川口", hiragana: "かわぐち", gender_id: 2 },
        // { id: 8, name: "MOTTA", hiragana: "もった", gender_id: 1 },
        // { id: 9, name: "里舘", hiragana: "さとだて", gender_id: 1 },
        // { id: 2, name: "熱田", hiragana: "あつた", gender_id: 2 },
        // { id: 4, name: "岡田", hiragana: "おかだ", gender_id: 2 },
        // { id: 13, name: "堀口", hiragana: "ほりぐち", gender_id: 2 },  
        // { id: 12, name: "樋口", hiragana: "ひぐち", gender_id: 2 }
      
      this.c2 = {
        creationDate: "2025年7月7日",
        studentAssignments: [
          { studentId: 13, deskNumber: 1 },
          { studentId: 10, deskNumber: 1 },
          { studentId: 8, deskNumber: 2 },
          { studentId: 6, deskNumber: 2 },
          { studentId: 11, deskNumber: 3 },
          { studentId: 19, deskNumber: 3 },
          { studentId: 9, deskNumber: 4 },
          { studentId: 18, deskNumber: 4 },
          { studentId: 3, deskNumber: 5 },
          { studentId: 17, deskNumber: 5 },
          { studentId: 12, deskNumber: 6 },
          { studentId: 2, deskNumber: 6 },
          { studentId: 4, deskNumber: 7 },
          { studentId: 5, deskNumber: 7 },
          { studentId: 15, deskNumber: 8 },
          { studentId: 14, deskNumber: 8 },
          { studentId: 16, deskNumber: 9 },
          { studentId: 7, deskNumber: 9 }
        ],
        title: "二第"
      };
      // this.c2List = [
      //   { id: 13, name: "堀口", hiragana: "ほりぐち", gender_id: 2 },
      //   { id: 10, name: "塩田", hiragana: "しおた", gender_id: 1 },
      //   { id: 8, name: "MOTTA", hiragana: "もった", gender_id: 1 },
      //   { id: 6, name: "川口", hiragana: "かわぐち", gender_id: 2 },
      //   { id: 11, name: "新岡", hiragana: "にいおか", gender_id: 1 },
      //   { id: 19, name: "山田", hiragana: "やまだ", gender_id: 1 },
      //   { id: 9, name: "里舘", hiragana: "さとだて", gender_id: 1 },
      //   { id: 18, name: "山角", hiragana: "やまかど", gender_id: 1 },
      //   { id: 3, name: "大塚", hiragana: "おおつか", gender_id: 1 },
      //   { id: 17, name: "宮澤", hiragana: "みやざわ", gender_id: 1 },
      //   { id: 12, name: "樋口", hiragana: "ひぐち", gender_id: 2 }, 
      //   { id: 2, name: "熱田", hiragana: "あつた", gender_id: 2 }, 
      //   { id: 4, name: "岡田", hiragana: "おかだ", gender_id: 2 },
      //   { id: 5, name: "河井", hiragana: "かわい", gender_id: 1 },
      //   { id: 15, name: "松川", hiragana: "まつかわ", gender_id: 1 },
      //   { id: 14, name: "松井", hiragana: "まつい", gender_id: 1 },
      //   { id: 16, name: "水上", hiragana: "みずかみ", gender_id: 2 },
      //   { id: 7, name: "川田", hiragana: "かわた", gender_id: 2 }
      // ];

      this.c3 = {
        creationDate: "2025年7月30日",
        studentAssignments: [
          { studentId: 4, deskNumber: 1 },
          { studentId: 8, deskNumber: 1 },
          { studentId: 5, deskNumber: 2 },
          { studentId: 15, deskNumber: 2 },
          { studentId: 17, deskNumber: 3 },
          { studentId: 2, deskNumber: 3 },
          { studentId: 18, deskNumber: 4 },
          { studentId: 10, deskNumber: 4 },
          { studentId: 7, deskNumber: 5 },
          { studentId: 12, deskNumber: 5 },
          { studentId: 11, deskNumber: 6 },
          { studentId: 9, deskNumber: 6 },
          { studentId: 6, deskNumber: 7 },
          { studentId: 14, deskNumber: 7 },
          { studentId: 3, deskNumber: 8 },
          { studentId: 19, deskNumber: 8 },
          { studentId: 16, deskNumber: 9 },
        ],
        title: "三第"
      };

      // this.c3List = [
      //   { id: 4, name: "岡田", hiragana: "おかだ", gender_id: 2 },
      //   { id: 8, name: "MOTTA", hiragana: "もった", gender_id: 1 },  
      //   { id: 5, name: "河井", hiragana: "かわい", gender_id: 1 },
      //   { id: 15, name: "松川", hiragana: "まつかわ", gender_id: 1 },  
      //   { id: 17, name: "宮澤", hiragana: "みやざわ", gender_id: 1 },
      //   { id: 2, name: "熱田", hiragana: "あつた", gender_id: 2 },
      //   { id: 18, name: "山角", hiragana: "やまかど", gender_id: 1 },
      //   { id: 10, name: "塩田", hiragana: "しおた", gender_id: 1 },
      //   { id: 7, name: "川田", hiragana: "かわた", gender_id: 2 },
      //   { id: 12, name: "樋口", hiragana: "ひぐち", gender_id: 2 },
      //   { id: 11, name: "新岡", hiragana: "にいおか", gender_id: 1 },
      //   { id: 9, name: "里舘", hiragana: "さとだて", gender_id: 1 },

      //   { id: 6, name: "川口", hiragana: "かわぐち", gender_id: 2 },
      //   { id: 14, name: "松井", hiragana: "まつい", gender_id: 1 },
      //   { id: 3, name: "大塚", hiragana: "おおつか", gender_id: 1 },
      //   { id: 19, name: "山田", hiragana: "やまだ", gender_id: 1 },
      //   { id: 16, name: "水上", hiragana: "みずかみ", gender_id: 2 }
      // ];

      this.c4 = {
        creationDate: "2025年8月22日",
        studentAssignments: [
          { studentId: 12, deskNumber: 1 },
          { studentId: 17, deskNumber: 1 },
          { studentId: 19, deskNumber: 2 },
          { studentId: 10, deskNumber: 2 },
          { studentId: 4, deskNumber: 3 },
          { studentId: 18, deskNumber: 3 },
          { studentId: 16, deskNumber: 4 },
          { studentId: 2, deskNumber: 4 },
          { studentId: 11, deskNumber: 5 },
          { studentId: 5, deskNumber: 5 },
          { studentId: 14, deskNumber: 6 },
          { studentId: 8, deskNumber: 6 },
          { studentId: 15, deskNumber: 7 },
          { studentId: 3, deskNumber: 7 },
          { studentId: 7, deskNumber: 8 },
          { studentId: 6, deskNumber: 8 },
          { studentId: 9, deskNumber: 9 },
        ],
        title: "四第"
      };

      // this.c4List = [
      //   { id: 12, name: "樋口", hiragana: "ひぐち", gender_id: 2 },
      //   { id: 17, name: "宮澤", hiragana: "みやざわ", gender_id: 1 },
      //   { id: 19, name: "山田", hiragana: "やまだ", gender_id: 1 },
      //   { id: 10, name: "塩田", hiragana: "しおた", gender_id: 1 },
      //   { id: 4, name: "岡田", hiragana: "おかだ", gender_id: 2 },
      //   { id: 18, name: "山角", hiragana: "やまかど", gender_id: 1 },
      //   { id: 16, name: "水上", hiragana: "みずかみ", gender_id: 2 },
      //   { id: 2, name: "熱田", hiragana: "あつた", gender_id: 2 },
      //   { id: 11, name: "新岡", hiragana: "にいおか", gender_id: 1 },
      //   { id: 5, name: "河井", hiragana: "かわい", gender_id: 1 },
      //   { id: 14, name: "松井", hiragana: "まつい", gender_id: 1 },
      //   { id: 8, name: "MOTTA", hiragana: "もった", gender_id: 1 },        
      //   { id: 15, name: "松川", hiragana: "まつかわ", gender_id: 1 },
      //   { id: 3, name: "大塚", hiragana: "おおつか", gender_id: 1 },
      //   { id: 7, name: "川田", hiragana: "かわた", gender_id: 2 },
      //   { id: 6, name: "川口", hiragana: "かわぐち", gender_id: 2 },        
      //   { id: 9, name: "里舘", hiragana: "さとだて", gender_id: 1 }
      // ];

      this.masterStudentList.forEach(student => {
        this.allStudentsMap.set(student.id, student);
      });
    },

    /**
     * Firestoreに初期のmasterStudentListと事前定義されたレイアウトを永続化する。 / Persists the initial master student list and predefined layouts to Firestore.
     * `isActive`プロパティもFirestoreに保存されます。 / The `isActive` property is now also saved to Firestore.
     */
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
        for (const student of this.masterStudentList) {
          await setDoc(doc(studentsCollectionRef, String(student.id)), {
            name: student.name,
            hiragana: student.hiragana,
            gender_id: student.gender_id,
            isActive: student.isActive // 新しいプロパティを追加しました / Added the new property
          });
        }
        console.log("Master student list successfully saved to /students collection.");

        // `classrooms`コレクションが空の場合、cListを保存する / If the `classrooms` collection is empty, save the cLists
        const classroomsCollectionRef = collection(db, `artifacts/${appId}/classrooms`);
        const classroomsSnapshot = await getDocs(classroomsCollectionRef);
        
        if (classroomsSnapshot.empty) {
            console.log("No classroom tabs found. Creating initial layouts from cLists.");
            
            const initialLists = [
                { title: this.c1.title, studentAssignments: this.c1.studentAssignments, creationDate:this.c1.creationDate },
                { title: this.c2.title, studentAssignments: this.c2.studentAssignments, creationDate:this.c2.creationDate },
                { title: this.c3.title, studentAssignments: this.c3.studentAssignments, creationDate:this.c3.creationDate },
                { title: this.c4.title, studentAssignments: this.c4.studentAssignments, creationDate:this.c4.creationDate }
            ];

            for (const { title, list } of initialLists) {
                await this.addTab(title, list, true);
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

    /**
     * Firestoreの/studentsコレクションからマスター生徒リストをロードする。 / Loads the master student list from Firestore's /students collection.
     */
    async loadMasterStudentList() {
      if (!auth.currentUser || !this.isFirestoreReady) {
        console.warn("Firestore not ready or user not authenticated, cannot load master list.");
        return;
      }
      const studentsCollectionRef = collection(db, `artifacts/${appId}/students`);

      try {
        onSnapshot(studentsCollectionRef, (querySnapshot) => {
          const loadedStudents = [];
          const tempStudentMap = new Map();
          querySnapshot.forEach((doc) => {
            const studentData = { id: parseInt(doc.id), ...doc.data() };
            loadedStudents.push(studentData);
            tempStudentMap.set(studentData.id, studentData);
          });
          this.masterStudentList = loadedStudents;
          this.allStudentsMap = tempStudentMap;
          console.log("Master student list loaded from Firestore.");
          if (loadedStudents.length > 0) {
            this.masterListSaved = true;
          }
        }, (error) => {
          console.error("Error listening to master student list from Firestore:", error);
        });
      } catch (e) {
        console.error("Error setting up Firestore listener:", e);
      }
    },

    /**
     * Fisher-Yatesアルゴリズムを使用して配列をシャッフルする。 / Shuffles an array using the Fisher-Yates algorithm.
     * @param {Array} array - シャッフルする配列。 / The array to shuffle.
     * @returns {Array} シャッフルされた配列。 / The shuffled array.
     */
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },

    /**
     * 生徒を固定された数の座席（9）に割り当て、空のスロットを埋める。 / Assigns students to a fixed number of desks (9), padding with empty slots.
     * このメソッドは、事前に座席番号が割り当てられている可能性のある生徒のリストを期待する。 / This method expects a list of students with potentially pre-assigned deskNumbers.
     * @param {Array} studentList - 生徒オブジェクトのリスト（deskNumberがある場合とない場合）。 / The list of student objects (with or without deskNumber).
     * @returns {Object} deskLayoutと更新されたstudentsWithDeskNumbersを含むオブジェクト。 / An object containing deskLayout and updated studentsWithDeskNumbers.
     */
    assignStudentsToDesks(studentList) {
      const numDesks = 9;
      const desks = Array.from({ length: numDesks }, (_, i) => ({
        id: `desk-${i + 1}`,
        name: `${i + 1}`,
        students: []
      }));

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

      const studentsWithDeskNumbers = desks.flatMap(desk => 
        desk.students.filter(s => !s.isEmpty)
      );

      return {
        deskLayout: desks,
        studentsWithDeskNumbers: studentsWithDeskNumbers
      };
    },

    /**
     * 指定された属性を持つ新しいタブを追加し、その座席レイアウトを生成する。 / Adds a new tab with specified attributes and generates its desk layout.
     * オプションで、すぐにFirestoreに保存する。 / Optionally saves to Firestore immediately.
     * @param {string} title - 新しいタブのタイトル。 / The title of the new tab.
     * @param {Array} studentsArray - このレイアウトの生徒の順序付きリスト（完全な生徒オブジェクト）。 / The ordered list of students for this layout (full student objects).
     * @param {boolean} autoSave - すぐにFirestoreに保存するかどうか。 / Whether to save to Firestore immediately.
     */
    async addTab(title, studentsArray, autoSave = false) {
      const newTabId = this.tabs.length > 0 ? Math.max(...this.tabs.map(t => t.id)) + 1 : 1;
      const creationDate = new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
      
      const { deskLayout, studentsWithDeskNumbers } = this.assignStudentsToDesks(studentsArray);

      const studentAssignments = studentsWithDeskNumbers.map(s => ({
        studentId: s.id,
        deskNumber: s.deskNumber
      }));

      const newTab = {
        id: newTabId,
        title: title,
        creationDate: creationDate,
        studentAssignments: studentAssignments,
        deskLayout: deskLayout,
        firestoreDocId: null
      };

      this.tabs.push(newTab);
      this.tabs.sort((a, b) => a.id - b.id);
      if (autoSave && this.isFirestoreReady) {
        const docRefId = await this.saveTabToFirestore(newTab);
        newTab.firestoreDocId = docRefId;
      }
    },

    async randomizeCurrentList() {
      if (!this.currentTab) {
        console.warn("No active tab selected. Cannot randomize.");
        return;
      }

      const studentsToRandomize = this.currentTab.deskLayout.flatMap(desk => 
        desk.students.filter(s => !s.isEmpty)
      );

      const historicalTabs = this.tabs.filter(tab => tab.id !== this.currentTab.id);
      const { studentsByDesk, deskmates } = this.getHistoricalData(historicalTabs);

      const availableDesks = Array.from({ length: 9 }, (_, i) => i + 1);
      const newStudentAssignments = [];
      const assignedStudentIds = new Set();
      
      this.shuffleArray(studentsToRandomize);

      for (const deskNumber of availableDesks) {
        const deskStudents = [];
        while (deskStudents.length < 2 && studentsToRandomize.length > 0) {
          const studentToPlace = this.findValidStudent(
            studentsToRandomize, 
            deskNumber, 
            deskStudents, 
            studentsByDesk, 
            deskmates, 
            assignedStudentIds
          );
          
          if (studentToPlace) {
            deskStudents.push(studentToPlace);
            assignedStudentIds.add(studentToPlace.id);
            studentsToRandomize.splice(studentsToRandomize.findIndex(s => s.id === studentToPlace.id), 1);
          } else {
            break;
          }
        }
      
        deskStudents.forEach(s => {
          if (!s.isEmpty) {
            newStudentAssignments.push({ studentId: s.id, deskNumber: deskNumber });
          }
        });
      }

      const tempTabId = 'temp-randomized';
      const creationDate = new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
      const newTitle = `おすすめの順番`;

      const rehydratedStudents = newStudentAssignments.map(assignment => ({
        id: assignment.studentId,
        deskNumber: assignment.deskNumber,
        ...this.allStudentsMap.get(assignment.studentId)
      }));
      
      const { deskLayout, studentsWithDeskNumbers } = this.assignStudentsToDesks(rehydratedStudents);
      
      const newTempTab = {
        id: tempTabId,
        title: newTitle,
        creationDate: creationDate,
        studentAssignments: studentsWithDeskNumbers.map(s => ({ studentId: s.id, deskNumber: s.deskNumber })),
        deskLayout: deskLayout,
        firestoreDocId: null
      };

      const existingTempIndex = this.tabs.findIndex(t => t.id === tempTabId);
      if (existingTempIndex !== -1) {
        this.tabs.splice(existingTempIndex, 1);
      }
      
      this.tabs.push(newTempTab);

      this.tabs.sort((a, b) => {
        if (a.id === tempTabId) return 1;
        if (b.id === tempTabId) return -1;
        return a.id - b.id;
      });

      this.activeTabId = tempTabId;
    },

    /**
     * 履歴的な配置と同級生を考慮して、特定の座席に適した生徒を見つける。 / Finds a valid student for a given desk, considering historical placements and deskmates.
     */
    findValidStudent(allStudents, deskNumber, currentDeskmates, studentsByDesk, deskmates, assignedStudentIds) {
      const shuffledStudents = this.shuffleArray([...allStudents]);

      for (const student of shuffledStudents) {
        const studentId = student.id;

        // 生徒がアクティブでない場合はスキップする / Skip student if they are not active
        if (student.isActive === false) {
          continue;
        }
        
        if (assignedStudentIds.has(studentId)) {
          continue;
        }
        
        const previousDesks = studentsByDesk.get(studentId) || new Set();
        if (previousDesks.has(String(deskNumber))) {
          continue;
        }
        
        let isValidDeskmate = true;
        const previousDeskmates = deskmates.get(studentId) || new Set();
        for (const deskmate of currentDeskmates) {
          if (previousDeskmates.has(deskmate.id)) {
            isValidDeskmate = false;
            break;
          }
        }
        
        if (isValidDeskmate) {
          return student;
        }
      }
      
      return null;
    },

    /**
     * 現在アクティブなタブのレイアウトを新しいタブとして保存する。 / Saves the current active tab's layout as a new tab.
     */
    async saveAsNewTab() {
      if (!this.masterStudentList.length > 0) {
        alert("まず、マスター学生リストを保存してください。");
        return;
      }
      
      const studentsToSave = this.currentTab 
        ? this.currentTab.deskLayout.flatMap(desk => desk.students.filter(s => !s.isEmpty))
        : [...this.masterStudentList];

      const newTitle = `${this.convertToKanji(this.tabs.length)} 第`;

      await this.addTab(newTitle, studentsToSave, true);
      this.selectTab(this.tabs[this.tabs.length - 1].id);
    },

    /**
     * IDでタブを選択する。 / Selects a tab by its ID.
     * @param {number} id - 選択するタブのID。 / The ID of the tab to select.
     */
    selectTab(id) {
      this.activeTabId = id;
    },

    /**
     * タブのデータをFirestoreに保存する。 / Saves a tab's data to Firestore.
     * @param {Object} tabData - 保存するタブオブジェクト。 / The tab object to save.
     * @param {string} [docId] - オプションのFirestoreドキュメントID。指定しない場合は新しく生成される。 / Optional Firestore document ID. If not provided, a new one is generated.
     * @returns {string} FirestoreドキュメントID。 / The Firestore document ID.
     */
    async saveTabToFirestore(tabData, docId = null) {
      if (!auth.currentUser || !this.isFirestoreReady) { 
        console.warn("Firestore not ready or user not authenticated, cannot save.");
        return null;
      }
      const collectionRef = collection(db, `artifacts/${appId}/classrooms`);

      try {
        let docRef;
        if (docId) {
          docRef = doc(collectionRef, docId);
        } else {
          docRef = doc(collectionRef); 
          tabData.id = docRef.id; 
        }

        await setDoc(docRef, {
          title: tabData.title,
          creationDate: tabData.creationDate,
          studentAssignments: tabData.studentAssignments
        });
        console.log("Classroom layout document successfully written with ID: ", docRef.id);
        return docRef.id;
      } catch (e) {
        console.error("Error writing document to Firestore: ", e);
        return null;
      }
    },

    /**
     * Firestoreからタブをリアルタイムでロードし、生徒データを再水和する。 / Loads tabs from Firestore in real-time and rehydrates student data.
     */
    async loadTabsFromFirestore() {
      if (!auth.currentUser || !this.isFirestoreReady) { 
        console.warn("Firestore not ready or user not authenticated, cannot load tabs.");
        return;
      }
      const collectionRef = collection(db, `artifacts/${appId}/classrooms`);

      try {
        onSnapshot(collectionRef, async (querySnapshot) => {
          const loadedTabsData = [];
          const studentIdsToFetch = new Set();
          
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const assignments = Array.isArray(data.studentAssignments) ? data.studentAssignments : [];

            assignments.forEach(assignment => {
              if (assignment.studentId) {
                studentIdsToFetch.add(assignment.studentId);
              }
            });

            loadedTabsData.push({
              id: doc.id,
              title: data.title,
              creationDate: data.creationDate,
              studentAssignments: assignments,
              deskLayout: [],
              firestoreDocId: doc.id
            });
          });

          const fetchedStudentsMap = new Map();
          if (studentIdsToFetch.size > 0) {
            const studentDocPromises = Array.from(studentIdsToFetch).map(id => 
              getDoc(doc(db, `artifacts/${appId}/students`, String(id)))
            );
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
              if (fullStudentData) {
                return {
                  ...fullStudentData,
                  deskNumber: assignment.deskNumber
                };
              }
              return { ...this.emptyStudentPlaceholder, id: `missing-student-${assignment.studentId}` };
            }).filter(s => !s.isEmpty);
            
            const { deskLayout, studentsWithDeskNumbers } = this.assignStudentsToDesks(rehydratedStudents);
            
            return {
              ...tab,
              studentAssignments: studentsWithDeskNumbers.map(s => ({ studentId: s.id, deskNumber: s.deskNumber })),
              deskLayout: deskLayout
            };
          });

          this.tabs.sort((a, b) => a.id - b.id);

          if (this.initialLoadComplete && this.tabs.length > 0 && !this.tabs.some(t => t.id === this.activeTabId)) {
            this.activeTabId = this.tabs[0].id;
          } else if (this.tabs.length > 0 && !this.activeTabId) {
            this.activeTabId = this.tabs[0].id;
          } else if (this.tabs.length === 0) {
            this.activeTabId = null;
          }
          console.log("Tabs loaded/updated from Firestore.");
        }, (error) => {
          console.error("Error listening to tabs from Firestore:", error);
        });
      } catch (e) {
        console.error("Error setting up Firestore listener:", e);
      }
    },

    /**
     * タブが1つもないかを確認する。ない場合は、初期の「基本順序」タブを作成する。 / Checks if there are any tabs. If not, creates the initial "Current State" tab.
     */
    addInitialTabs() {
      if (this.tabs.length === 0 && this.masterStudentList.length > 0) {
        console.log("No classroom tabs found. Creating initial layouts.");
        
        this.addTab('基本順序', [...this.masterStudentList], true); // 自動保存する / true for auto-save
        
      }
    },

    /**
     * 既存のタブから以前の座席とペアの割り当てをすべて取得する。 / Retrieves all previous desk and deskmate assignments from existing tabs.
     * @returns {Object} 2つのMapを含むオブジェクト: / An object containing two Maps:
     * - studentsByDesk: { studentId: Set<deskNumber> }
     * - deskmates: { studentId: Set<deskmateId> }
     */
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
    
    dateShortFormat(dateString) {
      // Split the string by '年', '月', and '日' to get the numeric parts.
      const parts = dateString.split(/年|月|日/).filter(Boolean);

      // Extract the month and day parts.
      const month = parts[1];
      const day = parts[2];

      // Combine the two-digit month and day.
      const formattedDate = month.padStart(2, '0') + day.padStart(2, '0');

      return formattedDate;
    },

    /**
     * 現在のタブの座席レイアウトをExcelファイルとしてダウンロードします。
     * このメソッドは、教師の視点からのレイアウト（提供された画像）を再現します。
     *
     * @English
     * Downloads the current tab's seating layout as an Excel file.
     * This method replicates the teacher's perspective layout by
     * reordering desks and students.
     */
    downloadCurrentTab() {
      if (!this.currentTab || !this.currentTab.deskLayout) {
        alert("ダウンロードする教室のタブを選択してください。");
        return;
      }

      const desks = this.currentTab.deskLayout;
      const totalDeskRows = 5;

      const getStudent = (deskNumber, studentIndex) => {
        const desk = desks.find(d => d.name === deskNumber.toString());
        return desk && desk.students.length > studentIndex ? desk.students[studentIndex] : null;
      };

      const formatStudentData = (student) => {
        if (!student) return '';
        return `${student.name || ''}\n${student.hiragana || ''}`;
      };

      // Create a master data array with the correct dimensions and fill it with empty strings
      // 新しい空白の列のために、7列で配列を初期化します
      // Initialize array with 7 columns for the new blank column
      const masterData = Array(totalDeskRows + 2).fill().map(() => Array(7).fill(''));

      desks.forEach(desk => {
        const deskNumber = parseInt(desk.name);
        let newCol1 = -1, newCol2 = -1;
        let newRow = -1;

        const originalRowIndex = Math.floor((deskNumber - 1) / 2);
        newRow = totalDeskRows - 1 - originalRowIndex;

        if (deskNumber % 2 !== 0) {
          // 右ブロックの列を1つ右にずらします
          // Shift right block columns one to the right
          newCol1 = 5; // ExcelのF列 (以前のE列)
          newCol2 = 6; // ExcelのG列 (以前のF列)
        } else {
          // 左ブロックの列を1つ右にずらします
          // Shift left block columns one to the right
          newCol1 = 1; // ExcelのB列 (以前のA列)
          newCol2 = 2; // ExcelのC列 (以前のB列)
        }

        if (desk.students[0]) {
          masterData[newRow][newCol2] = formatStudentData(desk.students[0]);
        }
        if (desk.students[1]) {
          masterData[newRow][newCol1] = formatStudentData(desk.students[1]);
        }
      });

      // ラベルの列を右に1つずらします
      // Shift label columns one to the right
      masterData[totalDeskRows + 1][1] = 'K09 ' + this.dateShortFormat(this.currentTab.creationDate);
      masterData[totalDeskRows + 1][5] = '講師席';

      const worksheet = XLSX.utils.aoa_to_sheet(masterData);

      const cellStyle = {
        alignment: { vertical: 'center', horizontal: 'center', wrapText: true },
        border: {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        },
        font: {
          sz: 14
        }
      };

      // K09コード専用のカスタムスタイル（フォントサイズ16）。
      // Custom style for the K09 code cell (font size 16).
      const codeCellStyle = {
          font: {          
            sz: 16 // フォントサイズを16に増やす
        }
      };

      worksheet['!pageSetup'] = { orientation: 'landscape' };

      // 新しい空白のA列の幅を追加し、他の列のインデックスを更新します
      // Add width for the new blank column A and update other column indices
      worksheet['!cols'] = [
        { wch: 4 }, // New blank column A
        { wch: 23 }, { wch: 23 }, // B, C - Left block
        { wch: 2 }, { wch: 2 }, // D, E - Spacer
        { wch: 23 }, { wch: 23 } // F, G - Right block
      ];
      
      // Set row heights for multi-line cells
      // 複数行のセルのために行の高さを設定
      worksheet['!rows'] = Array(masterData.length).fill({ hpt: 70 });
      
      // Reduce the height of the instructor row at the bottom
      // 下部の講師席の行の高さを減らす
      if (worksheet['!rows'][totalDeskRows + 1]) {
          worksheet['!rows'][totalDeskRows + 1] = { hpt: 20 };
      }

      // ループの列インデックスを更新します
      // Update the column indices for the loop
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

      // B7セルのアドレスを取得し、カスタムスタイルを適用します。
      // Get the cell address for B7 and apply the custom style.
      const codeCellAddress = XLSX.utils.encode_cell({ r: totalDeskRows + 1, c: 1 });
      if (worksheet[codeCellAddress]) {
        if (!worksheet[codeCellAddress].s) worksheet[codeCellAddress].s = {};
        Object.assign(worksheet[codeCellAddress].s, codeCellStyle);
      }


      // // 講師席のセルのインデックスを更新します
      // // Update the index for the instructor cell
      const instructorCellAddress = XLSX.utils.encode_cell({ r: totalDeskRows + 1, c: 5 });
      if (worksheet[instructorCellAddress]) {
        if (!worksheet[instructorCellAddress].s) worksheet[instructorCellAddress].s = {};
        Object.assign(worksheet[instructorCellAddress].s, cellStyle);
      }

      // マージするセルのインデックスを更新します
      // Update merge indices to new position
      // if (!worksheet['!merges']) worksheet['!merges'] = [];
      // worksheet['!merges'].push({ s: { r: totalDeskRows + 1, c: 5 }, e: { r: totalDeskRows + 1, c: 6 } });

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, '座席表');

      const file_options = {
        pageSetup: {
          orientation: "landscape"
        }
      };

      const fileName = `${this.currentTab.title}_座席表.xlsx`;
      XLSX.writeFile(workbook, fileName, file_options);
    }

   
  }
};
</script>

<style scoped>
/* スタイルは変更されていないため、コメントは不要です。 / Styles have not been changed, so comments are not necessary. */
.classroom-manager {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: sans-serif;
  min-width: 320px;
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
  background-color: #f0ad4e; /* Orange background */
  border-color: #eea236;
  color: white;
}

.tabs-container button.temporary-tab.active-tab {
  background-color: #ec971f; /* A darker shade for the active state */
  border-color: #d58512;
  color: white;
}

.loading-message {
  margin-top: 50px;
  font-style: italic;
  color: #666;
}
</style>