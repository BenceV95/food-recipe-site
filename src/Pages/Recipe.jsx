import React, {useEffect, useState} from 'react';
import { createFood, deleteFood, updateFood, getOneFoodById, getAllFoods } from "../Client/Crud.js";
import { useParams, useNavigate } from 'react-router-dom';

const Recipe = () => {
    const { id } = useParams()
    const [food, setFood] = useState(null)
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate()
    useEffect(() => {
        console.log('ID', id);

        getOneFoodById(id)
            .then(data => { setFood(data); console.log(data); })
            .catch(error => setErrorMsg(error.message));
    }, [])
console.log(food?.ingredients)
    return (
        <div className='recipe'>
            <div>{errorMsg}</div>
            <h1>Recipe for {food?.name}</h1>
            <div>
              <img className='recipe-pic' src={food?.url} alt="picture of the food" />
            </div>
            <div className='recipe-ingreds'>
                <h2>Ingredients:</h2>
            <ul>
                {food?.ingredients.map(ingred=> <li key={ingred.id} >{ingred.name} {ingred.quantity} {ingred.unit}</li>  )}
            </ul>
            </div>
            <div>
                <h2>Instructions:</h2>
                <p>{food?.instructions}</p>
            </div>
        <div>
          <button onClick={()=>navigate('/foods')} className='btn btn-primary'>Back</button>
        </div>
        </div>
    )
}

export default Recipe