function Header() {
  return (
    <header className="flex items-center justify-between w-full px-8 py-4 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg fixed top-0 left-0 z-50">
      {/* Logo / Title */}
      <h1 className="text-white text-xl font-bold tracking-wide">
        Quiz<span className="text-indigo-400">Gen</span>
      </h1>

      {/* Navigation */}
      <nav className="hidden md:flex gap-6 text-gray-200 text-sm font-medium">
        <a href="#" className="hover:text-white transition-colors">
          Home
        </a>
        <a href="#" className="hover:text-white transition-colors">
          Upload
        </a>
        <a href="#" className="hover:text-white transition-colors">
          About
        </a>
        <a href="#" className="hover:text-white transition-colors">
          Contact
        </a>
      </nav>

      {/* Button */}
      <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition-all shadow-md">
        Get Started
      </button>
    </header>
  );
}

export default Header;
