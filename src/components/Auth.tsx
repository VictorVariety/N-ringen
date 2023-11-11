import { auth, googleProvider } from "../server/firebaseConfig";
import { signInWithPopup } from "firebase/auth";

export default function Auth() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  console.log(auth?.currentUser?.email);

  // async function signIn() {
  //   try {
  //     await createUserWithEmailAndPassword(auth, email, password);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.log(err);
    }
  }
  // async function logOut() {
  //   try {
  //     await signOut(auth);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <div className="w-screen h-screen relative bg-secondary flex flex-col justify-center items-center text-xl">
      {/* <div className="flex flex-col justify-center items-center">
        <input
          className="bg-input text-primary pl-2 placeholder:text-primary rounded-t-[8px] !outline-none"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="bg-input text-primary pl-2 placeholder:text-primary rounded-b-[8px] !outline-none"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-input mt-2 py-1 left-12 w-20 rounded-[8px]"
          onClick={signIn}
        >
          Sign in
        </button>
      </div>
      <div className="text-input flex justify-center items-center">or</div> */}
      <div className="flex justify-center items-center">
        <button
          className="bg-greenblue text-text mt-2 px-2 py-1 placeholder:text-primary rounded-[8px] !outline-none"
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </button>
      </div>
      {/* <button onClick={logOut}>Log out</button> */}
    </div>
  );
}
