

export default function ContextMenu({
    menuPosition, 
    setMenuPosition, 
    setExpenses, 
    rowId, 
    setFormData, 
    expenses, 
    setEditingRowId
}){
   
    if(!menuPosition.left) return; 
    return (
        <div className="context-menu" style={menuPosition}>
            <div onClick={() => {
                setMenuPosition({})
                setEditingRowId(rowId)
                const exp = expenses.find((exp) =>  exp.id === rowId)
                setFormData({
                    title: exp.title,
                    category: exp.category,
                    amount: exp.amount,
                  })
            }}>Edit</div>
            <div onClick={() => {
                setMenuPosition({})
                setExpenses(prev => prev.filter((exp) => exp.id !== rowId))
            }}>Delete</div>
        </div>
    )
}