import React from 'react';

function BreedSelector({ breeds, selectedBreed, setSelectedBreed, getDogs }) {
  return (
    <div className='down'>
      <select  
        value={selectedBreed}
        onChange={(e) => setSelectedBreed(e.target.value)}
      >
        <option value=''>Select a breed</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>
     <br/>
      <button className='btn' onClick={getDogs}>
        Generate a Dog
      </button>
      <p>{selectedBreed ? `Generating a ${selectedBreed}...` : "Generating a random dog..."}</p>
    </div>
  );
}



export default BreedSelector;
