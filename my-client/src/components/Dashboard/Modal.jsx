export default function Modal(props) {
  const { classes, modalIsOpen, setModalState, modalForm } = props;
  return (
    <div
      className={`${classes.overlay} ${!modalIsOpen ? classes.hide : ""}`}
      onClick={() => setModalState(false)}
    >
      <div className={classes.modal}>{modalForm}</div>
    </div>
  );
}
