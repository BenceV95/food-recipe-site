import React, { useEffect, useState } from 'react'
import auth from "../firebase/auth.js";
import { db } from "../firebase/firebase.js"
import { ref, set, get, remove } from "firebase/database";
import { createFood, deleteFood, updateFood, getOneFoodById, getAllFoods } from "../Client/Crud.js";

const Favourites = () => {
    const [favourites, setFavourites] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        const getFavourites = async () => {
            const user = auth.currentUser;
            if (user) {
                const userFavouritesRef = ref(db, `users/${user.uid}/favorites`);
                const snapshot = await get(userFavouritesRef);
                //console.log(snapshot);
                if (snapshot.exists()) {
                    const favs = snapshot.val();                    
                    const ids = (Object.keys(favs));
                    getAllFavs(ids);
                } else {
                    setFavourites(false);
                }
            }
        }
        
       const getAllFavs = async (ids) => {
        
          const favoriteFoods=  await Promise.all(
                ids.map(id => (
                    getOneFoodById(id)
                    // .then(res => console.log(res))
                    // .catch(error => console.log(error))
                    
                ))
            )
            setFavourites(favoriteFoods)
            console.log('promiseAll',favoriteFoods);
        }
        
        getFavourites();
        setLoading(false);
        
    },[loading]);
    

  return (
    <div className='listFoods'>
        { favourites ? 
        (
            favourites?.map((fav,i) =>(
                <div key={i} className='foodCard'>
                     <p >{fav.name}</p>
                     <img src={fav.url} alt={fav.name}></img>
                </div>))
        )
        :
        (
            <p>You don't have anything in favourites yet. Why not add some?</p>
        )
            
        }
    </div>
  )
}

export default Favourites