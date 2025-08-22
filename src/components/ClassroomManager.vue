<template>
  <div class="classroom-manager">
    <h1>教室の管理</h1>
    <div class="tabs-container">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="selectTab(tab.id)"
        :class="{ 'active-tab': tab.id === activeTabId }"
        :title="tab.title + ' (Created: ' + tab.creationDate + ')'"
      >
        {{ tab.title }}
      </button>
      <button @click="randomizeCurrentList" >再編成する</button>
      <button @click="saveAsNewTab" :disabled="!currentTab">新しい組織を決定する</button>
    </div>

    <MyClassroom
      :desks="currentDeskLayout"
      :classroomTitle="currentTab ? currentTab.title : '教室のレイアウト'"
      v-if="currentDeskLayout.length > 0 && initialLoadComplete"
    />
    <div v-else class="loading-message">
      教室のレイアウトを読み込み中．．．
    </div>
  </div>
</template>

<script>
import MyClassroom from './MyClassroom.vue';
import { db, auth, authReadyPromise, appId } from '../firebase-init';
import { collection, doc, setDoc, onSnapshot, getDoc } from 'firebase/firestore'; // Added getDoc

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
      c1List: [],
      c2List: [],
      c3List: []
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
     * このデータは、後でFirestoreに永続化される。 / This data will then be persisted to Firestore in a separate collection.
     */
    initializeDefaultMasterStudentList() {
      this.masterStudentList = [
        { id: 2, name: "熱田", hiragana: "あつた", gender_id: 2 },
        { id: 3, name: "大塚", hiragana: "おおつか", gender_id: 1 },
        { id: 4, name: "岡田", hiragana: "おかだ", gender_id: 2 },
        { id: 5, name: "河井", hiragana: "かわい", gender_id: 1 },
        { id: 6, name: "川口", hiragana: "かわぐち", gender_id: 2 },
        { id: 7, name: "川田", hiragana: "かわた", gender_id: 2 },
        { id: 8, name: "MOTTA", hiragana: "もった", gender_id: 1 },
        { id: 9, name: "里舘", hiragana: "さとだて", gender_id: 1 },
        { id: 10, name: "塩田", hiragana: "しおた", gender_id: 1 },
        { id: 11, name: "新岡", hiragana: "にいおか", gender_id: 1 },
        { id: 12, name: "樋口", hiragana: "ひぐち", gender_id: 2 },
        { id: 13, name: "堀口", hiragana: "ほりぐち", gender_id: 2 },
        { id: 14, name: "松井", hiragana: "まつい", gender_id: 1 },         
        { id: 15, name: "松川", hiragana: "まつかわ", gender_id: 1 },
        { id: 16, name: "水上", hiragana: "みずかみ", gender_id: 2 },
        { id: 17, name: "宮澤", hiragana: "みやざわ", gender_id: 1 },         
        { id: 18, name: "山角", hiragana: "やまかど", gender_id: 1 },         
        { id: 19, name: "山田", hiragana: "やまだ", gender_id: 1 },       
      ];

      // c1, c2, c3リストも初期データとして定義されている / c1, c2, and c3 lists are also defined as initial data
      this.c1List = [ /* ... */ ];
      this.c2List = [ /* ... */ ];
      this.c3List = [ /* ... */ ];

      // 新しく初期化されたリストからallStudentsMapを作成 / Populate allStudentsMap from this newly initialized list
      this.masterStudentList.forEach(student => {
        this.allStudentsMap.set(student.id, student);
      });
    },

    /**
     * Firestoreに初期のmasterStudentListを永続化するワンタイムメソッド。 / One-time method to persist the initial masterStudentList to Firestore.
     * 各生徒が/studentsコレクションのドキュメントになる。 / Each student becomes a document in the /students collection.
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
          // student.idをドキュメントIDとして使用する / Use student.id as the document ID
          await setDoc(doc(studentsCollectionRef, String(student.id)), { // IDを文字列に変換 / Convert ID to string
            name: student.name,
            hiragana: student.hiragana,
            gender_id: student.gender_id
          });
        }
        console.log("Master student list successfully saved to /students collection.");
        alert("マスター学生リストがFirestoreに保存されました。");
        this.masterListSaved = true; // 保存済みとマークする / Mark as saved
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
          this.allStudentsMap = tempStudentMap; // ルックアップ用にマップを更新 / Update the map for lookups
          console.log("Master student list loaded from Firestore.");
          if (loadedStudents.length > 0) {
            this.masterListSaved = true;
          }
        }, (error) => {
          console.error("Error listening to master student list from Firestore:", error);
        });

      } catch (e) {
        console.error("Error setting up master student list listener:", e);
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

      // deskNumberを修正するためにstudentListの作業用コピーを作成する / Create a working copy of studentList to modify deskNumber
      const studentsToAssign = studentList.map(s => ({ ...s })); 
      
      // ステップ1: 事前に割り当てられた生徒を座席番号ごとにグループ化して配置する / Step 1: Place pre-assigned students first, grouped by desk number.
      const preAssignedStudentsMap = new Map();
      studentsToAssign.forEach(student => {
        if (student.deskNumber && !student.isEmpty) { // 空のプレースホルダーではないことを確認する / Ensure it's not an empty placeholder
          if (!preAssignedStudentsMap.has(student.deskNumber)) {
            preAssignedStudentsMap.set(student.deskNumber, []);
          }
          preAssignedStudentsMap.get(student.deskNumber).push(student);
        }
      });

      // 配置された生徒を追跡する / Track students that have been placed
      const placedStudentIds = new Set();
      
      // 事前に割り当てられた生徒を座席配列に配置する / Place pre-assigned students into the desks array
      preAssignedStudentsMap.forEach((studentsAtDesk, deskNumber) => {
        const deskIndex = deskNumber - 1; // 座席番号を配列インデックスに変換 / Convert desk number to array index
        if (desks[deskIndex]) {
          // 座席に最大2人の生徒を配置する / Place up to 2 students at the desk
          for (let k = 0; k < Math.min(studentsAtDesk.length, 2); k++) {
            desks[deskIndex].students.push(studentsAtDesk[k]);
            placedStudentIds.add(studentsAtDesk[k].id);
          }
        }
      });

      // ステップ2: まだ配置されていないすべての生徒を取得する / Step 2: Get all students who have not been placed yet (from original list).
      const unassignedStudents = studentsToAssign.filter(s => !placedStudentIds.has(s.id));
      let unassignedIndex = 0;

      // ステップ3: 残りの空のスロットを未割り当ての生徒で埋める / Step 3: Fill any remaining empty slots with unassigned students.
      desks.forEach(desk => {
        while (desk.students.length < 2) {
          if (unassignedIndex < unassignedStudents.length) {
            const student = unassignedStudents[unassignedIndex++];
            student.deskNumber = parseInt(desk.name); // 未割り当ての生徒に座席番号を割り当てる / Assign desk number to the unassigned student
            desk.students.push(student);
            placedStudentIds.add(student.id); // 配置済みとマークする / Mark as placed
          } else {
            // これ以上生徒がいない場合は、空のプレースホルダーを追加する / Add empty placeholder if there are no more students
            desk.students.push({ ...this.emptyStudentPlaceholder, id: `empty-${desk.name}-${desk.students.length + 1}` });
          }
        }
      });

      // ステップ4: 保存用の最終的な更新済みリストを作成する / Step 4: Create the final updated list for saving.
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
      
      // 座席を割り当て、座席番号を持つ更新された生徒のリストを取得する / Assign desks and get the updated list of students with desk numbers
      const { deskLayout, studentsWithDeskNumbers } = this.assignStudentsToDesks(studentsArray);

      // Firestore用にstudentAssignmentsを準備する（IDと座席番号のみ） / Prepare studentAssignments for Firestore (only IDs and deskNumbers)
      const studentAssignments = studentsWithDeskNumbers.map(s => ({
        studentId: s.id,
        deskNumber: s.deskNumber
      }));

      const newTab = {
        id: newTabId,
        title: title,
        creationDate: creationDate,
        studentAssignments: studentAssignments, // Firestore用にIDと座席番号のみを保存 / Store only IDs and desk numbers for Firestore
        deskLayout: deskLayout, // ローカル表示用に完全なレイアウトを保存 / Store the full layout for local display
        firestoreDocId: null
      };

      this.tabs.push(newTab);
      this.tabs.sort((a, b) => a.id - b.id); // タブをIDでソートしておく / Keep tabs sorted by ID
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

      // 現在のタブのレイアウトからすべての生徒のコピーを取得する。 / Get a copy of all students from the current tab's layout.
      const studentsToRandomize = this.currentTab.deskLayout.flatMap(desk => 
        desk.students.filter(s => !s.isEmpty)
      );

      // 制約のために既存のすべてのタブから履歴データを取得する。 / Get historical data from all existing tabs for constraints.
      const historicalTabs = this.tabs.filter(tab => tab.id !== this.currentTab.id);
      const { studentsByDesk, deskmates } = this.getHistoricalData(historicalTabs);

      // 2. 再編成アルゴリズムを実装する。 / 2. Implement the randomization algorithm.
      const availableDesks = Array.from({ length: 9 }, (_, i) => i + 1);
      const newStudentAssignments = [];
      const assignedStudentIds = new Set();
      
      // 始点をランダム化するために生徒をシャッフルする / Shuffle the students to randomize the starting point
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
            // 利用可能な生徒のプールから生徒を削除する / Remove the student from the pool of available students
            studentsToRandomize.splice(studentsToRandomize.findIndex(s => s.id === studentToPlace.id), 1);
          } else {
            break; // このスロットに適した生徒が見つからない / No valid student found for this slot
          }
        }
      
        // 割り当てられた生徒を新しいリストに追加する / Add the assigned students to the new list.
        deskStudents.forEach(s => {
          if (!s.isEmpty) {
            newStudentAssignments.push({ studentId: s.id, deskNumber: deskNumber });
          }
        });
      }

      // 3. ローカルに新しい一時的なタブオブジェクトを作成する。 / 3. Create a NEW temporary tab object locally.
      const tempTabId = 'temp-randomized'; // 一時的なタブ用の特別な非数値IDを使用 / Use a special, non-numeric ID for temporary tabs
      const creationDate = new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
      const newTitle = `再編成 ${creationDate}`;

      // マスターマップからの完全な詳細で生徒オブジェクトを再水和する。 / Rehydrate student objects with full details from the master map.
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
        firestoreDocId: null // Firestoreにまだないのでこれはnull / This is null since it's not in Firestore yet
      };

      // 4. ローカルのタブ配列を更新する。 / 4. Update the local tabs array.
      const existingTempIndex = this.tabs.findIndex(t => t.id === tempTabId);
      if (existingTempIndex !== -1) {
        this.tabs.splice(existingTempIndex, 1);
      }
      
      // 新しい一時的なタブを追加する / Then, add the new temporary tab.
      this.tabs.push(newTempTab);

      // 5. タブをソートし、新しい一時的なタブをアクティブにする。 / 5. Sort the tabs and make the new temporary tab the active one.
      this.tabs.sort((a, b) => {
        if (a.id === tempTabId) return 1;
        if (b.id === tempTabId) return -1;
        return a.id - b.id; // 他のタブをIDでソートする / Sort other tabs by ID
      });

      this.activeTabId = tempTabId;
    },

    /**
     * 履歴的な配置と同級生を考慮して、特定の座席に適した生徒を見つける。 / Finds a valid student for a given desk, considering historical placements and deskmates.
     */
    findValidStudent(allStudents, deskNumber, currentDeskmates, studentsByDesk, deskmates, assignedStudentIds) {
      // 検索順序をランダム化するために生徒をシャッフルする / Shuffle the students to randomize the search order
      const shuffledStudents = this.shuffleArray([...allStudents]);

      for (const student of shuffledStudents) {
        const studentId = student.id;
        
        // この再編成実行で既に生徒が割り当てられているか確認する / Check if student has already been assigned in this randomization run
        if (assignedStudentIds.has(studentId)) {
          continue;
        }
        
        // ルール1: 既に座ったことがある座席に座ることはできない / Rule 1: Cannot sit at a desk they have already sat at
        const previousDesks = studentsByDesk.get(studentId) || new Set();
        if (previousDesks.has(String(deskNumber))) {
          continue;
        }
        
        // ルール2: 以前の同級生と一緒に座ることはできない / Rule 2: Cannot sit with a former deskmate
        let isValidDeskmate = true;
        const previousDeskmates = deskmates.get(studentId) || new Set();
        for (const deskmate of currentDeskmates) {
          if (previousDeskmates.has(deskmate.id)) {
            isValidDeskmate = false;
            break;
          }
        }
        
        if (isValidDeskmate) {
          return student; // 適した生徒が見つかった！ / Found a valid student!
        }
      }
      
      return null; // 利用可能なすべての生徒をチェックしても適した生徒が見つからない場合 / If no valid student is found after checking all available students
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
        : [...this.masterStudentList]; // 現在のタブが選択されていない場合はマスターリストをベースにする / Use master list if no current tab selected

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
          studentAssignments: tabData.studentAssignments // 生徒のIDと座席番号のみを保存 / Only save student IDs and their desk numbers
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

.loading-message {
  margin-top: 50px;
  font-style: italic;
  color: #666;
}
</style>