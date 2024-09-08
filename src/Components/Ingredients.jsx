import React, { useEffect, useState, useRef } from 'react'

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}

let firstId = "8711de25-cf33-4ace-b65e-74732174a1e4";

const Ingredients = ({ setIng , data}) => {
    const inputNameRef = useRef(null);
    const inputQuantityRef = useRef(null);

    const basicObj = {
        id: firstId,
        name: "name",
        quantity: "quantity",
        unit: "gramms"
    }

    const [ingredients, setIngredients] = useState([basicObj]);
    const [ingName, setIngName] = useState("")
    const [ingQuantity, setIngQunatity] = useState("")
    const [ingUnit, setIngUnit] = useState("gramms")

    class Ingredient {
        constructor(name, quantity, unit) {
            this.id = uuidv4(),
                this.name = name,
                this.quantity = quantity
            this.unit = unit
        }
    }

    useEffect(()=>{
        if(data){
            setIngredients([...ingredients, ...data])
        }
    },[data])


    
    //console.log("data",data);

    useEffect(() => {
        //console.log(ingredients);
        setIng(ingredients.slice(1))
    }, [ingredients]);

    const handleButton = (e) => {
        setIngredients([ingredients[0], new Ingredient(ingName, ingQuantity, ingUnit), ...ingredients.slice(1)])

        // not safe for work:( try it with useRef !)

        inputNameRef.current.value = ""
        inputQuantityRef.current.value = ""
        // const inputName = document.getElementById("inputName");
        // inputName.value = "";
        // const inputQuantity = document.getElementById("inputQuantity");
        // inputQuantity.value = "";
    }


    const handleDelete = (e) => {

        const id = e.currentTarget.id;
        // console.log("deleting: " + id);
        // console.log(ingredients);

        const filtered = ingredients.filter(ing => {
            return ing.id !== id;
        })

        //console.log(filtered);

        setIngredients(filtered);
    }

    return (
        <div className='ing'>
            {ingredients.map((ingred, i) => (
                <div key={ingred.id} className='d-flex gap-1 mb-1' id={ingred.id}>

                    {
                        firstId === ingred.id && <>
                            <input onChange={(e) => { setIngName(e.target.value) }} type='text' ref={inputNameRef} placeholder="name" id='inputName'></input>
                            <input onChange={(e) => { setIngQunatity(e.target.value) }} type='text' ref={inputQuantityRef} placeholder="quantity" id='inputQuantity'></input>
                            <select onChange={(e) => { setIngUnit(e.target.value) }} defaultValue="gramms" required>
                                <option value="gramms">gramms</option>
                                <option value="ml">ml</option>
                                <option value="pieces">pieces</option>
                            </select>
                        </>
                    }
                    {
                        firstId !== ingred.id && <>
                            <input type='text' disabled value={ingred.name}></input>
                            <input type='text' disabled value={ingred.quantity}></input>
                            <input type='text' disabled value={ingred.unit}></input>
                        </>
                    }
                    {firstId === ingred.id && <button type='button' onClick={handleButton} className='btn btn-primary' id={ingred.id}>+</button>}
                    {firstId !== ingred.id && <button type='button' onClick={handleDelete} className='btn btn-danger' id={ingred.id}>-</button>}
                    <br />

                </div>
            ))}
        </div>

    )
}

export default Ingredients