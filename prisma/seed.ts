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

  // Create course
  const course = await prisma.course.create({
    data: {
      title: 'Digital Forensics Fundamentals',
      description: 'Learn the basics of digital forensics and evidence collection.',
      slug: 'digital-forensics-fundamentals',
      published: true,
    },
  });

  // Create course materials
  const materials = await Promise.all([
    prisma.courseMaterial.create({
      data: {
        title: 'Introduction to Digital Forensics',
        type: 'VIDEO',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        courseId: course.id,
      },
    }),
    prisma.courseMaterial.create({
      data: {
        title: 'Evidence Collection Procedures',
        type: 'DOCUMENT',
        url: '/documents/evidence-collection.pdf',
        courseId: course.id,
      },
    }),
  ]);
  console.log(`Created course with ${materials.length} materials`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 