import { c as defineEventHandler, u as useRuntimeConfig, e as setResponseStatus, g as getQuery, f as getMethod, r as readRawBody } from '../../../_/nitro.mjs';
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

const ____path_ = defineEventHandler(async (event) => {
  var _a;
  const { CMS_API_URL, CMS_READONLY_TOKEN, CMS_MOCK } = useRuntimeConfig();
  const raw = (_a = event.context.params) == null ? void 0 : _a.path;
  const segs = Array.isArray(raw) ? raw : [raw || ""];
  const rel = segs.join("/");
  if (!rel.startsWith("api/")) {
    setResponseStatus(event, 403);
    return { error: "forbidden" };
  }
  const query = getQuery(event);
  const url = new URL(`${CMS_API_URL}/${rel}`);
  for (const [k, v] of Object.entries(query))
    url.searchParams.append(k, String(v));
  const method = getMethod(event);
  const body = method === "GET" || method === "HEAD" ? void 0 : await readRawBody(event);
  try {
    const data = await $fetch(url.toString(), {
      method,
      body,
      headers: CMS_READONLY_TOKEN ? { Authorization: `Bearer ${CMS_READONLY_TOKEN}` } : {},
      timeout: 5e3
    });
    return data;
  } catch (err) {
    const wantMock = CMS_MOCK === "1";
    const isGet = method === "GET";
    if (wantMock && isGet) return mockResponse(rel);
    setResponseStatus(event, 502);
    return { error: "cms_unavailable", detail: err.message };
  }
});
function mockResponse(rel, _q) {
  if (rel.startsWith("api/posts")) {
    return {
      docs: [
        {
          id: "m1",
          title: "Mock post 1",
          slug: "mock-post-1",
          body: "<p>Mock obsah 1</p>"
        },
        {
          id: "m2",
          title: "Mock post 2",
          slug: "mock-post-2",
          body: "<p>Mock obsah 2</p>"
        }
      ],
      totalDocs: 2,
      limit: 10,
      page: 1,
      totalPages: 1
    };
  }
  return { ok: true, mock: true, path: rel };
}

export { ____path_ as default };
//# sourceMappingURL=_...path_.mjs.map
