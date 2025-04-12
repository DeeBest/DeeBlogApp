import placeholderImg from '../assets/placeholder-img.png';
import expressjsImg from '../assets/expressjsImg.png';
import nodejsImg from '../assets/nodejsImg.png';
import mongodbImg from '../assets/mongodbImg.png';
import reactjsImg from '../assets/reactjsImg.png';

const insertImg = (post) => {
  let imgSrc;

  if (post.postCategory === 'expressJS') {
    imgSrc = expressjsImg;
  } else if (post.postCategory === 'reactJS') {
    imgSrc = reactjsImg;
  } else if (post.postCategory === 'nodeJS') {
    imgSrc = nodejsImg;
  } else if (post.postCategory === 'mongoDB') {
    imgSrc = mongodbImg;
  } else {
    imgSrc = placeholderImg;
  }

  return imgSrc;
};

export default insertImg;
