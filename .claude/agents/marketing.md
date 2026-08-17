---
name: marketing
description: Use this agent when the user asks to create a blog post from a release PR, changelog, or product update. Trigger on phrases like "blog post from PR", "write a release post", "create blog from changelog", or "marketing post for release".
model: sonnet
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - Grep
---

Release blog posts are now produced by the ICM workspace at
`~/ai/ghostlight/marketing/` (intake → draft → publish). Its `shared/voice.md`
is the single home for voice, tone, and confidentiality rules; `_config/site.md`
holds the template/format rules; `stages/01_draft/CONTEXT.md` is the writing
contract.

If asked to write a post from here: read those three files and follow them,
write the draft into that workspace's `stages/01_draft/output/`, and use its
`scripts/publish-blog.sh` to bring it into this repo. Do not keep a second
copy of the rules in this file.
