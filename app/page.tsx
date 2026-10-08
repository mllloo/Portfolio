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
  ["Digital NEST", "Software Design Engineer Associate", "Aug 2026 — now", "React · Node.js · SQL · WordPress"],
  ["BrincaJumpers", "Owner", "Mar 2024 — now", "Branding · Operations · Client communication"],
  ["Raíces y Cariños", "Social Media & Web Manager Intern", "Oct 2024 — Jun 2025", "Web content · Accessibility · Social media"],
];

export default function Page() {
  const [sent, setSent] = useState(false);
  const skillTrackRef = useRef<HTMLDivElement | null>(null);
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
      <header className="reference-nav"><a className="reference-logo" href="#home"><span>MR</span> Millonoel <b>Rodriguez</b></a><nav><a href="#about">About</a><a href="#work">Work</a><a href="#skills">Skills</a><a href="#contact">Contact</a></nav><a className="menu-label" href="#contact">Get in touch <span>↗</span></a><button className="menu-button" aria-label="Open menu">☰</button></header>

      <section id="home" className="reference-hero"><div className="hero-inner"><div className="hero-intro"><span className="tiny-label">SOFTWARE DEVELOPER / DESIGNER</span><h1>I&apos;m Millonoel,<br /><span>a Software Developer</span></h1><p>I build clear, useful digital experiences for local businesses and ambitious ideas — from first concept to a polished launch.</p><a className="round-arrow" href="#about">↓</a></div><div className="hero-portrait" aria-label="Portrait of Millonoel Rodriguez"><Image className="hero-person" src="/hero-portrait-enhanced.png" alt="Millonoel Rodriguez" width={700} height={1000} priority /><span className="portrait-caption">BASED IN<br /><b>WATSONVILLE, CA</b></span></div><div className="hero-about"><span className="tiny-label">ABOUT ME</span><p>Software engineering student and builder with a focus on web development, design, and thoughtful client work.</p><a href="#about">Learn more ↗</a><span className="tiny-label hero-follow">FOLLOW ME</span><div className="social-row"><a href="https://github.com/mllloo" target="_blank" rel="noreferrer">GH</a><a href="https://www.linkedin.com/in/millonoelrodriguez" target="_blank" rel="noreferrer">in</a><a href="mailto:millgotwork@gmail.com">@</a></div></div></div></section>

      <section id="about" className="reference-band about-band"><div className="section-kicker">ABOUT ME</div><div className="band-copy"><h2>I&apos;ve been developing<br />websites <span>since 2024.</span></h2><p>I combine technical problem-solving with design, communication, and entrepreneurship to create work that helps people reach, inspire, and connect.</p><a href="/resume.pdf">More about me ↗</a></div><div className="stats"><div><strong>02</strong><span>Years of<br />experience</span></div><div><strong>150+</strong><span>Businesses<br />supported</span></div></div><div className="client-strip"><span>PREVIOUSLY WORKED ON</span><b>✦ Digital NEST</b><b>✦ BrincaJumpers</b><b>✦ Raíces y Cariños</b><b>✦ Local businesses</b></div></section>

      <section id="skills" className="reference-section skills-section"><div className="section-heading-reference"><span className="tiny-label">MY SKILLS</span><h2>My extensive list of skills</h2><div className="slider-arrows"><button aria-label="Previous skill" onClick={() => nudgeSkills(1)}>‹</button><button aria-label="Next skill" onClick={() => nudgeSkills(-1)}>›</button></div></div><div className="skill-carousel" aria-label="Skills carousel" onMouseEnter={() => { skillPausedRef.current = true; }} onMouseLeave={() => { skillPausedRef.current = false; }}><div className="skill-track" ref={skillTrackRef}>{[...skills, ...skills].map(([title, copy], index) => <article className="skill-card" key={`${title}-${index}`} aria-hidden={index >= skills.length}><span className="skill-icon">{index % skills.length === 0 ? "▣" : index % skills.length === 1 ? "JS" : index % skills.length === 2 ? "⚛" : index % skills.length === 3 ? "JS" : "W"}</span><h3>{title}</h3><p>{copy}</p><span className="skill-line" /></article>)}</div></div></section>

      <section id="work" className="reference-section projects-section"><div className="section-heading-reference"><span className="tiny-label">MY PORTFOLIO</span><h2>Take a look at the latest<br />projects I&apos;ve done</h2><a className="section-link" href="https://millologistic.tech/" target="_blank" rel="noreferrer">Browse all projects ↗</a></div><div className="reference-project-grid">{projects.map(([title, copy, category, theme], index) => <a className={`reference-project ${theme}`} href={projectLinks[index]} target={index < 3 ? "_blank" : undefined} rel={index < 3 ? "noreferrer" : undefined} key={title}><span className="project-top"><small>{category}</small><b>↗</b></span><div className="project-window"><div className="browser-header"><span className="browser-dots"><i /><i /><i /></span><span className="browser-address">{projectDomains[index]}</span></div><div className="browser-page"><strong>{title}</strong><span className="window-copy">{copy}</span><span className="window-button">{index === 3 ? "Explore the concept →" : "View project →"}</span></div></div><span className="project-title">{title}</span></a>)}</div></section>

      <section className="reference-band experience-band"><div className="section-kicker">EXPERIENCE</div><div className="experience-content"><span className="tiny-label">RECENT EXPERIENCE</span><h2>Building useful work<br />for <span>real people.</span></h2>{experience.map(([company, role, date, tools]) => <div className="experience-row" key={company}><div><b>{company}</b><span>{role}</span></div><div><span>{date}</span><small>{tools}</small></div></div>)}</div></section>

      <section className="reference-section articles-section"><div className="section-heading-reference"><span className="tiny-label">WHAT I&apos;M LEARNING</span><h2>Notes on code,<br />design, and building.</h2><a className="section-link" href="mailto:millgotwork@gmail.com?subject=Let%27s%20talk">Get in touch ↗</a></div><div className="article-list"><a href="#contact"><span>OCT 07, 2026 · WEB DEVELOPMENT</span><strong>How I think about building websites people trust ↗</strong></a><a href="#contact"><span>SEP 18, 2026 · DESIGN</span><strong>Why clearer interfaces create better conversations ↗</strong></a><a href="#contact"><span>AUG 12, 2026 · BUSINESS</span><strong>Lessons from building a service business from scratch ↗</strong></a></div></section>

      <section className="reference-section snippets-section"><div className="section-heading-reference"><span className="tiny-label">EXPERIMENTS</span><h2>Small builds,<br />useful ideas.</h2><a className="section-link" href="https://github.com/mllloo" target="_blank" rel="noreferrer">Browse my GitHub ↗</a></div><div className="snippet-grid"><div><span>01 · AI / LEARNING</span><strong>Know</strong><code>active recall<br />→ better review timing</code></div><div><span>02 · BRAND</span><strong>BrincaJumpers</strong><code>brand.system<br />→ clear + memorable</code></div><div><span>03 · WEB</span><strong>Lead generator</strong><code>design → trust<br />trust → contact</code></div></div></section>

      <section id="contact" className="reference-contact"><div><span className="tiny-label">LET&apos;S WORK TOGETHER</span><h2>Interested in<br /><span>working together?</span><br />Let&apos;s talk →</h2></div><form onSubmit={sendMessage}><input required name="name" placeholder="Enter your name" /><input required name="email" type="email" placeholder="Your email address" /><textarea required name="message" placeholder="Describe your project" /><button type="submit">{sent ? "Opening mail app…" : "Contact me →"}</button></form></section>

      <footer className="reference-footer"><div className="footer-person"><span>MR</span><div><b>Millonoel Rodriguez</b><small>Software Engineer &amp; Designer</small></div></div><div><h3>Get in touch <span>→</span></h3><a href="mailto:millgotwork@gmail.com">millgotwork@gmail.com</a><a href="tel:8313534027">(831) 353-4027</a></div><div><h3>Navigate</h3><a href="#home">Home</a><a href="#work">Portfolio</a><a href="#contact">Contact</a></div><div className="copyright">© 2026 Millonoel Rodriguez<br />Built with intention.</div></footer>
    </main>
  );
}
