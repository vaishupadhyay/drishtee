# Scan & Report — a proposed module for CPGRAMS
## Codex build specification

**Build What Moves India · deadline 28 Aug 2026, 8:00 PM IST**

Paste this into Codex as one task, or commit it as `SPEC.md` and say: *"Build to this spec. Block 1 first. Stop and show me before moving to Block 2."*

---

# 0 · Hard rules

Violating any one of these disqualifies the submission. Treat them as compile errors.

| Rule | How it binds this build |
|---|---|
| Codex meaningfully involved | Build through Codex. Maintain `CODEX.md` continuously — what it generated, representative prompts, what was hand-corrected and why. |
| Powered by an OpenAI model | `gpt-4o` for vision, `gpt-4o-mini` for text. No other model providers, anywhere. |
| Live public browser link | Vercel. Must open in mobile Safari and Chrome with no install and no access request. |
| Every demoed feature works | No dead buttons. No "coming soon" tiles. No static image standing in for UI. If it renders, it responds. |
| **No live government systems** | **Zero network calls to any `.gov.in` host.** No scraping, no undocumented APIs, no iframing a government page. Every integration is a local mock adapter. |
| No real Aadhaar, PAN, OTP, payment or health data | All seed data fictional. Mock OTP is `123456`, labelled on screen as a demo code. **Never render an Aadhaar-shaped input field at all.** |
| No official logos or implied endorsement | No Ashoka emblem, no CPGRAMS wordmark, no ministry crests, no `.gov.in` favicon. Own identity only. |
| Labelled independent prototype | Footer on every page, plus a line on `/auth`: "Independent hackathon prototype. Not affiliated with or endorsed by any government body." |
| Honesty is a scored criterion | `/whats-real` ships, linked from every footer, and is written plainly rather than defensively. |

**Positioning wording, use verbatim:** "A proposed Scan & Report module for CPGRAMS, built independently for Build What Moves India." Studying the real service is explicitly permitted. Claiming to be it is not.

---

# 1 · The problem, and why this is the right cut of it

A citizen who has been failed by a government office must, today, do the following before describing what happened: identify the correct ministry, the correct department, the correct subordinate office, and the correct grievance category — then complete an eleven-field registration form with a captcha.

Three distinct failures follow, and this build targets all three.

**Failure one — misrouting.** A grievance sent to the wrong department is closed without action. This is the most common way a complaint dies.

**Failure two — wrong portal entirely.** CPGRAMS is not the right destination for everything. Provident fund belongs on EPFiGMS. Income tax belongs on e-Nivaran. Central pension belongs on CPENGRAMS. Consumer disputes belong to the National Consumer Helpline. Citizens do not know these boundaries. They file, wait thirty days, and are told it is not that department's subject.

**Failure three — duplication.** Eight people experiencing the same broken counter file eight unrelated tickets. Each is individually weak. None reveals the pattern. The system counts eight problems where there is one.

**The insight this build is organised around:** identifying the office is the demo, but the routing check and the join-a-report flow are the product. If you run short of time, cut the voice front-end before you cut either of those.

---

# 2 · Stack

- **Next.js 15**, App Router, TypeScript strict
- **Tailwind CSS v4** with tokens declared in `app/globals.css` — no raw hex in components
- **Zustand** for the report draft, **Zod** at every API boundary, schemas in `lib/schemas/`
- **Seeded JSON store** in `data/seed/` read through `lib/db.ts`. Skip Prisma — the data volume is trivial and setup time is your scarcest resource.
- **OpenAI SDK**, server-side only, in `app/api/ai/*/route.ts`
- **Web Speech API** for voice, with an always-visible typing fallback
- **`getUserMedia`** for camera, plus a file input, plus three bundled sample photos
- Deployed to **Vercel**

### Directory shape

```
app/
  page.tsx                 home
  scan/page.tsx            capture
  scan/identify/page.tsx   candidates
  scan/route-check/page.tsx  jurisdiction
  scan/issues/page.tsx     join or new
  scan/describe/page.tsx   voice + typing
  scan/review/page.tsx     confirm
  talk/page.tsx            voice-first front-end
  auth/page.tsx
  reports/page.tsx
  reports/[id]/page.tsx
  spid/[spid]/page.tsx
  near-me/page.tsx
  whats-real/page.tsx
  api/ai/identify/route.ts
  api/ai/route-check/route.ts
  api/ai/structure/route.ts
  api/ai/similar/route.ts
  api/ai/closure-review/route.ts
  api/geo/reverse/route.ts
components/
  service-point-card.tsx   the signature element
  option-card.tsx
  confidence-bar.tsx
  ai-field.tsx             editable AI-derived field with source label
  simulated-banner.tsx
lib/
  ai/openai.ts             client + withFallback wrapper
  ai/prompts.ts            all system prompts, one file
  integrations/            mock adapters, §4
  schemas/
  store/draft.ts
data/seed/
  service-points.json  grievances.json  citizens.json  fixtures/
public/samples/            three sample board photos
```

### Resilience — this protects your submission

Judging runs 28 Aug – 1 Sep, **after** you submit. If your API key expires or rate-limits during that window, your live link must still complete the journey.

1. **Fixture the sample photos.** Each bundled sample has a cached identify response in `data/seed/fixtures/`. That path never calls OpenAI.
2. **Wrap every model call** in `withFallback()` — on any error, timeout over 12s, or malformed JSON, return a deterministic stub result and set `degraded: true`. The UI shows a small "running in offline mode" chip. The journey never breaks.
3. **Hard spend cap** on the key. Rate-limit `/api/ai/*` by IP.
4. **A reviewer on a desktop with no camera must finish the entire journey.** Test this explicitly before submitting. It is the single most likely way this submission dies.

---

# 3 · Design system

Institutional and trustworthy, but not a copy of the existing site and not a generic product landing page. No cream-and-terracotta, no dark mode with an acid accent, no glassmorphism, no gradient meshes.

### Tokens

```
--ink       #1A1614    --ink-2  #4A4340   --ink-3  #6B625C   --ink-4  #8A807A
--paper     #F7F4EF    --paper-2 #EFE9DF  --card   #FFFFFF
--seal      #6D1B3E    --seal-deep #48122A --seal-tint #F3E7EC
--stamp     #C8641B    --stamp-deep #A04D11 --stamp-tint #FBEEE2
--verify    #1F6A4D    --verify-tint #E6F1EB
--alert     #B3261E    --alert-tint  #FBEAE9
--rule      #D8D0C4    --rule-strong #BCB1A1
```

`--stamp` is the **only** action accent and appears at most twice per screen. `--verify` is reserved exclusively for resolved and confirmed states; never use it for decoration.

### Type

Display **Familjen Grotesk**, body **Inter**, Indic via **Noto Sans Devanagari** and **Noto Sans Tamil**, all self-hosted through `next/font`. Scale: 13 / 15 / 17 / 21 / 27 / 34. Body line-height 1.55, display 1.2. **Minimum body size 15px** — this audience includes people who need it.

### Rules

Contrast floor 4.5:1 for text, 3:1 for UI boundaries. Touch targets minimum 48×48. Hairlines are 1px `--rule`. Card radius 12px, control radius 8px. **No shadows** — elevation comes from hairlines and surface colour, which is what makes it read as institutional rather than consumer-app.

### Signature element — the Service Point Card

The one visually memorable object in the product. Styled as a stamped paper slip: perforated top edge, tabular-numeral SPID, a confidence bar, the department's redressal score, and the count of open reports at that exact point.

It appears the instant a board is identified, and **persists as a compact header through every subsequent step of the flow** — describe, evidence, review, confirmation. That persistence is what makes the scan feel like it genuinely found something rather than just categorised a photo.

```tsx
<ServicePointCard
  spid="TN-CBE-REV-TALUK-014"
  name="Taluk Office, Coimbatore North"
  department="Revenue Department"
  parentBody="Government of Tamil Nadu"
  confidence={96}
  openReports={8}
  graiScore={62}
  variant="full" | "header"
/>
```

Spend your boldness here. Everything around it stays quiet and disciplined.

### Motion

**One orchestrated moment:** the scan-to-identify transition. The reticle settles (scale 1.18 → 0.97 → 1.0 over 420ms on an overshoot curve), then the Service Point Card stamps in with a 0.6° rotation settling to zero. That is the moment the product is remembered by.

Everything else is 120–160ms opacity and transform. `prefers-reduced-motion` is respected globally via a media query that collapses all durations to 0.01ms.

### Copy

Active voice, sentence case, plain verbs. Controls name what happens: "Add my report", not "Submit". An action keeps the same name through the whole flow — the button that says "File this" produces a confirmation that says "Filed". Errors state what happened and what to do, without apologising or being vague. No exclamation marks. No "Oops". Empty states are invitations, not apologies.

---

# 4 · Integration layer — every surface mocked

Build `lib/integrations/` with one adapter per surface. Each implements a common interface, reads seeded data, and is registered in a manifest that `/whats-real` renders automatically — so the honesty page can never drift out of date.

```ts
interface Integration {
  id: string
  displayName: string
  simulates: string        // what it fakes, one plain sentence
  productionNote: string   // how it would actually work
  owner: string            // which body operates the real thing
}
```

Any screen that consumes an adapter renders `<SimulatedBanner>`: *"Simulated integration — no live government system is contacted."*

## 4.1 Portal routing — build this first, it is the differentiator

```ts
route(narrative, servicePoint): {
  portal: "CPGRAMS" | "CPENGRAMS" | "EPFiGMS" | "e-Nivaran" | "NCH" | "STATE_PORTAL" | "OUT_OF_SCOPE"
  reason: string           // plain language, addressed to the citizen
  handoffPayload: {        // pre-composed, ready to carry across
    subject: string
    body: string
    documentsToAttach: string[]
    whereToGo: string
  }
  confidence: number
}
```

Seeded jurisdiction rules:

| Signals in the narrative | Portal | Operated by |
|---|---|---|
| Central government pension, PPO, retirement dues | CPENGRAMS | DoPPW, on the DARPG stack |
| Provident fund, UAN, EPF withdrawal, employer PF default | EPFiGMS | EPFO |
| Income tax refund, assessment, TDS credit | e-Nivaran | Income Tax Department |
| Defective goods, private seller, service deficiency | National Consumer Helpline | Dept. of Consumer Affairs |
| State-subject service delivery | State grievance portal (named per state) | State government |
| RTI request, matter before a court, policy disagreement | OUT_OF_SCOPE | — explain what to do instead |
| Everything else | CPGRAMS | DARPG |

**Behaviour when it isn't CPGRAMS:** do not dump the citizen at a link. Show the portal name, one sentence on why, the pre-composed complaint they can copy, and the documents they will be asked for. Then offer "File on CPGRAMS anyway" as a secondary option — the citizen retains the choice; this advises, it does not gate.

## 4.2 DARPG-family adapters

| Adapter | Simulates | Production note |
|---|---|---|
| `CpengramsAdapter` | Pension grievance handoff | Same DARPG stack; a real build shares the CPGRAMS session |
| `AppealAdapter` | Nodal Authority for Appeal, multi-level | Real appeal is enabled when post-closure feedback is poor — mirror that trigger exactly |
| `FeedbackCallCentreAdapter` | Post-closure feedback capture | Real system collects feedback on disposed grievances by call centre, SMS and email |
| `IgmsAdapter` | Category and root-cause tagging | Real IGMS performs AI categorisation and root-cause analysis |
| `GraiAdapter` | Department redressal score on the service point page | GRAI benchmarks ministries on redressal quality |
| `DsuAdapter` | Systemic flag at N reports per service point in 30 days | The Data Strategy Unit consumes patterns, not individual tickets |

Surface `GraiAdapter` on the Service Point Card. Showing a citizen the department's own redressal record *before* they file is a small feature with outsized credibility.

## 4.3 Channel adapters

**Build these two:**

- `UmangBridgeAdapter` — entry from UMANG with department mapping pre-filled, and **duplicate suppression**: if a matching grievance already exists from any channel, warn before creating a second ticket. Filing the same complaint through two channels produces two tickets routed to two officers and two contradictory replies. Demonstrate that this build prevents it.
- `CscAdapter` — VLE-assisted filing with recorded citizen consent and an operator ID attached to the record. This is the rural distribution channel; model it as a distinct session type, not a flag.

**Stub behind the interface, list as not built:** `MyGrievanceAdapter` (app/web session continuity), `SocialIntakeAdapter` (X, WhatsApp, Google, Facebook intake).

## 4.4 Identity, document and language

| Adapter | Simulates | Constraint |
|---|---|---|
| `DigiLockerAdapter` | Attaching a document from a simulated locker | Fictional documents only |
| `IdentityAdapter` | Verified-citizen status | **A boolean. Nothing else.** No ID number field exists anywhere in this build. |
| `BhashiniAdapter` | Translating narrative and officer replies | Real Bhashini covers 22 scheduled languages; ship 3 and say so |

Locking `IdentityAdapter` to a boolean is deliberate. There is no version of an Aadhaar-shaped input worth the rule risk.

## 4.5 Service point directory

`ServicePointDirectory` — the SPID registry that makes scanning possible. Seeded with 12 offices.

This is the hardest unsolved part of the real idea and a reviewer will ask. Answer it on `/whats-real` before they do: seed from departmental asset registries and CSC location data; grow through citizen scans that create unverified points; a nodal officer confirms a point before it becomes routable. Unverified points still accept grievances but flag them for manual routing.

---

# 5 · AI layer

All prompts live in `lib/ai/prompts.ts`. Every response is validated with Zod before it reaches the UI; a validation failure triggers the fallback path, never a crash.

### Shared guardrails, enforced in code and not merely in prompts

1. **Nothing is filed that the citizen has not seen and confirmed.**
2. **The citizen's narrative is never rewritten.** Structure is produced *alongside* the verbatim text, and the verbatim text is what is stored and displayed first.
3. **Personal names of officials are stripped from the routed record.** Complaints attach to a service point plus a designation.
4. **Every AI-derived field renders through `<AiField>`**, which shows a source label and an edit control. Nothing inferred is read-only.
5. **Low confidence degrades to a human choice, never to a silent guess.**

## 5.1 `POST /api/ai/identify`

Request: `{ imageBase64, lat?, lng?, accuracyM?, isLiveCapture }`

System prompt:

> You read photographs of Indian government signage. Return only what is visibly present. Extract: all legible text verbatim in its original script, any department or government emblem you can see, the apparent type of location (main office board, service counter, department board, notice, token slip, receipt), and any office, department or place name. If text is partially obscured, report the legible portion and mark it partial. Never guess a name that is not visible. Return JSON only, no prose.

The **server**, not the model, then: fuzzy-matches extracted text against `service-points.json` including the `aliases` array; computes distance from device location to each candidate; and produces a final confidence combining OCR match strength (50%), location proximity (35%), and emblem/visual match (15%).

Response: `{ candidates: [{ spid, name, department, confidence, reasons: string[], distanceM }], ocrText, degraded }`

**Confidence bands drive the UI:**
- **≥90** — show the Service Point Card directly, with a quiet "Not this one?" link.
- **50–89** — "We found 3 possible offices. Which one are you at?" listed with distances.
- **<50, or >2km from every candidate** — manual search. Say it plainly: "This looks like a photo taken somewhere else, so we'll need you to pick the office." Never accuse the citizen. Record `isLiveCapture: false` on the evidence and move on.

## 5.2 `POST /api/ai/route-check`

Request: `{ narrative, servicePoint }`

System prompt:

> You determine which Indian government grievance portal has jurisdiction over a citizen's complaint. Choose exactly one of: CPGRAMS, CPENGRAMS, EPFiGMS, e-Nivaran, NCH, STATE_PORTAL, OUT_OF_SCOPE. Then write one sentence addressed directly to the citizen explaining why, in plain language, without jargon and without implying they made a mistake. Then compose a complete complaint for that portal in their own factual terms, and list the documents they will be asked for. If the matter is an RTI request, a case before a court, or a disagreement with policy rather than with service delivery, return OUT_OF_SCOPE and say what they can do instead. Return JSON only.

## 5.3 `POST /api/ai/structure`

Request: `{ narrative, servicePoint, language }`

System prompt:

> You convert a citizen's account of a government service failure into a structured grievance record. You never invent facts. Anything you are unsure of goes into missingInfo as a short question, never into the record. Produce: a title of at most 80 characters in the citizen's own register; a category and sub-category; an urgency from 1 to 5 where 5 means a risk to health, safety or livelihood; and the remedy the citizen appears to be asking for. Separately, list any personal names of government officials mentioned. Do not rewrite, summarise or soften the citizen's own words — they are stored separately and unchanged. Return JSON only.

Response: `{ title, category, subCategory, urgency, requestedRemedy, missingInfo[], personalNamesDetected[] }`

**`missingInfo` renders as at most two tappable chips.** More than two is an interrogation. Example: "When did this happen?" → Today / This week / Longer ago.

**When `personalNamesDetected` is non-empty**, show exactly this: *"We've kept your description as you wrote it. The complaint files against the role, not the person — that's what makes it actionable, and it protects you."*

## 5.4 `POST /api/ai/similar`

Request: `{ narrative, openGrievances }` (scoped to one SPID, 30-day window)

Returns a similarity ranking with a one-line reason per match. **Threshold tuned to prefer offering a join over merging.** The citizen always chooses. Never auto-merge, never hide the option to file separately.

## 5.5 `POST /api/ai/closure-review`

Request: `{ narrative, requestedRemedy, closureNote }`

System prompt:

> You compare an officer's closing note against a citizen's original complaint and the remedy they asked for. Return resolved if the note addresses the specific problem and the remedy. Return unclear if it responds but leaves the outcome ambiguous. Return not_addressed if it restates policy, describes process, or closes without addressing what happened. Give your reasons in short factual sentences. If the verdict is not resolved, draft an appeal in the citizen's voice: state what was asked, what the closing note said, and what remains outstanding. Be factual and non-inflammatory. Return JSON only.

Response: `{ verdict, reasons[], draftAppeal }`

This is the emotional peak of the demo. Give it a full screen, not a toast.

---

# 6 · Data

### Service points — 12, seeded

Coimbatore and Salem. Taluk office; government hospital with a **pharmacy sub-point**; two fair-price shops; RTO; electricity board office; PHC; bus depot; sub-registrar office; municipal ward office; and one **unverified** citizen-discovered point to demonstrate that path.

`aliases` must match what the bundled sample photos actually show, or your demo fails on stage.

```ts
ServicePoint {
  spid: string              // "TN-CBE-REV-TALUK-014"
  name, department, parentBody, category: string
  lat, lng: number
  address: string
  aliases: string[]
  parentSpid?: string       // hospital → pharmacy
  charter: { service: string; slaDays: number }[]
  graiScore: number         // 0-100, from GraiAdapter
  verified: boolean
}
```

### Grievances — 25, seeded

Must include, or the demo has nothing to show:

- **An 8-supporter cluster** at the hospital pharmacy — "medicine shown as available in the system but not issued at the counter". This is the join demo.
- **A closed grievance with a weak closing note** — closure reads "The matter has been examined and necessary action taken as per rules." This is the closure-review demo, and it should return `not_addressed`.
- **A cluster past the systemic threshold** — 6 reports in 22 days at one fair-price shop.
- **One EPF grievance** filed at a district office — the portal-handoff demo.
- **One grievance with `sourceChannel: "UMANG"`** — the duplicate-suppression demo.

```ts
Grievance {
  id, registrationNo: string        // 16-digit, fictional
  spid: string
  designationTarget?: string        // "Village Administrative Officer" — never a name
  title: string
  narrative: string                 // verbatim, never modified
  structured: { category, subCategory, urgency, requestedRemedy }
  supporters: number
  supporterIds: string[]
  status: "open" | "acknowledged" | "in_progress" | "closed" | "reopened"
  filedAt, slaDueAt: string         // 30-day SLA
  evidence: EvidenceItem[]
  closureNote?: string
  closureQuality?: { verdict, reasons[], draftAppeal }
  sourceChannel: "web" | "UMANG" | "CSC" | "app"
}
```

All names, numbers and addresses fictional. Any ID number appearing in sample evidence uses an obviously invalid format.

---

# 7 · Screens

## 7.1 Home

Delivered — use the provided `page.tsx`. Contract summary: two options above the fold at equal weight, both fully visible without scrolling at 360×640; working three-language switch; track-a-report expanding inline without navigating; near-me row; persistent disclaimer. Below the fold, for reviewers: the removed-fields comparison, three what-changed cards, the six-step sequence, and the honesty band.

Prefetch `/scan` and the camera bundle on first paint. Request camera permission on the tap itself, not after navigation — target **under 400ms from tap to viewfinder**. Never request location on load.

Banned from this screen: hero images, crests, statistics counters, carousels, welcome modals, testimonials.

## 7.2 `/scan`

Live viewfinder with a framing reticle and the hint "Fit the board inside the frame." Torch toggle where supported. Below: "Choose a photo" and **"Use a sample photo"** — the latter is not a fallback for the reviewer's convenience, it is a required path, given a desktop reviewer.

Offline note: capture must work without network. Queueing is cut, but capture itself must not require a request.

## 7.3 `/scan/identify`

The orchestrated moment. Reticle settles, card stamps in. Show confidence and the reasons behind it — "board text matched", "42m from the recorded location", "state emblem detected". Explaining the identification is what converts a magic trick into a system a citizen can trust.

States: high confidence / three candidates / manual search / degraded mode.

## 7.4 `/scan/route-check`

Silent when the answer is CPGRAMS — do not make the citizen acknowledge a screen that says nothing changed. Show it only when the portal is different or out of scope, and then give it the full screen with the pre-composed handoff.

## 7.5 `/scan/issues`

Open reports at this service point, each row showing title, age, supporter count, status, SLA state.

Primary action per row: **"This happened to me too"** — one tap, adds a supporter, subscribes to resolution notification, optionally attaches their own evidence to the cluster.

Secondary: **"Report something else here."**

Say the value out loud in the interface: *"8 people reported this at this counter this month. Adding your voice makes it one strong case instead of eight weak ones."*

Empty state: "No open reports here yet. Yours would be the first."

## 7.6 `/scan/describe`

Voice and typing, both always visible, never one behind the other. Voice shows a live transcript. Typing has no minimum length and no dropdowns. After input, structure, then at most two follow-up chips.

## 7.7 `/scan/review`

The citizen's own words quoted **first and unchanged**, with the structured summary below it. Every AI-derived field rendered through `<AiField>` with a source label and an edit control. Evidence optional; ID-number-shaped patterns in OCR text are masked deterministically, plus a manual "blur this area" brush.

Submit gates on auth. The draft survives the auth round trip — store it in the Zustand store persisted to `sessionStorage`, restore after sign-in, and show "Your report is still here."

## 7.8 `/auth`

Sign in: mobile + OTP (`123456`, labelled as a demo code).

Sign up: **three fields.** Name, mobile, location permission. Everything else derived through `/api/geo/reverse` and shown in a collapsed, editable "We filled this from your location" panel with the source stated. Permission denied → a single pincode field derives district and state. Gender optional with "Prefer not to say". Email optional. No captcha.

## 7.9 `/reports/[id]`

Timeline: filed → acknowledged → in progress → closed, with the SLA clock and the responsible designation at every step. On closure: the closure-quality verdict, and if not `resolved`, the pre-drafted appeal with an edit control.

**Reverse notification:** when a clustered grievance closes, every supporter is notified, not only the original filer. Demonstrate this — it is the reason joining is worth doing.

## 7.10 `/spid/[spid]`

Service point page: citizen charter with promised SLAs, open clusters, resolution rate, GRAI score for the parent department. This is the page that lets a citizen check a department's record before they travel.

## 7.11 `/whats-real`

Rendered from the integration manifest so it cannot drift. Four blocks:

- **Works today** — identification, routing check, join-a-report, voice and typed filing, structuring, editable review, three-field signup with location autofill, submission, tracking, closure review, appeal drafting.
- **Simulated** — every adapter, individually named, with what it fakes and how it would work in production. Plus the 12-office directory, OTP, notifications, officer actions, reverse geocoding.
- **Not built** — the §8 cut list, each with one line on how it would work at scale.
- **How the directory gets built** — answered unprompted.

---

# 8 · Cut list — build none of these

Officer dashboard. Offline sync queue. Map view (list only). Automatic face blurring. Anonymous filing mode. SLA risk scoring. Proof-of-fix rescan. Twenty-two languages (ship three). Social intake channels. Real notification delivery (in-app only). Evidence hashing UI.

Each of these belongs in the video's second minute and under "what's next" on `/whats-real`. **Explaining a thing you deliberately did not build scores on product thinking. Half-building it scores nothing and risks a dead control, which costs you the working-build criterion.**

---

# 9 · Schedule

| Window | Block | Done means |
|---|---|---|
| T-29 → T-25 | **Block 1.** Repo, **deploy to Vercel in hour one**, tokens, layout, seed data, Zod schemas, all five AI routes stubbed, integration interfaces | The live URL renders the home page |
| T-25 → T-21 | **Block 2.** Home, both options, Service Point Card | Home passes its acceptance checks on a phone |
| T-21 → T-16 | **Block 3.** Scan → identify → route-check → issues, real `gpt-4o`, sample fixtures | Sample photo identifies an office and shows the cluster |
| Sleep | Actually sleep | — |
| T-12 → T-8 | **Block 4.** Describe, structure, review, evidence | A new report reaches the review screen |
| T-8 → T-6 | **Block 5.** Auth, submit, track, closure review, appeal | Full journey completes end to end |
| T-6 → T-5 | **Block 6.** `/talk` over the same state machine | Voice door completes the same journey |
| T-5 → T-4 | **Block 7.** `/whats-real`, disclaimers, `CODEX.md`, README | Honesty page renders from the manifest |
| **T-4 → T-2** | **Freeze. No new features.** | §10 passes on a phone on mobile data *and* on a camera-less desktop |
| T-2 → T-0 | Video, summary, submit | **Submit at T-2, not T-0** |

Deploy in hour one. A live link that grows for 29 hours is safe; a local build you deploy at 7:45 PM is not.

---

# 10 · Acceptance test

Run on a phone on mobile data, and on a desktop with no camera. Every step must pass.

1. Cold load: both options visible without scrolling, no modal, no permission prompt.
2. Switch language to Tamil: the page changes, including the option cards.
3. Tap Scan and report: viewfinder within 400ms, or sample photos offered on desktop.
4. Sample photo: an office is identified with a confidence score and stated reasons.
5. Describe a provident fund problem: told it belongs on EPFiGMS, with a pre-composed complaint and an honest explanation — and still offered the choice to file on CPGRAMS.
6. Scan the hospital pharmacy: 8 people already reported it; add your voice in one tap; confirmation names what happens next.
7. Report something new by speaking; watch it structure; edit a field the model produced.
8. Attach a photo; mask an ID number.
9. Sign up with name, mobile, location; address fills in and is editable; mock OTP visibly labelled.
10. Submit: registration number, SLA date, responsible designation.
11. Open the resolved cluster: supporters notified, closure verdict shown, appeal pre-drafted.
12. Complete steps 1–10 using only a keyboard, with a visible focus ring at every stop.
13. Throttle to Slow 4G: the journey still completes.
14. Disable the API key: the journey still completes in degraded mode.
15. Click every control on every screen. Nothing is dead.

---

# 11 · Submission artefacts

**`CODEX.md`** — what Codex generated, representative prompts, what you changed by hand and why. Write it as you go; reconstructing it at 7 PM tomorrow is miserable and it is directly scored.

**`README.md`** — what it is, the prototype disclaimer, how to run, how to switch on a live model, what is mocked, and the mock credentials a reviewer needs.

**250-word summary — draft:**

> Filing a grievance on CPGRAMS requires knowing which ministry, department and category owns your problem — and sometimes that CPGRAMS isn't the right portal at all. Provident fund belongs on EPFiGMS, income tax on e-Nivaran, pension on CPENGRAMS. Citizens don't know these boundaries. They file, wait thirty days, and are told it isn't that department's subject. Others give up at the eleven-field registration form.
>
> This is a proposed Scan & Report module for CPGRAMS. A citizen points their phone at the office, counter or notice where the problem happened. An OpenAI vision model reads the board; the system cross-checks it against a service point directory and the device's location, and returns an identification with its confidence and its reasoning.
>
> Before anything is filed, the model checks jurisdiction, and if the grievance belongs elsewhere it names the right portal and hands over a pre-composed complaint. If it belongs on CPGRAMS, the citizen sees what others have already reported at that exact counter — and adds their voice in one tap. Eight duplicate tickets become one strong case, and every supporter is notified on resolution.
>
> Registration is a name, a mobile number and a location permission. After closure, the model compares the officer's closing note against the original complaint and drafts an appeal if it wasn't actually addressed.
>
> Built with Codex. All data is synthetic and every government integration is a clearly labelled simulation — no live system is contacted. `/whats-real` documents exactly what works. Independent prototype, not affiliated with any government body.

**Video, 120 seconds:**

- 0:00–0:10 — the existing eleven-field registration form. "This is what stands between you and a complaint."
- 0:10–0:55 — one continuous phone recording: scan a board, office identified with confidence, "8 people reported this", add your voice, then a new report by voice, three-field signup, registration number.
- 0:55–1:15 — the provident fund complaint being routed to the right portal before thirty days are wasted.
- 1:15–1:35 — the closure verdict and the appeal. "A complaint that can't be quietly closed."
- 1:35–1:55 — how it was built: Codex, the OpenAI calls, why identification is confidence-scored rather than automatic.
- 1:55–2:00 — what's simulated, and the honesty page.

Record the citizen minute in **one take on a real phone**. Do not screen-record a desktop browser.

---

Start with Block 1. Deploy before building anything else. Show me the token file and the home page before continuing to Block 2.
