import { resolveComponent, withCtx, createVNode, unref, ref, defineComponent, computed, mergeProps, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderStyle, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { p as publicAssetsURL } from '../_/nitro.mjs';
import 'vue-router';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "VideoPlayer",
  __ssrInlineRender: true,
  props: {
    videos: {}
  },
  setup(__props) {
    const props = __props;
    const getYouTubeId = (url) => {
      const match = url.match(/(?:v=|youtu\.be\/)([^&]+)/);
      return match ? match[1] : null;
    };
    const getThumbnail = (url) => {
      const id = getYouTubeId(url);
      return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    };
    const cardsPerPage = ref(3);
    const currentPage = ref(0);
    const totalPages = computed(
      () => Math.ceil(props.videos.length / cardsPerPage.value)
    );
    const translateX = computed(
      () => `translateX(-${currentPage.value * 100}%)`
    );
    const activeIndex = ref(null);
    const hovered = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_icon = resolveComponent("v-icon");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "carousel-wrapper" }, _attrs))} data-v-e017b649><button class="arrow left"${ssrIncludeBooleanAttr(currentPage.value === 0) ? " disabled" : ""} data-v-e017b649>`);
      _push(ssrRenderComponent(_component_v_icon, { size: "38" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`mdi-chevron-left`);
          } else {
            return [
              createTextVNode("mdi-chevron-left")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button><div class="carousel" data-v-e017b649><div class="track" style="${ssrRenderStyle({ transform: translateX.value })}" data-v-e017b649><!--[-->`);
      ssrRenderList(props.videos, (video, index2) => {
        _push(`<div class="${ssrRenderClass([{ big: activeIndex.value === index2 }, "card"])}" data-v-e017b649><iframe class="${ssrRenderClass([{ show: hovered.value === index2 && activeIndex.value !== index2 }, "hover-preview"])}"${ssrRenderAttr("src", `https://www.youtube.com/embed/${getYouTubeId(video.url)}?autoplay=1&mute=1&controls=0&playsinline=1`)} allow="autoplay" data-v-e017b649></iframe>`);
        if (activeIndex.value === index2) {
          _push(`<iframe class="iframe"${ssrRenderAttr("src", `https://www.youtube.com/embed/${getYouTubeId(video.url)}?autoplay=1&mute=1&controls=1`)} allow="autoplay; fullscreen" allowfullscreen data-v-e017b649></iframe>`);
        } else {
          _push(`<div class="thumb" data-v-e017b649><img${ssrRenderAttr("src", getThumbnail(video.url))} loading="lazy" data-v-e017b649><div class="overlay" data-v-e017b649>`);
          _push(ssrRenderComponent(_component_v_icon, { class: "play" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`mdi-play-circle`);
              } else {
                return [
                  createTextVNode("mdi-play-circle")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div>`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div><button class="arrow right"${ssrIncludeBooleanAttr(currentPage.value >= totalPages.value - 1) ? " disabled" : ""} data-v-e017b649>`);
      _push(ssrRenderComponent(_component_v_icon, { size: "38" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`mdi-chevron-right`);
          } else {
            return [
              createTextVNode("mdi-chevron-right")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/VideoPlayer.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-e017b649"]]);
const _imports_0 = publicAssetsURL("/imgs/optimized/orol-transparent-bg/orol-transparent-bg-1024.webp");
const _imports_1 = publicAssetsURL("/imgs/optimized/orol-transparent-bg/orol-transparent-bg-640.webp");
const _imports_2 = publicAssetsURL("/imgs/optimized/orol-transparent-bg/orol-transparent-bg-320.webp");
const _imports_3 = publicAssetsURL("/imgs/optimized/orol-transparent-bg/orol-transparent-bg.webp");
const useVideos = () => {
  const videos = ref([
    { url: "https://www.youtube.com/watch?v=tA14uRHqqWs" },
    { url: "https://www.youtube.com/watch?v=0vnOfawuQF4" },
    { url: "https://www.youtube.com/watch?v=-QI4x_D9aI8&t=40s" }
  ]);
  return { videos };
};
const _sfc_main$1 = {
  __name: "HeroSection",
  __ssrInlineRender: true,
  setup(__props) {
    const { videos } = useVideos();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_container = resolveComponent("v-container");
      const _component_v_row = resolveComponent("v-row");
      const _component_v_col = resolveComponent("v-col");
      const _component_VideoPlayer = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(_attrs)} data-v-fa2b538a>`);
      _push(ssrRenderComponent(_component_v_container, {
        class: "py-16 hero",
        fluid: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_row, { justify: "center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_col, {
                    cols: "10",
                    lg: "8",
                    class: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<h1 data-v-fa2b538a${_scopeId3}>Bojov\xE9 sporty pro d\u011Bti, ml\xE1de\u017E i dosp\u011Bl\xE9</h1>`);
                      } else {
                        return [
                          createVNode("h1", null, "Bojov\xE9 sporty pro d\u011Bti, ml\xE1de\u017E i dosp\u011Bl\xE9")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_v_col, {
                      cols: "10",
                      lg: "8",
                      class: ""
                    }, {
                      default: withCtx(() => [
                        createVNode("h1", null, "Bojov\xE9 sporty pro d\u011Bti, ml\xE1de\u017E i dosp\u011Bl\xE9")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_row, { justify: "end" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_col, { cols: "10" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="placeholder" data-v-fa2b538a${_scopeId3}></div><picture data-v-fa2b538a${_scopeId3}><source media="(min-width: 1024px)"${ssrRenderAttr("srcset", _imports_0)} type="image/webp" data-v-fa2b538a${_scopeId3}><source media="(min-width: 640px)"${ssrRenderAttr("srcset", _imports_1)} type="image/webp" data-v-fa2b538a${_scopeId3}><source media="(min-width: 320px)"${ssrRenderAttr("srcset", _imports_2)} type="image/webp" data-v-fa2b538a${_scopeId3}><img${ssrRenderAttr("src", _imports_3)} alt="mascot" class="mascot-image" width="400" height="400" loading="lazy" decoding="async" data-v-fa2b538a${_scopeId3}></picture>`);
                      } else {
                        return [
                          createVNode("div", { class: "placeholder" }),
                          createVNode("picture", null, [
                            createVNode("source", {
                              media: "(min-width: 1024px)",
                              srcset: _imports_0,
                              type: "image/webp"
                            }),
                            createVNode("source", {
                              media: "(min-width: 640px)",
                              srcset: _imports_1,
                              type: "image/webp"
                            }),
                            createVNode("source", {
                              media: "(min-width: 320px)",
                              srcset: _imports_2,
                              type: "image/webp"
                            }),
                            createVNode("img", {
                              src: _imports_3,
                              alt: "mascot",
                              class: "mascot-image",
                              width: "400",
                              height: "400",
                              loading: "lazy",
                              decoding: "async"
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_v_col, { cols: "10" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "placeholder" }),
                        createVNode("picture", null, [
                          createVNode("source", {
                            media: "(min-width: 1024px)",
                            srcset: _imports_0,
                            type: "image/webp"
                          }),
                          createVNode("source", {
                            media: "(min-width: 640px)",
                            srcset: _imports_1,
                            type: "image/webp"
                          }),
                          createVNode("source", {
                            media: "(min-width: 320px)",
                            srcset: _imports_2,
                            type: "image/webp"
                          }),
                          createVNode("img", {
                            src: _imports_3,
                            alt: "mascot",
                            class: "mascot-image",
                            width: "400",
                            height: "400",
                            loading: "lazy",
                            decoding: "async"
                          })
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_row, {
              justify: "center",
              class: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_col, {
                    cols: "10",
                    class: "text-center"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<h2 data-v-fa2b538a${_scopeId3}>Pod\xEDvejte se na na\u0161e tr\xE9ninky v akci</h2>`);
                        _push4(ssrRenderComponent(_component_VideoPlayer, { videos: unref(videos) }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("h2", null, "Pod\xEDvejte se na na\u0161e tr\xE9ninky v akci"),
                          createVNode(_component_VideoPlayer, { videos: unref(videos) }, null, 8, ["videos"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_v_col, {
                      cols: "10",
                      class: "text-center"
                    }, {
                      default: withCtx(() => [
                        createVNode("h2", null, "Pod\xEDvejte se na na\u0161e tr\xE9ninky v akci"),
                        createVNode(_component_VideoPlayer, { videos: unref(videos) }, null, 8, ["videos"])
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
              createVNode(_component_v_row, { justify: "center" }, {
                default: withCtx(() => [
                  createVNode(_component_v_col, {
                    cols: "10",
                    lg: "8",
                    class: ""
                  }, {
                    default: withCtx(() => [
                      createVNode("h1", null, "Bojov\xE9 sporty pro d\u011Bti, ml\xE1de\u017E i dosp\u011Bl\xE9")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_v_row, { justify: "end" }, {
                default: withCtx(() => [
                  createVNode(_component_v_col, { cols: "10" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "placeholder" }),
                      createVNode("picture", null, [
                        createVNode("source", {
                          media: "(min-width: 1024px)",
                          srcset: _imports_0,
                          type: "image/webp"
                        }),
                        createVNode("source", {
                          media: "(min-width: 640px)",
                          srcset: _imports_1,
                          type: "image/webp"
                        }),
                        createVNode("source", {
                          media: "(min-width: 320px)",
                          srcset: _imports_2,
                          type: "image/webp"
                        }),
                        createVNode("img", {
                          src: _imports_3,
                          alt: "mascot",
                          class: "mascot-image",
                          width: "400",
                          height: "400",
                          loading: "lazy",
                          decoding: "async"
                        })
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_v_row, {
                justify: "center",
                class: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_v_col, {
                    cols: "10",
                    class: "text-center"
                  }, {
                    default: withCtx(() => [
                      createVNode("h2", null, "Pod\xEDvejte se na na\u0161e tr\xE9ninky v akci"),
                      createVNode(_component_VideoPlayer, { videos: unref(videos) }, null, 8, ["videos"])
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
      _push(`</section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeroSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-fa2b538a"]]);
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
//# sourceMappingURL=index-sXqwD9It.mjs.map
