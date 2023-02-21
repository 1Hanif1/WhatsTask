const Data = require("../models/Data");
const AppError = require("../utils/appError");
const catchAsyncError = require("../utils/catchAsync");
// Get user dashboard data
exports.getUserData = catchAsyncError(async (req, res, next) => {
  const userData = await Data.find({ uId: req.user._id }).populate("user");
  res.json({
    status: "Success",
    data: userData[0],
  });
});

// Send all list in personal task list
exports.getAllList = catchAsyncError(async (req, res, next) => {
  const data = await Data.findOne({ uId: req.user._id });
  if (!data) throw new AppError("No data found", 404);
  res.status(200).json({
    status: "Success",
    data: data.personalTaskList,
  });
});

// Create a new list in personal task list
exports.createList = catchAsyncError(async (req, res, next) => {
  const data = await Data.findOne({ uId: req.user._id });
  if (!data) throw new AppError("No data found", 404);
  data.personalTaskList.push(req.body);
  await data.validate();
  await data.save();
  res.status(200).json({
    status: "Success",
    data,
  });
});

// Delete a List in personal task list
// exports.deleteList = catchAsyncError(async (req, res, next) => {
//   const data = await Data.findOne({ uId: req.user._id });
//   if (!data) throw new AppError("No data found", 404);
//   if (!data.personalTaskList.some((list) => list._id == req.body.listId))
//     throw new AppError(`No List with ID: ${req.body.listId} found`, 404);

//   data.personalTaskList.forEach((list, index) => {
//     if (list._id == req.body.listId) {
//       data.personalTaskList.splice(index, 1);
//     }
//   });

//   await data.validate();
//   await data.save();

//   res.status(201).json({ status: "success" });
// });

exports.deleteList = catchAsyncError(async (req, res, next) => {
  const data = await Data.findOneAndUpdate(
    {
      uId: req.user._id,
      "personalTaskList._id": req.body.listId,
    },
    {
      $pull: { personalTaskList: { _id: req.body.listId } },
    },
    {
      new: true,
    }
  );

  if (!data)
    throw new AppError(`No List with ID: ${req.body.listId} found`, 404);

  await data.validate();
  await data.save();

  res.status(201).json({ status: "success" });
});

// Get Specific Task List
// exports.getList = catchAsyncError(async (req, res, next) => {
//   const data = await Data.findOne({ uId: req.user._id });
//   if (!data) throw new AppError("No data found", 404);
//   data.personalTaskList.forEach((list) => {
//     if (list._id == req.params.id) {
//       res.status(200).json({
//         status: "success",
//         data,
//       });
//     }
//   });

//   res.status(404).json({
//     status: "fail",
//     message: `No List with ID:${req.params.id} found`,
//   });
// });

exports.getList = catchAsyncError(async (req, res, next) => {
  const data = await Data.findOne({ uId: req.user._id });

  if (!data) {
    throw new AppError("No data found", 404);
  }

  const list = data.personalTaskList.find((list) => list._id == req.params.id);

  if (!list) {
    return res.status(404).json({
      status: "fail",
      message: `No List with ID:${req.params.id} found`,
    });
  }

  res.status(200).json({
    status: "success",
    data: list,
  });
});

// Add new task to a personal task list
// exports.addTask = catchAsyncError(async (req, res, next) => {
//   const data = await Data.findOne({
//     uId: req.user._id,
//   });

//   if (!data) throw new AppError("No task list found", 404);

//   if (!data.personalTaskList.some((list) => list._id == req.params.id))
//     throw new AppError(`No List with ID: ${req.params.id} found`, 404);

//   data.personalTaskList.forEach((list) => {
//     if (list._id == req.params.id) {
//       list.tasks.push(req.body);
//     }
//   });

//   await data.validate();
//   await data.save();

//   res.status(200).json({
//     status: "Success",
//     data: data.personalTaskList,
//   });
// });
exports.addTask = catchAsyncError(async (req, res, next) => {
  const data = await Data.findOneAndUpdate(
    {
      uId: req.user._id,
      "personalTaskList._id": req.params.id,
    },
    {
      $push: {
        "personalTaskList.$.tasks": req.body,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!data) throw new AppError(`No List with ID: ${req.params.id} found`, 404);

  res.status(200).json({
    status: "Success",
    data: data.personalTaskList,
  });
});

// Delete a task from a personal task list
// exports.deleteTask = catchAsyncError(async (req, res, next) => {
//   const data = await Data.findOne({
//     uId: req.user._id,
//   });

//   if (!data) throw new AppError("No task list found", 404);

//   if (!data.personalTaskList.some((list) => list._id == req.params.id))
//     throw new AppError(`No List with ID: ${req.params.id} found`, 404);

//   data.personalTaskList.forEach((list) => {
//     if (list._id == req.params.id) {
//       list.tasks.forEach((task, index) => {
//         if (task._id == req.body.taskId) {
//           list.tasks.splice(index, 1);
//         }
//       });
//     }
//   });

//   // await data.validate();
//   await data.save();

//   res.status(201).json({
//     status: "Success",
//   });
// });

exports.deleteTask = catchAsyncError(async (req, res, next) => {
  const data = await Data.findOneAndUpdate(
    {
      uId: req.user._id,
      "personalTaskList._id": req.params.id,
      "personalTaskList.tasks._id": req.body.taskId,
    },
    {
      $pull: {
        "personalTaskList.$.tasks": { _id: req.body.taskId },
      },
    },
    {
      new: true,
    }
  );

  if (!data) throw new AppError("No task list found", 404);

  res.status(200).json({
    status: "success",
    data,
  });
});

// Add Subtask to a task in personal task list
exports.updateTask = catchAsyncError(async (req, res, next) => {
  const data = await Data.findOne({ uId: req.user._id });

  if (!data) throw new AppError("No task list found", 404);

  if (!data.personalTaskList.some((list) => list._id == req.params.id))
    throw new AppError(`No List with ID: ${req.params.id} found`, 404);

  let foundTask = false;
  let foundList = null;

  data.personalTaskList.forEach((list) => {
    if (list._id == req.params.id) {
      list.tasks.forEach((task) => {
        if (task._id == req.body.taskId) {
          foundTask = true;
          foundList = list;
          task.name = req.body.data.name;
          task.status = req.body.data.status;
          task.subtasks = req.body.data.subtasks;
          task.attachments = req.body.data.attachments;
          if (req.body.data.deadline) {
            task.deadline = new Date(req.body.data.deadline);
          }
        }
      });
    }
  });

  if (!foundTask) {
    throw new AppError(`No Task with ID: ${req.body.taskId} found`, 404);
  }

  await data.validate();
  await data.save();

  res.status(200).json({
    status: "Success",
    data: foundList,
  });
});

// Create a new workspace
exports.createWorkspace = catchAsyncError(async (req, res, next) => {});

// Add new task to a workspace
exports.addWorkspaceTask = catchAsyncError(async (req, res, next) => {});

// Add a member to the workspace
exports.addWorkspaceMember = catchAsyncError(async (req, res, next) => {});
