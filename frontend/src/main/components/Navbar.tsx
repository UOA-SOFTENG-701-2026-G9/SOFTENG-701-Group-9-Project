import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="w-full h-16 bg-[#0F6E56] flex flex-row items-center justify-between px-4">
      <h1>My App</h1>
      <div className="flex space-x-4">
        <Link to="/modules">Learn</Link>
        <Link to="/about">About</Link>
      </div>
    </div>
  )
}

export default Navbar