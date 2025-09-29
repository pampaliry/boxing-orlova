function useCms() {
  async function listPosts(params) {
    return $fetch("/api/cms/api/posts", { query: params });
  }
  async function getPostBySlug(slug) {
    const res = await $fetch("/api/cms/api/posts", {
      query: { where: { slug: { equals: slug } }, limit: 1, depth: 2 }
    });
    return res.docs[0] || null;
  }
  async function cms(path, params) {
    return $fetch(`/api/cms/${path}`, { query: params });
  }
  return { listPosts, getPostBySlug, cms };
}

export { useCms as u };
//# sourceMappingURL=useCms-7GhnWyle.mjs.map
