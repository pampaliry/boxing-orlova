import { defineComponent, withAsyncContext, resolveComponent, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import { a1 as useRoute } from './server.mjs';
import { u as useCms } from './useCms-7GhnWyle.mjs';
import { u as useAsyncData } from './asyncData-CxrJO3Qe.mjs';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import '../_/nitro.mjs';
import 'node:events';
import 'consola';
import '@iconify/utils';
import 'node:crypto';
import 'ipx';
import 'vue-router';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { getPostBySlug } = useCms();
    const { data: post, pending } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "post",
      () => getPostBySlug(String(route.params.slug))
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_CmsRichText = resolveComponent("CmsRichText");
      if (unref(post)) {
        _push(`<article${ssrRenderAttrs(_attrs)}><h1>${ssrInterpolate(unref(post).title)}</h1>`);
        if ((_a = unref(post).hero) == null ? void 0 : _a.url) {
          _push(`<img${ssrRenderAttr("src", unref(post).hero.url)}${ssrRenderAttr("alt", unref(post).hero.alt || unref(post).title)}>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_CmsRichText, {
          html: unref(post).body
        }, null, _parent));
        _push(`</article>`);
      } else if (unref(pending)) {
        _push(`<p${ssrRenderAttrs(_attrs)}>Nacitavam...</p>`);
      } else {
        _push(`<p${ssrRenderAttrs(_attrs)}>Clanocek sa nenasiel.</p>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/posts/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-gsbXmi85.mjs.map
