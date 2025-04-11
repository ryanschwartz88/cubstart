import { useState } from 'react';
import './App.css'
import ShoppingList from './ShoppingList';


function App() {
    const [shoppingList, setShoppingList] = useState([]);
    const [budget, setBudget] = useState(100);
    const [totalSpent, setTotalSpent] = useState(0);



    const addItem = (event) => {
        event.preventDefault();
        let form = event.target;
        let formData = new FormData(form)
        let formDataObj = Object.fromEntries(formData.entries())


        formDataObj.purchased = false;
        formDataObj.cost = parseFloat(formDataObj.cost || 0);

        setTotalSpent(totalSpent + formDataObj.cost);


        setShoppingList([...shoppingList, formDataObj])
        form.reset();
    }

    const removeItem = (event) => {
        const name = event.target.value;
        setShoppingList(shoppingList.filter(item => item.name !== name));
        setTotalSpent(totalSpent - shoppingList.find(item => item.name === name).cost);
    };

    return (
        <>
            <h1>Shopping List Manager</h1>
            <div className='card'>
                <div className="flex-row flex-apart">
                    <h3>Current Budget: </h3>
                    <input type="number" value={budget} onChange={(event) => setBudget(event.target.value)} />
                </div>
                <div className="flex-row">
                    <h3>Remaining Budget: ${budget - totalSpent}</h3>

                </div>
                <form onSubmit={addItem} className='flex-apart'>
                    <input type="text" name="name" placeholder='Add item to list...' />
                    {/* create another input that allows people to add costs for an item */}
                    <input type="number" name="cost" placeholder='Cost...' />
                    <button className='btn purple' type='submit'>Add</button>
                </form>
            </div>


            <ShoppingList
                shoppingList={shoppingList}
                removeItem={removeItem}
                //budget={budget}
            />
        </>
    );
}

export default App;