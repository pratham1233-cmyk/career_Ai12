# Firestore Setup

The app uses the `(default)` Cloud Firestore database in the Firebase project configured by `firebase-applet-config.json`. The existing database is located in `nam5` (US multi-region).

After Google sign-in, the app loads and saves the signed-in user's workspace at `users/{uid}`. Workspace data includes the student profile, skill scores, coding profile, CV analysis, interview readiness, applications, and notifications. Firestore rules restrict each user document to its authenticated owner.

The rules are deployed with:

```sh
firebase deploy --only firestore:rules --project gen-lang-client-0787422818
```
