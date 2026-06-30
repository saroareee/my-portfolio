export default function Navbar() {
  return (
    <nav className="p-6 bg-slate-900 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Md Golam Saroar</h1>
      <ul className="flex gap-6">
        <li><a href="#about" className="hover:text-blue-400">About</a></li>
        <li><a href="#projects" className="hover:text-blue-400">Projects</a></li>
      </ul>
    </nav>
  );
}