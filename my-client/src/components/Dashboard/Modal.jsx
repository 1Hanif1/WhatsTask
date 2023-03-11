export default function Modal(props) {
  const { classes, isOpen, setModalState, modalForm } = props;
  return (
    <div
      className={`${classes.overlay} ${!isOpen ? classes.hide : ""}`}
      onClick={() => setModalState(false)}
    >
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        {modalForm}
      </div>
    </div>
  );
}
