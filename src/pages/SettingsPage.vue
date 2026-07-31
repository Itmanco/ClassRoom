<template>
  <main class="settings-page">
    <header class="page-header">
      <div>
        <h1>{{ $t('settings.title') }}</h1>

        <p class="page-description">
          {{ $t('settings.description') }}
        </p>
      </div>
    </header>

    <section class="settings-card">
      <div class="setting-icon" aria-hidden="true">
        🌐
      </div>

      <div class="setting-content">
        <div class="setting-header">
          <div>
            <h2>{{ $t('settings.language.title') }}</h2>

            <p>
              {{ $t('settings.language.description') }}
            </p>
          </div>

          <span class="current-language">
            {{ currentLanguageLabel }}
          </span>
        </div>

        <div class="language-options">
          <label
            v-for="language in languages"
            :key="language.value"
            class="language-option"
            :class="{ selected: locale === language.value }"
          >
            <input
              v-model="locale"
              type="radio"
              name="application-language"
              :value="language.value"
              @change="changeLanguage(language.value)"
            />

            <span class="language-symbol">
              {{ language.symbol }}
            </span>

            <span class="language-details">
              <strong>
                {{ $t(language.labelKey) }}
              </strong>

              <small>
                {{ language.nativeName }}
              </small>
            </span>

            <span
              v-if="locale === language.value"
              class="selected-indicator"
              aria-hidden="true"
            >
              ✓
            </span>
          </label>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { setLocale } from '@/i18n';

export default {
  name: 'SettingsPage',

  data() {
    return {
      languages: [
        {
          value: 'en',
          labelKey: 'languages.english',
          nativeName: 'English',
          symbol: 'EN'
        },
        {
          value: 'ja',
          labelKey: 'languages.japanese',
          nativeName: '日本語',
          symbol: 'JA'
        }
      ]
    };
  },

  computed: {
    locale: {
      get() {
        return this.$i18n.locale;
      },

      set(value) {
        setLocale(value);
      }
    },

    currentLanguageLabel() {
      const selectedLanguage = this.languages.find(
        language => language.value === this.locale
      );

      if (!selectedLanguage) {
        return '';
      }

      return this.$t(selectedLanguage.labelKey);
    }
  },

  methods: {
    changeLanguage(locale) {
      setLocale(locale);
    }
  }
};
</script>

<style scoped>
.settings-page {
  width: 100%;
  max-width: 1000px;
  padding: 32px;
  box-sizing: border-box;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.page-header h1 {
  margin: 0;
  color: #2c3e50;
  font-size: 2rem;
}

.page-description {
  margin: 8px 0 0;
  color: #6b7280;
  font-size: 0.95rem;
}

.settings-card {
  display: flex;
  gap: 20px;
  padding: 24px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.setting-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 52px;
  width: 52px;
  height: 52px;
  background: #e8f7f0;
  border-radius: 12px;
  font-size: 1.5rem;
}

.setting-content {
  flex: 1;
  min-width: 0;
}

.setting-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 22px;
}

.setting-header h2 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.25rem;
}

.setting-header p {
  margin: 7px 0 0;
  color: #6b7280;
  line-height: 1.5;
}

.current-language {
  flex-shrink: 0;
  padding: 6px 12px;
  background: #e8f7f0;
  color: #257a58;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
}

.language-options {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.language-option {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 68px;
  padding: 14px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  background: #ffffff;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    transform 0.2s ease;
}

.language-option:hover {
  border-color: #42b883;
  background: #f6fcf9;
  transform: translateY(-1px);
}

.language-option.selected {
  border-color: #42b883;
  background: #f0faf5;
}

.language-option input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.language-symbol {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 42px;
  width: 42px;
  height: 42px;
  background: #f3f4f6;
  border-radius: 8px;
  color: #374151;
  font-size: 0.8rem;
  font-weight: 700;
}

.language-option.selected .language-symbol {
  background: #42b883;
  color: #ffffff;
}

.language-details {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 3px;
}

.language-details strong {
  color: #2c3e50;
  font-size: 0.95rem;
}

.language-details small {
  color: #6b7280;
}

.selected-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  background: #42b883;
  color: #ffffff;
  border-radius: 50%;
  font-size: 0.8rem;
  font-weight: bold;
}

@media (max-width: 700px) {
  .settings-page {
    padding: 20px;
  }

  .settings-card {
    flex-direction: column;
  }

  .setting-header {
    flex-direction: column;
  }

  .language-options {
    grid-template-columns: 1fr;
  }
}
</style>