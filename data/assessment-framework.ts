
import { AssessmentSection } from '../types';

export const ASSESSMENT_FRAMEWORK: AssessmentSection[] = [
  {
    id: 'companyProfile',
    title: 'Company Profile',
    description: 'Basic information about your business structure.',
    questions: [
      {
        id: 'employeeCount',
        label: 'How many employees do you have?',
        type: 'number',
        category: 'companyProfile',
        required: true,
      },
      {
        id: 'industryType',
        label: 'What is your primary industry?',
        type: 'choice',
        category: 'companyProfile',
        options: [
          { label: 'Healthcare', value: 'healthcare' },
          { label: 'Retail', value: 'retail' },
          { label: 'Manufacturing', value: 'manufacturing' },
          { label: 'Professional Services', value: 'services' },
          { label: 'Other', value: 'other' }
        ],
        required: true,
      }
    ]
  },
  {
    id: 'technology',
    title: 'Technology Stack',
    description: 'Evaluation of current digital infrastructure.',
    questions: [
      {
        id: 'cloudUsage',
        label: 'What percentage of your infrastructure is in the cloud?',
        type: 'rating',
        category: 'technology',
        hint: '0 = Fully On-Premise, 10 = Fully Cloud-Native',
        required: true,
      },
      {
        id: 'itSupport',
        label: 'Do you have dedicated IT support (Internal or MSP)?',
        type: 'choice',
        category: 'technology',
        options: [
          { label: 'Yes, full-time internal', value: 'internal', weight: 10 },
          { label: 'Yes, external MSP', value: 'msp', weight: 8 },
          { label: 'Ad-hoc / No regular support', value: 'none', weight: 2 }
        ],
        required: true,
      },
      {
        id: 'enterpriseIntegration',
        label: 'How well do your enterprise systems (ERP/CRM) communicate?',
        type: 'rating',
        category: 'technology',
        hint: 'Only relevant for mid-sized teams.',
        visibilityRule: (res) => (res.companyProfile?.employeeCount || 0) >= 10,
        required: false,
      }
    ]
  },
  {
    id: 'readiness',
    title: 'Operational Readiness',
    description: 'Capacity for change and digital transformation.',
    questions: [
      {
        id: 'changeBudget',
        label: 'Do you have a dedicated budget for digital innovation?',
        type: 'choice',
        category: 'readiness',
        options: [
          { label: 'Yes, > 5% of revenue', value: 'high', weight: 10 },
          { label: 'Yes, < 5% of revenue', value: 'med', weight: 6 },
          { label: 'No dedicated budget', value: 'none', weight: 0 }
        ],
        required: true,
      },
      {
        id: 'leadershipAlignment',
        label: 'How aligned is leadership on technology goals?',
        type: 'rating',
        category: 'readiness',
        required: true,
      }
    ]
  },
  {
    id: 'aiAutomation',
    title: 'AI & Automation',
    description: 'Current utilization and future potential for automation.',
    questions: [
      {
        id: 'currentAutomation',
        label: 'Which automation tools are currently in use?',
        type: 'multi-choice',
        category: 'aiAutomation',
        options: [
          { label: 'Zapier / Make', value: 'low-code' },
          { label: 'Custom Scripts', value: 'dev' },
          { label: 'AI Chatbots', value: 'ai' },
          { label: 'None', value: 'none' }
        ],
        required: true,
      },
      {
        id: 'dataQuality',
        label: 'Rate the quality and accessibility of your operational data.',
        type: 'rating',
        category: 'aiAutomation',
        required: true,
      }
    ]
  },
  {
    id: 'compliance',
    title: 'Compliance & Security',
    description: 'Governance and data protection measures.',
    questions: [
      {
        id: 'dataSecurity',
        label: 'Do you perform regular security audits?',
        type: 'choice',
        category: 'compliance',
        options: [
          { label: 'Monthly', value: 'high', weight: 10 },
          { label: 'Annually', value: 'med', weight: 5 },
          { label: 'Never', value: 'low', weight: 0 }
        ],
        required: true,
      },
      {
        id: 'regulatoryBurden',
        label: 'How heavily is your industry regulated?',
        type: 'choice',
        category: 'compliance',
        options: [
          { label: 'Heavy (HIPAA/GDPR/SEC)', value: 'heavy' },
          { label: 'Moderate', value: 'moderate' },
          { label: 'Light/None', value: 'light' }
        ],
        required: true,
      },
      {
        id: 'complianceDetail',
        label: 'Please specify your primary compliance frameworks.',
        type: 'text',
        category: 'compliance',
        visibilityRule: (res) => res.compliance?.regulatoryBurden === 'heavy',
        required: true,
      }
    ]
  }
];
