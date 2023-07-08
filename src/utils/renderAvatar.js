import imageAvatar from 'assets/images/avatar.svg';

const resolveAvatar = (avatar) => {
  if (!avatar) {
    return imageAvatar;
  }

  const uint8Array = new Uint8Array(avatar);
  const base64String = window.btoa(String.fromCharCode.apply(null, uint8Array));

  return `data:image/jpeg;base64,${base64String}`;
};

export default resolveAvatar;
