import { useState } from "react";

const AuthForm = ({ onSubmit, onGoogleAuth, isSignIn }) => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const changeHandler = (setter) => (e) => {
    setter(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isSignIn && password !== confirm) {
      setError("passwords does not match");
      return;
    }

    onSubmit({
      email,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label" htmlFor="email">
          Email
        </label>
        <input
          className="form-control"
          id="email"
          name="email"
          type="email"
          value={email}
          required
          onChange={changeHandler(setEmail)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          className="form-control"
          id="password"
          name="password"
          type="password"
          value={password}
          required
          onChange={changeHandler(setPassword)}
        />
      </div>
      {!isSignIn && (
        <div className="mb-3">
          <label className="form-label" htmlFor="confirm">
            Confirm
          </label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            value={confirm}
            className="form-control"
            required
            onChange={changeHandler(setConfirm)}
          />
        </div>
      )}
      <div className="d-flex justify-content-start gap-3">
        <button className="btn btn-primary" type="submit">{isSignIn ? "Sign In" : "Sign Up"}</button>
        <button className="btn btn-primary" type="button" onClick={onGoogleAuth}>
          Sign in with Google
        </button>
      </div>
      {error && <div className="error-box">{error}</div>}
    </form>
  );
};

export default AuthForm;
