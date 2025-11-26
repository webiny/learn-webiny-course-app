/**
 * Chapter Quiz Questions
 * These quizzes appear after completing all lessons in a chapter
 */

export interface ChapterQuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface ChapterQuiz {
  chapterId: string
  chapterTitle: string
  passingScore: number // percentage needed to pass
  questions: ChapterQuizQuestion[]
}

export const chapterQuizzes: Record<string, ChapterQuiz> = {
  foundation: {
    chapterId: "foundation",
    chapterTitle: "Webiny Foundations",
    passingScore: 70,
    questions: [
      {
        id: "foundation-1",
        question: "What is Webiny primarily built on?",
        options: [
          "AWS serverless infrastructure",
          "Traditional server infrastructure",
          "Google Cloud Platform",
          "Microsoft Azure"
        ],
        correctAnswer: 0,
        explanation: "Webiny is built on AWS serverless infrastructure, utilizing services like Lambda, DynamoDB, and S3 for a scalable and cost-effective solution."
      },
      {
        id: "foundation-2",
        question: "Which of the following is NOT a core Webiny application?",
        options: [
          "Headless CMS",
          "Page Builder",
          "File Manager",
          "Email Marketing"
        ],
        correctAnswer: 3,
        explanation: "Webiny includes Headless CMS, Page Builder, and File Manager as core applications. Email marketing is not a built-in application."
      },
      {
        id: "foundation-3",
        question: "What architecture pattern does Webiny follow?",
        options: [
          "Monolithic architecture",
          "Microservices architecture",
          "Serverless architecture",
          "Layered architecture"
        ],
        correctAnswer: 2,
        explanation: "Webiny follows a serverless architecture pattern, which provides automatic scaling, reduced operational overhead, and pay-per-use pricing."
      },
      {
        id: "foundation-4",
        question: "What is the primary benefit of Webiny's multi-tenancy support?",
        options: [
          "Faster performance",
          "Managing multiple projects from a single installation",
          "Better SEO rankings",
          "Reduced development time"
        ],
        correctAnswer: 1,
        explanation: "Multi-tenancy allows you to manage multiple projects, clients, or environments from a single Webiny installation, improving efficiency and reducing infrastructure costs."
      },
      {
        id: "foundation-5",
        question: "Which framework is Webiny's admin interface built with?",
        options: [
          "Vue.js",
          "Angular",
          "React",
          "Svelte"
        ],
        correctAnswer: 2,
        explanation: "Webiny's admin interface is built with React, providing a modern, component-based architecture for building user interfaces."
      }
    ]
  },
  "getting-started": {
    chapterId: "getting-started",
    chapterTitle: "Getting Started",
    passingScore: 70,
    questions: [
      {
        id: "getting-started-1",
        question: "What is the recommended way to create a new Webiny project?",
        options: [
          "Git clone from repository",
          "Using the Webiny CLI with npx create-webiny-project",
          "Manual installation",
          "Docker container"
        ],
        correctAnswer: 1,
        explanation: "The recommended way is using the Webiny CLI: npx create-webiny-project my-project. This sets up everything you need with best practices."
      },
      {
        id: "getting-started-2",
        question: "What are the main folders in a Webiny project?",
        options: [
          "src, public, components",
          "apps, api, infrastructure",
          "admin, website, backend",
          "client, server, database"
        ],
        correctAnswer: 1,
        explanation: "A Webiny project contains apps/ (React applications), api/ (backend code), and infrastructure/ (AWS CDK definitions) as its main folders."
      },
      {
        id: "getting-started-3",
        question: "Where should you place images to use them in lessons?",
        options: [
          "src/images/",
          "assets/images/",
          "public/images/",
          "content/images/"
        ],
        correctAnswer: 2,
        explanation: "Images should be placed in the public/images/ folder, making them publicly accessible and optimized by Next.js."
      }
    ]
  },
  "headless-cms": {
    chapterId: "headless-cms",
    chapterTitle: "Headless CMS",
    passingScore: 70,
    questions: [
      {
        id: "headless-cms-1",
        question: "What is a content model in Webiny Headless CMS?",
        options: [
          "A database table",
          "A template for creating content entries",
          "A GraphQL schema",
          "A user interface component"
        ],
        correctAnswer: 1,
        explanation: "A content model is a template that defines the structure and fields for creating content entries, similar to a blueprint."
      },
      {
        id: "headless-cms-2",
        question: "How do you query content from Webiny Headless CMS?",
        options: [
          "REST API",
          "SQL queries",
          "GraphQL API",
          "WebSockets"
        ],
        correctAnswer: 2,
        explanation: "Webiny Headless CMS provides a GraphQL API for querying content, offering flexible and efficient data fetching."
      },
      {
        id: "headless-cms-3",
        question: "What field types are available in Webiny CMS content models?",
        options: [
          "Only text and number",
          "Text, number, boolean, date, and reference fields",
          "Only text fields",
          "Text, number, and images only"
        ],
        correctAnswer: 1,
        explanation: "Webiny CMS supports various field types including text, number, boolean, date, rich text, references to other content, and more."
      }
    ]
  },
  serverless: {
    chapterId: "serverless",
    chapterTitle: "Serverless Concepts",
    passingScore: 70,
    questions: [
      {
        id: "serverless-1",
        question: "What is the main advantage of serverless architecture?",
        options: [
          "Cheaper domain names",
          "Automatic scaling and pay-per-use pricing",
          "Faster development",
          "Better code quality"
        ],
        correctAnswer: 1,
        explanation: "Serverless architecture automatically scales based on demand and you only pay for actual compute time, reducing costs and operational overhead."
      },
      {
        id: "serverless-2",
        question: "Which AWS service does Webiny use for serverless functions?",
        options: [
          "EC2",
          "ECS",
          "Lambda",
          "Lightsail"
        ],
        correctAnswer: 2,
        explanation: "Webiny uses AWS Lambda for serverless functions, which automatically runs code in response to events without managing servers."
      },
      {
        id: "serverless-3",
        question: "What tool does Webiny use for infrastructure as code?",
        options: [
          "Terraform",
          "CloudFormation",
          "AWS CDK",
          "Pulumi"
        ],
        correctAnswer: 2,
        explanation: "Webiny uses AWS CDK (Cloud Development Kit) for infrastructure as code, allowing you to define AWS resources using TypeScript."
      }
    ]
  },
  "website-builder": {
    chapterId: "website-builder",
    chapterTitle: "Website Builder",
    passingScore: 70,
    questions: [
      {
        id: "website-builder-1",
        question: "What is the Webiny Page Builder used for?",
        options: [
          "Building backend APIs",
          "Creating and managing website pages visually",
          "Writing code",
          "Managing databases"
        ],
        correctAnswer: 1,
        explanation: "The Webiny Page Builder is a visual editor for creating and managing website pages without writing code, using drag-and-drop elements."
      },
      {
        id: "website-builder-2",
        question: "Can you create custom page elements in Webiny?",
        options: [
          "No, only predefined elements are available",
          "Yes, by creating custom React components",
          "Only with Enterprise license",
          "Only through the admin interface"
        ],
        correctAnswer: 1,
        explanation: "You can create custom page elements by building React components and registering them with the Page Builder, giving you full flexibility."
      },
      {
        id: "website-builder-3",
        question: "How are pages rendered in Webiny?",
        options: [
          "Server-side only",
          "Client-side only",
          "Pre-rendered and served from CDN",
          "On-demand rendering"
        ],
        correctAnswer: 2,
        explanation: "Webiny pre-renders pages and serves them from a CDN for optimal performance, with automatic cache invalidation when content changes."
      }
    ]
  },
  "best-practices": {
    chapterId: "best-practices",
    chapterTitle: "Best Practices",
    passingScore: 70,
    questions: [
      {
        id: "best-practices-1",
        question: "What is a recommended security practice in Webiny?",
        options: [
          "Disable all authentication",
          "Use IAM roles and policies for access control",
          "Share AWS credentials",
          "Allow public access to all resources"
        ],
        correctAnswer: 1,
        explanation: "Using IAM roles and policies ensures proper access control and follows the principle of least privilege for better security."
      },
      {
        id: "best-practices-2",
        question: "How can you optimize Webiny performance?",
        options: [
          "Add more servers",
          "Use caching strategies and CDN distribution",
          "Increase database size",
          "Disable compression"
        ],
        correctAnswer: 1,
        explanation: "Implementing caching strategies and leveraging CDN distribution significantly improves performance and reduces costs."
      },
      {
        id: "best-practices-3",
        question: "What should you do before deploying to production?",
        options: [
          "Deploy directly to production",
          "Test in a development/staging environment first",
          "Skip testing to save time",
          "Deploy during peak hours"
        ],
        correctAnswer: 1,
        explanation: "Always test thoroughly in development/staging environments before deploying to production to catch issues early and ensure stability."
      }
    ]
  }
}

/**
 * Get quiz for a specific chapter
 */
export function getChapterQuiz(chapterId: string): ChapterQuiz | null {
  return chapterQuizzes[chapterId] || null
}

/**
 * Check if a chapter has a quiz
 */
export function hasChapterQuiz(chapterId: string): boolean {
  return chapterId in chapterQuizzes
}

