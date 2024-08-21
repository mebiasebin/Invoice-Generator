import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './App.css';
import BillDetails from './components/BillDetails';
import ItemList from './components/ItemList';
import TotalAmount from './components/TotalAmount';
import axios from 'axios';

function App() {
    const [items, setItems] = React.useState([]);

    const handleAddItem = (item) => {

        axios.post('https://invoice-generator-backend-livid.vercel.app/api/v1/items/createInvoice', item)
        .then(() => {
            return axios.get('https://invoice-generator-backend-livid.vercel.app/api/v1/items/readAll');
        })
        .then(response => {
            console.log('Items Read:', response.data);
            setItems(response.data.data); 
        })
        .catch(error => {
            console.error('There was an error adding or reading items!', error);
        });
    };

    const handleDeleteItem = (index) => {
        const itemToDelete = items[index];

        axios.delete(`https://invoice-generator-backend-livid.vercel.app/api/v1/items/deleteItem/${itemToDelete._id}`)
        .then(() => {
            return axios.get('https://invoice-generator-backend-livid.vercel.app/api/v1/items/readAll');
        })
        .then(response => {
            console.log('Items Read:', response.data);
            setItems(response.data.data);
        })
        .catch(error => {
            console.error('There was an error deleting the item!', error);
        });
    };

    const calculateTotalAmount = () => {
        return items.reduce(
            (total, item) => total + item.quantity * item.price, 0
        );
    };

    const handleDownloadPDF = () => {
        axios.get('https://invoice-generator-backend-livid.vercel.app/api/v1/items/readAll')
            .then(response => {
                const fetchedItems = response.data.data;
                
                const pdf = new jsPDF();
                pdf.text('Invoice', 90, 20);
    
                const columns = [
                    { title: 'S.No', dataKey: 'id' },
                    { title: 'Item', dataKey: 'name' },
                    { title: 'Quantity', dataKey: 'quantity' },
                    { title: 'Price', dataKey: 'price' }
                ];
                
                const data = fetchedItems.map((item, index) => ({
                    id: index + 1,
                    name: item.item,
                    quantity: item.quantity,
                    price: item.price.toFixed(2)
                }));
    
                pdf.autoTable({
                    columns: columns,
                    body: data,
                    startY: 30,
                    margin: { horizontal: 10 },
                    headStyles: { fillColor: [41, 128, 185] },
                    theme: 'striped',
                });
    
                const totalAmount = fetchedItems.reduce(
                    (total, item) => total + item.quantity * item.price, 0
                );
                pdf.text(
                    `Total Amount: ${totalAmount.toFixed(2)}Rs`, 
                    10, pdf.lastAutoTable.finalY + 20
                );
    
                pdf.save('invoice.pdf');
                return axios.delete('https://invoice-generator-backend-livid.vercel.app/api/v1/items/deleteAllItem');
            })
            .then(response => {
                console.log('Items Deleted:', response.data);
            })
            .catch(error => {
                console.error('There was an error handling the invoice!', error);
            });
    };    

    return (
        <div className="App">
            <h1>Invoice Generator</h1>
            <BillDetails onAddItem={handleAddItem} />
            <ItemList items={items} onDeleteItem={handleDeleteItem} />
            <TotalAmount total={calculateTotalAmount()} />
            <button className='download' onClick={handleDownloadPDF}>Download PDF</button>
        </div>
    );
}

export default App;
