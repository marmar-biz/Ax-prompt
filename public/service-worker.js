// Minimal SW
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>clients.claim());
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET')return;
  e.respondWith((async()=>{
    const c=await caches.open('static-v1');
    const m=await c.match(r); if(m) return m;
    const res=await fetch(r);
    if(r.url.includes('/_next/static/')||r.url.includes('/icons/')) c.put(r,res.clone());
    return res;
  })());
});
