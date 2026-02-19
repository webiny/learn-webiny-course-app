# Archived Lessons

This folder contains lessons that have been archived and are not currently part of the course.

## Files

### understanding-different-apis.mdx (formerly order: 5)

- **Archived on:** Feb 18, 2026
- **Reason:** Course now uses SDK exclusively. This article focused on GraphQL API endpoints which are less relevant now.
- **Content:** Explains Manage, Read, and Preview APIs, their differences, and when to use each.

### webiny-api-playground.mdx (formerly order: 6)

- **Archived on:** Feb 18, 2026
- **Reason:** Course now uses SDK exclusively. API Playground article is less critical for SDK-based workflow.
- **Content:** Tutorial on using Webiny API Playground to explore GraphQL schema and test queries.

### reading-records-via-api.mdx (formerly order: 5)

- **Archived on:** Feb 18, 2026
- **Reason:** Replaced by a new SDK-focused article (`webiny-sdk.mdx`). Course now teaches SDK exclusively instead of raw GraphQL.
- **Content:** GraphQL queries in API Playground - listing, filtering, sorting, pagination, reference fields across Manage/Read/Preview APIs.

### webiny-sdk.mdx (formerly order: 5)

- **Archived on:** Feb 19, 2026
- **Reason:** Content moved to `developing-with-webiny/webiny-sdk-overview.mdx`. CMS-specific SDK usage is now demonstrated directly inside the Next.js app lessons.
- **Content:** Full `sdk.cms` reference - listEntries, getEntry, createEntry, updateEntry, publishEntry, unpublishEntry, filtering, sorting, pagination, preview mode.

## Next Steps

These articles contain good content that may be repurposed:

1. Review both articles to identify valuable content
2. Determine which concepts should be integrated into other lessons
3. Update relevant lessons with the extracted content

## Restoration

To restore these lessons:

1. Move files back to `/content/lessons/headless-cms/`
2. Update `order` values in frontmatter
3. Update order values in subsequent lessons
4. Run `npm run generate-mdx-registry`
