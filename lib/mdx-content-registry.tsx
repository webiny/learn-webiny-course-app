/**
 * @deprecated This file is NO LONGER USED
 *
 * MDX content is now loaded from actual .mdx files in content/lessons/ folder
 * using the dynamic loader in lib/mdx-loader.ts
 *
 * This file can be safely deleted.
 */

export const mdxContentRegistry: Record<string, string> = {
  introduction: `---
title: "Welcome to Learn Webiny"
---

# Welcome to Learn Webiny

Welcome to the Learn Webiny course! This comprehensive guide will take you from beginner to expert in building serverless applications with Webiny.

## What is Webiny?

Webiny is an open-source serverless CMS that helps developers build serverless applications and websites. Built on top of AWS, Webiny provides:

- **Headless CMS**: Manage your content with a powerful content modeling system
- **Page Builder**: Create pages visually with a drag-and-drop interface
- **File Manager**: Upload and manage media files
- **Form Builder**: Build and manage forms easily
- **Serverless Architecture**: Deploy to AWS with built-in infrastructure

<ChapterOverview 
  items={[
    { icon: "file", text: "How to set up a Webiny project" },
    { icon: "pencil", text: "Understanding Webiny's architecture" },
    { icon: "code", text: "Building with Headless CMS and Page Builder" }
  ]} 
/>

## What you'll build

Throughout this course, you'll build a fully functional serverless application that demonstrates all of Webiny's core features.

<Callout type="hint">
This course assumes you have basic knowledge of React and JavaScript. If you're new to React, we recommend going through the React Foundations course first.
</Callout>

## System requirements

Before you start this course, make sure your system meets the following requirements:

- Node.js 18.18.0 or later installed
- Operating systems: macOS, Windows (including WSL), or Linux
- An AWS account for deployment

Ready to get started? Let's dive in!`,

  "getting-started-setup": `---
title: "Setting Up Your Webiny Project"
---

# Setting Up Your Webiny Project

Learn how to create a new Webiny project and run your local development environment.

## Creating a new project

To create a new Webiny project, you'll use the Webiny CLI. First, install the CLI globally:

<CodeBlock
  language="bash"
  filename="terminal"
  code={\`npm install -g @webiny/cli

# Create a new project
webiny create my-webiny-app

# Navigate to the project
cd my-webiny-app\`}
/>

The CLI will guide you through the setup process, asking you to:

1. Choose your project template
2. Configure your AWS credentials
3. Select your deployment region

<Callout type="info">
The setup process may take a few minutes as it downloads dependencies and sets up your project structure.
</Callout>

## Project structure

After creating your project, you'll see the following structure:

<CodeBlock
  language="plaintext"
  filename="project structure"
  code={\`my-webiny-app/
├── api/              # Backend API code
├── apps/             # Frontend applications
│   ├── admin/        # Admin app
│   └── website/      # Public website
├── packages/         # Custom packages
└── webiny.config.js  # Webiny configuration\`}
/>

## Starting the development server

To start developing, you need to deploy the infrastructure first:

<CodeBlock
  language="bash"
  filename="terminal"
  code={\`# Deploy the API
yarn webiny deploy api --env=dev

# Start the admin app
yarn webiny watch admin --env=dev\`}
  highlightLines={[2]}
/>

<Callout type="warning">
The first deployment can take 15-20 minutes as it sets up all the AWS resources. Subsequent deployments will be much faster.
</Callout>

<Quiz
  question="What command is used to create a new Webiny project?"
  options={[
    { id: "a", label: "A", text: "npx create-webiny-app" },
    { id: "b", label: "B", text: "webiny new project" },
    { id: "c", label: "C", text: "webiny create my-app" },
    { id: "d", label: "D", text: "npm init webiny" }
  ]}
  correctAnswer="c"
  hint="Think about the command that uses the Webiny CLI."
  explanation="The correct command is 'webiny create' followed by your project name. This uses the Webiny CLI to scaffold a new project."
/>

Great! Your development environment is now ready. In the next lesson, we'll explore the project structure in detail.`,

  "getting-started-project-structure": `---
title: "Project Structure"
---

# Understanding the Project Structure

Let's explore the folder structure of a Webiny project and understand what each part does.

## Top-level folders

<CodeBlock
  language="plaintext"
  filename="project structure"
  code={\`my-webiny-app/
├── api/              # Backend API code
├── apps/             # Frontend applications
├── packages/         # Custom packages
├── .webiny/          # Webiny configuration
└── webiny.config.js  # Project configuration\`}
/>

### The API folder

The \`api\` folder contains all your backend code, including:

- Lambda functions
- GraphQL schemas
- Business logic
- Database models

<Callout type="hint">
All backend code is serverless and runs on AWS Lambda. You don't need to manage servers!
</Callout>

### The Apps folder

The \`apps\` folder contains your frontend applications:

- **admin**: The admin panel for managing content
- **website**: Your public-facing website

Each app is a standalone React application that can be deployed independently.

<Quiz
  question="Where should you add custom backend logic?"
  options={[
    { id: "a", label: "A", text: "In the apps folder" },
    { id: "b", label: "B", text: "In the api folder" },
    { id: "c", label: "C", text: "In the packages folder" },
    { id: "d", label: "D", text: "In the .webiny folder" }
  ]}
  correctAnswer="b"
  hint="Think about where backend code belongs."
  explanation="Custom backend logic should go in the api folder, where all Lambda functions and GraphQL resolvers live."
/>

Now that you understand the project structure, let's start building with the Headless CMS!`,

  "headless-cms-content-models": `---
title: "Creating Content Models"
---

# Creating Content Models

Learn how to create and manage content models in Webiny's Headless CMS.

## What are content models?

Content models define the structure of your content. Think of them as blueprints for your data - they specify what fields your content will have and what type of data each field can hold.

<Callout type="info">
Content models in Webiny are similar to database schemas, but they're managed through a visual interface.
</Callout>

## Creating your first content model

To create a content model:

1. Open the Webiny Admin panel
2. Navigate to **Headless CMS** > **Models**
3. Click **New Content Model**
4. Add fields by dragging them from the sidebar

<CodeBlock
  language="typescript"
  filename="Example: Blog Post Model"
  code={\`{
  "name": "Blog Post",
  "fields": [
    {
      "fieldId": "title",
      "type": "text",
      "label": "Title",
      "validation": "required"
    },
    {
      "fieldId": "content",
      "type": "rich-text",
      "label": "Content"
    },
    {
      "fieldId": "author",
      "type": "ref",
      "label": "Author"
    }
  ]
}\`}
/>

## Available field types

Webiny provides many field types:

- **Text**: Short text fields
- **Rich Text**: Long-form content with formatting
- **Number**: Numeric values
- **Boolean**: True/false values
- **Date/Time**: Date and time values
- **File**: Upload files and images
- **Reference**: Link to other content

<Quiz
  question="What field type should you use for a blog post's main content?"
  options={[
    { id: "a", label: "A", text: "Text" },
    { id: "b", label: "B", text: "Rich Text" },
    { id: "c", label: "C", text: "Long Text" },
    { id: "d", label: "D", text: "File" }
  ]}
  correctAnswer="b"
  hint="The content needs formatting support like bold, italic, and headings."
  explanation="Rich Text is the correct choice for blog content because it supports formatting, images, and other rich content elements."
/>`,

  "headless-cms-graphql-api": `---
title: "Using the GraphQL API"
---

# Using the GraphQL API

Learn how to query and mutate your content using Webiny's GraphQL API.

## Automatic API generation

When you create a content model in Webiny, the system automatically generates a GraphQL API for it. No additional configuration needed!

<Callout type="hint">
Every content model gets its own set of queries and mutations automatically.
</Callout>

## Querying content

Here's how to fetch blog posts from your API:

<CodeBlock
  language="graphql"
  filename="Query: List Blog Posts"
  code={\`query ListBlogPosts {
  listBlogPosts {
    data {
      id
      title
      content
      createdOn
      author {
        name
      }
    }
  }
}\`}
/>

## Creating content

To create new content, use a mutation:

<CodeBlock
  language="graphql"
  filename="Mutation: Create Blog Post"
  code={\`mutation CreateBlogPost {
  createBlogPost(
    data: {
      title: "My First Post"
      content: "This is the content..."
      author: "author-id-here"
    }
  ) {
    id
    title
  }
}\`}
/>

## Using the API in React

Here's how to fetch data in a React component:

<CodeBlock
  language="typescript"
  filename="components/BlogList.tsx"
  code={\`import { useQuery, gql } from '@apollo/client';

const LIST_POSTS = gql\\\`
  query ListBlogPosts {
    listBlogPosts {
      data {
        id
        title
      }
    }
  }
\\\`;

export function BlogList() {
  const { data, loading } = useQuery(LIST_POSTS);

  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {data.listBlogPosts.data.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}\`}
/>

<Callout type="warning">
Remember to handle loading and error states when fetching data!
</Callout>`,

  "page-builder-creating-pages": `---
title: "Creating Pages"
---

# Creating Pages

Learn how to build beautiful pages with Webiny's visual page builder.

## What is the Page Builder?

The Page Builder is a drag-and-drop editor that lets you create pages visually without writing code. It's perfect for:

- Landing pages
- Blog posts
- Product pages
- Marketing pages

<Callout type="info">
The Page Builder uses a component-based approach - you build pages by combining reusable elements.
</Callout>

## Creating your first page

To create a page:

1. Open the Webiny Admin panel
2. Navigate to **Page Builder** > **Pages**
3. Click **New Page**
4. Choose a template or start from scratch
5. Drag elements from the sidebar onto your page

## Available elements

Webiny comes with many built-in elements:

- **Heading**: Add titles and headings
- **Paragraph**: Add text content
- **Image**: Insert images
- **Button**: Add call-to-action buttons
- **Grid**: Create layouts with rows and columns
- **Form**: Embed forms

<Quiz
  question="What's the main advantage of using the Page Builder?"
  options={[
    { id: "a", label: "A", text: "It's faster than writing code" },
    { id: "b", label: "B", text: "It creates visual pages without code" },
    { id: "c", label: "C", text: "It's only for developers" },
    { id: "d", label: "D", text: "It requires GraphQL knowledge" }
  ]}
  correctAnswer="b"
  hint="Think about who can use the Page Builder."
  explanation="The main advantage is that anyone can create pages visually without writing code, making it accessible to non-developers."
/>`,

  "page-builder-custom-elements": `---
title: "Custom Page Elements"
---

# Custom Page Elements

Learn how to create custom page elements for Webiny's Page Builder.

## Why create custom elements?

While Webiny provides many built-in elements, you might need custom functionality specific to your application. Custom elements allow you to extend the Page Builder with your own components.

<Callout type="hint">
Custom elements are React components that can be used in the Page Builder's drag-and-drop interface.
</Callout>

## Creating a custom element

Here's how to create a custom "Pricing Card" element:

<CodeBlock
  language="typescript"
  filename="elements/PricingCard/PricingCard.tsx"
  code={\`import React from 'react';
import { PbEditorElement } from '@webiny/app-page-builder/types';

interface PricingCardProps {
  title: string;
  price: number;
  features: string[];
}

export const PricingCard: PbEditorElement<PricingCardProps> = ({
  title,
  price,
  features
}) => {
  return (
    <div className="pricing-card">
      <h3>{title}</h3>
      <p className="price">$\${price}/mo</p>
      <ul>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <button>Choose Plan</button>
    </div>
  );
};\`}
/>

## Registering the element

Next, register your element with the Page Builder:

<CodeBlock
  language="typescript"
  filename="elements/PricingCard/index.tsx"
  code={\`import { PbEditorPageElementPlugin } from '@webiny/app-page-builder/types';
import { PricingCard } from './PricingCard';

export default (): PbEditorPageElementPlugin => ({
  name: 'pb-editor-element-pricing-card',
  type: 'pb-editor-page-element',
  elementType: 'pricing-card',
  render: PricingCard,
  settings: [
    'pb-editor-page-element-settings-delete',
    'pb-editor-page-element-settings-height',
    'pb-editor-page-element-settings-margin',
    'pb-editor-page-element-settings-padding'
  ]
});\`}
/>

<Callout type="info">
Once registered, your custom element will appear in the Page Builder's element sidebar.
</Callout>

Now you can use your custom element just like any built-in element!`,

  "serverless-architecture": `---
title: "Understanding the Architecture"
---

# Understanding the Architecture

Learn about Webiny's serverless architecture and how it works on AWS.

## What is serverless?

Serverless doesn't mean there are no servers - it means you don't have to manage them. AWS handles all the infrastructure, and you only pay for what you use.

<Callout type="info">
Webiny applications run entirely on AWS serverless services, which means they scale automatically and you don't need to manage servers.
</Callout>

## Core AWS services

Webiny uses these AWS services:

- **Lambda**: Runs your backend code
- **API Gateway**: Handles HTTP requests
- **DynamoDB**: Stores your data
- **S3**: Stores files and hosts static assets
- **CloudFront**: Delivers content globally

<CodeBlock
  language="plaintext"
  filename="Architecture Diagram"
  code={\`User Request
    ↓
CloudFront (CDN)
    ↓
API Gateway
    ↓
Lambda Functions
    ↓
DynamoDB / S3\`}
/>

## Benefits of serverless

Why use serverless architecture?

- **Auto-scaling**: Handles any amount of traffic automatically
- **Cost-effective**: Pay only for what you use
- **No maintenance**: No servers to patch or manage
- **High availability**: Built-in redundancy and failover
- **Global**: Deploy close to your users worldwide

<Quiz
  question="What AWS service runs Webiny's backend code?"
  options={[
    { id: "a", label: "A", text: "EC2" },
    { id: "b", label: "B", text: "Lambda" },
    { id: "c", label: "C", text: "ECS" },
    { id: "d", label: "D", text: "DynamoDB" }
  ]}
  correctAnswer="b"
  hint="Think about the serverless compute service."
  explanation="Lambda is AWS's serverless compute service that runs code without provisioning servers. This is where all Webiny backend code executes."
/>`,

  "serverless-deployment": `---
title: "Deploying to AWS"
---

# Deploying to AWS

Learn how to deploy your Webiny application to AWS.

## Prerequisites

Before deploying, make sure you have:

1. An AWS account
2. AWS CLI installed and configured
3. Proper AWS credentials set up

<Callout type="warning">
Make sure your AWS credentials have sufficient permissions to create resources like Lambda functions, API Gateway, and DynamoDB tables.
</Callout>

## Deployment commands

Webiny provides simple commands for deployment:

<CodeBlock
  language="bash"
  filename="terminal"
  code={\`# Deploy the API (backend)
yarn webiny deploy api --env=dev

# Deploy the Admin app
yarn webiny deploy admin --env=dev

# Deploy the Website app
yarn webiny deploy website --env=dev

# Deploy everything
yarn webiny deploy --env=dev\`}
/>

## Environments

Webiny supports multiple environments:

- **dev**: Development environment
- **staging**: Pre-production testing
- **prod**: Production environment

<CodeBlock
  language="bash"
  filename="Deploy to production"
  code={\`# Deploy to production
yarn webiny deploy --env=prod\`}
/>

## Monitoring deployments

After deployment, you can:

1. View your resources in the AWS Console
2. Monitor logs in CloudWatch
3. Check API Gateway for endpoint URLs
4. View Lambda function metrics

<Callout type="hint">
The first deployment takes longer (15-20 minutes) as it creates all resources. Subsequent deployments are much faster!
</Callout>

<Quiz
  question="What's the command to deploy everything to production?"
  options={[
    { id: "a", label: "A", text: "webiny deploy prod" },
    { id: "b", label: "B", text: "yarn deploy --env=prod" },
    { id: "c", label: "C", text: "yarn webiny deploy --env=prod" },
    { id: "d", label: "D", text: "webiny deploy --production" }
  ]}
  correctAnswer="c"
  hint="Use yarn to run Webiny commands."
  explanation="The correct command is 'yarn webiny deploy --env=prod' to deploy all parts of your application to production."
/>

Congratulations! You've completed the Learn Webiny course. You now have the knowledge to build full-featured serverless applications with Webiny.`,

  "best-practices-performance": `---
title: "Performance Optimization"
---

# Performance Optimization

Learn how to optimize your Webiny applications for better performance and user experience.

<ChapterOverview
  items={[
    { icon: "file", text: "Caching strategies for content delivery." },
    { icon: "code", text: "Optimizing GraphQL queries." },
    { icon: "pencil", text: "Performance monitoring and metrics." },
  ]}
/>

## Content Caching

Webiny provides built-in caching mechanisms to improve content delivery speed:

- **CDN Integration**: Automatically cache content at edge locations
- **GraphQL Query Caching**: Cache frequent queries to reduce database load
- **Static Generation**: Pre-render pages for instant loading

<CodeBlock
  language="typescript"
  filename="api/graphql/content.ts"
  code={\`// Enable caching for content queries
export default {
  cache: {
    enabled: true,
    ttl: 3600, // 1 hour
  },
  // Your query resolvers
}\`}
/>

<Callout type="hint">
Enable CDN caching for static assets to reduce server load and improve global performance.
</Callout>

## Optimizing GraphQL Queries

Write efficient queries to minimize data transfer and processing time:

1. **Select only required fields** - Don't fetch unnecessary data
2. **Use pagination** - Limit results to manageable chunks
3. **Implement field-level caching** - Cache expensive computations

<CodeBlock
  language="graphql"
  code={\`# Good: Only fetch needed fields
query GetPosts {
  posts(limit: 10) {
    data {
      id
      title
      createdOn
    }
  }
}

# Avoid: Fetching all fields unnecessarily
query GetAllPosts {
  posts {
    data {
      *
    }
  }
}\`}
/>

## Performance Monitoring

Track and improve your application's performance:

- **Real User Monitoring (RUM)**: Track actual user experience
- **Synthetic Monitoring**: Automated performance tests
- **Core Web Vitals**: Monitor LCP, FID, and CLS metrics

<Callout type="info">
Webiny integrates with popular monitoring tools like New Relic and Datadog.
</Callout>

<Quiz
  question="What is the recommended approach for optimizing GraphQL queries in Webiny?"
  options={[
    { id: "a", label: "A", text: "Fetch all data and filter on the client" },
    { id: "b", label: "B", text: "Select only required fields and use pagination" },
    { id: "c", label: "C", text: "Always use REST instead of GraphQL" },
    { id: "d", label: "D", text: "Disable caching for real-time data" }
  ]}
  correctAnswer="b"
  explanation="Selecting only required fields and using pagination minimizes data transfer and improves query performance."
/>`,

  "best-practices-security": `---
title: "Security Best Practices"
---

# Security Best Practices

Learn how to secure your Webiny applications and protect user data.

<ChapterOverview
  items={[
    { icon: "file", text: "Authentication and authorization strategies." },
    { icon: "code", text: "Data encryption and secure storage." },
    { icon: "pencil", text: "Common security vulnerabilities to avoid." },
  ]}
/>

## Authentication & Authorization

Webiny provides a robust security framework out of the box:

- **Built-in Admin Users**: Secure admin panel access
- **API Keys**: Programmatic access control
- **JWT Tokens**: Secure session management
- **OAuth Integration**: Third-party authentication

<CodeBlock
  language="typescript"
  filename="api/security/permissions.ts"
  code={\`// Define custom permissions
export default {
  permissions: [
    {
      name: "content.post",
      operations: ["read", "write", "delete"],
      rwd: "rwd" // read, write, delete
    }
  ]
}\`}
/>

<Callout type="warning">
Never expose API keys or sensitive credentials in your frontend code. Use environment variables for server-side only.
</Callout>

## Data Encryption

Protect sensitive data at rest and in transit:

1. **HTTPS Everywhere**: Always use SSL/TLS certificates
2. **Database Encryption**: Enable encryption for data at rest
3. **Field-Level Encryption**: Encrypt sensitive fields separately
4. **Key Management**: Use AWS KMS or similar services

<Quiz
  question="Which of the following is the most important security practice for protecting data in transit?"
  options={[
    { id: "a", label: "A", text: "Use strong passwords" },
    { id: "b", label: "B", text: "Enable HTTPS with SSL/TLS certificates" },
    { id: "c", label: "C", text: "Regular database backups" },
    { id: "d", label: "D", text: "Rate limiting API requests" }
  ]}
  correctAnswer="b"
  explanation="HTTPS with SSL/TLS certificates ensures all data transmitted between client and server is encrypted and secure."
/>

## Input Validation & Sanitization

Prevent injection attacks by validating all user input:

- **GraphQL Schema Validation**: Type-safe inputs
- **Custom Validators**: Business logic validation
- **Sanitization**: Clean input before processing
- **Rate Limiting**: Prevent abuse

<Callout type="hint">
Webiny's GraphQL API provides built-in protection against common injection attacks through schema validation.
</Callout>`,
}
