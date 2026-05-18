const Navbar = () => {
  return (
    <div className="w-full h-16 bg-[#0F6E56] flex flex-row items-center justify-between px-4">
      <h1>My App</h1>
      <div className="flex space-x-4">
        <a href="/modules">Learn</a>
        <a href="/about">About</a>
      </div>
    </div>
  )
}

export default Navbar