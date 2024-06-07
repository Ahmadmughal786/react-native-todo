React Native ToDo List Application (these files may not connect to each other but they have all the code)
Introduction:
This is a React Native ToDo List application where users can manage their tasks efficiently. 
The app supports CRUD (Create, Read, Update, Delete) operations and visual indicators to show the status of each task.
Tasks can be marked as completed, which changes their appearance to indicate their status.
The app uses axios for HTTP requests, react-native-vector-icons for icons, and saves data in a db.json file using JSON Server.

Screenshots

 ![main](https://github.com/Ahmadmughal786/react-native-todo/assets/102382719/119072ee-b3ac-405e-a4a4-e78ff871a4ab)
 
 ![addtask](https://github.com/Ahmadmughal786/react-native-todo/assets/102382719/0488266d-2554-4822-b964-2fb0583fade3)

![edittask](https://github.com/Ahmadmughal786/react-native-todo/assets/102382719/a52b88b1-9097-4d72-bdee-5317cb61c563)

![deletetask](https://github.com/Ahmadmughal786/react-native-todo/assets/102382719/6354d534-6a24-4028-93d8-f80f25e40b54)



 
 


Features :
Display a list of tasks.
Add new tasks.
Edit existing tasks.
Delete tasks.
Mark tasks as completed.
Visual indicators for task status:
Incomplete tasks have a red border.
Completed tasks have a green background.
Modal dialogs for adding and editing tasks.
Icons for performing CRUD operations using react-native-vector-icons.

CRUD Operations:
The application uses the following HTTP methods for CRUD operations:
GET: Retrieve and display tasks.
POST: Add a new task to the db.json API.
PUT: Edit an existing task.
DELETE: Remove a task.
PATCH: Update the task status (completed or not).

Getting Started:
Prerequisites
Node.js installed on your machine.
npm or yarn package manager.
JSON Server for local data storage.
Axios
react-native-vector-icons

git clone https://github.com/yourusername/react-native-todo-list.git
cd react-native-todo-list
npm install
# or
yarn install
npm install -g json-server
npx react-native link react-native-vector-icons
json-server --watch db.json --port 3000
npx react-native run-android
# or
npx react-native run-ios

