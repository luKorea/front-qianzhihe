## npm run api
### api-code-builder
``` cmd
npm run api
> api-code-builder

? swagger document url http://172.16.90.74:8093/v2/api-docs
? need basic authorization? Yes
? username: fk
? password: [hidden]
? what's kind of the file? javascript
? where to output? src/api/api.js   
? need to save a config file? Yes
```
``` json
{
  "swaggerURL": [
    "http://172.16.90.74:8093/v2/api-docs"
  ],
  "basicAuthor": true,
  "username": "fk",
  "password": "",
  "version": "js",
  "output": "src/api/api.js",
  "axiosFrom": "",
  "customResponse": "",
  "addHostToBaseUrl": false,
  "protocol": "https"
}

```
``` json
{
  "swaggerURL": [
    "http://172.16.90.74:8093/v2/api-docs"
  ],
  "basicAuthor": true,
  "username": "fk",
  "password": "",
  "version": "js",
  "output": "src/api/api.js",
  "axiosFrom": "src/utils/req.js",
  "customResponse": "",
  "addHostToBaseUrl": false,
  "protocol": "https"
}

```