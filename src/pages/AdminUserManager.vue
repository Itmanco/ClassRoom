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
            v-if="isSystemAdmin"
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
          <input
            v-else
            type="text"
            :value="schoolName(schoolId)"
            disabled
          />
        </label>

        <label>
          {{ $t("adminUsers.create.fields.schoolRole") }}

          <select
            v-model="createUserForm.schoolRole"
            :disabled="
              isSystemAdmin
                ? !createUserForm.schoolId
                : !schoolId
            "
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
            count: filteredUsers.length,
          },
        )
      }}
    </p>
  </div>
      </div>

      <div class="user-filters">
        <label class="search-field">
          Search

          <input
            v-model.trim="userSearch"
            type="search"
            placeholder="Name or email"
          />
        </label>
      </div>

      <p v-if="loading">
        {{ $t("adminUsers.list.loading") }}
      </p>

      <p
        v-else-if="filteredUsers.length === 0"
        class="empty-state"
      >
        No users match the current search.
      </p>
      <div
        v-else
        class="user-list"
      >
        <article
          v-for="user in filteredUsers"
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

                <div class="access-badges">
                  <span
                    v-if="
                      user.systemRole ===
                      'system-admin'
                    "
                    class="
                      access-badge
                      access-system-admin
                    "
                  >
                    {{
                      $t(
                        "adminUsers.roles.systemAdmin",
                      )
                    }}
                  </span>

                  <span
                    v-for="
                      membership in
                      membershipsFor(user.id)
                    "
                    :key="
                      membershipKey(
                        membership.schoolId,
                        user.id,
                      )
                    "
                    class="access-badge"
                    :class="
                      `access-${membership.role}`
                    "
                  >
                    {{
                      schoolName(
                        membership.schoolId,
                      )
                    }}
                    ·
                    {{
                      $t(
                        `adminUsers.memberships.roles.${membershipRoleKey(
                          membership.role,
                        )}`,
                      )
                    }}
                  </span>
                </div>
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

            <div
              v-if="isSystemAdmin"
              class="role-controls"
            >
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
                          user.id === currentUserUid ||
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

                <div
                  v-if="
                    isSystemAdmin
                      ? availableSchoolsFor(user.id).length > 0
                      : !hasMembershipInSchool(
                          user.id,
                          schoolId,
                        )
                  "
                  class="add-membership"
                >
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
  getManagedSchoolUsers,
  setManagedUserSystemRole,
} from "../services/adminUserService";

export default {
  name: "AdminUserManager",

  emits: [
    "back",
  ],

  props: {
    schoolId: {
      type: String,
      required: true,
    },

    isSystemAdmin: {
      type: Boolean,
      default: false,
    },

    currentUserUid: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      users: [],
      schools: [],
      membershipsByUser: {},
      membershipForms: {},

      userSearch: "",

      loading: true,
      loadingMemberships: false,
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
        schoolId:
          this.isSystemAdmin
            ? ""
            : this.schoolId,
        schoolRole: "teacher",
      },

      creatingUser: false,
      };
  },

  computed: {
     filteredUsers() {
      const search =
        this.userSearch
          .trim()
          .toLowerCase();

      if (!search) {
        return this.users;
      }

      return this.users.filter(
        (user) => {
          const searchableValues = [
            user.displayName,
            user.firstName,
            user.lastName,
            user.email,
          ];

          return searchableValues.some(
            (value) =>
              String(value || "")
                .toLowerCase()
                .includes(search),
          );
        },
      );
    },
    
    allowedSchools() {
      if (this.isSystemAdmin) {
        return this.schools;
      }

      return [
        {
          id: this.schoolId,
          name: this.schoolId,
          active: true,
        },
      ];
    },

    activeSchools() {
      return this.allowedSchools.filter(
        (school) =>
          school.active !== false,
      );
    },
  },

  async mounted() {
    if (this.isSystemAdmin) {
      await this.loadSchools();
    } else {
      this.schools = [
        {
          id: this.schoolId,
        },
      ];
    }

    await this.loadAllMemberships();
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

    async loadAllMemberships() {
      this.loadingMemberships = true;

      try {
        const membershipsByUser = {};

        for (
          const school
          of this.allowedSchools
        ) {
          const memberships =
            await getSchoolMemberships(
              school.id,
            );

          memberships.forEach(
            (membership) => {
              const userId =
                String(
                  membership.userUid ||
                  membership.id,
                );

              if (
                !membershipsByUser[
                  userId
                ]
              ) {
                membershipsByUser[
                  userId
                ] = [];
              }

              membershipsByUser[
                userId
              ].push({
                ...membership,
                schoolId:
                  school.id,
              });
            },
          );
        }

        this.membershipsByUser =
          membershipsByUser;
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
        this.loadingMemberships = false;
      }
    },

    setUsers(
      items,
    ) {
      this.users =
        items;

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
              schoolId:
                this.isSystemAdmin
                  ? ""
                  : this.schoolId,

              role:
                "teacher",
            };
          }
        },
      );

      this.membershipForms =
        membershipForms;
    },

    async startListener() {
      if (this.unsubscribe) {
        this.unsubscribe();
        this.unsubscribe = null;
      }

      this.loading = true;
      this.errorMessage = "";

      if (this.isSystemAdmin) {
        this.unsubscribe =
          watchUsers(
            (items) => {
              this.setUsers(
                items,
              );

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

        return;
      }

      try {
        const users =
          await getManagedSchoolUsers(
            this.schoolId,
          );

        this.setUsers(
          users,
        );
      } catch (error) {
        this.errorMessage =
          this.$t(
            "adminUsers.messages.loadError",
            {
              error:
                error.message,
            },
          );
      } finally {
        this.loading = false;
      }
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
          of this.allowedSchools
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
      const memberships =
        this.membershipsByUser[
          userId
        ] || [];

      if (this.isSystemAdmin) {
        return memberships;
      }

      return memberships.filter(
        (membership) =>
          membership.schoolId ===
          this.schoolId,
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

      return this.allowedSchools.filter(
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

    membershipRoleKey(
      role,
    ) {
      if (role === "school-admin") {
        return "schoolAdmin";
      }

      return role;
    },

    membershipKey(
      schoolId,
      userId,
    ) {
      return (
        `${schoolId}:${userId}`
      );
    },

    canManageSchool(
      schoolId,
    ) {
      if (this.isSystemAdmin) {
        return true;
      }

      return (
        Boolean(this.schoolId) &&
        schoolId === this.schoolId
      );
    },

    hasMembershipInSchool(
      userId,
      schoolId,
    ) {
      return (
        this.membershipsByUser[
          userId
        ]?.some(
          (membership) =>
            membership.schoolId ===
            schoolId,
        ) || false
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

      if (
        !this.canManageSchool(
          schoolId,
        )
      ) {
        return;
      }

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
            schoolId:
              this.isSystemAdmin
                ? ""
                : this.schoolId,

            role:
              "teacher",
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
      if (
        user.id ===
        this.currentUserUid
      ) {
        event.target.value =
          membership.role;

        this.errorMessage =
          this.$t(
            "adminUsers.memberships.selfRoleChangeError",
          );

        return;
      }
      if (
        !this.canManageSchool(
          membership.schoolId,
        )
      ) {
        return;
      }
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
          {
            actorRole:
              this.isSystemAdmin
                ? "system-admin"
                : "school-admin",

            entityName:
              user.displayName ||
              user.email ||
              user.id,

            email:
              user.email || "",
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
      if (
        user.id ===
        this.currentUserUid
      ) {
        this.errorMessage =
          this.$t(
            "adminUsers.memberships.selfDeactivateError",
          );

        return;
      }
      if (
        !this.canManageSchool(
          membership.schoolId,
        )
      ) {
        return;
      }
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
          {
            actorRole:
              this.isSystemAdmin
                ? "system-admin"
                : "school-admin",

            entityName:
              user.displayName ||
              user.email ||
              user.id,

            email:
              user.email || "",
          },
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
      if (
        user.id ===
        this.currentUserUid
      ) {
        this.errorMessage =
          this.$t(
            "adminUsers.memberships.selfRemoveError",
          );

        return;
      }
      if (
        !this.canManageSchool(
          membership.schoolId,
        )
      ) {
        return;
      }
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
          {
            actorRole:
              this.isSystemAdmin
                ? "system-admin"
                : "school-admin",

            entityName:
              user.displayName ||
              user.email ||
              user.id,

            email:
              user.email || "",
          },
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
        await setManagedUserSystemRole(
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
        schoolId:
          this.isSystemAdmin
            ? ""
            : this.schoolId,
        schoolRole: "teacher",
      };
    },

    async submitCreateUser() {
      this.creatingUser = true;
      this.message = "";
      this.errorMessage = "";

      try {

        const targetSchoolId =
          this.isSystemAdmin
            ? this.createUserForm.schoolId
            : this.schoolId;
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
            targetSchoolId,

          schoolRole:
            targetSchoolId
              ? this.createUserForm.schoolRole
              : null,
        };

        const result =
          await createManagedUser(
            payload,
          );

        if (!this.isSystemAdmin) {
          await this.startListener();
        }

        await this.loadAllMemberships();

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

.user-filters {
  display: flex;
  gap: 12px;
  margin: 18px 0;
}

.search-field {
  width: min(100%, 420px);
}

.search-field input {
  box-sizing: border-box;
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #bbb;
  border-radius: 8px;
  font: inherit;
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

.access-badges {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.access-badge {
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
  white-space: nowrap;
}

.access-system-admin {
  background: #e7f7ed;
  color: #18794e;
}

.access-school-admin {
  background: #ffe8cc;
  color: #b54708;
}

.access-teacher {
  background: #e8f1ff;
  color: #175cd3;
}

.access-student {
  background: #e4e7ec;
  color: #475467;
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