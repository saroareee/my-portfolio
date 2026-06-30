export default function Projects() {
  const projects = [
    { title: "EstimateIQ", desc: "AI Video Generation Pipeline." },
    { title: "AI Recruitment Engine", desc: "Automated CV parsing & scoring." },
    { title: "WhatsApp Order Bot", desc: "F&B automated ordering system." }
  ];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-10 text-center">Featured Projects</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <div key={i} className="p-6 bg-slate-100 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">{p.title}</h3>
              <p className="text-slate-600">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}