import actions from '../action/actions';

const roles = {
  ADMIN: {
    name: 'ADMIN',
    description: 'Administrador do Sistema',
    actions: [
      actions.user,
      actions.role,
      actions.member,
    ],
  },
  PADRAO: {
    name: 'PADRAO',
    description: 'Usuário comum',
    actions: [
      actions.member,
    ],
  },
  VISITANTE: {
    name: 'VISITANTE',
    description: 'Visitante',
    actions: [{
      MEMBER_READ: actions.member.MEMBER_READ,
    }],
  },
};

export { roles as default };
