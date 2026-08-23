# Firebase Billing Runbook

**Project:** `classroom-b81c6`  
**Purpose:** Keep Cloud Functions available for the ClassRoom portfolio app while minimizing the risk of unexpected charges.  
**Default operating mode:** Stay on the **Spark** plan and develop/test locally. Upgrade to **Blaze** only when a real Cloud Functions deployment is needed.

> **Important:** Firebase/Google Cloud pricing, quotas, and billing controls can change. Always verify the current Firebase documentation before enabling billing or deploying paid services.

## 1. Core policy

Use this project with the following rule:

```text
Normal development
    ↓
Spark plan
    ↓
Firebase Emulator Suite
    ↓
No deployed Cloud Functions

Need a real production/demo backend
    ↓
Review this runbook
    ↓
Enable Blaze
    ↓
Set billing protections
    ↓
Deploy only the required function(s)
    ↓
Monitor usage
    ↓
Delete functions when no longer needed
    ↓
Downgrade to Spark when practical
```

The goal is to make billing an **intentional temporary state**, not something that is enabled once and forgotten.

## 2. Why Blaze is needed

Cloud Functions for Firebase requires the Firebase project to be on the **Blaze (pay-as-you-go)** plan for deployment.

Deployments also use Google Cloud services such as:

- Cloud Build
- Artifact Registry
- Cloud Run / Cloud Functions infrastructure

On Spark, these paid Google Cloud services are unavailable for deployment.

The current ClassRoom backend use case is small:

- callable `createUser` function
- invoked only by authenticated `system-admin` users
- low expected traffic
- portfolio/demo workload

For a small portfolio workload, usage may remain inside no-cost quotas, but **Blaze still allows charges if usage exceeds no-cost allowances**.

## 3. Before enabling Blaze

### 3.1 Confirm the correct Firebase project

From the repository root:

```bash
firebase projects:list
```

Verify:

```text
Project ID: classroom-b81c6
```

Check the active project:

```bash
firebase use
```

If needed:

```bash
firebase use classroom-b81c6
```

### 3.2 Test locally first

Do not enable Blaze just to debug application logic.

Run Functions locally with the Emulator Suite:

```bash
firebase emulators:start --only functions
```

Preferred workflow:

```text
write code
→ lint
→ syntax check
→ emulator test
→ only then consider deployment
```

For the current Functions code:

```bash
cd functions
npm run lint
node --check index.js
cd ..
```

Both commands should complete without errors before production deployment.

### 3.3 Review the function list

Before deploying:

```bash
grep -n "exports\." functions/index.js
```

For the current implementation, the expected privileged function is:

```text
createUser
```

### 3.4 Check Git safety

Never commit service-account credentials.

Verify:

```bash
grep -n "serviceAccountKey.json" .gitignore
git status --short serviceAccountKey.json
```

Expected result:

- `.gitignore` contains `serviceAccountKey.json`
- `git status` prints nothing for that file

Cloud Functions deployed through Firebase do **not** need the local `serviceAccountKey.json` file.

## 4. Enable Blaze safely

### 4.1 Upgrade only when deployment is actually needed

In Firebase Console:

```text
Project
→ Usage and billing
→ Upgrade
→ Blaze (pay as you go)
```

Link the intended Google Cloud Billing account.

**Do not continue until you have confirmed that the billing account is the one you intend to use.**

### 4.2 Immediately configure billing protection

After enabling Blaze, configure billing controls before deployment.

At minimum:

1. Create a small Google Cloud/Firebase budget.
2. Enable email notifications.
3. Add multiple alert thresholds.
4. Configure a Cloud Run / Cloud Functions spend cap if the option is available for the project.
5. Verify that billing notifications are going to an email account you actively monitor.

Suggested alert thresholds for a portfolio project:

```text
50%
75%
90%
100%
```

Choose a deliberately small budget that matches what you are personally comfortable spending.

> **Important:** Normal budget alerts are notifications. They do **not** automatically stop usage or charges.

Where supported, use a **budget spend cap** for Cloud Run / Cloud Functions as an additional safeguard.

### 4.3 Keep minimum instances at zero

Do not configure `minInstances` unless there is a real need.

A non-zero minimum instance count can create idle compute costs.

For this portfolio project, prefer:

```text
minInstances: 0
```

or leave it unset.

### 4.4 Keep maximum instances very low

This app does not require large scale.

For a small portfolio function, prefer a conservative limit such as:

```javascript
setGlobalOptions({
  maxInstances: 1,
});
```

or at most a very small number during testing.

This is a safety control against unexpected traffic spikes. It is **not** a complete billing cap.

## 5. Deploy carefully

Prefer deploying a single function rather than all Functions:

```bash
firebase deploy --only functions:createUser
```

Do not use:

```bash
firebase deploy --only functions
```

unless you intentionally want to deploy every function in the codebase.

Before deployment:

```bash
cd functions
npm run lint
node --check index.js
cd ..
```

Then:

```bash
firebase deploy --only functions:createUser
```

Record the deployment date in the change log at the bottom of this file.

## 6. After deployment

### 6.1 Function exists

```bash
firebase functions:list
```

Confirm that only the expected function(s) are deployed.

### 6.2 Test only the intended operation

For `createUser`, verify:

```text
System Admin
→ Admin Console
→ Create User
→ Firebase Auth account created
→ users/{uid} created
→ optional schools/{schoolId}/members/{uid} created
```

Confirm that the same Firebase Auth UID is used everywhere:

```text
Firebase Authentication UID
=
users/{uid}
=
schools/{schoolId}/members/{uid}
=
membership.userUid
```

### 6.3 Check usage dashboards

Review:

```text
Firebase Console
→ Usage and billing
```

and the Cloud Functions usage dashboard.

Do this after the first tests and again later the same day if the function remains deployed.

## 7. Routine shutdown when the demo is finished

If the deployed function is no longer needed, delete it.

For the current function:

```bash
firebase functions:delete createUser
```

Confirm the deletion when prompted.

Then verify:

```bash
firebase functions:list
```

`createUser` should no longer appear.

Deleting the function prevents future invocations, but **does not erase usage that already occurred**. Billing data can also appear with delay.

## 8. Artifact Registry cleanup

Cloud Functions deployments create container images in Artifact Registry.

Those deployment artifacts are not required for the deployed function to continue running, and old artifacts can accumulate storage costs.

Firebase CLI versions that support cleanup policies can configure automatic Artifact Registry cleanup.

After deployment, review Firebase/Google Cloud guidance for the current CLI version and configure an appropriate cleanup policy if deployment artifacts will be retained.

For this portfolio app, do not intentionally keep old deployment artifacts unless they are needed.

## 9. Strong shutdown: downgrade from Blaze to Spark

When you no longer need any paid Google Cloud services for this Firebase project, downgrade the project back to Spark.

Firebase currently supports downgrading from Blaze to Spark. Unlinking the Cloud Billing account also causes the Firebase project to downgrade to Spark.

Before downgrading:

```text
[ ] Delete deployed Cloud Functions that are no longer needed
[ ] Confirm no Cloud Run services are intentionally required
[ ] Confirm no Pub/Sub or other paid Google Cloud services are required
[ ] Review non-default Storage buckets / Realtime Database instances
[ ] Check recent billing usage
[ ] Confirm the app still has the data needed on Spark
```

Then use:

```text
Firebase Console
→ Usage and billing
→ Plan management
→ Downgrade to Spark
```

or, when appropriate, unlink the Cloud Billing account from the project in Google Cloud Console.

### Effects of downgrading

After downgrade:

- new Cloud Functions deployments are unavailable
- paid Google Cloud services such as Cloud Run and Pub/Sub become unavailable
- some non-default Firebase resources can become inaccessible until Blaze is enabled again
- existing billing usage before downgrade can still appear later because reporting is not instantaneous

For this project, verify the normal Vue + Firebase Auth + Firestore workflow after downgrade.

## 10. Emergency shutdown procedure

Use this if unexpected traffic or charges appear.

### Step 1 — Delete deployed Functions

```bash
firebase functions:list
firebase functions:delete createUser
```

Delete any other unexpected deployed functions as well.

### Step 2 — Inspect Cloud Run

Cloud Functions 2nd gen uses Cloud Run infrastructure.

In Google Cloud Console:

```text
Cloud Run
→ Services
```

Confirm that no unexpected service is active.

### Step 3 — Inspect billing

```text
Google Cloud Console
→ Billing
→ Reports
```

Identify:

- service generating cost
- project
- SKU
- time range

### Step 4 — Downgrade/unlink billing if appropriate

If the project no longer needs paid services:

```text
Firebase → Usage and billing → downgrade to Spark
```

or unlink the Cloud Billing account in Google Cloud Console.

### Step 5 — Remember reporting delay

Stopping the service prevents new usage, but already-incurred charges may be reported later.

Do not assume a zero dashboard immediately after shutdown means no earlier usage occurred.

## 11. Re-enable later

When Cloud Functions are needed again:

```text
1. Verify current Firebase pricing/docs
2. Review this runbook
3. Upgrade to Blaze
4. Verify budget alerts
5. Verify spend cap
6. Review maxInstances/minInstances
7. Lint and emulator-test
8. Deploy only required functions
9. Monitor usage
```

Deploy:

```bash
firebase deploy --only functions:createUser
```

## 12. Local-development fallback

When Blaze is disabled, continue backend development locally.

Run:

```bash
firebase emulators:start --only functions
```

The frontend can be configured during development to connect to the Functions emulator.

This allows continued development and testing without a production Cloud Functions deployment.

The preferred ClassRoom development model is therefore:

```text
Spark + Emulator
```

with Blaze used only for intentional production/demo periods.

## 13. Security rules for privileged functions

A callable Cloud Function must enforce authorization on the server.

Do not rely on:

- hidden Vue buttons
- client-side role checks
- Firestore UI restrictions alone

For `createUser`, the function must independently verify:

```text
request.auth exists
AND
users/{request.auth.uid}.systemRole == "system-admin"
```

The function must create the Firebase Auth account first and then reuse the generated UID for Firestore profile and membership documents.

Never expose Firebase Admin credentials or `serviceAccountKey.json` in the Vue client.

## 14. Recommended ClassRoom cost posture

For this portfolio project:

```text
Default plan:
Spark

Cloud Functions development:
Emulator

Production/demo Cloud Functions:
Blaze temporarily

Function scaling:
minInstances = 0
maxInstances = 1 (or another deliberately small value)

Deployment:
single function only

After demo:
delete function

When paid services are no longer needed:
downgrade to Spark
```

This is intentionally conservative.

## 15. Monthly / demo-day checklist

Before leaving Blaze enabled overnight:

```text
[ ] Do I still need the deployed function?
[ ] Is maxInstances intentionally low?
[ ] Is minInstances zero/unset?
[ ] Are budget alerts configured?
[ ] Is a spend cap configured where available?
[ ] Have I checked today's usage?
[ ] Are there unexpected Cloud Run services?
[ ] Are Artifact Registry artifacts accumulating?
[ ] Can I delete the function now?
[ ] Can I downgrade to Spark now?
```

If the answer to the last question is **yes**, downgrade.

## 16. Official references

Because billing behavior can change, verify these pages before every significant billing change:

- Firebase pricing plans  
  https://firebase.google.com/docs/projects/billing/firebase-pricing-plans

- Firebase pricing  
  https://firebase.google.com/pricing

- Avoid surprise bills / billing guidance  
  https://firebase.google.com/docs/projects/billing/avoid-surprise-bills

- Cloud Functions quotas and limits  
  https://firebase.google.com/docs/functions/quotas

- Manage Cloud Functions  
  https://firebase.google.com/docs/functions/manage-functions

- Firebase FAQ  
  https://firebase.google.com/support/faq

## 17. Change log

### 2026-08-23

Created the initial billing runbook for the ClassRoom portfolio project.

Current state at creation:

```text
Firebase project: classroom-b81c6
Firebase CLI configured
Functions codebase configured
Node runtime: 22
createUser callable function prepared locally
Cloud Function deployment blocked because project remains on Spark
Blaze intentionally not enabled yet
```

Next planned step:

```text
Review billing controls
→ decide whether to temporarily enable Blaze
→ deploy createUser
→ integrate AdminUserManager with callable function
```