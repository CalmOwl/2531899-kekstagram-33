import { renderComments } from './renderComments.js';

const miniatureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const miniatureList = document.querySelector('.pictures');
const miniatureListFragment = document.createDocumentFragment();
const fullPictureWindow = document.querySelector('.big-picture');
const fullPictureWindowClose = document.querySelector('.big-picture__cancel');

fullPictureWindowClose.addEventListener('click', () => {
  fullPictureWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if(evt.key === 'Escape') {
    fullPictureWindow.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});

function getFullPhoto(photo) {
  fullPictureWindow.classList.remove('hidden');
  document.body.classList.add('modal-open');

  fullPictureWindow.querySelector('.big-picture__img').querySelector('img').src = photo.url;
  fullPictureWindow.querySelector('.likes-count').textContent = photo.likes;
  fullPictureWindow.querySelector('.social__caption').textContent = photo.description;
  fullPictureWindow.querySelector('.social__comment-total-count').textContent = photo.comments.length;

  renderComments(photo.comments);
}

const createPhoto = function(photo) {
  const pictureFrame = miniatureTemplate.cloneNode(true);
  pictureFrame.querySelector('.picture__img').src = photo.url;
  pictureFrame.querySelector('.picture__img').alt = photo.description;
  pictureFrame.querySelector('.picture__likes').textContent = photo.likes;
  pictureFrame.querySelector('.picture__comments').textContent = photo.comments.length;

  pictureFrame.onclick = function () {
    getFullPhoto(photo);
  };

  return pictureFrame;
};

function createPhotoFeed(photos) {
  document.querySelectorAll('.picture').forEach((element) => element.remove());

  photos.forEach((element) => {
    const createElement = createPhoto(element);
    miniatureListFragment.appendChild(createElement);

  });

  miniatureList.append(miniatureListFragment);
}

export {createPhotoFeed};
