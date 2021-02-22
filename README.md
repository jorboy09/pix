// init react and sass
npx create-react-app (react file name) --template typescript
npm install node-sass@^4.0.0
// backend
yarn
yarn add knex @types/knex pg @types/pg
yarn knex init -x ts
yarn knex migrate:make --knexfile knexfile.ts -x ts create-users
yarn knex migrate:make --knexfile knexfile.ts -x ts create-memos
yarn knex migrate:latest
yarn knex migrate:up
yarn knex migrate:rollback
yarn knex migrate:down
yarn knex seed:make -x ts create-users-and-memos
yarn knex seed:run
// redux
yarn add redux react-redux @types/react-redux
yarn add redux-logger @types/redux-logger
// react-router
yarn add react-router-dom @types/react-router-dom use-react-router
//redux-thunk
yarn add redux-thunk @types/redux-thunk
// npm packages
yarn add express @types/express
yarn add dotenv @types/dotenv
yarn add cors @types/cors
yarn add body-parser @types/body-parser
npm install react-color --save


Figma: https://www.figma.com/file/E4gsAL4IbM2f16b7NhjGXX/FRD-Project?node-id=0%3A1

database: https://drive.google.com/file/d/1Y-u2sO1NCKsBIQp1YT632c-b4-HOK952/view?usp=sharing

gitlab: https://gitlab.com/jorboy119/final-project
