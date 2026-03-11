# 49 — Trust & Safety / Anti-Fraud Core v1.0

| Pole | Wartość |
|------|---------|
| **Projekt** | Trust & Safety (META-GENIUSZ OS) |
| **Cel decyzji** | Zaprojektować realny system ochrony platformy |
| **Zakres** | MVP / Growth / Scale |
| **Status** | ✅ APPROVED |
| **Autor** | AI Copilot |
| **Zależności wejściowe** | ← 22 (KYC), 23 (Content Moderation), 25 (Data Protection), 27 (T&S Framework), 28 (Abuse Prevention), 29 (Incident Response), 46 (RFG Safety) |
| **Zależności wyjściowe** | → 50 (Investor Narrative) |

---

## Executive Summary

Ten dokument to **operational playbook** antyfraudowy i antyabuse'owy dla całego ekosystemu META-GENIUSZ OS. Nadbudowuje na framework docs 27-29 (strategic) i definiuje: abuse taxonomy, signal types, risk scoring, enforcement ladder, moderator workflows, evidence vault i legal escalation. Kluczowa zasada: **prevent where possible, detect fast, enforce consistently, escalate when needed**.

---

## Abuse Taxonomy

### Category 1: Account Manipulation

| ID | Abuse type | Opis | Severity |
|----|-----------|------|----------|
| AM-01 | **Multi-accounting** | User creates multiple free accounts (credit farming) | MEDIUM |
| AM-02 | **Account takeover** | Unauthorized access to another user's account | HIGH |
| AM-03 | **Identity theft** | Using someone else's identity (fake KYC) | CRITICAL |
| AM-04 | **Bot accounts** | Automated accounts for likes/follows/spam | MEDIUM |
| AM-05 | **Underage account** | User under minimum age (18 for RFG, 13 for HHU) | CRITICAL |

### Category 2: Content Abuse

| ID | Abuse type | Opis | Severity |
|----|-----------|------|----------|
| CA-01 | **Spam** | Repetitive, low-quality, promotional content | LOW |
| CA-02 | **Hate speech** | Content targeting protected groups | HIGH |
| CA-03 | **Harassment / doxxing** | Targeted abuse, publishing personal information | HIGH |
| CA-04 | **NSFW / nudity** | Sexual or explicit content | HIGH (HHU) / CRITICAL (RFG) |
| CA-05 | **Copyright infringement** | Using others' music, images, text without permission | MEDIUM |
| CA-06 | **Threats of violence** | Direct or implied threats | CRITICAL |
| CA-07 | **Misinformation** (v1.0) | Deliberately false information (e.g., fake events) | LOW |

### Category 3: Financial Fraud

| ID | Abuse type | Opis | Severity |
|----|-----------|------|----------|
| FF-01 | **Self-tipping** | Creator tips themselves from alt account | MEDIUM |
| FF-02 | **Chargeback fraud** | Fan tips/subscribes then disputes charge | HIGH |
| FF-03 | **Credit card fraud** | Stolen card used for subscriptions | CRITICAL |
| FF-04 | **Fake subscription inflation** | Bot accounts subscribe to inflate Creator earnings | HIGH |
| FF-05 | **Referral abuse** | Multiple accounts created for referral rewards | MEDIUM |
| FF-06 | **Payout fraud** | Fake Creator extracts payouts from platform | CRITICAL |

### Category 4: Social Engineering

| ID | Abuse type | Opis | Severity |
|----|-----------|------|----------|
| SE-01 | **Phishing** | Fake links/messages to steal credentials | HIGH |
| SE-02 | **Scam offers** | Fake casting calls, fake brand deals | HIGH |
| SE-03 | **Grooming** | Predatory contact, especially toward young users | CRITICAL |
| SE-04 | **Sextortion** | Threatening to publish private images/info | CRITICAL |
| SE-05 | **Impersonation** | Pretending to be another user, brand, or HHU staff | HIGH |

### Category 5: Platform Manipulation

| ID | Abuse type | Opis | Severity |
|----|-----------|------|----------|
| PM-01 | **Coordinated inauthentic behavior** | Groups of accounts acting together to manipulate feed/trending | MEDIUM |
| PM-02 | **Algorithm gaming** | Posting patterns designed to exploit feed algorithm (doc 38) | LOW |
| PM-03 | **Data scraping** | Automated extraction of user content/data | MEDIUM |
| PM-04 | **API abuse** (v1.0) | Excessive API calls for data extraction | MEDIUM |

---

## Signal Types

### Real-Time Signals

| Signal | Source | Detection method |
|--------|--------|-----------------|
| High-velocity actions (>50 likes/min) | Activity logs | Rate threshold |
| Same device ID on multiple accounts | Device fingerprint | Fingerprint matching |
| Failed login attempts (>10 in 5 min) | Auth logs | Threshold |
| New account + immediate mass messaging | Activity pattern | Rule-based |
| Content flagged by AI moderation | Content pipeline | ML classifier |
| Payment from high-risk country + new account | Stripe Radar | Stripe risk score |

### Behavioral Signals (accumulated)

| Signal | Source | Detection method |
|--------|--------|-----------------|
| Account created <24h ago + unusual activity | Registration + activity | Time-based rule |
| User reports (≥3 reports from different users) | Report system | Threshold |
| Low-quality content pattern (repetitive, copy-paste) | Content analysis | NLP similarity check |
| Outbound links to known scam domains | Link analysis | Domain blacklist |
| Tip amounts exactly matching (self-tip pattern) | EarningsLedger | Statistical anomaly |

---

## Risk Scoring

### User Risk Score

Each user gets a risk score $R \in [0, 100]$ calculated as:

$$R = w_1 \cdot S_{account} + w_2 \cdot S_{behavior} + w_3 \cdot S_{financial} + w_4 \cdot S_{reports}$$

| Component | Weight | Range | Factors |
|-----------|--------|-------|---------|
| $S_{account}$ | 0.20 | 0-100 | Account age, verification level, profile completeness |
| $S_{behavior}$ | 0.30 | 0-100 | Action velocity, content quality, interaction patterns |
| $S_{financial}$ | 0.25 | 0-100 | Stripe risk score, chargeback history, payment patterns |
| $S_{reports}$ | 0.25 | 0-100 | Number/severity of reports received, upheld reports |

### Risk Tiers

| Tier | Score Range | Action |
|------|------------|--------|
| **Green** | 0-25 | Normal operation |
| **Yellow** | 26-50 | Enhanced monitoring; some actions require CAPTCHA |
| **Orange** | 51-75 | Restricted actions (no messaging, limited posting); manual review queued |
| **Red** | 76-100 | Auto-suspension; immediate manual review required |

### MVP Implementation

For MVP, implement **simplified scoring**: binary flags instead of weighted score.

| Flag | Trigger | Immediate action |
|------|---------|-----------------|
| `is_new` | Account <7 days | Message rate limit: 5/day |
| `is_reported` | ≥2 upheld reports | Content review queue for new posts |
| `is_suspicious_financial` | Stripe Radar high-risk | Payment blocked until manual review |
| `is_multi_account` | Device fingerprint match | Second account blocked |

---

## Enforcement Ladder (Consolidated)

Extends docs 23 (content), 28 (abuse), 38 (community), 46 (RFG).

| Level | Action | Trigger | Applies to | Reversible |
|-------|--------|---------|-----------|-----------|
| E0 | **Warning** (in-app notification) | First minor offense | All | ✅ |
| E1 | **Content removal** | Content violates policy | All | ✅ |
| E2 | **Action restriction** (24h) | Repeated minor; single moderate | All | ✅ Auto |
| E3 | **Suspension** (7 days) | Severe violation OR 3× E0-E2 | All | ✅ Appeal |
| E4 | **Extended suspension** (30 days) | Very severe OR 2× E3 | All | ✅ Appeal |
| E5 | **Permanent ban** | Egregious OR 3× E3+ | All | ✅ Appeal (doc 23, FDN-63) |
| E6 | **Legal referral** | Criminal activity (exploitation, fraud) | All | ❌ External |

### Automatic Enforcement (no human needed)

| Trigger | Auto-action |
|---------|------------|
| Device fingerprint: 3rd account from same device | Block account creation |
| 50+ actions/minute from single user | Rate throttle (1 min cooldown) |
| Stripe 3D Secure failure × 3 in 1 hour | Block payments for 24h |
| AI content filter: nudity (RFG) confidence >95% | Content auto-removed; E1 |
| AI content filter: hate speech confidence >90% | Content auto-removed; E1 + human review |

### Manual Enforcement (human review)

| Trigger | Queue priority |
|---------|---------------|
| User report: exploitation / safety | CRITICAL (2h SLA) |
| User report: harassment | HIGH (4h SLA) |
| Risk score enters Orange | HIGH |
| Risk score enters Red | CRITICAL |
| Chargeback dispute | MEDIUM (24h SLA) |

---

## Moderator Workflows

### Workflow 1: Content Review

```
Item in moderation queue →
  Moderator views: content, context, reporter info, user history →
  Decision:
    → Approve (false positive) → Close; adjust AI threshold
    → Remove content (E1) → Notify user; log
    → Remove + warn (E0+E1) → Notify user; log
    → Remove + restrict (E1+E2) → Notify user; 24h restriction; log
    → Escalate (E3+) → Senior mod / Founder decision
```

### Workflow 2: Account Investigation

```
Suspicious account flagged →
  Moderator reviews: registration data, activity log, device info, payment history →
  Decision:
    → Clear (false positive)
    → Restrict + monitor (Orange tier)
    → Suspend (E3-E4)
    → Ban (E5) — requires senior confirmation
    → Legal referral (E6) — requires Founder approval
```

### Workflow 3: Financial Fraud Review

```
Stripe radar alert OR chargeback notification →
  Review: transaction history, user KYC, device data →
  Decision:
    → Legitimate → Clear; no action
    → Suspicious → Block future payments; contact user for verification
    → Confirmed fraud → Refund victims; ban account (E5); report to Stripe
    → Organized fraud → E6 (legal referral); evidence preservation
```

---

## Evidence Vault

### Concept

All enforcement actions require preserved evidence. Evidence Vault = structured storage of moderation decisions, user data snapshots, and content copies (for legal and appeal purposes).

### What gets preserved

| Evidence type | Retention |
|-------------|-----------|
| Removed content (text, images) | 90 days (GDPR: minimal retention) |
| Moderation decision log | 2 years (legal compliance) |
| User activity snapshot (at time of enforcement) | 90 days |
| Report details (reporter + evidence) | 2 years |
| Chat/message threads (if relevant) | 90 days |
| Legal referral evidence | Indefinite (LegalHold — doc 25) |

### Storage

| Element | Implementation |
|---------|---------------|
| Location | Cloudflare R2 (encrypted bucket, separate from production content) |
| Access | Admin only (Founder + designated moderator) |
| Audit log | Every access to Evidence Vault is logged |
| Encryption | AES-256 at rest; TLS in transit |
| GDPR | Data subject rights apply — but LegalHold exceptions per doc 25 |

---

## Legal Escalation Logic

### When to escalate to authorities

| Trigger | Authority | Process |
|---------|----------|---------|
| Confirmed CSAM (child sexual abuse material) | Polish Police (Wydz. Cyberprzestępczości) + NCMEC | Immediate; preserve evidence; do NOT delete content before police confirmation |
| Confirmed exploitation of minors (non-CSAM) | Polish Police | Within 24h of confirmation |
| Sextortion / blackmail | Polish Police | Within 24h; preserve evidence |
| Financial fraud > $1000 cumulative | Polish Police (Wydz. Gospodarczy) | After internal investigation |
| Threats of imminent violence | Emergency services (112) | Immediately |
| GDPR breach involving >1000 users | UODO (Polish DPA) | Within 72h (doc 25) |

### Legal escalation flow

```
Confirmed E6 trigger →
  Founder notified immediately →
  Evidence Vault: freeze relevant data (LegalHold) →
  Consult legal advisor (if available) →
  File report with appropriate authority →
  Document in incident log (doc 29) →
  Cooperate with investigation as required
```

---

## Ryzyka

| ID | Ryzyko | P | I | Mitygacja |
|----|--------|---|---|-----------|
| TSA-01 | Solo dev cannot handle moderation volume at scale | WYSOKIE | WYSOKI | AI-assisted moderation; prioritize by severity; hire part-time mod at ≥1000 MAU |
| TSA-02 | False positive auto-enforcement (legitimate content removed) | ŚREDNIE | ŚREDNI | AI confidence thresholds conservative (>90%); appeal process; human review queue |
| TSA-03 | CSAM uploaded to platform | NISKIE | KRYTYCZNE | AI hash matching (PhotoDNA-like service); immediate auto-block; zero tolerance |
| TSA-04 | Organized fraud ring targets platform | NISKIE | WYSOKI | Stripe Radar; multi-account detection; manual investigation for $500+ anomalies |
| TSA-05 | Legal escalation creates reputational risk | NISKIE | WYSOKI | Transparent process; documented evidence; cooperate fully with authorities |

---

## Rekomendacja wdrożeniowa

### DETECTION (MVP)

1. Rate limiting (50 actions/min)
2. Device fingerprint for multi-account detection
3. Stripe Radar integration (fraud signals)
4. Basic AI content filter (nudity, hate speech — API-based)
5. Report system (dropdown + evidence upload)

### RESTRICTION (v0.3)

6. Risk scoring (simplified: binary flags)
7. Auto-enforcement for high-confidence detections
8. Moderation queue with SLA tracking
9. Enforcement ladder (E0-E5) with notification system

### EVIDENCE (v0.5)

10. Evidence Vault (Cloudflare R2, encrypted)
11. Audit logging for all moderation actions
12. Content hash matching (anti-CSAM)

### ESCALATION (v0.5+)

13. Legal escalation workflow
14. Authority reporting templates
15. Advanced risk scoring (weighted formula)
16. Behavioral pattern detection (coordinated inauthentic behavior)

---

## Founder Decision Notes

| ID | Decyzja | Status | Uwagi |
|----|---------|--------|-------|
| FDN-133 | Czy AI content moderation powinno być real-time (pre-publish) czy post-publish? | 🟡 DO DECYZJI | Rekomendacja: post-publish w MVP (faster UX); pre-publish w v0.5 for images (NSFW/CSAM) |
| FDN-134 | Czy PhotoDNA (Microsoft) or similar CSAM hash matching jest dostępny/affordable? | 🟡 DO DECYZJI | Rekomendacja: research options; NCMEC provides hash database for free to qualifying platforms |
| FDN-135 | Kiedy zatrudnić pierwszego content moderatora? | 🟡 DO DECYZJI | Rekomendacja: ≥500 MAU (part-time); ≥2000 MAU (full-time); Founder handles do 500 MAU |

---

## Dokumenty zależne

| Kierunek | Dokument |
|----------|----------|
| ← INPUT | 22 — KYC / Verification |
| ← INPUT | 23 — Content Moderation Policy |
| ← INPUT | 25 — Data Protection |
| ← INPUT | 27 — Trust & Safety Framework |
| ← INPUT | 28 — Abuse Prevention Playbook |
| ← INPUT | 29 — Incident Response Protocol |
| ← INPUT | 46 — RFG Safety & Verification |
| → OUTPUT | 50 — Investor Narrative |
| → CROSS | 48 — Monetization Engine (fraud in payments) |
