// Certification Exam Questions
// Each exam should have 20-30 questions

export interface ExamQuestion {
  id: string
  question: string
  type: 'multiple-choice'
  options: string[]
  correctAnswer: number
}

export const examQuestions = {
  associate: [
    {
      id: 'a1',
      question: 'What is Webiny primarily described as in the course?',
      type: 'multiple-choice' as const,
      options: [
        'A static site generator only',
        'A content platform with an application framework',
        'A relational database service',
        'A frontend CSS framework'
      ],
      correctAnswer: 1,
    },
    {
      id: 'a2',
      question: 'Which prerequisite is explicitly listed as recommended before taking this course?',
      type: 'multiple-choice' as const,
      options: [
        'Deep Kubernetes expertise',
        'Rust programming experience',
        'Basic understanding of React.js',
        'Oracle database administration'
      ],
      correctAnswer: 2,
    },
    {
      id: 'a3',
      question: 'According to the course, what is a key reason Webiny was created?',
      type: 'multiple-choice' as const,
      options: [
        'To replace AWS services with on-prem servers',
        'To handle complex content management needs with flexibility and scale',
        'To focus only on blogging use-cases',
        'To eliminate the need for APIs'
      ],
      correctAnswer: 1,
    },
    {
      id: 'a4',
      question: 'Which scenario is a good fit for using Webiny?',
      type: 'multiple-choice' as const,
      options: [
        'A project requiring data ownership and infrastructure control',
        'A team with no technical resources that wants zero setup',
        'A strict on-prem-only deployment requirement',
        'A tiny static site with minimal CMS needs'
      ],
      correctAnswer: 0,
    },
    {
      id: 'a5',
      question: 'Which option best describes Webiny Community Edition?',
      type: 'multiple-choice' as const,
      options: [
        'Commercial only, closed-source license',
        'Open-source under the MIT License',
        'Available only through AWS Marketplace',
        'Limited to trial mode for 30 days'
      ],
      correctAnswer: 1,
    },
    {
      id: 'a6',
      question: 'What is one key characteristic of Webiny Enterprise Edition mentioned in the lesson?',
      type: 'multiple-choice' as const,
      options: [
        'It removes GraphQL support',
        'It is intended for enterprise-level applications with additional features and support',
        'It is only for personal hobby projects',
        'It cannot be deployed to AWS'
      ],
      correctAnswer: 1,
    },
    {
      id: 'a7',
      question: 'Which set represents the three core parts that make up Webiny?',
      type: 'multiple-choice' as const,
      options: [
        'Applications, Developer toolkit, Infrastructure',
        'Themes, Plugins, SQL migrations',
        'Hosting plans, billing, CRM',
        'Containers, VMs, physical servers'
      ],
      correctAnswer: 0,
    },
    {
      id: 'a8',
      question: 'Which statement about Webiny architecture is correct according to the lessons?',
      type: 'multiple-choice' as const,
      options: [
        'It is monolithic and hard to extend',
        'It is modular and extensible',
        'It requires direct edits to core files for customization',
        'It only supports built-in features with no extension model'
      ],
      correctAnswer: 1,
    },
    {
      id: 'a9',
      question: 'In Webiny Applications, what is the Headless CMS primarily used for?',
      type: 'multiple-choice' as const,
      options: [
        'Managing DNS records',
        'Serving only static images',
        'Creating, managing, and delivering content via GraphQL API or SDK',
        'Provisioning AWS accounts'
      ],
      correctAnswer: 2,
    },
    {
      id: 'a10',
      question: 'How does the lesson describe the Headless CMS in relation to other Webiny apps?',
      type: 'multiple-choice' as const,
      options: [
        'An optional legacy add-on',
        'The core data storage layer that other apps can rely on',
        'A replacement for all frontend applications',
        'A reporting-only subsystem'
      ],
      correctAnswer: 1,
    },
    {
      id: 'a11',
      question: 'What does the Website Builder enable content editors to do?',
      type: 'multiple-choice' as const,
      options: [
        'Manage IAM users in AWS',
        'Create and customize pages with a visual drag-and-drop editor',
        'Write backend Lambda handlers directly',
        'Run SQL queries against content tables'
      ],
      correctAnswer: 1,
    },
    {
      id: 'a12',
      question: 'Which application is dedicated to managing digital assets like images and documents?',
      type: 'multiple-choice' as const,
      options: ['Tenant Manager', 'Publishing Workflows', 'File Manager', 'Security Console'],
      correctAnswer: 2,
    },
    {
      id: 'a13',
      question: 'What is the role of Webiny Admin?',
      type: 'multiple-choice' as const,
      options: [
        'A separate third-party service outside Webiny',
        'The central interface for accessing Webiny applications, settings, and configuration',
        'A CDN used for static files only',
        'A local-only development dashboard'
      ],
      correctAnswer: 1,
    },
    {
      id: 'a14',
      question: 'Webiny Framework is described as being built with which language?',
      type: 'multiple-choice' as const,
      options: ['PHP', 'TypeScript', 'Ruby', 'C#'],
      correctAnswer: 1,
    },
    {
      id: 'a15',
      question: 'Which API style is highlighted as part of the Webiny Framework capabilities?',
      type: 'multiple-choice' as const,
      options: ['SOAP API', 'gRPC API only', 'GraphQL API', 'XML-RPC'],
      correctAnswer: 2,
    },
    {
      id: 'a16',
      question: 'What is the only infrastructure requirement listed for hosting Webiny?',
      type: 'multiple-choice' as const,
      options: [
        'A Kubernetes cluster',
        'An AWS account',
        'A self-managed PostgreSQL instance',
        'A dedicated on-prem data center'
      ],
      correctAnswer: 1,
    },
    {
      id: 'a17',
      question: 'At this point in the course, which cloud provider is supported for Webiny hosting?',
      type: 'multiple-choice' as const,
      options: ['AWS only', 'Azure only', 'GCP only', 'All major cloud providers equally'],
      correctAnswer: 0,
    },
    {
      id: 'a18',
      question: 'Which statement best captures a serverless benefit emphasized in the lessons?',
      type: 'multiple-choice' as const,
      options: [
        'You prepay for fixed server capacity',
        'You pay only for what you use',
        'You must manually scale infrastructure',
        'It requires managing physical hardware'
      ],
      correctAnswer: 1,
    },
    {
      id: 'a19',
      question: 'In Webiny multi-tenancy, what is the default tenant hierarchy?',
      type: 'multiple-choice' as const,
      options: [
        'Single tenant only',
        'Root Tenant and Child Tenants',
        'Region Tenant and Zone Tenant',
        'Organization Tenant and Workspace Tenant and Team Tenant'
      ],
      correctAnswer: 1,
    },
    {
      id: 'a20',
      question: 'What does multi-tenancy enable in Webiny?',
      type: 'multiple-choice' as const,
      options: [
        'Only one project per instance',
        'Multiple isolated projects/clients managed from one instance',
        'Shared data across all tenants by default',
        'No configuration differences between tenants'
      ],
      correctAnswer: 1,
    },
    {
      id: 'a21',
      question: 'What command is recommended to create a new Webiny project during installation?',
      type: 'multiple-choice' as const,
      options: [
        'yarn webiny init learn-webiny-course',
        'npx create-webiny-project learn-webiny-course',
        'npm create webiny@latest',
        'webiny new learn-webiny-course'
      ],
      correctAnswer: 1,
    },
    {
      id: 'a22',
      question: 'What does the installation lesson recommend as the database option for learning and experimentation?',
      type: 'multiple-choice' as const,
      options: [
        'Amazon RDS',
        'Amazon DynamoDB',
        'Amazon Aurora',
        'Amazon Redshift'
      ],
      correctAnswer: 1,
    },
    {
      id: 'a23',
      question: 'According to the installation warning, what is true about database type choice?',
      type: 'multiple-choice' as const,
      options: [
        'You can switch database type at any time without constraints',
        'Database type can only be changed by opening a support ticket',
        'You cannot change the database type later for an environment',
        'Database type changes automatically after first deploy'
      ],
      correctAnswer: 2,
    },
    {
      id: 'a24',
      question: 'Which Webiny CLI command deploys your project to AWS?',
      type: 'multiple-choice' as const,
      options: ['yarn webiny watch', 'yarn webiny info', 'yarn webiny destroy', 'yarn webiny deploy'],
      correctAnswer: 3,
    },
    {
      id: 'a25',
      question: 'Which command helps you retrieve deployment details like endpoints and the Admin URL?',
      type: 'multiple-choice' as const,
      options: ['yarn webiny info', 'yarn webiny --help', 'yarn webiny watch', 'yarn webiny login'],
      correctAnswer: 0,
    },
  ],
  professional: [
    {
      id: 'p1',
      question: 'What is the purpose of Content Model Groups in Webiny?',
      type: 'multiple-choice' as const,
      options: ['To organize related content models', 'To deploy models', 'To backup content', 'To share models between environments'],
      correctAnswer: 0,
    },
    {
      id: 'p2',
      question: 'Which field type allows for rich text editing in Webiny CMS?',
      type: 'multiple-choice' as const,
      options: ['Text', 'Long Text', 'Rich Text', 'HTML'],
      correctAnswer: 2,
    },
    {
      id: 'p3',
      question: 'How do you query content from Webiny Headless CMS?',
      type: 'multiple-choice' as const,
      options: ['REST API', 'GraphQL API', 'SQL queries', 'FTP'],
      correctAnswer: 1,
    },
    {
      id: 'p4',
      question: 'What is a Page Builder element in Webiny?',
      type: 'multiple-choice' as const,
      options: ['A database table', 'A reusable UI component', 'A deployment script', 'A user role'],
      correctAnswer: 1,
    },
    {
      id: 'p5',
      question: 'How can you extend Webiny functionality?',
      type: 'multiple-choice' as const,
      options: ['Editing core files', 'Creating plugins', 'Direct database access', 'Using FTP'],
      correctAnswer: 1,
    },
    {
      id: 'p6',
      question: 'What is the purpose of API Keys in Webiny?',
      type: 'multiple-choice' as const,
      options: ['To access AWS Console', 'To authenticate API requests', 'To deploy applications', 'To backup data'],
      correctAnswer: 1,
    },
    {
      id: 'p7',
      question: 'Which command deploys a Webiny project?',
      type: 'multiple-choice' as const,
      options: ['yarn deploy', 'npm run deploy', 'webiny deploy', 'aws deploy'],
      correctAnswer: 0,
    },
    {
      id: 'p8',
      question: 'What is content localization in Webiny?',
      type: 'multiple-choice' as const,
      options: ['Organizing content by location', 'Multi-language content support', 'Content versioning', 'Content backup'],
      correctAnswer: 1,
    },
    {
      id: 'p9',
      question: 'How does Webiny handle content versioning?',
      type: 'multiple-choice' as const,
      options: ['Manual backups', 'Git integration', 'Built-in revision system', 'No versioning'],
      correctAnswer: 2,
    },
    {
      id: 'p10',
      question: 'What is the purpose of Content Entry Lifecycle Hooks?',
      type: 'multiple-choice' as const,
      options: ['To delete old content', 'To run custom logic on content events', 'To backup content', 'To translate content'],
      correctAnswer: 1,
    },
    {
      id: 'p11',
      question: 'Which AWS service does Webiny use for API Gateway?',
      type: 'multiple-choice' as const,
      options: ['API Gateway', 'CloudFront', 'Route 53', 'ALB'],
      correctAnswer: 0,
    },
    {
      id: 'p12',
      question: 'How do you create custom GraphQL resolvers in Webiny?',
      type: 'multiple-choice' as const,
      options: ['Editing database directly', 'Through plugins', 'Via Admin UI', 'Using SQL'],
      correctAnswer: 1,
    },
    {
      id: 'p13',
      question: 'What is the purpose of the Security Framework in Webiny?',
      type: 'multiple-choice' as const,
      options: ['Database encryption', 'User authentication and authorization', 'Network security', 'Code obfuscation'],
      correctAnswer: 1,
    },
    {
      id: 'p14',
      question: 'How are assets optimized in Webiny?',
      type: 'multiple-choice' as const,
      options: ['Manual compression', 'CloudFront CDN', 'Local caching', 'No optimization'],
      correctAnswer: 1,
    },
    {
      id: 'p15',
      question: 'What is the purpose of Environment Variables in Webiny?',
      type: 'multiple-choice' as const,
      options: ['To store secrets and configuration', 'To deploy code', 'To backup data', 'To manage users'],
      correctAnswer: 0,
    },
    {
      id: 'p16',
      question: 'How do you implement custom page elements?',
      type: 'multiple-choice' as const,
      options: ['Editing core files', 'Creating React components and plugins', 'Using SQL', 'FTP upload'],
      correctAnswer: 1,
    },
    {
      id: 'p17',
      question: 'What is the purpose of the File Manager in Webiny?',
      type: 'multiple-choice' as const,
      options: ['To manage source code', 'To manage media assets', 'To manage databases', 'To manage servers'],
      correctAnswer: 1,
    },
    {
      id: 'p18',
      question: 'How does Webiny handle form submissions?',
      type: 'multiple-choice' as const,
      options: ['Email only', 'Stored in DynamoDB', 'Not supported', 'FTP upload'],
      correctAnswer: 1,
    },
    {
      id: 'p19',
      question: 'What is the purpose of Webiny CLI?',
      type: 'multiple-choice' as const,
      options: ['To browse websites', 'To manage and deploy Webiny projects', 'To edit databases', 'To monitor servers'],
      correctAnswer: 1,
    },
    {
      id: 'p20',
      question: 'How do you implement multi-tenancy in Webiny?',
      type: 'multiple-choice' as const,
      options: ['Separate databases', 'Tenant isolation features', 'Not supported', 'Manual configuration'],
      correctAnswer: 1,
    },
  ],
  expert: [
    {
      id: 'e1',
      question: 'What is the recommended approach for custom business logic in Webiny?',
      type: 'multiple-choice' as const,
      options: ['Modifying core code', 'Creating custom plugins', 'Direct database access', 'Using Lambda functions only'],
      correctAnswer: 1,
    },
    {
      id: 'e2',
      question: 'How should you implement caching in a Webiny application?',
      type: 'multiple-choice' as const,
      options: ['Browser cache only', 'CloudFront + API caching', 'No caching needed', 'Database caching only'],
      correctAnswer: 1,
    },
    {
      id: 'e3',
      question: 'What is the best practice for handling sensitive data in Webiny?',
      type: 'multiple-choice' as const,
      options: ['Store in code', 'Use AWS Secrets Manager', 'Environment variables only', 'Database storage'],
      correctAnswer: 1,
    },
    {
      id: 'e4',
      question: 'How do you optimize GraphQL query performance?',
      type: 'multiple-choice' as const,
      options: ['Add more servers', 'Implement DataLoader, caching, and query optimization', 'Increase timeout', 'Use REST instead'],
      correctAnswer: 1,
    },
    {
      id: 'e5',
      question: 'What is the purpose of the Webiny Telemetry system?',
      type: 'multiple-choice' as const,
      options: ['User tracking', 'Performance monitoring and error tracking', 'Content analytics', 'SEO optimization'],
      correctAnswer: 1,
    },
    {
      id: 'e6',
      question: 'How should you handle database migrations in Webiny?',
      type: 'multiple-choice' as const,
      options: ['Manual scripts', 'Through plugins and lifecycle hooks', 'Not needed', 'Direct DynamoDB access'],
      correctAnswer: 1,
    },
    {
      id: 'e7',
      question: 'What is the recommended way to implement CI/CD for Webiny?',
      type: 'multiple-choice' as const,
      options: ['Manual deployment', 'GitHub Actions/GitLab CI with Webiny CLI', 'FTP uploads', 'AWS Console only'],
      correctAnswer: 1,
    },
    {
      id: 'e8',
      question: 'How do you implement custom authentication providers?',
      type: 'multiple-choice' as const,
      options: ['Modify core auth', 'Create security plugins', 'Not possible', 'Use third-party service only'],
      correctAnswer: 1,
    },
    {
      id: 'e9',
      question: 'What is the best approach for handling high-traffic scenarios?',
      type: 'multiple-choice' as const,
      options: ['Increase Lambda memory only', 'Implement caching, CDN, and optimize queries', 'Add more databases', 'Use EC2 instead'],
      correctAnswer: 1,
    },
    {
      id: 'e10',
      question: 'How should you structure a large-scale Webiny project?',
      type: 'multiple-choice' as const,
      options: ['Single package', 'Modular architecture with custom packages', 'Monorepo only', 'Separate repositories'],
      correctAnswer: 1,
    },
    {
      id: 'e11',
      question: 'What is the purpose of the Webiny Plugin system?',
      type: 'multiple-choice' as const,
      options: ['Just for themes', 'Extensibility and customization', 'Performance optimization', 'User management'],
      correctAnswer: 1,
    },
    {
      id: 'e12',
      question: 'How do you implement custom content model validations?',
      type: 'multiple-choice' as const,
      options: ['Client-side only', 'Through lifecycle hooks and plugins', 'Not supported', 'Database constraints'],
      correctAnswer: 1,
    },
    {
      id: 'e13',
      question: 'What is the recommended approach for multi-region deployment?',
      type: 'multiple-choice' as const,
      options: ['Single region only', 'Separate Webiny instances per region', 'Not supported', 'Manual replication'],
      correctAnswer: 1,
    },
    {
      id: 'e14',
      question: 'How should you implement custom API endpoints?',
      type: 'multiple-choice' as const,
      options: ['Separate Lambda functions', 'Through API Gateway plugins', 'Not possible', 'Modify core API'],
      correctAnswer: 1,
    },
    {
      id: 'e15',
      question: 'What is the best practice for error handling in Webiny?',
      type: 'multiple-choice' as const,
      options: ['Try-catch everywhere', 'Centralized error handling with proper logging', 'Ignore errors', 'Client-side only'],
      correctAnswer: 1,
    },
    {
      id: 'e16',
      question: 'How do you implement real-time features in Webiny?',
      type: 'multiple-choice' as const,
      options: ['Not possible', 'WebSockets via API Gateway', 'Polling only', 'Long polling'],
      correctAnswer: 1,
    },
    {
      id: 'e17',
      question: 'What is the recommended approach for backup and disaster recovery?',
      type: 'multiple-choice' as const,
      options: ['No backups needed', 'DynamoDB backups, S3 versioning, and infrastructure as code', 'Manual backups only', 'Database dumps'],
      correctAnswer: 1,
    },
    {
      id: 'e18',
      question: 'How should you implement content workflows in Webiny?',
      type: 'multiple-choice' as const,
      options: ['Manual process', 'Custom lifecycle hooks and approval systems', 'Not supported', 'Email-based'],
      correctAnswer: 1,
    },
    {
      id: 'e19',
      question: 'What is the best practice for monitoring Webiny applications?',
      type: 'multiple-choice' as const,
      options: ['No monitoring needed', 'CloudWatch, X-Ray, and custom metrics', 'Logs only', 'Third-party only'],
      correctAnswer: 1,
    },
    {
      id: 'e20',
      question: 'How do you optimize cold start times in Webiny?',
      type: 'multiple-choice' as const,
      options: ['Increase memory only', 'Provisioned concurrency, code optimization, and proper packaging', 'Not possible', 'Use containers'],
      correctAnswer: 1,
    },
  ],
}

