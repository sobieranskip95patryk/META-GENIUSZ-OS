# 32 — HHU Personas & Jobs-To-Be-Done

| Pole | Wartość |
|------|---------|
| **Projekt** | Hip Hop Universe (HHU) |
| **Cel decyzji** | Rozpisać profile użytkowników i ich rzeczywiste potrzeby |
| **Zakres** | MVP / Growth |
| **Status** | ✅ APPROVED |
| **Autor** | AI Copilot |
| **Zależności wejściowe** | ← 31 (HHU Product Thesis), 18 (Identity & Roles) |
| **Zależności wyjściowe** | → 33 (MVP Scope), 34 (Growth Loop), 35 (Creator Onboarding), 38 (Community) |

---

## Executive Summary

HHU obsługuje **7 person** pogrupowanych w 3 kategorie: Creatorzy (raper, producent, manager), Fani (casual fan, hardcore fan), Brandy (marka, media/organizator). Każda persona ma zdefiniowane Jobs-To-Be-Done (JTBD), pain points i oczekiwane rezultaty. Ten dokument jest fundamentem dla priorytetyzacji feature'ów (doc 33) i growth loops (doc 34). **MVP fokusuje się na 3 persony: raper, producent, casual fan.**

---

## Stan obecny

| Element | Status |
|---------|--------|
| Zdefiniowane persony | ❌ Brak formalnych person — ten dokument je tworzy |
| User research | ❌ Brak (założenia z domain expertise Foundera) |
| JTBD map | ❌ Brak |
| Feature→persona mapping | ❌ Brak |

---

## Persona Map

### Persony główne (MVP)

#### P1 — Raper / MC

| Pole | Wartość |
|------|---------|
| **Wiek** | 18-30 |
| **Kto** | Aspirujący lub mid-tier raper szukający fanów i narzędzi |
| **Platforma alt.** | Instagram, TikTok, SoundCloud, YouTube |
| **Tech-savvy** | Średni (mobile-first, social native) |
| **Gotowość do płacenia** | Średnia (PLN 29–49/mo jeśli widzi value) |
| **Weryfikacja** | L1 (email) na start → L2/L3 przy monetyzacji |
| **Vertical role** | HHU_CREATOR |

**Jobs-To-Be-Done:**

| JTBD | Prioritet | Feature mapping |
|------|-----------|-----------------|
| Chcę **dostarczyć content** do fanów hip-hopu (nie do random audience) | P0 | Feed post + HHU-specific discovery |
| Chcę **zbudować fanbase** wśród ludzi, którzy naprawdę słuchają hip-hopu | P0 | Follow, discovery, trending |
| Chcę **profesjonalnie wyglądać** bez budżetu na grafika/copywritera | P1 | AI Bio Generator, AI Caption Optimizer |
| Chcę **zarabiać bezpośrednio** od fanów (nie $0.003 per stream) | P1 | Tips, subscriptions (v0.5+) |
| Chcę **współpracować** z innymi twórcami (feat., collab) | P2 | Collab tagging, mentions (v0.5+) |
| Chcę **dotrzeć do labelów/managerów** | P3 | Verified Creator, portfolio (v1.0+) |

**Pain Points:**
- „Postuję snippet na IG, algorytm go chowa — widzą to 3% followersów"
- „Nie mam budżetu na grafika — mój profil wygląda amatorsko"
- „Zarabianie na streamach to żart — potrzebuję bezpośredniego wsparcia od fanów"
- „Nie wiem, jak dotrzeć do nowych słuchaczy poza swoim kręgiem"

---

#### P2 — Producent / Beatmaker

| Pole | Wartość |
|------|---------|
| **Wiek** | 16-35 |
| **Kto** | Producent hip-hopowy tworzący bity, szukający raperów do współpracy |
| **Platforma alt.** | BeatStars, SoundCloud, YouTube, Instagram |
| **Tech-savvy** | Wysoki (DAW users, tech-comfortable) |
| **Gotowość do płacenia** | Wyższa (przyzwyczajeni do SaaS: Splice ~$7.99, BeatStars ~$19.99) |
| **Weryfikacja** | L1 na start → L3 przy sprzedaży beatów (future) |
| **Vertical role** | HHU_CREATOR |

**Jobs-To-Be-Done:**

| JTBD | Prioritet | Feature mapping |
|------|-----------|-----------------|
| Chcę **pokazać swoje produkcje** hip-hopowej publiczności | P0 | Audio snippets w postach (FDN-85), feed |
| Chcę **znaleźć raperów** do współpracy | P1 | Discovery, Creator profiles, tags |
| Chcę **zbudować rozpoznawalność** jako producent | P1 | Profile, follow, trending producers |
| Chcę **zarabiać na bitach** (sprzedaż / licensing) | P2 | Future: beat marketplace (v2.0) — NIE w MVP |
| Chcę **AI-assisted workflow** (naming, tagging, marketing) | P2 | AI tools (v0.5+) |

**Pain Points:**
- „Wrzucam bity na YouTube i mam 50 views — nikt nie wie, że istnieję"
- „BeatStars to marketplace, nie community — nie mam tam fanów"
- „Chciałbym łatwo znaleźć rapera na collab bez pisania 100 DM-ów"

---

#### P3 — Casual Fan

| Pole | Wartość |
|------|---------|
| **Wiek** | 15-28 |
| **Kto** | Słuchacz hip-hopu, consumer treści, follower sceny |
| **Platforma alt.** | Instagram, TikTok, YouTube, Twitter/X, Spotify |
| **Tech-savvy** | Średni (social native) |
| **Gotowość do płacenia** | Niska (max PLN 9.99/mo; premium dopiero gdy widzi unikalne treści) |
| **Weryfikacja** | L0-L1 (nie potrzebuje więcej) |
| **Vertical role** | HHU_FAN |

**Jobs-To-Be-Done:**

| JTBD | Prioritet | Feature mapping |
|------|-----------|-----------------|
| Chcę **odkrywać nowych artystów** hip-hopowych | P0 | Discovery feed, trending, fresh |
| Chcę **śledzić ulubionych** (nowe posty, snippety, behind-the-scenes) | P0 | Follow, personalized feed |
| Chcę **reagować i komentować** content hip-hopowy z innymi fanami | P0 | Likes, comments |
| Chcę **wspierać ulubionego artystę** finansowo | P1 | Tips (v0.5+), subscriptions (v1.0+) |
| Chcę **uczestniczyć** w culture (challenges, polls, events) | P2 | Community mechanics (v0.5+) |

**Pain Points:**
- „Na IG nie odkrywam nowych raperów — algorytm pokazuje to, co już znam"
- „Chciałbym mieć jedno miejsce z całą polską sceną hip-hop"
- „Nie mam jak wspierać rapera bezpośrednio — streaming to drop in the ocean"

---

### Persony wspierające (v0.5+)

#### P4 — Hardcore Fan / Community Leader

| Pole | Wartość |
|------|---------|
| **Kto** | Super-aktywny fan, moderuje dyskusje, zna scenę |
| **JTBD kluczowe** | Chcę być rozpoznawany jako znawca sceny; chcę moderować i budować community |
| **Feature mapping** | Community roles, top commenter badges, moderator nomination (v0.5+) |
| **Vertical role** | HHU_FAN → potencjalnie MODERATOR |

#### P5 — Manager / Label Representative

| Pole | Wartość |
|------|---------|
| **Kto** | Manager artysty lub A&R z labelu |
| **JTBD kluczowe** | Chcę scouting nowych talentów; chcę zarządzać artystami na platformie |
| **Feature mapping** | Multi-artist dashboard, analytics, verified label badge (v1.0+) |
| **Vertical role** | HHU_CREATOR (z uprawnieniami managerskimi) |

### Persony późniejsze (v1.0+)

#### P6 — Marka / Sponsor

| Pole | Wartość |
|------|---------|
| **Kto** | Brand hip-hopowy (odzież, sneakers, alkohol, tech) |
| **JTBD kluczowe** | Chcę sponsorować Creatorów / events; chcę targetowaną promocję |
| **Feature mapping** | Sponsored posts, brand profile, campaign tools (v1.5+) |
| **Vertical role** | Business account (future entity) |

#### P7 — Media / Organizator eventów

| Pole | Wartość |
|------|---------|
| **Kto** | Portal hip-hopowy, promoter koncertów, organizator battle |
| **JTBD kluczowe** | Chcę promować eventy na platformie; chcę reach do hip-hop audience |
| **Feature mapping** | Event posts, event calendar, ticket integration (v2.0+) |
| **Vertical role** | Business account (future entity) |

---

## Matryca Persona → Faza

| Persona | MVP (v0.2) | Growth (v0.5) | Scale (v1.0+) |
|---------|:----------:|:-------------:|:-------------:|
| P1 Raper | ✅ | ✅ | ✅ |
| P2 Producent | ✅ | ✅ | ✅ |
| P3 Casual Fan | ✅ | ✅ | ✅ |
| P4 Hardcore Fan | ❌ | ✅ | ✅ |
| P5 Manager/Label | ❌ | ❌ | ✅ |
| P6 Marka/Sponsor | ❌ | ❌ | ✅ |
| P7 Media/Organizator | ❌ | ❌ | ✅ |

---

## JTBD Priority Matrix — MVP

| # | Job | Persona | Prioritet | Kluczowy feature |
|---|-----|---------|-----------|------------------|
| J1 | Publikuj content do hip-hop audience | P1, P2 | **P0** | Feed post (text + image + audio snippet) |
| J2 | Odkryj nowych twórców | P3 | **P0** | Discovery feed (trending, fresh) |
| J3 | Śledź ulubionego Creatora | P3 | **P0** | Follow + personalized feed |
| J4 | Zbuduj profesjonalny profil | P1, P2 | **P0** | Profile + AI Bio Generator |
| J5 | Reaguj na content (lajk, komentarz) | P3 | **P0** | Like + Comment system |
| J6 | Zarabiaj bezpośrednio od fanów | P1 | **P1** | Tips (v0.5) |
| J7 | Współpracuj z innymi twórcami | P1, P2 | **P2** | Collab tags, mentions (v0.5) |
| J8 | Znajdź rapera na collab | P2 | **P2** | Creator search (v0.4) |
| J9 | Wspieraj artystę finansowo | P3 | **P1** | Tips (v0.5) + subs (v1.0) |
| J10 | Zarządzaj analityką fanbase | P1 | **P2** | Creator dashboard (v0.5) |

---

## Desired Outcomes (per persona)

### P1 Raper — za 90 dni od startu

| Metryka sukcesu | Target |
|-----------------|--------|
| Opublikowane posty | ≥ 10 |
| Followers | ≥ 50 |
| Engagement (likes + comments per post) | ≥ 5 avg |
| Profil z AI-generated bio | Tak |
| Czas od rejestracji do pierwszego posta | < 10 minut |

### P3 Casual Fan — za 30 dni od rejestracji

| Metryka sukcesu | Target |
|-----------------|--------|
| Followowane konta | ≥ 5 |
| Polubione posty | ≥ 20 |
| Komentarze | ≥ 3 |
| Sesji tygodniowo | ≥ 3 |
| DAU/MAU ratio | ≥ 20% |

---

## Ryzyka

| ID | Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja |
|----|--------|--------------------|-------|-----------|
| HP-01 | Persony oparte na założeniach (brak user research) | WYSOKIE | WYSOKI | Zbierz feedback z 10 artystów pre-launch (doc 36) |
| HP-02 | Manager/Label persony mogą odstraszać indie artystów | NISKIE | ŚREDNI | Wprowadź label features dopiero w v1.0+, nie w MVP |
| HP-03 | Fan retention bez wystarczającego contentu Creatorów | WYSOKIE | KRYTYCZNY | Cold start fix: seeded content + 50 Creatorów przed launch |
| HP-04 | Producent potrzebuje audio — jeśli FDN-85=nie, producent odpada z MVP | ŚREDNIE | WYSOKI | Rekomendacja: FDN-85 = tak (audio snippets ≤ 30s) |
| HP-05 | Persona P7 (media) wymaga integracji event — overscope | NISKIE | NISKI | Wyraźnie oznaczone jako v2.0+ |

---

## Rekomendacja priorytetów

### PERSONY GŁÓWNE — teraz (MVP)

1. **P1 Raper** — pierwsze konto testowe, główny Creator
2. **P2 Producent** — drugi typ Creatora, potrzebuje audio snippets
3. **P3 Casual Fan** — buduje audience, engagement, retention

### PERSONY WSPIERAJĄCE — v0.5+

4. **P4 Hardcore Fan** — moderator candidate, community builder
5. **P5 Manager/Label** — scouting, multi-artist management

### PERSONY PÓŹNIEJSZE — v1.0+

6. **P6 Marka/Sponsor** — B2B monetyzacja
7. **P7 Media/Events** — ecosystem expansion

---

## Founder Decision Notes

| ID | Decyzja | Status | Uwagi |
|----|---------|--------|-------|
| FDN-87 | Czy persony są wystarczające bez user research (walidacja z 5-10 artystami)? | 🟡 DO DECYZJI | Rekomendacja: tak na start, ale przeprowadź 5 rozmów pre-launch |
| FDN-88 | Czy P5 (Manager) powinien mieć osobny account type czy rozszerzenie CREATOR? | 🟡 DO DECYZJI | Rekomendacja: rozszerzenie CREATOR z flagą „manages: [artist1, artist2]" |

---

## Dokumenty zależne

| Kierunek | Dokument |
|----------|----------|
| ← INPUT | 31 — HHU Product Thesis |
| ← INPUT | 18 — Identity & Roles Architecture |
| → OUTPUT | 33 — HHU MVP Scope v1 |
| → OUTPUT | 34 — HHU Growth Loop Architecture |
| → OUTPUT | 35 — HHU Creator Onboarding Spec |
| → OUTPUT | 38 — Community Mechanics Spec |
| → CROSS | 27 — Content Policy Architecture |
