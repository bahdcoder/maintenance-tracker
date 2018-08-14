import connection from '../helpers/connection';

const client = connection();
client.connect();

/**
 * @class Validate User request
 */
export default class checkDuplicate {
/**
   * validate Request input string
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @param {Function} done
   *
   * @return {Object}
   */

  static checkDuplicate(req, res, done) {
    const
      userId = req.token.id.id;

    const {
      title,
      department,
      equipment,
      serialnumber,
      description,
    } = req.body;
    const checkRequestDuplicate = {
      text: 'SELECT * FROM requests WHERE title = $1 AND department =$2  AND equipment =$3 AND serialnumber = $4 AND description = $5 AND user_id = $6',
      values: [title, department, equipment, serialnumber, description, userId],
    };
    client.query(checkRequestDuplicate)
      .then((checkRequestDuplicates) => {
        if (checkRequestDuplicates.rows[0]) {
          return res.status(409)
            .json({
              message: 'request already exists',
              status: 'fail',
            });
        } return done();
      }).catch((err) => { res.status(500).send(err.message); });
  }
}
