/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

workbox.core.skipWaiting();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "db.json",
    "revision": "5e8c312f5216a847617ce2bf8074613f"
  },
  {
    "url": "index.html",
    "revision": "d547906e5f0ded71d3665431c15149bf"
  },
  {
    "url": "manifest.json",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "src/app.js",
    "revision": "e071ece9cadf9c0d9a86aab0e40a14b8"
  },
  {
    "url": "src/components/list/list.js",
    "revision": "3362aba760c3f37c3a314147d0e52a98"
  },
  {
    "url": "src/connection.js",
    "revision": "00ea9cd9cc709849fd512d0f1db41401"
  },
  {
    "url": "src/helpers/uuidv4.js",
    "revision": "78580aa7ac73107c867919735ed7e11f"
  },
  {
    "url": "styles/main.css",
    "revision": "bc67d9052d6441ba583711ffd896e84b"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(?:png|gif|jpg|jpeg|svg)$/, new workbox.strategies.CacheFirst({ "cacheName":"images", plugins: [] }), 'GET');
