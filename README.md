# BDOMS App (Expo Dev Client • TypeScript • 2025)

A production-ready React Native app designed for Berkeley Designs. Fast, clean development using **Expo Dev Client**, **TypeScript**, and **EAS** builds.  
This app avoids Expo Go entirely, by using Expo Dev Client, ensuring full support for custom native modules.

---

## Philosophy of This App

### 1. No Expo Go — Dev Client Only
Expo Go cannot load custom native modules.  
This project uses **expo-dev-client** from the start so you can safely add:
- Reanimated  
- FastImage  
- Any native libraries you need

### 2. Stability First
Includes the minimal dependencies used in most real-world apps:
- React Navigation  
- Screens & Safe Area Context  
- Async Storage  
- Vector Icons  
- Reanimated (optional but recommended)

### 3. TypeScript Everywhere
Strict TypeScript with path aliases for cleaner imports.

## Create a New App Using Expo Latest

```bash
npx create-expo-app@latest my-app --template expo-template-blank-typescript
cd my-app
```

## Install Expo Dev Client (Required for EAS Build)

```bash
npx expo install expo-dev-client
```

## Run on Android to Check Initial Build Works

```bash
npx expo prebuild
npx expo run:android
```

## Reset Git (Optional)

*Optional:* Delete the `.git` folder if you want a fresh git history.

```bash
- Windows: `rmdir /s /q .git`
- macOS/Linux: `rm -rf .git`
```

## Install Core Dependencies

```bash
npm install @react-navigation/native
npm install @react-navigation/bottom-tabs
npm install @react-navigation/native-stack
npm install react-native-screens
npm install react-native-safe-area-context
npm install @expo/vector-icons
npm install @react-native-async-storage/async-storage
npm install react-native-reanimated
npm install react-native-dotenv
npm install react-native-encrypted-storage
npx expo install react-native-gesture-handler
npx expo install react-native-screens
npx expo install react-native-safe-area-context
npx expo install expo-local-authentication
npx expo install expo-system-ui expo-navigation-bar
npm install --save-dev expo-module-scripts
npm install axios
```

## Re-run After Dependencies

```bash
npx expo prebuild # Generates iOS & Android projects
npx expo prebuild --clean # Optional: removes existing native folders first if adding native modules or modifying app.json
npx expo run:android
```

Re-run your build on Android to check that it works with the new dependencies. If this works, you’re through the worst of it. Side note, if working on Windows, remember that path lengths can cause compile errors, so keep your path names short and sweet.

## Project Health Check

```bash
npx expo-doctor
```

Fix any issues. For example, EAS CLI may be missing. If so:

```bash
npm install -g eas-cli
```

## Configure EAS for Development and Production Builds (eas.json)

Create an eas.json file in your project root:

```json
{
  "cli": {
    "version": ">= 11.0.0",
    "appVersionSource": "local"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}
```

Note: appVersionSource: "local" avoids future versioning warnings.

## Development Build

For development builds, run:

```bash
npx expo prebuild
adb uninstall com.lowner75.my-app # Only run this if you have an existing dev build on your emulator
npx eas build --profile development --platform android # Don't forget to install on your emulator at the end, so it stays in sync
npx expo start --dev-client --host lan # Or just npx expo start --dev-client
```

This will save you having to re-build your app with EAS every time you make changes to it, as it now hot reloads. Running it npx expo start --dev-client should now hot reload both Android studios and your mobile client, assuming you installed the dev build on your emulator.

## Hot Reload Workflow

1. Install dev client on emulator & phone
2. Run: npx expo start --dev-client --host lan
3. Edit code in VSCode
4. Hot reload on both emulator & phone

## Production Build

```bash
npx eas build --profile production --platform android
```

This generates a production APK, which you can install on your device (remember, you only have a limited number of production builds per month with Expo, assuming you’re on the free plan, so be careful with usage).

## Google / Android SHA1 Notes

To get your SHA1 key, you can find it here (password: android):

```bash
keytool -keystore ./android/app/debug.keystore -list -v
```

Your EAS SHA1 fingerprints can be found here:

```bash
eas credentials
```

## Important:

Each build type creates its own SHA1. You may need multiple Android OAuth 2.0 clients:

 - BDOMS Android Client (Expo Dev Client)
 - BDOMS Android Client (EAS Dev Build)
 - BDOMS Android Client (EAS Production Build)
 - BDOMS Web Client
 
## Rebuild Workflow

Whenever you add a new native dependency (or change app.json / app.config.js), you need to run the below, before running EAS build, otherwise changes might not propagate:

```bash
npx expo prebuild --clean
```

## Common Pitfalls & Tips

### 1. Asset Management / Adaptive Icons

Place all images/icons inside assets/. The app includes:

- `adaptive-icon.png` → default / dark mode
- `adaptive-icon-light.png` → light mode

### 2. App Name

Set it in app.json. Spaces are allowed.

### 3. Over-the-Air Updates

Use:

```bash
expo-updates
eas update
```

### 4. Windows Path Length

Remember to keep paths short (under 250 characters) to avoid Gradle issues.

## Suggested Folder Structure

```bash
/assets
/src
|___  /api
|___  /components
|___  /constants
|___  /context
|___  /hooks
|___  /navigation
|___  /screens
|___  /services
|___  /utils
|___  /store
App.tsx
```

## Outcome

  - Fully TypeScript-configured React Native app
  - Full native module support
  - Predictable EAS builds
  - Backend Sign-In compatibility
  - Fast iteration using Dev Client