# 27 — Content Policy Architecture

| Pole | Wartość |
|------|---------|
| **Projekt** | HHU / RFG / META-GENIUSZ OS |
| **Cel decyzji** | Stworzyć architekturę zasad treści i zachowań na platformie |
| **Zakres** | MVP / Growth / Scale |
| **Status** | ✅ APPROVED |
| **Autor** | AI Copilot |
| **Zależności wejściowe** | ← 21 (Legal Backbone) |
| **Zależności wyjściowe** | → 23 (DSA Readiness), 28 (Verification), 29 (Incident Response) |

---

## Executive Summary

META-GENIUSZ OS hostuje treści generowane przez użytkowników (UGC) w trzech verticalach o różnym profilu ryzyka: HHU (hip-hop, muzyka, kultura), RFG (twórczynie wizualne, modeling) i AI Studio (treści generowane przez AI). Każdy vertical wymaga dostosowanych zasad treści. Ten dokument definiuje **kategorie polityki treściowej**, strefy ryzyka, postępowanie zabronione, różnice między modułami, klasy egzekwowania i rekomendacje wdrożeniowe. Stanowi fundament Community Guidelines (L4) i jest wejściem dla DSA readiness (doc 23).

---

## Stan obecny

| Element | Status |
|---------|--------|
| Community Guidelines | ❌ Brak |
| Content moderation rules | ❌ Brak formalnych zasad |
| Moderation queue | 🟡 Zaprojektowana w doc 20, niezaimplementowana |
| AI content labeling | ❌ Brak (doc 24 definiuje wymagania) |
| NSFW detection | ❌ Brak |
| Automated content filtering | ❌ Brak |
| Strike / enforcement system | ❌ Brak |

---

## Kategorie polityki treści

### DOZWOLONE — treści akceptowane

| Kategoria | HHU | RFG | AI Studio | Uwagi |
|-----------|-----|-----|-----------|-------|
| Oryginalne teksty / muzyka | ✅ | — | ✅ | Core value HHU |
| Fotografie artystyczne / modelingowe | ✅ | ✅ | ✅ | RFG core value |
| AI-generated tekst / obrazy (oznaczone) | ✅ | ✅ | ✅ | Obowiązkowy tag AI_GENERATED (doc 24) |
| Promocja własnej twórczości | ✅ | ✅ | ✅ | — |
| Komentarze, recenzje, dyskusje | ✅ | ✅ | ✅ | Konstruktywne |
| Behind-the-scenes / studio content | ✅ | ✅ | — | — |
| Portfolio / booking info | — | ✅ | — | RFG specific |
| Collabs / feature requests | ✅ | ✅ | — | Community growth |
| Treści edukacyjne (tutoriale, tips) | ✅ | ✅ | ✅ | — |

### OGRANICZONE — treści wymagające dodatkowej kontroli

| Kategoria | Zasada | HHU | RFG | AI Studio | Egzekwowanie |
|-----------|--------|-----|-----|-----------|-------------|
| **Wulgaryzmy w tekstach** | Dozwolone w kontekście artystycznym (rap lyrics), zabronione w nękaniu | ✅ kontekst | ❌ | ❌ | Manual review jeśli report |
| **Treści sugestywne** (non-explicit) | Dozwolone z ograniczeniami wiekowymi | 🟡 | ✅ z tagiem | 🟡 | Age-gate + tag MATURE |
| **Odniesienia do substancji** | Dozwolone w kontekście artystycznym, zabroniona promocja sprzedaży | ✅ kontekst | ❌ | ❌ | Manual review jeśli report |
| **Treści kontrowersyjne** (polityka, religia) | Dozwolona dyskusja, zabroniona polaryzacja | 🟡 | 🟡 | 🟡 | Manual review |
| **Self-promotion / linki zewnętrzne** | Dozwolone w profilu, ograniczone w komentarzach | ✅ profil | ✅ profil | ✅ profil | Auto-filter w komentarzach |
| **AI deepfake** (twarze/głosy znanych osób) | Zabronione bez zgody; dozwolone z oznaczeniem + zgoda | ❌ | ❌ | 🟡 z consent | Manual review + report |

### ZABRONIONE — treści natychmiast usuwane

| Kategoria | Dotyczy | Egzekwowanie | Podstawa prawna |
|-----------|---------|-------------|-----------------|
| **CSAM** (Child Sexual Abuse Material) | Wszystkie | Natychmiastowe usunięcie + raport NCMEC/policja | Prawo karne |
| **Mowa nienawiści** (rasizm, homofobia, ksenofobia) | Wszystkie | Usunięcie + strike | DSA + prawo karne |
| **Groźby przemocy** | Wszystkie | Usunięcie + ban + raport policji | Prawo karne |
| **Doxxing** (ujawnianie danych osobowych) | Wszystkie | Natychmiastowe usunięcie + ban | GDPR + prawo karne |
| **Stalking / nękanie systematyczne** | Wszystkie | Ban + raport policji | Prawo karne |
| **Treści pornograficzne (explicit)** | Wszystkie | Usunięcie | Regulamin platformy |
| **Spam / scam / phishing** | Wszystkie | Usunięcie + ban | Regulamin |
| **Impersonation** (podszywanie się) | Wszystkie | Usunięcie profilu + ban | DSA + regulamin |
| **Malware / exploity** | Wszystkie | Natychmiastowe usunięcie + ban | Prawo karne |
| **Treści terrorystyczne** | Wszystkie | Natychmiastowe usunięcie + raport organom | TCO Regulation (EU) |
| **Promowanie samookaleczenia / samobójstwa** | Wszystkie | Usunięcie + zasoby pomocowe | Regulamin + etyka |
| **Grooming / exploitation** | Wszystkie (szczególnie RFG) | Natychmiastowy ban + raport policji | Prawo karne |
| **Fake casting / scam oferty** (RFG) | RFG | Usunięcie + ban + warning | Regulamin |
| **Naruszenie praw autorskich** (bez fair use) | Wszystkie | Notice-and-action (doc 23) | DMCA / prawo autorskie |

---

## Strefy ryzyka (Gray Zones)

| Strefa | Opis | Podejście | Kto decyduje |
|--------|------|-----------|-------------|
| **Rap lyrics z przemocą** | Kontekst artystyczny vs. real threat | Domniemanie kontekstu artystycznego, chyba że directed at specific person | Moderator → escalate do ADMIN jeśli wątpliwość |
| **Treści sugestywne RFG** | Granica między artistic/modeling a explicit | Akceptujemy non-explicit; profil MATURE; explicit = usunięcie | Moderator z wytycznymi |
| **AI-generated twarze** | Syntetyczne portrety mogą naruszać wizerunek | Obowiązkowy tag AI_GENERATED; zabronione jeśli resembles real person without consent | Manual review |
| **Satyra / parodia** | Może być odczytana jako mowa nienawiści | Kontekst i intencja; w razie wątpliwości → manual review | Moderator → ADMIN |
| **Promocja alkoholu** | Dozwolona w kontekście lifestyle, zabroniona reklama | Dozwolone w postach, zabronione w branded content bez age-gate | Auto-filter branded + moderator |
| **Treści z bronią** (rap culture) | Kontekst kulturowy hip-hop | Dozwolone w kontekście artystycznym, zabronione jeśli threat | Moderator z wytycznymi |

---

## Różnice między modułami (Module Differences)

### HHU — Hip Hop Universe

| Specyfika | Zasada |
|-----------|--------|
| Wulgaryzmy w lyrics | ✅ Dozwolone w kontekście artystycznym |
| Beef / diss tracks | ✅ Dozwolone, o ile nie są realnymi groźbami |
| Odniesienia street culture | ✅ Dozwolone w kontekście artystycznym |
| Treści explicit (seksualnie) | ❌ Zabronione (platforma nie-NSFW) |
| Hate speech ukryta w lyrics | ❌ Zabronione — moderator ocenia kontekst |

### RFG — Rocket Fuell Girls

| Specyfika | Zasada |
|-----------|--------|
| Treści modelingowe (non-explicit) | ✅ Dozwolone z MATURE tag jeśli sugestywne |
| Treści explicit / nagość | ❌ Zabronione (platforma nie-NSFW) |
| Fake casting / scam oferty | ❌ Zabronione z zero-tolerance |
| Grooming / predatory behavior | ❌ P0 — natychmiastowy ban + raport |
| Portfolio z innymi platformami | ✅ Dozwolone (linki w profilu) |
| Komentarze objectifying | 🟡 Ograniczone — moderator ocenia, strike jeśli powtarzające się |

### AI Studio

| Specyfika | Zasada |
|-----------|--------|
| AI-generated content | ✅ Zawsze z tagiem AI_GENERATED |
| Deepfake twarzy znanych osób | ❌ Zabronione bez jawnej zgody |
| AI hate speech / toxic output | ❌ Zabronione — content safety pipeline (doc 24) |
| AI-generated NSFW | ❌ Zabronione (filtrowane na poziomie API) |
| Prompt injection attempts | 🟡 Logowane, blokowane, repeat → strike |

---

## Klasy egzekwowania (Enforcement Classes)

### Poziomy akcji

| Poziom | Akcja | Trigger | Kto wykonuje |
|--------|-------|---------|-------------|
| **E0 — Auto-block** | Content nie publikuje się | Keyword filter + AI detection | System |
| **E1 — Warning** | Content usunięty + warning do autora | Pierwsze naruszenie (minor) | Moderator |
| **E2 — Strike** | Content usunięty + strike na koncie | Drugie naruszenie lub poważne pierwsze | Moderator |
| **E3 — Temporary ban** | Konto zawieszone 7/14/30 dni | 2 strikes w 90 dni | Moderator / Admin |
| **E4 — Permanent ban** | Konto zablokowane permanentnie | 3 strikes LUB jedno naruszenie P0 | Admin |
| **E5 — Legal report** | Ban + zgłoszenie do organów ścigania | CSAM, groźby, grooming, terroryzm | Admin → SUPER_ADMIN → Legal |

### Strike system

| # Strikes | Konsekwencja | Reset |
|-----------|-------------|-------|
| 0 | Brak | — |
| 1 | Warning + content usunięty | Strike wygasa po 180 dniach |
| 2 | Temporary ban (7 dni) | Strike wygasa po 180 dniach |
| 3 | Permanent ban | Brak resetu |
| P0 naruszenie | Natychmiastowy permanent ban | — |

### Mapowanie kategorii → poziom egzekwowania

| Kategoria zabroniona | Poziom | SLA |
|---------------------|--------|-----|
| CSAM | E5 | Natychmiast (<1h) |
| Grooming / exploitation | E5 | Natychmiast (<1h) |
| Treści terrorystyczne | E5 | Natychmiast (<1h) |
| Groźby przemocy (realne) | E4-E5 | <4h |
| Mowa nienawiści | E2-E4 | <4h |
| Doxxing | E3-E4 | <4h |
| Stalking / nękanie | E3-E4 | <24h |
| Spam / scam | E2-E4 | <24h |
| Impersonation | E3-E4 | <24h |
| Copyright violation | E1-E2 | <72h (notice-and-action) |
| Fake casting (RFG) | E3-E4 | <24h |
| Naruszenie AI policy | E1-E2 | <24h |

---

## Ryzyka

| ID | Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja |
|----|--------|--------------------|-------|-----------|
| CP-01 | Brak Community Guidelines przy launch → chaos moderacyjny | WYSOKIE | WYSOKI | Draft CG na bazie tego dokumentu przed public beta |
| CP-02 | Contextual gray zones (rap lyrics) → niekonsekwentne decyzje | ŚREDNIE | ŚREDNI | Wytyczne moderatorskie + case book + escalation path |
| CP-03 | RFG exploitation nie wykryte | NISKIE (z moderacją) | KRYTYCZNY | P0 priority, proactive detection w v0.5 |
| CP-04 | Over-moderation → chilling effect na twórców | ŚREDNIE | ŚREDNI | Appeals process (doc 23) + jasne guidelines |
| CP-05 | AI-generated harmful content | NISKIE (model guardrails) | WYSOKI | Content safety pipeline (doc 24) + user reports |
| CP-06 | Moderator burnout (traumatic content) | ŚREDNIE | ŚREDNI | Rotation, wellbeing support, content blur by default |

---

## Rekomendacja zasad treści

### DOZWOLONE — zero action needed
1. Publikuj Community Guidelines na /community-guidelines
2. Jasno komunikuj co jest ok per vertical (artystyczny kontekst HHU, portfolio RFG, AI z tagiem)

### OGRANICZONE — manual review
3. Gray zone playbook dla moderatorów (case-by-case examples)
4. MATURE tag system dla treści sugestywnych
5. Escalation path: Moderator → Admin → SUPER_ADMIN / Legal

### ZABRONIONE — zero tolerance
6. Auto-detect keywords (P0 categories: CSAM, terrorism, grooming)
7. Strike system: 3 strikes → permanent ban
8. P0 violations: natychmiastowy ban + legal report
9. Obligatory reason statement per DSA Art. 17 (doc 23)

---

## Founder Decision Notes

| ID | Decyzja | Status | Uwagi |
|----|---------|--------|-------|
| FDN-74 | Czy platforma jest „nie-NSFW" (zero explicit) czy „adult-gated"? | 🟡 DO DECYZJI | Rekomendacja: nie-NSFW (platforma publiczna, prostsza moderacja, mniej ryzyka RFG) |
| FDN-75 | Czy dozwolić wulgaryzmy w komentarzach (nie-lyrics)? | 🟡 DO DECYZJI | Rekomendacja: dozwolić umiarkowane, zabronić directed abuse |
| FDN-76 | Czy wdrożyć auto-detection AI (NSFW/toxicity) w MVP? | ✅ APPROVED | Nie — manual moderation w MVP, AI detection w v0.5 (spójne z FDN-65). Zamknięte w G2A |

---

## Dokumenty zależne

| Dokument | Relacja |
|----------|---------|
| 21 — Legal Backbone | Wejście: Community Guidelines (L4) |
| 23 — DSA Readiness | Wyjście: kategorie zgłoszeń, reason statements |
| 24 — AI Compliance | Wejście: AI content rules, deepfake policy |
| 25 — Audit Trail | Wyjście: logowanie enforcement actions |
| 28 — Verification Framework | Wyjście: verification triggers dla enforcement |
| 29 — Incident Response | Wyjście: P0 violations → incident flow |
| 20 — Admin Backoffice | Wejście: moderation queue actions |
