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
						}
					],
          members: [
            {
              memberId: "Xyz",
              memberName: "Abc",
              memberNumber: "Phone",
              memberEmail: "Email"
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
const User = require("./User");

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
  email: String,
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
  tasks: {
    type: [
      {
        name: { type: String, required: [true, "Task must have a name"] },
        deadline: { type: Date, default: null },
        subtasks: [taskSubSchema],
        attachments: [attachmentSubSchema],
        status: { type: String, default: "incomplete" },
        member: { type: String, default: "" },
      },
    ],
    default: [],
  },
  members: [assignedMemberSubSchema],
});

const schema = new mongoose.Schema({
  uId: { type: String, unique: true },
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
  phoneNumber: { type: String, unique: true },
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

// Add a method to the workspace field to add a member to a specific workspace
schema.methods.addMemberToWorkspace = async function (workspaceId, email) {
  const workspace = this.workspace.find((w) => {
    console.log(w._id);
    return w._id.toString() == workspaceId;
  });
  if (!workspace) {
    throw new Error("Workspace not found");
  }

  const existingMember = workspace.members.find(
    (member) => member.email === email
  );
  if (existingMember) {
    throw new Error("Member already exists in the workspace");
  }

  // Use a logic to check if the member exists, e.g. by querying the User model
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Member not found");
  }

  // Add the member to the assignedMembers array
  const newMember = {
    uId: user.uId,
    name: user.name,
    phoneNumber: user.phoneNumber,
    email: user.email,
  };
  workspace.members.push(newMember);

  // Save the updated document
  return this.save();
};

const Data = mongoose.model("Data", schema);

module.exports = Data;

// const Data = mongoose.model("Data", schema);

// module.exports = Data;
