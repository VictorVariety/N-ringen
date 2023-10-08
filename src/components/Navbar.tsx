import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="fixed top-0 w-screen flex justify-center gap-0 bg-navbar text-text">
      <a href="/">
        <Button variant="navbar" size="navbar">
          Home
        </Button>
      </a>
      <a href="/examples">
        <Button variant="navbar" size="navbar">
          Examples
        </Button>
      </a>
      <a href="/list">
        <Button variant="navbar" size="navbar">
          List
        </Button>
      </a>
    </div>
  );
}
