# Eadbox-api

[![npm version](https://badgen.net/npm/v/eadbox-api)](https://www.npmjs.com/package/eadbox-api)
[![npm downloads](https://badgen.net/npm/dm/eadbox-api)](https://www.npmjs.com/package/eadbox-api)

Essa é uma biblioteca que visa facilitar a realização de ações na API da plataforma EADBOX utilizando NodeJS!

## Instalação

```bash
$ npm install --save eadbox-api
```

```javascript
const Eadbox = require('eadbox-api');
const ead = new Eadbox(url);
```

## Documentação
### Devido utilizarem requisições, todas as funções são assíncronas!

- **makeLoginFromEmailAndPassword(userEmailPassword)**
userEmailPassword: objeto com parametros email e password
```javascript
{ email: 'teste@teste.com', senha: 'teste' }
```

- **getUserAuthTokenFromLogin(userEmailPassword)**
userEmailPassword: objeto com parametros email e password
```javascript
{ email: 'teste@teste.com', senha: 'teste' }
```

## Disclosure
Sinta-se livre para utilizar em seus projetos com objetivo financeiro, ou não financeiro!
Amplie o projeto enviando pull requests!
