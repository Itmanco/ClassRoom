<template>
  <nav class="sidebar">

    <h2>📚 Classroom Manager</h2>

    <button
      @click="$emit('change-page','classroom')"
      :class="{active: currentPage==='classroom'}"
    >
      🏠 Classroom
    </button>

    <button
      @click="$emit('change-page','students')"
      :class="{active: currentPage==='students'}"
    >
      👨‍🎓 Students
    </button>

    <button
      @click="$emit('change-page','courses')"
      :class="{active: currentPage==='courses'}"
    >
      📚 Courses
    </button>

    <button
      @click="$emit('change-page','buildings')"
      :class="{active: currentPage==='buildings'}"
    >
      🏫 Buildings
    </button>

    <button
      @click="$emit('change-page','rooms')"
      :class="{active: currentPage==='rooms'}"
    >
      🚪 Rooms
    </button>

    <button
      @click="$emit('change-page','classes')"
      :class="{active: currentPage==='classes'}"
    >
      🏷️ Classes
    </button>

    <button
      @click="$emit('change-page','settings')"
      :class="{active: currentPage==='settings'}"
    >
      ⚙ Settings
    </button>

  </nav>
</template>

<script>
export default{
    name:"NavigationMenu",

    props:{
        currentPage:String
    }
}
</script>

<style scoped>

.sidebar{
    width:220px;
    background:#f5f5f5;
    height:100vh;
    padding:20px;
    display:flex;
    flex-direction:column;
    gap:10px;
}

button{
    text-align:left;
    padding:12px;
    border:none;
    cursor:pointer;
    border-radius:8px;
}

button.active{
    background:#42b883;
    color:white;
}

</style>