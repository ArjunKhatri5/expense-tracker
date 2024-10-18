import {useState} from 'react';
import Input from './Input';
import Select from './Select';

export default function ExpenseForm({setExpenses, formData, setFormData, editingRowId, setEditingRowId}) {

  const [errors, setErrors] = useState({})

  const validate = (data) => {
    const errorsData = {};

    const validationConfig = {
      title: [
        {required: true, message: "Please enter title"}, 
        {minLength: 3, message: "Title should be atleast 3 characters long"}  
      ],
      category: [
        {required: true, message: "Please select category"}, 
      ],
      amount: [
        {required: true, message: "Please enter an amount"}, 
        {type: Number, message: "Amount should only be of type number"}
      ]
    }

    
    Object.entries(data).forEach(([key, value]) => {
      validationConfig[key].some((rule) => {
        if(rule.required && !value){
          errorsData[key] = rule.message;
          return true
        }

        if(rule.minLength && value.trim().length < rule.minLength){
          errorsData[key] = rule.message
          return true;
        }

        if(rule.type && isNaN(value)){
          errorsData[key] = rule.message
          return true;
        }
      })
    })

    setErrors(errorsData);
    return errorsData;
  }


  const handleSubmit = (e) =>{
    e.preventDefault();    

    const validateResult =  validate(formData)

     if(Object.keys(validateResult).length) return


     if(editingRowId){
      setExpenses(prev => (
        prev.map((singleExpense) => {
        if(singleExpense.id === editingRowId){
          return {
            ...formData,
            id: editingRowId,
          }
        }
        return singleExpense;
      })))
      setEditingRowId("");
      setFormData({
        title: "",
        category: "",
        amount: "",
      })
      return;
     }

    setExpenses(prev => [...prev, {...formData, id: crypto.randomUUID()}])
    setFormData({
      title: "",
      category: "",
      amount: "",
    })
  };

  function handleChange(e){
    setFormData(prev => ({...prev, [e.target.name] : e.target.value }))
    setErrors(prev => ({...prev, [e.target.name] : ''}))
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>

      <Input label="Title" id="title" name="title" value={formData.title} onChange={handleChange} error={errors.title} />

      <Select label="Category" id="category" name="category" value={formData.category} onChange={handleChange} error={errors.category} options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]} />

      <Input label="Amount (in number)" id="amount" name="amount" value={formData.amount} onChange={handleChange} error={errors.amount}/>
      
      <button className="add-btn">{editingRowId ? "Save" : "Add"}</button>
    </form>
  );
}
