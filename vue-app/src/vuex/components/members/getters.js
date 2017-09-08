/* eslint arrow-body-style:0, no-unused-vars:0, no-underscore-dangle:0, arrow-parens:0  */

const getters = {
  members: (state) => {
    return state.products;
  },
  member: (state) => {
    return state.product;
  },
};

export default getters;
