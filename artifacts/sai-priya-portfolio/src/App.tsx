import { type ReactNode, useEffect } from 'react';
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Braces, Github, Mail, ScanEye } from 'lucide-react';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();
const githubUrl = 'https://github.com/yakshala/safeCampus';
const navItems = [
  ['Home', '/#home'],
  ['About', '/#about'],
  ['Skills', '/#skills'],
  ['Projects', '/#projects'],
  ['Experience', '/#experience'],
  ['Certifications', '/#certifications'],
  ['Contact', '/#contact'],
];

function ResumePlaceholder({ className = '', label = 'Download Resume · not provided' }: { className?: string; label?: string }) {
  return (
    <span className={`button button-quiet ${className}`} aria-disabled="true" title="Resume file not provided">
      {label}
    </span>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="shell nav-inner">
        <a className="brand" href="/" aria-label="Sai Priya Korupolu home">
          <span className="brand-mark">SP</span>
          <span>Sai Priya Korupolu</span>
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        </nav>
        <div className="nav-actions"><ResumePlaceholder label="Resume · not provided" /></div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <span>© 2026 Sai Priya Korupolu</span>
        <span className="footer-title">Java Developer | Backend &amp; REST APIs | AI &amp; ML</span>
        <div className="hero-links" style={{ margin: 0 }}>
          <a className="text-link" href={githubUrl} target="_blank" rel="noreferrer"><Github size={13} /> GitHub</a>
          <span className="placeholder-link" title="LinkedIn URL not provided">LinkedIn · not provided</span>
          <span className="placeholder-link" title="Email address not provided">Email · not provided</span>
        </div>
      </div>
    </footer>
  );
}

function SectionHeading({ index, label, title, detail }: { index: string; label: string; title: string; detail?: string }) {
  return (
    <div className="section-heading">
      <div>
        <div className="eyebrow">{index} / {label}</div>
        <h2>{title}</h2>
      </div>
      {detail && <p>{detail}</p>}
    </div>
  );
}

function Hero() {
  return (
    <section className="hero shell" id="home">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-status"><span className="status-dot" /> Open to Software Engineering Opportunities</div>
          <h1>Sai Priya <span>Korupolu.</span></h1>
          <div className="hero-role">Java Developer <span style={{ color: '#52645a' }}>|</span> Backend &amp; REST APIs <span style={{ color: '#52645a' }}>|</span> AI &amp; ML</div>
          <p className="hero-description">B.Tech AI &amp; ML student building practical software solutions with Java, backend technologies, SQL and computer vision.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">View projects <ArrowDownRight size={15} /></a>
            <ResumePlaceholder />
          </div>
          <div className="hero-links">
            <a className="text-link" href={githubUrl} target="_blank" rel="noreferrer"><Github size={14} /> GitHub <ArrowUpRight size={12} /></a>
            <span className="placeholder-link">LinkedIn · not provided</span>
            <span className="placeholder-link">Email · not provided</span>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="orbit">
            <span className="orbit-label one">JAVA</span>
            <span className="orbit-label two">REST APIs</span>
            <span className="orbit-label three">SQL</span>
            <span className="orbit-label four">AI / ML</span>
            <span className="orbit-cross cross-a" />
            <span className="orbit-cross cross-b" />
            <span className="orbit-cross cross-c" />
            <div className="orbit-center">SP</div>
          </div>
          <span className="hero-index">01 — ENGINEERING FOCUS</span>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section" id="about">
      <div className="shell">
        <SectionHeading index="01" label="Profile" title="Building toward the backend." detail="A focused foundation in software engineering, backed by practical project work and a learning mindset." />
        <div className="about-grid">
          <p className="about-copy">I am a <strong>B.Tech AI &amp; ML student</strong> interested in software engineering, Java backend development and practical problem solving. I enjoy building applications and working with APIs, databases and AI-based solutions. I am currently strengthening my Java, DSA, SQL, networking and backend development skills while preparing for software engineering opportunities.</p>
          <div className="education">
            <div className="education-top"><span>EDUCATION</span><span>2023 — 2027</span></div>
            <h3>B.Tech in Artificial Intelligence &amp; Machine Learning</h3>
            <p>Aditya College of Engineering and Technology</p>
            <div className="education-meta"><span>CGPA <strong>8.24</strong></span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

const skillGroups = [
  { title: 'Languages', items: ['Java', 'Python', 'SQL', 'C', 'Dart'] },
  { title: 'Backend', items: ['Java', 'Spring Boot', 'REST APIs', 'Spring Data JPA', 'Hibernate / JPA', 'Maven'] },
  { title: 'Databases', items: ['SQL', 'MongoDB', 'SQLite', 'H2'] },
  { title: 'AI / Vision', items: ['Python', 'OpenCV', 'YOLO'] },
  { title: 'Tools', items: ['Git', 'GitHub', 'Postman', 'VS Code', 'Android Studio'] },
];

function Skills() {
  return (
    <section className="section" id="skills">
      <div className="shell">
        <SectionHeading index="02" label="Toolkit" title="Technical skills." detail="A practical toolkit across Java backend development, data and computer vision." />
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.title}>
              <h3>{group.title}</h3>
              <div className="skill-list">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section" id="projects">
      <div className="shell">
        <SectionHeading index="03" label="Selected work" title="Projects, built with purpose." detail="Project work spanning AI-assisted campus safety concepts and Java backend fundamentals." />
        <div className="project-stack">
          <article className="project-card">
            <div className="project-main">
              <span className="project-number">01 / AI &amp; COMPUTER VISION</span>
              <h3>SafeCampus</h3>
              <p>An AI-powered campus surveillance concept designed to analyze CCTV footage and identify predefined objects and suspicious events—supporting immediate alerts over only reviewing recordings later.</p>
              <Link className="button button-primary" href="/projects/safecampus">Explore case study <ArrowRight size={14} /></Link>
            </div>
            <div className="project-side">
              <div>
                <div className="project-side-title">Technologies</div>
                <div className="tag-list">{['Python', 'OpenCV', 'YOLO', 'Flutter', 'SQLite'].map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
                <div className="feature-list"><span>Object detection</span><span>Event detection</span><span>Alert generation</span><span>Event history</span></div>
              </div>
              <div className="status-note"><ScanEye size={15} /><span><b>In progress:</b> UI/design and AI detection workflow. Flask backend planned / in development.</span></div>
            </div>
          </article>
          <article className="compact-project">
            <div>
              <span className="project-number">02 / JAVA BACKEND</span>
              <h3>Task Manager REST API</h3>
              <p>A Java backend REST API concept for managing tasks, with CRUD operations, status filtering, validation, exception handling, layered architecture and unit testing.</p>
              <div className="compact-tags">{['Java 17', 'Spring Boot', 'Spring Data JPA', 'H2', 'Maven', 'JUnit 5', 'Mockito'].map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
            </div>
            <span className="compact-action placeholder-link" title="Repository URL not provided">Repository · not provided</span>
          </article>
          <article className="compact-project">
            <div>
              <span className="project-number">03 / TEAM PROJECT</span>
              <h3>Sanchari</h3>
              <p>Project developed during the Technical Hub Full Stack Development with React Native program. Backend Developer &amp; Workflow Designer, on a six-member team.</p>
              <div className="compact-tags"><span className="tag">Technical Hub</span><span className="tag">Full Stack Development with React Native</span></div>
            </div>
            <span className="compact-action placeholder-link" title="Repository URL not provided">Repository &amp; details · to be added</span>
          </article>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section" id="experience">
      <div className="shell">
        <SectionHeading index="04" label="Experience" title="Learning by working together." />
        <article className="experience-card">
          <div className="experience-date">2026</div>
          <div>
            <h3>Technical Hub — Full Stack Development Program / Internship</h3>
            <div className="program">Full Stack Development with React Native</div>
            <p>Worked on the Sanchari project as Backend Developer &amp; Workflow Designer, as part of a six-member team.</p>
          </div>
        </article>
      </div>
    </section>
  );
}

const certifications = [
  'HackerRank SQL Basic',
  'HackerRank SQL Intermediate',
  'HackerRank Python Basic',
  'GitHub Foundations',
  'Claude Code in Action',
  'Intro to MCP',
  'Claude with Anthropic API',
  'Intro to Agent Skills',
];

function Certifications() {
  return (
    <section className="section" id="certifications">
      <div className="shell">
        <SectionHeading index="05" label="Certifications" title="Relevant learning." detail="Certificates listed as provided. Verification destinations have not been supplied." />
        <div className="cert-grid">
          {certifications.map((item, index) => <div className="cert-item" key={item}><span>{item}</span><span className="cert-mark">{String(index + 1).padStart(2, '0')}</span></div>)}
        </div>
        <div className="cert-caption">Verification links can be added when available.</div>
      </div>
    </section>
  );
}

function ProblemSolving() {
  return (
    <section className="section">
      <div className="shell">
        <SectionHeading index="06" label="Practice" title="Problem solving, in progress." />
        <div className="practice-row">
          <div><h3>Data Structures &amp; Algorithms</h3><p>I practice DSA and programming problems while strengthening core problem-solving fundamentals.</p></div>
          <div className="practice-symbol" aria-hidden="true"><Braces size={20} /></div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section" id="contact">
      <div className="shell">
        <div className="contact-box">
          <div className="eyebrow">07 / Contact</div>
          <h2>Open to software engineering opportunities.</h2>
          <p>Interested in Java development, backend development, REST APIs, SQL and software engineering roles.</p>
          <div className="contact-options">
            <a className="button button-quiet" href={githubUrl} target="_blank" rel="noreferrer"><Github size={14} /> GitHub <ArrowUpRight size={12} /></a>
            <span className="contact-placeholder"><ArrowUpRight size={12} /> LinkedIn URL not provided</span>
            <span className="contact-placeholder"><Mail size={13} /> Email address not provided</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="shell"><div className="facts-strip">
          <div className="fact"><span className="fact-label">Education</span><span className="fact-value">B.Tech · Artificial Intelligence &amp; Machine Learning</span></div>
          <div className="fact"><span className="fact-label">Core focus</span><span className="fact-value">Java · Backend · REST APIs · SQL</span></div>
          <div className="fact"><span className="fact-label">Currently strengthening</span><span className="fact-value">Java · OOP · DSA · Networking</span></div>
        </div></div>
        <About /><Skills /><Projects /><Experience /><Certifications /><ProblemSolving /><Contact />
      </main>
      <Footer />
    </>
  );
}

function CaseStudy() {
  useEffect(() => {
    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    const previousTitle = document.title;
    const previousDescription = description?.content;

    document.title = 'SafeCampus Case Study | Sai Priya Korupolu';
    if (description) {
      description.content =
        'A case study of SafeCampus, a campus surveillance concept using computer vision, with its current implementation, planned features, and technology stack.';
    }

    return () => {
      document.title = previousTitle;
      if (description && previousDescription) {
        description.content = previousDescription;
      }
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className="case-hero shell">
          <Link href="/#projects" className="back-link"><ArrowLeft size={14} /> Back to projects</Link>
          <div className="eyebrow">Project case study · 01</div>
          <h1 className="case-title">SafeCampus — AI-Powered Campus Surveillance</h1>
          <p className="case-lede">A campus surveillance concept that explores using computer vision to identify predefined objects and suspicious events, with the goal of surfacing alerts sooner than retrospective footage review.</p>
          <div className="case-actions">
            <a className="button button-primary" href={githubUrl} target="_blank" rel="noreferrer"><Github size={14} /> View on GitHub <ArrowUpRight size={12} /></a>
          </div>
          <div className="case-metadata">
            <div className="case-meta"><span>Project</span><strong>AI-powered campus surveillance concept</strong></div>
            <div className="case-meta"><span>Technologies</span><strong>Python · OpenCV · YOLO · Flutter · SQLite</strong></div>
            <div className="case-meta"><span>Current status</span><strong>UI/design and AI detection workflow</strong></div>
          </div>
        </section>
        <div className="shell case-layout">
          <div className="case-content">
            <section>
              <div className="eyebrow">01 / Problem</div>
              <h2>Reviewing footage after the fact is not immediate.</h2>
              <p>Campus CCTV footage can require later review to identify objects or suspicious events. SafeCampus is designed around the idea of analyzing footage and generating immediate alerts, rather than relying only on recorded footage review.</p>
            </section>
            <section>
              <div className="eyebrow">02 / Solution</div>
              <h2>Bring detection and event visibility into one workflow.</h2>
              <p>The concept combines an AI detection workflow with a user interface for alerts and event history. It is intended to identify predefined objects and events in CCTV footage and make relevant activity easier to surface.</p>
              <p>This project is a work in progress; the listed capabilities describe its intended feature scope and are not all claimed as fully implemented.</p>
            </section>
            <section>
              <div className="eyebrow">03 / Features</div>
              <h2>Planned detection and response capabilities.</h2>
              <ul>
                <li>Object detection</li>
                <li>Suspicious-event detection</li>
                <li>Unauthorized-access detection</li>
                <li>Face-recognition events</li>
                <li>Overcrowding detection</li>
                <li>Alert generation</li>
                <li>Event history</li>
              </ul>
            </section>
            <section>
              <div className="eyebrow">04 / Current implementation</div>
              <h2>UI, design and AI detection workflow.</h2>
              <p>The current project includes the UI/design and AI detection workflow. The Flask backend is planned / in development and is not presented as fully implemented.</p>
              <p>The project is built around Python, OpenCV and YOLO for AI/computer vision, with Flutter and SQLite also included in its technology stack.</p>
            </section>
            <section>
              <div className="eyebrow">05 / Future improvements</div>
              <h2>Continue toward a connected campus-safety workflow.</h2>
              <p>Planned development includes the Flask backend and continued work toward the listed detection, alert-generation and event-history capabilities.</p>
            </section>
          </div>
          <aside className="case-aside">
            <div className="aside-panel">
              <h3>Technology stack</h3>
              <div className="tag-list">{['Python', 'OpenCV', 'YOLO', 'Flutter', 'SQLite'].map((item) => <span className="tag" key={item}>{item}</span>)}</div>
              <div className="aside-note"><strong>Implementation note</strong><br />Flask backend is planned / in development. Features are not all represented as completed.</div>
              <a className="button button-quiet" href={githubUrl} target="_blank" rel="noreferrer" style={{ marginTop: 18, width: '100%' }}><Github size={14} /> GitHub repository <ArrowUpRight size={12} /></a>
            </div>
          </aside>
        </div>
        <div className="shell"><div className="case-footer">
          <div><h3>Explore the project repository</h3><p>GitHub repository for SafeCampus.</p></div>
          <a className="button button-primary" href={githubUrl} target="_blank" rel="noreferrer">Open GitHub <ArrowUpRight size={13} /></a>
        </div></div>
      </main>
      <Footer />
    </>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/projects/safecampus" component={CaseStudy} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;