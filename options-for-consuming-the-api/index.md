<!-- .slide: data-background="../img/2021/dev-summit/bg-1.png" data-background-size="cover -->
<h1 style="text-align: left; font-size: 80px;">ArcGIS API for JavaScript:</h1>
<h2 style="text-align: left; font-size: 60px;">Options for Consuming the API</h2>
<p>
<span style="text-align: left; font-size: 30px; margin: 1em;">Andy Gup</span>
<span style="text-align: center; font-size: 30px; margin: 1em;">Tom Wayson</span>
<span style="text-align: right; font-size: 30px; margin: 1em;">René Rubalcava</span>
</p>
<p>
<span style="text-align: left; font-size: 30px; margin: 1em;"><a href="https://github.com/agup">@agup</a></span>
<span style="text-align: center; font-size: 30px; margin: 1em;"><a href="https://github.com/tomwayson">@tomwayson</a></span>
<span style="text-align: right; font-size: 30px; margin: 1em;"><a href="https://github.com/odoenet">@odoenet</a></span>
</p>

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-3.png" data-transition="fade" -->
## Intro/Agenda Slide

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" data-transition="fade" -->
## Basic Slide

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-4.png" data-transition="fade" -->
## Demo Slide

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-3.png" data-transition="fade" -->
## ESM

- Standard Module System for JavaScript
- Better support in modern build tooling

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" data-transition="fade" -->
## Getting Started

```sh
npm i @arcgis/core
```

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" data-transition="fade" -->
## Usage

```js
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/MapView';
```

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" data-transition="fade" -->
## Migrate from AMD/CDN

- AMD

```diff
- import WebMap from 'esri/WebMap';
- import MapView from 'esri/MapView';
+ import WebMap from '@arcgis/core/WebMap';
+ import MapView from '@arcgis/core/MapView';
```

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" data-transition="fade" -->
## Migrate from AMD/CDN

- CDN

```diff
- require([
-     'esri/WebMap',
-     'esri/MapView'
- ], function(WebMap, MapView) {
-     ...
- });
+ import WebMap from '@arcgis/core/WebMap';
+ import MapView from '@arcgis/core/MapView';
```

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" data-transition="fade" -->
## npm and build tools

- Benefits
    - customized local build
    - total JS between 400KB to 2MB
    - depends on your application

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" data-transition="fade" -->
## ESM CDN

- _Testing purposes only_
- I'm serious, listen to me

```html
<script type="module">
    import ArcGISMap from "https://js.arcgis.com/4.18/@arcgis/core/Map.js";
    import MapView from "https://js.arcgis.com/4.18/@arcgis/core/views/MapView.js";

    const map = new ArcGISMap({
        basemap: "topo-vector"
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 4,
        center: [-118, 34]
    });
</script>
```

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-2.png" data-transition="fade" -->
## ESM CDN

- Too many files requested for real-world use
- Convenience for prototyping
- _Please use a build tool_

---

<!-- .slide: data-auto-animate data-background="../img/2021/dev-summit/bg-5.png" -->

![esri](../img/esri-science-logo-white.png "esri")