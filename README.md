# TRACE — Digital Content Provenance & Forensics

> **Don't just check the content. Trace how it became what you see.**

[![HackDay 1.0](https://img.shields.io/badge/HackDay-1.0-blue)](https://unstop.com/)
[![React](https://img.shields.io/badge/Frontend-React%20%2B%20TypeScript-61DAFB)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688)](https://fastapi.tiangolo.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

**TRACE** is an AI-powered digital content provenance and forensic analysis platform designed to investigate how digital content evolves over time.

Instead of simply asking **"Is this content fake?"**, TRACE investigates:

> **"Where did this content come from, what changed, and how did it become the version I am seeing now?"**

---

## 🚀 Live Demo

**Website:**
https://trace-content.netlify.app/
https://v0-provenance-swart-1902.vercel.app/

**GitHub:**
https://github.com/Moukhikaa/Trace-Content

---

## 🎯 The Problem

Digital content can be copied, cropped, edited, screenshotted, and reposted within minutes.

A single piece of information can evolve through multiple versions:

```text
Original Notice
      ↓
Edited Version
      ↓
Cropped Screenshot
      ↓
Reposted Image
      ↓
Viral Screenshot
      ↓
Current Version
```

During this process:

* Dates can be changed
* Numbers can be modified
* Logos can be replaced
* Text can be removed or added
* Images can be cropped
* Context can disappear
* Old information can be presented as new

Traditional fact-checking tools and simple AI detectors often focus on whether something is **true, false, or AI-generated**.

TRACE focuses on something different:

### **Reconstructing the evidence trail behind digital content.**

---

# 💡 Our Solution

TRACE combines content extraction, similarity analysis, change detection, and provenance visualization into a single investigation workflow.

### Core workflow

```text
UPLOAD
   ↓
EXTRACT
   ↓
FINGERPRINT
   ↓
DISCOVER RELATED CONTENT
   ↓
COMPARE VERSIONS
   ↓
RECONSTRUCT PROVENANCE
   ↓
ANALYZE CLAIMS
   ↓
VIEW EVIDENCE TRAIL
```

The platform helps users understand:

* What related versions exist
* Which version appears earlier in the discovered evidence
* What changed between versions
* Which claims differ
* How content evolved across reposts and modifications

---

# ✨ Key Features

## 🔎 1. Content Investigation

Upload suspicious digital content and begin an investigation.

Supported input concepts include:

* Images
* Screenshots
* Documents
* Text
* URLs

---

## 🧬 2. Digital Fingerprinting

TRACE extracts multiple signals from content to help identify related versions.

Signals can include:

* Text fingerprints
* Visual similarity
* Extracted text
* Metadata
* Entities
* Semantic relationships

---

## 🔗 3. Related Version Discovery

Instead of looking for only one matching source, TRACE can identify multiple related versions.

Example:

```text
Version 1
Original scholarship notice

        ↓

Version 2
Deadline modified

        ↓

Version 3
Logo / layout modified

        ↓

Version 4
Screenshot created

        ↓

Version 5
Current circulated version
```

---

# 🕵️ 4. Provenance Timeline

TRACE converts discovered relationships into an understandable content history.

### Example

```text
ORIGINAL
30 September deadline
      ↓
EDITED
20 September deadline
      ↓
CROPPED
Source information removed
      ↓
REPOSTED
Screenshot circulated
      ↓
CURRENT
Latest discovered version
```

This makes the evolution of content easier to understand than a simple **real/fake** label.

---

# ⚡ 5. "SHOW ME WHAT CHANGED"

One of TRACE's core investigation features.

Users can compare related versions and identify changes such as:

* Added text
* Removed text
* Modified dates
* Changed numbers
* Changed names
* Modified organizations
* Cropped sections
* Replaced visual elements

### Example

```diff
Original:
Application deadline: 30 September 2026

Current:
Application deadline: 20 September 2026
```

Instead of hiding the reasoning behind a single score, TRACE exposes the observable differences.

---

# 🧩 6. Claim Analysis

A piece of content may contain multiple claims.

TRACE can break content into individual claims and analyze them separately.

Example:

```text
Claim 1
"Applications close on 20 September."

→ Difference detected

Claim 2
"Applications are officially open."

→ Evidence required

Claim 3
"Apply through the official portal."

→ Source verification required
```

This allows users to investigate **specific statements**, rather than treating an entire document as one claim.

---

# 🕸️ 7. Evidence Graph

TRACE represents relationships between:

```text
Content
   │
   ├── Versions
   │
   ├── Claims
   │
   ├── Sources
   │
   └── Changes
```

This creates an evidence-oriented view of how information is connected.

---

# 🛠️ Technology Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Framer Motion
* Lucide React
* React Flow
* Recharts

### Backend

* Python
* FastAPI

### Data & AI

* OCR
* Computer Vision
* Text similarity
* Semantic similarity
* Content fingerprinting
* Metadata analysis
* AI-assisted claim analysis

### Database

* PostgreSQL / Supabase

### Deployment

* Netlify
* Vercel
* Render / compatible backend deployment

---

# 🏗️ System Architecture

```text
                    ┌──────────────────┐
                    │      USER        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   TRACE WEB APP  │
                    │ React + TypeScript│
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ CONTENT INGESTION│
                    │ Image/PDF/Text/URL│
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
        ┌──────────┐   ┌───────────┐  ┌──────────┐
        │   OCR    │   │  Visual   │  │ Metadata │
        │Extraction│   │Fingerprint│  │ Analysis │
        └────┬─────┘   └─────┬─────┘  └────┬─────┘
             │               │              │
             └───────────────┼──────────────┘
                             ▼
                    ┌──────────────────┐
                    │ SIMILARITY ENGINE│
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ RELATED CONTENT  │
                    │   DISCOVERY      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ PROVENANCE ENGINE│
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
        ┌──────────┐   ┌───────────┐  ┌──────────┐
        │ TIMELINE │   │   CHANGE  │  │  CLAIM   │
        │          │   │ DETECTION │  │ ANALYSIS │
        └────┬─────┘   └─────┬─────┘  └────┬─────┘
             │               │              │
             └───────────────┼──────────────┘
                             ▼
                    ┌──────────────────┐
                    │  EVIDENCE GRAPH  │
                    │   & SUMMARY      │
                    └──────────────────┘
```

---

# 🧪 Example Investigation

Consider a scholarship notice.

### Original version

```text
Application Deadline:
30 September 2026
```

### Modified version

```text
Application Deadline:
20 September 2026
```

### Reposted screenshot

The modified notice is cropped and circulated through messaging platforms.

### TRACE investigation

TRACE identifies:

```text
RELATED VERSIONS FOUND

Original
      ↓
Deadline Modified
      ↓
Screenshot Created
      ↓
Cropped/Reposted
      ↓
Current Content
```

The comparison view highlights the deadline change and other detected differences.

---

# 👥 Target Users

### 🎓 Students

Verify:

* College notices
* Scholarship announcements
* Internship information
* Placement notices

### 📰 Journalists & Researchers

Investigate:

* Reused images
* Altered documents
* Viral screenshots
* Conflicting versions

### 🏢 Organizations

Potential applications include:

* Document verification
* Communication monitoring
* Compliance workflows
* Digital evidence investigation

### 🌐 Everyday Internet Users

Understand the history and context behind suspicious digital content.

---

# 🌍 Impact

TRACE aims to make digital verification more transparent.

Instead of giving users an unexplained:

```text
TRUST SCORE: 37%
```

TRACE focuses on evidence:

```text
✓ Related version identified

✓ Strong text similarity

⚠ Deadline differs

⚠ Context changed

? Original source not independently established
```

The goal is to help users **inspect evidence and make informed decisions themselves**.

---

# 📈 Market & Business Potential

TRACE can evolve from a consumer investigation tool into a broader digital provenance platform.

### Potential customers

* Media organizations
* Educational institutions
* Enterprises
* Research organizations
* Compliance teams
* Digital safety platforms

### Possible business model

**Free**

Basic investigations for individuals.

**Pro**

Advanced investigations, reports, higher usage limits and expanded analysis.

**Enterprise**

API access, bulk analysis, monitoring and organizational integrations.

---

# 🔮 Future Roadmap

### Phase 1 — Current Prototype

* Content upload
* Text extraction
* Similarity analysis
* Version comparison
* Provenance visualization
* Claim analysis
* Evidence graph

### Phase 2

* Real-time source discovery
* Browser extension
* URL ingestion
* Advanced document analysis
* Video provenance

### Phase 3

* Cross-platform content tracking
* Large-scale provenance graphs
* Continuous monitoring
* Organization verification
* Public API
* Enterprise integrations

---

# 🏆 HACKDAY 1.0

TRACE was developed for **HACKDAY 1.0 — TECH FOR A BETTER TOMORROW** by **DECODEP**.

### Our focus

| Evaluation Area          | TRACE Focus                                       |
| ------------------------ | ------------------------------------------------- |
| Problem & Impact         | Digital content manipulation & provenance         |
| Innovation               | Content evolution reconstruction                  |
| Technical Implementation | OCR, fingerprinting, similarity & graph analysis  |
| UX                       | Investigation-first workflow                      |
| Feasibility              | Modular architecture & scalable analysis pipeline |

---

# ⚠️ Important Note

TRACE is an investigation and evidence-analysis prototype.

A detected relationship or similarity does **not automatically prove intentional manipulation or establish the absolute original source**.

The system should distinguish between:

* Detected differences
* Related content
* Evidence-supported relationships
* Unverified claims
* Unknown provenance

When sufficient evidence is unavailable, TRACE should communicate uncertainty rather than inventing conclusions.

---

# 🚀 Getting Started

## Prerequisites

Make sure you have:

* Node.js 18+
* npm
* Git

If using the backend:

* Python 3.10+
* pip

---

## Clone the Repository

```bash
git clone https://github.com/Moukhikaa/Trace-Content.git

cd Trace-Content
```

---

## Install Dependencies

```bash
npm install
```

---

## Start Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

# 🔐 Environment Variables

If API services are enabled, create a `.env` file based on the project's environment configuration.

Example:

```env
VITE_API_URL=your_api_url
VITE_AI_API_KEY=your_api_key
```

**Never commit real API keys or secrets to GitHub.**

---



# 👩‍💻 Team

### Team IYKYK

**Moukhikaa Gorji**

B.Tech Computer Science & Engineering

Vignan's Institute of Information Technology

---

# 📜 License

This project is developed as a hackathon prototype.

Add an appropriate open-source license if the project is intended for public reuse.

---

## 💭 The Vision

> **The internet doesn't just contain information. It contains versions of information.**

TRACE aims to make the journey between those versions visible.

### **Don't just ask whether content is real.**

### **TRACE how it became what you see.**
