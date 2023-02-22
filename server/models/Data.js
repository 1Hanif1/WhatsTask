/**
 * {
	_id: "MongoDB ID",
	uId: "ID of user",
	personalTaskList: [
		{
			name: List1,
			tasks: [
				{
					name: Create UI for Project,
					deadline: "year-month-day:time",
					subtasks: [
						{
							name: "Subtask here",
							status: "Complete | Incompleted"
						}
					],
					attachments: [
						"File Path of document 1",
						"File Path of document 2"
					],
					status: "completed | Incompleted"
				}
			]
		}
	],
	"workspace": [
		{
			name: "WorkSpace 1",
			allTaskLists: [
				{
					name: List1,
					tasks: [
						{
							name: Create UI for Project,
							deadline: "year-month-day:time",
							subtasks: [
								{
									name: "Subtask here",
									status: "Complete | Incompleted"
								}
							],
							attachments: [
								"File Path of document 1",
								"File Path of document 2"
							],
							status: "completed | Incompleted",
							assignedMembers: [
								``` Virtual Properties
									{
										uId: "Id of user from mongoDB",
										name: "User's name" 
									}
								```
							]
						}
					]
				}
			]
		}
	]	
}
 */

const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const taskSubSchema = new mongoose.Schema({
  name: String,
  status: { type: String, default: "incomplete" },
});

const attachmentSubSchema = new mongoose.Schema({
  path: String,
});

const assignedMemberSubSchema = new mongoose.Schema({
  uId: String,
  name: String,
  phoneNumber: String,
});

const personalTaskListSubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "List must have a name"],
  },
  tasks: {
    type: [
      {
        name: { type: String, required: [true, "Task must have a name"] },
        deadline: { type: Date, default: null },
        subtasks: [taskSubSchema],
        attachments: [attachmentSubSchema],
        status: { type: String, default: "incomplete" },
      },
    ],
    default: [],
  },
});

const workspaceTaskListSubSchema = new mongoose.Schema({
  name: { type: String, required: [true, "List must have a name"] },
  tasks: {
    type: [
      {
        name: { type: String, required: [true, "Task must have a name"] },
        deadline: { type: Date, default: null },
        subtasks: [taskSubSchema],
        attachments: [attachmentSubSchema],
        status: { type: String, default: "incomplete" },
        assignedMembers: [assignedMemberSubSchema],
      },
    ],
    default: [],
  },
});

const workspaceSubSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  allTaskList: [workspaceTaskListSubSchema],
});

const schema = new mongoose.Schema({
  uId: { type: String, unique: true },
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
  personalTaskList: {
    type: [
      {
        name: {
          type: String,
          required: [true, "List must have a name"],
        },
        tasks: {
          type: [
            {
              name: { type: String, required: [true, "Task must have a name"] },
              deadline: { type: Date, default: null },
              subtasks: [taskSubSchema],
              attachments: [attachmentSubSchema],
              status: { type: String, default: "incomplete" },
            },
          ],
          default: [],
        },
      },
    ],
    default: [],
    validate: [
      {
        validator: function (value) {
          const names = value.map((list) => list.name);
          return names.length === new Set(names).size;
        },
        message: "Task list names must be unique",
      },
    ],
  },
  workspace: {
    type: [workspaceSubSchema],
    default: [],
    validate: [
      {
        validator: function (value) {
          const names = value.map((list) => list.name);
          return names.length === new Set(names).size;
        },
        message: "Workspace names must be unique",
      },
    ],
  },
});

const Data = mongoose.model("Data", schema);

module.exports = Data;
