import {
  ColumnsTable,
  CustomButton,
  InputText,
  ModalBase,
  SearchInput,
  StatCard,
  Table,
} from "@/presentation/components";
import { DocumentInput, Select } from "@/presentation/components/DocumentInput";
import {
  useUserHook,
  useMasterHook,
  documentAdapter,
} from "@/presentation/hooks";
import { ResponseType, userRows, userSchema } from "@/presentation/toolbox";
import { yupResolver } from "@hookform/resolvers/yup";
import { Bolt, Hourglass, ShieldCheck, SquarePen, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useWatch, type Resolver } from "react-hook-form";

interface IUserFormData {
  usuarioId?: number;
  rolId: number;
  nombre: string;
  apellido: string;
  correo: string;
  tipoDocumentoCodigo: string;
  documento: string;
  telefono: string;
}

export const SectionReserves = () => {
  const {
    fetchGetAllUser,
    userResponse,
    fetchCreateUser,
    // fetchUpdateUser,
    fetchGetUser,
    rolResponse,
    response,
  } = useUserHook();
  const { dataDocument, fetchGetDocument } = useMasterHook();
  const [openModal, setOpenModal] = useState(false);
  const formSearch = useForm<{ search: string }>({
    defaultValues: { search: "" },
  });

  const formUser = useForm<IUserFormData>({
    resolver: yupResolver(userSchema) as Resolver<IUserFormData>,
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = formUser;

  const searchTerm = useWatch({
    control: formSearch.control,
    name: "search",
    defaultValue: "",
  });

  const filteredUsers = userResponse.filter((user) =>
    user.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    fetchGetAllUser();
    fetchGetDocument();
  }, [fetchGetAllUser, fetchGetDocument]);

  return (
    <section className="flex-1 overflow-y-auto p-8 space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <StatCard
          label="Total de Usuarios"
          value={String(userResponse.length)}
          trend="12% up"
          icon={<Users />}
          type="success"
        />

        <StatCard
          label="Activos en Sesion"
          value="8"
          subtext="Live sessions"
          icon={<Bolt />}
          type="success"
        />

        <StatCard
          label="Bloqueados"
          value="42"
          subtext="Usuarios con problemas"
          icon={<Hourglass />}
          type="warning"
        />

        <StatCard
          label="Roles existentes"
          value={String(rolResponse.length)}
          subtext="Roles disponibles en el sistema"
          icon={<ShieldCheck />}
        />
      </div>
      <div className="flex flex-row justify-between items-center">
        <SearchInput hookform={formSearch} />
        <CustomButton
          text="Añadir"
          className="w-32"
          onClick={() => {
            reset();
            setOpenModal(!openModal);
          }}
        />
      </div>

      <Table
        title={userRows}
        data={filteredUsers}
        render={(user) => (
          <tr
            key={user.id}
            className="hover:bg-white/2 transition-colors group border-b border-white/5 last:border-0"
          >
            <ColumnsTable text={String(user.id)} />
            <ColumnsTable text={user.nombre} />
            <ColumnsTable
              icon={<SquarePen size={18} />}
              className="text-(--color-primary) hover:text-white"
              onClick={async () => {
                const userDetails = await fetchGetUser(user.id);
                formUser.setValues({
                  usuarioId: userDetails?.usuarioId,
                  nombre: userDetails?.nombre,
                  apellido: userDetails?.apellido,
                  correo: userDetails?.correo,
                  tipoDocumentoCodigo: userDetails?.tipoDocumentoCodigo,
                  documento: userDetails?.documento,
                  telefono: userDetails?.telefono,
                  rolId: userDetails?.rolId,
                });

                setOpenModal(true);
              }}
            />
          </tr>
        )}
      />

      {filteredUsers.length === 0 && (
        <div className="text-center py-10 text-(--color-text-muted)">
          No se encontraron usuarios que coincidan con "{searchTerm}"
        </div>
      )}

      {openModal && (
        <ModalBase
          // eslint-disable-next-line react-hooks/incompatible-library
          title={`${formUser.watch("usuarioId") ? "Editar" : "Crear"} Usuario`}
          setOpen={setOpenModal}
          className="max-w-2xl"
        >
          <form
            className="space-y-6 flex flex-col gap-1"
            onSubmit={handleSubmit((data) => {
              fetchCreateUser(data);
              if (response.type === ResponseType.SUCCESS) {
                setOpenModal(false);
              }
            })}
          >
            <div className="grid grid-cols-2 gap-4">
              <InputText
                methods={formUser}
                name="nombre"
                label="Nombre"
                placeholder="Ingrese el nombre"
                error={errors.nombre?.message}
              />
              <InputText
                methods={formUser}
                name="apellido"
                label="Apellido"
                placeholder="Ingrese el apellido"
                error={errors.apellido?.message}
              />
              <InputText
                methods={formUser}
                name="correo"
                label="Correo Electrónico"
                placeholder="name@company.com"
                error={errors.correo?.message}
              />
              <DocumentInput
                hookform={formUser}
                selectName="tipoDocumentoCodigo"
                inputName="documento"
                label="Documento"
                options={dataDocument}
                error={errors.documento?.message}
              />

              <InputText
                methods={formUser}
                name="telefono"
                label="Teléfono"
                placeholder="Ingrese el teléfono"
                error={errors.telefono?.message}
              />
              <Select
                label="Roles"
                className="text-[14px] p-5 rounded-2xl h-full border border-(--color-border-primary) bg-(--color-bg-input)"
                options={documentAdapter(rolResponse)}
                hookform={formUser}
                selectName="rolId"
              />
            </div>
            <div className="pt-2 flex flex-col gap-3">
              <CustomButton
                type="submit"
                disabled={response.type === ResponseType.LOADING}
                className="w-full py-4 bg-(--color-primary) text-(--color-on-primary) font-semibold rounded-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-(--color-primary)/10"
                text={`${formUser.watch("usuarioId") ? "Editar" : "Crear"} Usuario`}
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
        </ModalBase>
      )}
    </section>
  );
};
