import { CustomButton, InputText, ModalBase } from "@/presentation/components";
import { ResponseType } from "@/presentation/toolbox";
import {
  loginSchema,
  recoverySchema,
} from "@/presentation/toolbox/constants/schemas";
import { useLoginStore } from "@/presentation/zustand";
import { yupResolver } from "@hookform/resolvers/yup";
import { Calendar, LockKeyhole, Mail, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const Login = () => {
  const { fetchAuth, response, fetchRecoveryPassword } = useLoginStore();
  const [openModal, setOpenModal] = useState(false);

  const loginForm = useForm<{ name: string; password: string }>({
    resolver: yupResolver(loginSchema),
  });

  const recoverForm = useForm<{
    correo: string;
  }>({
    resolver: yupResolver(recoverySchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = loginForm;

  const {
    handleSubmit: handleSubmitRecovery,
    formState: { errors: errorRecovery },
  } = recoverForm;

  return (
    <main className="relative z-10 grow flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-(--color-bg-icon) border border-(--color-border-icon) mb-6">
            <Calendar />
          </div>

          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Sistema Web de Reservas de Citas
          </h1>
        </div>

        <div className="bg-(--color-bg-card)/90 border border-(--color-border-soft) rounded-xl p-8 shadow-2xl backdrop-blur-md">
          <form
            className="space-y-6"
            onSubmit={handleSubmit((data) => fetchAuth(data))}
          >
            <InputText
              label="Usuario"
              methods={loginForm}
              name="name"
              icon={<User />}
              error={errors.name?.message}
              placeholder="Ingrese su usuario"
            />
            <InputText
              label="Contraseña"
              methods={loginForm}
              name="password"
              type="password"
              error={errors.password?.message}
              placeholder="Ingrese su contraseña"
              icon={<LockKeyhole />}
            />
            <div className="flex items-center justify-end">
              <a
                onClick={() => {
                  setOpenModal(!openModal);
                }}
                className="text-xs text-(--color-brand-primary) hover:underline"
              >
                Olvidaste tu contraseña?
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <CustomButton
                type="submit"
                text="Continuar"
                disabled={response.type === ResponseType.LOADING}
                loading={response.type === ResponseType.LOADING}
              />

              {response.type === ResponseType.ERROR && (
                <p className="text-sm text-red-500 font-bold text-end">
                  {response.message}
                </p>
              )}
              {response.type === ResponseType.SUCCESS && (
                <p className="text-sm text-green-500 font-bold text-end">
                  {response.message}
                </p>
              )}
            </div>
          </form>
        </div>

        {openModal && (
          <ModalBase
            title="Recuperar Contraseña"
            subtitle="Introduce tu correo electrónico para recibir un enlace seguro para restablecer tu contraseña."
            setOpen={setOpenModal}
          >
            <form
              className="space-y-6"
              onSubmit={handleSubmitRecovery((data) =>
                fetchRecoveryPassword(data.correo),
              )}
            >
              <InputText
                methods={recoverForm}
                name="correo"
                label="Correo Electrónico"
                placeholder="name@company.com"
                icon={<Mail />}
                error={errorRecovery.correo?.message}
              />

              <div className="pt-2 flex flex-col gap-3">
                <CustomButton
                  type="submit"
                  disabled={response.type === ResponseType.LOADING}
                  className="w-full py-4 bg-(--color-primary) text-(--color-on-primary) font-semibold rounded-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-(--color-primary)/10"
                  text="Enviar enlace de recuperación"
                />
                {response.type === ResponseType.ERROR && (
                  <p className="text-sm text-red-500 font-bold text-end">
                    {response.message}
                  </p>
                )}
                {response.type === ResponseType.SUCCESS && (
                  <p className="text-sm text-green-500 font-bold text-end">
                    {response.message}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="text-sm text-(--color-outline) hover:text-white transition-colors"
                >
                  Volver al Login
                </button>
              </div>
            </form>
          </ModalBase>
        )}
      </div>
    </main>
  );
};
