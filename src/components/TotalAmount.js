import React from 'react';

const TotalAmount = ({ total }) => {
    return (
        <div className="total">
            <h3>
                Total Amount: {total.toFixed(2)}Rs
            </h3>
        </div>
    );
};

export default TotalAmount;
