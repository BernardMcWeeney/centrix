export interface Link {
  label: string;
  href: string;
}

export interface Card {
  title: string;
  description: string;
  icon?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface UniFiLandingPageData {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  lead: string;
  primaryCta: Link;
  secondaryCta: Link;
  proofTitle?: string;
  proof: string[];
  outcomesTitle: string;
  outcomesIntro?: string;
  outcomes: Card[];
  includedTitle: string;
  includedText: string;
  includes: string[];
  fitTitle: string;
  fitText: string;
  fitItems: string[];
  process: Card[];
  faqs: FAQ[];
  related: Link[];
  serviceType: string;
}

const defaultProcess: Card[] = [
  {
    title: 'Audit',
    description: 'Centrix reviews the site, users, devices, cabling, internet, Wi-Fi pain points, camera needs, and current network risks.',
  },
  {
    title: 'Design',
    description: 'You get a practical UniFi design covering gateways, switching, access points, VLANs, guest access, cameras, and support.',
  },
  {
    title: 'Deploy',
    description: 'Centrix configures, installs, tests, secures, documents, and hands over the agreed UniFi environment.',
  },
  {
    title: 'Support',
    description: 'Ongoing support can cover monitoring, updates, configuration backups, changes, troubleshooting, and regular health checks.',
  },
];

const sharedRelated: Link[] = [
  { label: 'UniFi installer Ireland', href: '/unifi-installer-ireland' },
  { label: 'UniFi Wi-Fi installation', href: '/unifi-wifi-installation-ireland' },
  { label: 'UniFi network support', href: '/unifi-network-support-ireland' },
  { label: 'UniFi Protect CCTV', href: '/unifi-protect-cctv-ireland' },
  { label: 'UniFi network audit', href: '/unifi-network-audit' },
  { label: 'Main UniFi service', href: '/services/networking/unifi' },
];

export const unifiPages: Record<string, UniFiLandingPageData> = {
  installer: {
    metaTitle: 'UniFi Installer Ireland - Wi-Fi, CCTV, VLANs And Support',
    metaDescription:
      'Independent UniFi installer in Ireland for secure Wi-Fi, switching, gateways, VLANs, guest networks, UniFi Protect CCTV, documentation, and managed support.',
    eyebrow: 'UniFi Installer Ireland',
    heading: 'UniFi networks designed, installed and supported in Ireland.',
    lead:
      'Centrix helps Irish organisations build secure, reliable UniFi networks covering Wi-Fi, switching, gateways, guest access, VLANs, CCTV, cloud-managed infrastructure, and ongoing support.',
    primaryCta: { label: 'Book a UniFi Network Audit', href: '/contact?service=unifi-network-audit' },
    secondaryCta: { label: 'View UniFi support', href: '/unifi-network-support-ireland' },
    proofTitle: 'Centrix can cover',
    proof: [
      'UniFi network design, supply, installation, and handover',
      'Gateways, switches, access points, guest Wi-Fi, and VLANs',
      'UniFi Protect CCTV and secure remote access planning',
      'Ongoing monitoring, updates, backups, and support',
    ],
    outcomesTitle: 'A practical UniFi build, not just boxes on a quote.',
    outcomesIntro:
      'The value is in the design, configuration, documentation, and support around the hardware.',
    outcomes: [
      {
        title: 'Secure network design',
        description:
          'Staff, guest, camera, voice, IoT, and management traffic can be separated with VLANs and sensible firewall rules.',
        icon: 'shield',
      },
      {
        title: 'Reliable site coverage',
        description:
          'Access points, PoE switching, internet, cabinets, and camera positions are planned around the actual building.',
        icon: 'wifi',
      },
      {
        title: 'Managed handover',
        description:
          'Your team gets diagrams, admin access guidance, equipment notes, support options, and a clearer path for future changes.',
        icon: 'compliance',
      },
    ],
    includedTitle: 'What a Centrix UniFi project includes',
    includedText:
      'Centrix scopes the current pain, designs a right-sized UniFi stack, implements the agreed configuration, and documents the environment so it can be supported properly.',
    includes: [
      'Site requirements review and current network audit',
      'Gateway, switch, access point, camera, and recorder planning',
      'Guest Wi-Fi, staff Wi-Fi, camera, voice, IoT, and management VLANs',
      'Firewall rules, secure admin access, VPN, and cloud management review',
      'UniFi Protect CCTV planning where cameras are in scope',
      'Wireless performance, roaming, and coverage checks',
      'Network diagram, equipment list, VLAN plan, and handover notes',
      'Optional Centrix UniFi Care support after installation',
    ],
    fitTitle: 'Best fit for Irish premises that need one accountable network partner.',
    fitText:
      'Centrix is a good fit when the network now affects tills, payments, booking systems, phones, cameras, visitors, staff devices, and remote access.',
    fitItems: [
      'Small businesses and professional offices',
      'Hotels, guesthouses, cafes, and hospitality venues',
      'Churches, parishes, clubs, and community centres',
      'Retail, salons, warehouses, and mixed-use premises',
      'Sites that need Wi-Fi, CCTV, VLANs, VPN, and support together',
    ],
    process: defaultProcess,
    faqs: [
      {
        question: 'Is Centrix an official Ubiquiti distributor?',
        answer:
          'Centrix supplies, installs, configures, and supports Ubiquiti UniFi networks. We do not describe Centrix as an official or authorised Ubiquiti distributor unless that status is confirmed in writing.',
      },
      {
        question: 'Can Centrix supply the UniFi hardware?',
        answer:
          'Yes. Centrix can specify and source suitable UniFi equipment as part of a project, or work with equipment you already own if it is appropriate for the design.',
      },
      {
        question: 'Can you support an existing UniFi network?',
        answer:
          'Yes. We can audit an existing UniFi setup, fix poor Wi-Fi, tidy VLANs and firewall rules, review admin access, update documentation, and move the site onto a support plan.',
      },
    ],
    related: sharedRelated,
    serviceType: 'UniFi network design, installation and managed support',
  },
  wifi: {
    metaTitle: 'UniFi Wi-Fi Installation Ireland - Business Wireless Networks',
    metaDescription:
      'UniFi Wi-Fi installation in Ireland for business premises, guest Wi-Fi, roaming, access point placement, VLANs, testing, and ongoing wireless support.',
    eyebrow: 'UniFi Wi-Fi Installation Ireland',
    heading: 'Reliable UniFi Wi-Fi installed for Irish business premises.',
    lead:
      'Centrix designs and installs UniFi Wi-Fi for Irish organisations that need stronger coverage, cleaner roaming, guest access, secure staff networks, and support after installation.',
    primaryCta: { label: 'Book a Wi-Fi consultation', href: '/contact?service=unifi-wifi-installation' },
    secondaryCta: { label: 'View network audit', href: '/unifi-network-audit' },
    proofTitle: 'Wireless scope',
    proof: [
      'Access point placement and PoE switching plan',
      'Guest Wi-Fi, staff Wi-Fi, and VLAN separation',
      'Roaming, coverage, and performance testing',
      'Documentation and optional managed support',
    ],
    outcomesTitle: 'Wi-Fi planned around the building and the users.',
    outcomesIntro:
      'Business Wi-Fi needs more than another access point. Placement, cabling, switching, interference, density, and segmentation all matter.',
    outcomes: [
      {
        title: 'Better coverage',
        description:
          'Access points are placed around walls, floor layout, user density, dead zones, meeting spaces, tills, and visitor areas.',
        icon: 'wifi',
      },
      {
        title: 'Safer guest access',
        description:
          'Guest Wi-Fi can be isolated from staff devices, business systems, cameras, tills, and management networks.',
        icon: 'shield',
      },
      {
        title: 'Cleaner support',
        description:
          'The final Wi-Fi design is documented so future changes, passwords, users, and troubleshooting are easier to manage.',
        icon: 'settings',
      },
    ],
    includedTitle: 'What the UniFi Wi-Fi installation includes',
    includedText:
      'Centrix reviews the premises and configures UniFi wireless around the real working environment, not a generic floorplan.',
    includes: [
      'Wireless requirements call and site walkthrough',
      'Access point model and placement recommendation',
      'PoE switching and cabling readiness review',
      'Staff, guest, IoT, camera, and management SSID planning',
      'Guest portal, isolation, bandwidth, and password approach',
      'Roaming and coverage testing after installation',
      'Admin access, naming, and documentation handover',
      'Ongoing wireless troubleshooting and support option',
    ],
    fitTitle: 'Useful when Wi-Fi is now part of the customer experience.',
    fitText:
      'Poor wireless affects payments, bookings, staff devices, visitors, CCTV, handheld systems, and day-to-day trust in the premises.',
    fitItems: [
      'Offices with poor meeting-room or desk coverage',
      'Cafes, retail, salons, and hospitality guest Wi-Fi',
      'Churches, halls, and community centres with mixed users',
      'Premises with card terminals, phones, cameras, and IoT devices',
      'Sites that need separate staff and visitor networks',
    ],
    process: defaultProcess,
    faqs: [
      {
        question: 'Can UniFi fix slow business Wi-Fi?',
        answer:
          'Often, but the hardware is only one part. Centrix checks access point placement, channels, cabling, switching, internet, VLANs, interference, and client density before recommending changes.',
      },
      {
        question: 'Can visitors use Wi-Fi without reaching business systems?',
        answer:
          'Yes. Centrix can design guest Wi-Fi that is isolated from staff devices, tills, cameras, printers, management tools, and internal systems.',
      },
      {
        question: 'Can you improve an existing UniFi Wi-Fi setup?',
        answer:
          'Yes. We can audit controller settings, AP placement, firmware, SSIDs, channel planning, roaming behaviour, VLANs, and documentation.',
      },
    ],
    related: sharedRelated,
    serviceType: 'UniFi Wi-Fi installation and wireless support',
  },
  support: {
    metaTitle: 'UniFi Network Support Ireland - Managed Monitoring And Fixes',
    metaDescription:
      'Managed UniFi network support in Ireland for monitoring, firmware review, configuration backups, VLAN changes, guest Wi-Fi, CCTV access, and troubleshooting.',
    eyebrow: 'UniFi Network Support Ireland',
    heading: 'Managed UniFi support for Irish organisations.',
    lead:
      'Centrix supports UniFi networks after installation with monitoring, update planning, configuration backups, user and access changes, troubleshooting, and regular health checks.',
    primaryCta: { label: 'Ask about UniFi Care', href: '/contact?service=managed-unifi-support' },
    secondaryCta: { label: 'Book an audit first', href: '/unifi-network-audit' },
    proofTitle: 'Support can include',
    proof: [
      'Remote monitoring and health checks',
      'Firmware and configuration backup review',
      'Guest Wi-Fi, VLAN, firewall, and access changes',
      'Priority troubleshooting for Wi-Fi, cameras, VPNs, and sites',
    ],
    outcomesTitle: 'Keep the UniFi network looked after after the install.',
    outcomesIntro:
      'UniFi is easier to manage when updates, backups, admin access, alerts, and change requests are handled deliberately.',
    outcomes: [
      {
        title: 'Fewer surprises',
        description:
          'Regular checks can catch offline devices, weak links, storage concerns, outdated firmware, and configuration drift sooner.',
        icon: 'monitor',
      },
      {
        title: 'Controlled changes',
        description:
          'Guest Wi-Fi changes, VLAN updates, access permissions, and firewall tweaks can be handled with a clear support process.',
        icon: 'settings',
      },
      {
        title: 'Better continuity',
        description:
          'Configuration backups, handover notes, and health reporting make the network easier to recover, improve, and support.',
        icon: 'cloud',
      },
    ],
    includedTitle: 'What managed UniFi support can include',
    includedText:
      'Centrix UniFi Care is designed for Irish sites that need the network kept healthy without building an internal network team.',
    includes: [
      'Remote monitoring and device health review',
      'Firmware and update planning',
      'Configuration backup checks',
      'Monthly network health summary',
      'Admin and user access review',
      'Guest Wi-Fi, VLAN, firewall, and camera access changes',
      'Priority response for Wi-Fi, camera, gateway, and switch issues',
      'Annual network review and improvement plan',
    ],
    fitTitle: 'Useful when the network is now business-critical.',
    fitText:
      'Support is valuable when Wi-Fi, tills, phones, CCTV, access control, guests, or remote users depend on the UniFi environment staying stable.',
    fitItems: [
      'Small sites with 1 to 5 UniFi devices',
      'SMEs with 5 to 20 UniFi devices',
      'Multi-site organisations using UniFi gateways and switching',
      'Premises using UniFi Protect CCTV',
      'Sites with regular guest Wi-Fi or VLAN change requests',
    ],
    process: defaultProcess,
    faqs: [
      {
        question: 'Can Centrix support a UniFi network you did not install?',
        answer:
          'Yes. We normally begin with a UniFi network audit so we understand access, firmware, topology, VLANs, firewall rules, backups, and documentation before taking over support.',
      },
      {
        question: 'Do you manage firmware updates automatically?',
        answer:
          'We prefer planned update review rather than blind automatic changes. The right approach depends on the site, risk, uptime needs, and equipment involved.',
      },
      {
        question: 'Can support include small changes?',
        answer:
          'Yes. Support plans can include agreed allowances for guest Wi-Fi, VLAN, firewall, camera access, and user changes.',
      },
    ],
    related: sharedRelated,
    serviceType: 'Managed UniFi network support',
  },
  consultant: {
    metaTitle: 'Ubiquiti UniFi Consultant Ireland - Design, Audit And Rollout',
    metaDescription:
      'Independent Ubiquiti UniFi consultant in Ireland for network audits, Wi-Fi design, switching, gateways, VLANs, CCTV, rollout planning, and support.',
    eyebrow: 'Ubiquiti UniFi Consultant Ireland',
    heading: 'Independent UniFi consultancy for Irish network projects.',
    lead:
      'Centrix helps Irish organisations plan UniFi networks before buying hardware, renovating a site, replacing old Wi-Fi, adding CCTV, or standardising multiple locations.',
    primaryCta: { label: 'Book a UniFi design call', href: '/contact?service=unifi-consultant' },
    secondaryCta: { label: 'View UniFi audit', href: '/unifi-network-audit' },
    proofTitle: 'Consultancy focus',
    proof: [
      'Network audit, requirements, and design options',
      'Gateway, switch, AP, camera, and recorder planning',
      'VLAN, firewall, VPN, and guest access design',
      'Bill of materials, rollout plan, and support model',
    ],
    outcomesTitle: 'Make the UniFi decision with a clear design first.',
    outcomesIntro:
      'A short consultancy engagement can prevent overspend, underpowered hardware, messy VLANs, poor AP placement, and unsupported handover.',
    outcomes: [
      {
        title: 'Right-sized bill of materials',
        description:
          'Gateways, switches, access points, cameras, and recorders are matched to the site, device count, PoE needs, and growth plan.',
        icon: 'compliance',
      },
      {
        title: 'Network architecture',
        description:
          'VLANs, firewall rules, management access, guest Wi-Fi, cameras, voice, VPNs, and backup internet are planned together.',
        icon: 'network',
      },
      {
        title: 'Implementation roadmap',
        description:
          'The rollout can be phased around cabling, business hours, migration risk, supplier lead times, and support handover.',
        icon: 'settings',
      },
    ],
    includedTitle: 'What the UniFi consultancy engagement includes',
    includedText:
      'Centrix can act as the design and technical planning partner before hardware is purchased or a site project begins.',
    includes: [
      'Current network and requirements review',
      'Floorplan, cabinet, cabling, and internet review',
      'UniFi gateway, switch, access point, camera, and storage recommendation',
      'VLAN, guest Wi-Fi, VPN, firewall, and management design',
      'Bill of materials and procurement guidance',
      'Rollout plan, assumptions, risks, and dependencies',
      'Handover pack outline and support recommendation',
      'Optional installation and managed support quotation',
    ],
    fitTitle: 'Good before a purchase, fit-out, migration, or multi-site standardisation.',
    fitText:
      'Consultancy is useful when a wrong hardware choice or poor design would be expensive to unwind later.',
    fitItems: [
      'New office, hall, hotel, retail, or warehouse fit-out',
      'Replacing consumer Wi-Fi with managed UniFi',
      'Adding UniFi Protect cameras to an existing network',
      'Planning multiple sites or a standard branch design',
      'Independent review before approving a supplier quote',
    ],
    process: defaultProcess,
    faqs: [
      {
        question: 'Can you just review a quote before we buy?',
        answer:
          'Yes. Centrix can review a proposed UniFi bill of materials, highlight risks, and suggest changes before hardware is ordered.',
      },
      {
        question: 'Can you design the network and let another contractor install cabling?',
        answer:
          'Yes. Centrix can produce the network design and work with an electrician or cabling contractor on routes, cabinet layout, AP positions, and commissioning.',
      },
      {
        question: 'Can consultancy turn into installation?',
        answer:
          'Yes. The design work can become the basis for a Centrix installation and support proposal if you want one accountable partner.',
      },
    ],
    related: sharedRelated,
    serviceType: 'Ubiquiti UniFi consultancy and network design',
  },
  cctv: {
    metaTitle: 'UniFi Protect CCTV Ireland - Cameras, NVR And Secure Access',
    metaDescription:
      'UniFi Protect CCTV in Ireland for camera planning, installation, local recording, app access, retention planning, network separation, and support.',
    eyebrow: 'UniFi Protect CCTV Ireland',
    heading: 'UniFi Protect CCTV planned with the network around it.',
    lead:
      'Centrix designs and installs UniFi Protect camera systems for Irish premises that need clearer coverage, local recording, secure user access, network separation, and practical support.',
    primaryCta: { label: 'Book a CCTV consultation', href: '/contact?service=unifi-protect-cctv' },
    secondaryCta: { label: 'View CCTV service', href: '/services/networking/cctv-ip-cameras' },
    proofTitle: 'CCTV scope',
    proof: [
      'Camera coverage, recorder, and retention planning',
      'UniFi Protect setup with app and web access',
      'Camera VLAN and secure user roles',
      'Documentation, handover, and support',
    ],
    outcomesTitle: 'Cameras, storage, access, and network design together.',
    outcomesIntro:
      'A reliable CCTV system depends on more than cameras. PoE switching, storage, permissions, retention, privacy, and remote viewing all need thought.',
    outcomes: [
      {
        title: 'Clear coverage',
        description:
          'Camera positions are planned around entrances, exits, tills, yards, public spaces, blind spots, lighting, and privacy boundaries.',
        icon: 'camera',
      },
      {
        title: 'Secure access',
        description:
          'Approved users can receive the right level of app or web access, with camera traffic separated from normal business devices.',
        icon: 'lock',
      },
      {
        title: 'Practical compliance support',
        description:
          'Centrix can include retention, signage, access, and policy checklist prompts for your CCTV data protection responsibilities.',
        icon: 'compliance',
      },
    ],
    includedTitle: 'What the UniFi Protect CCTV project includes',
    includedText:
      'Centrix plans the camera system and the network behind it so viewing, recording, storage, and support are easier to manage.',
    includes: [
      'Camera coverage and privacy-aware placement review',
      'UniFi Protect recorder, camera, storage, and PoE planning',
      'Camera VLAN and firewall approach',
      'Mobile app and web viewer setup for approved users',
      'User roles and access permissions',
      'Recording retention and storage planning',
      'Signage, policy, access, and retention checklist prompts',
      'Documentation and optional ongoing support',
    ],
    fitTitle: 'Useful when CCTV needs to be simple for staff and controlled for the business.',
    fitText:
      'UniFi Protect can suit premises that want local recording, clear app access, and cameras integrated with the wider business network.',
    fitItems: [
      'Shops, offices, cafes, salons, and mixed-use premises',
      'Churches, parish halls, clubs, and community centres',
      'Yards, entrances, stock areas, public counters, and car parks',
      'Sites replacing older DVR/NVR systems',
      'Businesses that need secure remote viewing without CCTV complexity',
    ],
    process: defaultProcess,
    faqs: [
      {
        question: 'Can UniFi Protect replace an older CCTV system?',
        answer:
          'Often yes, but Centrix reviews existing cabling, camera positions, recording needs, PoE capacity, and network separation before recommending a replacement plan.',
      },
      {
        question: 'Can staff view cameras from phones?',
        answer:
          'Yes. App and web access can be configured for approved users, with roles matched to what each person needs to view or administer.',
      },
      {
        question: 'Do you advise on CCTV data protection?',
        answer:
          'Centrix can include practical prompts around signage, retention, access, and policy expectations, but formal legal or data protection advice should come from your own adviser where needed.',
      },
    ],
    related: sharedRelated,
    serviceType: 'UniFi Protect CCTV design and installation',
  },
  smallBusiness: {
    metaTitle: 'UniFi For Small Business Ireland - Wi-Fi, VLANs And Support',
    metaDescription:
      'UniFi for small businesses in Ireland, including secure Wi-Fi, guest networks, VLANs, switching, gateways, CCTV, documentation, and managed support.',
    eyebrow: 'UniFi For Small Business',
    heading: 'UniFi networks for small Irish businesses that need grown-up IT.',
    lead:
      'Centrix helps small businesses move from improvised Wi-Fi and unmanaged switches to a secure UniFi network with guest access, VLANs, cameras, documentation, and support.',
    primaryCta: { label: 'Book a small business audit', href: '/contact?service=unifi-small-business' },
    secondaryCta: { label: 'View UniFi installer page', href: '/unifi-installer-ireland' },
    proofTitle: 'Small business scope',
    proof: [
      'Office, retail, cafe, salon, and professional services networks',
      'Secure staff and guest Wi-Fi',
      'Tills, phones, printers, cameras, and IoT separation',
      'Managed support without hiring a network engineer',
    ],
    outcomesTitle: 'A cleaner network for everyday business systems.',
    outcomesIntro:
      'Small businesses often need the same network discipline as larger companies, just delivered in a leaner way.',
    outcomes: [
      {
        title: 'One sensible network',
        description:
          'Internet, Wi-Fi, switching, printers, tills, phones, cameras, and guest access can be planned as one supportable environment.',
        icon: 'network',
      },
      {
        title: 'Less risk from mixed devices',
        description:
          'Guest users, IoT, cameras, business systems, staff laptops, and management access can be separated where it matters.',
        icon: 'shield',
      },
      {
        title: 'Support that scales',
        description:
          'Start with a small site and keep the option to add more APs, switches, cameras, VPNs, or managed support later.',
        icon: 'settings',
      },
    ],
    includedTitle: 'What a small business UniFi setup includes',
    includedText:
      'Centrix focuses on practical reliability, secure defaults, and documentation that makes the network easier to manage.',
    includes: [
      'Current router, Wi-Fi, switch, and cabling review',
      'Gateway, switch, access point, and camera recommendation',
      'Secure staff Wi-Fi and isolated guest Wi-Fi',
      'VLANs for guest, camera, IoT, voice, and management traffic where required',
      'Remote access and admin access review',
      'Basic performance and coverage testing',
      'Handover documentation and admin guidance',
      'Optional monthly support plan',
    ],
    fitTitle: 'Ideal for small teams where the network cannot be a mystery.',
    fitText:
      'A small business network should be understandable, secure enough for real work, and easy to support when something changes.',
    fitItems: [
      'Accountants, solicitors, consultants, and professional offices',
      'Retail, cafes, salons, and local service businesses',
      'Small warehouses and mixed office units',
      'Businesses with guests, tills, printers, cameras, and phones',
      'Teams that want one partner for install and support',
    ],
    process: defaultProcess,
    faqs: [
      {
        question: 'Is UniFi suitable for a small business?',
        answer:
          'Yes, when it is sized and configured properly. UniFi can give small businesses managed Wi-Fi, switching, gateways, cameras, VLANs, and easier support without enterprise complexity.',
      },
      {
        question: 'Can Centrix start small and expand later?',
        answer:
          'Yes. A small UniFi build can begin with a gateway, PoE switch, and access points, then add cameras, VPNs, extra switches, or support as the business grows.',
      },
      {
        question: 'Can you work outside normal business hours?',
        answer:
          'For some installations, yes. We can discuss timing during scoping, especially where tills, bookings, phones, or staff work would be affected.',
      },
    ],
    related: sharedRelated,
    serviceType: 'UniFi networks for small business',
  },
  hotels: {
    metaTitle: 'UniFi For Hotels Ireland - Guest Wi-Fi, VLANs And CCTV',
    metaDescription:
      'UniFi networks for hotels, guesthouses, cafes, and hospitality in Ireland, including guest Wi-Fi, staff networks, VLANs, CCTV, coverage, and support.',
    eyebrow: 'UniFi For Hotels',
    heading: 'UniFi guest Wi-Fi, CCTV, and secure networks for hospitality.',
    lead:
      'Centrix helps hotels, guesthouses, cafes, and hospitality venues in Ireland deliver better guest Wi-Fi while separating staff systems, tills, cameras, phones, and management access.',
    primaryCta: { label: 'Book a hospitality Wi-Fi review', href: '/contact?service=unifi-hotels' },
    secondaryCta: { label: 'View Wi-Fi installation', href: '/unifi-wifi-installation-ireland' },
    proofTitle: 'Hospitality scope',
    proof: [
      'Guest Wi-Fi coverage and roaming',
      'Staff, POS, camera, voice, and guest VLAN separation',
      'UniFi Protect CCTV planning',
      'Support for busy premises and seasonal changes',
    ],
    outcomesTitle: 'Wi-Fi that supports guests without exposing the business.',
    outcomesIntro:
      'Hospitality networks have mixed users, changing occupancy, public spaces, staff systems, cameras, and payment devices to protect.',
    outcomes: [
      {
        title: 'Better guest experience',
        description:
          'Coverage is planned around bedrooms, lounges, restaurants, reception, function rooms, outdoor areas, and staff-only zones.',
        icon: 'wifi',
      },
      {
        title: 'Separated operations',
        description:
          'Guest devices can be kept away from booking systems, tills, phones, cameras, printers, staff devices, and management interfaces.',
        icon: 'shield',
      },
      {
        title: 'Supportable venue network',
        description:
          'The handover covers naming, zones, VLANs, access, support process, and future expansion across busy areas.',
        icon: 'compliance',
      },
    ],
    includedTitle: 'What the hospitality UniFi project includes',
    includedText:
      'Centrix designs UniFi around the guest journey and the operational systems that keep the venue running.',
    includes: [
      'Site walkthrough and guest-area coverage review',
      'Access point placement for bedrooms, public areas, function spaces, and staff areas',
      'Guest Wi-Fi isolation, captive portal, password, or voucher approach',
      'Staff, POS, camera, voice, IoT, and management VLAN planning',
      'UniFi Protect CCTV planning where required',
      'Performance, roaming, and peak-use considerations',
      'Documentation for support and future changes',
      'Optional Centrix UniFi Care support',
    ],
    fitTitle: 'Designed for venues where Wi-Fi is part of the service.',
    fitText:
      'Hospitality networks need to feel simple for guests and staff while staying controlled behind the scenes.',
    fitItems: [
      'Hotels and guesthouses',
      'Cafes, restaurants, pubs, and visitor venues',
      'Function rooms and event spaces',
      'Reception, outdoor, car park, and staff areas',
      'Sites that need guest Wi-Fi and CCTV together',
    ],
    process: defaultProcess,
    faqs: [
      {
        question: 'Can guests get isolated Wi-Fi?',
        answer:
          'Yes. Guest Wi-Fi can be kept separate from staff, tills, cameras, printers, and management devices, with optional portal, voucher, or password approaches.',
      },
      {
        question: 'Can UniFi support bedrooms and public areas?',
        answer:
          'Yes, with proper access point planning. Centrix reviews layout, construction, expected users, existing cabling, and high-density areas before specifying hardware.',
      },
      {
        question: 'Can you support the network after busy weekends or events?',
        answer:
          'Yes. Managed support can include monitoring, updates, guest Wi-Fi changes, troubleshooting, and periodic reviews.',
      },
    ],
    related: sharedRelated,
    serviceType: 'UniFi networks for hotels and hospitality',
  },
  churches: {
    metaTitle: 'UniFi For Churches And Community Centres Ireland',
    metaDescription:
      'UniFi Wi-Fi, guest networks, CCTV, VLANs, streaming readiness, and managed support for churches, parishes, halls, clubs, and community centres in Ireland.',
    eyebrow: 'UniFi For Churches And Community Centres',
    heading: 'UniFi networks for churches, halls, clubs, and community spaces.',
    lead:
      'Centrix helps Irish churches, parishes, clubs, and community centres build reliable UniFi Wi-Fi, guest networks, CCTV, streaming-ready connectivity, and simple support.',
    primaryCta: { label: 'Book a community site review', href: '/contact?service=unifi-churches-community' },
    secondaryCta: { label: 'View UniFi network audit', href: '/unifi-network-audit' },
    proofTitle: 'Community site scope',
    proof: [
      'Wi-Fi for offices, halls, meeting rooms, and public spaces',
      'Guest networks for visitors, volunteers, and events',
      'CCTV and secure remote viewing where appropriate',
      'Streaming, phones, payment terminals, and support planning',
    ],
    outcomesTitle: 'A network that fits mixed-use community buildings.',
    outcomesIntro:
      'Community spaces often serve staff, volunteers, visitors, event users, payment devices, cameras, streaming equipment, and tenants in the same building.',
    outcomes: [
      {
        title: 'Clear user separation',
        description:
          'Staff, volunteers, guests, tenants, cameras, payment devices, and streaming equipment can be separated where needed.',
        icon: 'users',
      },
      {
        title: 'Coverage for awkward buildings',
        description:
          'Access points can be planned around thick walls, halls, offices, meeting rooms, galleries, entrances, and external areas.',
        icon: 'wifi',
      },
      {
        title: 'Simple handover',
        description:
          'Centrix documents the setup so committee members, office staff, volunteers, and support contacts know what is in place.',
        icon: 'compliance',
      },
    ],
    includedTitle: 'What the community UniFi project includes',
    includedText:
      'Centrix keeps the design practical for organisations that need dependable infrastructure without complicated internal IT.',
    includes: [
      'Site and current network review',
      'Wi-Fi coverage plan for offices, halls, public spaces, and meeting rooms',
      'Guest, staff, volunteer, camera, streaming, and management network planning',
      'UniFi Protect CCTV review where required',
      'Streaming and payment terminal network considerations',
      'Secure admin access and handover approach',
      'Documentation for committee, staff, or trusted volunteers',
      'Optional managed support',
    ],
    fitTitle: 'A good fit for spaces used by many different groups.',
    fitText:
      'Community buildings need networks that can handle events, visitors, staff work, cameras, streaming, payments, and future changes.',
    fitItems: [
      'Churches, parishes, and parish centres',
      'Community centres, halls, and meeting spaces',
      'Sports clubs and clubhouse networks',
      'Volunteer-run organisations with limited IT time',
      'Buildings needing Wi-Fi, CCTV, guest access, and support together',
    ],
    process: defaultProcess,
    faqs: [
      {
        question: 'Can you support older or awkward buildings?',
        answer:
          'Yes. Centrix reviews construction, cable routes, power, cabinet options, and coverage needs before recommending access point placement.',
      },
      {
        question: 'Can visitors and event users get separate Wi-Fi?',
        answer:
          'Yes. Guest networks can be isolated from office systems, cameras, payment devices, streaming equipment, and management access.',
      },
      {
        question: 'Can Centrix provide ongoing support for volunteer-run sites?',
        answer:
          'Yes. Managed support can help with monitoring, updates, guest Wi-Fi changes, troubleshooting, documentation, and annual reviews.',
      },
    ],
    related: sharedRelated,
    serviceType: 'UniFi networks for churches and community centres',
  },
  audit: {
    metaTitle: 'UniFi Network Audit Ireland - Wi-Fi, VLANs, CCTV And Security',
    metaDescription:
      'UniFi network audit in Ireland for Wi-Fi coverage, gateway and switch config, VLANs, guest networks, firewall rules, admin access, CCTV, documentation, and support planning.',
    eyebrow: 'UniFi Network Audit',
    heading: 'Find out what your UniFi network is really doing.',
    lead:
      'Centrix audits UniFi networks for Irish organisations that need to understand Wi-Fi coverage, VLANs, firewall rules, admin access, CCTV, firmware, backups, documentation, and support risk.',
    primaryCta: { label: 'Book a UniFi Network Audit', href: '/contact?service=unifi-network-audit' },
    secondaryCta: { label: 'View UniFi support', href: '/unifi-network-support-ireland' },
    proofTitle: 'Audit checks',
    proof: [
      'Wi-Fi coverage, AP placement, and roaming review',
      'Gateway, switch, VLAN, firewall, and guest access checks',
      'Admin access, firmware, backups, and documentation review',
      'Prioritised fixes and support recommendation',
    ],
    outcomesTitle: 'A clear view before you spend more money.',
    outcomesIntro:
      'A UniFi audit helps separate hardware problems from design, configuration, cabling, coverage, and support issues.',
    outcomes: [
      {
        title: 'Practical findings',
        description:
          'You get a plain-English summary of what is working, what is risky, what is undocumented, and what should be fixed first.',
        icon: 'compliance',
      },
      {
        title: 'Better Wi-Fi decisions',
        description:
          'Coverage, AP placement, channels, cabling, switching, interference, and roaming are reviewed before adding more hardware.',
        icon: 'wifi',
      },
      {
        title: 'Cleaner security posture',
        description:
          'Guest access, VLANs, firewall rules, admin accounts, remote access, cameras, and backups are reviewed together.',
        icon: 'shield',
      },
    ],
    includedTitle: 'What the UniFi network audit includes',
    includedText:
      'Centrix reviews the live environment and produces a prioritised action plan that can feed into fixes, redesign, installation, or managed support.',
    includes: [
      'Controller, gateway, switch, AP, and camera inventory',
      'Wi-Fi coverage, SSID, channel, roaming, and client experience review',
      'VLAN, firewall, guest access, VPN, and management network checks',
      'Admin access, MFA, remote access, and account review',
      'Firmware, alerting, backups, and update approach review',
      'UniFi Protect camera and recording review where applicable',
      'Documentation gaps and handover risk assessment',
      'Prioritised recommendations and support plan options',
    ],
    fitTitle: 'Start here if the network is slow, messy, undocumented, or unsupported.',
    fitText:
      'An audit is the sensible first step before buying more access points, changing suppliers, adding CCTV, or moving onto managed support.',
    fitItems: [
      'Slow Wi-Fi, dropouts, roaming problems, or dead zones',
      'Unknown VLANs, firewall rules, or admin access',
      'UniFi Protect CCTV storage or access concerns',
      'No documentation after an old installation',
      'Planning a takeover, redesign, or support agreement',
    ],
    process: [
      {
        title: 'Access',
        description:
          'Centrix agrees a safe way to review the UniFi environment, site details, pain points, and any existing documentation.',
      },
      {
        title: 'Review',
        description:
          'We assess topology, devices, firmware, Wi-Fi, VLANs, firewall rules, guest access, admin roles, cameras, and backups.',
      },
      {
        title: 'Report',
        description:
          'You get clear findings, quick wins, risks, and a prioritised improvement plan for fixes, redesign, or support.',
      },
      {
        title: 'Improve',
        description:
          'Centrix can implement approved changes, quote a redesign, or move the site onto a managed UniFi support plan.',
      },
    ],
    faqs: [
      {
        question: 'Do you need admin access to audit UniFi?',
        answer:
          'Some checks require controller or site access, but the exact access method is agreed before work starts. Centrix aims to use the least access needed to complete the review properly.',
      },
      {
        question: 'Can an audit fix Wi-Fi problems immediately?',
        answer:
          'Sometimes quick wins are obvious, but the audit is mainly designed to identify root causes and prioritise safe fixes rather than guessing.',
      },
      {
        question: 'Can the audit lead into managed support?',
        answer:
          'Yes. A UniFi audit is often the best starting point before Centrix takes over support, because it identifies risks, access issues, backup gaps, and undocumented configuration.',
      },
    ],
    related: sharedRelated,
    serviceType: 'UniFi network audit',
  },
};
