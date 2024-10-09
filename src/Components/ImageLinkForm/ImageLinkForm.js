import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onDetectChange}) => {
	return(
		<div>
			<h3 className='white'> SmartBrain is here to help you detect faces in your pictures. Insert your picture here! </h3>
			<div className='center'>
				<div className= 'form center pa4 br3 shadow-5'>
					<input className='pa2 mb2 db w-70 center' type = 'text' onChange={onInputChange} />
					<button className= 'w-30 br2 pa2 mb2 grow f4 link pointer bg-light-blue' onClick={onDetectChange}> Detect </button>
				</div>
			</div>
		</div>





	);
};

export default ImageLinkForm;