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
  usuarioId: yup.number().optional(),
  password: yup.string().optional(),
  rolId: yup.number().required("Obligatorio"),
  nombre: yup.string().required("Obligatorio"),
  apellido: yup.string().required("Obligatorio"),
  correo: yup.string().email().required("Obligatorio"),
  tipoDocumentoCodigo: yup.string().required("Obligatorio"),
  documento: yup.string().required("Obligatorio"),
  telefono: yup.string().required("Obligatorio"),
});
export const reservationSchema = yup
  .object({
    serviceId: yup.string().optional().default(""),
    specialistId: yup.string().optional().default(""),
    selectedTime: yup.string().optional().default(""),
    selectedDate: yup.string().optional().default(""),
    nombreService: yup.string().optional().default(""),
    price: yup.string().optional().default(""),
    observacion: yup
      .string()
      .required("La observacion es requerida")
      .max(500, "La observación no puede exceder 500 caracteres"),
    nombre: yup
      .string()
      .required("El nombre es requerido")
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(50, "El nombre no puede exceder 50 caracteres")
      .matches(
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        "El nombre solo puede contener letras",
      ),
    apellido: yup
      .string()
      .required("El apellido es requerido")
      .min(2, "El apellido debe tener al menos 2 caracteres")
      .max(50, "El apellido no puede exceder 50 caracteres")
      .matches(
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        "El apellido solo puede contener letras",
      ),
    telefono: yup
      .string()
      .required("El teléfono es requerido")
      .matches(
        /^[0-9+\-\s()]+$/,
        "El teléfono solo puede contener números y símbolos de formato",
      )
      .min(7, "El teléfono debe tener al menos 7 caracteres")
      .max(20, "El teléfono no puede exceder 20 caracteres"),
    correo: yup
      .string()
      .required("El correo es requerido")
      .email("El correo debe ser válido")
      .max(100, "El correo no puede exceder 100 caracteres"),
  })
  .required();
