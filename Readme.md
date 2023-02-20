## Set up (Server)

Create a `config.env` file and put the following values inside

```
NODE_ENV=development
DATABASE=mongodb+srv://`Your MongoDB URL`/whatstask?retryWrites=true&w=majority
DATABASE_PASSWORD=`MongoDB password`
JWT_SECRET=`YOUR SECRET TOKEN`
JWT_EXPIRES_IN=90d
PORT=3000
HOST=127.0.0.1
```

## API Endpoints

### Authentication

(POST) Signup: <http://127.0.0.1:3000/api/auth/signup>

Body Data:

```
{
    "name": "your name",
    "phoneNumber": "1234567890",
    "email": "name@email.com",
    "password": "pass12345",
    "passwordConfirm": "pass12345"
}
```

(POST) Login: <http://127.0.0.1:3000/api/auth/login>

Body Data:

```
{
    "email": "hanif@email.com",
    "password": "pass12345"
}
```

### User Data

Note: You must send JWT Token along with the request by adding the following to the request header

`Authorization: 'Bearer JWT_TOKEN'`

(GET) Get User Data: <http://127.0.0.1:3000/api/user>

### Personal Task List

- Note: You must send JWT Token along with the request by adding the following to the request header. `{Authorization: 'Bearer JWT_TOKEN'}`

- Note: [id] refers to the mongoDb Id of a particular List. Example: `63f2058c99824925c4e3ece1`

(GET) Get All Lists: <http://127.0.0.1:3000/api/user/task/list>

(GET) Get a list: <http://127.0.0.1:3000/api/user/task/list/[id]>

(Post) Create List: <http://127.0.0.1:3000/api/user/task/list>

Body Data:

```
{
    "Name": "Name of List"
}
```

(Post) Delete List: <http://127.0.0.1:3000/api/user/task/list>

Body Data:

```
{
    "listId": "[id]"
}
```

(Post) Add Task to a list: <http://127.0.0.1:3000/api/user/task/list/[id]>

Body Data:

`{
    "name": "Task Name"
}`

(Post) Delete Task from a list: <http://127.0.0.1:3000/api/user/task/list/[id]>

Body Data:

```
{
    "taskId": "MongoDB ID for a task"
}
```

(PATCH) Update a task added to a list: <http://127.0.0.1:3000/api/user/task/list/[id]>

Body Data (Example):

```{
    "taskId": "63f321fdf31e4532dc9208dd",
    "data": {
        "name": "Design Dashboard and Landing Page",
        "deadline": "",
        "subtasks": [
                {
                    "name": "Create WireFrame and UX",
                    "status": "incomplete"
                },
                {
                    "name": "Desing Figma File",
                    "status": "complete"
                }
            ],
        "attachments": [
            {
                "path": "./file.pdf"
            }
        ],
        "status": "complete"
    }
}
```
