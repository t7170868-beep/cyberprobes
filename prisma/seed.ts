import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clean the database
  await prisma.courseMaterial.deleteMany();
  await prisma.course.deleteMany();
  await prisma.video.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@cyberprobes.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log(`Created admin user: ${admin.email}`);

  // Create regular user
  const userPassword = await bcrypt.hash('user123', 10);
  const user = await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'user@cyberprobes.com',
      password: userPassword,
      role: 'USER',
    },
  });
  console.log(`Created regular user: ${user.email}`);

  // Create blogs
  const blogs = await Promise.all([
    prisma.blog.create({
      data: {
        title: 'How to Handle a Ransomware Breach: A Step-by-Step Guide',
        content: `Ransomware attacks have become one of the most significant threats to organizations worldwide. When faced with a ransomware incident, quick and decisive action is crucial to minimize damage and ensure business continuity.

## Immediate Response Steps

1. **Isolate Affected Systems**: Immediately disconnect infected machines from the network to prevent lateral movement.

2. **Assess the Scope**: Determine which systems and data have been compromised.

3. **Activate Incident Response Team**: Notify your cybersecurity team and relevant stakeholders.

4. **Document Everything**: Maintain detailed logs of all actions taken during the incident.

## Investigation and Recovery

Our digital forensics team follows a systematic approach to ransomware investigation:

- **Evidence Preservation**: Secure forensic images of affected systems
- **Malware Analysis**: Identify the ransomware variant and attack vectors
- **Timeline Reconstruction**: Understand how the attack unfolded
- **Data Recovery**: Restore systems from clean backups when available

## Prevention Strategies

The best defense against ransomware is a comprehensive security strategy that includes:

- Regular security awareness training
- Robust backup and recovery procedures
- Network segmentation
- Endpoint detection and response (EDR) solutions
- Regular security assessments

Remember, paying the ransom is never recommended and doesn't guarantee data recovery. Instead, focus on prevention and having a solid incident response plan in place.`,
        slug: 'how-to-handle-ransomware-breach',
        image: '/images/blog-1.jpg',
        published: true,
      },
    }),
    prisma.blog.create({
      data: {
        title: 'Chain of Custody in Digital Forensics: Ensuring Evidence Integrity',
        content: `In digital forensics, maintaining a proper chain of custody is critical for ensuring that evidence is admissible in legal proceedings. This process documents who handled the evidence, when, and what actions were taken.

## What is Chain of Custody?

Chain of custody is a chronological documentation that records the sequence of custody, control, transfer, analysis, and disposition of physical or electronic evidence.

## Key Components

### 1. Documentation Requirements
- Date and time of evidence collection
- Identity of the person collecting evidence
- Description of the evidence
- Location where evidence was found
- Condition of the evidence

### 2. Evidence Handling Procedures
- **Identification**: Each piece of evidence must be uniquely identified
- **Collection**: Use forensically sound methods to collect evidence
- **Preservation**: Store evidence in a secure, controlled environment
- **Transportation**: Maintain security during evidence transfer

### 3. Digital Evidence Considerations

Digital evidence presents unique challenges:

- **Volatility**: Some digital evidence can be easily altered or destroyed
- **Volume**: Digital storage devices can contain massive amounts of data
- **Complexity**: Multiple file systems, encryption, and hidden data

## Best Practices

1. **Use Write-Blocking Tools**: Prevent accidental modification of original evidence
2. **Create Forensic Images**: Work with copies, never original evidence
3. **Calculate Hash Values**: Verify evidence integrity using MD5, SHA-1, or SHA-256
4. **Maintain Detailed Logs**: Document every action taken with the evidence
5. **Secure Storage**: Use locked, climate-controlled environments

## Legal Implications

Failure to maintain proper chain of custody can result in:
- Evidence being ruled inadmissible in court
- Compromised investigation outcomes
- Legal liability for the organization
- Damage to professional credibility

At CyberProbes, we follow strict chain of custody procedures to ensure that all digital evidence we handle meets the highest legal and professional standards.`,
        slug: 'chain-of-custody-digital-forensics',
        image: '/images/blog-2.jpg',
        published: true,
      },
    }),
    prisma.blog.create({
      data: {
        title: 'Advanced Persistent Threats: Detection and Response Strategies',
        content: `Advanced Persistent Threats (APTs) represent some of the most sophisticated and dangerous cyber attacks facing organizations today. These long-term, targeted campaigns require specialized detection and response strategies.

## Understanding APTs

APTs are characterized by:
- **Advanced**: Use of sophisticated techniques and tools
- **Persistent**: Long-term presence in target networks
- **Threat**: Focused on specific objectives, often espionage or data theft

## Common APT Tactics

### Initial Access
- Spear-phishing emails with malicious attachments
- Watering hole attacks on frequently visited websites
- Supply chain compromises
- Zero-day exploits

### Persistence Mechanisms
- Registry modifications
- Scheduled tasks and services
- DLL hijacking
- Rootkit installation

### Lateral Movement
- Credential harvesting
- Pass-the-hash attacks
- Remote desktop protocol (RDP) abuse
- PowerShell and WMI exploitation

## Detection Strategies

### 1. Behavioral Analysis
Monitor for unusual patterns:
- Abnormal network traffic
- Unexpected file access patterns
- Unusual login times and locations
- Suspicious process execution

### 2. Threat Intelligence
- Indicators of Compromise (IoCs)
- Tactics, Techniques, and Procedures (TTPs)
- Attribution analysis
- Threat landscape monitoring

### 3. Advanced Monitoring Tools
- Security Information and Event Management (SIEM)
- Endpoint Detection and Response (EDR)
- Network Traffic Analysis (NTA)
- User and Entity Behavior Analytics (UEBA)

## Response Framework

### Phase 1: Detection and Analysis
1. Alert triage and validation
2. Scope assessment
3. Impact analysis
4. Evidence collection

### Phase 2: Containment and Eradication
1. Isolate affected systems
2. Remove malicious artifacts
3. Patch vulnerabilities
4. Update security controls

### Phase 3: Recovery and Lessons Learned
1. System restoration
2. Monitoring for reinfection
3. Documentation and reporting
4. Process improvement

## Prevention Best Practices

- **Zero Trust Architecture**: Never trust, always verify
- **Regular Security Assessments**: Identify vulnerabilities before attackers do
- **Employee Training**: Human factor is often the weakest link
- **Incident Response Planning**: Prepare for when, not if, an attack occurs
- **Threat Hunting**: Proactively search for threats in your environment

APT detection and response requires a combination of advanced technology, skilled analysts, and well-defined processes. Organizations should consider partnering with specialized cybersecurity firms to enhance their defensive capabilities.`,
        slug: 'advanced-persistent-threats-detection-response',
        image: '/images/blog-3.jpg',
        published: true,
      },
    }),
  ]);
  console.log(`Created ${blogs.length} blog posts`);

  // Create videos
  const videos = await Promise.all([
    prisma.video.create({
      data: {
        title: 'Introduction to Network Security',
        description: 'Learn the basics of network security and how to protect your organization from common threats.',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        published: true,
      },
    }),
    prisma.video.create({
      data: {
        title: 'Malware Analysis Techniques',
        description: 'Advanced techniques for analyzing malware and understanding how it operates.',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        published: true,
      },
    }),
  ]);
  console.log(`Created ${videos.length} videos`);

  // Create courses with modules and materials
  const course1 = await prisma.course.create({
    data: {
      title: 'Digital Forensics Fundamentals',
      description: 'Master the essential techniques of digital forensics, from evidence collection to analysis and reporting. Learn industry-standard tools and methodologies.',
      slug: 'digital-forensics-fundamentals',
      category: 'Digital Forensics',
      level: 'Beginner',
      duration: '8 Weeks',
      price: 0,
      instructor: 'Dr. Sarah Mitchell',
      instructorBio: 'Former FBI Digital Forensics Expert with 15+ years of experience in cybercrime investigation.',
      whatYoullLearn: JSON.stringify([
        'Evidence collection and preservation techniques',
        'File system analysis (NTFS, FAT, EXT)',
        'Memory forensics and volatile data analysis',
        'Network traffic analysis',
        'Mobile device forensics',
        'Report writing for legal proceedings'
      ]),
      prerequisites: JSON.stringify([
        'Basic computer literacy',
        'Understanding of file systems',
        'Basic networking concepts'
      ]),
      skillsCovered: JSON.stringify([
        'FTK Toolkit',
        'EnCase',
        'Autopsy',
        'Wireshark',
        'Volatility Framework'
      ]),
      certification: 'Certificate of Completion - Digital Forensics Fundamentals',
      published: true,
      modules: {
        create: [
          {
            title: 'Introduction to Digital Forensics',
            description: 'Overview of digital forensics principles and methodologies',
            order: 0,
            duration: '2 hours',
            materials: {
              create: [
                {
                  title: 'What is Digital Forensics?',
                  type: 'video',
                  url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  duration: '15 min',
                  order: 0
                },
                {
                  title: 'Forensic Process Overview',
                  type: 'video',
                  url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  duration: '20 min',
                  order: 1
                },
                {
                  title: 'Legal Considerations',
                  type: 'pdf',
                  url: '/documents/legal-considerations.pdf',
                  order: 2
                }
              ]
            }
          },
          {
            title: 'Evidence Collection & Preservation',
            description: 'Learn proper evidence handling and chain of custody',
            order: 1,
            duration: '3 hours',
            materials: {
              create: [
                {
                  title: 'Chain of Custody Procedures',
                  type: 'video',
                  url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  duration: '25 min',
                  order: 0
                },
                {
                  title: 'Write Blocking Techniques',
                  type: 'video',
                  url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  duration: '18 min',
                  order: 1
                }
              ]
            }
          },
          {
            title: 'File System Analysis',
            description: 'Deep dive into NTFS, FAT, and EXT file systems',
            order: 2,
            duration: '4 hours',
            materials: {
              create: [
                {
                  title: 'NTFS Structure',
                  type: 'video',
                  url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  duration: '30 min',
                  order: 0
                },
                {
                  title: 'Deleted File Recovery',
                  type: 'video',
                  url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  duration: '35 min',
                  order: 1
                }
              ]
            }
          }
        ]
      }
    }
  });

  const course2 = await prisma.course.create({
    data: {
      title: 'Advanced Ethical Hacking',
      description: 'Learn advanced penetration testing techniques, exploit development, and ethical hacking methodologies used by professional security researchers.',
      slug: 'advanced-ethical-hacking',
      category: 'Ethical Hacking',
      level: 'Expert',
      duration: '12 Weeks',
      price: 9999,
      instructor: 'Alex Rodriguez',
      instructorBio: 'CEH, OSCP certified ethical hacker with 10+ years in penetration testing.',
      whatYoullLearn: JSON.stringify([
        'Advanced penetration testing techniques',
        'Web application security',
        'Network exploitation',
        'Post-exploitation strategies',
        'Social engineering tactics',
        'Report writing and remediation advice'
      ]),
      prerequisites: JSON.stringify([
        'Strong Linux command line skills',
        'Basic networking knowledge',
        'Programming experience (Python/Bash)',
        'Understanding of TCP/IP'
      ]),
      skillsCovered: JSON.stringify([
        'Metasploit Framework',
        'Burp Suite',
        'Nmap',
        'SQLMap',
        'Social Engineering Toolkit'
      ]),
      certification: 'Advanced Ethical Hacking Professional Certificate',
      published: true,
      modules: {
        create: [
          {
            title: 'Reconnaissance & Information Gathering',
            description: 'Advanced OSINT and footprinting techniques',
            order: 0,
            duration: '3 hours',
            materials: {
              create: [
                {
                  title: 'OSINT Techniques',
                  type: 'video',
                  url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  duration: '40 min',
                  order: 0
                },
                {
                  title: 'Active vs Passive Recon',
                  type: 'video',
                  url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  duration: '35 min',
                  order: 1
                }
              ]
            }
          },
          {
            title: 'Exploitation Techniques',
            description: 'Learn to identify and exploit vulnerabilities',
            order: 1,
            duration: '5 hours',
            materials: {
              create: [
                {
                  title: 'Metasploit Mastery',
                  type: 'video',
                  url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  duration: '45 min',
                  order: 0
                },
                {
                  title: 'Custom Exploit Development',
                  type: 'video',
                  url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  duration: '60 min',
                  order: 1
                }
              ]
            }
          }
        ]
      }
    }
  });

  const course3 = await prisma.course.create({
    data: {
      title: 'Cloud Security for AWS & Azure',
      description: 'Comprehensive guide to securing cloud infrastructure on AWS and Azure. Learn cloud security best practices, compliance, and threat mitigation.',
      slug: 'cloud-security-aws-azure',
      category: 'Cloud Security',
      level: 'Intermediate',
      duration: '10 Weeks',
      price: 7999,
      instructor: 'Maria Santos',
      instructorBio: 'AWS & Azure Security Architect with enterprise cloud security experience.',
      whatYoullLearn: JSON.stringify([
        'Cloud security architecture',
        'IAM and access control',
        'Data encryption in cloud',
        'Compliance and governance',
        'Cloud security monitoring',
        'Incident response in cloud environments'
      ]),
      prerequisites: JSON.stringify([
        'Basic cloud computing knowledge',
        'Understanding of networking',
        'Familiarity with AWS or Azure'
      ]),
      skillsCovered: JSON.stringify([
        'AWS Security Services',
        'Azure Security Center',
        'CloudTrail',
        'IAM Policies',
        'Security Groups & NACLs'
      ]),
      certification: 'Cloud Security Professional Certificate',
      published: true,
      modules: {
        create: [
          {
            title: 'Cloud Security Fundamentals',
            description: 'Understanding cloud security models and shared responsibility',
            order: 0,
            duration: '2.5 hours',
            materials: {
              create: [
                {
                  title: 'Cloud Security Models',
                  type: 'video',
                  url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  duration: '30 min',
                  order: 0
                },
                {
                  title: 'Shared Responsibility Model',
                  type: 'video',
                  url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  duration: '25 min',
                  order: 1
                }
              ]
            }
          },
          {
            title: 'IAM & Access Management',
            description: 'Secure identity and access management in the cloud',
            order: 1,
            duration: '4 hours',
            materials: {
              create: [
                {
                  title: 'IAM Best Practices',
                  type: 'video',
                  url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  duration: '40 min',
                  order: 0
                },
                {
                  title: 'Multi-Factor Authentication',
                  type: 'video',
                  url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  duration: '20 min',
                  order: 1
                }
              ]
            }
          }
        ]
      }
    }
  });

  console.log(`Created 3 courses with modules and materials`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 