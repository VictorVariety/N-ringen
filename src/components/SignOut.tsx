import { getAuth, signOut } from "firebase/auth";

export default function SignOut() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });

  return <button onClick={SignOut}>Sign out</button>;
}
