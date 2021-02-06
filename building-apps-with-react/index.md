<!-- .slide: data-background="../img/2021/dev-summit/bg-1.png" data-background-size="cover -->
<h1 style="text-align: left; font-size: 80px;">ArcGIS API for JavaScript:</h1>
<h2 style="text-align: left; font-size: 60px;">Building Apps with React</h2>
<p>
<span style="text-align: center; font-size: 30px; margin: 1em;">Tom Wayson</span>
<span style="text-align: right; font-size: 30px; margin: 1em;">René Rubalcava</span>
</p>
<p>
<span style="text-align: center; font-size: 30px; margin: 1em;"><a href="https://github.com/tomwayson">@tomwayson</a></span>
<span style="text-align: right; font-size: 30px; margin: 1em;"><a href="https://github.com/odoenet">@odoenet</a></span>
</p>

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-4.png" -->
## Good News

This is easier than ever!

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-4.png" -->

> It just works

<p style="text-align: right;"><small>Tom, Dec 2020</small></p>

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-3.png" -->
## [@esri/react-arcgis](https://github.com/Esri/react-arcgis)

```jsx
<WebMap id="6627e1dd5f594160ac60f9dfc411673f" />
```

<a href="https://github.com/Esri/react-arcgis"><img src="./images/react-arcgis-screenshot.png" width="400" /></a>

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
### Ready to use components

```js
import { Map, Scene, WebMap, WebScene } from '@esri/react-arcgis';
```

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
### WebMaps and WebScenes

```jsx
<WebMap id={itemId} />
```

<small>or</small>

```jsx
<WebScene id={itemId} />
```

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
### Maps and Views

```js
const mapProps = { basemap: "topo" };
const viewProps = {
    center: [-122.4443, 47.2529],
    zoom: 6
};
```

```jsx
<Map mapProperties={mapProps} viewProperties={viewProps} />
```

<small>or</small>

```jsx
<Scene mapProperties={mapProps} viewProperties={viewProps}  />
```

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
### [Custom Components](https://github.com/Esri/react-arcgis#creating-your-own-components)

```jsx
<Scene class="full-screen-map">
  <BermudaTriangle />
</Scene>
```

[![Custom component screenshot](./images/react-arcgis-custom-component-screenshot.jpg)](https://github.com/Esri/react-arcgis#creating-your-own-components)

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-3.png" -->

## Creating Your Own Components

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-4.png" -->

### Useful Component Concepts

- refs
- side effects
- props/state
- callbacks

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->

### Creating a Map View

1. container (`<div id="map"></div>`)
1. map properties (`basemap: 'topo-vector'`)
1. view properties (`zoom: 8`)

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->

### Creating a Map View (no React)

```js
const container = document.getElementById('map');
const map = new ArcGISMap({
  basemap: 'topo-vector'
});
const view = new MapView({
  container,
  map,
  center: [-118, 34],
  zoom: 8
});
```

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->

### Creating a Map View in React

1. render container node
1. _then_ create map view as a side effect

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
### Use a [ref](https://reactjs.org/docs/refs-and-the-dom.html) for the `container`

```js
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  render() {
    return (
      <div className="webmap" ref={this.mapRef} />
    );
  }
```

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
### Create `Map` & `View` as a [Side Effect](https://reactjs.org/docs/react-component.html#componentdidmount)

```js
  componentDidMount() {
    const container = this.mapRef.current;
    const map = new ArcGISMap({
      basemap: 'topo-vector'
    });
    this.view = new MapView({
      container,
      map,
      center: [-118, 34],
      zoom: 8
    });
  }
```

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
### Clean up in [`componentWillUnmount()`](https://reactjs.org/docs/react-component.html#componentwillunmount)

```js
  componentWillUnmount() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }
```

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-3.png" -->
### Function Components

```jsx
const NameTag = (props) => { <p>{props.name}</p> }
```

```jsx
<NameTag name="Tom" />
```

<ul class="fragment">
  <li>no way to create refs
  <li>no side effects
  <li>no state
</ul>

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-4.png" -->
### React hooks

* `useRef()`
* `useEffect()`
* `useState()`

and [more](https://reactjs.org/docs/hooks-intro.html)!

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
### `useRef` for the `container`

```jsx
import React, { useRef, useEffect } from 'react';

export const WebMapView = () => {
  const mapRef = useRef();

  return <div className="webmap" ref={mapRef} />;
};
```

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
### `useEffect`

Replaces some class lifecycle methods... mostly
* `componentDidMount`
* `componentDidUpdate`
* `componentWillUnmount`

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
### `useEffect` to create map and view

```jsx
  const mapRef = useRef();
  useEffect(
    () => {
      // create map and view
      const map = new ArcGISMap({
        basemap: 'topo-vector'
      });
      const mapView = new MapView({
        container: mapRef.current,
        map: map,
        center: [-118, 34],
        zoom: 8
      });
      return () => {
        // destroy the map view
        mapView && mapView.container = null;
      };
    }
  , []); // componentDidMount & componentWillUnmount
```

... and clean up

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
### `useState`

Manage local state

```ts
const [ready, setReady] = useState(false);
// later, maybe after map loads
setReady(true);
```

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
### Hold onto view in state

```ts
const [view, setView] = useState(null);
// later in useEffect()
setView(mapView);
```

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
### "Bind" view/map properties to props/state

Then use another effect to relay changes in props/state

```jsx
  useEffect(() => {
    if (!view) {
      return;
    }
    view.zoom = zoom;
  }, [view, zoom]); // componentDidUpdate
```

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-3.png" -->
### 🎉 Success! 🎉

<p>✅ created a map using a <code>ref</code> to React generated DOM</p>
<p>✅ only destroy <code>MapView</code> when unmounting</p>
<p>✅ relay changes in <code>props</code> (or <code>state</code>) to map/view</p>
<p class="fragment">🤔 Relay changes or events from map/view to React?</p>

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
### Use another effect to wire up a callback

```jsx
  useEffect(() => {
    if (!view) {
      return;
    }
    const handle = view.on('click', callback);
    return function removeHandle() {
      handle.remove();
    };
  }, [view, callback]); // componentDidUpdate
```

use clean-up functions to remove event & watch handlers

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
### Components

A bridge between React and ArcGIS

<ul style="list-style: none">
  <li>✅ use a `ref` to get the view's `container`</li>
  <li>✅ send React `props` & `state` to map & view properties</li>
  <li>✅ send changes and events from ArcGIS to React via callbacks</li>
</li>

<small class="fragment">... class-based or hooks 🙂</small>

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-4.png" -->
## Modern React and the ArcGIS API

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
### Manage global state in React

* You may not need Redux/MobX
* Context is powerful, and injectable

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
### `useContext` hook

```jsx
import ThemeContext from '.ThemeContext';

const ThemedMap = () => {
  const theme = useContext(ThemeContext);
  const basemap = theme === 'dark'
    ? 'dark-gray'
    : 'gray';
  return (
    <Map basemap={basemap} />
  );
};
```

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-4.png" -->
## Modularize API usage

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
* Do all the API work separate from your UI
* _Separate content from navigation_ - pattern in PWAs
* Mock/stub API in tests

```ts
// src/data/map.ts
export function initialize(element: Element) {
  view.container = element;
  view.when(() => {
    // magic
  });
}
```

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
* Use in your context or component

```ts
const elRef = useRef(null);
useEffect(
  () => {
    const loadMap = async () => {
      const map = await import("../data/map");
      map.initialize(elRef.current);
    };
    loadMap();
  },
  []
);
```

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
## Why lazy load the API?

* So webpack can create async bundles
* `bundle1.js` -> `bundle2.js` -> `bundle3.js`
* Only load the resources you need when you need them
* Leads to faster initial loads

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-4.png" -->
## Suspense

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
## Hold your Suspense

* Lazy-load entire React components
* useful in modular apps

```tsx
import React, { lazy, Suspense } from "react";
// lazy load the components that use Maps
const WebMapView = lazy(() => import("../components/WebMapView"));
// later on
<Suspense  fallback={<div>Loading...</div>}>
  <WebMapView />
</Suspense>
```

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
## Hold your Suspense

* Still not out of beta, so use at your own risk


---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-3.png" -->
##  Demo: [React with ESM](https://github.com/odoe/jsapi-esm-react)

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
## 😎 [@arcgis/core](https://npmjs.com/package/@arcgis/core) 👍

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
## Popular React Tools & Frameworks

<table class="clis">
  <tbody>
    <tr>
      <td>
        <a href="https://github.com/facebook/create-react-app">
          <img src="./images/react-js-img.png" width="240" class="transparent" />
          <p>create-react-app</p>
        </a>
      </td>
      <td>
        <a href="https://nextjs.org/">
          <img style="margin: 80px 0" src="./images/nextjs-white-logo.svg" width="240" class="transparent" />
          <p>Next.js</p>
        </a>
      </td>
      <td>
        <a href="https://www.gatsbyjs.org/">
          <img src="./images/gatsby-logo.png" width="240" class="transparent" />
          <p>Gatsby</p>
        </a>
      </td>
    </tr>
  </tbody>
</table>
<p class="fragment">All insulate you from 😱 of webpack config</p>

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
<p>👵 ArcGIS API 3.x? 👴</p>
<p>🚀 CLI blocks access to webpack config? 🔒</p>
<p>🙈 Don't _want_ to config webpack? 😱</p>
<div class="fragment">
  <p>No problem. Try [esri-loader](https://github.com/Esri/esri-loader)</p>
  <img src="./images/esri-loader-band-aid-center-text.png" class="transparent" height="120" />
</div>

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
### Works with ArcGIS API [3.x](https://developers.arcgis.com/javascript/3/) <span class="fragment" data-fragment-index="1">_and_ 4.x</span>

<div>
  <img src="./images/esri.png" class="transparent" height="120" />
  <img src="./images/esri.png" class="transparent" height="120" />
  <img src="./images/esri.png" class="transparent" height="120" />
  <img src="./images/esri.png" class="transparent fragment"  data-fragment-index="1" height="120" />
</div>

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
### Works with _any_ React tool / library / framework

<div>
  <img src="./images/esri.png" class="transparent" height="120" />
  <img src="./images/Heart_corazon.svg" class="transparent" height="120" />
  <img src="./images/react-js-img.png" class="transparent" height="120" />
  <img src="./images/redux-logo.svg" class="transparent" height="120" />
  <img src="./images/nextjs-white-logo.svg" class="transparent" height="100" />
  <img src="./images/gatsby-logo.png" class="transparent" height="120" />
</div>

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
### BTW... <span class="fragment" data-fragment-index="1">Not _just_ for Webpack & React</span>

<div class="fragment" data-fragment-index="1">
  <img src="./images/webpack-icon-square-big.png" class="transparent" height="120" />
  <img src="./images/react-js-img.png" class="transparent" height="120" />
</div>

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
### Works with _any_ module loader

<div>
  <img src="./images/esri.png" class="transparent" height="120" />
  <img src="./images/Heart_corazon.svg" class="transparent" height="120" />
  <img src="./images/webpack-icon-square-big.png" class="transparent" height="120" />
  <img src="./images/rollup1.png" class="transparent" height="100" />
  <img src="./images/parcel-og.png" class="transparent" height="140" />
</div>

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
### Works with _any_ framework

<div>
  <img src="./images/esri.png" class="transparent" height="120" />
  <img src="./images/Heart_corazon.svg" class="transparent" height="120" />
  <img src="./images/tomster-sm.png" class="transparent" height="120" />
  <img src="./images/angular.png" class="transparent" height="120" />
  <img src="./images/vue-logo.png" class="transparent" height="120" />
  <img src="./images/react-js-img.png" class="transparent" height="120" />
  <img src="./images/Dojo-New.png" class="transparent" height="120" />
</div>

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
### Installing [esri-loader](https://github.com/Esri/esri-loader#install)

<img class="transparent" src="./images/800px-Npm-logo.svg.png" style="width: 300px; margin: 110px 0;">
<h3><code>npm install --save esri-loader</code></h3>

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
### Installing [esri-loader](https://github.com/Esri/esri-loader#install)

<img class="transparent" src="./images/yarn-cat-eating-bower-bird.png">
<h3><code>yarn add esri-loader</code></h3>

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
### Using [`loadModules()`](https://github.com/Esri/esri-loader#usage)

```js
import { loadModules } from 'esri-loader';

loadModules([
  "esri/Map",
  "esri/views/MapView"
]).then(([Map, MapView]) => {
  // Code to create the map and view will go here
});
```

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
### Look [familiar](https://developers.arcgis.com/javascript/latest/sample-code/intro-mapview/index.html)?

```js
// this is what loadModules() does under the hood

require([
  "esri/Map",
  "esri/views/MapView"
], function(Map, MapView) {
  // Code to create the map and view will go here
});
```

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
### [Lazy loads the ArcGIS API](https://github.com/Esri/esri-loader#lazy-loading-the-arcgis-api-for-javascript) by default

```js
 // loads API 1st time
const esriConfig = await loadModules(["esri/config"])
esriConfig.useIdentity = false;
// don't worry, this won't load the API again!
const [Map, MapView] = await loadModules(
  ["esri/Map", "esri/views/MapView"]
);
```

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
### Additional options & patterns

See the esri-loader docs for examples of:
- [Using a specific version of the ArcGIS API](https://github.com/Esri/esri-loader#from-a-specific-version)
- [configuring Dojo](https://github.com/Esri/esri-loader#configuring-dojo)
- [using ArcGIS types in TS](https://github.com/Esri/esri-loader#arcgis-types)
- and [more](https://github.com/Esri/esri-loader#advanced-usage)

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
### [esri-loader-hooks](https://github.com/tomwayson/esri-loader-hooks#usewebmap)

```jsx
import React from 'react';
import { useWebMap } from 'esri-loader-hooks';

function WebMap() {
  const [ref] = useWebMap('e691172598f04ea8881cd2a4adaa45ba');
  return <div style={{ height: 400 }} ref={ref} />;
}
```

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-3.png" -->
### Example: [esri-loader-hooks](https://esri-loader-hooks.netlify.com/)

<a href="https://esri-loader-hooks.netlify.com/"><img src="./images/esri-loader-hooks-screenshot.png" height="400"></a>

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-3.png" -->
## Example: Create ArcGIS App

<a href="https://create-arcgis-app.surge.sh/"><img width="852" src="./images/create-arcgis-app-screenshot.png" /></a>

[create-arcgis-app](https://github.com/tomwayson/create-arcgis-app)

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-3.png" -->
## Example: Next ArcGIS App

<a href="https://next-arcgis-app.now.sh/"><img width="680" src="./images/next-arcgis-app-screenshot.png" /></a>

[next-arcgis-app](https://github.com/tomwayson/next-arcgis-app)

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" -->
## Conclusion

<div>
  <img src="./images/esri.png" class="transparent" height="120" />
  <img src="./images/Heart_corazon.svg" class="transparent" height="120" />
  <img src="./images/webpack-icon-square-big.png" class="transparent" height="120" />
  <img src="./images/react-js-img.png" class="transparent" height="120" />
</div>

Note:
It's never been a better time to be a React dev
It's never been a better time to be a ArcGIS dev
Go forth and prosper

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-4.png" -->
## Summary

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-5.png" -->

![esri](../img/esri-science-logo-white.png "esri")

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/2021-feedback.jpg" -->
