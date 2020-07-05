import React, { useState, useRef, useEffect } from 'react';
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import testimage from '../Images/Wallpaper.jpg'

const ImageCropper = ({SORCE}) => {
    const [imageDestination , setimageDestination] = useState()

    const imageRef = useRef();
    // const image = document.getElementById('image');

    // useEffect(()=>{
    //     const cropper = new Cropper(image, {
    //             zoomable: false,
    //             scalable: false,
    //             aspectRatio: 1,
    //             crop: () => {
    //                 const canvas = cropper.getCroppedCanvas();
    //                 setimageDestination({ imageDestination: canvas.toDataURL("image/png") });
    //             }
    //         });
    // })


	return (
		<div>
			<div className="ImageCropper-container" >
				<img ref={imageRef} src={testimage} alt="Source" crossorigin/>
			</div>
		</div>
	);
};

export default ImageCropper;
