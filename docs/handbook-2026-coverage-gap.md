# UoM Handbook 2026 — full course scan vs DFVA coverage

**Scanned:** 2026-08-15 · **Handbook year:** 2026 · **Courses in handbook:** 543 (complete — every result accounted for)

## Method

The handbook search paginates unstably: repeating the same 28-page sweep returns a different
subset each time (a single `name_asc` pass yielded only 486 of 543, with pages 16–19, 24 and 26
short). Three independent passes were unioned to close it:

1. full sweep, `sort=name_asc` — 486 unique
2. per-faculty sweep across all 14 `org_unit` facets — 509 unique
3. full sweep, `sort=name_desc` — 485 unique

Union = **543/543**, matching the handbook's own reported total. Captured via same-origin
`fetch()` in a real browser (Crawl4AI is refused by the handbook), paced at ~2.5s/request.

Coverage is defined as *has a DFVA evidence file or a report* (`dfva/source/evidence/*.json`
or `reports/dfva-<code>.md`) = **68 programs**. All 68 still exist in the 2026 handbook — no
stale entries. Note `data/all_course_codes.json` lists 6 codes (`gd-spmed`, `gda-bltenv`,
`pr-anamgt`, `pr-iap`, `sc-dhw`, `sc-gclaw`) that have **no** evidence file and no report;
they are not counted as covered.

## Headline

| Award type | Live | Covered | **Missing** |
|---|---:|---:|---:|
| Masters | 225 | 44 | **181** |
| Bachelor | 28 | 2 | **26** |
| Diploma | 5 | 0 | **5** |
| Other (exec/enabling) | 4 | 1 | **3** |
| Doctorate (professional) | 9 | 9 | **0** |
| PhD | 12 | 12 | **0** |
| **Degree-level subtotal** | **283** | **68** | **215** |
| Graduate Certificate | 85 | 0 | 85 |
| Graduate Diploma | 66 | 0 | 66 |
| Specialist Certificate | 28 | 0 | 28 |
| Professional Certificate | 18 | 0 | 18 |
| **Sub-degree subtotal** | **197** | **0** | **197** |

A further 57 courses carry a **Discontinued** flag and 6 are **exit-only**; both are excluded
from the counts above. None of the 68 covered programs is discontinued.

**The research tail is complete** — all 12 live PhDs and all 9 live professional doctorates are
already scored. The entire gap is coursework: 181 Masters and 26 Bachelors.

## Missing live Masters (181), by faculty

### Medicine, Dentistry and Health Sciences (35)

- `305bb` — Master of Clinical Audiology
- `342aa` — Master of Psychiatry
- `527cn` — Master of Psychology (Clinical Neuropsychology)
- `552aa` — Master of Surgery
- `572at` — Master of Medicine
- `991aa` — Master of Biostatistics
- `j17re` — Master of Advanced Social Work
- `mc-adolhw` — Master of Adolescent Health and Wellbeing
- `mc-advnpph` — Master of Advanced Nursing Practice/Master of Public Health
- `mc-anp` — Master of Advanced Nursing Practice
- `mc-anpnp` — Master of Advanced Nursing Practice (Nurse Practitioner)
- `mc-ap` — Master of Applied Psychology
- `mc-biosenh` — Master of Biostatistics (Enhanced)
- `mc-clined` — Master of Clinical Education
- `mc-clinrhb` — Master of Clinical Rehabilitation
- `mc-cncrsc` — Master of Cancer Sciences
- `mc-counsmo` — Master of Counselling
- `mc-cu` — Master of Clinical Ultrasound
- `mc-genohlt` — Master of Genomics and Health
- `mc-ntcw` — Master of Narrative Therapy and Community Work
- `mc-phmo` — Master of Public Health
- `mc-phtypae` — Master of Physiotherapy (Paediatrics)
- `mc-po` — Master of Psychiatry
- `mc-socw` — Master of Social Work
- `mc-spchpth` — Master of Speech Pathology
- `mc-spmed` — Master of Sports Medicine
- `mc-ymhmo` — Master of Youth Mental Health
- `mr-philbms` — Master of Philosophy - MDHS (Biomedical Science)
- `mr-phildsc` — Master of Philosophy - MDHS (Dental Science)
- `mr-philhlt` — Master of Philosophy - MDHS (Health Sciences)
- `mr-philmed` — Master of Philosophy - MDHS (Medicine)
- `mr-philpgh` — Master of Philosophy - MDHS (Population and Global Health)
- `mr-philpsy` — Master of Philosophy - MDHS (Psychological Sciences)
- `mr-resmed` — Master of Research
- `n01aa` — Master of Clinical Research

### Business and Economics (25)

- `mc-actscen` — Master of Actuarial Science (Enhanced)
- `mc-actscex` — Master of Actuarial Science (Extended)
- `mc-aecoenh` — Master of Applied Econometrics (Enhanced)
- `mc-aemtrcs` — Master of Applied Econometrics
- `mc-bus` — Master of Business
- `mc-comact` — Master of Commerce (Accounting)
- `mc-comacts` — Master of Commerce (Actuarial Science)
- `mc-comdrfs` — Master of Commerce (Decision, Risk and Financial Sciences)
- `mc-comeco` — Master of Commerce (Economics)
- `mc-comfin` — Master of Commerce (Finance)
- `mc-commgmt` — Master of Commerce (Management)
- `mc-commktg` — Master of Commerce (Marketing)
- `mc-dmktg` — Master of Digital Marketing
- `mc-eco` — Master of Economics
- `mc-entrpsp` — Master of Entrepreneurship
- `mc-finance` — Master of Finance
- `mc-finenh` — Master of Finance (Enhanced)
- `mc-ib` — Master of International Business
- `mc-ibl` — Master of Indigenous Business Leadership
- `mc-mgmt` — Master of Management
- `mc-mgmtafn` — Master of Management (Accounting and Finance)
- `mc-mgmtein` — Master of Management (Entrepreneurship and Innovation)
- `mc-mgmtfin` — Master of Management (Finance)
- `mc-mgmtmkt` — Master of Management (Marketing)
- `mc-mgmtscm` — Master of Management (Supply Chain Management)

### Engineering and IT (17)

- `761em` — Master of Engineering Management
- `mc-aimo` — Master of Artificial Intelligence
- `mc-biomeng` — Master of Biomedical Engineering
- `mc-chemeng` — Master of Chemical Engineering
- `mc-civeng` — Master of Civil Engineering
- `mc-cybscmo` — Master of Cyber Security
- `mc-dinfeng` — Master of Digital Infrastructure Engineering
- `mc-eleceng` — Master of Electrical Engineering
- `mc-engysys` — Master of Energy Systems
- `mc-ensysen` — Master of Environmental Systems Engineering
- `mc-enveng` — Master of Environmental Engineering
- `mc-it` — Master of Information Technology
- `mc-mecheng` — Master of Mechanical Engineering
- `mc-mti` — Master of Medical Technology Innovation
- `mc-mtrneng` — Master of Mechatronics Engineering
- `mc-softeng` — Master of Software Engineering
- `mr-phileit` — Master of Philosophy - Engineering and IT

### Architecture, Building and Planning (16)

- `mc-archeng` — Master of Architectural Engineering
- `mc-archuch` — Master of Architecture/Master of Urban Cultural Heritage
- `mc-archud` — Master of Architecture/Master of Urban Design
- `mc-archup` — Master of Architecture/Master of Urban Planning
- `mc-arclarc` — Master of Architecture/Master of Landscape Architecture
- `mc-arcprop` — Master of Architecture/Master of Property
- `mc-cm` — Master of Construction Management
- `mc-cmprop` — Master of Construction Management/Master of Property
- `mc-larch` — Master of Landscape Architecture
- `mc-larchud` — Master of Landscape Architecture/Master of Urban Design
- `mc-larchup` — Master of Landscape Architecture/Master of Urban Planning
- `mc-propup` — Master of Property/Master of Urban Planning
- `mc-uch` — Master of Urban and Cultural Heritage
- `mc-upud` — Master of Urban Planning/Master of Urban Design
- `mc-urpl` — Master of Urban Planning
- `mr-philabp` — Master of Philosophy - Architecture, Building and Planning

### Arts (16)

- `038ab` — Master of Art Curatorship
- `097ab` — Master of Development Studies
- `175aa` — Master of Arts and Cultural Management
- `274ab` — Master of Criminology
- `344ab` — Master of Public Policy and Management
- `706aa` — Master of Social Policy
- `d01lf` — Master of Creative Writing, Publishing and Editing
- `mc-contcs` — Master of Contemporary Chinese Studies
- `mc-gmcom` — Master of Global Media Communication
- `mc-intjour` — Master of International Journalism
- `mc-ir` — Master of International Relations
- `mc-mktcomm` — Master of Marketing Communications
- `mc-pubcom` — Master of Publishing and Communications
- `mc-tranint` — Master of Translation and Interpreting
- `mr-artsast` — Master of Arts (Advanced Seminar & Shorter Thesis)
- `mr-artsths` — Master of Arts (Thesis only)

### Education (16)

- `960ba` — Master of Education
- `mc-app` — Master of Applied Positive Psychology
- `mc-edebt` — Master of Education in Evidence-Based Teaching
- `mc-edmo` — Master of Education
- `mc-evalo` — Master of Evaluation
- `mc-inslead` — Master of Instructional Leadership
- `mc-li` — Master of Learning Intervention
- `mc-mled` — Master of Modern Languages Education
- `mc-psyched` — Master of Psychology (Educational and Developmental)
- `mc-scl` — Master of Social Change Leadership
- `mc-tchecp` — Master of Teaching (Early Childhood and Primary)
- `mc-teachec` — Master of Teaching (Early Childhood)
- `mc-teachpr` — Master of Teaching (Primary)
- `mc-teachsa` — Master of Teaching (Secondary)
- `mc-teachsi` — Master of Teaching (Secondary) Internship
- `mr-philedu` — Master of Philosophy - Education

### Law (16)

- `192aa` — Master of International Tax
- `195aa` — Master of Construction Law
- `277aa` — Master of Intellectual Property Law
- `502cw` — Master of Laws
- `504aa` — Master of Commercial Law
- `507aa` — Master of Health and Medical Law
- `510aa` — Master of Employment and Labour Relations Law
- `511aa` — Master of Public and International Law
- `526aa` — Master of Banking and Finance Law
- `635aa` — Master of Law and Development
- `742ab` — Master of Tax
- `mc-enrslaw` — Master of Energy and Resources Law
- `mc-gcclaw` — Master of Global Competition and Consumer Law
- `mc-humrlaw` — Master of Human Rights Law
- `mc-privlaw` — Master of Private Law
- `mr-phillaw` — Master of Philosophy - Law

### Fine Arts and Music (14)

- `m04aa` — Master of Music Therapy
- `mc-cat` — Master of Creative Arts Therapy
- `mc-ctpyart` — Master of Contemporary Art
- `mc-dnce` — Master of Dance
- `mc-filmtv` — Master of Film and Television
- `mc-musop` — Master of Music (Opera Performance)
- `mc-musorp` — Master of Music (Orchestral Performance)
- `mc-muspt` — Master of Music (Performance Teaching)
- `mc-thtr` — Master of Theatre
- `mc-thtrdir` — Master of Theatre (Directing)
- `mc-thtrdra` — Master of Theatre (Dramaturgy)
- `mc-thtrwri` — Master of Theatre (Writing)
- `mr-fa` — Master of Fine Arts
- `mr-musres` — Master of Music (Research)

### Science (13)

- `872bb` — Master of Veterinary Science
- `mc-agsc` — Master of Agricultural Sciences
- `mc-ecosmc` — Master of Ecosystem Management and Conservation
- `mc-env` — Master of Environment
- `mc-foodpi` — Master of Food and Packaging Innovation
- `mc-geog` — Master of Geography
- `mc-geosc` — Master of Geoscience
- `mc-scimat` — Master of Science (Mathematics and Statistics)
- `mc-vetstdr` — Master of Veterinary Studies
- `mr-irchem` — Master of Industrial Research (Chemistry)
- `mr-philagr` — Master of Philosophy - Agricultural Sciences
- `mr-philsci` — Master of Philosophy - Science
- `mr-philvet` — Master of Philosophy - Veterinary Science

### Melbourne Business School (7)

- `294be` — Master of Marketing
- `294fn` — Master of Marketing
- `294pn` — Master of Marketing
- `mc-anamgt` — Master of Analytics Management
- `mc-ba218` — Master of Business Administration
- `mc-baol` — Master of Business Administration
- `mc-baptme` — Master of Business Administration

### (faculty unlisted) (6)

- `mc-apling` — Master of Applied Linguistics
- `mc-archcm` — Master of Architecture/Master of Construction Management
- `mc-culmc` — Master of Cultural Materials Conservation
- `mc-desprod` — Master of Design and Production
- `mc-hrmmo` — Master of Human Resource Management
- `mc-mgmtact` — Master of Management (Accounting)

## Missing live Bachelors (26)

- `b-sciextd` — Bachelor of Science (Extended)
- `bh-agr` — Bachelor of Agriculture (Degree with Honours)
- `bh-medsci` — Bachelor of Medical Science (Degree with Honours)
- `b-faacting` — Bachelor of Fine Arts (Acting)
- `b-faanim` — Bachelor of Fine Arts (Animation)
- `b-fadance` — Bachelor of Fine Arts (Dance)
- `b-fafilmtv` — Bachelor of Fine Arts (Film and Television)
- `b-fascwri` — Bachelor of Fine Arts (Screenwriting)
- `b-famusth` — Bachelor of Fine Arts (Music Theatre)
- `b-fath` — Bachelor of Fine Arts (Theatre)
- `b-favisart` — Bachelor of Fine Arts (Visual Art)
- `b-fapro` — Bachelor of Fine Arts (Production)
- `bh-com` — Bachelor of Commerce (Degree with Honours)
- `841ac` — Bachelor of Oral Health
- `bh-mus` — Bachelor of Music (Degree with Honours)
- `bh-fa` — Bachelor of Fine Arts (Degree with Honours)
- `bh-des` — Bachelor of Design (Degree with Honours)
- `bh-sciadv` — Bachelor of Science Advanced (Honours)
- `bh-arts` — Bachelor of Arts (Degree with Honours)
- `bh-bmed` — Bachelor of Biomedicine (Degree with Honours)
- `b-bmed` — Bachelor of Biomedicine
- `b-com` — Bachelor of Commerce
- `b-agr` — Bachelor of Agriculture
- `b-arts` — Bachelor of Arts
- `b-mus` — Bachelor of Music
- `bh-sci` — Bachelor of Science (Degree with Honours)

## Missing live Diplomas (5)

- `d-comp` — Diploma in Computing
- `d-genst` — Diploma in General Studies
- `d-mathsc` — Diploma in Mathematical Sciences
- `d-music` — Diploma in Music
- `d-lang` — Diploma in Languages

## Missing live other (3)

- `mc-empa` — Executive Master of Public Administration
- `mc-ema` — Executive Master of Arts
- `e-urep` — Uni Ready Enabling Program

## Notable gaps

- **Every flagship undergraduate degree except two.** `b-des` and `b-sci` are covered;
  `b-arts`, `b-com`, `b-bmed`, `b-mus`, `b-agr` and all 9 Fine Arts bachelors are not,
  nor is any honours variant (`bh-*`, 11 of them).
- **Melbourne Business School is almost untouched** — 7 missing masters including three
  separate MBA codes (`mc-ba218`, `mc-baol`, `mc-baptme`) and three Master of Marketing codes.
- **Master of Teaching (5 codes) is absent**, as is the whole Master of Commerce family (6)
  and the Master of Management family (6).
- **Engineering has 17 missing masters**, including `mc-aimo` Master of Artificial
  Intelligence, `mc-it` Master of Information Technology and `mc-softeng` Master of Software
  Engineering — disciplines central to the DFVA thesis.
- **Duplicate-name codes** are real and need a dedup policy before batch scoring: Master of
  Marketing appears as `294be`/`294fn`/`294pn`, MBA as `mc-ba218`/`mc-baol`/`mc-baptme`,
  Master of Psychiatry as `342aa`/`mc-po`.
- **`mr-*` Master of Philosophy codes (13)** are research degrees sitting in the Masters
  bucket by name; decide whether they belong in the coursework cohort at all.

## Regenerating

Re-run `scripts/handbook-course-scan.js` in the browser pane (see header comment). Crawl4AI
will not work. Machine-readable output: `data/handbook-2026-gap.json`.
