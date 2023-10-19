import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function SignIn(auth: any) {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  return (
    <button onClick={signInWithGoogle} className="w-full h-full bg-blue-600">
      Sign in with Google
    </button>
  );
}
