import { _ as __nuxt_component_0 } from './nuxt-link-D1AOlsF7.mjs';
import { mergeProps, withCtx, createVNode, createTextVNode, defineComponent, ref, toDisplayString, createBlock, createCommentVNode, openBlock, toRef, computed, withDirectives, createElementVNode, vShow, Fragment, shallowRef, normalizeStyle, normalizeClass, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc, u as useHead, c as useRuntimeConfig, g as genericComponent, p as propsFactory, j as useLocale, i as provideTheme, h as useProxiedModel, m as makeThemeProps, k as makeComponentProps, E as EventProp, I as IconValue, Y as makeDisplayProps, t as useRtl, Z as useDisplay, G as useResizeObserver, $ as useGoTo, o as useRender, Q as deepEqual, F as provideDefaults, a0 as focusableChildren } from './server.mjs';
import { V as VCard, a as VCardTitle, b as VCardText } from './VCard-BRnYaGgr.mjs';
import { R as Ripple, z as useBorder, a as useDensity, c as useElevation, f as useRounded, A as useSize, B as useGroupItem, C as useLink, u as useVariant, h as genOverlays, m as VExpandXTransition, V as VIcon, i as VDefaultsProvider, D as VAvatar, n as makeVariantProps, o as makeTagProps, E as makeSizeProps, F as makeRouterProps, p as makeRoundedProps, G as makeGroupItemProps, s as makeElevationProps, v as makeDensityProps, H as makeBorderProps, J as makeGroupProps, K as useGroup, N as VFadeTransition } from './VAvatar-BKJVjbAt.mjs';
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

function calculateUpdatedTarget(_ref) {
  let {
    selectedElement,
    containerElement,
    isRtl,
    isHorizontal
  } = _ref;
  const containerSize = getOffsetSize(isHorizontal, containerElement);
  const scrollPosition = getScrollPosition(isHorizontal, isRtl, containerElement);
  const childrenSize = getOffsetSize(isHorizontal, selectedElement);
  const childrenStartPosition = getOffsetPosition(isHorizontal, selectedElement);
  const additionalOffset = childrenSize * 0.4;
  if (scrollPosition > childrenStartPosition) {
    return childrenStartPosition - additionalOffset;
  } else if (scrollPosition + containerSize < childrenStartPosition + childrenSize) {
    return childrenStartPosition - containerSize + childrenSize + additionalOffset;
  }
  return scrollPosition;
}
function getScrollSize(isHorizontal, element) {
  const key = isHorizontal ? "scrollWidth" : "scrollHeight";
  return (element == null ? void 0 : element[key]) || 0;
}
function getClientSize(isHorizontal, element) {
  const key = isHorizontal ? "clientWidth" : "clientHeight";
  return (element == null ? void 0 : element[key]) || 0;
}
function getScrollPosition(isHorizontal, rtl, element) {
  if (!element) {
    return 0;
  }
  const {
    scrollLeft,
    offsetWidth,
    scrollWidth
  } = element;
  if (isHorizontal) {
    return rtl ? scrollWidth - offsetWidth + scrollLeft : scrollLeft;
  }
  return element.scrollTop;
}
function getOffsetSize(isHorizontal, element) {
  const key = isHorizontal ? "offsetWidth" : "offsetHeight";
  return (element == null ? void 0 : element[key]) || 0;
}
function getOffsetPosition(isHorizontal, element) {
  const key = isHorizontal ? "offsetLeft" : "offsetTop";
  return (element == null ? void 0 : element[key]) || 0;
}
const VSlideGroupSymbol = Symbol.for("vuetify:v-slide-group");
const makeVSlideGroupProps = propsFactory({
  centerActive: Boolean,
  contentClass: null,
  direction: {
    type: String,
    default: "horizontal"
  },
  symbol: {
    type: null,
    default: VSlideGroupSymbol
  },
  nextIcon: {
    type: IconValue,
    default: "$next"
  },
  prevIcon: {
    type: IconValue,
    default: "$prev"
  },
  showArrows: {
    type: [Boolean, String],
    validator: (v) => typeof v === "boolean" || ["always", "desktop", "mobile"].includes(v)
  },
  ...makeComponentProps(),
  ...makeDisplayProps({
    mobile: null
  }),
  ...makeTagProps(),
  ...makeGroupProps({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup");
const VSlideGroup = genericComponent()({
  name: "VSlideGroup",
  props: makeVSlideGroupProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isRtl
    } = useRtl();
    const {
      displayClasses,
      mobile
    } = useDisplay(props);
    const group = useGroup(props, props.symbol);
    const isOverflowing = shallowRef(false);
    const scrollOffset = shallowRef(0);
    const containerSize = shallowRef(0);
    shallowRef(0);
    const isHorizontal = computed(() => props.direction === "horizontal");
    const {
      resizeRef: containerRef
    } = useResizeObserver();
    const {
      resizeRef: contentRef
    } = useResizeObserver();
    useGoTo();
    computed(() => {
      return {
        container: containerRef.el,
        duration: 200,
        easing: "easeOutQuart"
      };
    });
    computed(() => {
      if (!group.selected.value.length) return -1;
      return group.items.value.findIndex((item) => item.id === group.selected.value[0]);
    });
    computed(() => {
      if (!group.selected.value.length) return -1;
      return group.items.value.findIndex((item) => item.id === group.selected.value[group.selected.value.length - 1]);
    });
    const isFocused = shallowRef(false);
    function scrollToChildren(children, center) {
      {
        calculateUpdatedTarget({
          containerElement: containerRef.el,
          isHorizontal: isHorizontal.value,
          isRtl: isRtl.value,
          selectedElement: children
        });
      }
    }
    function onScroll(e) {
      const {
        scrollTop,
        scrollLeft
      } = e.target;
      scrollOffset.value = isHorizontal.value ? scrollLeft : scrollTop;
    }
    function onFocusin(e) {
      isFocused.value = true;
      if (!isOverflowing.value || !contentRef.el) return;
      for (const el of e.composedPath()) {
        for (const item of contentRef.el.children) {
          if (item === el) {
            scrollToChildren(item);
            return;
          }
        }
      }
    }
    function onFocusout(e) {
      isFocused.value = false;
    }
    let ignoreFocusEvent = false;
    function onFocus(e) {
      var _a;
      if (!ignoreFocusEvent && !isFocused.value && !(e.relatedTarget && ((_a = contentRef.el) == null ? void 0 : _a.contains(e.relatedTarget)))) focus();
      ignoreFocusEvent = false;
    }
    function onFocusAffixes() {
      ignoreFocusEvent = true;
    }
    function onKeydown(e) {
      if (!contentRef.el) return;
      function toFocus(location) {
        e.preventDefault();
        focus(location);
      }
      if (isHorizontal.value) {
        if (e.key === "ArrowRight") {
          toFocus(isRtl.value ? "prev" : "next");
        } else if (e.key === "ArrowLeft") {
          toFocus(isRtl.value ? "next" : "prev");
        }
      } else {
        if (e.key === "ArrowDown") {
          toFocus("next");
        } else if (e.key === "ArrowUp") {
          toFocus("prev");
        }
      }
      if (e.key === "Home") {
        toFocus("first");
      } else if (e.key === "End") {
        toFocus("last");
      }
    }
    function getSiblingElement(el, location) {
      if (!el) return void 0;
      let sibling = el;
      do {
        sibling = sibling == null ? void 0 : sibling[location === "next" ? "nextElementSibling" : "previousElementSibling"];
      } while (sibling == null ? void 0 : sibling.hasAttribute("disabled"));
      return sibling;
    }
    function focus(location) {
      if (!contentRef.el) return;
      let el;
      if (!location) {
        const focusable = focusableChildren(contentRef.el);
        el = focusable[0];
      } else if (location === "next") {
        el = getSiblingElement(contentRef.el.querySelector(":focus"), location);
        if (!el) return focus("first");
      } else if (location === "prev") {
        el = getSiblingElement(contentRef.el.querySelector(":focus"), location);
        if (!el) return focus("last");
      } else if (location === "first") {
        el = contentRef.el.firstElementChild;
        if (el == null ? void 0 : el.hasAttribute("disabled")) el = getSiblingElement(el, "next");
      } else if (location === "last") {
        el = contentRef.el.lastElementChild;
        if (el == null ? void 0 : el.hasAttribute("disabled")) el = getSiblingElement(el, "prev");
      }
      if (el) {
        el.focus({
          preventScroll: true
        });
      }
    }
    function scrollTo(location) {
      const direction = isHorizontal.value && isRtl.value ? -1 : 1;
      const offsetStep = (location === "prev" ? -direction : direction) * containerSize.value;
      scrollOffset.value + offsetStep;
      if (isHorizontal.value && isRtl.value && containerRef.el) {
        const {
          scrollWidth,
          offsetWidth: containerWidth
        } = containerRef.el;
      }
    }
    const slotProps = computed(() => ({
      next: group.next,
      prev: group.prev,
      select: group.select,
      isSelected: group.isSelected
    }));
    const hasOverflowOrScroll = computed(() => isOverflowing.value || Math.abs(scrollOffset.value) > 0);
    const hasAffixes = computed(() => {
      switch (props.showArrows) {
        // Always show arrows on desktop & mobile
        case "always":
          return true;
        // Always show arrows on desktop
        case "desktop":
          return !mobile.value;
        // Show arrows on mobile when overflowing.
        // This matches the default 2.2 behavior
        case true:
          return hasOverflowOrScroll.value;
        // Always show on mobile
        case "mobile":
          return mobile.value || hasOverflowOrScroll.value;
        // https://material.io/components/tabs#scrollable-tabs
        // Always show arrows when
        // overflowed on desktop
        default:
          return !mobile.value && hasOverflowOrScroll.value;
      }
    });
    const hasPrev = computed(() => {
      return Math.abs(scrollOffset.value) > 1;
    });
    const hasNext = computed(() => {
      if (!containerRef.value || !hasOverflowOrScroll.value) return false;
      const scrollSize = getScrollSize(isHorizontal.value, containerRef.el);
      const clientSize = getClientSize(isHorizontal.value, containerRef.el);
      const scrollSizeMax = scrollSize - clientSize;
      return scrollSizeMax - Math.abs(scrollOffset.value) > 1;
    });
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(["v-slide-group", {
        "v-slide-group--vertical": !isHorizontal.value,
        "v-slide-group--has-affixes": hasAffixes.value,
        "v-slide-group--is-overflowing": isOverflowing.value
      }, displayClasses.value, props.class]),
      "style": normalizeStyle(props.style),
      "tabindex": isFocused.value || group.selected.value.length ? -1 : 0,
      "onFocus": onFocus
    }, {
      default: () => {
        var _a, _b, _c, _d, _e;
        return [hasAffixes.value && createElementVNode("div", {
          "key": "prev",
          "class": normalizeClass(["v-slide-group__prev", {
            "v-slide-group__prev--disabled": !hasPrev.value
          }]),
          "onMousedown": onFocusAffixes,
          "onClick": () => hasPrev.value && scrollTo("prev")
        }, [(_b = (_a = slots.prev) == null ? void 0 : _a.call(slots, slotProps.value)) != null ? _b : createVNode(VFadeTransition, null, {
          default: () => [createVNode(VIcon, {
            "icon": isRtl.value ? props.nextIcon : props.prevIcon
          }, null)]
        })]), createElementVNode("div", {
          "key": "container",
          "ref": containerRef,
          "class": normalizeClass(["v-slide-group__container", props.contentClass]),
          "onScroll": onScroll
        }, [createElementVNode("div", {
          "ref": contentRef,
          "class": "v-slide-group__content",
          "onFocusin": onFocusin,
          "onFocusout": onFocusout,
          "onKeydown": onKeydown
        }, [(_c = slots.default) == null ? void 0 : _c.call(slots, slotProps.value)])]), hasAffixes.value && createElementVNode("div", {
          "key": "next",
          "class": normalizeClass(["v-slide-group__next", {
            "v-slide-group__next--disabled": !hasNext.value
          }]),
          "onMousedown": onFocusAffixes,
          "onClick": () => hasNext.value && scrollTo("next")
        }, [(_e = (_d = slots.next) == null ? void 0 : _d.call(slots, slotProps.value)) != null ? _e : createVNode(VFadeTransition, null, {
          default: () => [createVNode(VIcon, {
            "icon": isRtl.value ? props.prevIcon : props.nextIcon
          }, null)]
        })])];
      }
    }));
    return {
      selected: group.selected,
      scrollTo,
      scrollOffset,
      focus,
      hasPrev,
      hasNext
    };
  }
});
const VChipGroupSymbol = Symbol.for("vuetify:v-chip-group");
const makeVChipGroupProps = propsFactory({
  baseColor: String,
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: deepEqual
  },
  ...makeVSlideGroupProps(),
  ...makeComponentProps(),
  ...makeGroupProps({
    selectedClass: "v-chip--selected"
  }),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "tonal"
  })
}, "VChipGroup");
genericComponent()({
  name: "VChipGroup",
  props: makeVChipGroupProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      isSelected,
      select,
      next,
      prev,
      selected
    } = useGroup(props, VChipGroupSymbol);
    provideDefaults({
      VChip: {
        baseColor: toRef(() => props.baseColor),
        color: toRef(() => props.color),
        disabled: toRef(() => props.disabled),
        filter: toRef(() => props.filter),
        variant: toRef(() => props.variant)
      }
    });
    useRender(() => {
      const slideGroupProps = VSlideGroup.filterProps(props);
      return createVNode(VSlideGroup, mergeProps(slideGroupProps, {
        "class": ["v-chip-group", {
          "v-chip-group--column": props.column
        }, themeClasses.value, props.class],
        "style": props.style
      }), {
        default: () => {
          var _a;
          return [(_a = slots.default) == null ? void 0 : _a.call(slots, {
            isSelected,
            select,
            next,
            prev,
            selected: selected.value
          })];
        }
      });
    });
    return {};
  }
});
const makeVChipProps = propsFactory({
  activeClass: String,
  appendAvatar: String,
  appendIcon: IconValue,
  baseColor: String,
  closable: Boolean,
  closeIcon: {
    type: IconValue,
    default: "$delete"
  },
  closeLabel: {
    type: String,
    default: "$vuetify.close"
  },
  draggable: Boolean,
  filter: Boolean,
  filterIcon: {
    type: IconValue,
    default: "$complete"
  },
  label: Boolean,
  link: {
    type: Boolean,
    default: void 0
  },
  pill: Boolean,
  prependAvatar: String,
  prependIcon: IconValue,
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  text: {
    type: [String, Number, Boolean],
    default: void 0
  },
  modelValue: {
    type: Boolean,
    default: true
  },
  onClick: EventProp(),
  onClickOnce: EventProp(),
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeGroupItemProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeSizeProps(),
  ...makeTagProps({
    tag: "span"
  }),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "tonal"
  })
}, "VChip");
const VChip = genericComponent()({
  name: "VChip",
  directives: {
    vRipple: Ripple
  },
  props: makeVChipProps(),
  emits: {
    "click:close": (e) => true,
    "update:modelValue": (value) => true,
    "group:selected": (val) => true,
    click: (e) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const {
      borderClasses
    } = useBorder(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      sizeClasses
    } = useSize(props);
    const {
      themeClasses
    } = provideTheme(props);
    const isActive = useProxiedModel(props, "modelValue");
    const group = useGroupItem(props, VChipGroupSymbol, false);
    const link = useLink(props, attrs);
    const isLink = toRef(() => props.link !== false && link.isLink.value);
    const isClickable = computed(() => !props.disabled && props.link !== false && (!!group || props.link || link.isClickable.value));
    const closeProps = toRef(() => ({
      "aria-label": t(props.closeLabel),
      disabled: props.disabled,
      onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        isActive.value = false;
        emit("click:close", e);
      }
    }));
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(() => {
      var _a;
      const showColor = !group || group.isSelected.value;
      return {
        color: showColor ? (_a = props.color) != null ? _a : props.baseColor : props.baseColor,
        variant: props.variant
      };
    });
    function onClick(e) {
      var _a;
      emit("click", e);
      if (!isClickable.value) return;
      (_a = link.navigate) == null ? void 0 : _a.call(link, e);
      group == null ? void 0 : group.toggle();
    }
    function onKeyDown(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick(e);
      }
    }
    return () => {
      var _a;
      const Tag = link.isLink.value ? "a" : props.tag;
      const hasAppendMedia = !!(props.appendIcon || props.appendAvatar);
      const hasAppend = !!(hasAppendMedia || slots.append);
      const hasClose = !!(slots.close || props.closable);
      const hasFilter = !!(slots.filter || props.filter) && group;
      const hasPrependMedia = !!(props.prependIcon || props.prependAvatar);
      const hasPrepend = !!(hasPrependMedia || slots.prepend);
      return isActive.value && withDirectives(createVNode(Tag, mergeProps(link.linkProps, {
        "class": ["v-chip", {
          "v-chip--disabled": props.disabled,
          "v-chip--label": props.label,
          "v-chip--link": isClickable.value,
          "v-chip--filter": hasFilter,
          "v-chip--pill": props.pill,
          [`${props.activeClass}`]: props.activeClass && ((_a = link.isActive) == null ? void 0 : _a.value)
        }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, group == null ? void 0 : group.selectedClass.value, props.class],
        "style": [colorStyles.value, props.style],
        "disabled": props.disabled || void 0,
        "draggable": props.draggable,
        "tabindex": isClickable.value ? 0 : void 0,
        "onClick": onClick,
        "onKeydown": isClickable.value && !isLink.value && onKeyDown
      }), {
        default: () => {
          var _a2, _b;
          return [genOverlays(isClickable.value, "v-chip"), hasFilter && createVNode(VExpandXTransition, {
            "key": "filter"
          }, {
            default: () => [withDirectives(createElementVNode("div", {
              "class": "v-chip__filter"
            }, [!slots.filter ? createVNode(VIcon, {
              "key": "filter-icon",
              "icon": props.filterIcon
            }, null) : createVNode(VDefaultsProvider, {
              "key": "filter-defaults",
              "disabled": !props.filterIcon,
              "defaults": {
                VIcon: {
                  icon: props.filterIcon
                }
              }
            }, slots.filter)]), [[vShow, group.isSelected.value]])]
          }), hasPrepend && createElementVNode("div", {
            "key": "prepend",
            "class": "v-chip__prepend"
          }, [!slots.prepend ? createElementVNode(Fragment, null, [props.prependIcon && createVNode(VIcon, {
            "key": "prepend-icon",
            "icon": props.prependIcon,
            "start": true
          }, null), props.prependAvatar && createVNode(VAvatar, {
            "key": "prepend-avatar",
            "image": props.prependAvatar,
            "start": true
          }, null)]) : createVNode(VDefaultsProvider, {
            "key": "prepend-defaults",
            "disabled": !hasPrependMedia,
            "defaults": {
              VAvatar: {
                image: props.prependAvatar,
                start: true
              },
              VIcon: {
                icon: props.prependIcon,
                start: true
              }
            }
          }, slots.prepend)]), createElementVNode("div", {
            "class": "v-chip__content",
            "data-no-activator": ""
          }, [(_b = (_a2 = slots.default) == null ? void 0 : _a2.call(slots, {
            isSelected: group == null ? void 0 : group.isSelected.value,
            selectedClass: group == null ? void 0 : group.selectedClass.value,
            select: group == null ? void 0 : group.select,
            toggle: group == null ? void 0 : group.toggle,
            value: group == null ? void 0 : group.value.value,
            disabled: props.disabled
          })) != null ? _b : toDisplayString(props.text)]), hasAppend && createElementVNode("div", {
            "key": "append",
            "class": "v-chip__append"
          }, [!slots.append ? createElementVNode(Fragment, null, [props.appendIcon && createVNode(VIcon, {
            "key": "append-icon",
            "end": true,
            "icon": props.appendIcon
          }, null), props.appendAvatar && createVNode(VAvatar, {
            "key": "append-avatar",
            "end": true,
            "image": props.appendAvatar
          }, null)]) : createVNode(VDefaultsProvider, {
            "key": "append-defaults",
            "disabled": !hasAppendMedia,
            "defaults": {
              VAvatar: {
                end: true,
                image: props.appendAvatar
              },
              VIcon: {
                end: true,
                icon: props.appendIcon
              }
            }
          }, slots.append)]), hasClose && createElementVNode("button", mergeProps({
            "key": "close",
            "class": "v-chip__close",
            "type": "button",
            "data-testid": "close-chip"
          }, closeProps.value), [!slots.close ? createVNode(VIcon, {
            "key": "close-icon",
            "icon": props.closeIcon,
            "size": "x-small"
          }, null) : createVNode(VDefaultsProvider, {
            "key": "close-defaults",
            "defaults": {
              VIcon: {
                icon: props.closeIcon,
                size: "x-small"
              }
            }
          }, slots.close)])];
        }
      }), [[Ripple, isClickable.value && props.ripple, null]]);
    };
  }
});
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
                  _push3(`<span class="text-h5" data-v-eadeb469${_scopeId2}>WebSocket BPM (minimal)</span><div class="text-medium-emphasis" aria-live="polite" data-v-eadeb469${_scopeId2}>`);
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
                    _push3(`<span data-v-eadeb469${_scopeId2}><small data-v-eadeb469${_scopeId2}>WS: <code data-v-eadeb469${_scopeId2}>${ssrInterpolate(shorten(wsUrl.value))}</code></small></span>`);
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
                  _push3(`<div class="d-flex align-center mb-4" data-v-eadeb469${_scopeId2}><strong data-v-eadeb469${_scopeId2}>BPM:</strong>`);
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
                  _push3(`</div><div class="chart-wrap" role="img" aria-label="Historick\xFD priebeh BPM z WebSocketu" data-v-eadeb469${_scopeId2}><canvas class="chart"${ssrRenderAttr("width", width)}${ssrRenderAttr("height", height)} data-v-eadeb469${_scopeId2}></canvas></div>`);
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
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-eadeb469"]]);
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
//# sourceMappingURL=projects-wP4c82WP.mjs.map
