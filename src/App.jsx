import React, { useState } from 'react';

const NEXFLOW_EMAIL = "saroareee@gmail.com";
const NEXFLOW_WHATSAPP = "8801917559574";
const NEXFLOW_GITHUB = "https://github.com/saroareee";
const NEXFLOW_LINKEDIN = "https://www.linkedin.com/feed/";

const FAQ_DATA = [
  {
    question: "What services do you offer?",
    answer: "I build n8n automation workflows: AI chatbots, lead scraping, social media automation, invoice extraction, and recruitment systems. Check the Services section above for details."
  },
  {
    question: "How much does a project cost?",
    answer: "Pricing depends on complexity. Simple automations start around $150, while complex multi-flow systems like recruitment engines can range $500-2000+. Send a message with your project details for an accurate quote."
  },
  {
    question: "How long does a project take?",
    answer: "Simple workflows take 2-4 days. Complex systems with multiple integrations typically take 1-3 weeks. I'll give you a clear timeline after understanding your requirements."
  },
  {
    question: "What's your experience?",
    answer: "I'm an AI Automation Engineer specializing in n8n. I've built production workflows for garment industry HR, restaurant lead generation, WhatsApp commerce bots, and AI content pipelines."
  },
  {
    question: "Do you offer ongoing support?",
    answer: "Yes, I offer monthly maintenance plans for workflows that need regular updates, monitoring, or scaling. We can discuss this based on your project."
  },
  {
    question: "How do I get started?",
    answer: "Fill out the form on this page with your project details, or message me directly on WhatsApp for a faster response."
  }
];




function EmailButton({ email }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-4 p-4 bg-slate-800 text-slate-200 rounded-xl border border-slate-700 font-bold hover:border-blue-500 transition w-full text-left"
    >
      <span className="text-xl">✉️</span>
      <span className="flex-1">{copied ? "Email copied!" : "Email Me"}</span>
      {!copied && <span className="text-xs text-slate-400">{email}</span>}
    </button>
  );
}







function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm NexFlow's assistant. Ask me anything below." }
  ]);

  const askQuestion = (faq) => {
    setMessages((prev) => [
      ...prev,
      { from: "user", text: faq.question },
      { from: "bot", text: faq.answer }
    ]);
  };

  return (
    <>
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes bounce-in {
          0% { transform: scale(0.8) translateY(20px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .chat-pulse::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          animation: pulse-ring 2s ease-out infinite;
        }
        .chat-window-anim {
          animation: bounce-in 0.3s ease-out;
        }
      `}</style>

      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-[34rem] bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden chat-window-anim">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              <span className="text-white font-bold">NexFlow Assistant</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-white text-xl leading-none hover:text-blue-100 transition">×</button>
          </div>

          {/* Chat messages - এই অংশ scroll হবে */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm rounded-xl px-3 py-2 max-w-[85%] ${
                  m.from === "bot"
                    ? "bg-slate-700 text-slate-200 self-start"
                    : "bg-blue-600 text-white self-end ml-auto"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* FAQ questions - সবসময় fixed/visible থাকবে */}
          <div className="border-t border-slate-700 p-3 space-y-2 shrink-0 max-h-44 overflow-y-auto bg-slate-800/50">
            {FAQ_DATA.map((faq, i) => (
              <button
                key={i}
                onClick={() => askQuestion(faq)}
                className="w-full text-left text-xs bg-slate-700 hover:bg-blue-600 text-slate-300 hover:text-white rounded-lg px-3 py-2 transition-colors"
              >
                {faq.question}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-50">
        {!open && <div className="chat-pulse absolute inset-0"></div>}
        <button
          onClick={() => setOpen(!open)}
          className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-xl flex items-center justify-center text-3xl hover:scale-110 active:scale-95 transition-transform"
          aria-label="Open chat"
        >
          {open ? <span className="text-white text-2xl">×</span> : "🤖"}
        </button>
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
        )}
      </div>
    </>
  );
}

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', project: '' });
  const [formStatus, setFormStatus] = useState('');

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const webhookUrl = 'https://parchment-outflank-pessimism.ngrok-free.dev/webhook/portfolio-contact';
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', phone: '', project: '' });
      }
    } catch (e) { setFormStatus('error'); }
  };

  const projects = [
    { title: "HR Auto-Pilot", desc: "AI Recruitment Engine.", tech: "Gemini 2.5 Flash", link: "https://www.youtube.com/watch?v=z_StDHU_be8" },
    { title: "Ira's Cake WhatsApp Bot", desc: "WhatsApp Order Bot.", tech: "WhatsApp API", link: "https://www.youtube.com/watch?v=zMw_bIYogLQ" },
    { title: "EstimateIQ", desc: "AI Video Pipeline.", tech: "Creatomate", link: "https://www.youtube.com/watch?v=Q1JpKqvUWMs" },
    { title: "Upwork Proposal Writer", desc: "AI Proposal Bot.", tech: "Telegram Bot", link: "" },
    { title: "Counting Shikhar", desc: "Educational Video Gen.", tech: "Video API", link: "" },
    { title: "Social Media Auto", desc: "Auto-posting Bot.", tech: "Perplexity", link: "" }
  ];

  const techStack = ["n8n", "Claude.ai", "Gemini 2.5", "OpenAI", "WhatsApp API", "Telegram", "Ngrok", "Python"];

  return (
    <div className="bg-slate-900 text-slate-300 min-h-screen">
    
 <nav className="fixed w-full top-0 z-50 bg-blue-400 shadow-lg">
  <div className="max-w-7xl mx-auto w-full flex justify-between items-center h-20">
    
    {/* Logo - container এর left edge */}
    <div className="flex items-center bg-white rounded-xl px-3 py-1.5 shadow-md">
      <img 
        src="/logo.png" 
        alt="NexFlow Logo" 
        className="h-12 w-auto object-contain"
      />
    </div>

    {/* Menu Items */}
    <div className="hidden md:flex items-center gap-6 text-base font-bold text-white">
      <a href="#about" className="hover:text-blue-100 transition">About</a>
      <a href="#experience" className="hover:text-blue-100 transition">Experience</a>
      <a href="#services" className="hover:text-blue-100 transition">Services</a>
      <a href="#techstack" className="hover:text-blue-100 transition">Tech Stack</a>
      <a href="#projects" className="hover:text-blue-100 transition">Projects</a>
      <a href="#contact" className="hover:text-blue-100 transition">Contact</a>
      <a href="#order" className="bg-white hover:bg-slate-100 px-6 py-2 rounded-full text-blue-600 font-bold transition shadow">Order Now</a>
    </div>
    
  </div>
</nav>
{/* Hero Section */}
<header 
  id="about" 
  className="relative min-h-screen flex items-center pt-20 px-6 bg-cover bg-center" 
  style={{ backgroundImage: "url('/automation-bg.jpg')" }}
>
  <style>{`
    @keyframes dim-light {
      0%, 100% { opacity: 1; filter: brightness(1); }
      50% { opacity: 0.6; filter: brightness(0.6); }
    }
    .animate-dim-light {
      animation: dim-light 4s ease-in-out infinite;
    }
  `}</style>

  <div className="absolute inset-0 bg-gray-900/70"></div>

  <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 w-full">
    
    <div className="flex-1">
      <h1 className="text-6xl font-bold mb-6 leading-tight animate-dim-light text-blue-500">
        Automate the Future with AI
      </h1>
      <p className="text-gray-200 mb-8 max-w-lg text-lg">
        Md Golam Saroar, an AI Automation Engineer, building intelligent systems for scalable results.
      </p>
      <a href="#order" className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg">
        Start Project
      </a>
    </div>

    <div className="flex-1 flex justify-center md:justify-end">
      <div className="w-full max-w-sm aspect-[4/5] rounded-2xl shadow-2xl overflow-hidden border-2 border-white/20">
        <img 
          src="/confident-portrait.jpeg" 
          className="w-full h-full object-cover" 
          alt="Md Golam Saroar" 
        />
      </div>
    </div>
    
  </div>
</header>

{/* Work Experience Section */}
<section id="experience" className="py-24 px-6 bg-gray-950 text-white">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-4xl font-bold text-center mb-16">Work Experience</h2>

    <div className="grid md:grid-cols-3 gap-8">
      
      <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl shadow-lg flex flex-col h-full">
        <div className="mb-6">
          <div className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-semibold mb-4 border border-blue-500/20">
            Present (1 Year)
          </div>
          <h3 className="text-2xl font-bold text-white leading-tight">AI Automation Engineer</h3>
          <h4 className="text-md text-blue-400 font-medium mt-2">Upwork (Freelance)</h4>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
          Designing, building, and deploying intelligent automation workflows using n8n, OpenAI, and custom API integrations. Helping businesses streamline their processes, develop custom AI agents, and connect cross-platform systems for scalable results.
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">n8n</span>
          <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">LLMs</span>
          <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">API</span>
        </div>
      </div>

      <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl shadow-lg flex flex-col h-full">
        <div className="mb-6">
          <div className="inline-block px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs font-semibold mb-4 border border-purple-500/20">
            Previous (6 Months)
          </div>
          <h3 className="text-2xl font-bold text-white leading-tight">Senior Executive IT</h3>
          <h4 className="text-md text-purple-400 font-medium mt-2">AKH Group</h4>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
          Oversaw IT infrastructure, provided executive-level technical support, and ensured smooth operational continuity across enterprise systems.
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">SysAdmin</span>
          <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">Operations</span>
          <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">Support</span>
        </div>
      </div>

      <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl shadow-lg flex flex-col h-full">
        <div className="mb-6">
          <div className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-semibold mb-4 border border-emerald-500/20">
            Previous (4 Years)
          </div>
          <h3 className="text-2xl font-bold text-white leading-tight">IT Support</h3>
          <h4 className="text-md text-emerald-400 font-medium mt-2">TEAM GROUP</h4>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
          Managed daily IT support operations, hardware maintenance, network troubleshooting, and provided timely resolutions to ensure minimal downtime across departments.
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">Troubleshooting</span>
          <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">Networking</span>
          <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">Hardware</span>
        </div>
      </div>

    </div>
  </div>
</section>


     {/* Services Section */}
<section id="services" className="py-24 px-6 bg-white">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-4xl font-bold mb-16 text-center text-gray-900">Services</h2>
    
    <div className="grid md:grid-cols-3 gap-8">
      <div className="relative group overflow-hidden rounded-3xl h-96 shadow-lg bg-gray-800 transition-all duration-300 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{backgroundImage: "url('/service-ai.jpg')"}}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 p-8">
          <h3 className="text-2xl font-bold text-white mb-2">AI Agent Development</h3>
          <p className="text-gray-200 text-sm">Build intelligent agents that handle customer conversations and decision-making 24/7 autonomously.</p>
        </div>
      </div>

      <div className="relative group overflow-hidden rounded-3xl h-96 shadow-lg bg-gray-800 transition-all duration-300 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{backgroundImage: "url('/service-automation.jpg')"}}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 p-8">
          <h3 className="text-2xl font-bold text-white mb-2">Workflow Automation</h3>
          <p className="text-gray-200 text-sm">Streamline repetitive business tasks across your favorite apps to save time and eliminate human error.</p>
        </div>
      </div>

      <div className="relative group overflow-hidden rounded-3xl h-96 shadow-lg bg-gray-800 transition-all duration-300 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{backgroundImage: "url('/service-api.jpg')"}}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 p-8">
          <h3 className="text-2xl font-bold text-white mb-2">API Integration</h3>
          <p className="text-gray-200 text-sm">Seamlessly connect your software stacks so they talk to each other effortlessly and sync data in real-time.</p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Tech Stack Section */}
<section id="techstack" className="py-24 px-6 bg-gray-950 text-white">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-4xl font-bold text-center mb-4">Tech Stack</h2>
    <p className="text-gray-400 text-center mb-16">Technologies and tools I use to build and deploy intelligent systems</p>
    
    <div className="grid md:grid-cols-2 gap-8">
      
      <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 hover:border-blue-500/50 transition-colors">
        <h3 className="text-xl font-bold mb-6 text-blue-400">Workflow Automation</h3>
        <div className="space-y-6">
          {[
            { name: 'n8n Automation', level: '95%' },
            { name: 'Webhook Configuration', level: '90%' },
            { name: 'Logic & Routing', level: '85%' },
            { name: 'Process Optimization', level: '90%' }
          ].map((item) => (
            <div key={item.name}>
              <div className="flex justify-between mb-2 text-sm font-medium">
                <span>{item.name}</span>
                <span className="text-blue-400">{item.level}</span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: item.level }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 hover:border-purple-500/50 transition-colors">
        <h3 className="text-xl font-bold mb-6 text-purple-400">AI & LLMs</h3>
        <div className="space-y-6">
          {[
            { name: 'OpenAI (GPT-4)', level: '90%' },
            { name: 'Claude.ai', level: '85%' },
            { name: 'Google Gemini', level: '90%' },
            { name: 'AI Prompt Engineering', level: '95%' }
          ].map((item) => (
            <div key={item.name}>
              <div className="flex justify-between mb-2 text-sm font-medium">
                <span>{item.name}</span>
                <span className="text-purple-400">{item.level}</span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: item.level }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 hover:border-emerald-500/50 transition-colors">
        <h3 className="text-xl font-bold mb-6 text-emerald-400">APIs & Integrations</h3>
        <div className="space-y-6">
          {[
            { name: 'Custom API Integration', level: '95%' },
            { name: 'WhatsApp Business API', level: '90%' },
            { name: 'Telegram Bot API', level: '85%' },
            { name: 'Social Media APIs (FB, YouTube)', level: '80%' }
          ].map((item) => (
            <div key={item.name}>
              <div className="flex justify-between mb-2 text-sm font-medium">
                <span>{item.name}</span>
                <span className="text-emerald-400">{item.level}</span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: item.level }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 hover:border-pink-500/50 transition-colors">
        <h3 className="text-xl font-bold mb-6 text-pink-400">Infrastructure & Tools</h3>
        <div className="space-y-6">
          {[
            { name: 'Cloud Hosting (Railway)', level: '85%' },
            { name: 'Self-Hosting (Local Server)', level: '90%' },
            { name: 'Ngrok & Port Forwarding', level: '95%' },
            { name: 'Python & Data Parsing', level: '90%' }
          ].map((item) => (
            <div key={item.name}>
              <div className="flex justify-between mb-2 text-sm font-medium">
                <span>{item.name}</span>
                <span className="text-pink-400">{item.level}</span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-pink-500 rounded-full" style={{ width: item.level }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
</section>

     {/* Featured Projects Section */}
<section id="projects" className="py-24 px-6 bg-gray-950 text-white">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-4xl font-bold text-center mb-16">Featured Projects</h2>

    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          name: "HR Auto-Pilot Recruitment Engine",
          feature: "8-flow AI recruitment system built for a garment conglomerate. Gmail Trigger and Google Drive Trigger capture CVs from two paths — VIP referral and direct email. Gemini 2.5 Flash scores each CV on a 100-point scale across experience, skills, education and leadership. Switch nodes route candidates through quota checks, duplicate blocking via Google Sheets, and VIP fast-tracking. Interview invites go out via WhatsApp, SMS, Email and Telegram. Google Calendar Triggers handle reschedules and no-show backfills. HR controls approvals, rejections, cleanups and verdict emails from a single Telegram command center with inline buttons.",
          tools: ["Gmail", "Google Drive", "Google Sheets", "Google Calendar", "Telegram", "WhatsApp API", "SMS Gateway", "Gemini 2.5", "Webhook", "n8n"],
          link: "https://www.youtube.com/watch?v=z_StDHU_be8"
        },
        {
          name: "AI Video & Facebook Auto Post",
          feature: "Fully automated daily video pipeline. Schedule Trigger fires, Google Sheets supplies the script, Gemini 2.5 Flash breaks it into scenes and writes a Facebook caption. Code nodes build TTS prompts, Google Text-to-Speech generates the voiceover audio, HTTP Request fetches matching stock footage from Pexels API, and Google Drive stores the assets. Creatomate API renders the final video. An IF node checks render status, a Wait node polls until completion, then Facebook Graph API auto-posts the video with the AI caption. Zero manual steps from script to published post.",
          tools: ["Google Sheets", "Google Drive", "Google TTS", "Pexels API", "Creatomate", "Facebook Graph API", "Gemini 2.5", "n8n"],
          link: "https://www.youtube.com/watch?v=Q1JpKqvUWMs"
        },
        {
          name: "Ira's Cake WhatsApp Order Bot",
          feature: "End-to-end WhatsApp AI agent for a cake business. Webhook receives WhatsApp messages, the AI Agent powered by Google Gemini handles conversation with Memory Buffer Window for context. IF nodes branch for new orders, payment confirmations, and status checks. Google Sheets logs every order, reads delivery status, and appends payment records. Telegram notifies the owner with approve/reject buttons via Telegram Trigger. Three Schedule Triggers fire daily reports, delivery reminders, and monthly re-engagement messages. HTTP Request calls the WhatsApp Business API for all outgoing messages.",
          tools: ["Webhook", "WhatsApp API", "Telegram", "Google Sheets", "Gemini AI Agent", "OpenRouter", "HTTP Request", "n8n"],
          link: "https://www.youtube.com/watch?v=zMw_bIYogLQ"
        },
        {
          name: "Upwork Auto Proposal Writer",
          feature: "Telegram Trigger receives a pasted Upwork job description. Aggregate nodes consolidate portfolio data pulled from Google Sheets. HTTP Request sends both job description and portfolio to Gemini 2.5 via OpenAI-compatible endpoint for an 85%-threshold match analysis. IF nodes gate the flow — low-match jobs are rejected instantly. For strong matches, a second HTTP Request generates a fully tailored proposal. Telegram sends it back with inline approve/reject buttons. On approval, the proposal is ready to copy-paste. On rejection, it is discarded. Entire screening and writing cycle completes in under 30 seconds.",
          tools: ["Telegram", "Google Sheets", "Gemini AI", "HTTP Request", "IF", "Aggregate", "n8n"],
          link: "#"
        },
        {
          name: "Smart Invoice Data Extractor",
          feature: "Google Drive Trigger fires whenever a new file lands in the watched folder. An IF node checks the file extension — PDF or Excel. Google Drive node downloads the binary. Extract from File node parses Excel; for PDFs, the binary is base64-encoded and sent inline to Gemini 2.5 Flash via HTTP Request for multimodal extraction. Code nodes flatten nested line items, build composite deduplication keys, and infer item types. Google Sheets read checks for existing PI numbers to skip duplicates. Append node writes clean structured rows with auto-incremented serial numbers.",
          tools: ["Google Drive", "Google Sheets", "Gemini 2.5", "HTTP Request", "Extract from File", "IF", "Code (JS)", "n8n"],
          link: "#"
        },
        {
          name: "Auto Social Media Posting",
          feature: "Schedule Trigger fires daily. HTTP Request pulls live trending topics from Google Trends API. A second HTTP Request sends top trends to Perplexity AI for deep research. OpenAI GPT picks the best topic and generates platform-specific post copy. Code nodes format each post for X, Facebook and LinkedIn character limits. Split Out distributes the posts, Wait nodes space the publishing, then HTTP Requests hit Facebook Graph API, LinkedIn API and Twitter/X API to publish simultaneously. Google Sheets logs every published post with timestamp.",
          tools: ["Google Trends API", "Perplexity AI", "OpenAI GPT", "Facebook Graph API", "LinkedIn API", "Twitter/X API", "Google Sheets", "n8n"],
          link: "#"
        },
        {
          name: "AI Content Topic Generator",
          feature: "Runs on both Schedule Trigger and Manual Trigger. HTTP Request fetches trending search data from SerpAPI. Code nodes parse the response and build a structured prompt. OpenRouter AI generates a batch of fresh content topic ideas with titles, angles and target keywords. A second Code node deduplicates the new ideas against existing topics already stored in Google Sheets. Only net-new topics pass the filter and get appended to the sheet via Google Sheets append node — keeping the topic bank clean and growing daily without any manual research.",
          tools: ["SerpAPI", "OpenRouter", "Google Sheets", "HTTP Request", "Code (JS)", "Schedule Trigger", "n8n"],
          link: "#"
        },
        {
          name: "Automated Keyword Pipeline",
          feature: "Google Sheets Trigger activates when a topic row is marked approved. Filter node confirms status. Three parallel HTTP Request nodes hit SerpAPI simultaneously — one for primary keywords, one for related keywords, and one for People Also Ask questions. Code nodes normalize and merge all three response sets. AI Agent powered by OpenRouter analyzes keyword intent, search volume signals and competition data, then writes structured recommendations. A final Google Sheets node writes the keyword data back to the sheet and updates the row status to complete.",
          tools: ["SerpAPI", "OpenRouter AI Agent", "Google Sheets", "HTTP Request", "Merge", "Filter", "Code (JS)", "n8n"],
          link: "#"
        },
        {
          name: "AI SEO Outline Generator",
          feature: "Google Sheets Trigger watches for rows where keyword research is marked done. Filter node confirms the status before proceeding. HTTP Request sends the topic, target keywords, and audience details to OpenRouter with a structured SEO outline prompt. Code nodes parse the AI response, format it into numbered sections with H2/H3 hierarchy and word count targets, and strip any markdown artifacts. A final Google Sheets node writes the clean outline directly into the Content Drafts sheet and updates the source row status — fully hands-free from keyword approval to ready-to-write outline.",
          tools: ["OpenRouter", "Google Sheets", "HTTP Request", "Code (JS)", "Filter", "n8n"],
          link: "#"
        },
        {
          name: "AI Article Writer & Grammar",
          feature: "Manual Trigger kicks off the pipeline. Google Sheets get node fetches outline-ready draft rows and Filter confirms status. Code node assembles a detailed GPT-4 prompt with the outline, target keywords, tone and word count. HTTP Request sends it to OpenAI API and retrieves the full article. A second HTTP Request pipes the article through LanguageTool API for grammar and style correction. Code nodes apply the corrections, then calculate a Flesch-Kincaid readability score in JavaScript. A final compile Code node assembles the polished article, and Google Sheets save node writes the completed content with readability score back to the drafts sheet.",
          tools: ["OpenAI GPT-4", "LanguageTool API", "Google Sheets", "HTTP Request", "Code (JS)", "Filter", "n8n"],
          link: "#"
        },
        {
          name: "Auto Backup n8n Workflows",
          feature: "Schedule Trigger runs every hour. DateTime nodes calculate the current timestamp, format it for folder naming, and subtract 7 days to identify old backups. HTTP Request calls the n8n Internal REST API to export all workflows as JSON. Split Out distributes each workflow JSON. Google Drive node creates a new timestamped folder, then uploads each workflow file individually. A second Google Drive search node finds all backup folders, Filter identifies those older than 7 days, Split In Batches groups them, and Google Drive delete node removes them one by one. Move Binary Data handles the JSON-to-binary conversion throughout.",
          tools: ["n8n REST API", "Google Drive", "HTTP Request", "DateTime", "Split Out", "Filter", "Schedule Trigger", "n8n"],
          link: "#"
        }
      ].map((project, index) => (
        <div key={index} className="bg-gray-900 p-8 rounded-3xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl shadow-lg flex flex-col h-full group">
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors">{project.name}</h3>
          </div>
          
          <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
            {project.feature}
          </p>
          
          <div className="mt-auto">
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tools.map((tool, idx) => (
                <span key={idx} className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700">
                  {tool}
                </span>
              ))}
            </div>
            
            {project.link !== "#" ? (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors"
              >
                Watch Demo
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
            ) : (
              <span className="inline-flex items-center text-gray-500 text-sm font-semibold cursor-not-allowed">
                Demo Coming Soon
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Let's Connect */}
      <section id="contact" className="py-20 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-white">Let's Connect</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div id="order" className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-sm">
              <h3 className="text-xl font-bold mb-6 text-white">Order Now</h3>
              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <input type="text" placeholder="Your Name" className="w-full p-4 bg-slate-900 rounded-xl outline-none border border-slate-700 text-white" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                <input type="email" placeholder="Your Email" className="w-full p-4 bg-slate-900 rounded-xl outline-none border border-slate-700 text-white" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
                <input type="tel" placeholder="Your Phone Number" className="w-full p-4 bg-slate-900 rounded-xl outline-none border border-slate-700 text-white" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
                <textarea placeholder="Your Project" className="w-full p-4 bg-slate-900 rounded-xl outline-none border border-slate-700 text-white h-32" value={formData.project} onChange={e => setFormData({...formData, project: e.target.value})} required />
                <button type="submit" disabled={formStatus === 'sending'} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-60 transition">
                  {formStatus === 'sending' ? 'Sending...' : formStatus === 'success' ? 'Order Received' : formStatus === 'error' ? 'Something went wrong, try again' : 'Submit Order'}
                </button>
              </form>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 bg-slate-800 rounded-full flex items-center justify-center mb-6 border-4 border-slate-700 shadow-xl">
                 <span className="text-8xl">🤖</span>
              </div>
              <p className="italic text-slate-400 mb-8">"Ready to process your ideas into reality!"</p>
              <div className="space-y-4 w-full max-w-sm">
                <a href={`https://wa.me/${NEXFLOW_WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-slate-800 text-slate-200 rounded-xl border border-slate-700 font-bold hover:border-blue-500 transition">
                  <span className="text-xl">💬</span> WhatsApp Me
                </a>
                <EmailButton email={NEXFLOW_EMAIL} />
                <a href={NEXFLOW_GITHUB} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-slate-800 text-slate-200 rounded-xl border border-slate-700 font-bold hover:border-blue-500 transition">
                  <span className="text-xl">🐙</span> GitHub Profile
                </a>
                <a href={NEXFLOW_LINKEDIN} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-slate-800 text-slate-200 rounded-xl border border-slate-700 font-bold hover:border-blue-500 transition">
                  <span className="text-xl">in</span> LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FloatingChatbot />
    </div>
  );
}