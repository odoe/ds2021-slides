<!-- .slide: data-background="../img/2021/dev-summit/bg-1.png" data-background-size="cover -->
<h1 style="text-align: left; font-size: 80px;">ArcGIS API for JavaScript:</h1>
<h2 style="text-align: left; font-size: 60px;">Building apps with ES Modules</h2>
<p style="text-align: left; font-size: 30px;">René Rubalcava</p>
<p style="text-align: left; font-size: 30px;"><a href="https://twitter.com/odoenet">@odoenet</a></p>

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
## Agenda

* Why ES Modules?
* ESM CDN
* Assets
* Import Syntax
* Build Tools

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
## What are ES Modules?

Modern way of writing modular JavaScript

```sh
npm i @arcgis/core
```

```js
// old and busted
require(['esri/WebMap'], function(WebMap) {...});

// new hotness
import WebMap from '@arcgis/core/WebMap';
```

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
## Why does it matter?

* Ideal for modern web development
* Supported in evergreen browsers
* Works with modern build tooling
    * webpack, rollup, snowpack, and more

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-3.png" -->
## Getting Started

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
## Prototyping with ESM CDN

* _NOT FOR PRODUCTION_
* Great way to test out some ideas
* Native browser module loading

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
## Prototyping with ESM CDN

```html
<script type="module">
  import ArcGISMap from "https://js.arcgis.com/4.18/@arcgis/core/Map.js";
  import MapView from "https://js.arcgis.com/4.18/@arcgis/core/views/MapView.js";
  
  const map = new ArcGISMap({
    basemap: 'topo-vector'
  });
  
  const view = new MapView({
    container: 'viewDiv',
    map,
    zoom: 4,
    center: [-118, 34]
  });
</script>
```

- [demo](https://glitch.com/edit/#!/versed-lydian-promotion)

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
## Assets

> you need to copy the `@arcgis/core/assets` folder to your build directory

* for `webpack`, the `@arcgis/webpack-plugin` can do this for you.

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
## Assets

* a few ways to copy assets

* `ncp` - cross-platform copy tool

```json
// package.json
{
    "script": {
        "copy": "ncp ./node_modules/@arcgis/core/assets ./public/assets",
        "postinstall": "npm run copy"
    }
}
```

* webpack and rollup have copy plugins

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
## Assets

* Does your app use _routing_?
* App isn't hosted in the root of your domain

```js
import config from '@arcgis/core/config';
config.assetsPath = 'https://username.github.io/myrepo/dist/assets';
```

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
## Import Syntax

```js
// avoid this
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';

// only load what you need
import { buffer, intersect } from '@arcgis/core/geometry/geometryEngine';
```

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
## Import Syntax

```js
// avoid this
import * as watchUtils from '@arcgis/core/core/watchUtils';

// only load what you need
import { whenFalseOnce, whenDefined } from '@arcgis/core/core/watchUtils';
```

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-3.png" -->
## webpack

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
## webpack builds

```js
// webpack.config.js
const ArcGISPlugin = require('@arcgis/webpack-plugin');

module.exports = {
  ...
  plugins: [
    new ArcGISPlugin(),
    ...
  ]
};
```

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-3.png" -->
## rollup

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
## rollup builds

```js
// rollup.config.js
import commonjs from "@rollup/plugin-commonjs";
import del from "rollup-plugin-delete";
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/main.js",
  output: {
    chunkFileNames: "chunks/[name]-[hash].js",
    dir: "public",
    format: "es"
  },
  plugins: [
    del({ targets: "public/chunks", runOnce: true, verbose: true }),
    resolve(),
    commonjs()
  ],
  preserveEntrySignatures: false
};
```

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-3.png" -->
## snowpack

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
## snowpack builds

```js
// snowpack.config.js
module.exports = {
    mount: {
        // does not copy,
        // but prevents snowpack from trying to parse
        // worker and web assembly files
        "node_modules/@arcgis/core/assets": {
            url: "/assets", static: true,
            resolve: false
        },
        "src": "/",
    },
    plugins: [["@snowpack/plugin-webpack"]]
};
```

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-3.png" -->
## webpack module federation

* Dependency sharing
* Dynamically import code from another at runtime

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-3.png" -->
## Tip

* You may not want to copy assets folder.
* You can load assets from an external source
* _Make sure versions match_

```js
import config from '@arcgis/core/config';
config.assetsPath = 'https://cdn.jsdelivr.net/npm/arcgis-js-api@4.18.1/assets';
```

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-4.png" -->
## Summary

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-5.png" -->

![esri](../img/esri-science-logo-white.png "esri")

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/2021-feedback.jpg" -->
