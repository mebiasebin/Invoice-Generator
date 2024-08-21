import React, { useState } from 'react';

const BillDetails = ({ onAddItem }) => {
    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddItem = () => {
        if (!item.trim()) {
            setErrorMessage('Please input data in the Item section.');
            return;
        }

        // Check if the item contains only alphabetical characters
        if (!/^[a-zA-Z\s]+$/.test(item)) {
            setErrorMessage('Item should only contain alphabetical characters.');
            return;
        }

        // Ensure quantity and price are numbers and non-negative
        if (quantity <= 0) {
            setErrorMessage('Quantity must be greater than zero.');
            return;
        }

        if (price < 0) {
            setErrorMessage('Price cannot be negative.');
            return;
        }

        const newItem = { item, quantity: parseInt(quantity, 10), price: parseFloat(price) };
        onAddItem(newItem);
        setItem('');
        setQuantity(1);
        setPrice(0);
        setErrorMessage('');
    };

    return (
        <div>
            <label>Item:</label>
            <input
                type="text"
                value={item}
                onChange={(e) => setItem(e.target.value)}
            />
            <label>Quantity:</label>
            <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
            />
            <label>Price:</label>
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                step="0.01"
            />
            <button onClick={handleAddItem}>Add Item</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default BillDetails;
