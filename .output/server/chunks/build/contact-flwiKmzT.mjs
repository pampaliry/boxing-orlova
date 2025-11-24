import { resolveComponent, withCtx, createVNode, defineComponent, reactive, ref, watch, mergeProps, createTextVNode, createBlock, createCommentVNode, openBlock, withModifiers, nextTick, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{ name: "ContactForm" },
  __name: "ContactForm",
  __ssrInlineRender: true,
  setup(__props) {
    const form = reactive({
      name: "",
      email: "",
      message: ""
    });
    const errors = reactive({
      name: "",
      email: "",
      message: ""
    });
    const loading = ref(false);
    const success = ref(false);
    watch(() => form.name, (val) => {
      errors.name = val.trim().length < 2 ? "Zadaj aspo\u0148 2 znaky." : "";
    });
    watch(() => form.email, (val) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      errors.email = emailRegex.test(val) ? "" : "Zadaj platn\xFD e-mail.";
    });
    watch(() => form.message, (val) => {
      errors.message = val.trim().length < 10 ? "Spr\xE1va mus\xED ma\u0165 aspo\u0148 10 znakov." : "";
    });
    const resetForm = async () => {
      form.name = "";
      form.email = "";
      form.message = "";
      await nextTick();
      errors.name = "";
      errors.email = "";
      errors.message = "";
    };
    const submitForm = async () => {
      loading.value = true;
      success.value = false;
      if (errors.name || errors.email || errors.message) {
        loading.value = false;
        return;
      }
      try {
        const res = await $fetch("/api/send-contact", {
          method: "POST",
          body: { name: form.name, email: form.email, message: form.message }
        });
        if (res.success) {
          success.value = true;
          await resetForm();
        }
      } catch (err) {
        console.error("Chyba pri odosielan\xED:", err);
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_container = resolveComponent("v-container");
      const _component_v_row = resolveComponent("v-row");
      const _component_v_col = resolveComponent("v-col");
      const _component_v_form = resolveComponent("v-form");
      const _component_v_text_field = resolveComponent("v-text-field");
      const _component_v_textarea = resolveComponent("v-textarea");
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_alert = resolveComponent("v-alert");
      _push(ssrRenderComponent(_component_v_container, mergeProps({
        class: "my-12",
        fluid: ""
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_row, { justify: "center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_col, {
                    cols: "12",
                    md: "10"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_v_form, {
                          "aria-label": "Kontaktn\xFD formul\xE1r",
                          role: "form",
                          onSubmit: submitForm
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_v_text_field, {
                                modelValue: form.name,
                                "onUpdate:modelValue": ($event) => form.name = $event,
                                label: "Meno",
                                placeholder: "Tvoje meno",
                                "error-messages": errors.name,
                                required: "",
                                outlined: "",
                                class: "mb-4",
                                "aria-label": "Meno"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_v_text_field, {
                                modelValue: form.email,
                                "onUpdate:modelValue": ($event) => form.email = $event,
                                label: "Email",
                                placeholder: "tvoj@email.com",
                                "error-messages": errors.email,
                                required: "",
                                type: "email",
                                outlined: "",
                                class: "mb-4",
                                "aria-label": "Emailov\xE1 adresa",
                                autocomplete: "email",
                                inputmode: "email"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_v_textarea, {
                                modelValue: form.message,
                                "onUpdate:modelValue": ($event) => form.message = $event,
                                label: "Spr\xE1va",
                                placeholder: "Nap\xED\u0161 svoju spr\xE1vu...",
                                "error-messages": errors.message,
                                rows: "4",
                                required: "",
                                outlined: "",
                                class: "mb-4",
                                "aria-label": "Spr\xE1va"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_v_btn, {
                                loading: loading.value,
                                color: "secondary",
                                class: "mt-4",
                                type: "submit",
                                "aria-label": "Odosla\u0165 spr\xE1vu"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Odosla\u0165 `);
                                  } else {
                                    return [
                                      createTextVNode(" Odosla\u0165 ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              if (success.value) {
                                _push5(ssrRenderComponent(_component_v_alert, {
                                  type: "success",
                                  class: "mt-4",
                                  role: "alert",
                                  "aria-live": "polite"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` Spr\xE1va bola \xFAspe\u0161ne odoslan\xE1! `);
                                    } else {
                                      return [
                                        createTextVNode(" Spr\xE1va bola \xFAspe\u0161ne odoslan\xE1! ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                createVNode(_component_v_text_field, {
                                  modelValue: form.name,
                                  "onUpdate:modelValue": ($event) => form.name = $event,
                                  label: "Meno",
                                  placeholder: "Tvoje meno",
                                  "error-messages": errors.name,
                                  required: "",
                                  outlined: "",
                                  class: "mb-4",
                                  "aria-label": "Meno"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]),
                                createVNode(_component_v_text_field, {
                                  modelValue: form.email,
                                  "onUpdate:modelValue": ($event) => form.email = $event,
                                  label: "Email",
                                  placeholder: "tvoj@email.com",
                                  "error-messages": errors.email,
                                  required: "",
                                  type: "email",
                                  outlined: "",
                                  class: "mb-4",
                                  "aria-label": "Emailov\xE1 adresa",
                                  autocomplete: "email",
                                  inputmode: "email"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]),
                                createVNode(_component_v_textarea, {
                                  modelValue: form.message,
                                  "onUpdate:modelValue": ($event) => form.message = $event,
                                  label: "Spr\xE1va",
                                  placeholder: "Nap\xED\u0161 svoju spr\xE1vu...",
                                  "error-messages": errors.message,
                                  rows: "4",
                                  required: "",
                                  outlined: "",
                                  class: "mb-4",
                                  "aria-label": "Spr\xE1va"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]),
                                createVNode(_component_v_btn, {
                                  loading: loading.value,
                                  color: "secondary",
                                  class: "mt-4",
                                  type: "submit",
                                  "aria-label": "Odosla\u0165 spr\xE1vu"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Odosla\u0165 ")
                                  ]),
                                  _: 1
                                }, 8, ["loading"]),
                                success.value ? (openBlock(), createBlock(_component_v_alert, {
                                  key: 0,
                                  type: "success",
                                  class: "mt-4",
                                  role: "alert",
                                  "aria-live": "polite"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Spr\xE1va bola \xFAspe\u0161ne odoslan\xE1! ")
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_v_form, {
                            "aria-label": "Kontaktn\xFD formul\xE1r",
                            role: "form",
                            onSubmit: withModifiers(submitForm, ["prevent"])
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_v_text_field, {
                                modelValue: form.name,
                                "onUpdate:modelValue": ($event) => form.name = $event,
                                label: "Meno",
                                placeholder: "Tvoje meno",
                                "error-messages": errors.name,
                                required: "",
                                outlined: "",
                                class: "mb-4",
                                "aria-label": "Meno"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]),
                              createVNode(_component_v_text_field, {
                                modelValue: form.email,
                                "onUpdate:modelValue": ($event) => form.email = $event,
                                label: "Email",
                                placeholder: "tvoj@email.com",
                                "error-messages": errors.email,
                                required: "",
                                type: "email",
                                outlined: "",
                                class: "mb-4",
                                "aria-label": "Emailov\xE1 adresa",
                                autocomplete: "email",
                                inputmode: "email"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]),
                              createVNode(_component_v_textarea, {
                                modelValue: form.message,
                                "onUpdate:modelValue": ($event) => form.message = $event,
                                label: "Spr\xE1va",
                                placeholder: "Nap\xED\u0161 svoju spr\xE1vu...",
                                "error-messages": errors.message,
                                rows: "4",
                                required: "",
                                outlined: "",
                                class: "mb-4",
                                "aria-label": "Spr\xE1va"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]),
                              createVNode(_component_v_btn, {
                                loading: loading.value,
                                color: "secondary",
                                class: "mt-4",
                                type: "submit",
                                "aria-label": "Odosla\u0165 spr\xE1vu"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Odosla\u0165 ")
                                ]),
                                _: 1
                              }, 8, ["loading"]),
                              success.value ? (openBlock(), createBlock(_component_v_alert, {
                                key: 0,
                                type: "success",
                                class: "mt-4",
                                role: "alert",
                                "aria-live": "polite"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Spr\xE1va bola \xFAspe\u0161ne odoslan\xE1! ")
                                ]),
                                _: 1
                              })) : createCommentVNode("", true)
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
                    createVNode(_component_v_col, {
                      cols: "12",
                      md: "10"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_form, {
                          "aria-label": "Kontaktn\xFD formul\xE1r",
                          role: "form",
                          onSubmit: withModifiers(submitForm, ["prevent"])
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_v_text_field, {
                              modelValue: form.name,
                              "onUpdate:modelValue": ($event) => form.name = $event,
                              label: "Meno",
                              placeholder: "Tvoje meno",
                              "error-messages": errors.name,
                              required: "",
                              outlined: "",
                              class: "mb-4",
                              "aria-label": "Meno"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]),
                            createVNode(_component_v_text_field, {
                              modelValue: form.email,
                              "onUpdate:modelValue": ($event) => form.email = $event,
                              label: "Email",
                              placeholder: "tvoj@email.com",
                              "error-messages": errors.email,
                              required: "",
                              type: "email",
                              outlined: "",
                              class: "mb-4",
                              "aria-label": "Emailov\xE1 adresa",
                              autocomplete: "email",
                              inputmode: "email"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]),
                            createVNode(_component_v_textarea, {
                              modelValue: form.message,
                              "onUpdate:modelValue": ($event) => form.message = $event,
                              label: "Spr\xE1va",
                              placeholder: "Nap\xED\u0161 svoju spr\xE1vu...",
                              "error-messages": errors.message,
                              rows: "4",
                              required: "",
                              outlined: "",
                              class: "mb-4",
                              "aria-label": "Spr\xE1va"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]),
                            createVNode(_component_v_btn, {
                              loading: loading.value,
                              color: "secondary",
                              class: "mt-4",
                              type: "submit",
                              "aria-label": "Odosla\u0165 spr\xE1vu"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Odosla\u0165 ")
                              ]),
                              _: 1
                            }, 8, ["loading"]),
                            success.value ? (openBlock(), createBlock(_component_v_alert, {
                              key: 0,
                              type: "success",
                              class: "mt-4",
                              role: "alert",
                              "aria-live": "polite"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Spr\xE1va bola \xFAspe\u0161ne odoslan\xE1! ")
                              ]),
                              _: 1
                            })) : createCommentVNode("", true)
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
              createVNode(_component_v_row, { justify: "center" }, {
                default: withCtx(() => [
                  createVNode(_component_v_col, {
                    cols: "12",
                    md: "10"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_v_form, {
                        "aria-label": "Kontaktn\xFD formul\xE1r",
                        role: "form",
                        onSubmit: withModifiers(submitForm, ["prevent"])
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_v_text_field, {
                            modelValue: form.name,
                            "onUpdate:modelValue": ($event) => form.name = $event,
                            label: "Meno",
                            placeholder: "Tvoje meno",
                            "error-messages": errors.name,
                            required: "",
                            outlined: "",
                            class: "mb-4",
                            "aria-label": "Meno"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]),
                          createVNode(_component_v_text_field, {
                            modelValue: form.email,
                            "onUpdate:modelValue": ($event) => form.email = $event,
                            label: "Email",
                            placeholder: "tvoj@email.com",
                            "error-messages": errors.email,
                            required: "",
                            type: "email",
                            outlined: "",
                            class: "mb-4",
                            "aria-label": "Emailov\xE1 adresa",
                            autocomplete: "email",
                            inputmode: "email"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]),
                          createVNode(_component_v_textarea, {
                            modelValue: form.message,
                            "onUpdate:modelValue": ($event) => form.message = $event,
                            label: "Spr\xE1va",
                            placeholder: "Nap\xED\u0161 svoju spr\xE1vu...",
                            "error-messages": errors.message,
                            rows: "4",
                            required: "",
                            outlined: "",
                            class: "mb-4",
                            "aria-label": "Spr\xE1va"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]),
                          createVNode(_component_v_btn, {
                            loading: loading.value,
                            color: "secondary",
                            class: "mt-4",
                            type: "submit",
                            "aria-label": "Odosla\u0165 spr\xE1vu"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Odosla\u0165 ")
                            ]),
                            _: 1
                          }, 8, ["loading"]),
                          success.value ? (openBlock(), createBlock(_component_v_alert, {
                            key: 0,
                            type: "success",
                            class: "mt-4",
                            role: "alert",
                            "aria-live": "polite"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Spr\xE1va bola \xFAspe\u0161ne odoslan\xE1! ")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
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
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ContactForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_v_card = resolveComponent("v-card");
  const _component_v_container = resolveComponent("v-container");
  const _component_v_row = resolveComponent("v-row");
  const _component_v_col = resolveComponent("v-col");
  const _component_v_card_title = resolveComponent("v-card-title");
  const _component_v_card_text = resolveComponent("v-card-text");
  const _component_ContactForm = _sfc_main$1;
  _push(`<section${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_v_card, {
    "d-flex": "",
    "justify-center": ""
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_v_container, { fluid: "" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_v_row, { justify: "center" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_v_col, { cols: "10" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_v_card_title, { class: "text-center" }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(`<h1 aria-label="Kontaktn\xFD formul\xE1r"${_scopeId5}> Kontaktn\xFD formul\xE1r </h1>`);
                              } else {
                                return [
                                  createVNode("h1", { "aria-label": "Kontaktn\xFD formul\xE1r" }, " Kontaktn\xFD formul\xE1r ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(_component_v_card_text, { class: "text-center" }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(`<p${_scopeId5}> je plne funk\u010Dn\xFD a \u010Dak\xE1 na va\u0161e spr\xE1vy. M\xF4\u017Eete ho pou\u017Ei\u0165 na odoslanie spr\xE1v, ot\xE1zok alebo sp\xE4tnej v\xE4zby. </p>`);
                              } else {
                                return [
                                  createVNode("p", null, " je plne funk\u010Dn\xFD a \u010Dak\xE1 na va\u0161e spr\xE1vy. M\xF4\u017Eete ho pou\u017Ei\u0165 na odoslanie spr\xE1v, ot\xE1zok alebo sp\xE4tnej v\xE4zby. ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_v_card_title, { class: "text-center" }, {
                              default: withCtx(() => [
                                createVNode("h1", { "aria-label": "Kontaktn\xFD formul\xE1r" }, " Kontaktn\xFD formul\xE1r ")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_v_card_text, { class: "text-center" }, {
                              default: withCtx(() => [
                                createVNode("p", null, " je plne funk\u010Dn\xFD a \u010Dak\xE1 na va\u0161e spr\xE1vy. M\xF4\u017Eete ho pou\u017Ei\u0165 na odoslanie spr\xE1v, ot\xE1zok alebo sp\xE4tnej v\xE4zby. ")
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
                      createVNode(_component_v_col, { cols: "10" }, {
                        default: withCtx(() => [
                          createVNode(_component_v_card_title, { class: "text-center" }, {
                            default: withCtx(() => [
                              createVNode("h1", { "aria-label": "Kontaktn\xFD formul\xE1r" }, " Kontaktn\xFD formul\xE1r ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_v_card_text, { class: "text-center" }, {
                            default: withCtx(() => [
                              createVNode("p", null, " je plne funk\u010Dn\xFD a \u010Dak\xE1 na va\u0161e spr\xE1vy. M\xF4\u017Eete ho pou\u017Ei\u0165 na odoslanie spr\xE1v, ot\xE1zok alebo sp\xE4tnej v\xE4zby. ")
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
                createVNode(_component_v_row, { justify: "center" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_col, { cols: "10" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_card_title, { class: "text-center" }, {
                          default: withCtx(() => [
                            createVNode("h1", { "aria-label": "Kontaktn\xFD formul\xE1r" }, " Kontaktn\xFD formul\xE1r ")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_card_text, { class: "text-center" }, {
                          default: withCtx(() => [
                            createVNode("p", null, " je plne funk\u010Dn\xFD a \u010Dak\xE1 na va\u0161e spr\xE1vy. M\xF4\u017Eete ho pou\u017Ei\u0165 na odoslanie spr\xE1v, ot\xE1zok alebo sp\xE4tnej v\xE4zby. ")
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
        _push2(ssrRenderComponent(_component_ContactForm, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_v_container, { fluid: "" }, {
            default: withCtx(() => [
              createVNode(_component_v_row, { justify: "center" }, {
                default: withCtx(() => [
                  createVNode(_component_v_col, { cols: "10" }, {
                    default: withCtx(() => [
                      createVNode(_component_v_card_title, { class: "text-center" }, {
                        default: withCtx(() => [
                          createVNode("h1", { "aria-label": "Kontaktn\xFD formul\xE1r" }, " Kontaktn\xFD formul\xE1r ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_v_card_text, { class: "text-center" }, {
                        default: withCtx(() => [
                          createVNode("p", null, " je plne funk\u010Dn\xFD a \u010Dak\xE1 na va\u0161e spr\xE1vy. M\xF4\u017Eete ho pou\u017Ei\u0165 na odoslanie spr\xE1v, ot\xE1zok alebo sp\xE4tnej v\xE4zby. ")
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
          createVNode(_component_ContactForm)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</section>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const contact = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { contact as default };
//# sourceMappingURL=contact-flwiKmzT.mjs.map
