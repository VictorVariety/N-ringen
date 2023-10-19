import { signOut } from "firebase/auth";
import { Button } from "./ui/button";
import { auth } from "@/server/firebaseConfig";

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
      <Button
        variant="navbar"
        size="navbar"
        onClick={() => signOut(auth)}
        className="fixed right-8"
      >
        Logout
      </Button>
    </div>
  );
}
