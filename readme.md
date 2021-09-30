# Bout

Tiny framework for micro frontend installation and communication. Creates simple way to inject a microfrontend pattern into existing SPA application.

Any framework for the parent app is supported! But for the microfrontend, only `Vue3` is supported for now.

## Name

`Bout /bu/` means in french a `scrap` of something, a very small piece.

## Installation

```bash
$ yarn add pieces-js
```

## Getting started

### Parent App

In your parent app, you need to initialize the library:

```ts
import { initMicroApps } from 'pieces-js'

initMicroApps()
```

### Child App

On the other hand, in your child app, you need to initialize the microfrontend:

```ts
// main.ts
import { createApp } from 'vue'
import { createVue3MicroApp, registerMicroApp } from 'microfront-lib'

const appFactory = () => {
  return createApp(App)
}

const microApp = createVue3MicroApp('ExampleApp', appFactory)
registerMicroApp(microApp)
```

Second importation is to make sure, that child app creates the public `asset-manifest.json` file. It should be available in the `public` folder.

For `Vite`, you can do this in `vite-config.ts` using `rollup-plugin-output-manifest`:

```ts
import { defineConfig } from 'vite'
import outputManifest from 'rollup-plugin-output-manifest'

// https://vitejs.dev/config/
export default defineConfig({
  // Other properties here...
  build: {
    manifest: true,
    cssCodeSplit: true,
    lib: {
      name: 'Example',
      entry: './src/main.ts',
      fileName: 'bundle',
    },
    rollupOptions: {
      plugins: [outputManifest({ fileName: 'asset-manifest.json', filter: () => true })],
      inlineDynamicImports: true,
    },
  },
})
```

### Connecting the apps

When your setup is complete, all you have to do is to call `installApp(appHost)` in the parent app. This will automatically install the microfrontend, and prepare it to mount. After installation you can call `.mount(containerID)` on the app to mount it.

Example:

```ts
const host = 'http://example.com'
const app = await installApp(host)
app.mount('container-id')
```

App should be properly rendered!

## Communication between apps

TODO
