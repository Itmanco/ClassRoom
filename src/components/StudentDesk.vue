<template>
  <div class="desk" :class="{ 'single-student-desk': students.length === 1 && students[0].isEmpty === false }">
    <div
      class="student"
      v-for="student in students"
      :key="student.id"
      @click="!student.isEmpty ? toggleStudentInfo(student.id) : null"
      :class="['gender-' + student.gender_id, { 'is-empty': student.isEmpty }]"
    >
      <div v-if="student.isEmpty" class="empty-chair-placeholder">
        </div>
      <div v-else-if="selectedStudentId === student.id" class="student-info-details">
        <p><strong>{{ student.name }}</strong> </p>
        <p>{{ student.hiragana }}</p>
      </div>
      <div
        v-else
        class="student-initial"
        :class="{ 'font-small': student.name.length > 3 }"
      >
        {{ student.name }}
      </div>
    </div>
    <div class="desk-name">{{ deskName }}</div>
  </div>
</template>

<script>
export default {
  name: 'StudentDesk', // コンポーネントの名前を定義する。 / Defines the component's name.
  props: {
    deskName: { // 座席の番号または名前を受け取るプロパティ。 / A prop that receives the desk's number or name.
      type: String,
      required: true // このプロパティは必須。 / This prop is required.
    },
    students: { // 座席に座っている生徒の配列を受け取るプロパティ。 / A prop that receives an array of students at the desk.
      type: Array,
      default: () => [] // デフォルトは空の配列。 / Defaults to an empty array.
    }
  },
  data() {
    return {
      selectedStudentId: null // 詳細を表示するために現在選択されている生徒のIDを追跡する。 / Tracks the ID of the currently selected student to display their details.
    };
  },
  methods: {
    /**
     * 生徒のクリックを処理し、詳細情報の表示を切り替えるメソッド。 / A method that handles a student's click and toggles the display of their detailed information.
     * @param {number} id - クリックされた生徒のID。 / The ID of the clicked student.
     */
    toggleStudentInfo(id) {
      // 選択されたIDが現在のIDと同じであればnullにリセットし、そうでなければ新しいIDに設定する。 / If the selected ID is the same as the current ID, reset it to null; otherwise, set it to the new ID.
      this.selectedStudentId = this.selectedStudentId === id ? null : id;
    }
  }
};
</script>

<style scoped>
/* スタイルは座席と生徒の表示を制御する。 / Styles control the display of the desk and students. */
.desk {
  display: flex;
  justify-content: center; /* デフォルト：生徒を中央に配置 / Default: centers students */
  align-items: center;
  width: 150px;
  height: 100px;
  border: 2px solid #333;
  border-radius: 8px;
  position: relative;
  margin: 10px 30px; 
}

/* 1人の「実際の」生徒がいる座席に適用されるスタイル。生徒を左に配置する。 / Style applied to desks with one *actual* student. It aligns the student to the left. */
.desk.single-student-desk {
  justify-content: flex-start; /* コンテンツを左に配置する / Aligns content to the left */
  padding-left: 15px; /* ボーダーに触れないようにパディングを追加する / Add some padding to prevent it from touching the border */
}

.student {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 50%;
  margin: 0 10px;
  font-weight: bold;
  font-size: 1em;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 2px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
}

/* 空の座席用のスタイル / Styles for empty chairs */
.student.is-empty {
  background-color: #e9ecef; /* 明るい背景色 / Lighter background */
  border-style: dashed; /* 破線ボーダー / Dashed border */
  border-color: #adb5bd; /* グレーのボーダー / Grayer border */
  cursor: not-allowed; /* 禁止カーソル / No-entry cursor */
  opacity: 0.7; /* 少し透明にする / Slightly faded */
  pointer-events: none; /* クリックイベントを無効にする / Disables click events */
}

.student:hover:not(.is-empty) { /* 空でない場合にのみホバーを適用する / Apply hover only if not empty */
  background-color: #e0e0e0;
}

/* 性別ごとのホバー時の光彩（空でない場合のみ） / Gender-specific hover glow, only if not empty */
.student.gender-1:hover:not(.is-empty) {
  box-shadow: 0 0 15px 5px rgb(190, 213, 236); 
}

.student.gender-2:hover:not(.is-empty) {
  box-shadow: 0 0 15px 5px rgba(221, 151, 138, 0.81);
}

.empty-chair-placeholder {
  font-size: 0.6em;
  color: #6c757d;
}

.student-initial {
  text-align: center;
}

.student-initial.font-small {
  font-size: 0.8em;
}

.student-info-details {
  font-size: 0.7em;
  font-weight: normal;
  line-height: 1.2;
  word-break: break-all;
}

.student-info-details p {
  margin: 0;
}

.desk-name {
  position: absolute;
  bottom: -20px;
  font-size: 0.8em;
  color: #555;
}
</style>