# Compensation Intelligence System Research

## 1. Core Insight

Compensation should be standardized by level, not by title. Titles look comparable on the surface, but they are not stable across companies. A `Senior Engineer` at one company can map to an `L4`, `E4`, `65`, or `SWE II` equivalent elsewhere. That makes title-only salary listings hard to compare and easy to misread.

Title inflation is the main problem. Companies use different naming systems, different seniority ladders, and different HR conventions. Some flatten roles into generic titles, while others split the same work into multiple levels. The same title can also mean different scope depending on the team, geography, or org maturity. Without normalization, a salary dataset becomes a collection of loosely related entries instead of a decision system.

Levels.fyi works because it models compensation around a normalization layer. It does not just show salary numbers; it organizes them into comparable buckets using company, level, location, and compensation components. That structure makes cross-company comparison possible. Traditional salary listing platforms often succeed at collecting submissions, but fail at making them comparable. The difference is not the amount of data; it is the quality of normalization and the workflow around comparison.

## 2. Platform Analysis

### Levels.fyi

- Strengths
  - Strong level-based normalization.
  - Clear compensation breakdowns across base, bonus, and equity.
  - Good comparison-oriented UX.
  - Strong structure for cross-company analysis.
- Weaknesses
  - Better for tech and large companies than for broad market coverage.
  - Can be sparse outside common engineering ladders.
- Data quality
  - Generally high because the schema is structured and comparison-friendly.
- Filtering/search UX
  - Strong filters by company, level, location, and role scope.
- Comparison capabilities
  - Core strength; comparison is a first-class workflow.
- Structure quality
  - High. Data is readable, comparable, and decision-ready.
- Trust/reliability issues
  - Still depends on self-reported submissions, but structure makes outliers easier to detect.

### 6figr

- Strengths
  - Strong focus on salary insights and level mapping.
  - Useful compensation context for Indian tech roles.
  - Better structure than generic listing sites.
- Weaknesses
  - Coverage can be uneven across companies and roles.
  - Data depth may vary depending on the submission pool.
- Data quality
  - Moderate to good, but normalization quality can vary.
- Filtering/search UX
  - Generally useful, but the experience depends on how well level and company data are standardized.
- Comparison capabilities
  - Present, but not always as central as on Levels.fyi.
- Structure quality
  - Better than raw listing sites, but not always as rigorous as the best structured platforms.
- Trust/reliability issues
  - Like all self-reported systems, confidence drops when normalization is weak or sample size is small.

### AmbitionBox

- Strengths
  - Broad employer coverage.
  - Useful for general salary discovery and company research.
  - Often includes review context alongside salary data.
- Weaknesses
  - Salary data is often title-heavy and less normalized.
  - Comparability is weaker because roles are not always mapped consistently.
- Data quality
  - Mixed. Useful for broad signals, weaker for precise comparisons.
- Filtering/search UX
  - Adequate for browsing, but less effective for structured analysis.
- Comparison capabilities
  - Limited compared to a level-oriented platform.
- Structure quality
  - Moderate. Enough for browsing, not ideal for decision workflows.
- Trust/reliability issues
  - Review-style salary submissions can be noisy without strong normalization.

### Glassdoor

- Strengths
  - Large brand recognition and broad company coverage.
  - Easy for users to search quickly.
  - Strong general-purpose employer research surface.
- Weaknesses
  - Salary data is often hard to normalize across companies.
  - Titles and roles can be inconsistent.
  - Compensation breakdown is less decision-oriented.
- Data quality
  - Broad but uneven.
- Filtering/search UX
  - Good for discovery, weaker for structured compensation analysis.
- Comparison capabilities
  - Not the main workflow.
- Structure quality
  - Moderate. Enough for browsing, not optimized for comparison.
- Trust/reliability issues
  - Aggregated user reports are useful, but inconsistent formatting reduces precision.

### IndiaTechSalaries

- Strengths
  - Relevant regional focus.
  - Valuable for India-specific compensation expectations.
  - Often closer to the target audience than global platforms.
- Weaknesses
  - Can be less standardized than platforms built around a strict ladder model.
  - Coverage and normalization quality can vary widely.
- Data quality
  - Useful, but often uneven in structure.
- Filtering/search UX
  - Practical, but not always deeply structured.
- Comparison capabilities
  - Usually secondary to salary browsing.
- Structure quality
  - Mixed. Depends heavily on the submission schema.
- Trust/reliability issues
  - Inconsistent normalization can reduce confidence in cross-company comparisons.

## 3. Key Observations

- Structured data increases comparability.
- Levels are more meaningful than titles.
- Salary platforms often fail because of inconsistent data normalization.
- Comparison workflows matter more than raw salary listings.
- Missing bonus and stock data reduces decision quality.
- Company normalization is critical.

## 4. Product Decisions

This project focuses on server-side filtering because filtering should happen against normalized data, not raw text. That keeps the query surface consistent and reduces client-side drift.

Company normalization is required because the same company can appear as `Google`, `Google Inc.`, `Google LLC`, or similar variants. Without normalization, duplicate records and broken comparisons are unavoidable.

Total compensation calculation is a core requirement because base salary alone is not enough. Equity and bonus materially change the decision value, especially for tech compensation.

Duplicate detection is necessary because salary datasets are easy to pollute. A compensation platform needs guardrails so the same record does not appear multiple times under slightly different text.

Comparison workflows are central because users usually want an answer, not just a list. The product should help users compare one company against another, or one level against another, with minimal friction.

Structured compensation presentation is a design choice, not a UI preference. It turns salary submissions into analyzable objects with company, level, location, base, bonus, stock, and total compensation.

## 5. Tradeoffs

The project prioritizes reliability over excessive features. It is better to have fewer fields that are normalized correctly than a larger dataset that cannot be compared safely.

It avoids unnecessary complexity. The goal is not to build a generic HR marketplace or a review platform. The goal is to model compensation cleanly and make comparisons usable.

It focuses on queryability and structured workflows instead of decorative views. That makes the system more predictable, easier to validate, and easier to extend later.

It intentionally builds a clean MVP instead of overengineering. The first version should answer the core questions well: what is the compensation, how does it compare, and what does the level distribution look like.

## 6. Feature Comparison Table

| Feature | Levels.fyi | 6figr | AmbitionBox | Glassdoor | Build? |
|---|---|---|---|---|---|
| Level-based compensation | YES | YES | PARTIAL | NO | YES |
| Company normalization | YES | YES | PARTIAL | PARTIAL | YES |
| Compensation breakdown | YES | YES | PARTIAL | PARTIAL | YES |
| Comparison workflow | YES | PARTIAL | NO | NO | YES |
| Structured filtering | YES | YES | PARTIAL | PARTIAL | YES |
| Company insights | YES | PARTIAL | PARTIAL | PARTIAL | YES |
| Salary submission | YES | YES | YES | YES | YES |
| Median compensation | YES | PARTIAL | NO | NO | YES |
| Level distribution | YES | PARTIAL | NO | NO | YES |
| Duplicate handling | YES | PARTIAL | NO | NO | YES |

## 7. Final Product Direction

This is a compensation intelligence platform.

It is not a salary listing site.

The product should emphasize structured, comparable, decision-ready compensation data so users can evaluate companies and levels with a reliable model instead of relying on noisy title-based listings.
