import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { t as trapUnhandledNodeErrors, a as toNodeListener, u as useNitroApp } from './chunks/_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'vue';
import 'consola';
import 'node:fs';
import 'node:url';
import '@iconify/utils';
import 'node:crypto';
import 'ipx';
import 'node:path';

const nitroApp = useNitroApp();
const listener = toNodeListener(nitroApp.h3App);
const websocket = void 0;
const handler = listener;
trapUnhandledNodeErrors();

export { handler, listener, websocket };
//# sourceMappingURL=index.mjs.map
