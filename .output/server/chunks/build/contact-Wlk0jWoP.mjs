import { withCtx, createVNode, defineComponent, reactive, ref, watch, mergeProps, createTextVNode, createBlock, createCommentVNode, openBlock, withModifiers, createElementVNode, normalizeStyle, normalizeClass, computed, Fragment, withDirectives, cloneVNode, shallowRef, watchEffect, vModelText, toRef, provide, markRaw, nextTick, useId, vShow, unref, inject, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { b as VContainer, V as VRow, a as VCol, c as VBtn } from './VBtn-BA5cI5Nv.mjs';
import { _ as _export_sfc, g as genericComponent, p as propsFactory, f as useRender, z as useProxiedModel, Y as filterInputAttrs, Z as omit, e as provideTheme, y as useLocale, h as makeComponentProps, T as consoleWarn, H as getCurrentInstanceName, j as useRtl, q as convertToUnit, V as callEvent, o as clamp, m as makeThemeProps, I as IconValue, E as EventProp, X as pick, S as wrapInArray, O as getCurrentInstance, Q as useToggleScope, W as standardEasing } from './server.mjs';
import { I as Intersect, n as useVariant, o as useDensity, b as useDimension, c as useElevation, d as useLocation, e as usePosition, f as useRounded, p as useTextColor, q as genOverlays, V as VIcon, r as VDefaultsProvider, s as createSimpleFunctional, t as useLoader, u as useBackgroundColor, L as LoaderSlot, v as VExpandXTransition, M as MaybeTransition, w as makeVariantProps, m as makeTagProps, g as makeRoundedProps, h as makePositionProps, i as makeLocationProps, j as makeElevationProps, k as makeDimensionProps, x as makeDensityProps, y as makeLoaderProps, z as makeTransitionProps$1, A as VSlideYTransition } from './index-DL6waHdU.mjs';
import { V as VCard, a as VCardTitle, b as VCardText } from './VCard-BIOVXzFL.mjs';
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

class Box {
  constructor(_ref) {
    let {
      x,
      y,
      width,
      height
    } = _ref;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  get top() {
    return this.y;
  }
  get bottom() {
    return this.y + this.height;
  }
  get left() {
    return this.x;
  }
  get right() {
    return this.x + this.width;
  }
}
function nullifyTransforms(el) {
  const rect = el.getBoundingClientRect();
  const style = getComputedStyle(el);
  const tx = style.transform;
  if (tx) {
    let ta, sx, sy, dx, dy;
    if (tx.startsWith("matrix3d(")) {
      ta = tx.slice(9, -1).split(/, /);
      sx = Number(ta[0]);
      sy = Number(ta[5]);
      dx = Number(ta[12]);
      dy = Number(ta[13]);
    } else if (tx.startsWith("matrix(")) {
      ta = tx.slice(7, -1).split(/, /);
      sx = Number(ta[0]);
      sy = Number(ta[3]);
      dx = Number(ta[4]);
      dy = Number(ta[5]);
    } else {
      return new Box(rect);
    }
    const to = style.transformOrigin;
    const x = rect.x - dx - (1 - sx) * parseFloat(to);
    const y = rect.y - dy - (1 - sy) * parseFloat(to.slice(to.indexOf(" ") + 1));
    const w = sx ? rect.width / sx : el.offsetWidth + 1;
    const h = sy ? rect.height / sy : el.offsetHeight + 1;
    return new Box({
      x,
      y,
      width: w,
      height: h
    });
  } else {
    return new Box(rect);
  }
}
function animate(el, keyframes, options) {
  if (typeof el.animate === "undefined") return {
    finished: Promise.resolve()
  };
  let animation;
  try {
    animation = el.animate(keyframes, options);
  } catch (err) {
    return {
      finished: Promise.resolve()
    };
  }
  if (typeof animation.finished === "undefined") {
    animation.finished = new Promise((resolve) => {
      animation.onfinish = () => {
        resolve(animation);
      };
    });
  }
  return animation;
}
const VAlertTitle = createSimpleFunctional("v-alert-title");
const makeIconSizeProps = propsFactory({
  iconSize: [Number, String],
  iconSizes: {
    type: Array,
    default: () => [["x-small", 10], ["small", 16], ["default", 24], ["large", 28], ["x-large", 32]]
  }
}, "iconSize");
function useIconSizes(props, fallback) {
  const iconSize = computed(() => {
    var _a, _b;
    const iconSizeMap = new Map(props.iconSizes);
    const _iconSize = (_b = (_a = props.iconSize) != null ? _a : fallback()) != null ? _b : "default";
    return iconSizeMap.has(_iconSize) ? iconSizeMap.get(_iconSize) : _iconSize;
  });
  return {
    iconSize
  };
}
const allowedTypes = ["success", "info", "warning", "error"];
const makeVAlertProps = propsFactory({
  border: {
    type: [Boolean, String],
    validator: (val) => {
      return typeof val === "boolean" || ["top", "end", "bottom", "start"].includes(val);
    }
  },
  borderColor: String,
  closable: Boolean,
  closeIcon: {
    type: IconValue,
    default: "$close"
  },
  closeLabel: {
    type: String,
    default: "$vuetify.close"
  },
  icon: {
    type: [Boolean, String, Function, Object],
    default: null
  },
  modelValue: {
    type: Boolean,
    default: true
  },
  prominent: Boolean,
  title: String,
  text: String,
  type: {
    type: String,
    validator: (val) => allowedTypes.includes(val)
  },
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeIconSizeProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "flat"
  })
}, "VAlert");
const VAlert = genericComponent()({
  name: "VAlert",
  props: makeVAlertProps(),
  emits: {
    "click:close": (e) => true,
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const isActive = useProxiedModel(props, "modelValue");
    const icon = toRef(() => {
      var _a;
      if (props.icon === false) return void 0;
      if (!props.type) return props.icon;
      return (_a = props.icon) != null ? _a : `$${props.type}`;
    });
    const {
      iconSize
    } = useIconSizes(props, () => props.prominent ? 44 : void 0);
    const {
      themeClasses
    } = provideTheme(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(() => {
      var _a;
      return {
        color: (_a = props.color) != null ? _a : props.type,
        variant: props.variant
      };
    });
    const {
      densityClasses
    } = useDensity(props);
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
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => props.borderColor);
    const {
      t
    } = useLocale();
    const closeProps = toRef(() => ({
      "aria-label": t(props.closeLabel),
      onClick(e) {
        isActive.value = false;
        emit("click:close", e);
      }
    }));
    return () => {
      const hasPrepend = !!(slots.prepend || icon.value);
      const hasTitle = !!(slots.title || props.title);
      const hasClose = !!(slots.close || props.closable);
      const iconProps = {
        density: props.density,
        icon: icon.value,
        size: props.iconSize || props.prominent ? iconSize.value : void 0
      };
      return isActive.value && createVNode(props.tag, {
        "class": normalizeClass(["v-alert", props.border && {
          "v-alert--border": !!props.border,
          [`v-alert--border-${props.border === true ? "start" : props.border}`]: true
        }, {
          "v-alert--prominent": props.prominent
        }, themeClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, variantClasses.value, props.class]),
        "style": normalizeStyle([colorStyles.value, dimensionStyles.value, locationStyles.value, props.style]),
        "role": "alert"
      }, {
        default: () => {
          var _a, _b, _c;
          return [genOverlays(false, "v-alert"), props.border && createElementVNode("div", {
            "key": "border",
            "class": normalizeClass(["v-alert__border", textColorClasses.value]),
            "style": normalizeStyle(textColorStyles.value)
          }, null), hasPrepend && createElementVNode("div", {
            "key": "prepend",
            "class": "v-alert__prepend"
          }, [!slots.prepend ? createVNode(VIcon, mergeProps({
            "key": "prepend-icon"
          }, iconProps), null) : createVNode(VDefaultsProvider, {
            "key": "prepend-defaults",
            "disabled": !icon.value,
            "defaults": {
              VIcon: {
                ...iconProps
              }
            }
          }, slots.prepend)]), createElementVNode("div", {
            "class": "v-alert__content"
          }, [hasTitle && createVNode(VAlertTitle, {
            "key": "title"
          }, {
            default: () => {
              var _a2, _b2;
              return [(_b2 = (_a2 = slots.title) == null ? void 0 : _a2.call(slots)) != null ? _b2 : props.title];
            }
          }), (_b = (_a = slots.text) == null ? void 0 : _a.call(slots)) != null ? _b : props.text, (_c = slots.default) == null ? void 0 : _c.call(slots)]), slots.append && createElementVNode("div", {
            "key": "append",
            "class": "v-alert__append"
          }, [slots.append()]), hasClose && createElementVNode("div", {
            "key": "close",
            "class": "v-alert__close"
          }, [!slots.close ? createVNode(VBtn, mergeProps({
            "key": "close-btn",
            "icon": props.closeIcon,
            "size": "x-small",
            "variant": "text"
          }, closeProps.value), null) : createVNode(VDefaultsProvider, {
            "key": "close-defaults",
            "defaults": {
              VBtn: {
                icon: props.closeIcon,
                size: "x-small",
                variant: "text"
              }
            }
          }, {
            default: () => {
              var _a2;
              return [(_a2 = slots.close) == null ? void 0 : _a2.call(slots, {
                props: closeProps.value
              })];
            }
          })])];
        }
      });
    };
  }
});
const FormKey = Symbol.for("vuetify:form");
const makeFormProps = propsFactory({
  disabled: Boolean,
  fastFail: Boolean,
  readonly: Boolean,
  modelValue: {
    type: Boolean,
    default: null
  },
  validateOn: {
    type: String,
    default: "input"
  }
}, "form");
function createForm(props) {
  const model = useProxiedModel(props, "modelValue");
  const isDisabled = toRef(() => props.disabled);
  const isReadonly = toRef(() => props.readonly);
  const isValidating = shallowRef(false);
  const items = ref([]);
  const errors = ref([]);
  async function validate() {
    const results = [];
    let valid = true;
    errors.value = [];
    isValidating.value = true;
    for (const item of items.value) {
      const itemErrorMessages = await item.validate();
      if (itemErrorMessages.length > 0) {
        valid = false;
        results.push({
          id: item.id,
          errorMessages: itemErrorMessages
        });
      }
      if (!valid && props.fastFail) break;
    }
    errors.value = results;
    isValidating.value = false;
    return {
      valid,
      errors: errors.value
    };
  }
  function reset() {
    items.value.forEach((item) => item.reset());
  }
  function resetValidation() {
    items.value.forEach((item) => item.resetValidation());
  }
  watch(items, () => {
    let valid = 0;
    let invalid = 0;
    const results = [];
    for (const item of items.value) {
      if (item.isValid === false) {
        invalid++;
        results.push({
          id: item.id,
          errorMessages: item.errorMessages
        });
      } else if (item.isValid === true) valid++;
    }
    errors.value = results;
    model.value = invalid > 0 ? false : valid === items.value.length ? true : null;
  }, {
    deep: true,
    flush: "post"
  });
  provide(FormKey, {
    register: (_ref) => {
      let {
        id,
        vm,
        validate: validate2,
        reset: reset2,
        resetValidation: resetValidation2
      } = _ref;
      if (items.value.some((item) => item.id === id)) {
        consoleWarn(`Duplicate input name "${id}"`);
      }
      items.value.push({
        id,
        validate: validate2,
        reset: reset2,
        resetValidation: resetValidation2,
        vm: markRaw(vm),
        isValid: null,
        errorMessages: []
      });
    },
    unregister: (id) => {
      items.value = items.value.filter((item) => {
        return item.id !== id;
      });
    },
    update: (id, isValid, errorMessages) => {
      const found = items.value.find((item) => item.id === id);
      if (!found) return;
      found.isValid = isValid;
      found.errorMessages = errorMessages;
    },
    isDisabled,
    isReadonly,
    isValidating,
    isValid: model,
    items,
    validateOn: toRef(() => props.validateOn)
  });
  return {
    errors,
    isDisabled,
    isReadonly,
    isValidating,
    isValid: model,
    items,
    validate,
    reset,
    resetValidation
  };
}
function useForm(props) {
  const form = inject(FormKey, null);
  return {
    ...form,
    isReadonly: computed(() => {
      var _a;
      return !!((_a = props == null ? void 0 : props.readonly) != null ? _a : form == null ? void 0 : form.isReadonly.value);
    }),
    isDisabled: computed(() => {
      var _a;
      return !!((_a = props == null ? void 0 : props.disabled) != null ? _a : form == null ? void 0 : form.isDisabled.value);
    })
  };
}
const Refs = Symbol("Forwarded refs");
function getDescriptor(obj, key) {
  let currentObj = obj;
  while (currentObj) {
    const descriptor = Reflect.getOwnPropertyDescriptor(currentObj, key);
    if (descriptor) return descriptor;
    currentObj = Object.getPrototypeOf(currentObj);
  }
  return void 0;
}
function forwardRefs(target) {
  for (var _len = arguments.length, refs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    refs[_key - 1] = arguments[_key];
  }
  target[Refs] = refs;
  return new Proxy(target, {
    get(target2, key) {
      if (Reflect.has(target2, key)) {
        return Reflect.get(target2, key);
      }
      if (typeof key === "symbol" || key.startsWith("$") || key.startsWith("__")) return;
      for (const ref2 of refs) {
        if (ref2.value && Reflect.has(ref2.value, key)) {
          const val = Reflect.get(ref2.value, key);
          return typeof val === "function" ? val.bind(ref2.value) : val;
        }
      }
    },
    has(target2, key) {
      if (Reflect.has(target2, key)) {
        return true;
      }
      if (typeof key === "symbol" || key.startsWith("$") || key.startsWith("__")) return false;
      for (const ref2 of refs) {
        if (ref2.value && Reflect.has(ref2.value, key)) {
          return true;
        }
      }
      return false;
    },
    set(target2, key, value) {
      if (Reflect.has(target2, key)) {
        return Reflect.set(target2, key, value);
      }
      if (typeof key === "symbol" || key.startsWith("$") || key.startsWith("__")) return false;
      for (const ref2 of refs) {
        if (ref2.value && Reflect.has(ref2.value, key)) {
          return Reflect.set(ref2.value, key, value);
        }
      }
      return false;
    },
    getOwnPropertyDescriptor(target2, key) {
      var _a, _b;
      const descriptor = Reflect.getOwnPropertyDescriptor(target2, key);
      if (descriptor) return descriptor;
      if (typeof key === "symbol" || key.startsWith("$") || key.startsWith("__")) return;
      for (const ref2 of refs) {
        if (!ref2.value) continue;
        const descriptor2 = (_b = getDescriptor(ref2.value, key)) != null ? _b : "_" in ref2.value ? getDescriptor((_a = ref2.value._) == null ? void 0 : _a.setupState, key) : void 0;
        if (descriptor2) return descriptor2;
      }
      for (const ref2 of refs) {
        const childRefs = ref2.value && ref2.value[Refs];
        if (!childRefs) continue;
        const queue = childRefs.slice();
        while (queue.length) {
          const ref3 = queue.shift();
          const descriptor2 = getDescriptor(ref3.value, key);
          if (descriptor2) return descriptor2;
          const childRefs2 = ref3.value && ref3.value[Refs];
          if (childRefs2) queue.push(...childRefs2);
        }
      }
      return void 0;
    }
  });
}
const makeVFormProps = propsFactory({
  ...makeComponentProps(),
  ...makeFormProps()
}, "VForm");
const VForm = genericComponent()({
  name: "VForm",
  props: makeVFormProps(),
  emits: {
    "update:modelValue": (val) => true,
    submit: (e) => true
  },
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const form = createForm(props);
    const formRef = ref();
    function onReset(e) {
      e.preventDefault();
      form.reset();
    }
    function onSubmit(_e) {
      const e = _e;
      const ready = form.validate();
      e.then = ready.then.bind(ready);
      e.catch = ready.catch.bind(ready);
      e.finally = ready.finally.bind(ready);
      emit("submit", e);
      if (!e.defaultPrevented) {
        ready.then((_ref2) => {
          var _a;
          let {
            valid
          } = _ref2;
          if (valid) {
            (_a = formRef.value) == null ? void 0 : _a.submit();
          }
        });
      }
      e.preventDefault();
    }
    useRender(() => {
      var _a;
      return createElementVNode("form", {
        "ref": formRef,
        "class": normalizeClass(["v-form", props.class]),
        "style": normalizeStyle(props.style),
        "novalidate": true,
        "onReset": onReset,
        "onSubmit": onSubmit
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots, form)]);
    });
    return forwardRefs(form, formRef);
  }
});
const makeVCounterProps = propsFactory({
  active: Boolean,
  disabled: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0
  },
  ...makeComponentProps(),
  ...makeTransitionProps$1({
    transition: {
      component: VSlideYTransition
    }
  })
}, "VCounter");
const VCounter = genericComponent()({
  name: "VCounter",
  functional: true,
  props: makeVCounterProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const counter = toRef(() => {
      return props.max ? `${props.value} / ${props.max}` : String(props.value);
    });
    useRender(() => createVNode(MaybeTransition, {
      "transition": props.transition
    }, {
      default: () => [withDirectives(createElementVNode("div", {
        "class": normalizeClass(["v-counter", {
          "text-error": props.max && !props.disabled && parseFloat(props.value) > parseFloat(props.max)
        }, props.class]),
        "style": normalizeStyle(props.style)
      }, [slots.default ? slots.default({
        counter: counter.value,
        max: props.max,
        value: props.value
      }) : counter.value]), [[vShow, props.active]])]
    }));
    return {};
  }
});
const makeVLabelProps = propsFactory({
  text: String,
  onClick: EventProp(),
  ...makeComponentProps(),
  ...makeThemeProps()
}, "VLabel");
const VLabel = genericComponent()({
  name: "VLabel",
  props: makeVLabelProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      var _a;
      return createElementVNode("label", {
        "class": normalizeClass(["v-label", {
          "v-label--clickable": !!props.onClick
        }, props.class]),
        "style": normalizeStyle(props.style),
        "onClick": props.onClick
      }, [props.text, (_a = slots.default) == null ? void 0 : _a.call(slots)]);
    });
    return {};
  }
});
const makeVFieldLabelProps = propsFactory({
  floating: Boolean,
  ...makeComponentProps()
}, "VFieldLabel");
const VFieldLabel = genericComponent()({
  name: "VFieldLabel",
  props: makeVFieldLabelProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(VLabel, {
      "class": normalizeClass(["v-field-label", {
        "v-field-label--floating": props.floating
      }, props.class]),
      "style": normalizeStyle(props.style)
    }, slots));
    return {};
  }
});
function useInputIcon(props) {
  const {
    t
  } = useLocale();
  function InputIcon(_ref) {
    var _a;
    let {
      name,
      color,
      ...attrs
    } = _ref;
    const localeKey = {
      prepend: "prependAction",
      prependInner: "prependAction",
      append: "appendAction",
      appendInner: "appendAction",
      clear: "clear"
    }[name];
    const listener = props[`onClick:${name}`];
    function onKeydown(e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      e.stopPropagation();
      callEvent(listener, new PointerEvent("click", e));
    }
    const label = listener && localeKey ? t(`$vuetify.input.${localeKey}`, (_a = props.label) != null ? _a : "") : void 0;
    return createVNode(VIcon, mergeProps({
      "icon": props[`${name}Icon`],
      "aria-label": label,
      "onClick": listener,
      "onKeydown": onKeydown,
      "color": color
    }, attrs), null);
  }
  return {
    InputIcon
  };
}
const makeFocusProps = propsFactory({
  focused: Boolean,
  "onUpdate:focused": EventProp()
}, "focus");
function useFocus(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const isFocused = useProxiedModel(props, "focused");
  const focusClasses = toRef(() => {
    return {
      [`${name}--focused`]: isFocused.value
    };
  });
  function focus() {
    isFocused.value = true;
  }
  function blur() {
    isFocused.value = false;
  }
  return {
    focusClasses,
    isFocused,
    focus,
    blur
  };
}
const allowedVariants = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"];
const makeVFieldProps = propsFactory({
  appendInnerIcon: IconValue,
  bgColor: String,
  clearable: Boolean,
  clearIcon: {
    type: IconValue,
    default: "$clear"
  },
  active: Boolean,
  centerAffix: {
    type: Boolean,
    default: void 0
  },
  color: String,
  baseColor: String,
  details: Boolean,
  dirty: Boolean,
  disabled: {
    type: Boolean,
    default: null
  },
  glow: Boolean,
  error: Boolean,
  flat: Boolean,
  iconColor: [Boolean, String],
  label: String,
  persistentClear: Boolean,
  prependInnerIcon: IconValue,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String,
    default: "filled",
    validator: (v) => allowedVariants.includes(v)
  },
  "onClick:clear": EventProp(),
  "onClick:appendInner": EventProp(),
  "onClick:prependInner": EventProp(),
  ...makeComponentProps(),
  ...makeLoaderProps(),
  ...makeRoundedProps(),
  ...makeThemeProps()
}, "VField");
const VField = genericComponent()({
  name: "VField",
  inheritAttrs: false,
  props: {
    id: String,
    ...makeFocusProps(),
    ...makeVFieldProps()
  },
  emits: {
    "update:focused": (focused) => true,
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      loaderClasses
    } = useLoader(props);
    const {
      focusClasses,
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const {
      InputIcon
    } = useInputIcon(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      rtlClasses
    } = useRtl();
    const isActive = toRef(() => props.dirty || props.active);
    const hasLabel = toRef(() => !!(props.label || slots.label));
    const hasFloatingLabel = toRef(() => !props.singleLine && hasLabel.value);
    const uid = useId();
    const id = computed(() => props.id || `input-${uid}`);
    const messagesId = toRef(() => !props.details ? void 0 : `${id.value}-messages`);
    const labelRef = ref();
    const floatingLabelRef = ref();
    const controlRef = ref();
    const isPlainOrUnderlined = computed(() => ["plain", "underlined"].includes(props.variant));
    const color = computed(() => {
      return props.error || props.disabled ? void 0 : isActive.value && isFocused.value ? props.color : props.baseColor;
    });
    const iconColor = computed(() => {
      if (!props.iconColor || props.glow && !isFocused.value) return void 0;
      return props.iconColor === true ? color.value : props.iconColor;
    });
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.bgColor);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(color);
    watch(isActive, (val) => {
      if (hasFloatingLabel.value && true) {
        const el = labelRef.value.$el;
        const targetEl = floatingLabelRef.value.$el;
        requestAnimationFrame(() => {
          const rect = nullifyTransforms(el);
          const targetRect = targetEl.getBoundingClientRect();
          const x = targetRect.x - rect.x;
          const y = targetRect.y - rect.y - (rect.height / 2 - targetRect.height / 2);
          const targetWidth = targetRect.width / 0.75;
          const width = Math.abs(targetWidth - rect.width) > 1 ? {
            maxWidth: convertToUnit(targetWidth)
          } : void 0;
          const style = getComputedStyle(el);
          const targetStyle = getComputedStyle(targetEl);
          const duration = parseFloat(style.transitionDuration) * 1e3 || 150;
          const scale = parseFloat(targetStyle.getPropertyValue("--v-field-label-scale"));
          const color2 = targetStyle.getPropertyValue("color");
          el.style.visibility = "visible";
          targetEl.style.visibility = "hidden";
          animate(el, {
            transform: `translate(${x}px, ${y}px) scale(${scale})`,
            color: color2,
            ...width
          }, {
            duration,
            easing: standardEasing,
            direction: val ? "normal" : "reverse"
          }).finished.then(() => {
            el.style.removeProperty("visibility");
            targetEl.style.removeProperty("visibility");
          });
        });
      }
    }, {
      flush: "post"
    });
    const slotProps = computed(() => ({
      isActive,
      isFocused,
      controlRef,
      blur,
      focus
    }));
    function onClick(e) {
      if (e.target !== (void 0).activeElement) {
        e.preventDefault();
      }
    }
    useRender(() => {
      var _a, _b, _c, _d, _e;
      const isOutlined = props.variant === "outlined";
      const hasPrepend = !!(slots["prepend-inner"] || props.prependInnerIcon);
      const hasClear = !!(props.clearable || slots.clear) && !props.disabled;
      const hasAppend = !!(slots["append-inner"] || props.appendInnerIcon || hasClear);
      const label = () => slots.label ? slots.label({
        ...slotProps.value,
        label: props.label,
        props: {
          for: id.value
        }
      }) : props.label;
      return createElementVNode("div", mergeProps({
        "class": ["v-field", {
          "v-field--active": isActive.value,
          "v-field--appended": hasAppend,
          "v-field--center-affix": (_a = props.centerAffix) != null ? _a : !isPlainOrUnderlined.value,
          "v-field--disabled": props.disabled,
          "v-field--dirty": props.dirty,
          "v-field--error": props.error,
          "v-field--glow": props.glow,
          "v-field--flat": props.flat,
          "v-field--has-background": !!props.bgColor,
          "v-field--persistent-clear": props.persistentClear,
          "v-field--prepended": hasPrepend,
          "v-field--reverse": props.reverse,
          "v-field--single-line": props.singleLine,
          "v-field--no-label": !label(),
          [`v-field--variant-${props.variant}`]: true
        }, themeClasses.value, backgroundColorClasses.value, focusClasses.value, loaderClasses.value, roundedClasses.value, rtlClasses.value, props.class],
        "style": [backgroundColorStyles.value, props.style],
        "onClick": onClick
      }, attrs), [createElementVNode("div", {
        "class": "v-field__overlay"
      }, null), createVNode(LoaderSlot, {
        "name": "v-field",
        "active": !!props.loading,
        "color": props.error ? "error" : typeof props.loading === "string" ? props.loading : props.color
      }, {
        default: slots.loader
      }), hasPrepend && createElementVNode("div", {
        "key": "prepend",
        "class": "v-field__prepend-inner"
      }, [props.prependInnerIcon && createVNode(InputIcon, {
        "key": "prepend-icon",
        "name": "prependInner",
        "color": iconColor.value
      }, null), (_b = slots["prepend-inner"]) == null ? void 0 : _b.call(slots, slotProps.value)]), createElementVNode("div", {
        "class": "v-field__field",
        "data-no-activator": ""
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(props.variant) && hasFloatingLabel.value && createVNode(VFieldLabel, {
        "key": "floating-label",
        "ref": floatingLabelRef,
        "class": normalizeClass([textColorClasses.value]),
        "floating": true,
        "for": id.value,
        "aria-hidden": !isActive.value,
        "style": normalizeStyle(textColorStyles.value)
      }, {
        default: () => [label()]
      }), hasLabel.value && createVNode(VFieldLabel, {
        "key": "label",
        "ref": labelRef,
        "for": id.value
      }, {
        default: () => [label()]
      }), (_d = (_c = slots.default) == null ? void 0 : _c.call(slots, {
        ...slotProps.value,
        props: {
          id: id.value,
          class: "v-field__input",
          "aria-describedby": messagesId.value
        },
        focus,
        blur
      })) != null ? _d : createElementVNode("div", {
        "id": id.value,
        "class": "v-field__input",
        "aria-describedby": messagesId.value
      }, null)]), hasClear && createVNode(VExpandXTransition, {
        "key": "clear"
      }, {
        default: () => [withDirectives(createElementVNode("div", {
          "class": "v-field__clearable",
          "onMousedown": (e) => {
            e.preventDefault();
            e.stopPropagation();
          }
        }, [createVNode(VDefaultsProvider, {
          "defaults": {
            VIcon: {
              icon: props.clearIcon
            }
          }
        }, {
          default: () => [slots.clear ? slots.clear({
            ...slotProps.value,
            props: {
              onFocus: focus,
              onBlur: blur,
              onClick: props["onClick:clear"],
              tabindex: -1
            }
          }) : createVNode(InputIcon, {
            "name": "clear",
            "onFocus": focus,
            "onBlur": blur,
            "tabindex": -1
          }, null)]
        })]), [[vShow, props.dirty]])]
      }), hasAppend && createElementVNode("div", {
        "key": "append",
        "class": "v-field__append-inner"
      }, [(_e = slots["append-inner"]) == null ? void 0 : _e.call(slots, slotProps.value), props.appendInnerIcon && createVNode(InputIcon, {
        "key": "append-icon",
        "name": "appendInner",
        "color": iconColor.value
      }, null)]), createElementVNode("div", {
        "class": normalizeClass(["v-field__outline", textColorClasses.value]),
        "style": normalizeStyle(textColorStyles.value)
      }, [isOutlined && createElementVNode(Fragment, null, [createElementVNode("div", {
        "class": "v-field__outline__start"
      }, null), hasFloatingLabel.value && createElementVNode("div", {
        "class": "v-field__outline__notch"
      }, [createVNode(VFieldLabel, {
        "ref": floatingLabelRef,
        "floating": true,
        "for": id.value,
        "aria-hidden": !isActive.value
      }, {
        default: () => [label()]
      })]), createElementVNode("div", {
        "class": "v-field__outline__end"
      }, null)]), isPlainOrUnderlined.value && hasFloatingLabel.value && createVNode(VFieldLabel, {
        "ref": floatingLabelRef,
        "floating": true,
        "for": id.value,
        "aria-hidden": !isActive.value
      }, {
        default: () => [label()]
      })])]);
    });
    return {
      controlRef,
      fieldIconColor: iconColor
    };
  }
});
const makeVMessagesProps = propsFactory({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  ...makeComponentProps(),
  ...makeTransitionProps$1({
    transition: {
      component: VSlideYTransition,
      leaveAbsolute: true,
      group: true
    }
  })
}, "VMessages");
const VMessages = genericComponent()({
  name: "VMessages",
  props: makeVMessagesProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const messages = computed(() => wrapInArray(props.messages));
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => props.color);
    useRender(() => createVNode(MaybeTransition, {
      "transition": props.transition,
      "tag": "div",
      "class": normalizeClass(["v-messages", textColorClasses.value, props.class]),
      "style": normalizeStyle([textColorStyles.value, props.style])
    }, {
      default: () => [props.active && messages.value.map((message, i) => createElementVNode("div", {
        "class": "v-messages__message",
        "key": `${i}-${messages.value}`
      }, [slots.message ? slots.message({
        message
      }) : message]))]
    }));
    return {};
  }
});
const RulesSymbol = Symbol.for("vuetify:rules");
function useRules(fn) {
  var _a;
  const rules = inject(RulesSymbol, null);
  if (!fn) {
    if (!rules) {
      throw new Error("Could not find Vuetify rules injection");
    }
    return rules.aliases;
  }
  return (_a = rules == null ? void 0 : rules.resolve(fn)) != null ? _a : toRef(fn);
}
const makeValidationProps = propsFactory({
  disabled: {
    type: Boolean,
    default: null
  },
  error: Boolean,
  errorMessages: {
    type: [Array, String],
    default: () => []
  },
  maxErrors: {
    type: [Number, String],
    default: 1
  },
  name: String,
  label: String,
  readonly: {
    type: Boolean,
    default: null
  },
  rules: {
    type: Array,
    default: () => []
  },
  modelValue: null,
  validateOn: String,
  validationValue: null,
  ...makeFocusProps()
}, "validation");
function useValidation(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  let id = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : useId();
  const model = useProxiedModel(props, "modelValue");
  const validationModel = computed(() => props.validationValue === void 0 ? model.value : props.validationValue);
  const form = useForm(props);
  const rules = useRules(() => props.rules);
  const internalErrorMessages = ref([]);
  const isPristine = shallowRef(true);
  const isDirty = computed(() => !!(wrapInArray(model.value === "" ? null : model.value).length || wrapInArray(validationModel.value === "" ? null : validationModel.value).length));
  const errorMessages = computed(() => {
    var _a;
    return ((_a = props.errorMessages) == null ? void 0 : _a.length) ? wrapInArray(props.errorMessages).concat(internalErrorMessages.value).slice(0, Math.max(0, Number(props.maxErrors))) : internalErrorMessages.value;
  });
  const validateOn = computed(() => {
    var _a, _b, _c;
    let value = ((_b = props.validateOn) != null ? _b : (_a = form.validateOn) == null ? void 0 : _a.value) || "input";
    if (value === "lazy") value = "input lazy";
    if (value === "eager") value = "input eager";
    const set = new Set((_c = value == null ? void 0 : value.split(" ")) != null ? _c : []);
    return {
      input: set.has("input"),
      blur: set.has("blur") || set.has("input") || set.has("invalid-input"),
      invalidInput: set.has("invalid-input"),
      lazy: set.has("lazy"),
      eager: set.has("eager")
    };
  });
  const isValid = computed(() => {
    var _a;
    if (props.error || ((_a = props.errorMessages) == null ? void 0 : _a.length)) return false;
    if (!props.rules.length) return true;
    if (isPristine.value) {
      return internalErrorMessages.value.length || validateOn.value.lazy ? null : true;
    } else {
      return !internalErrorMessages.value.length;
    }
  });
  const isValidating = shallowRef(false);
  const validationClasses = computed(() => {
    return {
      [`${name}--error`]: isValid.value === false,
      [`${name}--dirty`]: isDirty.value,
      [`${name}--disabled`]: form.isDisabled.value,
      [`${name}--readonly`]: form.isReadonly.value
    };
  });
  getCurrentInstance("validation");
  const uid = computed(() => {
    var _a;
    return (_a = props.name) != null ? _a : unref(id);
  });
  useToggleScope(() => validateOn.value.input || validateOn.value.invalidInput && isValid.value === false, () => {
    watch(validationModel, () => {
      if (validationModel.value != null) {
        validate();
      } else if (props.focused) {
        const unwatch = watch(() => props.focused, (val) => {
          if (!val) validate();
          unwatch();
        });
      }
    });
  });
  useToggleScope(() => validateOn.value.blur, () => {
    watch(() => props.focused, (val) => {
      if (!val) validate();
    });
  });
  watch([isValid, errorMessages], () => {
    var _a;
    (_a = form.update) == null ? void 0 : _a.call(form, uid.value, isValid.value, errorMessages.value);
  });
  async function reset() {
    model.value = null;
    await nextTick();
    await resetValidation();
  }
  async function resetValidation() {
    isPristine.value = true;
    if (!validateOn.value.lazy) {
      await validate(!validateOn.value.eager);
    } else {
      internalErrorMessages.value = [];
    }
  }
  async function validate() {
    var _a;
    let silent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    const results = [];
    isValidating.value = true;
    for (const rule of rules.value) {
      if (results.length >= Number((_a = props.maxErrors) != null ? _a : 1)) {
        break;
      }
      const handler = typeof rule === "function" ? rule : () => rule;
      const result = await handler(validationModel.value);
      if (result === true) continue;
      if (result !== false && typeof result !== "string") {
        console.warn(`${result} is not a valid value. Rule functions must return boolean true or a string.`);
        continue;
      }
      results.push(result || "");
    }
    internalErrorMessages.value = results;
    isValidating.value = false;
    isPristine.value = silent;
    return internalErrorMessages.value;
  }
  return {
    errorMessages,
    isDirty,
    isDisabled: form.isDisabled,
    isReadonly: form.isReadonly,
    isPristine,
    isValid,
    isValidating,
    reset,
    resetValidation,
    validate,
    validationClasses
  };
}
const makeVInputProps = propsFactory({
  id: String,
  appendIcon: IconValue,
  baseColor: String,
  centerAffix: {
    type: Boolean,
    default: true
  },
  color: String,
  glow: Boolean,
  iconColor: [Boolean, String],
  prependIcon: IconValue,
  hideDetails: [Boolean, String],
  hideSpinButtons: Boolean,
  hint: String,
  persistentHint: Boolean,
  messages: {
    type: [Array, String],
    default: () => []
  },
  direction: {
    type: String,
    default: "horizontal",
    validator: (v) => ["horizontal", "vertical"].includes(v)
  },
  "onClick:prepend": EventProp(),
  "onClick:append": EventProp(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...pick(makeDimensionProps(), ["maxWidth", "minWidth", "width"]),
  ...makeThemeProps(),
  ...makeValidationProps()
}, "VInput");
const VInput = genericComponent()({
  name: "VInput",
  props: {
    ...makeVInputProps()
  },
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots,
      emit
    } = _ref;
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      themeClasses
    } = provideTheme(props);
    const {
      rtlClasses
    } = useRtl();
    const {
      InputIcon
    } = useInputIcon(props);
    const uid = useId();
    const id = computed(() => props.id || `input-${uid}`);
    const {
      errorMessages,
      isDirty,
      isDisabled,
      isReadonly,
      isPristine,
      isValid,
      isValidating,
      reset,
      resetValidation,
      validate,
      validationClasses
    } = useValidation(props, "v-input", id);
    const messages = computed(() => {
      var _a;
      if (((_a = props.errorMessages) == null ? void 0 : _a.length) || !isPristine.value && errorMessages.value.length) {
        return errorMessages.value;
      } else if (props.hint && (props.persistentHint || props.focused)) {
        return props.hint;
      } else {
        return props.messages;
      }
    });
    const hasMessages = toRef(() => messages.value.length > 0);
    const hasDetails = toRef(() => !props.hideDetails || props.hideDetails === "auto" && (hasMessages.value || !!slots.details));
    const messagesId = computed(() => hasDetails.value ? `${id.value}-messages` : void 0);
    const slotProps = computed(() => ({
      id,
      messagesId,
      isDirty,
      isDisabled,
      isReadonly,
      isPristine,
      isValid,
      isValidating,
      hasDetails,
      reset,
      resetValidation,
      validate
    }));
    const color = toRef(() => {
      return props.error || props.disabled ? void 0 : props.focused ? props.color : props.baseColor;
    });
    const iconColor = toRef(() => {
      if (!props.iconColor) return void 0;
      return props.iconColor === true ? color.value : props.iconColor;
    });
    useRender(() => {
      var _a, _b, _c, _d;
      const hasPrepend = !!(slots.prepend || props.prependIcon);
      const hasAppend = !!(slots.append || props.appendIcon);
      return createElementVNode("div", {
        "class": normalizeClass(["v-input", `v-input--${props.direction}`, {
          "v-input--center-affix": props.centerAffix,
          "v-input--focused": props.focused,
          "v-input--glow": props.glow,
          "v-input--hide-spin-buttons": props.hideSpinButtons
        }, densityClasses.value, themeClasses.value, rtlClasses.value, validationClasses.value, props.class]),
        "style": normalizeStyle([dimensionStyles.value, props.style])
      }, [hasPrepend && createElementVNode("div", {
        "key": "prepend",
        "class": "v-input__prepend"
      }, [(_a = slots.prepend) == null ? void 0 : _a.call(slots, slotProps.value), props.prependIcon && createVNode(InputIcon, {
        "key": "prepend-icon",
        "name": "prepend",
        "color": iconColor.value
      }, null)]), slots.default && createElementVNode("div", {
        "class": "v-input__control"
      }, [(_b = slots.default) == null ? void 0 : _b.call(slots, slotProps.value)]), hasAppend && createElementVNode("div", {
        "key": "append",
        "class": "v-input__append"
      }, [props.appendIcon && createVNode(InputIcon, {
        "key": "append-icon",
        "name": "append",
        "color": iconColor.value
      }, null), (_c = slots.append) == null ? void 0 : _c.call(slots, slotProps.value)]), hasDetails.value && createElementVNode("div", {
        "id": messagesId.value,
        "class": "v-input__details",
        "role": "alert",
        "aria-live": "polite"
      }, [createVNode(VMessages, {
        "active": hasMessages.value,
        "messages": messages.value
      }, {
        message: slots.message
      }), (_d = slots.details) == null ? void 0 : _d.call(slots, slotProps.value)])]);
    });
    return {
      reset,
      resetValidation,
      validate,
      isValid,
      errorMessages
    };
  }
});
const makeAutocompleteProps = propsFactory({
  autocomplete: String
}, "autocomplete");
function useAutocomplete(props) {
  const uniqueId = useId();
  const reloadTrigger = shallowRef(0);
  const isSuppressing = toRef(() => props.autocomplete === "suppress");
  const fieldName = toRef(() => {
    return isSuppressing.value ? `${props.name}-${uniqueId}-${reloadTrigger.value}` : props.name;
  });
  const fieldAutocomplete = toRef(() => {
    return isSuppressing.value ? "off" : props.autocomplete;
  });
  return {
    isSuppressing,
    fieldAutocomplete,
    fieldName,
    update: () => reloadTrigger.value = (/* @__PURE__ */ new Date()).getTime()
  };
}
function useAutofocus(props) {
  function onIntersect(isIntersecting, entries) {
    var _a, _b;
    if (!props.autofocus || !isIntersecting) return;
    (_b = (_a = entries[0].target) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a);
  }
  return {
    onIntersect
  };
}
const activeTypes = ["color", "file", "time", "date", "datetime-local", "week", "month"];
const makeVTextFieldProps = propsFactory({
  autofocus: Boolean,
  counter: [Boolean, Number, String],
  counterValue: [Number, Function],
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  suffix: String,
  role: String,
  type: {
    type: String,
    default: "text"
  },
  modelModifiers: Object,
  ...makeAutocompleteProps(),
  ...makeVInputProps(),
  ...makeVFieldProps()
}, "VTextField");
const VTextField = genericComponent()({
  name: "VTextField",
  directives: {
    vIntersect: Intersect
  },
  inheritAttrs: false,
  props: makeVTextFieldProps(),
  emits: {
    "click:control": (e) => true,
    "mousedown:control": (e) => true,
    "update:focused": (focused) => true,
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const {
      onIntersect
    } = useAutofocus(props);
    const counterValue = computed(() => {
      var _a;
      return typeof props.counterValue === "function" ? props.counterValue(model.value) : typeof props.counterValue === "number" ? props.counterValue : ((_a = model.value) != null ? _a : "").toString().length;
    });
    const max = computed(() => {
      if (attrs.maxlength) return attrs.maxlength;
      if (!props.counter || typeof props.counter !== "number" && typeof props.counter !== "string") return void 0;
      return props.counter;
    });
    const isPlainOrUnderlined = computed(() => ["plain", "underlined"].includes(props.variant));
    const vInputRef = ref();
    const vFieldRef = ref();
    const inputRef = ref();
    const autocomplete = useAutocomplete(props);
    const isActive = computed(() => activeTypes.includes(props.type) || props.persistentPlaceholder || isFocused.value || props.active);
    function onFocus() {
      if (autocomplete.isSuppressing.value) {
        autocomplete.update();
      }
      if (!isFocused.value) focus();
      nextTick(() => {
        var _a;
        if (inputRef.value !== (void 0).activeElement) {
          (_a = inputRef.value) == null ? void 0 : _a.focus();
        }
      });
    }
    function onControlMousedown(e) {
      emit("mousedown:control", e);
      if (e.target === inputRef.value) return;
      onFocus();
      e.preventDefault();
    }
    function onControlClick(e) {
      emit("click:control", e);
    }
    function onClear(e, reset) {
      e.stopPropagation();
      onFocus();
      nextTick(() => {
        model.value = null;
        reset();
        callEvent(props["onClick:clear"], e);
      });
    }
    function onInput(e) {
      var _a;
      const el = e.target;
      model.value = el.value;
      if (((_a = props.modelModifiers) == null ? void 0 : _a.trim) && ["text", "search", "password", "tel", "url"].includes(props.type)) {
        const caretPosition = [el.selectionStart, el.selectionEnd];
        nextTick(() => {
          el.selectionStart = caretPosition[0];
          el.selectionEnd = caretPosition[1];
        });
      }
    }
    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter !== false && props.counter != null);
      const hasDetails = !!(hasCounter || slots.details);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const {
        modelValue: _,
        ...inputProps
      } = VInput.filterProps(props);
      const fieldProps = VField.filterProps(props);
      return createVNode(VInput, mergeProps({
        "ref": vInputRef,
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-text-field", {
          "v-text-field--prefixed": props.prefix,
          "v-text-field--suffixed": props.suffix,
          "v-input--plain-underlined": isPlainOrUnderlined.value
        }, props.class],
        "style": props.style
      }, rootAttrs, inputProps, {
        "centerAffix": !isPlainOrUnderlined.value,
        "focused": isFocused.value
      }), {
        ...slots,
        default: (_ref2) => {
          let {
            id,
            isDisabled,
            isDirty,
            isReadonly,
            isValid,
            hasDetails: hasDetails2,
            reset
          } = _ref2;
          return createVNode(VField, mergeProps({
            "ref": vFieldRef,
            "onMousedown": onControlMousedown,
            "onClick": onControlClick,
            "onClick:clear": (e) => onClear(e, reset),
            "onClick:prependInner": props["onClick:prependInner"],
            "onClick:appendInner": props["onClick:appendInner"],
            "role": props.role
          }, omit(fieldProps, ["onClick:clear"]), {
            "id": id.value,
            "active": isActive.value || isDirty.value,
            "dirty": isDirty.value || props.dirty,
            "disabled": isDisabled.value,
            "focused": isFocused.value,
            "details": hasDetails2.value,
            "error": isValid.value === false
          }), {
            ...slots,
            default: (_ref3) => {
              let {
                props: {
                  class: fieldClass,
                  ...slotProps
                }
              } = _ref3;
              const inputNode = withDirectives(createElementVNode("input", mergeProps({
                "ref": inputRef,
                "value": model.value,
                "onInput": onInput,
                "autofocus": props.autofocus,
                "readonly": isReadonly.value,
                "disabled": isDisabled.value,
                "name": autocomplete.fieldName.value,
                "autocomplete": autocomplete.fieldAutocomplete.value,
                "placeholder": props.placeholder,
                "size": 1,
                "role": props.role,
                "type": props.type,
                "onFocus": focus,
                "onBlur": blur
              }, slotProps, inputAttrs), null), [[Intersect, {
                handler: onIntersect
              }, null, {
                once: true
              }]]);
              return createElementVNode(Fragment, null, [props.prefix && createElementVNode("span", {
                "class": "v-text-field__prefix"
              }, [createElementVNode("span", {
                "class": "v-text-field__prefix__text"
              }, [props.prefix])]), slots.default ? createElementVNode("div", {
                "class": normalizeClass(fieldClass),
                "data-no-activator": ""
              }, [slots.default(), inputNode]) : cloneVNode(inputNode, {
                class: fieldClass
              }), props.suffix && createElementVNode("span", {
                "class": "v-text-field__suffix"
              }, [createElementVNode("span", {
                "class": "v-text-field__suffix__text"
              }, [props.suffix])])]);
            }
          });
        },
        details: hasDetails ? (slotProps) => {
          var _a;
          return createElementVNode(Fragment, null, [(_a = slots.details) == null ? void 0 : _a.call(slots, slotProps), hasCounter && createElementVNode(Fragment, null, [createElementVNode("span", null, null), createVNode(VCounter, {
            "active": props.persistentCounter || isFocused.value,
            "value": counterValue.value,
            "max": max.value,
            "disabled": props.disabled
          }, slots.counter)])]);
        } : void 0
      });
    });
    return forwardRefs({}, vInputRef, vFieldRef, inputRef);
  }
});
const makeVTextareaProps = propsFactory({
  autoGrow: Boolean,
  autofocus: Boolean,
  counter: [Boolean, Number, String],
  counterValue: Function,
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  noResize: Boolean,
  rows: {
    type: [Number, String],
    default: 5,
    validator: (v) => !isNaN(parseFloat(v))
  },
  maxRows: {
    type: [Number, String],
    validator: (v) => !isNaN(parseFloat(v))
  },
  suffix: String,
  modelModifiers: Object,
  ...makeAutocompleteProps(),
  ...makeVInputProps(),
  ...makeVFieldProps()
}, "VTextarea");
const VTextarea = genericComponent()({
  name: "VTextarea",
  directives: {
    vIntersect: Intersect
  },
  inheritAttrs: false,
  props: makeVTextareaProps(),
  emits: {
    "click:control": (e) => true,
    "mousedown:control": (e) => true,
    "update:focused": (focused) => true,
    "update:modelValue": (val) => true,
    "update:rows": (rows) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const {
      onIntersect
    } = useAutofocus(props);
    const counterValue = computed(() => {
      return typeof props.counterValue === "function" ? props.counterValue(model.value) : (model.value || "").toString().length;
    });
    const max = computed(() => {
      if (attrs.maxlength) return attrs.maxlength;
      if (!props.counter || typeof props.counter !== "number" && typeof props.counter !== "string") return void 0;
      return props.counter;
    });
    const vInputRef = ref();
    const vFieldRef = ref();
    const controlHeight = shallowRef("");
    const textareaRef = ref();
    const autocomplete = useAutocomplete(props);
    const isActive = computed(() => props.persistentPlaceholder || isFocused.value || props.active);
    function onFocus() {
      var _a;
      if (autocomplete.isSuppressing.value) {
        autocomplete.update();
      }
      if (textareaRef.value !== (void 0).activeElement) {
        (_a = textareaRef.value) == null ? void 0 : _a.focus();
      }
      if (!isFocused.value) focus();
    }
    function onControlClick(e) {
      onFocus();
      emit("click:control", e);
    }
    function onControlMousedown(e) {
      emit("mousedown:control", e);
    }
    function onClear(e) {
      e.stopPropagation();
      onFocus();
      nextTick(() => {
        model.value = "";
        callEvent(props["onClick:clear"], e);
      });
    }
    function onInput(e) {
      var _a;
      const el = e.target;
      model.value = el.value;
      if ((_a = props.modelModifiers) == null ? void 0 : _a.trim) {
        const caretPosition = [el.selectionStart, el.selectionEnd];
        nextTick(() => {
          el.selectionStart = caretPosition[0];
          el.selectionEnd = caretPosition[1];
        });
      }
    }
    const sizerRef = ref();
    const rows = ref(Number(props.rows));
    const isPlainOrUnderlined = computed(() => ["plain", "underlined"].includes(props.variant));
    watchEffect(() => {
      if (!props.autoGrow) rows.value = Number(props.rows);
    });
    function calculateInputHeight() {
      if (!props.autoGrow) return;
      nextTick(() => {
        if (!sizerRef.value || !vFieldRef.value) return;
        const style = getComputedStyle(sizerRef.value);
        const fieldStyle = getComputedStyle(vFieldRef.value.$el);
        const padding = parseFloat(style.getPropertyValue("--v-field-padding-top")) + parseFloat(style.getPropertyValue("--v-input-padding-top")) + parseFloat(style.getPropertyValue("--v-field-padding-bottom"));
        const height = sizerRef.value.scrollHeight;
        const lineHeight = parseFloat(style.lineHeight);
        const minHeight = Math.max(parseFloat(props.rows) * lineHeight + padding, parseFloat(fieldStyle.getPropertyValue("--v-input-control-height")));
        const maxHeight = parseFloat(props.maxRows) * lineHeight + padding || Infinity;
        const newHeight = clamp(height != null ? height : 0, minHeight, maxHeight);
        rows.value = Math.floor((newHeight - padding) / lineHeight);
        controlHeight.value = convertToUnit(newHeight);
      });
    }
    watch(model, calculateInputHeight);
    watch(() => props.rows, calculateInputHeight);
    watch(() => props.maxRows, calculateInputHeight);
    watch(() => props.density, calculateInputHeight);
    watch(rows, (val) => {
      emit("update:rows", val);
    });
    let observer;
    watch(sizerRef, (val) => {
      if (val) {
        observer = new ResizeObserver(calculateInputHeight);
        observer.observe(sizerRef.value);
      } else {
        observer == null ? void 0 : observer.disconnect();
      }
    });
    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter || props.counterValue);
      const hasDetails = !!(hasCounter || slots.details);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const {
        modelValue: _,
        ...inputProps
      } = VInput.filterProps(props);
      const fieldProps = {
        ...VField.filterProps(props),
        "onClick:clear": onClear
      };
      return createVNode(VInput, mergeProps({
        "ref": vInputRef,
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-textarea v-text-field", {
          "v-textarea--prefixed": props.prefix,
          "v-textarea--suffixed": props.suffix,
          "v-text-field--prefixed": props.prefix,
          "v-text-field--suffixed": props.suffix,
          "v-textarea--auto-grow": props.autoGrow,
          "v-textarea--no-resize": props.noResize || props.autoGrow,
          "v-input--plain-underlined": isPlainOrUnderlined.value
        }, props.class],
        "style": props.style
      }, rootAttrs, inputProps, {
        "centerAffix": rows.value === 1 && !isPlainOrUnderlined.value,
        "focused": isFocused.value
      }), {
        ...slots,
        default: (_ref2) => {
          let {
            id,
            isDisabled,
            isDirty,
            isReadonly,
            isValid,
            hasDetails: hasDetails2
          } = _ref2;
          return createVNode(VField, mergeProps({
            "ref": vFieldRef,
            "style": {
              "--v-textarea-control-height": controlHeight.value
            },
            "onClick": onControlClick,
            "onMousedown": onControlMousedown,
            "onClick:prependInner": props["onClick:prependInner"],
            "onClick:appendInner": props["onClick:appendInner"]
          }, fieldProps, {
            "id": id.value,
            "active": isActive.value || isDirty.value,
            "centerAffix": rows.value === 1 && !isPlainOrUnderlined.value,
            "dirty": isDirty.value || props.dirty,
            "disabled": isDisabled.value,
            "focused": isFocused.value,
            "details": hasDetails2.value,
            "error": isValid.value === false
          }), {
            ...slots,
            default: (_ref3) => {
              let {
                props: {
                  class: fieldClass,
                  ...slotProps
                }
              } = _ref3;
              return createElementVNode(Fragment, null, [props.prefix && createElementVNode("span", {
                "class": "v-text-field__prefix"
              }, [props.prefix]), withDirectives(createElementVNode("textarea", mergeProps({
                "ref": textareaRef,
                "class": fieldClass,
                "value": model.value,
                "onInput": onInput,
                "autofocus": props.autofocus,
                "readonly": isReadonly.value,
                "disabled": isDisabled.value,
                "placeholder": props.placeholder,
                "rows": props.rows,
                "name": autocomplete.fieldName.value,
                "autocomplete": autocomplete.fieldAutocomplete.value,
                "onFocus": onFocus,
                "onBlur": blur
              }, slotProps, inputAttrs), null), [[Intersect, {
                handler: onIntersect
              }, null, {
                once: true
              }]]), props.autoGrow && withDirectives(createElementVNode("textarea", {
                "class": normalizeClass([fieldClass, "v-textarea__sizer"]),
                "id": `${slotProps.id}-sizer`,
                "onUpdate:modelValue": ($event) => model.value = $event,
                "ref": sizerRef,
                "readonly": true,
                "aria-hidden": "true"
              }, null), [[vModelText, model.value]]), props.suffix && createElementVNode("span", {
                "class": "v-text-field__suffix"
              }, [props.suffix])]);
            }
          });
        },
        details: hasDetails ? (slotProps) => {
          var _a;
          return createElementVNode(Fragment, null, [(_a = slots.details) == null ? void 0 : _a.call(slots, slotProps), hasCounter && createElementVNode(Fragment, null, [createElementVNode("span", null, null), createVNode(VCounter, {
            "active": props.persistentCounter || isFocused.value,
            "value": counterValue.value,
            "max": max.value,
            "disabled": props.disabled
          }, slots.counter)])]);
        } : void 0
      });
    });
    return forwardRefs({}, vInputRef, vFieldRef, textareaRef);
  }
});
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
      _push(ssrRenderComponent(VContainer, mergeProps({
        class: "my-12",
        fluid: ""
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { justify: "center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    md: "10"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VForm, {
                          "aria-label": "Kontaktn\xFD formul\xE1r",
                          role: "form",
                          onSubmit: submitForm
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTextField, {
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
                              _push5(ssrRenderComponent(VTextField, {
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
                              _push5(ssrRenderComponent(VTextarea, {
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
                              _push5(ssrRenderComponent(VBtn, {
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
                                _push5(ssrRenderComponent(VAlert, {
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
                                createVNode(VTextField, {
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
                                createVNode(VTextField, {
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
                                createVNode(VTextarea, {
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
                                createVNode(VBtn, {
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
                                success.value ? (openBlock(), createBlock(VAlert, {
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
                          createVNode(VForm, {
                            "aria-label": "Kontaktn\xFD formul\xE1r",
                            role: "form",
                            onSubmit: withModifiers(submitForm, ["prevent"])
                          }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
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
                              createVNode(VTextField, {
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
                              createVNode(VTextarea, {
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
                              createVNode(VBtn, {
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
                              success.value ? (openBlock(), createBlock(VAlert, {
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
                    createVNode(VCol, {
                      cols: "12",
                      md: "10"
                    }, {
                      default: withCtx(() => [
                        createVNode(VForm, {
                          "aria-label": "Kontaktn\xFD formul\xE1r",
                          role: "form",
                          onSubmit: withModifiers(submitForm, ["prevent"])
                        }, {
                          default: withCtx(() => [
                            createVNode(VTextField, {
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
                            createVNode(VTextField, {
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
                            createVNode(VTextarea, {
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
                            createVNode(VBtn, {
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
                            success.value ? (openBlock(), createBlock(VAlert, {
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
              createVNode(VRow, { justify: "center" }, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    md: "10"
                  }, {
                    default: withCtx(() => [
                      createVNode(VForm, {
                        "aria-label": "Kontaktn\xFD formul\xE1r",
                        role: "form",
                        onSubmit: withModifiers(submitForm, ["prevent"])
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
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
                          createVNode(VTextField, {
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
                          createVNode(VTextarea, {
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
                          createVNode(VBtn, {
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
                          success.value ? (openBlock(), createBlock(VAlert, {
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
  const _component_ContactForm = _sfc_main$1;
  _push(`<section${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(VCard, {
    "d-flex": "",
    "justify-center": ""
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VContainer, { fluid: "" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VRow, { justify: "center" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VCol, { cols: "10" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(VCardTitle, { class: "text-center" }, {
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
                          _push5(ssrRenderComponent(VCardText, { class: "text-center" }, {
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
                            createVNode(VCardTitle, { class: "text-center" }, {
                              default: withCtx(() => [
                                createVNode("h1", { "aria-label": "Kontaktn\xFD formul\xE1r" }, " Kontaktn\xFD formul\xE1r ")
                              ]),
                              _: 1
                            }),
                            createVNode(VCardText, { class: "text-center" }, {
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
                      createVNode(VCol, { cols: "10" }, {
                        default: withCtx(() => [
                          createVNode(VCardTitle, { class: "text-center" }, {
                            default: withCtx(() => [
                              createVNode("h1", { "aria-label": "Kontaktn\xFD formul\xE1r" }, " Kontaktn\xFD formul\xE1r ")
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, { class: "text-center" }, {
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
                createVNode(VRow, { justify: "center" }, {
                  default: withCtx(() => [
                    createVNode(VCol, { cols: "10" }, {
                      default: withCtx(() => [
                        createVNode(VCardTitle, { class: "text-center" }, {
                          default: withCtx(() => [
                            createVNode("h1", { "aria-label": "Kontaktn\xFD formul\xE1r" }, " Kontaktn\xFD formul\xE1r ")
                          ]),
                          _: 1
                        }),
                        createVNode(VCardText, { class: "text-center" }, {
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
          createVNode(VContainer, { fluid: "" }, {
            default: withCtx(() => [
              createVNode(VRow, { justify: "center" }, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "10" }, {
                    default: withCtx(() => [
                      createVNode(VCardTitle, { class: "text-center" }, {
                        default: withCtx(() => [
                          createVNode("h1", { "aria-label": "Kontaktn\xFD formul\xE1r" }, " Kontaktn\xFD formul\xE1r ")
                        ]),
                        _: 1
                      }),
                      createVNode(VCardText, { class: "text-center" }, {
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
//# sourceMappingURL=contact-Wlk0jWoP.mjs.map
