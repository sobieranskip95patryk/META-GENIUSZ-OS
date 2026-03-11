# 22 — GDPR Data Processing Map

| Pole | Wartość |
|------|---------|
| **Projekt** | META-GENIUSZ OS |
| **Cel decyzji** | Zmapować dane osobowe, cele przetwarzania, podstawy prawne i przepływ danych |
| **Zakres** | MVP / Growth / Scale |
| **Status** | ✅ APPROVED |
| **Autor** | AI Copilot |
| **Zależności wejściowe** | ← 19 (Domain Model), 21 (Legal Backbone) |
| **Zależności wyjściowe** | → 26 (Retention & Deletion) |

---

## Executive Summary

Platforma META-GENIUSZ OS przetwarza dane osobowe użytkowników (twórców i fanów) w trzech verticalach (HHU, RFG, AI Studio) oraz panelu administracyjnym. Ten dokument mapuje **wszystkie kategorie danych osobowych**, cele przetwarzania, podstawy prawne GDPR, okresy retencji, procesory danych i przepływy praw użytkownika. Stanowi fundament Privacy Policy (L2) i dalszych dokumentów compliance.

---

## Stan obecny

| Element | Status |
|---------|--------|
| Rejestr czynności przetwarzania (Art. 30) | ❌ Brak — ten dokument go tworzy |
| Model danych (Prisma schema) | 🟡 Podstawowy: User (email, username, passwordHash), Post, Session |
| Docelowy model danych (doc 19) | ✅ Zdefiniowany: User expanded, Comment, Like, Follow, Report, AIGeneration, Transaction |
| Privacy Policy | ❌ Brak |
| Consent management | ❌ Brak |
| Data export / portability | ❌ Brak |
| Account deletion | ❌ Brak (brak UI i endpointu) |

---

## Kategorie danych osobowych

### DANE KRYTYCZNE (wymagają szczególnej ochrony)

| Kategoria | Dane | Źródło | Encja (doc 19) | Faza |
|-----------|------|--------|----------------|------|
| Dane uwierzytelniające | email, passwordHash | Rejestracja | User | v0.2 |
| Dane identyfikacyjne (L3) | dokument tożsamości, selfie | Weryfikacja L3 | IdentityVerification | v1.0 |
| Dane biometryczne | selfie do face-match (L3) | Weryfikacja L3 | IdentityVerification | v1.0 |
| Dane finansowe | nr konta / dane Stripe | Payouts | PayoutAccount | v1.0 |
| Treści moderowane | content + kontekst zgłoszenia | UGC + Report | Report, ModerationAction | v0.3 |

### DANE ZWYKŁE

| Kategoria | Dane | Źródło | Encja | Faza |
|-----------|------|--------|-------|------|
| Dane profilowe | username, bio, avatar, links | Profil użytkownika | User, Profile | v0.2 |
| Dane aktywności | posty, komentarze, polubienia, obserwacje | Interakcje | Post, Comment, Like, Follow | v0.2–v0.3 |
| Dane sesji | token, IP, user-agent, expiresAt | Login | Session | v0.2 |
| Dane kontaktowe | email, opcjonalnie telefon (L2) | Rejestracja / L2 | User | v0.2–v0.5 |
| Dane preferencji | ustawienia profilu, język, notyfikacje | Ustawienia | UserSettings | v0.5 |
| Dane AI | prompty, wygenerowane treści, zużycie kredytów | AI Studio | AIGeneration | v0.5 |
| Dane transakcyjne | subskrypcje, płatności, prowizje | Monetyzacja | Transaction, Subscription | v0.5 |

### DANE DO OGRANICZENIA (przetwarzać minimum potrzebne)

| Kategoria | Dane | Zasada minimalizacji |
|-----------|------|---------------------|
| Logi techniczne | IP, user-agent, request path | Anonimizować po 90 dniach |
| Dane analityczne | page views, session duration | Agregować, nie profilować per-user |
| Cookies marketingowe | tracking pixels, retargeting | Tylko po jawnej zgodzie (consent) |

---

## Cele przetwarzania i podstawy prawne

| # | Cel przetwarzania | Kategorie danych | Podstawa prawna (Art. 6) | Uwagi |
|---|-------------------|------------------|--------------------------|-------|
| C1 | Świadczenie usługi (konto, profil, posty) | Profilowe, aktywności, sesji | **Art. 6(1)(b)** — wykonanie umowy | Core platform |
| C2 | Bezpieczeństwo platformy (auth, sesje) | Uwierzytelniające, sesji | **Art. 6(1)(b)** — umowa + **Art. 6(1)(f)** — uzasadniony interes | |
| C3 | Moderacja treści | Moderowane, aktywności | **Art. 6(1)(c)** — obowiązek prawny (DSA) + **Art. 6(1)(f)** | DSA Art. 16-17 |
| C4 | Generowanie treści AI | Dane AI (prompty, outputs) | **Art. 6(1)(b)** — umowa (AI Studio) | Informacja o AI w ToS |
| C5 | Monetyzacja (subskrypcje, payouts) | Transakcyjne, finansowe | **Art. 6(1)(b)** — umowa + **Art. 6(1)(c)** — obowiązek podatkowy | Stripe jako procesor |
| C6 | Weryfikacja tożsamości (L2-L3) | Kontaktowe, identyfikacyjne, biometryczne | **Art. 6(1)(b)** — umowa + **Art. 9(2)(a)** — jawna zgoda (biometria L3) | DPIA wymagane dla L3 |
| C7 | Komunikacja z użytkownikiem | Email, preferencje | **Art. 6(1)(b)** — umowa (transakcyjne) + **Art. 6(1)(a)** — zgoda (marketing) | Opt-in dla marketingu |
| C8 | Analityka i ulepszanie produktu | Analityczne (zagregowane) | **Art. 6(1)(f)** — uzasadniony interes | Tylko dane zagregowane |
| C9 | Rozpatrywanie skarg i odwołań | Moderowane, profilowe | **Art. 6(1)(c)** — obowiązek prawny (DSA) | Retencja min. 6 mies. |
| C10 | Zapobieganie nadużyciom (fraud) | Sesji, aktywności, transakcyjne | **Art. 6(1)(f)** — uzasadniony interes | Proporcjonalność |

---

## Mapa retencji danych

| Encja / dane | Okres retencji | Podstawa | Usuwanie |
|--------------|----------------|----------|----------|
| User (konto aktywne) | Czas trwania konta | Umowa (Art. 6(1)(b)) | Na żądanie usunięcia (Art. 17) |
| User (konto usunięte) | 30 dni grace period → hard delete | Uzasadniony interes | Auto po 30 dniach |
| Session | 30 dni | Umowa | Auto-expire |
| Post (aktywny) | Czas trwania konta | Umowa | Soft-delete z kontem |
| Post (usunięty) | 30 dni soft-delete → hard delete | Uzasadniony interes | Auto |
| Comment, Like, Follow | Czas trwania konta | Umowa | Kaskadowe z kontem |
| Report | 2 lata po resolution | Obowiązek prawny (DSA) | Archive → delete |
| ModerationAction | 2 lata | Obowiązek prawny (DSA) | Archive → delete |
| Transaction | 7 lat | Obowiązek podatkowy | Archive after 7y |
| Subscription | 7 lat od zakończenia | Obowiązek podatkowy | Archive |
| AIGeneration | 90 dni lub user save | Umowa | Auto-delete po 90d |
| IdentityVerification (L3) | 30 dni po weryfikacji (hash only) | Zgoda (Art. 9(2)(a)) | Delete original, keep hash |
| Logi techniczne | 90 dni | Uzasadniony interes | Anonimizacja po 90d |
| Cookies (analityczne) | Max 13 miesięcy | ePrivacy / GDPR | Auto-expire |

> Szczegółowa polityka retencji i usuwania → doc 26.

---

## Procesory danych (sub-processors)

| Procesor | Rola | Dane przetwarzane | Lokalizacja | DPA |
|----------|------|-------------------|-------------|-----|
| **Railway** | Hosting API + DB | Wszystkie dane serwera | USA / EU (config) | ❌ Do podpisania |
| **Vercel** | Hosting frontend | IP, cookies, request headers | USA / EU (Edge) | ❌ Do podpisania |
| **Stripe** | Płatności | Dane transakcyjne, email, nazwa | USA (EU data residency opcja) | ✅ Standardowe Stripe DPA |
| **OpenAI / Anthropic** | AI generation | Prompty, outputs | USA | ❌ Do podpisania (zero-retention API) |
| **Resend / SendGrid** | Email transakcyjny | Email, imię | USA | ❌ Do podpisania |
| **Veriff / Onfido / Sumsub** (v1.0) | KYC / ID verification | Selfie, dokument, imię | EU / USA | ❌ Do podpisania |
| **Cloudflare R2 / AWS S3** | Storage plików | Avatary, media, pliki AI | EU / USA | ❌ Do podpisania |

> **Transfer poza EOG**: Railway, Vercel, OpenAI, Stripe — wymagane Standard Contractual Clauses (SCC) lub adequacy decision (USA → EU-US DPF od 2023).

---

## Przepływy praw użytkownika (GDPR Art. 15-22)

| Prawo | Artykuł | Implementacja | Faza |
|-------|---------|---------------|------|
| **Dostęp** (access) | Art. 15 | Endpoint GET /me/data → eksport JSON | v0.3 |
| **Sprostowanie** (rectification) | Art. 16 | Edycja profilu (email, username, bio) | v0.2 |
| **Usunięcie** (erasure / right to be forgotten) | Art. 17 | DELETE /me → soft-delete → 30d hard | v0.3 |
| **Ograniczenie** (restriction) | Art. 18 | Zamrożenie konta (status: RESTRICTED) | v0.5 |
| **Przenoszenie** (portability) | Art. 20 | Eksport JSON: profil + posty + komentarze | v0.5 |
| **Sprzeciw** (objection) | Art. 21 | Opt-out z marketingu, kontakt: email | v0.3 |
| **Cofnięcie zgody** | Art. 7(3) | UI toggle + skutek natychmiastowy | v0.5 |
| **Skarga do UODO** | Art. 77 | Informacja w Privacy Policy | v0.2 |

---

## Ryzyka

| ID | Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja |
|----|--------|--------------------|----|-----------|
| GDPR-01 | Brak Privacy Policy = naruszenie Art. 13 | WYSOKIE | KRYTYCZNY | Draft przed launch (P0) |
| GDPR-02 | Brak mechanizmu usunięcia konta | ŚREDNIE | WYSOKI | Endpoint + UI w v0.3 |
| GDPR-03 | Transfer danych do USA bez podstawy | ŚREDNIE | WYSOKI | EU-US DPF + SCC z procesorami |
| GDPR-04 | Biometria L3 bez DPIA | NISKIE (L3 = v1.0) | KRYTYCZNY | DPIA przed wdrożeniem L3, outsource do Veriff |
| GDPR-05 | AI prompty = dane osobowe (jeśli user wklei imię/email) | ŚREDNIE | ŚREDNI | Informacja w AI Studio ToS + zero-retention API |
| GDPR-06 | Brak DPA z Railway/Vercel | ŚREDNIE | WYSOKI | Podpisać przed produkcją |

---

## Rekomendacja wdrożeniowa

### DANE KRYTYCZNE — priorytet natychmiastowy
1. Privacy Policy (L2) — draft AI + review prawnik
2. Consent banner (cookies) — minimalistyczny, ePrivacy compliance
3. Rejestr czynności przetwarzania na bazie tego dokumentu
4. DPA z Railway i Vercel (standardowe warunki)

### DANE ZWYKŁE — priorytet v0.3
5. Endpoint DELETE /me (soft-delete)
6. Endpoint GET /me/data (data export JSON)
7. Tabela retencji w administracji (doc 26)

### DANE DO OGRANICZENIA — priorytet v0.5+
8. Anonimizacja logów po 90 dniach
9. AI prompts — zero-retention z OpenAI/Anthropic
10. DPIA przed wdrożeniem L3 verification

---

## Founder Decision Notes

| ID | Decyzja | Status | Uwagi |
|----|---------|--------|-------|
| FDN-60 | Wybór dostawcy consent management (własny vs. Cookiebot vs. Osano) | 🟡 DO DECYZJI | Rekomendacja: na start własny banner (minimal cookies), Cookiebot gdy analytics |
| FDN-61 | Data residency — wymuszać EU dla Railway/Vercel? | 🟡 DO DECYZJI | Rekomendacja: tak, Vercel EU edge + Railway EU region |
| FDN-62 | Czy anonimizować AI prompty przed wysłaniem do OpenAI? | 🟡 DO DECYZJI | Rekomendacja: nie na start — informować usera w ToS, zero-retention API |

---

## Dokumenty zależne

| Dokument | Relacja |
|----------|---------|
| 19 — Master Domain Model | Wejście: encje i typy danych |
| 21 — Legal Backbone | Wejście: legal stack, procesory |
| 26 — Retention & Deletion | Wyjście: szczegółowa polityka retencji |
| 24 — AI Compliance | Wyjście: DPIA dla AI, transparentność |
| 29 — Incident Response | Wyjście: breach notification Art. 33/34 |
