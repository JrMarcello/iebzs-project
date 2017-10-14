import actions from '../action/actions';

const roles = {
  ADMIN: {
    name: 'ADMINISTRADOR',
    description: 'Administrador do Sistema com todos os provilégios',
    actions: [
      actions.user,
      actions.role,
      actions.member,
    ],
  },
  PADRAO: {
    name: 'PADRAO',
    description: 'Usuário padrão com privilégios moderados',
    actions: [
      actions.member,
    ],
  },
  VISITANTE: {
    name: 'VISITANTE',
    description: 'Visitante sem privilégios',
    actions: [{
      MEMBER_READ: actions.member.MEMBER_READ,
    }],
  },
};

export { roles as default };
