import Bullhorn from './index';

const config = {
  client_id: '',
  client_secret: '',
  username: '',
  password: '',
}

const bullhorn = new Bullhorn(config);

bullhorn.login()
  .then(data => {
    console.log(data)

    const query = encodeURIComponent('dateAvailable:[20170101 TO 20190101]');
    bullhorn.fetch(`search/Candidate?query=${query}&fields=name`)
      .then(req => {
        console.log(req)
        return req.json();
      }).then((req) => {
        console.log(req)
      })
  });