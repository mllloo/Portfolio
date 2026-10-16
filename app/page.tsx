"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";

const skills = [
  ["HTML & CSS", "Responsive interfaces and reusable design systems."],
  ["JavaScript", "Interactive web experiences with clean UI states."],
  ["React", "Component-driven applications for real clients."],
  ["Node.js", "Practical APIs, integrations, and backend workflows."],
  ["WordPress", "Professional websites that clients can manage."],
];

const projects = [
  ["MilloLogistic", "Marketing and logistics website for local businesses.", "Web design", "lime"],
  ["Burgoa Painting", "A modern lead-generation site for a painting contractor.", "Client website", "blue"],
  ["JM Custom Painting", "A professional service website built to make contact simple.", "Client website", "purple"],
  ["Know", "An adaptive learning OS with active recall, personalized review timing, AI lesson generation, and wearable-aware study experiments.", "Product concept · MVP", "orange"],
];

const projectDomains = ["millologistic.tech", "ivanthepainter.com", "jmcustompainting.com", "know · adaptive learning"];
const projectLinks = ["https://millologistic.tech/", "https://ivanthepainter.com/", "https://jmcustompainting.com/", "#contact"];

const experience = [
  ["Digital NEST", "Software Design Engineer Associate", "Aug 2026 — now", "React · Node.js · SQL · WordPress", "Building responsive websites and software solutions for real-world clients."],
  ["BrincaJumpers", "Owner", "Mar 2024 — now", "Branding · Operations · Client communication", "Growing a local event-rental business from brand identity through day-of operations."],
  ["Raíces y Cariños", "Social Media & Web Manager Intern", "Oct 2024 — Jun 2025", "Web content · Accessibility · Social media", "Restructuring content and creating accessible digital experiences for the organization."],
];

function TypewriterText({ children }: { children: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.55 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) {
      const reset = window.setTimeout(() => setText(""), 0);
      return () => window.clearTimeout(reset);
    }
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setText(children.slice(0, index));
      if (index >= children.length) window.clearInterval(timer);
    }, 38);
    return () => window.clearInterval(timer);
  }, [children, isVisible]);

  return <span ref={ref} className="typewriter-copy" aria-label={children}>{text}<span className={`typewriter-caret${text.length >= children.length ? " complete" : ""}`} aria-hidden="true" /></span>;
}

function AnimatedStat({ value, suffix, label }: { value: number; suffix?: string; label: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStarted(true);
        observer.disconnect();
      }
    }, { threshold: 0.65 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 1400;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, value]);

  return <div ref={ref}><strong>{String(count).padStart(value < 10 ? 2 : 1, "0")}{suffix}</strong><span>{label}</span></div>;
}

export default function Page() {
  const [sent, setSent] = useState(false);
  const skillTrackRef = useRef<HTMLDivElement | null>(null);
  const experienceRef = useRef<HTMLElement | null>(null);
  const [experienceVisible, setExperienceVisible] = useState(false);
  const [activeExperience, setActiveExperience] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const skillOffsetRef = useRef(0);
  const skillPausedRef = useRef(false);

  useEffect(() => {
    let frame = 0;
    let previous = performance.now();
    const animate = (now: number) => {
      const track = skillTrackRef.current;
      const halfWidth = track ? track.scrollWidth / 2 : 0;
      if (track && !skillPausedRef.current) {
        skillOffsetRef.current -= (now - previous) * 0.035;
        if (halfWidth && Math.abs(skillOffsetRef.current) >= halfWidth) skillOffsetRef.current = 0;
        track.style.transform = `translate3d(${skillOffsetRef.current}px, 0, 0)`;
      }
      previous = now;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const section = experienceRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setExperienceVisible(entry.isIntersecting), { threshold: 0.18 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const nudgeSkills = (direction: number) => {
    skillOffsetRef.current += direction * 260;
    const track = skillTrackRef.current;
    if (track) track.style.transform = `translate3d(${skillOffsetRef.current}px, 0, 0)`;
  };
  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio inquiry from ${data.get("name") || "a visitor"}`);
    const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`);
    window.location.href = `mailto:millgotwork@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <main className="reference-site">
      <header className="reference-nav"><a className="reference-logo" href="#home"><span>MR</span> Millonoel <b>Rodriguez</b></a><nav className={mobileMenuOpen ? "mobile-open" : ""} onClick={() => setMobileMenuOpen(false)}><a href="#about">About</a><a href="#work">Work</a><a href="#skills">Skills</a><a href="#contact">Contact</a></nav><a className="menu-label" href="#contact">Get in touch <span>↗</span></a><button className={`menu-button${mobileMenuOpen ? " is-open" : ""}`} aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((open) => !open)}><span /><span /></button></header>

      <section id="home" className="reference-hero"><div className="hero-inner"><div className="hero-intro"><span className="tiny-label">SOFTWARE DEVELOPER / DESIGNER</span><h1>I&apos;m Millonoel,<br /><span>a Software Developer</span></h1><p>I build clear, useful digital experiences for local businesses and ambitious ideas — from first concept to a polished launch.</p><a className="round-arrow" href="#about">↓</a></div><div className="hero-portrait" aria-label="Portrait of Millonoel Rodriguez"><Image className="hero-person" src="/hero-portrait-enhanced.png" alt="Millonoel Rodriguez" width={700} height={1000} priority /><span className="portrait-caption">BASED IN<br /><b>WATSONVILLE, CA</b></span></div><div className="hero-about"><span className="tiny-label">ABOUT ME</span><p>Software engineering student and builder with a focus on web development, design, and thoughtful client work.</p><a href="#about">Learn more ↗</a><span className="tiny-label hero-follow">FOLLOW ME</span><div className="social-row"><a href="https://github.com/mllloo" target="_blank" rel="noreferrer">GH</a><a href="https://www.linkedin.com/in/millonoelrodriguez" target="_blank" rel="noreferrer">in</a><a href="mailto:millgotwork@gmail.com">@</a></div></div></div></section>

      <section id="about" className="reference-band about-band"><div className="section-kicker">ABOUT ME</div><div className="band-copy"><h2><TypewriterText>I&apos;ve been developing websites since 2024.</TypewriterText></h2><p>I combine technical problem-solving with design, communication, and entrepreneurship to create work that helps people reach, inspire, and connect.</p><a href="/resume.pdf" target="_blank" rel="noreferrer">View my résumé ↗</a></div><div className="stats"><AnimatedStat value={2} label={<>Years of<br />experience</>} /><AnimatedStat value={150} suffix="+" label={<>Businesses<br />supported</>} /></div><div className="client-strip"><span>PREVIOUSLY WORKED ON</span><b>✦ Digital NEST</b><b>✦ BrincaJumpers</b><b>✦ Raíces y Cariños</b><b>✦ Local businesses</b></div></section>

      <section id="skills" className="reference-section skills-section"><div className="section-heading-reference"><span className="tiny-label">MY SKILLS</span><h2>My extensive list of skills</h2><div className="slider-arrows"><button aria-label="Previous skill" onClick={() => nudgeSkills(1)}>‹</button><button aria-label="Next skill" onClick={() => nudgeSkills(-1)}>›</button></div></div><div className="skill-carousel" aria-label="Skills carousel" onMouseEnter={() => { skillPausedRef.current = true; }} onMouseLeave={() => { skillPausedRef.current = false; }}><div className="skill-track" ref={skillTrackRef}>{[...skills, ...skills].map(([title, copy], index) => <article className="skill-card" key={`${title}-${index}`} aria-hidden={index >= skills.length}><span className="skill-icon">{index % skills.length === 0 ? "▣" : index % skills.length === 1 ? "JS" : index % skills.length === 2 ? "⚛" : index % skills.length === 3 ? "JS" : "W"}</span><h3>{title}</h3><p>{copy}</p><span className="skill-line" /></article>)}</div></div></section>

      <section id="work" className="reference-section projects-section"><div className="section-heading-reference"><span className="tiny-label">MY PORTFOLIO</span><h2>Take a look at the latest<br />projects I&apos;ve done</h2><a className="section-link" href="https://millologistic.tech/" target="_blank" rel="noreferrer">Browse all projects ↗</a></div><div className="reference-project-grid">{projects.map(([title, copy, category, theme], index) => <a className={`reference-project ${theme}`} href={projectLinks[index]} target={index < 3 ? "_blank" : undefined} rel={index < 3 ? "noreferrer" : undefined} key={title}><span className="project-top"><small>{category}</small><b>↗</b></span>{index < 3 ? <div className="project-window live-project-window"><iframe className="live-preview" src={projectLinks[index]} title={`${title} live preview`} loading="lazy" tabIndex={-1} aria-hidden="true" /></div> : <div className="project-window"><div className="browser-header"><span className="browser-dots"><i /><i /><i /></span><span className="browser-address">{projectDomains[index]}</span></div><div className="browser-page"><strong>{title}</strong><span className="window-copy">{copy}</span><span className="window-button">Explore the concept →</span></div></div>}<span className="project-title">{title}</span></a>)}</div></section>

      <section ref={experienceRef} className={`reference-band experience-band${experienceVisible ? " experience-active" : ""}`}><div className="section-kicker">EXPERIENCE</div><div className="experience-content"><span className="tiny-label">RECENT EXPERIENCE</span><h2>Building useful work<br />for <span>real people.</span></h2>{experience.map(([company, role, date, tools, detail], index) => <div className={`experience-row${activeExperience === index ? " is-active" : ""}`} key={company} role="button" tabIndex={0} aria-expanded={activeExperience === index} onClick={() => setActiveExperience(index)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActiveExperience(index); } }}><div><b>{company}</b><span>{role}</span><em className="experience-detail">{detail}</em></div><div><span>{date}</span><small>{tools}</small></div><i aria-hidden="true">↗</i></div>)}</div></section>

      <section className="reference-section articles-section"><div className="section-heading-reference"><span className="tiny-label">WHAT I&apos;M LEARNING</span><h2>Notes on code,<br />design, and building.</h2><a className="section-link" href="mailto:millgotwork@gmail.com?subject=Let%27s%20talk">Get in touch ↗</a></div><div className="article-list"><a href="#contact"><span className="article-index">01</span><div className="article-copy"><span>OCT 07, 2026 <b>·</b> WEB DEVELOPMENT</span><strong>How I think about building websites people trust</strong></div><i aria-hidden="true">↗</i></a><a href="#contact"><span className="article-index">02</span><div className="article-copy"><span>SEP 18, 2026 <b>·</b> DESIGN</span><strong>Why clearer interfaces create better conversations</strong></div><i aria-hidden="true">↗</i></a><a href="#contact"><span className="article-index">03</span><div className="article-copy"><span>AUG 12, 2026 <b>·</b> BUSINESS</span><strong>Lessons from building a service business from scratch</strong></div><i aria-hidden="true">↗</i></a></div></section>

      <section className="reference-section snippets-section"><div className="section-heading-reference"><span className="tiny-label">EXPERIMENTS</span><h2>Small builds,<br />useful ideas.</h2><a className="section-link" href="https://github.com/mllloo" target="_blank" rel="noreferrer">Browse my GitHub ↗</a></div><div className="snippet-grid"><div className="snippet-card snippet-card-blue"><span className="snippet-meta">01 <b>·</b> AI / LEARNING</span><span className="snippet-icon">✦</span><strong>Know</strong><p>active recall<br />→ better review timing</p><span className="snippet-action">Concept in progress <i>↗</i></span></div><div className="snippet-card snippet-card-lime"><span className="snippet-meta">02 <b>·</b> BRAND</span><span className="snippet-icon">✳</span><strong>BrincaJumpers</strong><p>brand.system<br />→ clear + memorable</p><span className="snippet-action">Business system <i>↗</i></span></div><div className="snippet-card snippet-card-coral"><span className="snippet-meta">03 <b>·</b> WEB</span><span className="snippet-icon">↗</span><strong>Lead generator</strong><p>design → trust<br />trust → contact</p><span className="snippet-action">Web experiment <i>↗</i></span></div></div></section>

      <section id="contact" className="reference-contact"><div><span className="tiny-label">LET&apos;S WORK TOGETHER</span><h2>Interested in<br /><span>working together?</span><br />Let&apos;s talk →</h2></div><form onSubmit={sendMessage}><input required name="name" placeholder="Enter your name" /><input required name="email" type="email" placeholder="Your email address" /><textarea required name="message" placeholder="Describe your project" /><button type="submit">{sent ? "Opening mail app…" : "Contact me →"}</button></form></section>

      <footer className="reference-footer"><div className="footer-person"><span>MR</span><div><b>Millonoel Rodriguez</b><small>Software Engineer &amp; Designer</small></div></div><div><h3>Get in touch <span>→</span></h3><a href="mailto:millgotwork@gmail.com">millgotwork@gmail.com</a><a href="tel:8313534027">(831) 353-4027</a></div><div><h3>Find me online</h3><a href="https://github.com/mllloo" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/millonoelrodriguez" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="/resume.pdf" target="_blank" rel="noreferrer">Résumé ↗</a></div><div className="copyright">© 2026 Millonoel Rodriguez<br />Built with intention.</div></footer>
    </main>
  );
}
