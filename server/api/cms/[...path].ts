import {
  defineEventHandler,
  getQuery,
  readRawBody,
  setResponseStatus,
} from 'h3';

export default defineEventHandler(async (event) => {
  const { CMS_API_URL, CMS_READONLY_TOKEN, CMS_MOCK } = useRuntimeConfig();
  const raw = event.context.params?.path;
  const segs = Array.isArray(raw) ? raw : [raw || ''];
  const rel = segs.join('/'); // napr. "api/posts"

  if (!rel.startsWith('api/')) {
    setResponseStatus(event, 403);
    return { error: 'forbidden' };
  }

  const query = getQuery(event);
  const url = new URL(`${CMS_API_URL}/${rel}`);
  for (const [k, v] of Object.entries(query))
    url.searchParams.append(k, String(v));

  const method = getMethod(event);
  const body =
    method === 'GET' || method === 'HEAD'
      ? undefined
      : await readRawBody(event);

  try {
    const data = await $fetch(url.toString(), {
      method,
      body,
      headers: CMS_READONLY_TOKEN
        ? { Authorization: `Bearer ${CMS_READONLY_TOKEN}` }
        : {},
      timeout: 5000,
    });
    return data;
  } catch (err) {
    const wantMock = CMS_MOCK === '1';
    const isGet = method === 'GET';
    if (wantMock && isGet) return mockResponse(rel, query);
    setResponseStatus(event, 502);
    return { error: 'cms_unavailable', detail: (err as Error).message };
  }
});

function mockResponse(rel: string, _q: Record<string, any>) {
  if (rel.startsWith('api/posts')) {
    return {
      docs: [
        {
          id: 'm1',
          title: 'Mock post 1',
          slug: 'mock-post-1',
          body: '<p>Mock obsah 1</p>',
        },
        {
          id: 'm2',
          title: 'Mock post 2',
          slug: 'mock-post-2',
          body: '<p>Mock obsah 2</p>',
        },
      ],
      totalDocs: 2,
      limit: 10,
      page: 1,
      totalPages: 1,
    };
  }
  return { ok: true, mock: true, path: rel };
}
