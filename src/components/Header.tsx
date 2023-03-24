import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="flex space-x-4">
      <Link to="/">Home</Link>
      <Link to="/portfolio">Portfolio</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  )
}

export { Header }