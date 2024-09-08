import { Link } from "react-router-dom";
import AuthForm from "../Components/AuthForm";
import { useAuth } from "../Context/AuthProvider";
import { useEffect } from "react";
import { ref, set } from "firebase/database";
import {db} from "../firebase/firebase";

const SignUp = () => {
  const { signUpWithCreds, signInWithGoogle, error, reset } = useAuth();
  
  console.log(db);
  

  useEffect(() => {
    reset();
  }, [reset]);

  const handleSubmit = ({ email, password, role = "user" }) => {
    signUpWithCreds(email, password)
      .then((userCredential) => {
        // User created
        const user = userCredential.user;
        
        set(ref(db, 'users/' + user.uid), {
          email: user.email,
          role: role
        }).then(() => {
          console.log("User role and email saved to database");
        }).catch((error) => {
          console.error("Error saving user to database:", error);
        });
      })
      .catch((error) => {
        console.error("Error signing up:", error);
      });
  }


  return (
    <main className="auth-page">
      <h1>Sign Up</h1>
      <AuthForm
        isSignIn={false}
        onSubmit={handleSubmit}
        onGoogleAuth={signInWithGoogle}
      />
      {error ? <div className="error-box">{error}</div> : null}
      <Link to="/sign-in">Sign In</Link>
    </main>
  );
};

export default SignUp;
