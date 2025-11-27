import { resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../_/nitro.mjs';
import { _ as _export_sfc } from './server.mjs';
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
import 'vue-router';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _imports_0 = publicAssetsURL("/videos/orlova.mp4");
const _imports_1 = publicAssetsURL("/imgs/optimized/logo-transparent-top/logo-transparent-top-1024.webp");
const _imports_2 = publicAssetsURL("/imgs/optimized/logo-transparent-top/logo-transparent-top-640.webp");
const _imports_3 = publicAssetsURL("/imgs/optimized/logo-transparent-top/logo-transparent-top-320.webp");
const _imports_4 = publicAssetsURL("/imgs/optimized/logo-transparent-top/logo-transparent-top.webp");
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_v_row = resolveComponent("v-row");
  const _component_v_col = resolveComponent("v-col");
  const _component_v_btn = resolveComponent("v-btn");
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "hero-video-section overlay" }, _attrs))} data-v-e92f19a8><video class="hero-video" autoplay muted loop playsinline data-v-e92f19a8><source${ssrRenderAttr("src", _imports_0)} type="video/mp4" data-v-e92f19a8></video><div class="overlay" data-v-e92f19a8></div><div class="content" data-v-e92f19a8><picture data-v-e92f19a8><source media="(min-width: 1024px)"${ssrRenderAttr("srcset", _imports_1)} type="image/webp" data-v-e92f19a8><source media="(min-width: 640px)"${ssrRenderAttr("srcset", _imports_2)} type="image/webp" data-v-e92f19a8><source media="(min-width: 320px)"${ssrRenderAttr("srcset", _imports_3)} type="image/webp" data-v-e92f19a8><img${ssrRenderAttr("src", _imports_4)} alt="Logo Box Club Orlov\xE1" class="logo" width="400" height="400" loading="lazy" decoding="async" data-v-e92f19a8></picture><h1 data-v-e92f19a8>Boxing Club Orlov\xE1</h1><p class="subtitle" data-v-e92f19a8> Nemus\xED\u0161 b\xFDt nejlep\u0161\xED. Sta\u010D\xED b\xFDt lep\u0161\xED ne\u017E v\u010Dera. </p>`);
  _push(ssrRenderComponent(_component_v_row, {
    justify: "center",
    class: "mb-4"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_v_col, {
          cols: "6",
          class: "d-flex justify-end"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_v_btn, {
                color: "white",
                variant: "outlined",
                class: "cta",
                size: "large",
                to: "/contact"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` Zeptej se `);
                  } else {
                    return [
                      createTextVNode(" Zeptej se ")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_v_btn, {
                  color: "white",
                  variant: "outlined",
                  class: "cta",
                  size: "large",
                  to: "/contact"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Zeptej se ")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_v_col, {
          cols: "6",
          class: "d-flex justify-start"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_v_btn, {
                color: "white",
                variant: "outlined",
                class: "cta",
                size: "large",
                to: "/trainings"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` Koukni Rozpis `);
                  } else {
                    return [
                      createTextVNode(" Koukni Rozpis ")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_v_btn, {
                  color: "white",
                  variant: "outlined",
                  class: "cta",
                  size: "large",
                  to: "/trainings"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Koukni Rozpis ")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_v_col, {
            cols: "6",
            class: "d-flex justify-end"
          }, {
            default: withCtx(() => [
              createVNode(_component_v_btn, {
                color: "white",
                variant: "outlined",
                class: "cta",
                size: "large",
                to: "/contact"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Zeptej se ")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_v_col, {
            cols: "6",
            class: "d-flex justify-start"
          }, {
            default: withCtx(() => [
              createVNode(_component_v_btn, {
                color: "white",
                variant: "outlined",
                class: "cta",
                size: "large",
                to: "/trainings"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Koukni Rozpis ")
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></section>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeroSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-e92f19a8"]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_HeroSection = __nuxt_component_0;
  _push(ssrRenderComponent(_component_HeroSection, _attrs, null, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-DOpZZ7Lw.mjs.map
