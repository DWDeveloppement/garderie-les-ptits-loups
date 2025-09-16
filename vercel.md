# Saisie des logs Vercel lors des push en cas de error

```bash
[15:52:35.110] Running build in Washington, D.C., USA (East) – iad1
[15:52:35.111] Build machine configuration: 2 cores, 8 GB
[15:52:35.125] Cloning github.com/Pataco80/garderie-les-ptits-loups (Branch: main, Commit: 46f6f9d)
[15:52:35.612] Cloning completed: 487.000ms
[15:52:35.649] Found .vercelignore
[15:52:35.651] Removed 0 ignored files defined in .vercelignore
[15:52:36.613] Restored build cache from previous deployment (9byRJ1G3Pgm94vgaJeHVuYBSiFBJ)
[15:52:37.889] Running "vercel build"
[15:52:38.274] Vercel CLI 47.1.1
[15:52:38.638] Installing dependencies...
[15:52:41.637] 
[15:52:41.638] added 27 packages in 3s
[15:52:41.638] 
[15:52:41.638] 283 packages are looking for funding
[15:52:41.639]   run `npm fund` for details
[15:52:41.675] Detected Next.js version: 15.5.2
[15:52:41.683] Running "npm run build"
[15:52:41.791] 
[15:52:41.792] > garderie-les-ptits-loups@0.1.0 build
[15:52:41.792] > next build
[15:52:41.792] 
[15:52:43.110]    ▲ Next.js 15.5.2
[15:52:43.111] 
[15:52:43.193]    Creating an optimized production build ...
[15:53:02.210]  ✓ Compiled successfully in 16.4s
[15:53:02.217]    Linting and checking validity of types ...
[15:53:08.967] 
[15:53:08.969] ./src/components/ContactDirections.tsx
[15:53:08.969] 48:5  Warning: React Hook React.useCallback has a missing dependency: 'gmapsIOS'. Either include it or remove the dependency array.  react-hooks/exhaustive-deps
[15:53:08.970] 
[15:53:08.970] ./src/components/TablePriceResponsive.tsx
[15:53:08.970] 13:39  Warning: 'subventionsData' is defined but never used.  @typescript-eslint/no-unused-vars
[15:53:08.971] 
[15:53:08.971] ./src/components/shared/BottomBar.tsx
[15:53:08.971] 33:11  Warning: 'urls' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[15:53:08.974] 
[15:53:08.975] ./src/components/shared/DynamicMap.tsx
[15:53:08.975] 28:17  Warning: 'openSmartDirections' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[15:53:08.976] 
[15:53:08.976] ./src/components/shared/MobileNavigation.tsx
[15:53:08.976] 20:3  Warning: 'autoHide' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[15:53:08.978] 
[15:53:08.978] ./src/components/shared/StaticMap.tsx
[15:53:08.978] 14:17  Warning: 'openSmartDirections' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[15:53:08.978] 
[15:53:08.978] ./src/hooks/useMaps.ts
[15:53:08.978] 61:53  Warning: 'mapType' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[15:53:08.978] 61:74  Warning: 'style' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[15:53:08.978] 
[15:53:08.978] info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
[15:53:13.417] Failed to compile.
[15:53:13.418] 
[15:53:13.418] ./src/components/TablePriceResponsive.tsx:16:26
[15:53:13.418] Type error: Property 'map' does not exist on type '{ incomeRange: string; reductionDaily: string; }'.
[15:53:13.419] 
[15:53:13.419] [0m [90m 14 |[39m 	[36mreturn[39m (
[15:53:13.419]  [90m 15 |[39m         [33m<[39m[33mTable[39m[33m>[39m
[15:53:13.420] [31m[1m>[22m[39m[90m 16 |[39m             {labelHading[33m.[39mmap((item[33m,[39m index) [33m=>[39m {
[15:53:13.420]  [90m    |[39m                          [31m[1m^[22m[39m
[15:53:13.420]  [90m 17 |[39m                 [36mreturn[39m (
[15:53:13.420]  [90m 18 |[39m                     [33m<[39m[33mTableHeader[39m key[33m=[39m{index}[33m>[39m
[15:53:13.421]  [90m 19 |[39m                         [33m<[39m[33mTableRow[39m[33m>[39m[0m
[15:53:13.448] Next.js build worker exited with code: 1 and signal: null
[15:53:13.470] Error: Command "npm run build" exited with 1
```
