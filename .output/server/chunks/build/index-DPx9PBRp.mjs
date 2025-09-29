import { _ as __nuxt_component_0 } from './nuxt-link-D1AOlsF7.mjs';
import { defineComponent, withAsyncContext, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useCms } from './useCms-7GhnWyle.mjs';
import { u as useAsyncData } from './asyncData-CxrJO3Qe.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'consola';
import 'node:fs';
import 'node:url';
import '@iconify/utils';
import 'node:crypto';
import 'ipx';
import 'node:path';
import './server.mjs';
import 'node:zlib';
import 'node:stream';
import 'node:util';
import 'node:net';
import 'vue-router';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { listPosts } = useCms();
    const { data: posts, pending, error } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "posts",
      () => listPosts({ limit: 3, depth: 1 })
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(_attrs)}><h1>Posledne clanky</h1>`);
      if ((_b = (_a = unref(posts)) == null ? void 0 : _a.docs) == null ? void 0 : _b.length) {
        _push(`<ul><!--[-->`);
        ssrRenderList(unref(posts).docs, (p) => {
          _push(`<li>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/posts/${p.slug}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(p.title)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(p.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul>`);
      } else if (unref(pending)) {
        _push(`<p>Nacitavam...</p>`);
      } else if (unref(error)) {
        _push(`<p>Nastala chyba: ${ssrInterpolate(unref(error).message)}</p>`);
      } else {
        _push(`<p>Nic tu nie je.</p>`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DPx9PBRp.mjs.map
