<template>
  <div class="audit-page">
    <header class="page-header">
      <div>
        <p class="eyebrow">
          {{ $t("adminAudit.eyebrow") }}
        </p>

        <h1>
          🧾 {{ $t("adminAudit.title") }}
        </h1>

        <p>
          {{ $t("adminAudit.description") }}
        </p>
      </div>

      <button
        type="button"
        class="secondary"
        @click="$emit('back')"
      >
        ← {{ $t("common.back") }}
      </button>
    </header>

    <p
      v-if="errorMessage"
      class="message error"
    >
      {{ errorMessage }}
    </p>

    <section class="panel">
      <div class="section-heading">
        <h2>
          {{ $t("adminAudit.recent") }}
        </h2>

        <button
          type="button"
          class="secondary"
          :disabled="loading"
          @click="loadLogs"
        >
          {{ $t("adminAudit.refresh") }}
        </button>
      </div>

      <p v-if="loading">
        {{ $t("common.loading") }}
      </p>

      <p
        v-else-if="logs.length === 0"
        class="empty-state"
      >
        {{ $t("adminAudit.empty") }}
      </p>

      <div
        v-else
        class="audit-list"
      >
        <article
          v-for="log in logs"
          :key="log.id"
          class="audit-card"
          :class="{
            expanded:
              selectedLogId === log.id,
          }"
          @click="
            toggleLogDetails(
              log.id,
            )
          "
        >
          <div class="audit-main">
            <div>
              <strong>
                {{ actionLabel(log.action) }}
              </strong>

              <div
                v-if="entityName(log)"
                class="entity-name"
              >
                {{ entityName(log) }}
              </div>
            </div>

            <div class="entity-summary">
              <span class="entity">
                {{
                  entityTypeLabel(
                    log.entityType,
                  )
                }}
                ID:
                {{ log.entityId }}
              </span>

              <span class="expand-indicator">
                {{
                  selectedLogId === log.id
                    ? "▲"
                    : "▼"
                }}
              </span>
            </div>
          </div>

          <div class="audit-meta">
            <span>
              {{
                log.actorEmail ||
                log.actorUid
              }}
            </span>

            <span v-if="log.actorRole">
              {{ log.actorRole }}
            </span>

            <span>
              {{
                formatTimestamp(
                  log.createdAt,
                )
              }}
            </span>
          </div>

          <div
            v-if="
              Array.isArray(
                log.changedFields,
              ) &&
              log.changedFields.length
            "
            class="changed-fields"
          >
            <strong>
              {{
                $t(
                  "adminAudit.changedFields",
                )
              }}:
            </strong>

            {{
              log.changedFields.join(
                ", ",
              )
            }}
          </div>

          <div
            v-if="
              selectedLogId === log.id
            "
            class="audit-details"
            @click.stop
          >
            <div class="detail-row">
              <span>
                {{
                  $t(
                    "adminAudit.details.action",
                  )
                }}
              </span>

              <strong>
                {{ log.action }}
              </strong>
            </div>

            <div class="detail-row">
              <span>
                {{
                  $t(
                    "adminAudit.details.entityType",
                  )
                }}
              </span>

              <strong>
                {{
                  entityTypeLabel(
                    log.entityType,
                  )
                }}
              </strong>
            </div>

            <div class="detail-row">
              <span>
                {{
                  $t(
                    "adminAudit.details.entityId",
                  )
                }}
              </span>

              <strong>
                {{ log.entityId }}
              </strong>
            </div>

            <div
              v-if="entityName(log)"
              class="detail-row"
            >
              <span>
                {{
                  $t(
                    "adminAudit.details.entityName",
                  )
                }}
              </span>

              <strong>
                {{ entityName(log) }}
              </strong>
            </div>

            <div class="detail-row">
              <span>
                {{
                  $t(
                    "adminAudit.details.actor",
                  )
                }}
              </span>

              <strong>
                {{
                  log.actorEmail ||
                  log.actorUid
                }}
              </strong>
            </div>

            <div class="detail-row">
              <span>
                {{
                  $t(
                    "adminAudit.details.actorUid",
                  )
                }}
              </span>

              <strong class="technical-value">
                {{ log.actorUid }}
              </strong>
            </div>

            <div class="detail-row">
              <span>
                {{
                  $t(
                    "adminAudit.details.role",
                  )
                }}
              </span>

              <strong>
                {{ log.actorRole || "—" }}
              </strong>
            </div>

            <div class="detail-row">
              <span>
                {{
                  $t(
                    "adminAudit.details.school",
                  )
                }}
              </span>

              <strong class="technical-value">
                {{ log.schoolId }}
              </strong>
            </div>

            <div class="detail-row">
              <span>
                {{
                  $t(
                    "adminAudit.details.time",
                  )
                }}
              </span>

              <strong>
                {{
                  formatTimestamp(
                    log.createdAt,
                  )
                }}
              </strong>
            </div>

            <div
              v-if="
                Array.isArray(
                  log.changedFields,
                ) &&
                log.changedFields.length
              "
              class="detail-row"
            >
              <span>
                {{
                  $t(
                    "adminAudit.changedFields",
                  )
                }}
              </span>

              <strong>
                {{
                  log.changedFields.join(
                    ", ",
                  )
                }}
              </strong>
            </div>

            <div
              v-if="
                additionalDetails(log)
                  .length > 0
              "
              class="detail-section"
            >
              <span class="detail-title">
                {{
                  $t(
                    "adminAudit.details.additional",
                  )
                }}
              </span>

              <div
                v-for="
                  detail
                  in additionalDetails(
                    log,
                  )
                "
                :key="detail.key"
                class="detail-row"
              >
                <span>
                  {{ detail.key }}
                </span>

                <strong>
                  {{ detail.value }}
                </strong>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
import {
  getRecentAuditLogs,
} from "../services/auditLogService";

export default {
  name: "AdminAuditLog",

  emits: [
    "back",
  ],

  props: {
    schoolId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      logs: [],
      loading: true,
      errorMessage: "",
      selectedLogId: "",
    };
  },

  mounted() {
    this.loadLogs();
  },

  watch: {
    schoolId() {
      this.selectedLogId = "";
      this.loadLogs();
    },
  },

  methods: {
    async loadLogs() {
      if (!this.schoolId) {
        this.logs = [];
        this.loading = false;
        this.selectedLogId = "";
        return;
      }

      this.loading = true;
      this.errorMessage = "";

      try {
        this.logs =
          await getRecentAuditLogs(
            this.schoolId,
            50,
          );
      } catch (error) {
        this.errorMessage =
          this.$t(
            "adminAudit.loadError",
            {
              error:
                error.message,
            },
          );
      } finally {
        this.loading = false;
      }
    },

    toggleLogDetails(
      logId,
    ) {
      this.selectedLogId =
        this.selectedLogId === logId
          ? ""
          : logId;
    },

    actionLabel(
      action,
    ) {
      const key =
        `adminAudit.actions.${action}`;

      const translated =
        this.$t(
          key,
        );

      return translated === key
        ? action
        : translated;
    },

    entityName(
      log,
    ) {
      return (
        log.details?.entityName ||
        log.details?.studentName ||
        ""
      );
    },

    entityTypeLabel(
      entityType,
    ) {
      const key =
        `adminAudit.entities.${entityType}`;

      const translated =
        this.$t(
          key,
        );

      return translated === key
        ? entityType
        : translated;
    },

    additionalDetails(
      log,
    ) {
      if (
        !log.details ||
        typeof log.details !==
          "object"
      ) {
        return [];
      }

      const excludedKeys = [
        "entityName",
        "studentName",
      ];

      return Object.entries(
        log.details,
      )
        .filter(
          ([key]) =>
            !excludedKeys.includes(
              key,
            ),
        )
        .map(
          ([
            key,
            value,
          ]) => ({
            key,
            value:
              this.formatDetailValue(
                value,
              ),
          }),
        );
    },

    formatDetailValue(
      value,
    ) {
      if (
        value === null ||
        value === undefined
      ) {
        return "—";
      }

      if (
        Array.isArray(
          value,
        )
      ) {
        return value.join(
          ", ",
        );
      }

      if (
        typeof value ===
        "object"
      ) {
        return JSON.stringify(
          value,
        );
      }

      return String(
        value,
      );
    },

    formatTimestamp(
      timestamp,
    ) {
      if (
        !timestamp ||
        typeof timestamp.toDate !==
          "function"
      ) {
        return "";
      }

      return timestamp
        .toDate()
        .toLocaleString();
    },
  },
};
</script>

<style scoped>
.audit-page {
  max-width: 1180px;
  margin: 0 auto;
  padding: 30px;
}

.page-header,
.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  margin: 4px 0 8px;
}

.page-header p {
  color: #667085;
}

.eyebrow {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.panel {
  padding: 22px;
  background: white;
  border: 1px solid #e4e7ec;
  border-radius: 12px;
}

.audit-list {
  display: grid;
  gap: 12px;
}

.audit-card {
  padding: 16px;
  border: 1px solid #e4e7ec;
  border-radius: 10px;
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.audit-card:hover {
  border-color: #b8bec7;
}

.audit-card.expanded {
  border-color: #42b883;
  box-shadow:
    0 0 0 1px
    rgba(
      66,
      184,
      131,
      0.08
    );
}

.audit-main,
.audit-meta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.audit-main {
  justify-content: space-between;
}

.audit-meta {
  margin-top: 6px;
  color: #667085;
  font-size: 0.9rem;
}

.entity-summary {
  display: flex;
  align-items: center;
  gap: 10px;
}

.entity-name {
  margin-top: 5px;
  font-weight: 600;
}

.entity {
  font-family: monospace;
  color: #667085;
  white-space: nowrap;
}

.expand-indicator {
  color: #667085;
  font-size: 0.8rem;
}

.changed-fields {
  margin-top: 10px;
}

.audit-details {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e4e7ec;
  cursor: default;
}

.detail-row {
  display: grid;
  grid-template-columns:
    minmax(150px, 0.4fr)
    minmax(0, 1fr);
  gap: 14px;
  padding: 7px 0;
}

.detail-row span {
  color: #667085;
}

.detail-row strong {
  overflow-wrap: anywhere;
}

.detail-section {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed #d0d5dd;
}

.detail-title {
  display: block;
  margin-bottom: 6px;
  font-weight: 700;
}

.technical-value {
  font-family: monospace;
  overflow-wrap: anywhere;
}

button {
  border: 0;
  border-radius: 8px;
  padding: 10px 14px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.secondary {
  background: #e8eaed;
  color: #333;
}

.message {
  padding: 11px 14px;
  border-radius: 8px;
  margin-bottom: 18px;
}

.message.error {
  background: #fde8e8;
  color: #b42318;
}

.empty-state {
  color: #667085;
}

@media (max-width: 700px) {
  .audit-page {
    padding: 20px 14px;
  }

  .page-header {
    align-items: stretch;
    flex-direction: column;
  }

  .detail-row {
    grid-template-columns: 1fr;
    gap: 3px;
  }

  .audit-main {
    align-items: flex-start;
    flex-direction: column;
  }

  .entity-summary {
    width: 100%;
    justify-content: space-between;
  }
}
</style>