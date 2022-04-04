/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

/*
    dependencies
*/

import { precacheAndRoute } from 'workbox-precaching'
import {registerRoute} from 'workbox-routing';
import {StaleWhileRevalidate} from 'workbox-strategies';
import {CacheFirst} from 'workbox-strategies';
import {NetworkFirst} from 'workbox-strategies';

/*
    config
*/

// Use with precache injection
precacheAndRoute(self.__WB_MANIFEST)

/*
    Cashe strategy
*/


registerRoute(({url}) =>  {
    url.pathname.startsWith('/favicon.ico')
    url.pathname.startsWith('/storage')
    url.pathname.startsWith('/icons/')
    url.pathname.startsWith( '/css/')
    url.pathname.startsWith( '/img/')
    url.pathname.startsWith( '/js/')
    url.pathname.startsWith( '/fonts/')
}, new CacheFirst());

registerRoute(
    ({url}) => url.pathname.startsWith('/api'),
    new NetworkFirst()
  );



registerRoute(({url}) => url.href.startsWith('http'), new StaleWhileRevalidate());

