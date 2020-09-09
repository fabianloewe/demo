@echo on

start /b npx babel ../src -w -s --config-file ../.babelrc --out-dir ../lib && cd .. && npx nodemon lib/server/index.js -- %*
