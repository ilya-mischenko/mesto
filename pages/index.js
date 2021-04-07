import Card from '../components/Сard.js'
import { FormValidator } from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import {
  initialCards,
  formEdit,
  nameInput,
  jobInput,
  formAdd,
  titleInput,
  imgLinkInput,
  nameInfo,
  jobInfo,
  editButton,
  closeEdit,
  addButton,
  closeAdd,
  photoContainerEl,
  templateEl,
  popupBigPicture,
  popupImg,
  popupDescription,
  closeImg,
  ESC_CODE,
  submitButton,
  profileSelectorData
} from '../utils/constants.js'


initialCards.forEach((item) => {
  photoContainerEl.prepend(createUserCard(item));
});

function createUserCard(item) {
  const card = new Card(item, '.template');
  const newCard = card.createCard();
  return newCard;
};


// const popupWithImage = new PopupWithImage(popupBigPicture, popupImg, popupDescription)
// popupWithImage.setEventListeners()


// const popupOpenImage = new PopupWithImage({ popupSelector:'.popup_big-picture' })
// popupOpenImage.setEventListeners()



// function createUserCard(item) {
//   const card = new Card(item, '.template', {
//     handleCardClick: (name, link) => {
//       popupWithImage.open(name, link)
//     }
//   });
//   const newCard = card.createCard();
//   return newCard;
// }

// const cardList = new Section({
//   items: initialCards,
//   renderer: (item) => {
//     const card = createUserCard(item)
//     cardList.addItem(card);
//   }

// }, photoContainerEl);
// cardList.renderItems();




// const cardList = new Section({items: initialCards, renderer: (item) => {
//   const card = new Card(item, '.template', () => {
//     popupOpenImage.open(item.name, item.link)});
//   const cardElement = card.createCard();
//   cardList.addItem(cardElement);
// }}, '.photo-items')

// cardList.renderItems();




// const cardList = new Section({
//   items: initialCards,
//   renderer: (cardItem) => {
//     const newCard = new createUserCard(cardItem);
//     cardList.addItem(newCard);
//   }
// },
// photoContainerEl);
// cardList.renderItems();



// function createUserCard(item) {
//   const card = new Card(item, '.template');
//   const newCard = card.createCard();
//   return newCard;
// };

// const cardList = new Section({
//   items: initialCards,
//   renderer: (cardItem) => {
//     const newCard = new createUserCard(cardItem);
//     cardList.addItem(newCard);
//   }
// },
// photoContainerEl);
// cardList.renderItems();


// открытие попапа

// function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closeByEsc);
// }


// закрытие попапа

// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closeByEsc);
// }


function addInfo() {
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
}

function handleUserInfoSubmit(evt) {
  evt.preventDefault();
  addInfo();
  closePopup(formEdit);
}


// попап редактирование профиля

const popupEdit = new PopupWithForm(formEdit, (inputValues) => {
  userInfo.setUserInfo(inputValues);
});
popupEdit.setEventListeners();


// editButton.addEventListener('click', showPopupEdit);

const userInfo = new UserInfo(profileSelectorData)

editButton.addEventListener('click', () => {
  formEdit.open();
  const newInfo = userInfo.getUserInfo();
  nameInput.value = newInfo.name;
  jobInput.value = newInfo.description;
  editFormValidator.clearErrors();
})


// function showPopupEdit() {
//   openPopup(formEdit);
//   nameInput.value = nameInfo.textContent;
//   jobInput.value = jobInfo.textContent;
//   editFormValidator.clearErrors();
// }


// function addCard() {
//   const titleInfo = titleInput.value;
//   const imgLinkInfo = imgLinkInput.value;
//   const cardItem = createCard({name: titleInfo, link: imgLinkInfo});
//   photoContainerEl.prepend(cardItem);
//   titleInput.value = '';
//   imgLinkInput.value = '';
//   submitButton.setAttribute('disabled', true);
// }

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const newCard = new Card({name:titleInput.value, link:imgLinkInput.value},'.template', popupBigPicture);
  photoContainerEl.prepend(newCard.createCard());
  titleInput.value = '';
  imgLinkInput.value = '';
  closePopup(formAdd);
}


// закрытие по overlay

formEdit.addEventListener('mousedown', (event) => {
  if (event.target === event.currentTarget) {
    closePopup(formEdit);
  }
});

formAdd.addEventListener('mousedown', (event) => {
  if (event.target === event.currentTarget) {
    closePopup(formAdd);
  }
});

popupBigPicture.addEventListener('mousedown', (event) => {
  if (event.target === event.currentTarget) {
    closePopup(popupBigPicture);
  }
});


// закрытие по esc

// function closeByEsc(evt) {
//   if (evt.key === ESC_CODE) {
//     const openedPopup = document.querySelector('.popup_opened');
//     closePopup(openedPopup);
//   }
// };


const validationConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inputErrorClass: 'popup__field_error',
  formError: '.popup__form-error',
  formErrorActive: 'popup__form-error_active',
  formLabel: '.popup__label'
}


const editFormValidator = new FormValidator(validationConfig, formEdit);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationConfig, formAdd);
addFormValidator.enableValidation();



// const popupBigPicture = new PopupWithImage({popupSelector:'.photo-items__img-button'});
// popupBigPicture.setEventListeners();





addButton.addEventListener('click', () => { openPopup(formAdd); addFormValidator.clearErrors();});
// closeEdit.addEventListener('click', () => { closePopup(formEdit); });
// closeAdd.addEventListener('click', () => { closePopup(formAdd); });
// closeImg.addEventListener('click', () => { closePopup(popupBigPicture); });

formEdit.addEventListener('submit', handleUserInfoSubmit);
formAdd.addEventListener('submit', handleAddCardSubmit);
