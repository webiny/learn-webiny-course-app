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
        question: "What license model does Webiny offer?",
        options: [
          "Only commercial license",
          "Dual-license: MIT open-source Community Edition and commercial Enterprise Edition",
          "Only open-source under GPL",
          "Freemium with paid plugins"
        ],
        correctAnswer: 1,
        explanation: "Webiny offers a dual-license model with an MIT open-source Community Edition and a commercial Enterprise Edition that includes advanced features and priority support for enterprise applications."
      },
      {
        id: "foundation-2",
        question: "What are the three core components that make up Webiny?",
        options: [
          "Frontend, Backend, and Database",
          "Applications, Developer toolkit (Webiny Framework), and Infrastructure",
          "CMS, API, and Admin Panel",
          "Client, Server, and Storage"
        ],
        correctAnswer: 1,
        explanation: "Webiny consists of three core components: Applications (like Headless CMS and Website Builder), Developer toolkit (Webiny Framework), and Infrastructure (Infrastructure as Code for AWS deployment)."
      },
      {
        id: "foundation-3",
        question: "Which application serves as the core data storage layer for Webiny?",
        options: [
          "File Manager",
          "Website Builder",
          "Headless CMS",
          "Publishing Workflows"
        ],
        correctAnswer: 2,
        explanation: "The Headless CMS serves as the core data storage layer for Webiny. Other applications, such as the Website Builder, rely on the Headless CMS to store and manage their content."
      },
      {
        id: "foundation-4",
        question: "Why does Webiny only support AWS and not other cloud providers?",
        options: [
          "AWS is cheaper than other providers",
          "To provide optimized Infrastructure as Code templates tested in production with best practices",
          "Because Webiny is owned by AWS",
          "Other cloud providers don't support serverless"
        ],
        correctAnswer: 1,
        explanation: "Webiny focuses on AWS to provide highly optimized Infrastructure as Code templates that have been tested in production, reviewed by AWS solutions architects, and validated by security teams to ensure best practices, performance, and reliability."
      },
      {
        id: "foundation-5",
        question: "In Webiny's default multi-tenancy hierarchy, what are the two layers?",
        options: [
          "Admin and User tenants",
          "Root Tenant and Child Tenants",
          "Master and Slave tenants",
          "Parent and Sibling tenants"
        ],
        correctAnswer: 1,
        explanation: "Webiny's default multi-tenancy uses a 2-layer hierarchy: Root Tenant (top-level that can manage all other tenants) and Child Tenants (individual tenants that operate independently). This hierarchy can be extended for more complex use cases."
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
        question: "What is the recommended database option for learning and experimentation with Webiny?",
        options: [
          "Amazon DynamoDB + Amazon OpenSearch",
          "Amazon DynamoDB",
          "Amazon RDS",
          "Amazon Aurora"
        ],
        correctAnswer: 1,
        explanation: "Amazon DynamoDB is a fully serverless, cost-per-usage database with a generous free tier, making it ideal for learning and experimentation without incurring costs. However, note that you cannot change the database type later, so for production projects that may scale, consider DynamoDB + OpenSearch."
      },
      {
        id: "getting-started-2",
        question: "What are the three application deployment stacks in Webiny?",
        options: [
          "Frontend, Backend, Database",
          "Core Stack, API Stack, Admin Stack",
          "Development, Staging, Production",
          "CMS, Builder, Manager"
        ],
        correctAnswer: 1,
        explanation: "Webiny consists of three application deployment stacks: Core Stack (essential services and storage), API Stack (GraphQL API and backend services), and Admin Stack (client-side admin application)."
      },
      {
        id: "getting-started-3",
        question: "In what order should you deploy Webiny stacks?",
        options: [
          "Admin Stack → API Stack → Core Stack",
          "Core Stack → API Stack → Admin Stack",
          "API Stack → Core Stack → Admin Stack",
          "Any order is fine"
        ],
        correctAnswer: 1,
        explanation: "The correct deployment order is Core Stack first (provides essential resources), then API Stack (depends on Core), and finally Admin Stack (depends on API). This ensures all dependencies are met."
      },
      {
        id: "getting-started-4",
        question: "What type of environment should you use for testing a new feature temporarily?",
        options: [
          "Production environment",
          "Long lived environment",
          "Ephemeral environment",
          "Development environment"
        ],
        correctAnswer: 2,
        explanation: "Ephemeral environments are temporary environments perfect for testing and developing new features as they can be easily created and destroyed without affecting your main environments."
      },
      {
        id: "getting-started-5",
        question: "What is the Webiny Control Panel (WCP) primarily used for?",
        options: [
          "Deploying Webiny to AWS",
          "Managing content and pages",
          "Managing projects and upgrading to paid licenses",
          "Writing code and debugging"
        ],
        correctAnswer: 2,
        explanation: "Webiny Control Panel (WCP) is used for managing Webiny projects and their associated licenses. It's the central hub for upgrading projects to paid licenses and unlocking premium features. You only need WCP for projects where you want to enable paid features."
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

