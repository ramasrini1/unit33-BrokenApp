### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
1) Call backs and Promises
2) async and await


- What is a Promise?
Promises in JavaScript are objects
They are native to the language as of ES2015
A promise can be in one of three states:
Pending - It doesn’t yet have a value
Resolved - It has successfully obtained a value
Rejected - It failed to obtain a value for some reason
The only way to access the resolved or rejected value is to chain a method on the end of the promise.
.then and .catch
Promises provide a .then and a .catch, which both accept callbacks.
The callback to .then will run if the promise is resolved, and has access to the promise’s resolved value.
The callback to .catch will run if the promise is rejected, and typically has access to some reason behind the rejection.


let validURL = "https://swapi.dev/api/people/1/";
let futureResolvedPromise = axios.get(validURL);

futureResolvedPromise
  .then(data => console.log(data))
  .catch(err => console.log(err));


- What are the differences between an async function and a regular function?
async ( Parallel )
sync (Non parallel)
A function in JavaScript is similar to a procedure—a set of statements that performs a task or calculates a value. It runs synchronously .

async function: Async functions enable us to write promise based code as if it were synchronous, but without blocking the execution thread. It operates asynchronously via the event-loop. Async functions will always return a value. Using async simply implies that a promise will be returned, 

The await operator is used to wait for a Promise. It can be used inside an Async block only. The keyword Await makes JavaScript wait until the promise returns a result. It has to be noted that it only makes the async function block wait and not the whole program execution.

- What is the difference between Node.js and Express.js?
Node.js
A JavaScript environment that runs server-side
It uses the Chrome v8 engine, but doesn’t require/use Chrome
Can be used to build any kind of server-side JS
Including building web applications!
or as a general-purpose scripting language
Why Node.js?
The entire stack (frontend/backend) can be JavaScript
There is an extensive set of add-on libraries via npm
Many can also be used in client-side JS

Express.js
Web Framework for Node.js similar to Flask for python
You can use node.js  modules but Express simplifies coding
Easy to send data to Node.js applications
Helps organize app into MVC architecture
Graceful Error handling.


- What is the error-first callback pattern?

- What is middleware?
What is Middleware?
It is code that runs in the middle of the request / response cycle!
In Express, middleware are functions that get access to the req and res objects and can also call the next function.
express.json() is an example of middleware
Our 404 and global error handler are example of middleware
When would you use it?
It opens up the door for separating our code into more logical groupings and providing more robust / abstracted error handling.

Logging useful information on every request
Adding a current_user for every request (like g in Flask!)
Ensuring that users are authenticated
Ensuring that a user is authorized to access an endpoint.


Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.
Middleware functions can perform the following tasks:
Execute any code.
Make changes to the request and the response objects.
End the request-response cycle.
Call the next middleware function in the stack.
If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

An Express application can use the following types of middleware:
Application-level middleware
Router-level middleware
Error-handling middleware
Built-in middleware
Third-party middleware
Bind application-level middleware to an instance of the app object by using the app.use() and app.METHOD()(example:app.get(“/user”))



- What does the `next` function do?
next('route') can be used to jump to that route and skip all routes in between, but sometimes next is called without arguments that means it is called when the app does not find the route

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
## The code runs synchronously ( so slower performance)
## There is no error handling if getJson fails.