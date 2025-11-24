import { defineComponent, ref, resolveComponent, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, mergeProps, useAttrs, computed, unref, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { H as defu, I as withLeadingSlash, w as hasProtocol, y as joinURL, J as parseURL, K as encodeParam, L as encodePath } from '../_/nitro.mjs';
import { _ as _export_sfc, j as __nuxt_component_1, u as useHead, b as useNuxtApp, c as useRuntimeConfig } from './server.mjs';
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

async function imageMeta(_ctx, url) {
  const meta = await _imageMeta(url).catch((err) => {
    console.error("Failed to get image meta for " + url, err + "");
    return {
      width: 0,
      height: 0,
      ratio: 0
    };
  });
  return meta;
}
async function _imageMeta(url) {
  {
    const imageMeta2 = await import('./index-mH_0pvGP.mjs').then((r) => r.imageMeta);
    const data = await fetch(url).then((res) => res.buffer());
    const metadata = imageMeta2(data);
    if (!metadata) {
      throw new Error(`No metadata could be extracted from the image \`${url}\`.`);
    }
    const { width, height } = metadata;
    const meta = {
      width,
      height,
      ratio: width && height ? width / height : void 0
    };
    return meta;
  }
}
function createMapper(map) {
  return (key) => {
    return key ? map[key] || key : map.missingValue;
  };
}
function createOperationsGenerator({ formatter, keyMap, joinWith = "/", valueMap } = {}) {
  if (!formatter) {
    formatter = (key, value) => `${key}=${value}`;
  }
  if (keyMap && typeof keyMap !== "function") {
    keyMap = createMapper(keyMap);
  }
  const map = valueMap || {};
  Object.keys(map).forEach((valueKey) => {
    if (typeof map[valueKey] !== "function") {
      map[valueKey] = createMapper(map[valueKey]);
    }
  });
  return (modifiers = {}) => {
    const operations = Object.entries(modifiers).filter(([_, value]) => typeof value !== "undefined").map(([key, value]) => {
      const mapper = map[key];
      if (typeof mapper === "function") {
        value = mapper(modifiers[key]);
      }
      key = typeof keyMap === "function" ? keyMap(key) : key;
      return formatter(key, value);
    });
    return operations.join(joinWith);
  };
}
function parseSize(input = "") {
  if (typeof input === "number") {
    return input;
  }
  if (typeof input === "string") {
    if (input.replace("px", "").match(/^\d+$/g)) {
      return Number.parseInt(input, 10);
    }
  }
}
function parseDensities(input = "") {
  if (input === void 0 || !input.length) {
    return [];
  }
  const densities = /* @__PURE__ */ new Set();
  for (const density of input.split(" ")) {
    const d = Number.parseInt(density.replace("x", ""));
    if (d) {
      densities.add(d);
    }
  }
  return Array.from(densities);
}
function checkDensities(densities) {
  if (densities.length === 0) {
    throw new Error("`densities` must not be empty, configure to `1` to render regular size only (DPR 1.0)");
  }
}
function parseSizes(input) {
  const sizes = {};
  if (typeof input === "string") {
    for (const entry of input.split(/[\s,]+/).filter((e) => e)) {
      const s = entry.split(":");
      if (s.length !== 2) {
        sizes["1px"] = s[0].trim();
      } else {
        sizes[s[0].trim()] = s[1].trim();
      }
    }
  } else {
    Object.assign(sizes, input);
  }
  return sizes;
}
function createImage(globalOptions) {
  const ctx = {
    options: globalOptions
  };
  const getImage2 = (input, options = {}) => {
    const image = resolveImage(ctx, input, options);
    return image;
  };
  const $img = (input, modifiers = {}, options = {}) => {
    return getImage2(input, {
      ...options,
      modifiers: defu(modifiers, options.modifiers || {})
    }).url;
  };
  for (const presetName in globalOptions.presets) {
    $img[presetName] = (source, modifiers, options) => $img(source, modifiers, { ...globalOptions.presets[presetName], ...options });
  }
  $img.options = globalOptions;
  $img.getImage = getImage2;
  $img.getMeta = (input, options) => getMeta(ctx, input, options);
  $img.getSizes = (input, options) => getSizes(ctx, input, options);
  ctx.$img = $img;
  return $img;
}
async function getMeta(ctx, input, options) {
  const image = resolveImage(ctx, input, { ...options });
  if (typeof image.getMeta === "function") {
    return await image.getMeta();
  } else {
    return await imageMeta(ctx, image.url);
  }
}
function resolveImage(ctx, input, options) {
  var _a, _b;
  if (input && typeof input !== "string") {
    throw new TypeError(`input must be a string (received ${typeof input}: ${JSON.stringify(input)})`);
  }
  if (!input || input.startsWith("data:")) {
    return {
      url: input
    };
  }
  const { provider, defaults } = getProvider(ctx, options.provider || ctx.options.provider);
  const preset = getPreset(ctx, options.preset);
  input = hasProtocol(input) ? input : withLeadingSlash(input);
  if (!provider.supportsAlias) {
    for (const base in ctx.options.alias) {
      if (input.startsWith(base)) {
        const alias = ctx.options.alias[base];
        if (alias) {
          input = joinURL(alias, input.slice(base.length));
        }
      }
    }
  }
  if (provider.validateDomains && hasProtocol(input)) {
    const inputHost = parseURL(input).host;
    if (!ctx.options.domains.find((d) => d === inputHost)) {
      return {
        url: input
      };
    }
  }
  const _options = defu(options, preset, defaults);
  _options.modifiers = { ..._options.modifiers };
  const expectedFormat = _options.modifiers.format;
  if ((_a = _options.modifiers) == null ? void 0 : _a.width) {
    _options.modifiers.width = parseSize(_options.modifiers.width);
  }
  if ((_b = _options.modifiers) == null ? void 0 : _b.height) {
    _options.modifiers.height = parseSize(_options.modifiers.height);
  }
  const image = provider.getImage(input, _options, ctx);
  image.format = image.format || expectedFormat || "";
  return image;
}
function getProvider(ctx, name) {
  const provider = ctx.options.providers[name];
  if (!provider) {
    throw new Error("Unknown provider: " + name);
  }
  return provider;
}
function getPreset(ctx, name) {
  if (!name) {
    return {};
  }
  if (!ctx.options.presets[name]) {
    throw new Error("Unknown preset: " + name);
  }
  return ctx.options.presets[name];
}
function getSizes(ctx, input, opts) {
  var _a, _b, _c, _d, _e;
  const width = parseSize((_a = opts.modifiers) == null ? void 0 : _a.width);
  const height = parseSize((_b = opts.modifiers) == null ? void 0 : _b.height);
  const sizes = parseSizes(opts.sizes);
  const densities = ((_c = opts.densities) == null ? void 0 : _c.trim()) ? parseDensities(opts.densities.trim()) : ctx.options.densities;
  checkDensities(densities);
  const hwRatio = width && height ? height / width : 0;
  const sizeVariants = [];
  const srcsetVariants = [];
  if (Object.keys(sizes).length >= 1) {
    for (const key in sizes) {
      const variant = getSizesVariant(key, String(sizes[key]), height, hwRatio, ctx);
      if (variant === void 0) {
        continue;
      }
      sizeVariants.push({
        size: variant.size,
        screenMaxWidth: variant.screenMaxWidth,
        media: `(max-width: ${variant.screenMaxWidth}px)`
      });
      for (const density of densities) {
        srcsetVariants.push({
          width: variant._cWidth * density,
          src: getVariantSrc(ctx, input, opts, variant, density)
        });
      }
    }
    finaliseSizeVariants(sizeVariants);
  } else {
    for (const density of densities) {
      const key = Object.keys(sizes)[0];
      let variant = key ? getSizesVariant(key, String(sizes[key]), height, hwRatio, ctx) : void 0;
      if (variant === void 0) {
        variant = {
          size: "",
          screenMaxWidth: 0,
          _cWidth: (_d = opts.modifiers) == null ? void 0 : _d.width,
          _cHeight: (_e = opts.modifiers) == null ? void 0 : _e.height
        };
      }
      srcsetVariants.push({
        width: density,
        src: getVariantSrc(ctx, input, opts, variant, density)
      });
    }
  }
  finaliseSrcsetVariants(srcsetVariants);
  const defaultVariant = srcsetVariants[srcsetVariants.length - 1];
  const sizesVal = sizeVariants.length ? sizeVariants.map((v) => `${v.media ? v.media + " " : ""}${v.size}`).join(", ") : void 0;
  const suffix = sizesVal ? "w" : "x";
  const srcsetVal = srcsetVariants.map((v) => `${v.src} ${v.width}${suffix}`).join(", ");
  return {
    sizes: sizesVal,
    srcset: srcsetVal,
    src: defaultVariant == null ? void 0 : defaultVariant.src
  };
}
function getSizesVariant(key, size, height, hwRatio, ctx) {
  const screenMaxWidth = ctx.options.screens && ctx.options.screens[key] || Number.parseInt(key);
  const isFluid = size.endsWith("vw");
  if (!isFluid && /^\d+$/.test(size)) {
    size = size + "px";
  }
  if (!isFluid && !size.endsWith("px")) {
    return void 0;
  }
  let _cWidth = Number.parseInt(size);
  if (!screenMaxWidth || !_cWidth) {
    return void 0;
  }
  if (isFluid) {
    _cWidth = Math.round(_cWidth / 100 * screenMaxWidth);
  }
  const _cHeight = hwRatio ? Math.round(_cWidth * hwRatio) : height;
  return {
    size,
    screenMaxWidth,
    _cWidth,
    _cHeight
  };
}
function getVariantSrc(ctx, input, opts, variant, density) {
  return ctx.$img(
    input,
    {
      ...opts.modifiers,
      width: variant._cWidth ? variant._cWidth * density : void 0,
      height: variant._cHeight ? variant._cHeight * density : void 0
    },
    opts
  );
}
function finaliseSizeVariants(sizeVariants) {
  var _a;
  sizeVariants.sort((v1, v2) => v1.screenMaxWidth - v2.screenMaxWidth);
  let previousMedia = null;
  for (let i = sizeVariants.length - 1; i >= 0; i--) {
    const sizeVariant = sizeVariants[i];
    if (sizeVariant.media === previousMedia) {
      sizeVariants.splice(i, 1);
    }
    previousMedia = sizeVariant.media;
  }
  for (let i = 0; i < sizeVariants.length; i++) {
    sizeVariants[i].media = ((_a = sizeVariants[i + 1]) == null ? void 0 : _a.media) || "";
  }
}
function finaliseSrcsetVariants(srcsetVariants) {
  srcsetVariants.sort((v1, v2) => v1.width - v2.width);
  let previousWidth = null;
  for (let i = srcsetVariants.length - 1; i >= 0; i--) {
    const sizeVariant = srcsetVariants[i];
    if (sizeVariant.width === previousWidth) {
      srcsetVariants.splice(i, 1);
    }
    previousWidth = sizeVariant.width;
  }
}
const operationsGenerator = createOperationsGenerator({
  keyMap: {
    format: "f",
    fit: "fit",
    width: "w",
    height: "h",
    resize: "s",
    quality: "q",
    background: "b"
  },
  joinWith: "&",
  formatter: (key, val) => encodeParam(key) + "_" + encodeParam(val)
});
const getImage = (src, { modifiers = {}, baseURL } = {}, ctx) => {
  if (modifiers.width && modifiers.height) {
    modifiers.resize = `${modifiers.width}x${modifiers.height}`;
    delete modifiers.width;
    delete modifiers.height;
  }
  const params = operationsGenerator(modifiers) || "_";
  if (!baseURL) {
    baseURL = joinURL(ctx.options.nuxt.baseURL, "/_ipx");
  }
  return {
    url: joinURL(baseURL, params, encodePath(src))
  };
};
const validateDomains = true;
const supportsAlias = true;
const ipxRuntime$Mv8S5HLubG4rnj1c7dCJ29DYTp7JqpVqczZZ0IbOhdY = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getImage,
  operationsGenerator,
  supportsAlias,
  validateDomains
}, Symbol.toStringTag, { value: "Module" }));
const imageOptions = {
  ...{
    "screens": {
      "xs": 320,
      "sm": 320,
      "md": 640,
      "lg": 1024,
      "xl": 1280,
      "xxl": 1536,
      "2xl": 1536
    },
    "presets": {
      "responsive": {
        "modifiers": {
          "format": "webp"
        },
        "sizes": "100vw sm:320px md:640px lg:1024px"
      }
    },
    "provider": "ipx",
    "domains": [],
    "alias": {},
    "densities": [
      1,
      2
    ],
    "format": [
      "webp"
    ]
  },
  providers: {
    ["ipx"]: { provider: ipxRuntime$Mv8S5HLubG4rnj1c7dCJ29DYTp7JqpVqczZZ0IbOhdY, defaults: {} }
  }
};
const useImage = (event) => {
  var _a;
  const config = useRuntimeConfig();
  const nuxtApp = useNuxtApp();
  return nuxtApp.$img || nuxtApp._img || (nuxtApp._img = createImage({
    ...imageOptions,
    event: (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event,
    nuxt: {
      baseURL: config.app.baseURL
    },
    runtimeConfig: config
  }));
};
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
  _push(ssrRenderComponent(_component_NuxtImg, mergeProps({
    id: "logo",
    src: "logo-top-trans/logo-top-trans.webp",
    preset: "responsive",
    alt: "logo"
  }, _attrs), null, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LogoRotate.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-4ac1d9cf"]]);
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
//# sourceMappingURL=default-BuzerVbM.mjs.map
