#DB Migrations Notes
-`npm install mysql --save`
-`npm install db-migrate -g` -- no servidor
-`npm install db-migrate-mysql ---save` -- no servidor

-Criar migration (a partir da pasta raiz do projeto)
-`node node_modules/db-migrate/bin/db-migrate create usuario --config ./src/config/database/dev.json`

-Executar Tests migrations 
  -`node node_modules/db-migrate/bin/db-migrate up --config ./src/config/database/test.json`
  -`node node_modules/db-migrate/bin/db-migrate down --config ./src/config/database/test.json`

-Executar Dev migrations   
  -`node node_modules/db-migrate/bin/db-migrate up --config ./src/config/database/dev.json`
  -`node node_modules/db-migrate/bin/db-migrate down --config ./src/config/database/dev.json`

-Executar Prod migrations 
  -`node node_modules/db-migrate/bin/db-migrate up --config ./src/config/database/prod.json`
  -`node node_modules/db-migrate/bin/db-migrate down --config ./src/config/database/prod.json`