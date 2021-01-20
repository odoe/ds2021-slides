<!-- .slide: data-background="img/2021/dev-summit/bg-1.png" data-background-size="cover -->
<h1 style="text-align: left; font-size: 80px;">Using TypeScript</h1>
<h2 style="text-align: left; font-size: 60px;">with the ArcGIS API for JavaScript</h2>
<p style="text-align: left; font-size: 30px;">Noah Sager | René Rubalcava</p>
<p style="text-align: left; font-size: 30px;"><a href="https://twitter.com/Noashx">@Noashx</a></p>
<p style="text-align: left; font-size: 30px;"><a href="https://twitter.com/odoenet">@odoenet</a></p>

---

<!-- .slide: data-auto-animate data-background="img/2021/dev-summit/bg-3.png" -->
## Agenda

- Development tooling & setup
- Working with the 4.x JS API
- Accessor, decorators, and advanced concepts

---

<!-- .slide: data-auto-animate data-background="img/2021/dev-summit/bg-4.png" -->
## Super quick TS intro

---

<!-- .slide: data-auto-animate data-background="img/2021/dev-summit/bg-2.png" -->
## Superset of JavaScript

- *Transpiles* to JavaScript
- ESNext features (import, =>, rest/spread, async/await, etc)
- Types
- Compatible with existing JavaScript

---

<!-- .slide: data-auto-animate data-background="img/2021/dev-summit/bg-2.png" -->
## Benefits of TypeScript

![TypeScript](using-typescript/images/typescript.jpg)
- Easier for multiple people to work on
- Easier to refactor
- Easier to test
- Can help prevent technical debt

---

<!-- .slide: data-auto-animate data-background="img/2021/dev-summit/bg-3.png" -->
## Development tooling

---

<!-- .slide: data-auto-animate data-background="img/2021/dev-summit/bg-2.png" -->
## Essentials

- typescript: `npm install --save-dev typescript`
- JS API 4.x typings: `npm install --save-dev @types/arcgis-js-api`
- JS API 3.x typings: `npm install --save-dev @types/arcgis-js-api@3`

---

<!-- .slide: data-auto-animate data-background="img/2021/dev-summit/bg-2.png" -->
## Recommended

- [Visual Studio Code](https://code.visualstudio.com/)
- tslint: `npm install --save-dev tslint`

---

<!-- .slide: data-auto-animate data-background="img/2021/dev-summit/bg-2.png" -->
## Setting Up

- [developers.arcgis.com/javascript/latest/guide/typescript-setup](https://developers.arcgis.com/javascript/latest/guide/typescript-setup/index.html)

---

<!-- .slide: data-auto-animate data-background="img/2021/dev-summit/bg-3.png" -->
## Working with the JavaScript API

---

<!-- .slide: data-auto-animate data-background="img/2021/dev-summit/bg-2.png" -->
## Imports

- Can use AMD or ESM build
- _Hint:_ use the ESM build
  - `import MapView from "@arcgis/core/views/MapView"`

---

<!-- .slide: data-auto-animate data-background="img/2021/dev-summit/bg-2.png" -->
## Auto-cast

- Due to nature of types, auto-cast does not type-check
  - `get` and `set` must have the same type
- Auto-casting is supported in constructor signatures only
  - Still helps in lots of cases
  - For setting properties, need to import the relevant modules

---

<!-- .slide: data-auto-animate data-background="img/2021/dev-summit/bg-2.png" -->
## Typing improvements

- Use of generics where possible `Collection<T>`
- Strictly type events (`MapView.on("mouse-wheel", ...)`))
- "Advanced" auto-casts like colors (`"red"`), screen sizes (`"5px"`) and basemaps `"streets"`

---

<!-- .slide: data-auto-animate data-background="img/2021/dev-summit/bg-3.png" -->
## Advanced API concepts

---

<!-- .slide: data-auto-animate data-background="img/2021/dev-summit/bg-2.png" -->
## Promises

- In 4.7, promises are more compatible with native promises
- Replaced `then` with `when` for `esri/core/Promise`
- Typings are more compatible (although not fully compatible)
- General advice is to wrap API promises in native if needed
  until JS API switches to native promises

---

<!-- .slide: data-auto-animate data-background="img/2021/dev-summit/bg-2.png" -->
## Writing Accessor based classes

- Can be useful to use Accessor based classes in your app
- Also required for creating custom API based widgets
- API classes are using dojo declare, requires some additional work to integrate with TS
- [Code](./demos/subclass)

---

<!-- .slide: data-auto-animate data-background="img/2021/dev-summit/bg-2.png" -->
## Multiple inheritance

- Multiple inheritance possible with dojo declare
- Supported in typescript at runtime and strictly type-checked
- Uses declaration merging
- [Code](./demos/subclass)

---

<!-- .slide: data-auto-animate data-background="img/2021/dev-summit/bg-2.png" -->
## Extending the API typings

- API typings are not always as strict as they can be
- In rare occasions typings are missing or imprecise
- Typings can be externally "patched" through declaration merging
- [Code](./demos/type-extensions)

---


<!-- .slide: data-auto-animate data-background="img/2021/dev-summit/bg-4.png" -->
## Summary

---

<!-- .slide: data-auto-animate data-background="img/2021/dev-summit/bg-5.png" -->

![esri](img/esri-science-logo-white.png "esri")