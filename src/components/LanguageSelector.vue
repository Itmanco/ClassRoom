<template>
  <div class="language-selector">
    <label for="language-select">
      {{ t('common.language') }}
    </label>

    <select
      id="language-select"
      :value="locale"
      @change="changeLanguage"
    >
      <option value="en">
        {{ t('languages.english') }}
      </option>

      <option value="ja">
        {{ t('languages.japanese') }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { setLocale } from '@/i18n';

const { locale, t } = useI18n();

function changeLanguage(event) {
  setLocale(event.target.value);
}
</script>

<style scoped>
.language-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.language-selector select {
  padding: 0.4rem 0.6rem;
  border: 1px solid #cccccc;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}
</style>