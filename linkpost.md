# Webiny LinkedIn Posts - Cleaned

## Post 1 - Identity Providers as Extensions

Identity providers in Webiny v6 are just extensions.

Cognito is the default, but swapping in Auth0 or Okta is basically a one-liner.

No rewiring. No deep config. Just replace the extension.

Clean, explicit, and easy to reason about 🔌 ✨

---

## Post 2 - Tenant-Level Theming

With Webiny v6, tenant-level theming is finally simple.

Branding and theme customizations now live in a clear, explicit extension — no hacks, no overrides, no digging through internals.

Logos, colors, tenant identity… all configured in one place, using real React components.

Customizing the Admin app the way it should've always been. 🎨✨

---

## Post 3 - Dedicated Audit Logs Table

In Webiny v5, audit logs lived in the same primary DynamoDB table as the rest of your data.

In v6, audit logs get their own dedicated table.

Cleaner data, less noise in the main table, and a much saner setup overall — especially as audit logs grow over time.

A small change with a big impact on data hygiene. 🧹⚡

---

## Post 4 - Easier Project Upgrades

One of the bigger wins in Webiny v6: much easier project upgrades.

The main reason? A lot of code that previously lived inside every Webiny project is now abstracted away and handled by the platform itself.

Less project-level code to maintain, fewer things that can break, and far fewer manual changes during upgrades.

Combined with a simpler structure (no monorepo, fewer packages, a single customization entry point), upgrades should finally feel low-friction. 😌

---

## Post 5 - Everything Powered by Headless CMS

One of the biggest internal wins in Webiny v6:

In v5, backend apps like Page Builder or Form Builder each had their own storage layers.

In v6, everything is powered by Headless CMS.

Fewer abstractions, less maintenance overhead, and far more consistent APIs and behavior across the platform. ⚡

---

## Post 6 - Extension Command Still Available

Good news: the `webiny extension` command isn't going anywhere in v6. 🧩

You'll still be able to easily install and set up Webiny extensions — and thanks to the overall simplifications in v6, those extensions are now much easier to understand, extend, and maintain.

Same workflow. Cleaner internals. Better DX. ⚡

---

## Post 7 - Internal Package Cleanup

Big internal cleanup in Webiny v6 🚿

We reduced the number of (now internal) @webiny/\* packages from ~160 → ~100.

One of those unsexy but important wins: less complexity, easier maintenance, and a much stronger foundation going forward. 🙂

---

## Post 8 - GitHub Actions Upgrade

Continuing from yesterday's changes — Webiny v6 also upgrades our GitHub Actions setup.

---

## Post 9 - CloudFormation Template Improvements

We've improved our CloudFormation deployment template in Webiny v6 🔧

---

## Post 10 - Simplified App Structure

With Webiny v5, each project consisted of four apps: Core, API, Admin, and Website.

[Note: Full text may be truncated in source]

---

## Post 11 - Removing Friction

Webiny v6 keeps removing unnecessary friction.

---

## Post 12 - Easier CI Testing

Testing short-lived Webiny environments in CI just got way easier.

---

## Post 13 - No More .env Files

In v5, Webiny projects relied on a root .env file for a few required configs. Since it wasn't committed to git, it could easily get lost — especially when new developers joined the project.

[Note: V6 solution likely described but may be truncated]

---

## Post 14 - Coming Soon

Shipping soon in Webiny v6 🚀

---

## Post 15 - Extensions Repository

All Webiny v6 extensions will live in one place:

GitHub - webiny/extensions: Webiny extensions.

---

## Post 16 - Observability Upgrade

🚀 Big observability upgrade coming to Webiny.

---

## Post 17 - API Development Improvements

With Webiny v5, developers could watch API changes, but each edit meant redeploying AWS Lambda functions—a slow and frustrating process.

[Note: V6 solution likely described but may be truncated]

---

## Post 18 - OpenSearch Upgrade

🚀 With Webiny v6, we're upgrading OpenSearch 2.11 → 3.3!

---

## Post 19 - Dependency Injection System

Webiny v6 finally introduces a proper DI system — @webiny/di under the hood — and it works the same across everywhere you write code and extend Webiny: its backend APIs, Admin app, CLI, and infrastructure.

---

## Post 20 - re:Invent Vibes

re:Invent vibes are starting already ⚡

---

## Post 21 - Node.js 24 Baseline

We originally aimed for Node.js 22 in Webiny v6, but after testing and cleanup, Node.js 24 will be the baseline. 😌

Node.js 24 runtime now available in AWS Lambda - Amazon Web Services

---

## Post 22 - Consolidated APIs

In Webiny v6, consolidating all developer-facing APIs into the new "webiny" package brings another big win:

[Note: Benefits likely described but may be truncated]

---

## Post 23 - No More Monorepo by Default

Webiny v5 = monorepo setup by default.

[Note: V6 change likely described but may be truncated]

---

## Post 24 - Rspack Integration

Another big upgrade in Webiny v6: Rspack. ⚡

---

## Post 25 - Modern Stack

We're building Webiny v6 on a fully modern stack. 🛠️

---

## Post 26 - Holiday Greetings

🎄 Happy Holidays from Webiny! 🎄

---

## Post 27 - Advanced Logging Controls

Long overdue, but coming with Webiny v6:

Introducing advanced logging controls for AWS Lambda functions - Amazon Web Services

---

## Post 28 - AI Best Practices

Getting predictable output from your AI is easier than you think 🤯. Establish standards, document your architecture (yes, you MUST have an architecture), attach the best code samples and test files, put it all in a markdown file, and let your AI use that as context. The output will look like it was YOU coding all day.

---

## Post 29 - Structured Logging in Frontend

Structured logging in Webiny v6 isn't just for the backend.

---

## Post 30 - CLI Output Improvements

CLI output is part of DX too.

---

## Post 31 - AWS Durable Functions

Durable Functions for AWS Lambda just went live 🎉

Build multi-step applications and AI workflows with AWS Lambda durable functions - Amazon Web Services

---

## Post 32 - Self-Hosting Importance

Why self-hosting is important. If you don't own your data, you don't own your destiny!

> "This experience has taught us that owning your data is incredibly important"

Slack is extorting us with a $195k/yr bill increase

---

## Post 33 - Flexible Database Setup

In Webiny `v6`, you can finally choose different DB setups per environment — DynamoDB-only in dev, DynamoDB+OpenSearch in prod, etc.

---

## Post 34 - DI Object Graph Visualization

A small internal experiment: visualizing parts of Webiny's DI object graph.

Most DI containers catch errors at runtime.

---

## Post 35 - Design System

Webiny v6 is coming with its own design system! ✨

@storybook/cli - Storybook

---

## Post 36 - Pulumi Secrets Improvement

Webiny v5 projects came with Pulumi secret env vars pre-generated in .env file.

[Note: V6 improvement likely described but may be truncated]

---

## Post 37 - Strict Extension Validation

A subtle but huge Webiny v6 improvement: strict extension validation! 🎉

---

## Post 38 - Backend Architecture Rewrite

Webiny v6 is getting a complete rewrite of its backend architecture. It is now powered by a Dependency Injection container, and is built with strong adherence to SOLID principles, making the system easier to extend (for external teams) and easier to maintain (for Webiny team).

GitHub - webiny/di: A professional-grade dependency injection container for TypeScript applications built with SOLID principles.

---

## Post 39 - Headless CMS Discussion

Is Headless CMS truly the future - or just another overhyped tech trend?

---

## Summary

These posts from the Webiny LinkedIn company page focus on highlighting the improvements and new features coming in Webiny v6, including:

- Architectural improvements (DI container, SOLID principles)
- Developer experience enhancements (simpler structure, easier upgrades)
- Infrastructure upgrades (Node.js 24, OpenSearch 3.3, Rspack)
- Better customization options (extensions, theming, identity providers)
- Improved deployment and development workflows
- Modern tooling and best practices

---

_Note: Some posts may have truncated content in the original HTML source. This represents the cleaned, readable content extracted from the LinkedIn feed HTML._
