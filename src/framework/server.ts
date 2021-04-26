/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import app from './app';

const port = 3333;
const host = '0.0.0.0';

app.server.listen(port, host, () => {
  console.log(
    `Server listening at: \n Web: http://${
      host === '0.0.0.0' ? 'localhost' : host
    }:${port} \n Api: http://${
      host === '0.0.0.0' ? 'localhost' : host
    }:${port}${app.graphqlServer.graphqlPath}`,
  );
});
