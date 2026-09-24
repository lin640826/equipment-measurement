const CACHE='equipment-measurement-pwa-v1.0.21';
const ASSETS=['./index.html','./manifest.json','./html2canvas.min.js','./chuck-grid.css','./chuck-grid.js','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
const INDEX=new URL('./index.html',self.registration.scope).href;
const assetURLs=new Set(ASSETS.map(p=>new URL(p,self.registration.scope).href));
self.addEventListener('install',event=>{
 event.waitUntil((async()=>{const c=await caches.open(CACHE);await Promise.all(ASSETS.map(async p=>{const u=new URL(p,self.registration.scope);const r=await fetch(u,{cache:'reload'});if(!r.ok)throw new Error('Missing app asset');await c.put(u.href,r);}));await self.skipWaiting();})());
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{for(const k of await caches.keys()){if(k.startsWith('equipment-measurement-pwa-')&&k!==CACHE)await caches.delete(k);}await self.clients.claim();})());
});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);if(url.origin!==self.location.origin)return;
 if(event.request.mode==='navigate'){
  event.respondWith((async()=>{try{const r=await fetch(event.request,{cache:'no-cache'});if(!r.ok)throw new Error('Navigation failed');const c=await caches.open(CACHE);await c.put(INDEX,r.clone());return r;}catch(e){return (await caches.match(INDEX))||Response.error();}})());return;
 }
 const key=url.origin+url.pathname;if(!assetURLs.has(key))return;
 // Revalidate on each visit; offline falls back to this version's asset cache.
 event.respondWith((async()=>{const c=await caches.open(CACHE);try{const r=await fetch(event.request,{cache:'no-cache'});if(!r.ok)throw new Error('Asset failed');await c.put(key,r.clone());return r;}catch(e){return (await c.match(key))||Response.error();}})());
});
