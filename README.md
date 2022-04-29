# router-template

This is sort of a skeleton/template project.
This starting point includes a client-side "router" and a "server".


## Running
After cloning please install the dependencies by running
```sh
$ npm install
```

You can then run the server like so
```sh
$ npm start
```

## A little info
The server handles serving html, css, javascript, and other files to the browser.
Notably it will always return the `index.html` file if it can't find the given path.

This leads us to the router. The router "swallows" all the relevant events from the browser
such that the it never redirects whenever you click on a same-origin link. If you click on
a link with a different origin it will direct the browser to that link.

The router is an object that needs two parameters. The first is an object describing the
routes, and the second is a callback function that is called whenever the router is invoked.

The object describing the routes should look something like this:
```javascript
const routes = {
    '/': {},
    '/page-1': {a: "foo"},
    '/page-2': {a: "bar"},
    '/page-3/:some_id': {b: "baz"},
```

If we then navigate to `http://localhost:8080/page-3/65/` the router will the call our
callback function with the a single paramter. This parameter contains the object we just
specified in our routes, plus the path variables. It will look something like this:

```javascript
{b: "baz", path_variables: {some_id: "5"}}
```

You can see this in action in [index.js](/public/index.js) where we specify a template name
and a page function in our routes object. And in our callback function we use that information
to activate the template and pass along the path variables to the page handler function.
