import { useState, useEffect } from 'react';

function ShoppingList({ shoppingList, removeItem }) {
  const [category, setCategory] = useState('All');
  const [curList, setcurList] = useState([...shoppingList]);

  useEffect(() => {
    setcurList([...shoppingList]);
  }, [shoppingList]);

  const filteredItems = category === 'All'
    ? curList
    : curList.filter(item => item.category === category);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleFieldChange = (index, field, value) => {
    const updatedList = [...curList];
    updatedList[index] = { ...updatedList[index], [field]: value };
    setcurList(updatedList);
  };

  return (
    <>
      <select value={category} onChange={handleCategoryChange}>
        <option value="All">All</option>
        <option value="groceries">Groceries</option>
        <option value="clothing">Clothing</option>
        <option value="electronics">Electronics</option>
      </select>

      {filteredItems.map((val, index) => (
        <div
          className={val.purchased ? 'card flex-apart green' : 'card flex-apart'}
          key={index}
        >
          <input
            value={val.name}
            onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
          />
          <input
            type="number"
            value={val.cost}
            onChange={(e) => handleFieldChange(index, 'cost', e.target.value)}
          />
          <select
            value={val.category}
            onChange={(e) => handleFieldChange(index, 'category', e.target.value)}
          >
            <option value="groceries">Groceries</option>
            <option value="clothing">Clothing</option>
            <option value="electronics">Electronics</option>
          </select>
          <input
            type="date"
            value={val.expiration}
            onChange={(e) => handleFieldChange(index, 'expiration', e.target.value)}
          />
          <button className='btn' onClick={removeItem} value={val.name}>x</button>
        </div>
      ))}
    </>
  );
}

export default ShoppingList;
