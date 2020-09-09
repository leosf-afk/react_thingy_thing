import React from 'react'

const Filter = (props) => {
    const {handleFilterChange, filterValue} = props
    return (
        <div>
            filter <input onChange={handleFilterChange} value={filterValue}/><br />
        </div>
    )
}
  
export default Filter;