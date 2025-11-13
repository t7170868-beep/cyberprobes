import type { CourseSummary } from '@/types/course';

const FALLBACK_COURSES: CourseSummary[] = [
  {
    id: 'static-cybersecurity-foundations',
    title: 'Cybersecurity Foundations',
    slug: 'cybersecurity-foundations',
    description: 'Build a rock-solid understanding of cybersecurity fundamentals, common attack vectors, and defense-in-depth strategies.',
    category: 'Cybersecurity',
    categorySlug: 'cybersecurity',
    level: 'Beginner',
    levelSlug: 'beginner',
    price: 0,
    published: true,
    duration: '4 weeks • 12 lessons',
    thumbnail: '/images/cyberthreat.jpg',
    image: '/images/cyberthreat.jpg',
    instructor: 'Dr. Maya Singh',
    instructorBio: 'Lead security architect with 12+ years of experience in enterprise threat defense and SOC leadership.',
    instructorPhoto: '/images/forensics.jpg',
    whatYoullLearn: JSON.stringify([
      'Understand the cybersecurity landscape and threat taxonomy',
      'Apply defense-in-depth and layered security principles',
      'Perform risk assessments and prioritize remediation',
      'Build an incident response playbook for common attack scenarios'
    ]),
    prerequisites: JSON.stringify([
      'Basic computer literacy',
      'Interest in cybersecurity or IT operations'
    ]),
    skillsCovered: JSON.stringify([
      'Threat modeling',
      'Security architecture',
      'Risk management',
      'Incident response planning'
    ]),
    certification: 'CyberProbes Certificate of Completion',
    modules: [
      {
        id: 'module-sec-1',
        title: 'Introduction to Cybersecurity',
        description: 'Explore the evolving threat landscape and the need for structured defense programs.',
        order: 1,
        duration: '45 minutes',
        materials: [
          {
            id: 'material-sec-1a',
            title: 'Course Kick-off & Threat Overview',
            type: 'video',
            duration: '12 min'
          },
          {
            id: 'material-sec-1b',
            title: 'Reading: History of Cyber Attacks',
            type: 'pdf'
          }
        ]
      },
      {
        id: 'module-sec-2',
        title: 'Defense-in-Depth Architecture',
        description: 'Learn how to layer controls across people, process, and technology.',
        order: 2,
        duration: '60 minutes',
        materials: [
          {
            id: 'material-sec-2a',
            title: 'Workshop: Building a Secure Network Blueprint',
            type: 'video',
            duration: '25 min'
          },
          {
            id: 'material-sec-2b',
            title: 'Checklist: Essential Security Controls',
            type: 'pdf'
          }
        ]
      }
    ],
    materials: [
      {
        id: 'top-sec-1',
        title: 'Foundations Video Series',
        type: 'video',
        duration: '90 min'
      },
      {
        id: 'top-sec-2',
        title: 'Beginner Lab Guide',
        type: 'pdf'
      }
    ]
  },
  {
    id: 'static-digital-forensics-lab',
    title: 'Digital Forensics Lab Techniques',
    slug: 'digital-forensics-lab-techniques',
    description: 'Master the tools and workflows used by professional forensic analysts to preserve, analyze, and present digital evidence.',
    category: 'Digital Forensics',
    categorySlug: 'digital-forensics',
    level: 'Intermediate',
    levelSlug: 'intermediate',
    price: 12999,
    published: true,
    duration: '6 weeks • 18 lessons',
    thumbnail: '/images/forensics.jpg',
    image: '/images/forensics.jpg',
    instructor: 'Arjun Mehta',
    instructorBio: 'Court-qualified forensic examiner with hundreds of successful investigations and testimonies.',
    instructorPhoto: '/images/incidentresponse.jpg',
    whatYoullLearn: JSON.stringify([
      'Collect and preserve volatile and non-volatile evidence',
      'Analyze disk images with industry-standard forensic suites',
      'Document findings for legal and executive audiences',
      'Automate triage workflows with scripting'
    ]),
    prerequisites: JSON.stringify([
      'Understanding of operating systems and file systems',
      'Completion of Cybersecurity Foundations or equivalent experience'
    ]),
    skillsCovered: JSON.stringify([
      'Evidence handling',
      'Disk forensics',
      'Memory analysis',
      'Chain of custody management'
    ]),
    certification: 'Advanced Digital Forensics Specialist Certificate',
    modules: [
      {
        id: 'module-df-1',
        title: 'Evidence Acquisition & Preservation',
        order: 1,
        duration: '75 minutes',
        description: 'Workflows for imaging disks, volatile memory, and cloud artifacts while maintaining integrity.',
        materials: [
          {
            id: 'material-df-1a',
            title: 'Demonstration: Live RAM Capture on Windows',
            type: 'video',
            duration: '20 min'
          },
          {
            id: 'material-df-1b',
            title: 'Checklist: Chain of Custody',
            type: 'pdf'
          }
        ]
      },
      {
        id: 'module-df-2',
        title: 'Deep Dive: Disk Image Analysis',
        order: 2,
        duration: '90 minutes',
        description: 'Hands-on lab analysing NTFS artifacts, registry hives, and browser activity timelines.',
        materials: [
          {
            id: 'material-df-2a',
            title: 'Lab Walkthrough: Timeline Reconstruction',
            type: 'video',
            duration: '35 min'
          }
        ]
      }
    ],
    materials: [
      {
        id: 'top-df-1',
        title: 'Forensics Case Workbook',
        type: 'pdf'
      },
      {
        id: 'top-df-2',
        title: 'Autopsy & FTK Tooling Cheat Sheet',
        type: 'pdf'
      }
    ]
  },
  {
    id: 'static-ethical-hacking-red-team',
    title: 'Offensive Security & Red Team Ops',
    slug: 'offensive-security-red-team-ops',
    description: 'Execute full-scope adversary simulations, from reconnaissance to post-exploitation, with professional red-team tooling.',
    category: 'Ethical Hacking',
    categorySlug: 'ethical-hacking',
    level: 'Advanced',
    levelSlug: 'advanced',
    price: 18999,
    published: true,
    duration: '8 weeks • 24 lessons',
    thumbnail: '/images/pentesting.jpg',
    image: '/images/pentesting.jpg',
    instructor: 'Natasha Rao',
    instructorBio: 'Principal offensive security engineer specialising in adversary emulation for Fortune 100 clients.',
    instructorPhoto: '/images/cyberthreat.jpg',
    whatYoullLearn: JSON.stringify([
      'Plan and execute adversary simulation engagements',
      'Bypass modern defenses with living-off-the-land techniques',
      'Build and operate C2 infrastructure safely',
      'Deliver executive-ready remediation guidance'
    ]),
    prerequisites: JSON.stringify([
      'Solid understanding of networking and Windows/Linux internals',
      'Comfort with scripting (Python/PowerShell/Bash)'
    ]),
    skillsCovered: JSON.stringify([
      'Adversary emulation',
      'Privilege escalation',
      'Post-exploitation automation',
      'Purple team reporting'
    ]),
    certification: 'CyberProbes Red Team Professional',
    modules: [
      {
        id: 'module-red-1',
        title: 'Reconnaissance & Initial Access',
        order: 1,
        duration: '80 minutes',
        description: 'Passive and active recon workflows, phishing playbooks, and web exploitation.',
        materials: [
          {
            id: 'material-red-1a',
            title: 'Playbook: Crafting High-Converting Phishing Lures',
            type: 'pdf'
          },
          {
            id: 'material-red-1b',
            title: 'Demo: External Recon Automation with Python',
            type: 'video',
            duration: '18 min'
          }
        ]
      },
      {
        id: 'module-red-2',
        title: 'Command & Control Operations',
        order: 2,
        duration: '95 minutes',
        description: 'Design resilient C2 infrastructure and manage beacons stealthily.',
        materials: [
          {
            id: 'material-red-2a',
            title: 'Lab: Cobalt Strike Alternatives',
            type: 'video',
            duration: '32 min'
          }
        ]
      }
    ],
    materials: [
      {
        id: 'top-red-1',
        title: 'Red Team Rules of Engagement Template',
        type: 'pdf'
      },
      {
        id: 'top-red-2',
        title: 'Payload Obfuscation Toolkit',
        type: 'pdf'
      }
    ]
  }
];

export default FALLBACK_COURSES;

