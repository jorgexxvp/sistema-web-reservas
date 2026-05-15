import * as yup from "yup";

export const loginSchema = yup.object({
  name: yup.string().required("El usuario es requerido"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es requerida"),
});

export const recoverySchema = yup.object({
  correo: yup
    .string()
    .email("Correo electrónico inválido")
    .required("El correo electrónico es requerido"),
});

export const userSchema = yup.object({
  usuarioId: yup.number().optional().nullable(),
  rolId: yup.number().required("Obligatorio"),
  nombre: yup.string().required("Obligatorio"),
  apellido: yup.string().required("Obligatorio"),
  correo: yup.string().email().required("Obligatorio"),
  tipoDocumentoCodigo: yup.string().required("Obligatorio"),
  documento: yup.string().required("Obligatorio"),
  telefono: yup.string().required("Obligatorio"),
  usuario: yup.string().required("Obligatorio"),
  password: yup.string().required("Obligatorio"),
  estadoCodigo: yup.string().required("Obligatorio"),
  fechaNacimiento: yup.string().required("Obligatorio"),
});
