/**
 * Constants file
 */
const constants = {
  // Code: 1xxxx
  common: {
    // 10xxx
    success: {},
    // 11xxx
    error: {
      INVALID_ID: {
        code: 11000,
        message: 'Id is invalid or not defined',
      },
      INVALID_NUMBER_TYPE: {
        code: 11001,
        message: 'Invalid number type',
      },
      OPERATION_NOT_ALLOWED: {
        code: 11002,
        message: 'Operation not allowed',
      },
    },
  },
  // Constants for User module
  // Code: 2xxxx
  user: {
    // 20xxx
    success: {
      CREATED: { code: 20000, message: 'User successfully created' },
      UPDATED: { code: 20001, message: 'User successfully updated' },
      REMOVED: { code: 20002, message: 'User successfully removed' },
    },
    // 21xxx
    error: {
      USER_NOT_FOUND: {
        code: 21001,
        message: 'User not found',
      },
    },
  },
  // Constants for Role module
  // Code: 3xxxx
  role: {
    // 30xxx
    success: {
      CREATED: { code: 30000, message: 'Role successfully created' },
      UPDATED: { code: 30001, message: 'Role successfully updated' },
      REMOVED: { code: 30002, message: 'Role successfully removed' },
    },
    // 31xxx
    error: {
      ROLE_NOT_FOUND: {
        code: 31001,
        message: 'Role not found',
      },
    },
  },
  // Constants for Member module
  // Code: 4xxxx
  member: {
    // 40xxx
    success: {
      CREATED: { code: 40000, message: 'Member successfully created' },
      UPDATED: { code: 40001, message: 'Member successfully updated' },
      REMOVED: { code: 40002, message: 'Member successfully removed' },
    },
    // 41xxx
    error: {
      MEMBER_NOT_FOUND: {
        code: 41001,
        message: 'Member not found',
      },
    },
  },
};

export { constants as default };
