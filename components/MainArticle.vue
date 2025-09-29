<template>
  
    <v-row>
     <v-card-text class="text-body-1 text-center mt-8">
  <article class="text-justify" style="line-height: 1.8">
    Tento web vznikol ako môj <strong>testovací projekt</strong>, kde si overujem nasadenie reálnych aplikácií na vlastný server 
    (Debian + PM2 + Nginx + Git cron deploy). Funguje teda tak, ako by bežala živá firemná prezentácia alebo interný nástroj.

    <br><br>

    Ako súčasť projektu som pripravil aj malý PoC:
    <NuxtLink to="/projects" aria-label="Prejsť Projekty – Live WebSocket demo">
      WS BPM – Live WebSocket demo
    </NuxtLink>.
    Stránka číta živé čísla z WebSocketu (predvolene verejný stream) a mapuje ich do BPM, 
    aby bolo vidieť prácu s realtime dátami a plynulou vizualizáciou. 
    V produkčnom nasadení je možné pripojiť aj vlastný .NET WebSocket cez 
    <code>runtimeConfig.public.wsUrl</code>.

    <br><br>

    Mám predchádzajúcu prax ako frontend vývojár v spoločnosti <strong>Railsformers (2022)</strong>, kde som jeden rok vytváral šablóny v HTML/PHP pre firemné CMS. 
    Pracoval som <strong>desktop-first</strong>, používal <strong>Bootstrap</strong>, riešil základy <strong>technického SEO</strong>, jednoduché animácie a základný <strong>deploy</strong>. 
    Dnes sa posúvam k plnému <strong>fullstack vývoju</strong> v modernom <strong>Vue/Nuxt ekosystéme</strong>, s dôrazom na komponentový prístup, TypeScript a DevOps nástroje.

    <br><br>

    Popri webových projektoch rozvíjam aj vlastné technické experimenty, napr. <strong>ESP32-Smarwi Controller</strong> – systém pre inteligentné vetranie založený na DHT senzore, OTA aktualizáciách, HTTP API a backendom v AdonisJS. 
    Kvôli väčšej škálovateľnosti som prešiel z Arduino IDE na <strong>PlatformIO</strong> v prostredí VS Code.

    <br><br>

    Ako menší vedľajší projekt spomínam aj stránku 
    <a href="http://www.umy-ma.sk" target="_blank" rel="noopener noreferrer" aria-label="Externý odkaz na stránku umy-ma.sk">umy-ma.sk</a>, ktorú som vytvoril ako jednoduchú vizitku pre kamarátov pomocou Vite. 
    Projekt ukazuje rýchle a ekonomické nasadenie s minimalistickým prístupom.

    <br><br>

    Mojím cieľom je priebežne budovať <strong>portfólio funkčných projektov</strong>, ktoré mi umožňujú rozvíjať schopnosti fullstack developera, 
    pracovať s moderným frontendom, backendom, API architektúrou a prípadne aj integrovať IoT.
  </article>
</v-card-text>

    </v-row>
  
</template>