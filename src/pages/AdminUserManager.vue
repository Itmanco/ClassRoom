<template>
  <div class="user-manager">
    <header class="page-header">
      <div>
        <p class="eyebrow">
          {{ $t("adminUsers.eyebrow") }}
        </p>

        <h1>
          👥 {{ $t("adminUsers.title") }}
        </h1>

        <p>
          {{ $t("adminUsers.description") }}
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
      v-if="message"
      class="message success"
    >
      {{ message }}
    </p>

    <p
      v-if="errorMessage"
      class="message error"
    >
      {{ errorMessage }}
    </p>

    <section class="panel">
      <div class="section-heading">
        <div>
          <h2>
            {{ $t("adminUsers.create.title") }}
          </h2>

          <p>
            {{ $t("adminUsers.create.description") }}
          </p>
        </div>
      </div>

      <form
        class="create-user-form"
        @submit.prevent="submitCreateUser"
      >
        <label>
          {{ $t("adminUsers.create.fields.email") }}

          <input
            v-model.trim="createUserForm.email"
            type="email"
            required
          />
        </label>

        <label>
          {{ $t("adminUsers.create.fields.password") }}

          <input
            v-model="createUserForm.password"
            type="password"
            required
            minlength="6"
          />
        </label>

        <label>
          {{ $t("adminUsers.create.fields.firstName") }}

          <input
            v-model.trim="createUserForm.firstName"
            type="text"
            required
          />
        </label>

        <label>
          {{ $t("adminUsers.create.fields.lastName") }}

          <input
            v-model.trim="createUserForm.lastName"
            type="text"
            required
          />
        </label>

        <label>
          {{ $t("adminUsers.create.fields.displayName") }}

          <input
            v-model.trim="createUserForm.displayName"
            type="text"
            :placeholder="
              $t(
                'adminUsers.create.fields.displayNamePlaceholder',
              )
            "
          />
        </label>

        <label>
          {{ $t("adminUsers.create.fields.language") }}

          <select
            v-model="createUserForm.language"
          >
            <option value="en">
              English
            </option>

            <option value="ja">
              日本語
            </option>
          </select>
        </label>

        <label>
          {{ $t("adminUsers.create.fields.school") }}

          <select
            v-model="createUserForm.schoolId"
          >
            <option value="">
              {{
                $t(
                  "adminUsers.create.fields.noSchool",
                )
              }}
            </option>

            <option
              v-for="school in activeSchools"
              :key="school.id"
              :value="school.id"
            >
              {{ school.name }}
            </option>
          </select>
        </label>

        <label>
          {{ $t("adminUsers.create.fields.schoolRole") }}

          <select
            v-model="createUserForm.schoolRole"
            :disabled="!createUserForm.schoolId"
          >
            <option value="school-admin">
              {{
                $t(
                  "adminUsers.memberships.roles.schoolAdmin",
                )
              }}
            </option>

            <option value="teacher">
              {{
                $t(
                  "adminUsers.memberships.roles.teacher",
                )
              }}
            </option>

            <option value="student">
              {{
                $t(
                  "adminUsers.memberships.roles.student",
                )
              }}
            </option>
          </select>
        </label>

        <div class="create-user-actions">
          <button
            type="submit"
            class="primary"
            :disabled="creatingUser"
          >
            {{
              creatingUser
                ? $t("adminUsers.create.creating")
                : $t("adminUsers.create.action")
            }}
          </button>
        </div>
      </form>
    </section>

    <section class="panel">
      <div class="section-heading">
        <div>
          <h2>
            {{ $t("adminUsers.list.title") }}
          </h2>

          <p>
            {{
              $t(
                "adminUsers.list.count",
                {
                  count: users.length,
                },
              )
            }}
          </p>
        </div>
      </div>

      <p v-if="loading">
        {{ $t("adminUsers.list.loading") }}
      </p>

      <div
        v-else
        class="user-list"
      >
        <article
          v-for="user in users"
          :key="user.id"
          class="user-card"
        >
          <div class="user-top">
            <div class="user-info">
              <div class="user-heading">
                <h3>
                  {{
                    user.displayName ||
                    user.email ||
                    user.id
                  }}
                </h3>

                <span
                  v-if="
                    user.systemRole ===
                    'system-admin'
                  "
                  class="role-badge"
                >
                  {{
                    $t(
                      "adminUsers.roles.systemAdmin",
                    )
                  }}
                </span>
              </div>

              <p>
                {{ user.email || "—" }}
              </p>

              <p class="technical-value">
                {{
                  $t(
                    "adminUsers.list.uid",
                    {
                      uid: user.id,
                    },
                  )
                }}
              </p>
            </div>

            <div class="role-controls">
              <label>
                {{
                  $t(
                    "adminUsers.fields.systemRole",
                  )
                }}

                <select
                  :value="
                    user.systemRole || ''
                  "
                  :disabled="
                    savingUserId === user.id
                  "
                  @change="
                    changeSystemRole(
                      user,
                      $event,
                    )
                  "
                >
                  <option value="">
                    {{
                      $t(
                        "adminUsers.roles.normalUser",
                      )
                    }}
                  </option>

                  <option
                    value="system-admin"
                  >
                    {{
                      $t(
                        "adminUsers.roles.systemAdmin",
                      )
                    }}
                  </option>
                </select>
              </label>
            </div>
          </div>

          <div class="membership-section">
            <div class="membership-heading">
              <div>
                <h4>
                  {{
                    $t(
                      "adminUsers.memberships.title",
                    )
                  }}
                </h4>

                <p>
                  {{
                    $t(
                      "adminUsers.memberships.description",
                    )
                  }}
                </p>
              </div>

              <button
                type="button"
                class="secondary"
                :disabled="
                  loadingMembershipUserId ===
                  user.id
                "
                @click="
                  toggleMemberships(user)
                "
              >
                {{
                  expandedUserId === user.id
                    ? $t(
                        "adminUsers.memberships.hide",
                      )
                    : $t(
                        "adminUsers.memberships.manage",
                      )
                }}
              </button>
            </div>

            <div
              v-if="
                expandedUserId === user.id
              "
              class="membership-content"
            >
              <p
                v-if="
                  loadingMembershipUserId ===
                  user.id
                "
              >
                {{
                  $t(
                    "adminUsers.memberships.loading",
                  )
                }}
              </p>

              <template v-else>
                <div
                  v-if="
                    membershipsFor(user.id)
                      .length > 0
                  "
                  class="membership-list"
                >
                  <article
                    v-for="
                      membership in
                      membershipsFor(user.id)
                    "
                    :key="
                      `${membership.schoolId}:${user.id}`
                    "
                    class="membership-card"
                  >
                    <div>
                      <strong>
                        {{
                          schoolName(
                            membership.schoolId,
                          )
                        }}
                      </strong>

                      <p class="technical-value">
                        {{ membership.schoolId }}
                      </p>
                    </div>

                    <div class="membership-controls">
                      <select
                        :value="
                          membership.role
                        "
                        :disabled="
                          savingMembershipKey ===
                          membershipKey(
                            membership.schoolId,
                            user.id,
                          )
                        "
                        @change="
                          changeMembershipRole(
                            user,
                            membership,
                            $event,
                          )
                        "
                      >
                        <option
                          value="school-admin"
                        >
                          {{
                            $t(
                              "adminUsers.memberships.roles.schoolAdmin",
                            )
                          }}
                        </option>

                        <option
                          value="teacher"
                        >
                          {{
                            $t(
                              "adminUsers.memberships.roles.teacher",
                            )
                          }}
                        </option>

                        <option
                          value="student"
                        >
                          {{
                            $t(
                              "adminUsers.memberships.roles.student",
                            )
                          }}
                        </option>
                      </select>

                      <button
                        v-if="
                          membership.active !==
                          false
                        "
                        type="button"
                        class="archive"
                        :disabled="
                          savingMembershipKey ===
                          membershipKey(
                            membership.schoolId,
                            user.id,
                          )
                        "
                        @click="
                          changeMembershipActive(
                            user,
                            membership,
                            false,
                          )
                        "
                      >
                        {{
                          $t(
                            "adminUsers.memberships.deactivate",
                          )
                        }}
                      </button>

                      <button
                        v-else
                        type="button"
                        class="reactivate"
                        :disabled="
                          savingMembershipKey ===
                          membershipKey(
                            membership.schoolId,
                            user.id,
                          )
                        "
                        @click="
                          changeMembershipActive(
                            user,
                            membership,
                            true,
                          )
                        "
                      >
                        {{
                          $t(
                            "adminUsers.memberships.reactivate",
                          )
                        }}
                      </button>

                      <button
                        type="button"
                        class="danger"
                        :disabled="
                          savingMembershipKey ===
                          membershipKey(
                            membership.schoolId,
                            user.id,
                          )
                        "
                        @click="
                          removeMembership(
                            user,
                            membership,
                          )
                        "
                      >
                        {{
                          $t(
                            "adminUsers.memberships.remove",
                          )
                        }}
                      </button>
                    </div>
                  </article>
                </div>

                <p
                  v-else
                  class="empty-state"
                >
                  {{
                    $t(
                      "adminUsers.memberships.empty",
                    )
                  }}
                </p>

                <div class="add-membership">
                  <h5>
                    {{
                      $t(
                        "adminUsers.memberships.addTitle",
                      )
                    }}
                  </h5>

                  <div class="add-membership-grid">
                    <label>
                      {{
                        $t(
                          "adminUsers.memberships.school",
                        )
                      }}

                      <select
                        v-model="
                          membershipForms[user.id].schoolId
                        "
                      >
                        <option value="">
                          {{
                            $t(
                              "adminUsers.memberships.selectSchool",
                            )
                          }}
                        </option>

                        <option
                          v-for="
                            school in
                            availableSchoolsFor(
                              user.id,
                            )
                          "
                          :key="school.id"
                          :value="school.id"
                        >
                          {{ school.name }}
                        </option>
                      </select>
                    </label>

                    <label>
                      {{
                        $t(
                          "adminUsers.memberships.role",
                        )
                      }}

                      <select
                        v-model="
                          membershipForms[user.id].role
                        "
                      >
                        <option
                          value="school-admin"
                        >
                          {{
                            $t(
                              "adminUsers.memberships.roles.schoolAdmin",
                            )
                          }}
                        </option>

                        <option
                          value="teacher"
                        >
                          {{
                            $t(
                              "adminUsers.memberships.roles.teacher",
                            )
                          }}
                        </option>

                        <option
                          value="student"
                        >
                          {{
                            $t(
                              "adminUsers.memberships.roles.student",
                            )
                          }}
                        </option>
                      </select>
                    </label>

                    <button
                      type="button"
                      class="primary"
                      :disabled="
                        !membershipForms[user.id]?.schoolId ||
                        Boolean(savingMembershipKey)
                      "
                      @click="addMembership(user)"
                    >
                      {{
                        $t(
                          "adminUsers.memberships.add",
                        )
                      }}
                    </button>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
import {
  updateSystemRole,
  watchUsers,
} from "../services/userService";

import {
  createSchoolMembership,
  getSchoolMemberships,
  removeSchoolMembership,
  setSchoolMembershipActive,
  updateSchoolMembership,
} from "../services/membershipService";

import {
  getSchools,
} from "../services/schoolService";

import {
  createManagedUser,
} from "../services/adminUserService";

export default {
  name: "AdminUserManager",

  emits: [
    "back",
  ],

  data() {
    return {
      users: [],
      schools: [],
      membershipsByUser: {},
      membershipForms: {},

      loading: true,
      expandedUserId: "",
      loadingMembershipUserId: "",
      savingUserId: "",
      savingMembershipKey: "",

      message: "",
      errorMessage: "",
      unsubscribe: null,

      createUserForm: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        displayName: "",
        language: "en",
        schoolId: "",
        schoolRole: "teacher",
      },

      creatingUser: false,
      };
  },

  computed: {
    activeSchools() {
      return this.schools.filter(
        (school) =>
          school.active !== false,
      );
    },
  },

  mounted() {
    this.loadSchools();
    this.startListener();
  },

  beforeUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  },

  methods: {
    async loadSchools() {
      try {
        this.schools =
          await getSchools();
      } catch (error) {
        this.errorMessage =
          this.$t(
            "adminUsers.memberships.schoolLoadError",
            {
              error:
                error.message,
            },
          );
      }
    },

    startListener() {
      if (this.unsubscribe) {
        this.unsubscribe();
      }

      this.loading = true;

      this.unsubscribe =
        watchUsers(
          (items) => {
            this.users = items;

            const membershipForms = {
              ...this.membershipForms,
            };

            items.forEach(
              (user) => {
                if (
                  !membershipForms[
                    user.id
                  ]
                ) {
                  membershipForms[
                    user.id
                  ] = {
                    schoolId: "",
                    role: "teacher",
                  };
                }
              },
            );

            this.membershipForms =
              membershipForms;

            this.loading = false;
          },

          (error) => {
            this.loading = false;

            this.errorMessage =
              this.$t(
                "adminUsers.messages.loadError",
                {
                  error:
                    error.message,
                },
              );
          },
        );
    },

    async toggleMemberships(
      user,
    ) {
      if (
        this.expandedUserId ===
        user.id
      ) {
        this.expandedUserId = "";
        return;
      }

      this.expandedUserId =
        user.id;

      await this.loadMemberships(
        user.id,
      );
    },

    async loadMemberships(
      userId,
    ) {
      this.loadingMembershipUserId =
        userId;

      this.errorMessage = "";

      try {
        const allMemberships =
          [];

        for (
          const school
          of this.schools
        ) {
          const memberships =
            await getSchoolMemberships(
              school.id,
            );

          const membership =
            memberships.find(
              (item) =>
                String(
                  item.userUid ||
                  item.id,
                ) ===
                String(userId),
            );

          if (membership) {
            allMemberships.push({
              ...membership,
              schoolId:
                school.id,
            });
          }
        }

        this.membershipsByUser = {
          ...this.membershipsByUser,
          [userId]:
            allMemberships,
        };
      } catch (error) {
        this.errorMessage =
          this.$t(
            "adminUsers.memberships.loadError",
            {
              error:
                error.message,
            },
          );
      } finally {
        this.loadingMembershipUserId =
          "";
      }
    },

    membershipsFor(
      userId,
    ) {
      return (
        this.membershipsByUser[
          userId
        ] || []
      );
    },

    availableSchoolsFor(
      userId,
    ) {
      const assigned =
        new Set(
          this.membershipsFor(
            userId,
          ).map(
            (membership) =>
              membership.schoolId,
          ),
        );

      return this.schools.filter(
        (school) =>
          school.active !== false &&
          !assigned.has(
            school.id,
          ),
      );
    },

    schoolName(
      schoolId,
    ) {
      return (
        this.schools.find(
          (school) =>
            school.id ===
            schoolId,
        )?.name ||
        schoolId
      );
    },

    membershipKey(
      schoolId,
      userId,
    ) {
      return (
        `${schoolId}:${userId}`
      );
    },

    async addMembership(
      user,
    ) {
      const form =
        this.membershipForms[
          user.id
        ];

      if (
        !form ||
        !form.schoolId
      ) {
        return;
      }

      const schoolId =
        form.schoolId;

      const role =
        form.role;

      const key =
        this.membershipKey(
          schoolId,
          user.id,
        );

      this.savingMembershipKey =
        key;

      this.message = "";
      this.errorMessage = "";

      try {
        await createSchoolMembership(
          schoolId,
          user.id,
          {
            role,
            active: true,
          },
        );

        this.message =
          this.$t(
            "adminUsers.memberships.added",
            {
              user:
                user.displayName ||
                user.email ||
                user.id,

              school:
                this.schoolName(
                  schoolId,
                ),
            },
          );

        this.membershipForms = {
          ...this.membershipForms,

          [user.id]: {
            schoolId: "",
            role: "teacher",
          },
        };

        await this.loadMemberships(
          user.id,
        );
      } catch (error) {
        this.errorMessage =
          this.$t(
            "adminUsers.memberships.addError",
            {
              error:
                error.message,
            },
          );
      } finally {
        this.savingMembershipKey =
          "";
      }
    },

    async changeMembershipRole(
      user,
      membership,
      event,
    ) {
      const newRole =
        event.target.value;

      const previousRole =
        membership.role;

      const confirmed =
        window.confirm(
          this.$t(
            "adminUsers.memberships.roleConfirm",
            {
              user:
                user.displayName ||
                user.email ||
                user.id,

              school:
                this.schoolName(
                  membership.schoolId,
                ),
            },
          ),
        );

      if (!confirmed) {
        event.target.value =
          previousRole;

        return;
      }

      const key =
        this.membershipKey(
          membership.schoolId,
          user.id,
        );

      this.savingMembershipKey =
        key;

      this.message = "";
      this.errorMessage = "";

      try {
        await updateSchoolMembership(
          membership.schoolId,
          user.id,
          {
            role:
              newRole,
          },
        );

        await this.loadMemberships(
          user.id,
        );

        this.message =
          this.$t(
            "adminUsers.memberships.roleUpdated",
          );
      } catch (error) {
        event.target.value =
          previousRole;

        this.errorMessage =
          this.$t(
            "adminUsers.memberships.roleError",
            {
              error:
                error.message,
            },
          );
      } finally {
        this.savingMembershipKey =
          "";
      }
    },

    async changeMembershipActive(
      user,
      membership,
      active,
    ) {
      const confirmed =
        window.confirm(
          this.$t(
            active
              ? "adminUsers.memberships.reactivateConfirm"
              : "adminUsers.memberships.deactivateConfirm",
            {
              user:
                user.displayName ||
                user.email ||
                user.id,

              school:
                this.schoolName(
                  membership.schoolId,
                ),
            },
          ),
        );

      if (!confirmed) {
        return;
      }

      const key =
        this.membershipKey(
          membership.schoolId,
          user.id,
        );

      this.savingMembershipKey =
        key;

      this.message = "";
      this.errorMessage = "";

      try {
        await setSchoolMembershipActive(
          membership.schoolId,
          user.id,
          active,
        );

        await this.loadMemberships(
          user.id,
        );

        this.message =
          this.$t(
            active
              ? "adminUsers.memberships.reactivated"
              : "adminUsers.memberships.deactivated",
          );
      } catch (error) {
        this.errorMessage =
          this.$t(
            "adminUsers.memberships.statusError",
            {
              error:
                error.message,
            },
          );
      } finally {
        this.savingMembershipKey =
          "";
      }
    },

    async removeMembership(
      user,
      membership,
    ) {
      const confirmed =
        window.confirm(
          this.$t(
            "adminUsers.memberships.removeConfirm",
            {
              user:
                user.displayName ||
                user.email ||
                user.id,

              school:
                this.schoolName(
                  membership.schoolId,
                ),
            },
          ),
        );

      if (!confirmed) {
        return;
      }

      const key =
        this.membershipKey(
          membership.schoolId,
          user.id,
        );

      this.savingMembershipKey =
        key;

      this.message = "";
      this.errorMessage = "";

      try {
        await removeSchoolMembership(
          membership.schoolId,
          user.id,
        );

        await this.loadMemberships(
          user.id,
        );

        this.message =
          this.$t(
            "adminUsers.memberships.removed",
          );
      } catch (error) {
        this.errorMessage =
          this.$t(
            "adminUsers.memberships.removeError",
            {
              error:
                error.message,
            },
          );
      } finally {
        this.savingMembershipKey =
          "";
      }
    },

    async changeSystemRole(
      user,
      event,
    ) {
      const role =
        event.target.value;

      const previousRole =
        user.systemRole || "";

      const roleLabel =
        role === "system-admin"
          ? this.$t(
              "adminUsers.roles.systemAdmin",
            )
          : this.$t(
              "adminUsers.roles.normalUser",
            );

      const userLabel =
        user.displayName ||
        user.email ||
        user.id;

      const confirmed =
        window.confirm(
          this.$t(
            "adminUsers.messages.roleConfirm",
            {
              user:
                userLabel,
              role:
                roleLabel,
            },
          ),
        );

      if (!confirmed) {
        event.target.value =
          previousRole;

        return;
      }

      this.savingUserId =
        user.id;

      this.message = "";
      this.errorMessage = "";

      try {
        await updateSystemRole(
          user.id,
          role,
        );

        this.message =
          this.$t(
            "adminUsers.messages.roleUpdated",
            {
              user:
                userLabel,
            },
          );
      } catch (error) {
        event.target.value =
          previousRole;

        if (
          error.message ===
          "The last System Admin cannot be demoted."
        ) {
          this.errorMessage =
            this.$t(
              "adminUsers.messages.lastAdmin",
            );

          return;
        }

        this.errorMessage =
          this.$t(
            "adminUsers.messages.roleError",
            {
              error:
                error.message,
            },
          );
      } finally {
        this.savingUserId =
          "";
      }
    },

    resetCreateUserForm() {
      this.createUserForm = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        displayName: "",
        language: "en",
        schoolId: "",
        schoolRole: "teacher",
      };
    },

    async submitCreateUser() {
      this.creatingUser = true;
      this.message = "";
      this.errorMessage = "";

      try {
        const payload = {
          email:
            this.createUserForm.email,

          password:
            this.createUserForm.password,

          firstName:
            this.createUserForm.firstName,

          lastName:
            this.createUserForm.lastName,

          displayName:
            this.createUserForm.displayName,

          language:
            this.createUserForm.language,

          schoolId:
            this.createUserForm.schoolId,

          schoolRole:
            this.createUserForm.schoolId
              ? this.createUserForm.schoolRole
              : null,
        };

        const result =
          await createManagedUser(
            payload,
          );

        this.message =
          this.$t(
            "adminUsers.create.created",
            {
              user:
                result.displayName ||
                result.email,
            },
          );

        this.resetCreateUserForm();
      } catch (error) {
        this.errorMessage =
          this.$t(
            "adminUsers.create.error",
            {
              error:
                error.message,
            },
          );
      } finally {
        this.creatingUser = false;
      }
    },
  },
};
</script>

<style scoped>
.user-manager {
  max-width: 1180px;
  margin: 0 auto;
  padding: 30px;
}

.page-header,
.section-heading,
.user-heading,
.membership-heading,
.user-top {
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

.page-header p,
.section-heading p,
.membership-heading p {
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

.user-list {
  display: grid;
  gap: 14px;
}

.user-card {
  padding: 18px;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.user-heading h3 {
  margin: 0;
}

.user-info p {
  margin: 6px 0 0;
}

.role-controls {
  min-width: 190px;
}

label {
  display: grid;
  gap: 7px;
  font-weight: 600;
}

select {
  padding: 9px 10px;
  border: 1px solid #bbb;
  border-radius: 8px;
  font: inherit;
}

.role-badge {
  padding: 4px 8px;
  border-radius: 999px;
  background: #e7f7ed;
  color: #18794e;
  font-size: 0.8rem;
  font-weight: 700;
}

.membership-section {
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid #eee;
}

.membership-heading h4 {
  margin: 0 0 4px;
}

.membership-heading p {
  margin: 0;
}

.membership-content {
  margin-top: 16px;
}

.membership-list {
  display: grid;
  gap: 10px;
}

.membership-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 14px;
  background: #f8f9fa;
  border-radius: 8px;
}

.membership-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.add-membership {
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px dashed #ccc;
}

.add-membership h5 {
  margin: 0 0 12px;
}

.add-membership-grid {
  display: grid;
  grid-template-columns:
    minmax(180px, 1fr)
    minmax(150px, 0.7fr)
    auto;
  gap: 12px;
  align-items: end;
}

.technical-value {
  font-family: monospace;
  font-size: 0.8rem;
  overflow-wrap: anywhere;
}

.empty-state {
  color: #667085;
}

button {
  border: 0;
  border-radius: 8px;
  padding: 10px 14px;
  cursor: pointer;
}

.primary,
.reactivate {
  background: #42b883;
  color: white;
}

.secondary {
  background: #e8eaed;
  color: #333;
}

.archive {
  background: #f0ad4e;
  color: white;
}

.danger {
  background: #d9534f;
  color: white;
}

.message {
  padding: 11px 14px;
  border-radius: 8px;
  margin-bottom: 18px;
}

.message.success {
  background: #e7f7ed;
  color: #18794e;
}

.message.error {
  background: #fde8e8;
  color: #b42318;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.create-user-form {
  display: grid;
  grid-template-columns:
    repeat(
      2,
      minmax(0, 1fr)
    );
  gap: 16px;
}

.create-user-form input,
.create-user-form select {
  box-sizing: border-box;
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #bbb;
  border-radius: 8px;
  font: inherit;
}

.create-user-actions {
  display: flex;
  align-items: end;
}

@media (max-width: 800px) {
  .create-user-form {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 800px) {
  .user-manager {
    padding: 20px 14px;
  }

  .page-header,
  .user-top,
  .membership-heading,
  .membership-card {
    align-items: stretch;
    flex-direction: column;
  }

  .role-controls {
    min-width: 0;
  }

  .add-membership-grid {
    grid-template-columns: 1fr;
  }
}
</style>