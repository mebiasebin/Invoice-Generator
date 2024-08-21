// import React from 'react';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';
// import './App.css';
// import BillDetails from './components/BillDetails';
// import ItemList from './components/ItemList';
// import TotalAmount from './components/TotalAmount';

// function App() {
//     const [items, setItems] = React.useState([]);

//     const handleAddItem = (item) => {
//         setItems([...items, item]);
//     };

//     const handleDeleteItem = (index) => {
//         const updatedItems = [...items];
//         updatedItems.splice(index, 1);
//         setItems(updatedItems);
//     };

//     const calculateTotalAmount = () => {
//         return items.reduce(
//             (total, item) => total + item.quantity * item.price, 
//             0
//         );
//     };

//     const handleDownloadPDF = () => {
//         const pdf = new jsPDF();

//         pdf.text('Invoice', 90, 20);

//         const columns = [
//             { title: 'ID', dataKey: 'id' },
//             { title: 'Name', dataKey: 'name' },
//             { title: 'Quantity', dataKey: 'quantity' },
//             { title: 'Price', dataKey: 'price' }
//         ];

//         const data = items.map((item, index) => ({
//             id: index + 1,
//             name: item.item,
//             quantity: item.quantity,
//             price: item.price.toFixed(2)
//         }));

//         pdf.autoTable({
//             columns: columns,
//             body: data,
//             startY: 30,
//             margin: { horizontal: 10 },
//             headStyles: { fillColor: [41, 128, 185] },
//             theme: 'striped',
//         });

//         const totalAmount = calculateTotalAmount();
//         pdf.text(
//             `Total Amount: ${totalAmount.toFixed(2)}Rs`, 
//             10, pdf.lastAutoTable.finalY + 20
//         );

//         pdf.save('invoice.pdf');
//     };

//     return (
//         <div className="App">
//             <h1>Invoice Generator</h1>
//             <BillDetails onAddItem={handleAddItem} />
//             <ItemList items={items} onDeleteItem={handleDeleteItem} />
//             <TotalAmount total={calculateTotalAmount()} />
//             <button className='download' onClick={handleDownloadPDF}>Download PDF</button>
//         </div>
//     );
// }

// export default App;
