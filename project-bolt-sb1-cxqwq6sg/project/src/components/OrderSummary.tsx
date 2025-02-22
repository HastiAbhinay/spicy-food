import React from 'react';
import { OrderItem } from '../types';
import { Receipt, Printer } from 'lucide-react';

interface OrderSummaryProps {
  orderItems: OrderItem[];
  tableNumber: number;
  onGenerateBill: () => void;
}

export function OrderSummary({ orderItems, tableNumber, onGenerateBill }: OrderSummaryProps) {
  const total = orderItems.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );

  if (orderItems.length === 0) {
    return null;
  }

  const handlePrint = () => {
    // Create a new window for the printable bill
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Get current date and time
    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();

    // Generate the printable HTML content
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Restaurant Bill - Table ${tableNumber}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 400px;
              margin: 20px auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
              border-bottom: 2px solid #000;
              padding-bottom: 10px;
            }
            .bill-info {
              margin-bottom: 20px;
            }
            .items {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            .items th, .items td {
              padding: 8px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            .total {
              text-align: right;
              font-weight: bold;
              font-size: 1.2em;
              margin-top: 20px;
              border-top: 2px solid #000;
              padding-top: 10px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              font-size: 0.9em;
            }
            @media print {
              body { margin: 0; padding: 10px; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>Restaurant Name</h2>
            <p>123 Restaurant Street<br/>City, State 12345</p>
          </div>
          
          <div class="bill-info">
            <p><strong>Table:</strong> ${tableNumber}</p>
            <p><strong>Date:</strong> ${dateString}</p>
            <p><strong>Time:</strong> ${timeString}</p>
          </div>

          <table class="items">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${orderItems.map(item => `
                <tr>
                  <td>${item.menuItem.name}</td>
                  <td>${item.quantity}</td>
                  <td>$${item.menuItem.price.toFixed(2)}</td>
                  <td>$${(item.menuItem.price * item.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="total">
            Total: $${total.toFixed(2)}
          </div>

          <div class="footer">
            <p>Thank you for dining with us!</p>
            <p>Please come again</p>
          </div>
        </body>
      </html>
    `;

    // Write the content to the new window and print
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    
    // Print after a short delay to ensure styles are loaded
    setTimeout(() => {
      printWindow.print();
      // Close the window after printing (optional)
      printWindow.close();
    }, 250);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Order Summary - Table {tableNumber}</h2>
      <div className="space-y-3">
        {orderItems.map((item) => (
          <div key={item.menuItem.id} className="flex justify-between">
            <span>
              {item.quantity}x {item.menuItem.name}
            </span>
            <span>${(item.menuItem.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={onGenerateBill}
            className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 flex items-center justify-center gap-2"
          >
            <Receipt size={20} />
            Generate Bill
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 flex items-center justify-center gap-2"
          >
            <Printer size={20} />
            Print Bill
          </button>
        </div>
      </div>
    </div>
  );
}