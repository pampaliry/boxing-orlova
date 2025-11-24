import { defineComponent, ref, resolveComponent, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, mergeProps, useAttrs, computed, unref, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc, m as __nuxt_component_1, i as useImage, p as parseSize, u as useHead, b as useNuxtApp } from './server.mjs';
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
import 'vue-router';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const baseImageProps = {
  // input source
  src: { type: String, required: false },
  // modifiers
  format: { type: String, required: false },
  quality: { type: [Number, String], required: false },
  background: { type: String, required: false },
  fit: { type: String, required: false },
  modifiers: { type: Object, required: false },
  // options
  preset: { type: String, required: false },
  provider: { type: String, required: false },
  sizes: { type: [Object, String], required: false },
  densities: { type: String, required: false },
  preload: {
    type: [Boolean, Object],
    required: false
  },
  // <img> attributes
  width: { type: [String, Number], required: false },
  height: { type: [String, Number], required: false },
  alt: { type: String, required: false },
  referrerpolicy: { type: String, required: false },
  usemap: { type: String, required: false },
  longdesc: { type: String, required: false },
  ismap: { type: Boolean, required: false },
  loading: {
    type: String,
    required: false,
    validator: (val) => ["lazy", "eager"].includes(val)
  },
  crossorigin: {
    type: [Boolean, String],
    required: false,
    validator: (val) => ["anonymous", "use-credentials", "", true, false].includes(val)
  },
  decoding: {
    type: String,
    required: false,
    validator: (val) => ["async", "auto", "sync"].includes(val)
  },
  // csp
  nonce: { type: [String], required: false }
};
const useBaseImage = (props) => {
  const options = computed(() => {
    return {
      provider: props.provider,
      preset: props.preset
    };
  });
  const attrs = computed(() => {
    return {
      width: parseSize(props.width),
      height: parseSize(props.height),
      alt: props.alt,
      referrerpolicy: props.referrerpolicy,
      usemap: props.usemap,
      longdesc: props.longdesc,
      ismap: props.ismap,
      crossorigin: props.crossorigin === true ? "anonymous" : props.crossorigin || void 0,
      loading: props.loading,
      decoding: props.decoding,
      nonce: props.nonce
    };
  });
  const $img = useImage();
  const modifiers = computed(() => {
    return {
      ...props.modifiers,
      width: parseSize(props.width),
      height: parseSize(props.height),
      format: props.format,
      quality: props.quality || $img.options.quality,
      background: props.background,
      fit: props.fit
    };
  });
  return {
    options,
    attrs,
    modifiers
  };
};
const imgProps = {
  ...baseImageProps,
  placeholder: { type: [Boolean, String, Number, Array], required: false },
  placeholderClass: { type: String, required: false },
  custom: { type: Boolean, required: false }
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "NuxtImg",
  __ssrInlineRender: true,
  props: imgProps,
  emits: ["load", "error"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const attrs = useAttrs();
    const isServer = true;
    const $img = useImage();
    const _base = useBaseImage(props);
    const placeholderLoaded = ref(false);
    const imgEl = ref();
    const sizes = computed(() => $img.getSizes(props.src, {
      ..._base.options.value,
      sizes: props.sizes,
      densities: props.densities,
      modifiers: {
        ..._base.modifiers.value,
        width: parseSize(props.width),
        height: parseSize(props.height)
      }
    }));
    const imgAttrs = computed(() => {
      const attrs2 = { ..._base.attrs.value, "data-nuxt-img": "" };
      if (!props.placeholder || placeholderLoaded.value) {
        attrs2.sizes = sizes.value.sizes;
        attrs2.srcset = sizes.value.srcset;
      }
      return attrs2;
    });
    const placeholder = computed(() => {
      let placeholder2 = props.placeholder;
      if (placeholder2 === "") {
        placeholder2 = true;
      }
      if (!placeholder2 || placeholderLoaded.value) {
        return false;
      }
      if (typeof placeholder2 === "string") {
        return placeholder2;
      }
      const size = Array.isArray(placeholder2) ? placeholder2 : typeof placeholder2 === "number" ? [placeholder2, placeholder2] : [10, 10];
      return $img(props.src, {
        ..._base.modifiers.value,
        width: size[0],
        height: size[1],
        quality: size[2] || 50,
        blur: size[3] || 3
      }, _base.options.value);
    });
    const mainSrc = computed(
      () => props.sizes ? sizes.value.src : $img(props.src, _base.modifiers.value, _base.options.value)
    );
    const src = computed(() => placeholder.value ? placeholder.value : mainSrc.value);
    if (props.preload) {
      const isResponsive = Object.values(sizes.value).every((v) => v);
      useHead({
        link: [{
          rel: "preload",
          as: "image",
          nonce: props.nonce,
          ...!isResponsive ? { href: src.value } : {
            href: sizes.value.src,
            imagesizes: sizes.value.sizes,
            imagesrcset: sizes.value.srcset
          },
          ...typeof props.preload !== "boolean" && props.preload.fetchPriority ? { fetchpriority: props.preload.fetchPriority } : {}
        }]
      });
    }
    const nuxtApp = useNuxtApp();
    nuxtApp.isHydrating;
    return (_ctx, _push, _parent, _attrs) => {
      if (!_ctx.custom) {
        _push(`<img${ssrRenderAttrs(mergeProps({
          ref_key: "imgEl",
          ref: imgEl,
          class: placeholder.value && !placeholderLoaded.value ? _ctx.placeholderClass : void 0
        }, {
          ...unref(isServer) ? { onerror: "this.setAttribute('data-error', 1)" } : {},
          ...imgAttrs.value,
          ...unref(attrs)
        }, { src: src.value }, _attrs))}>`);
      } else {
        ssrRenderSlot(_ctx.$slots, "default", {
          ...unref(isServer) ? { onerror: "this.setAttribute('data-error', 1)" } : {},
          imgAttrs: {
            ...imgAttrs.value,
            ...unref(attrs)
          },
          isLoaded: placeholderLoaded.value,
          src: src.value
        }, null, _push, _parent);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/@nuxt+image@1.11.0_db0@0.3.4_ioredis@5.8.2_magicast@0.5.1/node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtImg = _sfc_main$2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "logo-wrapper" }, _attrs))} data-v-14e194b1>`);
  _push(ssrRenderComponent(_component_NuxtImg, {
    src: "/logo-top-trans.webp",
    alt: "logo",
    width: "120",
    height: "120",
    class: "logo"
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LogoRotate.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-14e194b1"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const drawer = ref(false);
    const navLinks = [
      { name: "O n\xE1s", path: "/" },
      { name: "Tr\xE9ningy", path: "/trainings" },
      { name: "Kontakt", path: "/contact" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_app = resolveComponent("v-app");
      const _component_v_app_bar = resolveComponent("v-app-bar");
      const _component_v_container = resolveComponent("v-container");
      const _component_v_row = resolveComponent("v-row");
      const _component_v_col = resolveComponent("v-col");
      const _component_v_app_bar_nav_icon = resolveComponent("v-app-bar-nav-icon");
      const _component_v_toolbar_title = resolveComponent("v-toolbar-title");
      const _component_LogoRotate = __nuxt_component_0;
      const _component_v_spacer = resolveComponent("v-spacer");
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_navigation_drawer = resolveComponent("v-navigation-drawer");
      const _component_v_list = resolveComponent("v-list");
      const _component_v_list_item = resolveComponent("v-list-item");
      const _component_v_list_item_title = resolveComponent("v-list-item-title");
      const _component_v_main = resolveComponent("v-main");
      const _component_NuxtPage = __nuxt_component_1;
      const _component_v_footer = resolveComponent("v-footer");
      _push(ssrRenderComponent(_component_v_app, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_app_bar, {
              flat: "",
              app: "",
              role: "navigation",
              "aria-label": "Hlavn\xE1 navig\xE1cia"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_container, { fluid: "" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_v_row, { justify: "center" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_v_col, {
                                cols: "10",
                                lg: "8"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_v_row, {
                                      "d-flex": "",
                                      justify: "space-between",
                                      "no-gutters": ""
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_v_col, {
                                            cols: "auto",
                                            class: "d-flex align-center"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_v_app_bar_nav_icon, {
                                                  class: "d-sm-none",
                                                  "aria-label": "Zobrazi\u0165 naviga\u010Dn\xE9 menu",
                                                  onClick: ($event) => drawer.value = !drawer.value
                                                }, null, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_v_toolbar_title, { class: "d-none d-sm-flex ml-2" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(ssrRenderComponent(_component_LogoRotate, { "aria-hidden": "true" }, null, _parent9, _scopeId8));
                                                    } else {
                                                      return [
                                                        createVNode(_component_LogoRotate, { "aria-hidden": "true" })
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_v_app_bar_nav_icon, {
                                                    class: "d-sm-none",
                                                    "aria-label": "Zobrazi\u0165 naviga\u010Dn\xE9 menu",
                                                    onClick: ($event) => drawer.value = !drawer.value
                                                  }, null, 8, ["onClick"]),
                                                  createVNode(_component_v_toolbar_title, { class: "d-none d-sm-flex ml-2" }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_LogoRotate, { "aria-hidden": "true" })
                                                    ]),
                                                    _: 1
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_v_spacer, { class: "d-sm-none" }, null, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_v_col, { class: "d-flex justify-end align-center" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<div class="d-none d-sm-flex"${_scopeId7}><!--[-->`);
                                                ssrRenderList(navLinks, (link) => {
                                                  _push8(ssrRenderComponent(_component_v_btn, {
                                                    key: link.path,
                                                    to: link.path,
                                                    variant: "text",
                                                    class: "mx-1 nav-btn",
                                                    "aria-label": `Navig\xE1cia na str\xE1nku ${link.name}`,
                                                    color: "primary"
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`${ssrInterpolate(link.name)}`);
                                                      } else {
                                                        return [
                                                          createTextVNode(toDisplayString(link.name), 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                });
                                                _push8(`<!--]--></div>`);
                                                _push8(ssrRenderComponent(_component_v_toolbar_title, { class: "d-sm-none d-flex justify-end" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(ssrRenderComponent(_component_LogoRotate, { "aria-hidden": "true" }, null, _parent9, _scopeId8));
                                                    } else {
                                                      return [
                                                        createVNode(_component_LogoRotate, { "aria-hidden": "true" })
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode("div", { class: "d-none d-sm-flex" }, [
                                                    (openBlock(), createBlock(Fragment, null, renderList(navLinks, (link) => {
                                                      return createVNode(_component_v_btn, {
                                                        key: link.path,
                                                        to: link.path,
                                                        variant: "text",
                                                        class: "mx-1 nav-btn",
                                                        "aria-label": `Navig\xE1cia na str\xE1nku ${link.name}`,
                                                        color: "primary"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(link.name), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["to", "aria-label"]);
                                                    }), 64))
                                                  ]),
                                                  createVNode(_component_v_toolbar_title, { class: "d-sm-none d-flex justify-end" }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_LogoRotate, { "aria-hidden": "true" })
                                                    ]),
                                                    _: 1
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_v_col, {
                                              cols: "auto",
                                              class: "d-flex align-center"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_app_bar_nav_icon, {
                                                  class: "d-sm-none",
                                                  "aria-label": "Zobrazi\u0165 naviga\u010Dn\xE9 menu",
                                                  onClick: ($event) => drawer.value = !drawer.value
                                                }, null, 8, ["onClick"]),
                                                createVNode(_component_v_toolbar_title, { class: "d-none d-sm-flex ml-2" }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_LogoRotate, { "aria-hidden": "true" })
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_v_spacer, { class: "d-sm-none" }),
                                            createVNode(_component_v_col, { class: "d-flex justify-end align-center" }, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "d-none d-sm-flex" }, [
                                                  (openBlock(), createBlock(Fragment, null, renderList(navLinks, (link) => {
                                                    return createVNode(_component_v_btn, {
                                                      key: link.path,
                                                      to: link.path,
                                                      variant: "text",
                                                      class: "mx-1 nav-btn",
                                                      "aria-label": `Navig\xE1cia na str\xE1nku ${link.name}`,
                                                      color: "primary"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(link.name), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["to", "aria-label"]);
                                                  }), 64))
                                                ]),
                                                createVNode(_component_v_toolbar_title, { class: "d-sm-none d-flex justify-end" }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_LogoRotate, { "aria-hidden": "true" })
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
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_v_row, {
                                        "d-flex": "",
                                        justify: "space-between",
                                        "no-gutters": ""
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_col, {
                                            cols: "auto",
                                            class: "d-flex align-center"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_v_app_bar_nav_icon, {
                                                class: "d-sm-none",
                                                "aria-label": "Zobrazi\u0165 naviga\u010Dn\xE9 menu",
                                                onClick: ($event) => drawer.value = !drawer.value
                                              }, null, 8, ["onClick"]),
                                              createVNode(_component_v_toolbar_title, { class: "d-none d-sm-flex ml-2" }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_LogoRotate, { "aria-hidden": "true" })
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_v_spacer, { class: "d-sm-none" }),
                                          createVNode(_component_v_col, { class: "d-flex justify-end align-center" }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "d-none d-sm-flex" }, [
                                                (openBlock(), createBlock(Fragment, null, renderList(navLinks, (link) => {
                                                  return createVNode(_component_v_btn, {
                                                    key: link.path,
                                                    to: link.path,
                                                    variant: "text",
                                                    class: "mx-1 nav-btn",
                                                    "aria-label": `Navig\xE1cia na str\xE1nku ${link.name}`,
                                                    color: "primary"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(link.name), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["to", "aria-label"]);
                                                }), 64))
                                              ]),
                                              createVNode(_component_v_toolbar_title, { class: "d-sm-none d-flex justify-end" }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_LogoRotate, { "aria-hidden": "true" })
                                                ]),
                                                _: 1
                                              })
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_v_col, {
                                  cols: "10",
                                  lg: "8"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_row, {
                                      "d-flex": "",
                                      justify: "space-between",
                                      "no-gutters": ""
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_col, {
                                          cols: "auto",
                                          class: "d-flex align-center"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_v_app_bar_nav_icon, {
                                              class: "d-sm-none",
                                              "aria-label": "Zobrazi\u0165 naviga\u010Dn\xE9 menu",
                                              onClick: ($event) => drawer.value = !drawer.value
                                            }, null, 8, ["onClick"]),
                                            createVNode(_component_v_toolbar_title, { class: "d-none d-sm-flex ml-2" }, {
                                              default: withCtx(() => [
                                                createVNode(_component_LogoRotate, { "aria-hidden": "true" })
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_v_spacer, { class: "d-sm-none" }),
                                        createVNode(_component_v_col, { class: "d-flex justify-end align-center" }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "d-none d-sm-flex" }, [
                                              (openBlock(), createBlock(Fragment, null, renderList(navLinks, (link) => {
                                                return createVNode(_component_v_btn, {
                                                  key: link.path,
                                                  to: link.path,
                                                  variant: "text",
                                                  class: "mx-1 nav-btn",
                                                  "aria-label": `Navig\xE1cia na str\xE1nku ${link.name}`,
                                                  color: "primary"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(link.name), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["to", "aria-label"]);
                                              }), 64))
                                            ]),
                                            createVNode(_component_v_toolbar_title, { class: "d-sm-none d-flex justify-end" }, {
                                              default: withCtx(() => [
                                                createVNode(_component_LogoRotate, { "aria-hidden": "true" })
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_v_row, { justify: "center" }, {
                            default: withCtx(() => [
                              createVNode(_component_v_col, {
                                cols: "10",
                                lg: "8"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_row, {
                                    "d-flex": "",
                                    justify: "space-between",
                                    "no-gutters": ""
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_v_col, {
                                        cols: "auto",
                                        class: "d-flex align-center"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_app_bar_nav_icon, {
                                            class: "d-sm-none",
                                            "aria-label": "Zobrazi\u0165 naviga\u010Dn\xE9 menu",
                                            onClick: ($event) => drawer.value = !drawer.value
                                          }, null, 8, ["onClick"]),
                                          createVNode(_component_v_toolbar_title, { class: "d-none d-sm-flex ml-2" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_LogoRotate, { "aria-hidden": "true" })
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_v_spacer, { class: "d-sm-none" }),
                                      createVNode(_component_v_col, { class: "d-flex justify-end align-center" }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "d-none d-sm-flex" }, [
                                            (openBlock(), createBlock(Fragment, null, renderList(navLinks, (link) => {
                                              return createVNode(_component_v_btn, {
                                                key: link.path,
                                                to: link.path,
                                                variant: "text",
                                                class: "mx-1 nav-btn",
                                                "aria-label": `Navig\xE1cia na str\xE1nku ${link.name}`,
                                                color: "primary"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(link.name), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["to", "aria-label"]);
                                            }), 64))
                                          ]),
                                          createVNode(_component_v_toolbar_title, { class: "d-sm-none d-flex justify-end" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_LogoRotate, { "aria-hidden": "true" })
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_v_container, { fluid: "" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_row, { justify: "center" }, {
                          default: withCtx(() => [
                            createVNode(_component_v_col, {
                              cols: "10",
                              lg: "8"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_v_row, {
                                  "d-flex": "",
                                  justify: "space-between",
                                  "no-gutters": ""
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_col, {
                                      cols: "auto",
                                      class: "d-flex align-center"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_app_bar_nav_icon, {
                                          class: "d-sm-none",
                                          "aria-label": "Zobrazi\u0165 naviga\u010Dn\xE9 menu",
                                          onClick: ($event) => drawer.value = !drawer.value
                                        }, null, 8, ["onClick"]),
                                        createVNode(_component_v_toolbar_title, { class: "d-none d-sm-flex ml-2" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_LogoRotate, { "aria-hidden": "true" })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_v_spacer, { class: "d-sm-none" }),
                                    createVNode(_component_v_col, { class: "d-flex justify-end align-center" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "d-none d-sm-flex" }, [
                                          (openBlock(), createBlock(Fragment, null, renderList(navLinks, (link) => {
                                            return createVNode(_component_v_btn, {
                                              key: link.path,
                                              to: link.path,
                                              variant: "text",
                                              class: "mx-1 nav-btn",
                                              "aria-label": `Navig\xE1cia na str\xE1nku ${link.name}`,
                                              color: "primary"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(link.name), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["to", "aria-label"]);
                                          }), 64))
                                        ]),
                                        createVNode(_component_v_toolbar_title, { class: "d-sm-none d-flex justify-end" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_LogoRotate, { "aria-hidden": "true" })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_navigation_drawer, {
              modelValue: drawer.value,
              "onUpdate:modelValue": ($event) => drawer.value = $event,
              app: "",
              temporary: "",
              class: "d-sm-none",
              width: "320",
              role: "navigation",
              "aria-label": "Mobiln\xE9 menu"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_list, {
                    nav: "",
                    dense: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(navLinks, (link) => {
                          _push4(ssrRenderComponent(_component_v_list_item, {
                            class: "my-6",
                            key: link.path,
                            to: link.path,
                            "aria-label": `Navig\xE1cia na str\xE1nku ${link.name}`,
                            link: "",
                            onClick: ($event) => drawer.value = false
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_v_list_item_title, { class: "text-center" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(link.name)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(link.name), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_v_list_item_title, { class: "text-center" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(link.name), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(navLinks, (link) => {
                            return createVNode(_component_v_list_item, {
                              class: "my-6",
                              key: link.path,
                              to: link.path,
                              "aria-label": `Navig\xE1cia na str\xE1nku ${link.name}`,
                              link: "",
                              onClick: ($event) => drawer.value = false
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_v_list_item_title, { class: "text-center" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(link.name), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1032, ["to", "aria-label", "onClick"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_v_list, {
                      nav: "",
                      dense: ""
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(navLinks, (link) => {
                          return createVNode(_component_v_list_item, {
                            class: "my-6",
                            key: link.path,
                            to: link.path,
                            "aria-label": `Navig\xE1cia na str\xE1nku ${link.name}`,
                            link: "",
                            onClick: ($event) => drawer.value = false
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_v_list_item_title, { class: "text-center" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(link.name), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1032, ["to", "aria-label", "onClick"]);
                        }), 64))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_main, { role: "main" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtPage, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtPage)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_footer, {
              app: "",
              class: "text-center text-secondary",
              role: "contentinfo"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_container, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<small${_scopeId3}>\xA9 ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Matus Matko \u2013 V\u0161etky pr\xE1va vyhraden\xE9.</small>`);
                      } else {
                        return [
                          createVNode("small", null, "\xA9 " + toDisplayString((/* @__PURE__ */ new Date()).getFullYear()) + " Matus Matko \u2013 V\u0161etky pr\xE1va vyhraden\xE9.", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_v_container, null, {
                      default: withCtx(() => [
                        createVNode("small", null, "\xA9 " + toDisplayString((/* @__PURE__ */ new Date()).getFullYear()) + " Matus Matko \u2013 V\u0161etky pr\xE1va vyhraden\xE9.", 1)
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
              createVNode(_component_v_app_bar, {
                flat: "",
                app: "",
                role: "navigation",
                "aria-label": "Hlavn\xE1 navig\xE1cia"
              }, {
                default: withCtx(() => [
                  createVNode(_component_v_container, { fluid: "" }, {
                    default: withCtx(() => [
                      createVNode(_component_v_row, { justify: "center" }, {
                        default: withCtx(() => [
                          createVNode(_component_v_col, {
                            cols: "10",
                            lg: "8"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_v_row, {
                                "d-flex": "",
                                justify: "space-between",
                                "no-gutters": ""
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_col, {
                                    cols: "auto",
                                    class: "d-flex align-center"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_v_app_bar_nav_icon, {
                                        class: "d-sm-none",
                                        "aria-label": "Zobrazi\u0165 naviga\u010Dn\xE9 menu",
                                        onClick: ($event) => drawer.value = !drawer.value
                                      }, null, 8, ["onClick"]),
                                      createVNode(_component_v_toolbar_title, { class: "d-none d-sm-flex ml-2" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_LogoRotate, { "aria-hidden": "true" })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_v_spacer, { class: "d-sm-none" }),
                                  createVNode(_component_v_col, { class: "d-flex justify-end align-center" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "d-none d-sm-flex" }, [
                                        (openBlock(), createBlock(Fragment, null, renderList(navLinks, (link) => {
                                          return createVNode(_component_v_btn, {
                                            key: link.path,
                                            to: link.path,
                                            variant: "text",
                                            class: "mx-1 nav-btn",
                                            "aria-label": `Navig\xE1cia na str\xE1nku ${link.name}`,
                                            color: "primary"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(link.name), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["to", "aria-label"]);
                                        }), 64))
                                      ]),
                                      createVNode(_component_v_toolbar_title, { class: "d-sm-none d-flex justify-end" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_LogoRotate, { "aria-hidden": "true" })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_v_navigation_drawer, {
                modelValue: drawer.value,
                "onUpdate:modelValue": ($event) => drawer.value = $event,
                app: "",
                temporary: "",
                class: "d-sm-none",
                width: "320",
                role: "navigation",
                "aria-label": "Mobiln\xE9 menu"
              }, {
                default: withCtx(() => [
                  createVNode(_component_v_list, {
                    nav: "",
                    dense: ""
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(navLinks, (link) => {
                        return createVNode(_component_v_list_item, {
                          class: "my-6",
                          key: link.path,
                          to: link.path,
                          "aria-label": `Navig\xE1cia na str\xE1nku ${link.name}`,
                          link: "",
                          onClick: ($event) => drawer.value = false
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_v_list_item_title, { class: "text-center" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(link.name), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1032, ["to", "aria-label", "onClick"]);
                      }), 64))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_v_main, { role: "main" }, {
                default: withCtx(() => [
                  createVNode(_component_NuxtPage)
                ]),
                _: 1
              }),
              createVNode(_component_v_footer, {
                app: "",
                class: "text-center text-secondary",
                role: "contentinfo"
              }, {
                default: withCtx(() => [
                  createVNode(_component_v_container, null, {
                    default: withCtx(() => [
                      createVNode("small", null, "\xA9 " + toDisplayString((/* @__PURE__ */ new Date()).getFullYear()) + " Matus Matko \u2013 V\u0161etky pr\xE1va vyhraden\xE9.", 1)
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
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-DbhPk-W6.mjs.map
