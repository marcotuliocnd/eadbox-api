# Eadbox-api

[![npm version](https://badgen.net/npm/v/eadbox-api)](https://www.npmjs.com/package/eadbox-api)
[![npm downloads](https://badgen.net/npm/dm/eadbox-api)](https://www.npmjs.com/package/eadbox-api)

Essa é uma biblioteca que visa facilitar a realização de ações na API da plataforma EADBOX utilizando NodeJS!

## Instalação

```bash
$ npm install --save eadbox-api
```

```javascript
const eadbox = require('eadbox-api');
var adminAuthToken = eadbox.getUserAuthTokenFromLogin(url, emailAndPassword);
```

## Documentação
### Devido utilizarem requisições, todas as funções são assíncronas!

- **makeLoginFromEmailAndPassword(url, userEmailPassword)**
url: string sem barras no final.
```javascript
const url = 'https://unispk.com.br'
```
userEmailPassword: objeto com parametros email e password
```javascript
{ email: 'teste@teste.com', senha: 'teste' }
```

- **getUserAuthTokenFromLogin(url, userEmailPassword)**
url: string sem barras no final.
```javascript
const url = 'https://unispk.com.br'
```
userEmailPassword: objeto com parametros email e password
```javascript
{ email: 'teste@teste.com', senha: 'teste' }
```

## Disclosure
Sinta-se livre para utilizar em seus projetos com objetivo financeiro, ou não financeiro!
Amplie o projeto enviando pull requests!
