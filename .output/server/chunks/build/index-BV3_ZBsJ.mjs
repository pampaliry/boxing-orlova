import { mergeProps, withCtx, createVNode, createTextVNode, normalizeStyle, normalizeClass, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc, g as genericComponent, p as propsFactory, e as provideTheme, f as useRender, m as makeThemeProps, h as makeComponentProps } from './server.mjs';
import { _ as __nuxt_component_0$2 } from './nuxt-link-qtEGKEcM.mjs';
import { V as VRow, a as VCol, b as VContainer, c as VBtn } from './VBtn-BA5cI5Nv.mjs';
import { V as VCard, a as VCardTitle, b as VCardText, c as VCardActions } from './VCard-BIOVXzFL.mjs';
import { u as useBackgroundColor, a as useBorder, b as useDimension, c as useElevation, d as useLocation, e as usePosition, f as useRounded, m as makeTagProps, g as makeRoundedProps, h as makePositionProps, i as makeLocationProps, j as makeElevationProps, k as makeDimensionProps, l as makeBorderProps } from './index-DL6waHdU.mjs';
import { V as VChip } from './VChip-_G5bhsis.mjs';
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

const _sfc_main$5 = {};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs) {
  _push(`<span${ssrRenderAttrs(mergeProps({
    class: "handwave",
    "aria-hidden": "true"
  }, _attrs))} data-v-b21e4bcf>\u{1F44B}</span>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HandWave.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$5], ["__scopeId", "data-v-b21e4bcf"]]);
const _sfc_main$4 = {};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0$2;
  _push(ssrRenderComponent(VRow, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VCardText, { class: "text-body-1 text-center mt-8" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<article class="text-justify" style="${ssrRenderStyle({ "line-height": "1.8" })}"${_scopeId2}> Tento web vznikol ako m\xF4j <strong${_scopeId2}>testovac\xED projekt</strong>, kde si overujem nasadenie re\xE1lnych aplik\xE1ci\xED na vlastn\xFD server (Debian + PM2 + Nginx + Git cron deploy). Funguje teda tak, ako by be\u017Eala \u017Eiv\xE1 firemn\xE1 prezent\xE1cia alebo intern\xFD n\xE1stroj. <br${_scopeId2}><br${_scopeId2}> Ako s\xFA\u010Das\u0165 projektu som pripravil aj mal\xFD PoC: `);
              _push3(ssrRenderComponent(_component_NuxtLink, {
                to: "/projects",
                "aria-label": "Prejs\u0165 Projekty \u2013 Live WebSocket demo"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` WS BPM \u2013 Live WebSocket demo `);
                  } else {
                    return [
                      createTextVNode(" WS BPM \u2013 Live WebSocket demo ")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(`. Str\xE1nka \u010D\xEDta \u017Eiv\xE9 \u010D\xEDsla z WebSocketu (predvolene verejn\xFD stream) a mapuje ich do BPM, aby bolo vidie\u0165 pr\xE1cu s realtime d\xE1tami a plynulou vizualiz\xE1ciou. V produk\u010Dnom nasaden\xED je mo\u017En\xE9 pripoji\u0165 aj vlastn\xFD .NET WebSocket cez <code${_scopeId2}>runtimeConfig.public.wsUrl</code>. <br${_scopeId2}><br${_scopeId2}> M\xE1m predch\xE1dzaj\xFAcu prax ako frontend v\xFDvoj\xE1r v spolo\u010Dnosti <strong${_scopeId2}>Railsformers (2022)</strong>, kde som jeden rok vytv\xE1ral \u0161abl\xF3ny v HTML/PHP pre firemn\xE9 CMS. Pracoval som <strong${_scopeId2}>desktop-first</strong>, pou\u017E\xEDval <strong${_scopeId2}>Bootstrap</strong>, rie\u0161il z\xE1klady <strong${_scopeId2}>technick\xE9ho SEO</strong>, jednoduch\xE9 anim\xE1cie a z\xE1kladn\xFD <strong${_scopeId2}>deploy</strong>. Dnes sa pos\xFAvam k pln\xE9mu <strong${_scopeId2}>fullstack v\xFDvoju</strong> v modernom <strong${_scopeId2}>Vue/Nuxt ekosyst\xE9me</strong>, s d\xF4razom na komponentov\xFD pr\xEDstup, TypeScript a DevOps n\xE1stroje. <br${_scopeId2}><br${_scopeId2}> Popri webov\xFDch projektoch rozv\xEDjam aj vlastn\xE9 technick\xE9 experimenty, napr. <strong${_scopeId2}>ESP32-Smarwi Controller</strong> \u2013 syst\xE9m pre inteligentn\xE9 vetranie zalo\u017Een\xFD na DHT senzore, OTA aktualiz\xE1ci\xE1ch, HTTP API a backendom v AdonisJS. Kv\xF4li v\xE4\u010D\u0161ej \u0161k\xE1lovate\u013Enosti som pre\u0161iel z Arduino IDE na <strong${_scopeId2}>PlatformIO</strong> v prostred\xED VS Code. <br${_scopeId2}><br${_scopeId2}> Ako men\u0161\xED ved\u013Eaj\u0161\xED projekt spom\xEDnam aj str\xE1nku <a href="http://www.umy-ma.sk" target="_blank" rel="noopener noreferrer" aria-label="Extern\xFD odkaz na str\xE1nku umy-ma.sk"${_scopeId2}>umy-ma.sk</a>, ktor\xFA som vytvoril ako jednoduch\xFA vizitku pre kamar\xE1tov pomocou Vite. Projekt ukazuje r\xFDchle a ekonomick\xE9 nasadenie s minimalistick\xFDm pr\xEDstupom. <br${_scopeId2}><br${_scopeId2}> Moj\xEDm cie\u013Eom je priebe\u017Ene budova\u0165 <strong${_scopeId2}>portf\xF3lio funk\u010Dn\xFDch projektov</strong>, ktor\xE9 mi umo\u017E\u0148uj\xFA rozv\xEDja\u0165 schopnosti fullstack developera, pracova\u0165 s modern\xFDm frontendom, backendom, API architekt\xFArou a pr\xEDpadne aj integrova\u0165 IoT. </article>`);
            } else {
              return [
                createVNode("article", {
                  class: "text-justify",
                  style: { "line-height": "1.8" }
                }, [
                  createTextVNode(" Tento web vznikol ako m\xF4j "),
                  createVNode("strong", null, "testovac\xED projekt"),
                  createTextVNode(", kde si overujem nasadenie re\xE1lnych aplik\xE1ci\xED na vlastn\xFD server (Debian + PM2 + Nginx + Git cron deploy). Funguje teda tak, ako by be\u017Eala \u017Eiv\xE1 firemn\xE1 prezent\xE1cia alebo intern\xFD n\xE1stroj. "),
                  createVNode("br"),
                  createVNode("br"),
                  createTextVNode(" Ako s\xFA\u010Das\u0165 projektu som pripravil aj mal\xFD PoC: "),
                  createVNode(_component_NuxtLink, {
                    to: "/projects",
                    "aria-label": "Prejs\u0165 Projekty \u2013 Live WebSocket demo"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" WS BPM \u2013 Live WebSocket demo ")
                    ]),
                    _: 1
                  }),
                  createTextVNode(". Str\xE1nka \u010D\xEDta \u017Eiv\xE9 \u010D\xEDsla z WebSocketu (predvolene verejn\xFD stream) a mapuje ich do BPM, aby bolo vidie\u0165 pr\xE1cu s realtime d\xE1tami a plynulou vizualiz\xE1ciou. V produk\u010Dnom nasaden\xED je mo\u017En\xE9 pripoji\u0165 aj vlastn\xFD .NET WebSocket cez "),
                  createVNode("code", null, "runtimeConfig.public.wsUrl"),
                  createTextVNode(". "),
                  createVNode("br"),
                  createVNode("br"),
                  createTextVNode(" M\xE1m predch\xE1dzaj\xFAcu prax ako frontend v\xFDvoj\xE1r v spolo\u010Dnosti "),
                  createVNode("strong", null, "Railsformers (2022)"),
                  createTextVNode(", kde som jeden rok vytv\xE1ral \u0161abl\xF3ny v HTML/PHP pre firemn\xE9 CMS. Pracoval som "),
                  createVNode("strong", null, "desktop-first"),
                  createTextVNode(", pou\u017E\xEDval "),
                  createVNode("strong", null, "Bootstrap"),
                  createTextVNode(", rie\u0161il z\xE1klady "),
                  createVNode("strong", null, "technick\xE9ho SEO"),
                  createTextVNode(", jednoduch\xE9 anim\xE1cie a z\xE1kladn\xFD "),
                  createVNode("strong", null, "deploy"),
                  createTextVNode(". Dnes sa pos\xFAvam k pln\xE9mu "),
                  createVNode("strong", null, "fullstack v\xFDvoju"),
                  createTextVNode(" v modernom "),
                  createVNode("strong", null, "Vue/Nuxt ekosyst\xE9me"),
                  createTextVNode(", s d\xF4razom na komponentov\xFD pr\xEDstup, TypeScript a DevOps n\xE1stroje. "),
                  createVNode("br"),
                  createVNode("br"),
                  createTextVNode(" Popri webov\xFDch projektoch rozv\xEDjam aj vlastn\xE9 technick\xE9 experimenty, napr. "),
                  createVNode("strong", null, "ESP32-Smarwi Controller"),
                  createTextVNode(" \u2013 syst\xE9m pre inteligentn\xE9 vetranie zalo\u017Een\xFD na DHT senzore, OTA aktualiz\xE1ci\xE1ch, HTTP API a backendom v AdonisJS. Kv\xF4li v\xE4\u010D\u0161ej \u0161k\xE1lovate\u013Enosti som pre\u0161iel z Arduino IDE na "),
                  createVNode("strong", null, "PlatformIO"),
                  createTextVNode(" v prostred\xED VS Code. "),
                  createVNode("br"),
                  createVNode("br"),
                  createTextVNode(" Ako men\u0161\xED ved\u013Eaj\u0161\xED projekt spom\xEDnam aj str\xE1nku "),
                  createVNode("a", {
                    href: "http://www.umy-ma.sk",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    "aria-label": "Extern\xFD odkaz na str\xE1nku umy-ma.sk"
                  }, "umy-ma.sk"),
                  createTextVNode(", ktor\xFA som vytvoril ako jednoduch\xFA vizitku pre kamar\xE1tov pomocou Vite. Projekt ukazuje r\xFDchle a ekonomick\xE9 nasadenie s minimalistick\xFDm pr\xEDstupom. "),
                  createVNode("br"),
                  createVNode("br"),
                  createTextVNode(" Moj\xEDm cie\u013Eom je priebe\u017Ene budova\u0165 "),
                  createVNode("strong", null, "portf\xF3lio funk\u010Dn\xFDch projektov"),
                  createTextVNode(", ktor\xE9 mi umo\u017E\u0148uj\xFA rozv\xEDja\u0165 schopnosti fullstack developera, pracova\u0165 s modern\xFDm frontendom, backendom, API architekt\xFArou a pr\xEDpadne aj integrova\u0165 IoT. ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VCardText, { class: "text-body-1 text-center mt-8" }, {
            default: withCtx(() => [
              createVNode("article", {
                class: "text-justify",
                style: { "line-height": "1.8" }
              }, [
                createTextVNode(" Tento web vznikol ako m\xF4j "),
                createVNode("strong", null, "testovac\xED projekt"),
                createTextVNode(", kde si overujem nasadenie re\xE1lnych aplik\xE1ci\xED na vlastn\xFD server (Debian + PM2 + Nginx + Git cron deploy). Funguje teda tak, ako by be\u017Eala \u017Eiv\xE1 firemn\xE1 prezent\xE1cia alebo intern\xFD n\xE1stroj. "),
                createVNode("br"),
                createVNode("br"),
                createTextVNode(" Ako s\xFA\u010Das\u0165 projektu som pripravil aj mal\xFD PoC: "),
                createVNode(_component_NuxtLink, {
                  to: "/projects",
                  "aria-label": "Prejs\u0165 Projekty \u2013 Live WebSocket demo"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" WS BPM \u2013 Live WebSocket demo ")
                  ]),
                  _: 1
                }),
                createTextVNode(". Str\xE1nka \u010D\xEDta \u017Eiv\xE9 \u010D\xEDsla z WebSocketu (predvolene verejn\xFD stream) a mapuje ich do BPM, aby bolo vidie\u0165 pr\xE1cu s realtime d\xE1tami a plynulou vizualiz\xE1ciou. V produk\u010Dnom nasaden\xED je mo\u017En\xE9 pripoji\u0165 aj vlastn\xFD .NET WebSocket cez "),
                createVNode("code", null, "runtimeConfig.public.wsUrl"),
                createTextVNode(". "),
                createVNode("br"),
                createVNode("br"),
                createTextVNode(" M\xE1m predch\xE1dzaj\xFAcu prax ako frontend v\xFDvoj\xE1r v spolo\u010Dnosti "),
                createVNode("strong", null, "Railsformers (2022)"),
                createTextVNode(", kde som jeden rok vytv\xE1ral \u0161abl\xF3ny v HTML/PHP pre firemn\xE9 CMS. Pracoval som "),
                createVNode("strong", null, "desktop-first"),
                createTextVNode(", pou\u017E\xEDval "),
                createVNode("strong", null, "Bootstrap"),
                createTextVNode(", rie\u0161il z\xE1klady "),
                createVNode("strong", null, "technick\xE9ho SEO"),
                createTextVNode(", jednoduch\xE9 anim\xE1cie a z\xE1kladn\xFD "),
                createVNode("strong", null, "deploy"),
                createTextVNode(". Dnes sa pos\xFAvam k pln\xE9mu "),
                createVNode("strong", null, "fullstack v\xFDvoju"),
                createTextVNode(" v modernom "),
                createVNode("strong", null, "Vue/Nuxt ekosyst\xE9me"),
                createTextVNode(", s d\xF4razom na komponentov\xFD pr\xEDstup, TypeScript a DevOps n\xE1stroje. "),
                createVNode("br"),
                createVNode("br"),
                createTextVNode(" Popri webov\xFDch projektoch rozv\xEDjam aj vlastn\xE9 technick\xE9 experimenty, napr. "),
                createVNode("strong", null, "ESP32-Smarwi Controller"),
                createTextVNode(" \u2013 syst\xE9m pre inteligentn\xE9 vetranie zalo\u017Een\xFD na DHT senzore, OTA aktualiz\xE1ci\xE1ch, HTTP API a backendom v AdonisJS. Kv\xF4li v\xE4\u010D\u0161ej \u0161k\xE1lovate\u013Enosti som pre\u0161iel z Arduino IDE na "),
                createVNode("strong", null, "PlatformIO"),
                createTextVNode(" v prostred\xED VS Code. "),
                createVNode("br"),
                createVNode("br"),
                createTextVNode(" Ako men\u0161\xED ved\u013Eaj\u0161\xED projekt spom\xEDnam aj str\xE1nku "),
                createVNode("a", {
                  href: "http://www.umy-ma.sk",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "aria-label": "Extern\xFD odkaz na str\xE1nku umy-ma.sk"
                }, "umy-ma.sk"),
                createTextVNode(", ktor\xFA som vytvoril ako jednoduch\xFA vizitku pre kamar\xE1tov pomocou Vite. Projekt ukazuje r\xFDchle a ekonomick\xE9 nasadenie s minimalistick\xFDm pr\xEDstupom. "),
                createVNode("br"),
                createVNode("br"),
                createTextVNode(" Moj\xEDm cie\u013Eom je priebe\u017Ene budova\u0165 "),
                createVNode("strong", null, "portf\xF3lio funk\u010Dn\xFDch projektov"),
                createTextVNode(", ktor\xE9 mi umo\u017E\u0148uj\xFA rozv\xEDja\u0165 schopnosti fullstack developera, pracova\u0165 s modern\xFDm frontendom, backendom, API architekt\xFArou a pr\xEDpadne aj integrova\u0165 IoT. ")
              ])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MainArticle.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4]]);
const _sfc_main$3 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(ssrRenderComponent(VContainer, mergeProps({
    class: "mt-12",
    fluid: ""
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VRow, { justify: "center" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VCardActions, { class: "justify-center mt-6" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VBtn, {
                      color: "secondary",
                      to: "/projects",
                      size: "large",
                      class: "mx-2",
                      variant: "outlined",
                      "aria-label": "Prejs\u0165 na projekty"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(` Pozri Projekty `);
                        } else {
                          return [
                            createTextVNode(" Pozri Projekty ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VBtn, {
                      color: "secondary",
                      to: "/contact",
                      size: "large",
                      class: "mx-2",
                      "aria-label": "Kontaktujte ma"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(` Kontaktuj ma `);
                        } else {
                          return [
                            createTextVNode(" Kontaktuj ma ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VBtn, {
                        color: "secondary",
                        to: "/projects",
                        size: "large",
                        class: "mx-2",
                        variant: "outlined",
                        "aria-label": "Prejs\u0165 na projekty"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Pozri Projekty ")
                        ]),
                        _: 1
                      }),
                      createVNode(VBtn, {
                        color: "secondary",
                        to: "/contact",
                        size: "large",
                        class: "mx-2",
                        "aria-label": "Kontaktujte ma"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Kontaktuj ma ")
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
                createVNode(VCardActions, { class: "justify-center mt-6" }, {
                  default: withCtx(() => [
                    createVNode(VBtn, {
                      color: "secondary",
                      to: "/projects",
                      size: "large",
                      class: "mx-2",
                      variant: "outlined",
                      "aria-label": "Prejs\u0165 na projekty"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Pozri Projekty ")
                      ]),
                      _: 1
                    }),
                    createVNode(VBtn, {
                      color: "secondary",
                      to: "/contact",
                      size: "large",
                      class: "mx-2",
                      "aria-label": "Kontaktujte ma"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Kontaktuj ma ")
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
      } else {
        return [
          createVNode(VRow, { justify: "center" }, {
            default: withCtx(() => [
              createVNode(VCardActions, { class: "justify-center mt-6" }, {
                default: withCtx(() => [
                  createVNode(VBtn, {
                    color: "secondary",
                    to: "/projects",
                    size: "large",
                    class: "mx-2",
                    variant: "outlined",
                    "aria-label": "Prejs\u0165 na projekty"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Pozri Projekty ")
                    ]),
                    _: 1
                  }),
                  createVNode(VBtn, {
                    color: "secondary",
                    to: "/contact",
                    size: "large",
                    class: "mx-2",
                    "aria-label": "Kontaktujte ma"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Kontaktuj ma ")
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
  }, _parent));
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CallToAction.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3]]);
const _sfc_main$2 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  const _component_HandWave = __nuxt_component_0$1;
  const _component_MainArticle = __nuxt_component_1$1;
  const _component_CallToAction = __nuxt_component_2;
  _push(ssrRenderComponent(VCard, mergeProps({
    class: "pa-8",
    elevation: "10",
    "aria-label": "\xDAvodn\xFD popis projektu"
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VCardTitle, { class: "text-center d-flex justify-center align-center flex-wrap" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<span class="d-inline-flex align-center"${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_HandWave, { style: { "font-size": "1.5rem", "margin-right": "0.5rem" } }, null, _parent3, _scopeId2));
              _push3(`<h1 class="main-heading" aria-label="Hlavn\xFD nadpis str\xE1nky"${_scopeId2}>Vitaj na mm-smart.eu</h1></span>`);
            } else {
              return [
                createVNode("span", { class: "d-inline-flex align-center" }, [
                  createVNode(_component_HandWave, { style: { "font-size": "1.5rem", "margin-right": "0.5rem" } }),
                  createVNode("h1", {
                    class: "main-heading",
                    "aria-label": "Hlavn\xFD nadpis str\xE1nky"
                  }, "Vitaj na mm-smart.eu")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_MainArticle, null, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_CallToAction, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(VCardTitle, { class: "text-center d-flex justify-center align-center flex-wrap" }, {
            default: withCtx(() => [
              createVNode("span", { class: "d-inline-flex align-center" }, [
                createVNode(_component_HandWave, { style: { "font-size": "1.5rem", "margin-right": "0.5rem" } }),
                createVNode("h1", {
                  class: "main-heading",
                  "aria-label": "Hlavn\xFD nadpis str\xE1nky"
                }, "Vitaj na mm-smart.eu")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_MainArticle),
          createVNode(_component_CallToAction)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeroSection.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);
const makeVSheetProps = propsFactory({
  color: String,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, "VSheet");
const VSheet = genericComponent()({
  name: "VSheet",
  props: makeVSheetProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      borderClasses
    } = useBorder(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(["v-sheet", themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, props.class]),
      "style": normalizeStyle([backgroundColorStyles.value, dimensionStyles.value, locationStyles.value, props.style])
    }, slots));
    return {};
  }
});
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(ssrRenderComponent(VRow, mergeProps({
    justify: "center",
    class: "mt-12"
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VCol, {
          cols: "12",
          lg: ""
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VSheet, {
                class: "pa-6 text-center",
                color: "dark",
                rounded: ""
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<h2 class="text-h5 font-weight-medium mb-4" aria-label="Pou\u017Eit\xE9 technol\xF3gie"${_scopeId3}> Pou\u017Eit\xE9 technol\xF3gie na tomto projekte </h2><div class="d-flex justify-center flex-wrap my-4"${_scopeId3}>`);
                    _push4(ssrRenderComponent(VChip, {
                      class: "ma-1",
                      color: "primary",
                      "text-color": "white"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Vue 3`);
                        } else {
                          return [
                            createTextVNode("Vue 3")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VChip, {
                      class: "ma-1",
                      color: "primary",
                      "text-color": "white"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Nuxt 3`);
                        } else {
                          return [
                            createTextVNode("Nuxt 3")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VChip, {
                      class: "ma-1",
                      color: "primary",
                      "text-color": "white"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Vuetify 3`);
                        } else {
                          return [
                            createTextVNode("Vuetify 3")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VChip, {
                      class: "ma-1",
                      color: "primary",
                      "text-color": "white"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`TypeScript`);
                        } else {
                          return [
                            createTextVNode("TypeScript")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VChip, {
                      class: "ma-1",
                      color: "primary",
                      "text-color": "white"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`PM2`);
                        } else {
                          return [
                            createTextVNode("PM2")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VChip, {
                      class: "ma-1",
                      color: "primary",
                      "text-color": "white"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Cron Deploy`);
                        } else {
                          return [
                            createTextVNode("Cron Deploy")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VChip, {
                      class: "ma-1",
                      color: "primary",
                      "text-color": "white"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Git`);
                        } else {
                          return [
                            createTextVNode("Git")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VChip, {
                      class: "ma-1",
                      color: "primary",
                      "text-color": "white"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Nginx`);
                        } else {
                          return [
                            createTextVNode("Nginx")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VChip, {
                      class: "ma-1",
                      color: "primary",
                      "text-color": "white"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Debian`);
                        } else {
                          return [
                            createTextVNode("Debian")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VChip, {
                      class: "ma-1",
                      color: "primary",
                      "text-color": "white"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Cloudflare`);
                        } else {
                          return [
                            createTextVNode("Cloudflare")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VChip, {
                      class: "ma-1",
                      color: "primary",
                      "text-color": "white"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`ChatGPT 4.0`);
                        } else {
                          return [
                            createTextVNode("ChatGPT 4.0")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(`</div>`);
                  } else {
                    return [
                      createVNode("h2", {
                        class: "text-h5 font-weight-medium mb-4",
                        "aria-label": "Pou\u017Eit\xE9 technol\xF3gie"
                      }, " Pou\u017Eit\xE9 technol\xF3gie na tomto projekte "),
                      createVNode("div", { class: "d-flex justify-center flex-wrap my-4" }, [
                        createVNode(VChip, {
                          class: "ma-1",
                          color: "primary",
                          "text-color": "white"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Vue 3")
                          ]),
                          _: 1
                        }),
                        createVNode(VChip, {
                          class: "ma-1",
                          color: "primary",
                          "text-color": "white"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Nuxt 3")
                          ]),
                          _: 1
                        }),
                        createVNode(VChip, {
                          class: "ma-1",
                          color: "primary",
                          "text-color": "white"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Vuetify 3")
                          ]),
                          _: 1
                        }),
                        createVNode(VChip, {
                          class: "ma-1",
                          color: "primary",
                          "text-color": "white"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("TypeScript")
                          ]),
                          _: 1
                        }),
                        createVNode(VChip, {
                          class: "ma-1",
                          color: "primary",
                          "text-color": "white"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("PM2")
                          ]),
                          _: 1
                        }),
                        createVNode(VChip, {
                          class: "ma-1",
                          color: "primary",
                          "text-color": "white"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cron Deploy")
                          ]),
                          _: 1
                        }),
                        createVNode(VChip, {
                          class: "ma-1",
                          color: "primary",
                          "text-color": "white"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Git")
                          ]),
                          _: 1
                        }),
                        createVNode(VChip, {
                          class: "ma-1",
                          color: "primary",
                          "text-color": "white"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Nginx")
                          ]),
                          _: 1
                        }),
                        createVNode(VChip, {
                          class: "ma-1",
                          color: "primary",
                          "text-color": "white"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Debian")
                          ]),
                          _: 1
                        }),
                        createVNode(VChip, {
                          class: "ma-1",
                          color: "primary",
                          "text-color": "white"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cloudflare")
                          ]),
                          _: 1
                        }),
                        createVNode(VChip, {
                          class: "ma-1",
                          color: "primary",
                          "text-color": "white"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("ChatGPT 4.0")
                          ]),
                          _: 1
                        })
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VSheet, {
                  class: "pa-6 text-center",
                  color: "dark",
                  rounded: ""
                }, {
                  default: withCtx(() => [
                    createVNode("h2", {
                      class: "text-h5 font-weight-medium mb-4",
                      "aria-label": "Pou\u017Eit\xE9 technol\xF3gie"
                    }, " Pou\u017Eit\xE9 technol\xF3gie na tomto projekte "),
                    createVNode("div", { class: "d-flex justify-center flex-wrap my-4" }, [
                      createVNode(VChip, {
                        class: "ma-1",
                        color: "primary",
                        "text-color": "white"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Vue 3")
                        ]),
                        _: 1
                      }),
                      createVNode(VChip, {
                        class: "ma-1",
                        color: "primary",
                        "text-color": "white"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Nuxt 3")
                        ]),
                        _: 1
                      }),
                      createVNode(VChip, {
                        class: "ma-1",
                        color: "primary",
                        "text-color": "white"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Vuetify 3")
                        ]),
                        _: 1
                      }),
                      createVNode(VChip, {
                        class: "ma-1",
                        color: "primary",
                        "text-color": "white"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("TypeScript")
                        ]),
                        _: 1
                      }),
                      createVNode(VChip, {
                        class: "ma-1",
                        color: "primary",
                        "text-color": "white"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("PM2")
                        ]),
                        _: 1
                      }),
                      createVNode(VChip, {
                        class: "ma-1",
                        color: "primary",
                        "text-color": "white"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Cron Deploy")
                        ]),
                        _: 1
                      }),
                      createVNode(VChip, {
                        class: "ma-1",
                        color: "primary",
                        "text-color": "white"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Git")
                        ]),
                        _: 1
                      }),
                      createVNode(VChip, {
                        class: "ma-1",
                        color: "primary",
                        "text-color": "white"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Nginx")
                        ]),
                        _: 1
                      }),
                      createVNode(VChip, {
                        class: "ma-1",
                        color: "primary",
                        "text-color": "white"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Debian")
                        ]),
                        _: 1
                      }),
                      createVNode(VChip, {
                        class: "ma-1",
                        color: "primary",
                        "text-color": "white"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Cloudflare")
                        ]),
                        _: 1
                      }),
                      createVNode(VChip, {
                        class: "ma-1",
                        color: "primary",
                        "text-color": "white"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("ChatGPT 4.0")
                        ]),
                        _: 1
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
      } else {
        return [
          createVNode(VCol, {
            cols: "12",
            lg: ""
          }, {
            default: withCtx(() => [
              createVNode(VSheet, {
                class: "pa-6 text-center",
                color: "dark",
                rounded: ""
              }, {
                default: withCtx(() => [
                  createVNode("h2", {
                    class: "text-h5 font-weight-medium mb-4",
                    "aria-label": "Pou\u017Eit\xE9 technol\xF3gie"
                  }, " Pou\u017Eit\xE9 technol\xF3gie na tomto projekte "),
                  createVNode("div", { class: "d-flex justify-center flex-wrap my-4" }, [
                    createVNode(VChip, {
                      class: "ma-1",
                      color: "primary",
                      "text-color": "white"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Vue 3")
                      ]),
                      _: 1
                    }),
                    createVNode(VChip, {
                      class: "ma-1",
                      color: "primary",
                      "text-color": "white"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Nuxt 3")
                      ]),
                      _: 1
                    }),
                    createVNode(VChip, {
                      class: "ma-1",
                      color: "primary",
                      "text-color": "white"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Vuetify 3")
                      ]),
                      _: 1
                    }),
                    createVNode(VChip, {
                      class: "ma-1",
                      color: "primary",
                      "text-color": "white"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("TypeScript")
                      ]),
                      _: 1
                    }),
                    createVNode(VChip, {
                      class: "ma-1",
                      color: "primary",
                      "text-color": "white"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("PM2")
                      ]),
                      _: 1
                    }),
                    createVNode(VChip, {
                      class: "ma-1",
                      color: "primary",
                      "text-color": "white"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Cron Deploy")
                      ]),
                      _: 1
                    }),
                    createVNode(VChip, {
                      class: "ma-1",
                      color: "primary",
                      "text-color": "white"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Git")
                      ]),
                      _: 1
                    }),
                    createVNode(VChip, {
                      class: "ma-1",
                      color: "primary",
                      "text-color": "white"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Nginx")
                      ]),
                      _: 1
                    }),
                    createVNode(VChip, {
                      class: "ma-1",
                      color: "primary",
                      "text-color": "white"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Debian")
                      ]),
                      _: 1
                    }),
                    createVNode(VChip, {
                      class: "ma-1",
                      color: "primary",
                      "text-color": "white"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Cloudflare")
                      ]),
                      _: 1
                    }),
                    createVNode(VChip, {
                      class: "ma-1",
                      color: "primary",
                      "text-color": "white"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("ChatGPT 4.0")
                      ]),
                      _: 1
                    })
                  ])
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
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TechnologyStack.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_HeroSection = __nuxt_component_0;
  const _component_TechnologyStack = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(_attrs)}><section aria-label="\xDAvodn\xE1 prezent\xE1cia projektu">`);
  _push(ssrRenderComponent(_component_HeroSection, null, null, _parent));
  _push(`</section><section aria-label="Zoznam pou\u017Eit\xFDch technol\xF3gi\xED">`);
  _push(ssrRenderComponent(_component_TechnologyStack, null, null, _parent));
  _push(`</section></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-BV3_ZBsJ.mjs.map
