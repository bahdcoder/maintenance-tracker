import connection from '../helpers/connection';

const client = connection();
client.connect();

const findRequestById = (req, res, next) => {
  const requestId = parseInt(req.params.id, 10);
  const findRequest = `SELECT * FROM requests WHERE id = '${requestId}'`;
  client.query(findRequest)
    .then((foundRequest) => {
      if (!foundRequest.rows[0]) {
        return res.status(404)
          .json({
            message: 'request with id not available',
            status: 'fail',
          });
      }req.foundRequest = { foundRequest: foundRequest.rows[0] };
      return next()
  }).catch((err) => { res.status(500).send(err.message); });

};
export default findRequestById;
