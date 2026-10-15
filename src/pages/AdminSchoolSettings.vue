<template>
  <div class="school-settings">
    <header>
      <button type="button" @click="$emit('back')">
        ← {{ $t("common.back") }}
      </button>

      <h1>⚙️ School Settings</h1>
      <p>
        Manage school-specific configuration.
      </p>
    </header>

    <section class="settings-panel">
      <h2>School Time Zone</h2>

      <p>
        School ID: {{ schoolId }}
      </p>

      <p>
        Time-zone configuration will be available here.
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: "AdminSchoolSettings",

  props: {
    schoolId: {
      type: String,
      required: true,
    },
  },

  emits: ["back"],
};
</script>

<style scoped>
.school-settings {
  max-width: 1180px;
  margin: 0 auto;
  padding: 30px;
}

.settings-panel {
  margin-top: 24px;
  padding: 24px;
  border: 1px solid #d0d5dd;
  border-radius: 12px;
}
</style>