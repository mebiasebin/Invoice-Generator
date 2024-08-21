import React from 'react';

const ItemList = ({ items, onDeleteItem }) => {
    return (
        <div className="item-list">
            <h2>Item List</h2>
            {items.length > 0 ? (
                items.map((item, index) => (
                    <div className="item" key={index}>
                        <div>{item.item}</div>
                        <div>Quantity: {item.quantity}</div>
                        <div>Price: {item.price.toFixed(2)}Rs</div>
                        <button onClick={() => onDeleteItem(index)}>Delete</button>
                    </div>
                ))
            ) : (
                <p>No items to display</p>
            )}
        </div>
    );
};

export default ItemList;
