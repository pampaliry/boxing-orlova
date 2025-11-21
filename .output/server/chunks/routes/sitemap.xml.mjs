import { d as defineEventHandler, f as setHeader, b as useRuntimeConfig } from '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'vue';
import 'consola';
import 'node:fs';
import 'node:url';
import '@iconify/utils';
import 'node:crypto';
import 'ipx';
import 'node:path';

const sitemap_xml = defineEventHandler((event) => {
  var _a;
  setHeader(event, "Content-Type", "application/xml; charset=UTF-8");
  const cfg = useRuntimeConfig();
  const base = (((_a = cfg.public) == null ? void 0 : _a.siteUrl) || "https://mm-smart.eu").replace(
    /\/+$/,
    ""
  );
  const routes = [
    { loc: "/", changefreq: "weekly", priority: 0.8 },
    { loc: "/projects", changefreq: "weekly", priority: 0.7 },
    { loc: "/contact", changefreq: "monthly", priority: 0.5 }
  ];
  const lastmod = (/* @__PURE__ */ new Date()).toISOString();
  const urls = routes.map(
    (r) => `
    <url>
      <loc>${base}${r.loc === "/" ? "" : r.loc}</loc>
      <changefreq>${r.changefreq}</changefreq>
      <priority>${r.priority}</priority>
      <lastmod>${lastmod}</lastmod>
    </url>`
  ).join("");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
  http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${urls}
</urlset>`;
});

export { sitemap_xml as default };
//# sourceMappingURL=sitemap.xml.mjs.map
