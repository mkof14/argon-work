export type Level = "Intern" | "Junior" | "Middle" | "Senior" | "Lead" | "Head" | "Director";
export type WorkMode = "Remote" | "Hybrid" | "On-site";

export type RoleDomain =
  | "Drone Ops"
  | "Remote Control"
  | "Robotics"
  | "Monitoring"
  | "AI/ML"
  | "Data/IT"
  | "Automation"
  | "Product & PM"
  | "Field Service";

export type RoleCard = {
  id: string;
  title: string;
  domain: RoleDomain;
  level: Level;
  mode: WorkMode;
  summary: string;
  tags: string[];
};

export const domainInfo: Record<string, { title: string; description: string }> = {
  "drone-ops": {
    title: "Drone Pilots and UAV Operations",
    description: "Aerial operations, mission planning, payload handling, and safety workflows."
  },
  "remote-control": {
    title: "Remote Device Control",
    description: "Real-time teleoperation of fleets, edge devices, and autonomous systems."
  },
  robotics: {
    title: "Robotics Engineering and Operations",
    description: "Robot deployment, fleet orchestration, maintenance, and autonomy QA."
  },
  monitoring: {
    title: "Observation, Monitoring, and Analysis",
    description: "Inspection analytics, computer vision review, anomaly detection, and reporting."
  },
  "ai-ml": {
    title: "AI, ML, and Algorithmic Systems",
    description: "Model development, MLOps, LLM systems, and applied AI for industrial domains."
  },
  "data-it": {
    title: "Data and IT Infrastructure",
    description: "Telemetry pipelines, cloud platforms, security, and production reliability."
  },
  automation: {
    title: "Automation and Control Systems",
    description: "Industrial automation, PLC/SCADA integration, and digital workflow orchestration."
  },
  "product-pm": {
    title: "Project and Product Management",
    description: "Program leadership, delivery operations, product strategy, and cross-team execution."
  },
  "field-service": {
    title: "Field Service and Technical Maintenance",
    description: "Repair services, diagnostics, asset maintenance, and mission readiness support."
  }
};

export const roleDomains = Object.keys(domainInfo);
export const domainToSlug: Record<RoleDomain, string> = {
  "Drone Ops": "drone-ops",
  "Remote Control": "remote-control",
  Robotics: "robotics",
  Monitoring: "monitoring",
  "AI/ML": "ai-ml",
  "Data/IT": "data-it",
  Automation: "automation",
  "Product & PM": "product-pm",
  "Field Service": "field-service"
};

export const slugToDomain: Record<string, RoleDomain> = {
  "drone-ops": "Drone Ops",
  "remote-control": "Remote Control",
  robotics: "Robotics",
  monitoring: "Monitoring",
  "ai-ml": "AI/ML",
  "data-it": "Data/IT",
  automation: "Automation",
  "product-pm": "Product & PM",
  "field-service": "Field Service"
};

export const roles: RoleCard[] = [
  { id: "uav-intern-observer", title: "UAV Mission Observer", domain: "Drone Ops", level: "Intern", mode: "On-site", summary: "Supports mission logs, pre-flight checklists, and airspace briefings.", tags: ["UAV", "Checklist", "Safety"] },
  { id: "uav-junior-pilot", title: "Junior Drone Pilot", domain: "Drone Ops", level: "Junior", mode: "On-site", summary: "Executes supervised flights for mapping, monitoring, and inspection tasks.", tags: ["Part 107", "Flight Ops", "Mission"] },
  { id: "uav-middle-inspection", title: "Drone Inspection Pilot", domain: "Drone Ops", level: "Middle", mode: "Hybrid", summary: "Runs repeatable inspection routes for infrastructure and industrial assets.", tags: ["Inspection", "Thermal", "GIS"] },
  { id: "uav-senior-agri", title: "Senior Agro Drone Pilot", domain: "Drone Ops", level: "Senior", mode: "On-site", summary: "Leads agricultural missions, spraying plans, and crop analytics coordination.", tags: ["Agriculture", "Spraying", "NDVI"] },
  { id: "uav-lead-ops", title: "Lead UAV Operations Engineer", domain: "Drone Ops", level: "Lead", mode: "Hybrid", summary: "Builds operational standards, pilot training protocols, and mission quality controls.", tags: ["SOP", "Training", "QA"] },
  { id: "uav-head-network", title: "Head of UAV Network", domain: "Drone Ops", level: "Head", mode: "Hybrid", summary: "Owns regional flight operations and compliance across multi-site deployments.", tags: ["Compliance", "Scaling", "Operations"] },

  { id: "remote-junior-operator", title: "Remote Device Operator", domain: "Remote Control", level: "Junior", mode: "Remote", summary: "Monitors and controls edge devices via teleoperation consoles.", tags: ["Teleop", "Control Room", "IoT"] },
  { id: "remote-middle-supervisor", title: "Remote Control Shift Supervisor", domain: "Remote Control", level: "Middle", mode: "Remote", summary: "Coordinates operator shifts, escalation routines, and incident response.", tags: ["NOC", "Incidents", "Escalation"] },
  { id: "remote-senior-fleet", title: "Senior Remote Fleet Controller", domain: "Remote Control", level: "Senior", mode: "Remote", summary: "Manages distributed robotic fleets with SLA and uptime targets.", tags: ["Fleet", "SLA", "Dispatch"] },
  { id: "remote-lead-center", title: "Lead Teleoperation Center Engineer", domain: "Remote Control", level: "Lead", mode: "Hybrid", summary: "Designs teleoperation center workflows and fail-safe procedures.", tags: ["Failover", "Procedure", "Latency"] },
  { id: "remote-director", title: "Director of Remote Operations", domain: "Remote Control", level: "Director", mode: "Hybrid", summary: "Builds global remote command operations for autonomous services.", tags: ["Strategy", "Scale", "Governance"] },

  { id: "robot-junior-tech", title: "Junior Robotics Technician", domain: "Robotics", level: "Junior", mode: "On-site", summary: "Performs hardware checks, sensor calibration, and maintenance routines.", tags: ["Calibration", "Sensors", "Repair"] },
  { id: "robot-middle-operator", title: "Robotics Operations Specialist", domain: "Robotics", level: "Middle", mode: "Hybrid", summary: "Executes deployment and runtime operations for mobile robots.", tags: ["Deployment", "SLAM", "Operations"] },
  { id: "robot-senior-integrator", title: "Senior Robotics Integration Engineer", domain: "Robotics", level: "Senior", mode: "Hybrid", summary: "Integrates robot hardware with cloud control and mission software.", tags: ["ROS2", "Integration", "Edge"] },
  { id: "robot-lead-fleet", title: "Lead Robotics Fleet Engineer", domain: "Robotics", level: "Lead", mode: "Hybrid", summary: "Owns reliability and lifecycle management for enterprise robot fleets.", tags: ["Reliability", "Fleet", "Lifecycle"] },
  { id: "robot-head-autonomy", title: "Head of Robotics Autonomy", domain: "Robotics", level: "Head", mode: "Hybrid", summary: "Leads autonomy roadmap, simulation programs, and system validation.", tags: ["Autonomy", "Simulation", "Validation"] },

  { id: "monitor-junior-analyst", title: "Monitoring Analyst", domain: "Monitoring", level: "Junior", mode: "Remote", summary: "Tracks live mission feeds and flags anomalies for review.", tags: ["CV", "Alerts", "Ops Center"] },
  { id: "monitor-middle-inspector", title: "Visual Inspection Analyst", domain: "Monitoring", level: "Middle", mode: "Remote", summary: "Analyzes imagery and telemetry for defects and trend patterns.", tags: ["Image QA", "Defects", "Reports"] },
  { id: "monitor-senior-risk", title: "Senior Risk Monitoring Specialist", domain: "Monitoring", level: "Senior", mode: "Hybrid", summary: "Builds risk scoring and operational incident analytics.", tags: ["Risk", "Anomaly", "SLA"] },
  { id: "monitor-lead-command", title: "Lead Monitoring Command Manager", domain: "Monitoring", level: "Lead", mode: "Hybrid", summary: "Manages 24/7 monitoring teams and escalation standards.", tags: ["Shift Ops", "Runbooks", "SOC/NOC"] },

  { id: "ai-intern-labeling", title: "AI Data Labeling Specialist", domain: "AI/ML", level: "Intern", mode: "Remote", summary: "Creates high-quality labeled datasets for vision and NLP systems.", tags: ["Labeling", "QA", "Datasets"] },
  { id: "ai-junior-ml", title: "Junior ML Engineer", domain: "AI/ML", level: "Junior", mode: "Hybrid", summary: "Builds and evaluates baseline models with supervised pipelines.", tags: ["Python", "Sklearn", "Modeling"] },
  { id: "ai-middle-cv", title: "Computer Vision Engineer", domain: "AI/ML", level: "Middle", mode: "Hybrid", summary: "Develops vision models for inspection, tracking, and scene analysis.", tags: ["CV", "PyTorch", "Detection"] },
  { id: "ai-middle-nlp", title: "LLM Application Engineer", domain: "AI/ML", level: "Middle", mode: "Remote", summary: "Builds RAG and AI assistants for operations and decision support.", tags: ["LLM", "RAG", "Prompting"] },
  { id: "ai-senior-research", title: "Senior Applied AI Scientist", domain: "AI/ML", level: "Senior", mode: "Hybrid", summary: "Leads model design for mission-critical automation and optimization.", tags: ["Research", "Optimization", "Inference"] },
  { id: "ai-lead-mlops", title: "Lead MLOps Engineer", domain: "AI/ML", level: "Lead", mode: "Hybrid", summary: "Owns model deployment, observability, rollback, and reliability.", tags: ["MLOps", "Kubernetes", "CI/CD"] },
  { id: "ai-head-platform", title: "Head of AI Platform", domain: "AI/ML", level: "Head", mode: "Hybrid", summary: "Defines platform architecture for multi-model enterprise AI services.", tags: ["Platform", "Architecture", "Leadership"] },

  { id: "data-junior-analyst", title: "Data Analyst", domain: "Data/IT", level: "Junior", mode: "Remote", summary: "Builds KPI dashboards and operational reporting for clients.", tags: ["SQL", "BI", "Dashboards"] },
  { id: "data-middle-engineer", title: "Data Engineer", domain: "Data/IT", level: "Middle", mode: "Hybrid", summary: "Develops telemetry pipelines and warehouse models.", tags: ["ETL", "Airflow", "Warehouse"] },
  { id: "data-senior-architect", title: "Senior Data Platform Architect", domain: "Data/IT", level: "Senior", mode: "Hybrid", summary: "Designs scalable event-driven data architecture.", tags: ["Streaming", "Lakehouse", "Scale"] },
  { id: "it-middle-sre", title: "Site Reliability Engineer", domain: "Data/IT", level: "Middle", mode: "Remote", summary: "Maintains service uptime, observability, and incident response.", tags: ["SRE", "Monitoring", "Reliability"] },
  { id: "it-senior-security", title: "Cybersecurity Engineer", domain: "Data/IT", level: "Senior", mode: "Hybrid", summary: "Secures API, device networks, and data infrastructure.", tags: ["Security", "IAM", "Zero Trust"] },
  { id: "data-director", title: "Director of Data and Platforms", domain: "Data/IT", level: "Director", mode: "Hybrid", summary: "Leads data strategy, governance, and platform teams.", tags: ["Governance", "Strategy", "Leadership"] },

  { id: "auto-junior-qa", title: "Automation QA Engineer", domain: "Automation", level: "Junior", mode: "Remote", summary: "Builds test automation for mission flows and backend services.", tags: ["QA", "Automation", "Testing"] },
  { id: "auto-middle-rpa", title: "RPA Developer", domain: "Automation", level: "Middle", mode: "Remote", summary: "Automates repetitive business and operations workflows.", tags: ["RPA", "Workflow", "Integrations"] },
  { id: "auto-middle-control", title: "Control Systems Engineer", domain: "Automation", level: "Middle", mode: "On-site", summary: "Develops PLC/SCADA integrations for industrial operations.", tags: ["PLC", "SCADA", "Industrial"] },
  { id: "auto-senior-architect", title: "Senior Automation Architect", domain: "Automation", level: "Senior", mode: "Hybrid", summary: "Designs enterprise automation and orchestration architecture.", tags: ["Architecture", "BPM", "Scale"] },
  { id: "auto-lead-ai-agent", title: "Lead AI Agent Automation Engineer", domain: "Automation", level: "Lead", mode: "Remote", summary: "Builds agentic automation pipelines for HR and operations.", tags: ["Agents", "LLM", "Orchestration"] },

  { id: "pm-junior-coordinator", title: "Project Coordinator", domain: "Product & PM", level: "Junior", mode: "Hybrid", summary: "Coordinates timelines, task tracking, and cross-functional communication.", tags: ["Delivery", "Coordination", "Planning"] },
  { id: "pm-middle-manager", title: "Project Manager", domain: "Product & PM", level: "Middle", mode: "Hybrid", summary: "Runs project execution with budget and scope control.", tags: ["PM", "Budget", "Stakeholders"] },
  { id: "pm-middle-product", title: "Product Manager (AI Services)", domain: "Product & PM", level: "Middle", mode: "Hybrid", summary: "Defines product requirements for AI-enabled operational services.", tags: ["PRD", "Roadmap", "Discovery"] },
  { id: "pm-senior-program", title: "Senior Program Manager", domain: "Product & PM", level: "Senior", mode: "Hybrid", summary: "Leads multi-project delivery across robotics and AI streams.", tags: ["Program", "Governance", "Execution"] },
  { id: "pm-lead-ops", title: "Lead Operations Manager", domain: "Product & PM", level: "Lead", mode: "Hybrid", summary: "Owns service delivery model and operational performance metrics.", tags: ["Operations", "SLA", "Performance"] },
  { id: "pm-director-product", title: "Director of Product and Delivery", domain: "Product & PM", level: "Director", mode: "Hybrid", summary: "Drives end-to-end product and delivery strategy.", tags: ["Leadership", "Portfolio", "Growth"] },

  { id: "field-junior-repair", title: "Field Service Technician", domain: "Field Service", level: "Junior", mode: "On-site", summary: "Performs on-site diagnostics and hardware replacement.", tags: ["Repair", "Diagnostics", "Maintenance"] },
  { id: "field-middle-maintenance", title: "Maintenance Operations Specialist", domain: "Field Service", level: "Middle", mode: "On-site", summary: "Executes preventive maintenance and readiness checks.", tags: ["Preventive", "Readiness", "Assets"] },
  { id: "field-senior-diagnostics", title: "Senior Diagnostics Engineer", domain: "Field Service", level: "Senior", mode: "Hybrid", summary: "Investigates complex failures and defines repair playbooks.", tags: ["Root Cause", "Playbooks", "Reliability"] },
  { id: "field-lead-support", title: "Lead Technical Support Manager", domain: "Field Service", level: "Lead", mode: "Hybrid", summary: "Leads support teams and escalations across mission-critical accounts.", tags: ["Support", "Escalations", "Enterprise"] },
  { id: "field-head-service", title: "Head of Service Operations", domain: "Field Service", level: "Head", mode: "Hybrid", summary: "Defines nationwide service coverage and partner networks.", tags: ["Coverage", "Partners", "Operations"] },

  { id: "algo-middle-optimizer", title: "Algorithm Optimization Engineer", domain: "AI/ML", level: "Middle", mode: "Remote", summary: "Builds optimization algorithms for routing, dispatch, and resource planning.", tags: ["Algorithms", "Optimization", "Routing"] },
  { id: "algo-senior-sim", title: "Simulation Algorithm Engineer", domain: "AI/ML", level: "Senior", mode: "Hybrid", summary: "Develops simulation logic for autonomous mission validation.", tags: ["Simulation", "Digital Twin", "Validation"] },
  { id: "robot-middle-path", title: "Robot Path Planning Engineer", domain: "Robotics", level: "Middle", mode: "Hybrid", summary: "Implements navigation and path planning under real-world constraints.", tags: ["Path Planning", "Navigation", "Constraints"] },
  { id: "remote-middle-video", title: "Remote Video Analytics Operator", domain: "Monitoring", level: "Middle", mode: "Remote", summary: "Operates video analytics panels and triages alerts.", tags: ["Video", "Analytics", "Alerting"] },
  { id: "drone-middle-bvlos", title: "BVLOS Mission Pilot", domain: "Drone Ops", level: "Middle", mode: "On-site", summary: "Executes beyond visual line of sight operations under compliance controls.", tags: ["BVLOS", "Regulatory", "Safety"] },
  { id: "data-middle-governance", title: "Data Governance Specialist", domain: "Data/IT", level: "Middle", mode: "Hybrid", summary: "Implements data quality, lineage, and compliance standards.", tags: ["Governance", "Quality", "Compliance"] },
  { id: "auto-senior-process", title: "Business Process Automation Engineer", domain: "Automation", level: "Senior", mode: "Hybrid", summary: "Transforms operational workflows into measurable automation pipelines.", tags: ["Process", "Automation", "KPIs"] },
  { id: "pm-head-marketplace", title: "Head of Marketplace Operations", domain: "Product & PM", level: "Head", mode: "Hybrid", summary: "Owns supply-demand balance, liquidity, and quality on the platform.", tags: ["Marketplace", "Growth", "Operations"] }
];

export const allLevels: Level[] = ["Intern", "Junior", "Middle", "Senior", "Lead", "Head", "Director"];
export const allModes: WorkMode[] = ["Remote", "Hybrid", "On-site"];
export const allDomains: RoleDomain[] = [
  "Drone Ops",
  "Remote Control",
  "Robotics",
  "Monitoring",
  "AI/ML",
  "Data/IT",
  "Automation",
  "Product & PM",
  "Field Service"
];
