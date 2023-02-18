## Set up (Server)

Create a `config.env` file and put the following values inside

- NODE_ENV=development
- DATABASE=mongodb+srv://`Your MongoDB URL`/whatstask?retryWrites=true&w=majority
- DATABASE_PASSWORD=`MongoDB password`
- JWT_SECRET=`YOUR SECRET TOKEN`
- JWT_EXPIRES_IN=90d
- PORT=3000
- HOST: 127.0.0.1

## API Endpoints

(POST) Login: <http://127.0.0.1:3000/api/auth/login>

(POST) Signup: <http://127.0.0.1:3000/api/auth/signup>

(GET) Get User Data: <http://127.0.0.1:3000/api/user>
