import Validate from 'validatorjs';

/**
 * @class Validate Request
 */
export default class ValidateRequest {
  /**
   * validate Request input length
   * @param {Object} request
   * @param {Object} response
   *
   *  @param {Function} next
   *
   *  @return {Object}
   */
  static vallidateRequest(req, res, next) {
    const {
      title,
      department,
      equipment,
      serialnumber,
      description,
    } = req.body;


    const data = {
      title,
      department,
      equipment,
      serialnumber,
      description,
    };

    const rules = {
      title: ['required', 'string', 'regex:/^[a-z\\d\\-_,.*()!\\s]+$/i', 'min:5', 'max:20'],
      department: ['required', 'string', 'regex:/^[a-z\\d\\-_,.*()!\\s]+$/i'],
      equipment: ['required', 'string', 'regex:/^[a-z\\d\\-_,.*()!\\s]+$/i'],
      serialnumber: ['required', 'string', 'regex:/^[a-z\\d\\-_,.*()!\\s]+$/i', 'min:8', 'max:8'],
      description: ['required', 'string', 'regex:/^[a-z\\d\\-_,.*()!\\s]+$/i', 'min:3', 'max:50'],
    };

    const validations = new Validate(data, rules, {
      'min.title': 'The :attribute must not be less than 5 characters.',
      'max.title': 'The :attribute must not be greater than 20 characters.',
      'min.serialnumber': 'The :attribute must be only 8 characters.',
      'max.serialnumber': 'The :attribute must be only 8 characters.',
      'min.description': 'The :attribute must not be less than 3 characters.',
      'max.description': 'The :attribute must not be greater than 50 characters.',
    });

    if (validations.passes()) {
      return next();
    }

    return res.status(406).json({
      status: 'fail',
      data: {
        errors: validations.errors.all(),
      },
    });
  }

  /**
     * validate Request input length
     * @param {Object} request
     * @param {Object} response
     *
     *  @param {Function} next
     *
     *  @return {Object}
     */
  static vallidateUpdateRequest(request, response, next) {
    const {
      title,
      department,
      equipment,
      serialnumber,
      description,
    } = request.body;

    if (!title && !department && !equipment && !serialnumber && !description) {
      response.status(406).json({
        status: 'fail',
        message: 'field to be updated required',
      });
    }


    const data = {
      title,
      department,
      equipment,
      serialnumber,
      description,
    };

    const rules = {
      title: ['required_with:title', 'string', 'regex:/^[a-z\\d\\-_,.*()!\\s]+$/i'],
      department: ['required_with:department', 'string', 'regex:/^[a-z\\d\\-_,.*()!\\s]+$/i'],
      equipment: ['required_with:equipment', 'string', 'regex:/^[a-z\\d\\-_,.*()!\\s]+$/i'],
      serialnumber: ['required_with:serialnumber', 'string', 'regex:/^[a-z\\d\\-_,.*()!\\s]+$/i', 'min:8', 'max:8'],
      description: ['required_with:description', 'required_with:description', 'string', 'regex:/^[a-z\\d\\-_,.*()!\\s]+$/i', 'min:3', 'max:50'],
    };

    const validations = new Validate(data, rules);

    if (validations.passes()) {
      return next();
    }

    return response.status(406).json({
      status: 'fail',
      data: {
        errors: validations.errors.all(),
      },
    });
  }
  /**
   * validate Request id parameter
   * @param {Object} req
   * @param {Object} res
   *
   * @param {Function} next
   *
   * @return {Object} json
   */
  static idIsNumber(req, res, next) {
    const {
      id,
    } = req.params;

    const data = {
      id,
    };
    const rules = {
      id: ['required', 'integer'],
    };
    const validations = new Validate(data, rules);

    if (validations.passes()) {
      return next();
    }

    return res.status(406).json({
      status: 'fail',
      data: {
        errors: validations.errors.all(),
      },
    });
  }
}

