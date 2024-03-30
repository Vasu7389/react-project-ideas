import Dogpic from "../Assets/dog.jpg";
import React from 'react';

function DogImage({ imgLinks, error }) {
  return (
    <div className='doggy'>
      
      {error ? (
        <div>
          <img src={Dogpic} alt='doggy' />
          <p>{error}</p>
        </div>
      ) : (
        imgLinks.length > 0 && (
          <div>
            <img src={imgLinks[0].url} alt='doggy' />
            <p className="breed">Breed : {imgLinks[0].breed}</p>
          </div>
        )
      )}
    </div>
  );
}

export default DogImage;

