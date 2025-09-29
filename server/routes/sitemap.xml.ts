// server/routes/sitemap.xml.ts
export default defineEventHandler((event) => {
  setHeader(event, 'Content-Type', 'application/xml; charset=UTF-8');

  const cfg = useRuntimeConfig();
  const base = (cfg.public?.siteUrl || 'https://mm-smart.eu').replace(
    /\/+$/,
    '',
  );

  // sem daj všetky dôležité stránky
  const routes = [
    { loc: '/', changefreq: 'weekly', priority: 0.8 },
    { loc: '/projects', changefreq: 'weekly', priority: 0.7 },
    { loc: '/contact', changefreq: 'monthly', priority: 0.5 },
  ];

  const lastmod = new Date().toISOString();

  const urls = routes
    .map(
      (r) => `
    <url>
      <loc>${base}${r.loc === '/' ? '' : r.loc}</loc>
      <changefreq>${r.changefreq}</changefreq>
      <priority>${r.priority}</priority>
      <lastmod>${lastmod}</lastmod>
    </url>`,
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
  http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${urls}
</urlset>`;
});
