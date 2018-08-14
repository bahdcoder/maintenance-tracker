import Validate from 'validatorjs';

/**
 * @class Validate User SIgn In and Sign Up input
 */
export default class ValidateUser {
  /**
   * validate user sign in input string
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @param {Function} next
   *
   * @return {Object}
   */
  static validateSigninInput(req, res, next) {
    const {
      email,
      password,
    } = req.body;
    const data = {
      email,
      password,

    };

    const rules = {
      email: 'required|email|string',
      password: 'required|min:8|max:10|string',
    };

    const validations = new Validate(data, rules, {
      'min.passowrd': 'The :attribute must not be less than 8 characters.',
      'max.password': 'The :attribute must not be greater than 30 characters.',
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
   * validate user sign up input string
   *
   * @param {Object} request
   * @param {Object} response
   * @param {Function} next
   *
   * @return {Object}
   */
  static validateSignupInput(req, res, next) {
    const {
      email,
      password,
      name,
    } = req.body;
    const data = {
      email,
      password,
      name,
    };

    const rules = {
      name: ['required', 'regex:/^[a-z\\d\\-_,.*()!\\s]+$/i', 'min:3', 'max:15', 'string'],
      email: 'required|email|string',
      password: 'required|min:8|max:30|string',
    };

    const validations = new Validate(data, rules, {
      'min.password': 'The :attribute must not be less than 8 characters.',
      'max.password': 'The :attribute must not be greater than 30 characters.',
      'min.name': 'The :attribute must not be less than 3 characters.',
      'max.name': 'The :attribute must not be greater than 15 characters.',
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
}
