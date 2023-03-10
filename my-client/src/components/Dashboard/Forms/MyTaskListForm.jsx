export default function MyTaskListForm(props) {
  const { classes } = props;
  return (
    <div>
      <div className={classes.formInput}>
        <input type="text" placeholder="Enter List Name" />
      </div>
      <div className={classes.formButton}>
        <button>Add List</button>
      </div>
    </div>
  );
}
