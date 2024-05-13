import * as yup from 'yup'

export const schema = yup.object().shape({
  password: yup.string().when({
    is: '',
    then: (schema) => schema.nullable(),
    otherwise: (schema) =>
      schema
        .min(8, 'Senha deve ter no mínimo 8 caracteres')
        .matches(/[0-9]/, 'Senha deve ter um número')
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          'Senha deve ter um caracter especial'
        )
        .matches(/[A-Z]/, 'Senha deve ter uma letra maiúscula')
  }),
  confirmPassword: yup
    .string()
    .when('password', ([password], schema) =>
      password && password.length > 0
        ? schema
            .required('Confirme sua senha')
            .oneOf([yup.ref('password')], 'As senhas não são iguais')
        : schema.nullable()
    )
})
