import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createFood, deleteFood, updateFood, getOneFoodById, getAllFoods } from "../Client/Crud.js";
import Ingredients from '../Components/Ingredients.jsx';

const UpdateFood = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null)
  const [errorMsg, setErrorMsg] = useState("");
  const [ingredientsARR, setIngredientsARR] = useState([]);

  useEffect(() => {
    console.log('ID',id);
    
    getOneFoodById(id)
      .then(data => { setFood(data); console.log(data); })
      .catch(error => setErrorMsg(error.message));
  },[])

  const submitForm = (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.target));

    const convertedFormData = {
      name: formData.name,
      prepTime: formData.prepTime,
      url: formData.image,
      instructions: formData.instructions,
      ingredients: ingredientsARR
      
    }

    updateFood(id,convertedFormData);
    console.log(convertedFormData);

  }
  
  return (
    <div>
      <h1>Update Food {id}</h1>
      <form onSubmit={submitForm} className='d-flex flex-column gap-1'>
        <input type='text' name='name' placeholder='Foods name' defaultValue={food?.name} required></input><br></br>
        <input type='number' name='prepTime' placeholder='Prep. time' defaultValue={food?.prepTime} required></input><br></br>
        <input type='url' name='image' placeholder='Image-URL' defaultValue={food?.url} required></input><br></br>
        <textarea name="instructions" id="" placeholder='Instructions for recipe...' defaultValue={food?.instructions} required></textarea><br></br>
        <Ingredients setIng={setIngredientsARR} data={food?.ingredients}/>
        <button type='submit' className='btn btn-primary'>Update</button>
      </form>
      <div>
        {errorMsg}
      </div>
    </div>
  )
}

export default UpdateFood