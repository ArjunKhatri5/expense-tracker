

export default function Select({label, id, name, value, options, error, onChange}){

    return (
        <div className="input-container">
        <label htmlFor={id}>{label}</label>
        <select id={id} name={name} value={value} onChange={onChange}>
            <option value="" hidden >Select {label}</option>
            {
                options.map((opt) => {
                    return <option value={opt} key={opt}>{opt}</option>
                })
            }
        </select>
        <p className='error'>{error}</p>
      </div>
    )
}