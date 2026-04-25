import { Mail, Github, Linkedin, MapPin, Phone, FileDown } from "lucide-react";

const RESUME_URL =
  "https://drive.google.com/file/d/1KfxjjiMhkdyFT5klRtLHIW6HysfmD5mc/view?usp=sharing";

const LINKS = [
  {
    icon: Mail,
    label: "Email",
    value: "shindetanmay282@gmail.com",
    href: "mailto:shindetanmay282@gmail.com",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/Tanny28",
    href: "https://github.com/Tanny28",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/tanmay-shinde-840a05340",
    href: "https://www.linkedin.com/in/tanmay-shinde-840a05340/",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "available on request",
    href: undefined,
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Pune, India",
    href: undefined,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative min-h-screen px-6 py-24 flex flex-col items-center justify-center"
    >
      <div className="max-w-3xl w-full text-center space-y-8">
        <div className="font-mono text-xs text-accent tracking-widest">
          // LET&apos;S BUILD
        </div>

        <h2 className="font-sans text-4xl md:text-6xl font-bold tracking-tight leading-tight">
          Currently looking for{" "}
          <span className="text-accent">AI Engineer / Gen AI internships</span>.
        </h2>

        <p className="text-foreground/80 max-w-2xl mx-auto leading-relaxed">
          Graduating 2027. Open to remote, hybrid, or Pune-based roles. If
          you&apos;re shipping production AI, I want in.
        </p>

        <div className="grid sm:grid-cols-2 gap-3 pt-4 text-left">
          {LINKS.map(({ icon: Icon, label, value, href }) => {
            const inner = (
              <div className="group flex items-center gap-3 p-4 rounded-md border border-border bg-card/60 hover:border-accent/60 transition-colors">
                <div className="size-9 rounded-md border border-border flex items-center justify-center group-hover:border-accent/60">
                  <Icon className="size-4 text-accent" />
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
                    {label}
                  </div>
                  <div className="font-mono text-sm truncate">{value}</div>
                </div>
              </div>
            );
            return href ? (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
              >
                {inner}
              </a>
            ) : (
              <div key={label}>{inner}</div>
            );
          })}
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href="mailto:shindetanmay282@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-accent text-background font-mono text-sm font-medium hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-shadow"
          >
            <Mail className="size-4" /> shindetanmay282@gmail.com
          </a>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-accent/60 text-accent font-mono text-sm font-medium hover:bg-accent/10 transition-colors"
          >
            <FileDown className="size-4" /> Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
