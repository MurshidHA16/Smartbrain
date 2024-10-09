import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './Brain Logo.png';


const Logo = () =>{
	return(
		<div className='f1 w-10'>
         	<Tilt>
			      <div className='br2 v-top' style={{ height: '150px', width: '150px' }}>
			       	<img src={brain} alt='Logo'/>
			      </div>
    		</Tilt>
    	</div> 

	);
}

export default Logo;