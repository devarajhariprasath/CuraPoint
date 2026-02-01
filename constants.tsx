
import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Panadol 500mg', brand: 'GSK', category: 'Painkillers', price: 5.50, stock: 1200, batchNo: 'B2401', expiryDate: '2026-12-01', isPrescriptionRequired: false },
  { id: '2', name: 'Amoxicillin 250mg', brand: 'Glaxo', category: 'Antibiotics', price: 45.00, stock: 450, batchNo: 'A9912', expiryDate: '2025-06-15', isPrescriptionRequired: true },
  { id: '3', name: 'Cetirizine 10mg', brand: 'Sandoz', category: 'Allergy', price: 12.00, stock: 800, batchNo: 'C1102', expiryDate: '2027-01-20', isPrescriptionRequired: false },
  { id: '4', name: 'Metformin 500mg', brand: 'Merck', category: 'Diabetes', price: 8.50, stock: 2000, batchNo: 'M8841', expiryDate: '2026-03-10', isPrescriptionRequired: true },
  { id: '5', name: 'Gaviscon Liquid 150ml', brand: 'Reckitt', category: 'Gastric', price: 1250.00, stock: 45, batchNo: 'G1002', expiryDate: '2025-11-30', isPrescriptionRequired: false },
  { id: '6', name: 'Enos', brand: 'GSK', category: 'Gastric', price: 45.00, stock: 300, batchNo: 'E4512', expiryDate: '2026-01-01', isPrescriptionRequired: false },
  { id: '7', name: 'Digene Tablets', brand: 'Abbott', category: 'Gastric', price: 10.00, stock: 500, batchNo: 'D7712', expiryDate: '2025-12-25', isPrescriptionRequired: false },
];

export const LKR_FORMATTER = new Intl.NumberFormat('en-LK', {
  style: 'currency',
  currency: 'LKR',
});
