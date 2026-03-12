import "../Css/PopupDialog.css";

const PopupDialog = ({ message, type }) => {

  if (!message) return null;

  return (
    <div className={`popup ${type}`}>
      {message}
    </div>
  );
};

export default PopupDialog;
