import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function SignIn(auth: any) {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  return (
    <button onClick={signInWithGoogle} className="w-full h-full bg-blue-600">
      Sign in with Google
    </button>
  );
}
