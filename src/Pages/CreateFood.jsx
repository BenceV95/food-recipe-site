import React, {useState} from 'react'
import { createFood, deleteFood, updateFood, getOneFoodById, getAllFoods } from "../Client/Crud.js"
import Ingredients from '../Components/Ingredients.jsx'
import { useNavigate } from 'react-router-dom'

const CreateFood = () => {
  
  const[ingredientsARR, setIngredientsARR] = useState([])
  const navigate = useNavigate()
  
  const submitForm = async (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.target))

    const convertedFormData = {
      name: formData.name,
      prepTime: formData.prepTime,
      url: formData.image,
      instructions: formData.instructions,
      ingredients: ingredientsARR
      
    }

    await createFood(convertedFormData);
    console.log(convertedFormData);
    navigate('/foods')
  }

  return (
    <div className='border rounded p-3 container-lg'>
      <h1>Create Food</h1>
      <form onSubmit={submitForm} className='d-flex flex-column gap-1'>
        <input type='text' name='name' placeholder='Foods name' required></input><br></br>
        <input type='number' name='prepTime' placeholder='Prep. time' required></input><br></br>
        <input type='url' name='image' placeholder='Image-URL' required></input><br></br>
        <textarea name="instructions" id="" placeholder='Instructions for recipe...' required></textarea><br></br>
        <Ingredients setIng={setIngredientsARR}/>
        <button type='submit' className='btn btn-primary'>Create</button>
      </form>
    </div>
  )
}

export default CreateFood