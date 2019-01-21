# Bullhorn API

## Install

```
npm install --save bullhorn-api
```

## Usage

```js
const bullhorn = new Bullhorn({
  client_id: '',
  client_secret: '',
  username: '',
  password: '',
});

bullhorn.login()
  .then(data => {
    const query = encodeURIComponent('dateAvailable:[20170101 TO 20190101]');
    bullhorn.fetch(`search/Candidate?query=${query}&fields=name`)
      .then(req => {
        return req.json();
      }).then((req) => {
        console.log(req)
      })
  });
```