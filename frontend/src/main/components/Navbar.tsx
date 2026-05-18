import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="w-full h-16 bg-[#0F6E56] flex flex-row items-center justify-between px-8">
      <h1>My App</h1>
      <div className="flex space-x-16">
        <Link to="/modules">
          <h2 className="hover:opacity-70">
            Learn
          </h2>
        </Link>
        <Link to="/about">
          <h2 className="hover:opacity-70">
            About
          </h2>
        </Link>
      </div>
    </div>
  )
}

export default Navbar