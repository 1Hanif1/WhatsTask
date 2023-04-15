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

// Get all workspace
exports.getWorkspace = catchAsyncError(async (req, res, next) => {
  const data = await Data.findOne({ uId: req.user._id });

  if (!data) {
    throw new AppError("No data found", 404);
  }

  const { workspace } = data;

  res.status(200).json({
    status: "success",
    data: workspace,
  });
});

// Create a new workspace
exports.createWorkspace = catchAsyncError(async (req, res, next) => {
  const data = await Data.findOne({ uId: req.user._id });

  if (!data) {
    throw new AppError("No data found", 404);
  }

  data.workspace.push(req.body);
  await data.validate();
  await data.save();
  res.status(200).json({
    status: "Success",
    data,
  });
});

// Add new task to a workspace
exports.addWorkspaceTask = catchAsyncError(async (req, res, next) => {
  const data = await Data.findOneAndUpdate(
    {
      uId: req.user._id,
      "workspace._id": req.params.id,
    },
    {
      $push: {
        "workspace.$.tasks": req.body,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!data)
    throw new AppError(`No Workspace with ID: ${req.params.id} found`, 404);

  res.status(200).json({
    status: "Success",
    data: data.workspace,
  });
});

// Add a member to the workspace
``;
exports.addWorkspaceMember = catchAsyncError(async (req, res, next) => {
  const { id } = req.params; // Extract the workspaceId from the request parameters
  const { email } = req.body; // Extract the email of the member to be added from the request body

  // Find the Data document by workspaceId
  const data = await Data.findOne({ uId: req.user._id });

  if (!data) {
    return res.status(404).json({ error: "Sender not found" });
  }

  // If data not found, return an error
  if (!data) {
    return res.status(404).json({ error: "Workspace not found" });
  }

  try {
    // Call the addMemberToWorkspace method to add the member to the workspace
    await data.addMemberToWorkspace(id, email);

    // If member successfully added, return a success response
    return res
      .status(200)
      .json({ message: "Member added to workspace successfully", data });
  } catch (error) {
    // If an error occurs, return an error response
    return res.status(400).json({ error: error.message });
  }
});

// Delete a Workspace
exports.deleteWorkspace = catchAsyncError(async (req, res, next) => {
  // Find the user's data by uId
  const data = await Data.findOne({ uId: req.user._id });

  // Check if data exists
  if (!data) {
    throw new AppError(`No data found for user with ID: ${req.user._id}`, 404);
  }

  // Find the index of the workspace to be deleted
  const workspaceIndex = data.workspace.findIndex((workspace) =>
    workspace._id.equals(req.body.id)
  );

  // Check if workspace exists
  if (workspaceIndex === -1) {
    throw new AppError(`No workspace found with ID: ${req.body.id}`, 404);
  }

  // Remove the workspace from the array
  data.workspace.splice(workspaceIndex, 1);

  // Save the updated data
  await data.save();

  res.status(204).json({
    status: "Success",
    message: `Workspace with ID: ${req.body.id} deleted successfully`,
  });
});

// Update a task on workspace
exports.updateWorkspaceTask = catchAsyncError(async (req, res, next) => {
  // Find the user's data by uId
  const data = await Data.findOne({ uId: req.user._id });

  // Check if data exists
  if (!data) {
    throw new AppError(`No data found for user with ID: ${req.user._id}`, 404);
  }

  // Find the index of the workspace to be updated
  const workspaceIndex = data.workspace.findIndex((workspace) =>
    workspace._id.equals(req.params.id)
  );

  // Check if workspace exists
  if (workspaceIndex === -1) {
    throw new AppError(`No workspace found with ID: ${req.params.id}`, 404);
  }

  // Find the index of the task to be updated
  const taskIndex = data.workspace[workspaceIndex].tasks.findIndex((task) =>
    task._id.equals(req.body.taskId)
  );

  // Check if task exists
  if (taskIndex === -1) {
    throw new AppError(`No task found with ID: ${req.params.taskId}`, 404);
  }

  // Update the task with the new data
  data.workspace[workspaceIndex].tasks[taskIndex] = req.body.data;

  // Save the updated data
  await data.save();

  res.status(200).json({
    status: "Success",
    data: data.workspace[workspaceIndex].tasks[taskIndex],
  });
});

exports.deleteWorkspaceTask = catchAsyncError(async (req, res, next) => {
  // Find the user's data by uId
  const data = await Data.findOne({ uId: req.user._id });

  // Check if data exists
  if (!data) {
    throw new AppError(`No data found for user with ID: ${req.user._id}`, 404);
  }

  // Find the index of the workspace to be updated
  const workspaceIndex = data.workspace.findIndex((workspace) =>
    workspace._id.equals(req.params.id)
  );

  // Check if workspace exists
  if (workspaceIndex === -1) {
    throw new AppError(`No workspace found with ID: ${req.params.id}`, 404);
  }

  // Find the index of the task to be deleted
  const taskIndex = data.workspace[workspaceIndex].tasks.findIndex((task) =>
    task._id.equals(req.body.taskId)
  );

  // Check if task exists
  if (taskIndex === -1) {
    throw new AppError(`No task found with ID: ${req.body.taskId}`, 404);
  }

  // Remove the task from the tasks array
  data.workspace[workspaceIndex].tasks.splice(taskIndex, 1);

  // Save the updated data
  await data.save();

  res.status(204).json({
    status: "Success",
    data: null,
  });
});
