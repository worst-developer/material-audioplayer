# React Audio Player
## with Material-UI components and own back-end server

this project includes such general technologies: 
  * [React](https://github.com/facebook/react) - general UI freamework technology;
  * [Redux](https://github.com/reactjs/redux/) - following pattern of flow data in `React` projects;
  * [Redux-Saga](https://github.com/redux-saga/redux-saga) - for separating logic of actions and API calls;
  * [Webpack 2](https://github.com/webpack/webpack) - for building JS Bundle
  * AWS static web-app hosting 
  * [Yarn](https://github.com/yarnpkg/yarn) - to lock versions of all dependencies anf for faster instalatio

## Development and build process

[npm](https://www.npmjs.com/) is used to define the 3rd party dependencies required by the frontend. *npm* comes with [node](https://nodejs.org) so make sure there are already installed:

    $ node -v
    >= 8.4.0

    $ npm -v
    >= 5.3.0

## Main project files and folders 

* [app](./app)
  * [assets](./app/assets)
  * [sources](./app/sources)
    * [components](./app/sources/components)
    * [containers](./app/sources/containers)
      * [App](./app/sources/containers/App)
      * [AudioPlayer](./app/sources/containers/AudioPlayer)
    * [utils](./app/sources/utils)
      * [FetchApi.js](./app/sources/utils/FetchApi.js)
    * [reducer.js](./app/sources/reducer.js)
    * [saga.js](./app/sources/saga.js)
    * [store.js](./app/sources/store.js)
* [styles](./app/styles)
* [app.js](./app/app.js)
* [webpack](./webpack)
* [build](./build)
* [package.json](./package.json)

These are the main folders and files short description:

| file or folder          |                        details                              |
|-------------------------|-------------------------------------------------------------|
| .app                    | Main project folder  |
| assets                  | All project assets incuding fonts and images  |
| sources                 | Root folder for buisness logic |
| components              | All react extandable React components stateless and not |
| Common                  | Reusable components |
| Containers              | "Smart" components   |
| App                     | Required react general component  |
| AudioPlayer             | Container which icludes main player |
| Utils/FetchApi.js       | Wrapper for http calls |
| app/sources/reducer.js  | Main reducer file |
| app/sources/saga.js     | Main saga file |
| build                   | folder with built project and minified files |
| .env                    | Stores enviroment varialabales including AWS credentionals |

## Install

To download and install the dependencies set in [package.json](package.json):

      $ yarn

## Build & Serve

[Webpack](https://webpack.github.io/) has become the defacto standard for building React frontend, it is configured through 1 files:

* [webpack.config.js](./webpack/webpack.config.js): the configuration common to all environment, depends on enviroment flag.
 In develpoment mode a new browser page will be opened at the right URL i.e: `http://localhost:8080`. Thanks to the Webpack plugin `OpenBrowserPlugin`.

To run the front-end development web server:

    $ yarn start

> **Hot reloading**: Webpack detects any change in the code, it rebuilds automatically and pushes the new change the browser, no manual browser refresh required.

To run back-end web-server go to: [api](./api) folder and run following command

      $ yarn dev-server

## Deploy front-end to AWS static hosting

To build the production version :

    $ yarn deploy

*webpack* will a production build with minified bundle and assets then it would automatically upload it to AWS using credentials indicated in .env file then it would automatically open browser window with link to AWS. 

## Production build

To build the production version:

    $ yarn build
