<template>
  <div class="my-classroom">
    <h2>{{ classroomTitle }}</h2>
    <div class="whiteboard"></div>
    <div class="desks-container">
      <div
        class="desk-row"
        v-for="(row, rowIndex) in deskRows"
        :key="rowIndex"
      >
        <StudentDesk
          v-for="(desk, deskIndex) in row"
          :key="desk.id || deskIndex"
          :deskName="desk.name"
          :students="desk.students"
        />
      </div>
    </div>
  </div>
</template>

<script>
import StudentDesk from './StudentDesk.vue';

export default {
  name: 'MyClassroom',
  components: {
    StudentDesk
  },
  props: {
    desks: { // 親コンポーネントから座席の配列を受け取るプロパティ。 / A prop that receives an array of desks from the parent component.
      type: Array,
      default: () => [] // デフォルトは空の配列。 / Defaults to an empty array.
    },
    classroomTitle: { // 親コンポーネントから教室のタイトルを受け取るプロパティ。 / A prop that receives the classroom's title from the parent component.
      type: String,
      default: '教室のレイアウト' // デフォルト値。 / A default value is set.
    }
  },
  computed: {
    /**
     * `desks`プロパティから座席を2つずつの行に分割して返す計算プロパティ。 / A computed property that splits the desks from the `desks` prop into rows of two.
     * これにより、UIのレイアウトが簡素化される。 / This simplifies the layout for the UI.
     * @returns {Array} 2つずつに分割された座席の配列。 / An array of desk arrays, each containing two desks.
     */
    deskRows() {
      const rows = [];
      const desksToProcess = this.desks; // プロパティを直接使用する。 / Use the prop directly.
      for (let i = 0; i < desksToProcess.length; i += 2) {
        rows.push(desksToProcess.slice(i, i + 2));
      }
      return rows;
    }
  }
};
</script>

<style scoped>
/* スタイルはレイアウトの表示を担当する。 / Styles are responsible for displaying the layout. */
.my-classroom {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: sans-serif;
  min-width: 320px;
}

h2 {
    margin-bottom: 20px;
}

.whiteboard {
  width: 80%;
  height:3px;
  background-color: #eee;
  border: 2px solid #000;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  font-weight: bold;
}

.desks-container {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.desk-row {
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  width: 100%;
  margin-bottom: 10px;
}

</style>