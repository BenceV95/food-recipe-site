import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
import auth from "../firebase/auth";
import { ref, get } from "firebase/database";
import { db } from "../firebase/firebase";

const Layout = () => {

  const { user, signOut } = useAuth();
  const [show, setShow] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // probably not safe for production
  const userLoggedIn = auth.currentUser;

  useEffect(() => {
    const checkforAdmin = async () => {
      if (userLoggedIn) {
        const userRef = ref(db, `users/${userLoggedIn.uid}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          const userData = snapshot.val();
          if (userData.role === 'admin') {
            console.log("User is an admin");
            // Show admin functionality (e.g., editing recipes)
            setIsAdmin(true);
          } else {
            console.log("User is not an admin");
            // Hide admin functionality
          }
        }
      }
    }

    checkforAdmin();
  }, [])

  return (
    <>
      <nav className="navbar navbar-expand-md bg-dark d-flex justify-content-between" data-bs-theme="dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            FavFoods
          </Link>
          <button
            className="navbar-toggler"
            onClick={() => setShow(!show)}
            type="button"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${show ? "show" : ""}`}>
            <ul className="navbar-nav">
              <li className="nav-item"></li>
              {user && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/foods">
                      List Foods
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/favorites">
                      Favorites
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/vote">
                      Vote
                    </Link>
                  </li>
                  {isAdmin &&
                    <li className="nav-item">
                      <Link className="nav-link" to="/create">
                        Create Food
                      </Link>
                    </li>
                  }
                </>
              )}

            </ul>

          </div>
          {user && (
            <div className="d-flex gap-2">
            <p>{user.email}</p>
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={signOut}
            >
              Sign out
            </button>
            </div>
          )}
          {!user && (
            <div className="d-flex gap-2">
            <Link className="btn btn-outline-secondary" to="/sign-in">Sign In</Link>
            <Link className="btn btn-outline-secondary" to="/sign-up">Sign Up</Link>
            </div>
          )}
        </div>
      </nav>
      <div className="container py-4 px-3 mx-auto">
        <Outlet isAdmin={isAdmin} />
      </div>
    </>
  );
};

export default Layout;
