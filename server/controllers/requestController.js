import connection from '../helpers/connection';


const client = connection();
client.connect();

/**
 * @class requestController
 *
 * @export
 *
 */
export default class RequestController {
  /**
   * @description - gets all requests
   * @static
   *
   * @param {object} request - HTTP Request
   * @param {object} response - HTTP Response
   *
   * @memberof requestController
   *
   */
  static getAllRequests(req, res) {
    const {
      id,
    } = req.token.id;
    const findRequest = `SELECT * FROM requests WHERE user_id=${id}`;
    client.query(findRequest)
      .then((foundRequest) => {
        if (!foundRequest.rows[0]) {
          return res.status(404)
            .json({
              message: 'no request available',
              status: 'fail',
            });
        }
        return res.status(200)
          .json({
            data: {
              request: foundRequest.rows,
            },
            message: 'request gotten successfully',
            status: 'success',
          });
      }).catch((err) => { res.status(500).send(err.message); });
  }
  /**
   * @description - get a single request
   * @static
   *
   * @param {object} request - HTTP Request
   * @param {object} response - HTTP Response
   *
   * @memberof requestController
   *
   */
  static getRequestById(req, res) {
    const {
      id,
    } = req.token.id;
    const requestId = parseInt(req.params.id, 10);
    const findRequestById = `SELECT * FROM requests WHERE id = ${requestId} AND user_id =${id}`;

    client.query(findRequestById)
      .then((foundRequestById) => {
        if (!foundRequestById.rows[0]) {
          return res.status(404)
            .json({
              message: 'no request available with given id',
              status: 'fail',
            });
        }
        if (foundRequestById.rows[0].user_id === id) {
          return res.status(200).json({
            data: {
              request: foundRequestById.rows[0],
            },
            message: 'single request gotten successfully',
            status: 'success',
          });
        }
        return res.status(403).json({
          message: 'request cannot be viewed by you',
          status: 'fail',
        });
      }).catch((err) => { res.status(500).send(err.message); });
  }
  /**
   * @description - create a  request
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof requestController
   *
   */
  static createRequest(req, res) {
    const {
      id,
    } = req.token.id;
    const {
      title,
      department,
      equipment,
      serialnumber,
      description,
    } = req.body;
    const requests =
      `
    INSERT INTO requests (
      user_id,
      title,
      department,
      equipment,
      serialnumber,
      description
    )
    VALUES (
      '${id}',
      '${title}',
      '${department}',
      '${equipment}',
      '${serialnumber}',
      '${description}'
    ) RETURNING *;`;
    client.query(requests)
      .then(newRequest => res.status(201)
        .json({
          data: {
            request: newRequest.rows[0],
          },
          message: 'request created successfully',
          status: 'success',
        })).catch((err) => {
        res.status(500).send(err.message);
      });
  }

  /**
   * @description - update a request
   * @static
   *
   * @param {object} request - HTTP Request
   * @param {object} response - HTTP Response
   *
   * @memberof requestController
   *
   */
  static updateRequest(req, res) {
    const requestId = parseInt(req.params.id, 10);
    const {
      id,
    } = req.token.id;
    const findRequestById = `SELECT * FROM requests WHERE id = ${requestId} AND user_id =${id}`;
    client.query(findRequestById)
      .then((foundRequestById) => {
        if (!foundRequestById.rows[0]) {
          return res.status(404)
            .json({
              message: 'request with id not available',
              status: 'fail',
            });
        }
        const mergeRequestUpdateAndRequest = { ...foundRequestById.rows[0], ...req.body };
        const {
          title,
          department,
          equipment,
          serialnumber,
          description,
        } = mergeRequestUpdateAndRequest;

        const requestUpdate = {

          text: 'UPDATE requests SET title=$1, department=$2, equipment=$3, serialNumber=$4,description=$5 WHERE id= $6 AND user_id =$7 RETURNING *',
          values: [title, department, equipment, serialnumber,
            description, requestId, id,
          ],
        };
        return client.query(requestUpdate)
          .then((newRequestUpdated) => {
            if (newRequestUpdated.rows[0].requeststatus === 'pending') {
              res.status(200)
                .json({
                  data: {
                    updatedRequest: newRequestUpdated.rows[0],
                  },
                  message: 'request updated successfully',
                  status: 'success',
                });
            }
            res.status(403)
              .json({
                message: 'cannot update, request is no longer pending',
                status: 'fail',
              });
          });
      }).catch((err) => {
        res.status(500).send(err.message);
      });
  }
}

