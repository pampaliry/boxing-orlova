import { _ as __nuxt_component_0 } from './nuxt-link-qtEGKEcM.mjs';
import { mergeProps, withCtx, createVNode, createTextVNode, defineComponent, ref, toDisplayString, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc, u as useHead, c as useRuntimeConfig } from './server.mjs';
import { V as VCard, a as VCardTitle, b as VCardText } from './VCard-BIOVXzFL.mjs';
import { V as VChip } from './VChip-_G5bhsis.mjs';
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
import './index-DL6waHdU.mjs';

const DEFAULT_WS = "wss://stream.binance.com:9443/ws/btcusdt@trade";
const width = 800;
const height = 180;
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "WebSocketBpm",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    useHead({
      title: "WS BPM \u2013 Live WebSocket demo",
      meta: [
        { name: "description", content: "\u017Div\xFD WebSocket graf s BPM hodnotou odvodenou z re\xE1lnych d\xE1t." }
      ]
    });
    const cfg = useRuntimeConfig();
    const configuredUrl = typeof ((_a = cfg.public) == null ? void 0 : _a.wsUrl) === "string" ? cfg.public.wsUrl.trim() : "";
    const wsUrl = ref(configuredUrl || DEFAULT_WS);
    const status = ref("disconnected");
    const bpm = ref(72);
    ref(72);
    const canvasRef = ref(null);
    ref(40);
    function shorten(s, head = 36, tail = 18) {
      if (s.length <= head + tail + 1) return s;
      return `${s.slice(0, head)}\u2026${s.slice(-tail)}`;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VCard, mergeProps({
        color: "",
        class: "pa-6",
        elevation: "8",
        role: "region",
        "aria-label": "Live WebSocket BPM"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardTitle, { class: "d-flex align-center justify-space-between flex-wrap" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-h5" data-v-10420312${_scopeId2}>WebSocket BPM (minimal)</span><div class="text-medium-emphasis" aria-live="polite" data-v-10420312${_scopeId2}>`);
                  _push3(ssrRenderComponent(VChip, {
                    color: status.value === "connected" ? "green" : status.value === "connecting" ? "orange" : status.value === "error" ? "red" : "grey",
                    size: "small",
                    class: "mr-2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(status.value)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(status.value), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (status.value !== "disconnected") {
                    _push3(`<span data-v-10420312${_scopeId2}><small data-v-10420312${_scopeId2}>WS: <code data-v-10420312${_scopeId2}>${ssrInterpolate(shorten(wsUrl.value))}</code></small></span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("span", { class: "text-h5" }, "WebSocket BPM (minimal)"),
                    createVNode("div", {
                      class: "text-medium-emphasis",
                      "aria-live": "polite"
                    }, [
                      createVNode(VChip, {
                        color: status.value === "connected" ? "green" : status.value === "connecting" ? "orange" : status.value === "error" ? "red" : "grey",
                        size: "small",
                        class: "mr-2"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(status.value), 1)
                        ]),
                        _: 1
                      }, 8, ["color"]),
                      status.value !== "disconnected" ? (openBlock(), createBlock("span", { key: 0 }, [
                        createVNode("small", null, [
                          createTextVNode("WS: "),
                          createVNode("code", null, toDisplayString(shorten(wsUrl.value)), 1)
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardText, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="d-flex align-center mb-4" data-v-10420312${_scopeId2}><strong data-v-10420312${_scopeId2}>BPM:</strong>`);
                  _push3(ssrRenderComponent(VChip, {
                    size: "small",
                    color: "primary",
                    class: "ml-2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(Math.round(bpm.value))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(Math.round(bpm.value)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="chart-wrap" role="img" aria-label="Historick\xFD priebeh BPM z WebSocketu" data-v-10420312${_scopeId2}><canvas class="chart"${ssrRenderAttr("width", width)}${ssrRenderAttr("height", height)} data-v-10420312${_scopeId2}></canvas></div>`);
                } else {
                  return [
                    createVNode("div", { class: "d-flex align-center mb-4" }, [
                      createVNode("strong", null, "BPM:"),
                      createVNode(VChip, {
                        size: "small",
                        color: "primary",
                        class: "ml-2"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(Math.round(bpm.value)), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", {
                      class: "chart-wrap",
                      role: "img",
                      "aria-label": "Historick\xFD priebeh BPM z WebSocketu"
                    }, [
                      createVNode("canvas", {
                        ref_key: "canvasRef",
                        ref: canvasRef,
                        class: "chart",
                        width,
                        height
                      }, null, 512)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCardTitle, { class: "d-flex align-center justify-space-between flex-wrap" }, {
                default: withCtx(() => [
                  createVNode("span", { class: "text-h5" }, "WebSocket BPM (minimal)"),
                  createVNode("div", {
                    class: "text-medium-emphasis",
                    "aria-live": "polite"
                  }, [
                    createVNode(VChip, {
                      color: status.value === "connected" ? "green" : status.value === "connecting" ? "orange" : status.value === "error" ? "red" : "grey",
                      size: "small",
                      class: "mr-2"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(status.value), 1)
                      ]),
                      _: 1
                    }, 8, ["color"]),
                    status.value !== "disconnected" ? (openBlock(), createBlock("span", { key: 0 }, [
                      createVNode("small", null, [
                        createTextVNode("WS: "),
                        createVNode("code", null, toDisplayString(shorten(wsUrl.value)), 1)
                      ])
                    ])) : createCommentVNode("", true)
                  ])
                ]),
                _: 1
              }),
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "d-flex align-center mb-4" }, [
                    createVNode("strong", null, "BPM:"),
                    createVNode(VChip, {
                      size: "small",
                      color: "primary",
                      class: "ml-2"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(Math.round(bpm.value)), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", {
                    class: "chart-wrap",
                    role: "img",
                    "aria-label": "Historick\xFD priebeh BPM z WebSocketu"
                  }, [
                    createVNode("canvas", {
                      ref_key: "canvasRef",
                      ref: canvasRef,
                      class: "chart",
                      width,
                      height
                    }, null, 512)
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/WebSocketBpm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-10420312"]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0;
  const _component_web_socket_bpm = __nuxt_component_1;
  _push(ssrRenderComponent(VCard, mergeProps({
    class: "pa-8",
    elevation: "10",
    "aria-label": "Zoznam projektov"
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VCardTitle, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<h1 class="text-center"${_scopeId2}> Moje Projekty </h1>`);
            } else {
              return [
                createVNode("h1", { class: "text-center" }, " Moje Projekty ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VCardText, { class: "" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_NuxtLink, {
                href: "http://www.umy-ma.sk",
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": "Otvori\u0165 projekt umy-ma.sk v novom okne"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` umy-ma.sk `);
                  } else {
                    return [
                      createTextVNode(" umy-ma.sk ")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_NuxtLink, {
                  href: "http://www.umy-ma.sk",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "aria-label": "Otvori\u0165 projekt umy-ma.sk v novom okne"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" umy-ma.sk ")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_web_socket_bpm, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(VCardTitle, null, {
            default: withCtx(() => [
              createVNode("h1", { class: "text-center" }, " Moje Projekty ")
            ]),
            _: 1
          }),
          createVNode(VCardText, { class: "" }, {
            default: withCtx(() => [
              createVNode(_component_NuxtLink, {
                href: "http://www.umy-ma.sk",
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": "Otvori\u0165 projekt umy-ma.sk v novom okne"
              }, {
                default: withCtx(() => [
                  createTextVNode(" umy-ma.sk ")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_web_socket_bpm)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/projects.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const projects = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { projects as default };
//# sourceMappingURL=projects-RmrluQW_.mjs.map
