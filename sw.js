/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-afac4cd2'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "ugc-net-sociology-standalone.html",
    "revision": "3b8bcc1efda2b092db7ab39bc7915bac"
  }, {
    "url": "registerSW.js",
    "revision": "402b66900e731ca748771b6fc5e7a068"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "c400bbe4f870a1324a06964c1f4a6eac"
  }, {
    "url": "pwa-512x512.png",
    "revision": "dcc6e45db6c485cbef3546a97c62d5a4"
  }, {
    "url": "pwa-192x192.png",
    "revision": "0b6a400c796effc5200fb79f2ab307a5"
  }, {
    "url": "index.html",
    "revision": "9094042fe06c5059ab2fa07c5bf38470"
  }, {
    "url": "icon.svg",
    "revision": "42e1dcadc96444962792bcb6303ac684"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "26c022c8f3502f823a4e3bd337ae5aa2"
  }, {
    "url": "assets/index-DKqJNUst.css",
    "revision": null
  }, {
    "url": "assets/index-C3EGACCk.js",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "26c022c8f3502f823a4e3bd337ae5aa2"
  }, {
    "url": "icon.svg",
    "revision": "42e1dcadc96444962792bcb6303ac684"
  }, {
    "url": "pwa-192x192.png",
    "revision": "0b6a400c796effc5200fb79f2ab307a5"
  }, {
    "url": "pwa-512x512.png",
    "revision": "dcc6e45db6c485cbef3546a97c62d5a4"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "c400bbe4f870a1324a06964c1f4a6eac"
  }, {
    "url": "manifest.webmanifest",
    "revision": "6fc8cc198133be01bb741ba253483b0d"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "google-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "gstatic-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
