import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { createFood, deleteFood, updateFood, getOneFoodById, getAllFoods } from "../Client/Crud.js";
import auth from "../firebase/auth.js";
import { db } from "../firebase/firebase.js"
import { ref, set, get, remove } from "firebase/database";

const ListFoods = () => {

  const [foods, setFoods] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // probably not safe for production
  const [favs, setFavs] = useState([]);
  const userLoggedIn = auth.currentUser;
  const navigate = useNavigate()  
  
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

    getAllFoods().then(data => {
      setFoods(data);
      console.log('listData', data);
    })
  }, [])

  const deleteFoodByID = (foodID) => {
    deleteFood(foodID)
      .then(res => console.log(res))
    const filtered = foods.filter(food => food.id !== foodID)
    setFoods(filtered);
  }

  const addToFavorites = (foodID) => {
    const user = auth.currentUser;
    if (user) {
      const userFavoritesRef = ref(db, `users/${user.uid}/favorites/${foodID}`);
      get(userFavoritesRef).then(snapshot => {
        if (snapshot.exists()) {
          // If the foodID exists, remove it from the favorites
          remove(userFavoritesRef).then(() => console.log('Recipe removed from favourites !'))
            .catch(error => console.log(error))
        } else {
          set(userFavoritesRef, true) 
            .then(() => {
              console.log("Recipe marked as favorite");
            })
            .catch((error) => {
              console.error("Error marking recipe as favorite:", error);
            });
        }
      })
    }
  }

  return (
    <>
      <h1>Listing All Foods</h1>
      <div className='listFoods'>
        {
          foods?.map(food => (
            <div key={food.id} className='foodCard' id={food.id}>
              <img src={food.url} alt={food.name}></img>

              <Link to={`/food/${food.id}`} ><p >{food.name}</p></Link>
              <p>Prep time: {food.prepTime} min</p>
              {isAdmin &&
                <div>
                  <button onClick={() => navigate(`/update/${food.id}`)} className='btn btn-primary'>Update</button>
                  <button onClick={() => deleteFoodByID(food.id)} className='btn btn-danger'>Delete</button><br />
                </div>
              }
              <button onClick={() => { addToFavorites(food.id) }} >❤</button>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default ListFoods