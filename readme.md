# Bout ![Bout](https://img.shields.io/npm/v/bout?color=blue&logo=Bout) ![Licence](https://img.shields.io/npm/l/bout)

Tiny framework for micro frontend installation and communication. Creates simple way to inject a microfrontend pattern into existing SPA application.

| Framework | Parent App                                              | Microfrontend                                         |
| --------- | ------------------------------------------------------- | ----------------------------------------------------- |
| `Vue2`    | ![Yes](https://img.shields.io/badge/-Yes-brightgreen)   | ![Not yet](https://img.shields.io/badge/-Not_yet-red) |
| `Vue3`    | ![Yes](https://img.shields.io/badge/-Possible-yellow)\* | ![Yes](https://img.shields.io/badge/-Yes-brightgreen) |
| `React`   | ![Yes](https://img.shields.io/badge/-Possible-yellow)\* | ![Not yet](https://img.shields.io/badge/-Not_yet-red) |
| `Angular` | ![Yes](https://img.shields.io/badge/-Possible-yellow)\* | ![Not yet](https://img.shields.io/badge/-Not_yet-red) |
| `Svetle`  | ![Yes](https://img.shields.io/badge/-Possible-yellow)\* | ![Not yet](https://img.shields.io/badge/-Not_yet-red) |

<small>\* - Framework should work flawlessly for any framework in the parent app, but not everywhere this was tested</small>

## Name

`Bout /bu/` means in french a `scrap` of something, a very small piece.

## Installation

```bash
$ yarn add bout
```

## Getting started

### Parent App

In your parent app, you need to initialize the library:

```ts
import { initMicroApps } from 'bout'

initMicroApps()
```

### Child App

On the other hand, in your child app, you need to initialize the microfrontend:

```ts
// main.ts
import { createApp } from 'vue'
import { createVue3MicroApp, registerMicroApp } from 'bout'

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
