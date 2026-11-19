import {extraDomainsB,extraDefinitionsB} from './catalog-b.js';
import {extraDomainsA,extraDefinitionsA} from './catalog-a.js';
export const tiers = ['Foundational', 'Core', 'Advanced'];
export const domains = [
  {id:'software',name:'Software & Web Engineering',description:'Build the products people use.'},
  {id:'security',name:'Cybersecurity',description:'Protect systems, software, and people.'},
  {id:'data',name:'AI, Machine Learning & Data',description:'Turn information into intelligence.'},
  {id:'cloud',name:'Cloud, DevOps & Infrastructure',description:'Keep the digital world running.'},
  {id:'systems',name:'Core Systems & Specialized',description:'Engineer closer to the machine.'},
  ...extraDomainsA,
  ...extraDomainsB,
];

// Each role has nine explicit skills and four complete, role-specific project briefs.
// Skill order describes a conservative learning path, not a claim that every topic
// is an absolute prerequisite in professional practice.
const definitions = [
['data','database','Database Engineer','SQL & relational theory|Data structures & storage fundamentals|Linux & database administration|Schema design & normalization|Indexes & query optimization|Transactions & concurrency control|Replication & backup recovery|Database observability & security|Distributed databases & capacity planning',[
'Transactional inventory database~Design normalized product and stock tables;Enforce keys and constraints;Test concurrent stock reservations',
'Query optimization case study~Generate a reproducible synthetic workload;Compare execution plans and index strategies;Report latency and storage tradeoffs',
'Database recovery lab~Automate backups with retention policies;Restore to a separate isolated instance;Measure recovery time and verify data integrity',
'Highly available data platform~Configure replication and access controls in a lab;Exercise failover and monitor replication lag;Document consistency, capacity, and recovery guarantees']],
['systems','robotics','Robotics Software Engineer','Python & C++ programming|Linear algebra & coordinate geometry|Sensors & control fundamentals|Robot Operating System middleware|Robot kinematics & simulation|Perception & sensor fusion|Localization & mapping|Motion planning & control|Robotics integration & safety validation',[
'Simulated robot telemetry~Publish synthetic sensor data through middleware topics;Visualize coordinate frames;Test message timing and invalid readings',
'Robot arm simulator~Implement forward and inverse kinematics;Visualize end-effector trajectories;Validate joint limits and numerical accuracy',
'Mapping rover prototype~Fuse simulated odometry and range measurements;Build and evaluate a map;Measure localization drift on repeatable routes',
'Autonomous navigation simulation~Integrate mapping, planning, and obstacle avoidance;Implement an emergency stop and bounded operating conditions;Evaluate collision rate and route completion across simulated scenarios']],
['software','frontend','Frontend Engineer','HTML & semantic accessibility|CSS & responsive layouts|JavaScript fundamentals|TypeScript|React & component architecture|State management & API integration|Frontend testing|Web performance & browser internals|Design systems & accessible delivery',[
'Accessible personal portfolio~Build semantic page landmarks;Implement responsive layouts and keyboard navigation;Audit contrast and document accessibility fixes',
'Public transit explorer~Consume a transit API with loading and error states;Build reusable React filters;Persist favorite routes locally',
'Tested component library~Create typed input, dialog, and table components;Add interaction and accessibility tests;Document variants and usage',
'Collaborative project dashboard~Implement authentication and role-aware views;Add realtime updates and optimistic state;Measure bundle size and publish performance results']],
['software','backend','Backend Engineer','Programming & data structures|HTTP & networking|Relational data modeling|REST API design|Database queries & transactions|Authentication & authorization|Backend testing & security|Caching & asynchronous jobs|Distributed system design',[
'Library service~Model books and loans in SQL;Implement validated CRUD endpoints;Write query and endpoint tests',
'Identity and access service~Implement password hashing and session expiry;Enforce resource-level permissions;Test invalid and expired credentials',
'Background export pipeline~Queue large report jobs;Add retries and idempotency keys;Expose progress and download endpoints',
'Resilient commerce backend~Implement inventory transactions and payment sandbox integration;Add caching and observable background jobs;Load-test failure recovery and document service tradeoffs']],
['software','fullstack','Full-Stack Engineer','JavaScript & web fundamentals|Git & command line|SQL & data modeling|React & TypeScript|Backend APIs & validation|Authentication & full-stack integration|End-to-end testing|Deployment & observability|Full-stack system design',[
'Personal knowledge base~Build a responsive editor and search;Persist notes in SQL;Validate inputs on the server',
'Team issue tracker~Add authenticated users and organizations;Implement React filters and API pagination;Enforce organization-level data isolation',
'Booking application~Prevent concurrent double bookings;Add transactional confirmation emails;Cover booking flows with end-to-end tests',
'Multi-tenant analytics product~Implement workspace roles and ingestion endpoints;Deploy frontend, API, and database with monitoring;Test tenant isolation and publish architecture decisions']],
['software','ios','iOS Engineer','Swift fundamentals|Data structures & Git|iOS lifecycle & platform basics|SwiftUI layouts & navigation|Networking & Swift concurrency|Persistence with SwiftData|iOS testing & accessibility|Instruments & memory performance|App architecture & release engineering',[
'Accessible habit tracker~Build SwiftUI navigation and forms;Persist daily habits;Support VoiceOver and dynamic text',
'Offline weather journal~Fetch and decode weather responses;Cache entries with SwiftData;Handle offline and retry states',
'Podcast player~Implement background audio and playback controls;Test download cancellation;Profile memory with Instruments',
'Production travel companion~Combine offline itineraries and synchronized account data;Add UI tests and accessibility checks;Prepare signing, privacy disclosures, and a release checklist']],
['software','android','Android Engineer','Kotlin fundamentals|Data structures & Git|Android lifecycle & platform basics|Jetpack Compose UI|Coroutines & network APIs|Room & offline persistence|Android testing & accessibility|Performance & background work|Modular architecture & app delivery',[
'Expense tracker~Build Compose forms and charts;Persist expenses in Room;Support screen readers and large text',
'Offline news reader~Fetch paginated articles;Cache content and synchronize refreshes;Handle network errors with coroutine cancellation',
'Background fitness journal~Use WorkManager for synchronization;Test database migrations;Profile startup and battery use',
'Field inspection application~Implement offline forms, photos, and conflict resolution;Build modular layers with integration tests;Prepare a signed release and observable crash reporting']],
['software','crossplatform','Cross-Platform Mobile Engineer','JavaScript & TypeScript|Mobile UX & accessibility|Git & async programming|React Native components & navigation|Native APIs & permissions|Offline state & API synchronization|Mobile testing & debugging|Native modules & performance|Cross-platform release pipelines',[
'Daily planner~Build shared iOS and Android screens;Persist tasks locally;Support accessible touch targets',
'Location-based campus guide~Request location permissions gracefully;Display map markers and search;Cache campus information offline',
'Offline inventory scanner~Integrate a camera barcode scanner;Queue offline changes and resolve conflicts;Test device permission failures',
'Community event application~Implement authentication, notifications, and realtime RSVP updates;Profile both platforms and test core flows;Automate signed builds for each platform']],
['software','api','API & Microservices Engineer','Programming & data structures|HTTP & network protocols|SQL & transactions|API contracts & schema design|Service authentication & authorization|Messaging & event-driven architecture|Contract & integration testing|Resilience & observability|Distributed consistency & orchestration',[
'Contract-first catalog API~Write an OpenAPI contract;Validate requests and responses;Implement pagination and versioned endpoints',
'Secure API gateway~Verify tokens and enforce scopes;Implement quotas and rate limits;Test unauthorized and over-quota requests',
'Event-driven fulfillment service~Publish versioned order events;Handle duplicate delivery idempotently;Add dead-letter handling and replay tests',
'Distributed checkout platform~Implement a saga across order and inventory services;Trace requests across services;Inject failures and document consistency guarantees']],
['security','redteam','Red Team / Penetration Testing Engineer','Networking & protocols|Linux & scripting|Security principles & lab ethics|Reconnaissance & attack surface mapping|Web penetration testing|Host & directory security testing|Exploit validation in isolated labs|Adversary emulation & detection validation|Reporting & remediation verification',[
'Isolated security lab~Build segregated vulnerable virtual machines;Define written test scope and rules;Inventory services and restore snapshots',
'Web application assessment~Test a deliberately vulnerable local application;Record reproducible evidence and severity;Recommend and retest fixes',
'Directory security simulation~Create a private directory lab with synthetic accounts;Assess configured permission weaknesses;Map observed activity to defensive logs',
'Purple-team exercise~Define a scoped emulation plan in an owned lab;Measure detection coverage with the blue team;Deliver executive findings and remediation retest results']],
['security','blueteam','Blue Team / SOC & Incident Response Analyst','Networking & operating systems|Security fundamentals|Python & log parsing|SIEM ingestion & queries|Detection engineering|Incident triage & response|Digital forensics|Threat hunting & intelligence|Response automation & detection validation',[
'Security log workbench~Collect local authentication and system logs;Normalize timestamps and fields;Write queries for suspicious login patterns',
'Detection rule pack~Build rules against synthetic attack logs;Measure false positives on benign events;Version rules with automated tests',
'Forensic incident casebook~Analyze a synthetic disk and memory dataset;Build an evidence timeline and chain-of-custody record;Document containment and recovery steps',
'Mini security operations center~Ingest endpoint and network telemetry;Automate enrichment with approval gates;Run a tabletop incident and report detection and response metrics']],
['security','appsec','Application Security Engineer','Programming & web architecture|HTTP & authentication|Secure coding fundamentals|Threat modeling|Source review & vulnerability analysis|Security testing in CI|Dependency & supply-chain security|Advanced application security testing|Security architecture & remediation programs',[
'Secure coding clinic~Build intentionally flawed local snippets and patched versions;Add regression tests for each fix;Explain trust boundaries and validation',
'Threat-modeled file service~Diagram data flows and abuse cases;Enforce safe uploads and resource permissions;Verify mitigations with security tests',
'Application security pipeline~Integrate dependency, secret, and static scans;Create triage and exception policies;Test pipeline gates with controlled fixtures',
'Product security review~Assess a sample multi-tenant application;Prioritize findings and implement fixes;Publish threat models, regression coverage, and remediation metrics']],
['security','cloudsecurity','Cloud Security Engineer','Networking & Linux|Cloud infrastructure fundamentals|Identity & access principles|Cloud IAM policy design|Network segmentation & encryption|Cloud logging & threat detection|Infrastructure security scanning|Container & workload security|Cloud incident response & security architecture',[
'Least-privilege cloud lab~Create isolated test identities and resources;Write restrictive access policies;Verify both allowed and denied requests',
'Secure storage baseline~Configure encryption and blocked public access;Enable access logging;Test configuration drift detection',
'Container security pipeline~Scan images and infrastructure definitions;Enforce non-root workloads and resource limits;Document exceptions and remediation',
'Cloud incident simulation~Deploy a segmented sandbox with centralized telemetry;Simulate a controlled credential misuse scenario;Revoke access, preserve evidence, and validate recovery']],
['security','malware','Malware Analyst / Reverse Engineer','C programming & memory|Operating systems & assembly|Isolated analysis environments|Static binary analysis|Dynamic analysis & debugging|Executable formats & behavior analysis|Detection signatures & YARA|Unpacking & obfuscation analysis|Reverse engineering & threat reporting',[
'Safe binary inspection toolkit~Parse metadata from benign executables;Extract strings and imports;Document isolated analysis procedures',
'Behavior analysis report~Trace a harmless sample in a disconnected virtual machine;Record file and process changes;Produce a reproducible behavior timeline',
'Detection signature suite~Write YARA rules for curated permitted samples;Test against clean-file controls;Measure and reduce false positives',
'Reverse engineering case study~Analyze a legally available training binary;Reconstruct key routines and configuration;Publish evidence, detection logic, and limitations without live payloads']],
['security','grc','Governance, Risk & Compliance Analyst','Information security principles|Business processes & asset inventory|Risk assessment fundamentals|Control mapping & policy writing|Audit evidence management|Third-party risk assessment|Privacy & data governance|Business continuity & resilience|Enterprise risk reporting & program design',[
'Asset and risk register~Inventory a fictional organization;Score likelihood and impact with documented criteria;Assign owners and mitigation actions',
'Control evidence workbook~Map sample controls to business risks;Collect fictional evidence and test its adequacy;Track gaps and corrective actions',
'Vendor risk assessment~Design a questionnaire and scoring model;Review synthetic vendor evidence;Document residual risks and contract recommendations',
'Security governance program~Create policies, an audit plan, and a continuity exercise;Build an executive risk dashboard;Present a prioritized improvement roadmap and accountable owners']],
['data','ml','Machine Learning Engineer','Python & numerical computing|Linear algebra & calculus|Probability & statistics|Data preparation & feature engineering|Supervised learning & evaluation|Deep learning fundamentals|Experiment tracking & reproducibility|Model serving & optimization|Production ML monitoring & system design',[
'Reproducible price predictor~Build a leakage-safe train and test split;Compare a baseline with engineered features;Report error and reproducible training steps',
'Imbalanced fraud classifier~Use precision-recall metrics and calibrated thresholds;Handle class imbalance without test leakage;Track experiments and feature versions',
'Model inference service~Package a versioned model behind an API;Add input validation and latency benchmarks;Write integration tests for inference',
'Monitored recommendation system~Implement retrieval and ranking with offline metrics;Serve predictions with fallback behavior;Monitor drift, latency, and data quality']],
['data','llm','AI / Large Language Model Engineer','Python & API development|Linear algebra & probability|Machine learning & neural networks|Transformers & tokenization|Prompt design & structured outputs|Embeddings & retrieval-augmented generation|LLM evaluation & safety testing|Fine-tuning & inference optimization|Agent systems & production observability',[
'Structured document extractor~Extract a typed schema from synthetic documents;Validate output and handle malformed responses;Measure accuracy against labeled fixtures',
'Cited knowledge assistant~Chunk and index a document collection;Return source-linked retrieved answers;Evaluate retrieval quality and unsupported claims',
'LLM evaluation harness~Create versioned factuality and injection test cases;Compare model, prompt, and retrieval settings;Track cost, latency, and task success',
'Tool-using support assistant~Restrict tools with permissions and approval gates;Implement traceable retrieval and safe failure paths;Run adversarial tests and publish quality and cost metrics']],
['data','datascience','Data Scientist','Python & data manipulation|Probability & statistics|SQL & exploratory analysis|Data cleaning & visualization|Statistical inference & experimentation|Predictive modeling & validation|Causal inference|Forecasting & uncertainty|Decision science & stakeholder communication',[
'City mobility analysis~Clean an open trip dataset;Build SQL summaries and clear visualizations;Document missingness and sampling limitations',
'Experiment analysis notebook~Define a primary metric and power assumptions;Analyze synthetic randomized experiment data;Report effect sizes and uncertainty',
'Demand forecasting study~Use temporal validation and baseline forecasts;Evaluate interval coverage and error;Explain seasonal effects and failure cases',
'Customer retention decision study~Build a leakage-safe churn model;Separate prediction from causal claims;Deliver a business recommendation with uncertainty and a validation plan']],
['data','dataengineering','Data Engineer','Python & command line|SQL & relational modeling|Data formats & warehouse fundamentals|ETL / ELT pipelines|Orchestration & data quality|Dimensional modeling & analytics engineering|Distributed processing with Spark|Streaming & change data capture|Lakehouse architecture & governance',[
'Public data ingestion pipeline~Load a public dataset into relational tables;Validate schema and duplicate handling;Make ingestion repeatable and idempotent',
'Analytics warehouse~Create fact and dimension models;Add freshness and relationship tests;Document business metrics and lineage',
'Streaming event processor~Consume simulated events with event timestamps;Handle duplicates and late arrivals;Measure throughput and consumer lag',
'Governed lakehouse~Combine batch and streaming ingestion;Add orchestration, access controls, and lineage;Demonstrate backfills, failure recovery, and cost measurements']],
['data','mlops','MLOps Engineer','Python & Linux|Git & testing|Machine learning lifecycle|Containers & model packaging|Training pipelines & orchestration|Model registry & deployment automation|Feature stores & data validation|Model monitoring & drift detection|Scalable ML platforms & governance',[
'Reproducible training package~Containerize a baseline model;Pin data and environment versions;Add deterministic training smoke tests',
'Automated model release pipeline~Track experiments and register model versions;Gate deployment on evaluation thresholds;Implement a tested rollback',
'Model health dashboard~Monitor predictions, latency, and data quality;Simulate distribution shift;Document alert thresholds and response actions',
'Self-service ML platform~Orchestrate versioned training and serving workflows;Enforce access and promotion policies;Demonstrate canary deployment, drift response, and recovery']],
['data','vision','Computer Vision Engineer','Python & numerical computing|Linear algebra & image geometry|Machine learning fundamentals|Image processing & augmentation|Convolutional networks & transfer learning|Object detection & segmentation|Vision evaluation & dataset curation|Video tracking & edge inference|Production vision systems',[
'Image quality analyzer~Implement blur and lighting diagnostics;Validate on a labeled image set;Document threshold sensitivity',
'Transfer-learning classifier~Create disjoint training and test sets;Compare augmentation strategies;Report per-class performance and failure examples',
'Object detection benchmark~Annotate a permitted image collection;Measure average precision and inference latency;Analyze missed and overlapping objects',
'Edge inspection system~Deploy a compressed defect detection model;Track latency and performance under lighting shifts;Provide human review and a reproducible retraining pipeline']],
['data','nlp','Natural Language Processing Specialist','Python & text processing|Probability & linear algebra|Machine learning fundamentals|Text representation & tokenization|Sequence models & transformers|Text classification & information extraction|NLP evaluation & error analysis|Multilingual adaptation & fine-tuning|Production language pipelines',[
'Text corpus workbench~Normalize and deduplicate a permitted text collection;Analyze vocabulary and language distribution;Track data provenance',
'Support ticket classifier~Train baseline and transformer classifiers;Use leakage-safe splits and per-class metrics;Inspect confusing and rare categories',
'Entity extraction service~Create an annotated domain dataset;Evaluate exact and partial span matches;Serve typed entities with confidence and validation',
'Multilingual document pipeline~Combine classification, extraction, and retrieval;Evaluate quality separately by language;Monitor latency, drift, and human correction feedback']],
['cloud','devops','DevOps Engineer','Linux & shell scripting|Git & collaboration|Networking fundamentals|Continuous integration & delivery|Containers & registries|Infrastructure as code|Monitoring & log aggregation|Deployment strategies & secrets|Delivery platform reliability',[
'Automated build pipeline~Run tests and package a sample application;Cache dependencies safely;Publish versioned artifacts',
'Containerized service stack~Define app and database containers;Add health checks and persistent storage;Document local startup and recovery',
'Infrastructure delivery pipeline~Provision a sandbox through code;Validate plans and protect secrets;Demonstrate rollback after a failed deployment',
'Observable delivery platform~Implement staged releases with approval gates;Add logs, metrics, and service alerts;Measure deployment frequency and recovery time in simulated incidents']],
['cloud','sre','Site Reliability Engineer','Linux & networking|Programming & automation|Distributed systems fundamentals|Service-level indicators & objectives|Metrics, logs & tracing|Incident response & runbooks|Capacity planning & load testing|Resilience engineering & safe rollouts|Reliability architecture & error budgets',[
'Service health monitor~Instrument a sample API;Define availability and latency indicators;Build a dashboard and basic runbook',
'SLO and alerting lab~Define an error budget for a service;Implement burn-rate alerts;Replay synthetic failures to test alert quality',
'Capacity and resilience study~Load-test a sandbox service;Identify saturation and dependency limits;Run scoped failure experiments with recovery checks',
'Reliable multi-service platform~Implement tracing, safe rollouts, and rollback;Exercise an incident and write a blameless review;Use measured error budgets to prioritize improvements']],
['cloud','architect','Cloud Architect','Networking & distributed computing|Linux & infrastructure basics|Cloud compute, storage & identity|Cloud network & security design|Infrastructure as code|Availability & disaster recovery|Cloud cost modeling|Migration & hybrid architecture|Architecture governance & tradeoff analysis',[
'Reference cloud workload~Design a segmented application network;Provision a minimal service through code;Document access boundaries and costs',
'Highly available web architecture~Design redundant compute and managed data storage;Test health checks and recovery;Explain availability and cost tradeoffs',
'Migration assessment~Inventory a fictional legacy estate;Compare migration approaches and dependencies;Produce a phased plan and cost model',
'Multi-region architecture blueprint~Define recovery objectives and data replication;Prototype failover in a bounded sandbox;Deliver architecture decisions, security controls, and operating costs']],
['cloud','platform','Platform / Kubernetes Engineer','Linux & networking|Containers & image lifecycle|Infrastructure as code|Kubernetes workloads & services|Helm & configuration management|GitOps & deployment automation|Cluster security & policy|Cluster observability & scaling|Internal developer platforms & multi-tenancy',[
'Local Kubernetes service~Deploy a container with probes and resource limits;Expose it through a service;Document debugging and cleanup',
'Reusable deployment chart~Create configurable Helm templates;Validate rendered manifests;Test upgrades and rollback',
'Policy-governed GitOps cluster~Reconcile desired state from Git;Enforce namespaces and workload policies;Demonstrate drift correction and secret management',
'Developer self-service platform~Provide service templates and deployment workflows;Implement tenant isolation and observability;Measure onboarding effort and test failure recovery']],
['cloud','network','Network Engineer','TCP/IP & subnetting|Linux & network tools|Switching & VLANs|Routing protocols|DNS, DHCP & network services|Firewalls & virtual private networks|Network automation|Network monitoring & troubleshooting|Resilient network architecture',[
'Virtual campus network~Create subnet and VLAN plans;Configure a simulated routed topology;Verify segmentation and connectivity',
'Secure branch connectivity lab~Connect virtual branches with a tunnel;Apply least-privilege firewall rules;Test name resolution and failure scenarios',
'Network configuration automation~Generate configurations from structured inventory;Validate changes before applying in a lab;Collect and compare configuration backups',
'Resilient enterprise network~Design redundant links and routing;Monitor loss, latency, and convergence;Simulate link failures and document recovery results']],
['systems','kernel','Systems / Kernel Developer','C programming & memory safety|Computer architecture & assembly|Operating systems fundamentals|System calls & process management|Concurrency & synchronization|Memory management & allocators|Kernel debugging & tracing|Device drivers & low-level I/O|Kernel performance & security',[
'Unix process toolkit~Implement process spawning and pipes;Handle exit codes and signals;Test resource cleanup and invalid inputs',
'Concurrent memory allocator~Implement allocation and reclamation in user space;Stress-test concurrent access;Measure fragmentation and latency',
'Virtual device driver lab~Build a driver for an isolated virtual machine;Implement safe I/O boundaries;Trace errors and unload behavior',
'Instrumented teaching kernel~Extend a teaching kernel with a scheduler feature;Test synchronization and memory invariants;Publish benchmark results and a design document']],
['systems','embedded','Embedded / Internet of Things Engineer','C / C++ & memory|Electronics & digital logic|Microcontrollers & peripheral basics|Embedded protocols & drivers|Real-time operating systems|Sensors, connectivity & messaging|Embedded debugging & power profiling|Firmware security & safe updates|Reliable IoT system architecture',[
'Environmental sensor logger~Read a real or simulated sensor;Timestamp and store measurements;Handle disconnected sensors and invalid readings',
'Real-time control simulator~Schedule periodic tasks under an RTOS;Measure jitter and deadlines;Implement watchdog recovery',
'Connected telemetry device~Publish sensor readings over authenticated messaging;Buffer events during outages;Measure power and message delivery',
'Secure IoT fleet prototype~Implement signed update verification and rollback;Monitor simulated device health;Document threat boundaries, power budgets, and recovery tests']],
['systems','game','Game Developer','Programming & data structures|Linear algebra & game mathematics|Engine workflow & assets|Gameplay systems & input|Physics & animation|Game UI & state management|Profiling & rendering optimization|Multiplayer networking|Production game architecture & delivery',[
'Polished arcade prototype~Implement movement, collisions, and scoring;Add pause and restart states;Support keyboard and controller input',
'Puzzle adventure vertical slice~Build reusable interactions and save data;Add animation and accessible settings;Playtest and document feedback-driven changes',
'Multiplayer arena prototype~Synchronize players with authoritative game state;Handle disconnects and latency;Profile simulation and rendering budgets',
'Release-ready game slice~Integrate levels, progression, audio, and menus;Automate builds and regression smoke tests;Publish a playable build with performance targets and a postmortem']],
['systems','blockchain','Blockchain / Smart Contract Developer','Programming & data structures|Cryptography fundamentals|Blockchain & transaction models|Solidity & contract storage|Contract testing & local tooling|Wallet & decentralized app integration|Smart contract security|Protocol design & upgrade patterns|Contract auditing & deployment operations',[
'Local escrow contract~Implement explicit escrow states and permissions;Test deposits, disputes, and refunds;Use local test tokens only',
'Wallet-connected voting application~Build a frontend with transaction status;Enforce voting eligibility and deadlines;Test rejected and reverted transactions',
'Property-tested token vault~Define accounting and access invariants;Run fuzz and regression tests;Document rounding and reentrancy defenses',
'Audited governance prototype~Implement timelocked proposals in a local chain;Test upgrade permissions and emergency procedures;Publish a threat model, audit findings, and deployment scripts']],
['systems','sdet','Software Development Engineer in Test / QA Automation','Programming & debugging|Testing principles & test design|Web, HTTP & SQL fundamentals|UI test automation|API & integration testing|Test data & environment management|CI pipelines & test reliability|Performance & security test automation|Quality strategy & automation architecture',[
'Risk-based test portfolio~Write boundary and equivalence test cases for a sample app;Automate unit-level checks;Document reproducible defects',
'API regression suite~Validate schemas and authorization boundaries;Isolate test data and cleanup;Generate readable CI reports',
'Reliable browser automation~Automate critical user journeys;Use stable locators and deterministic fixtures;Diagnose flakes with traces and screenshots',
'Quality engineering platform~Combine UI, API, and performance gates;Track reliability and risk coverage;Demonstrate triage, environment recovery, and release recommendations']],
];

const searchAliases = {
 frontend:'front end web developer web development UI HTML CSS JavaScript React Angular Vue Svelte',
 backend:'back end server developer Java Spring Python Django Flask Node Express C# dotnet .NET Go Rust',
 fullstack:'full stack MERN MEAN web app developer JavaScript Node React MongoDB',
 ios:'iPhone Apple mobile app Swift UIKit', android:'Google mobile app Java Kotlin', crossplatform:'Flutter Dart React Native mobile application',
 api:'microservices integration REST GraphQL gRPC', redteam:'ethical hacker penetration tester pentest offensive security red team',
 blueteam:'security operations center SOC incident responder blue team', appsec:'application security secure software SSDLC',
 cloudsecurity:'cloud security CSPM AWS Azure GCP', malware:'reverse engineer binary analyst malware analysis', grc:'governance risk compliance information security auditor',
 ml:'machine learning artificial intelligence AI ML', llm:'generative AI GenAI LLM RAG prompt engineer agentic AI',
 datascience:'data science statistics analytics', dataengineering:'ETL ELT big data data pipeline', mlops:'machine learning operations model platform',
 vision:'computer vision image processing', nlp:'natural language processing text mining linguistics',
 devops:'CI CD infrastructure automation release build engineer', sre:'site reliability production engineer SRE',
 architect:'cloud solutions architect AWS Azure GCP', platform:'Kubernetes K8s platform engineering infrastructure', network:'networking CCNA routing switching',
 kernel:'operating system OS kernel systems programming low level', embedded:'IoT internet of things embedded systems microcontroller',
 game:'gameplay gaming Unity Unreal Godot', blockchain:'blockchain Web3 Solidity smart contract Ethereum decentralized', sdet:'QA quality assurance software testing test automation SDET',
 database:'DBA database administrator database development SQL PostgreSQL MySQL Oracle', robotics:'robot robots autonomous ROS control',
 'quantum-software':'quantum computing Qiskit quantum programmer', hpc:'parallel scientific computing high performance CUDA GPU',
 bioinformatics:'computational biology genomics biomedical informatics', 'developer-tools':'DevEx DX developer experience tools SDK CLI',
 'data-analyst':'business data analytics reporting Excel SQL Python', 'business-intelligence':'BI Power BI Tableau reporting dashboard',
};

export const roles = [...definitions,...extraDefinitionsA,...extraDefinitionsB].map(([domain,id,name,skillText,projectText]) => {
  const names = skillText.split('|');
  const skills = names.map((name,index) => ({id:`${id}-${index}`,name,tier:tiers[Math.floor(index/3)],hours:[12,16,18,22,26,28,30,34,40][index], prerequisites:index === 0 ? [] : [`${id}-${index-1}`]}));
  const projects = projectText.map((text,index) => {const [name,requirements] = text.split('~');return {id:`${id}-project-${index}`,name,requirements:requirements.split(';'),level:['Foundation','Applied','Advanced','Capstone'][index],hours:[8,16,24,40][index],prerequisites:skills.slice(0,[3,6,8,9][index]).map(s=>s.id)};});
  const groupedDomain = ({blockchain:'web3',game:'immersive',sdet:'quality'})[id]||domain;
  return {domain:groupedDomain,id,name,skills,projects,aliases:searchAliases[id]||''};
});
