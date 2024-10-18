import { useState } from 'react'
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import expenseData from "./components/expenseData"
import { useLocalStorage } from './components/hooks/useLocalStorage';

function App() {

  const [formData, setFormData] = useLocalStorage('formData', {
    title: "",
    category: "",
    amount: "",
  });

  const [expenses, setExpenses] = useLocalStorage('expenses', expenseData);

  const [editingRowId, setEditingRowId] = useLocalStorage('editingRowId', '');

  return (
    <>
      <main>
        <h1>Track Your Expense</h1>
        <div className="expense-tracker">
          <ExpenseForm setExpenses={setExpenses} formData={formData} setFormData={setFormData} editingRowId={editingRowId} setEditingRowId={setEditingRowId} />
          <ExpenseTable expenses={expenses} setExpenses={setExpenses} setFormData={setFormData} setEditingRowId={setEditingRowId}/>
        </div>
      </main>
    </>
  );
}

export default App;
