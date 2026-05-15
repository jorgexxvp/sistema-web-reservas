import React, { Fragment, useEffect, useState, type FC } from "react";
import { ChevronLeft, ChevronRight, CircleDollarSign } from "lucide-react";
import { useServiceHook } from "@/presentation/hooks";
import { useForm } from "react-hook-form";
import { InputText, TimeSlotSlider } from "@/presentation/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { reservationSchema, ResponseType } from "@/presentation/toolbox";

export const SectionReserves: React.FC = () => {
  const {
    fetchGetAllService,
    currentData,
    currentPage,
    goToPage,
    totalPages,
    fetchAvailability,
    availability,
    fetchAllSpecialist,
    specialistData,
    response,
    fetchGetReserves,
  } = useServiceHook();

  const formReserves = useForm({
    resolver: yupResolver(reservationSchema),
    defaultValues: {
      serviceId: "",
      specialistId: "",
      selectedTime: "",
      selectedDate: "",
      nombreService: "",
      price: "",
      observacion: "",
      nombre: "",
      apellido: "",
      telefono: "",
      correo: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = formReserves;

  useEffect(() => {
    fetchGetAllService();
  }, [fetchGetAllService]);

  return (
    <div className="w-full px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-12">
          <section className="flex flex-col gap-2">
            <div className="mb-6">
              <h1 className="font-headline-lg text-3xl text-(--color-on-surface) mb-2">
                Seleccion de Servicios
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {currentData.map((data, idx) => (
                <CardService
                  key={data.servicioId || idx}
                  categoria={data.categoriaNombre}
                  descripcion={data.descripcion}
                  tarifa={String(data.tarifa)}
                  tiempoTolerancia={data.tiempoTolerancia}
                  isSelected={
                    // eslint-disable-next-line react-hooks/incompatible-library
                    String(formReserves.watch("serviceId")) ===
                    String(data.servicioId)
                  }
                  onClick={() => {
                    formReserves.setValues({
                      ...formReserves.getValues(),
                      serviceId: String(data.servicioId),
                      nombreService: data.categoriaNombre + " " + data.nombre,
                      price: String(data.tarifa),
                    });
                    fetchAllSpecialist(data.servicioId);
                  }}
                />
              ))}
            </div>

            <div className="flex gap-2 justify-end">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (p) =>
                    p === 1 ||
                    p === totalPages ||
                    Math.abs(p - currentPage) <= 1,
                )
                .map((page, i, arr) => (
                  <Fragment key={page}>
                    {i > 0 && page - arr[i - 1] > 1 && (
                      <span className="text-outline">...</span>
                    )}
                    <button
                      onClick={() => goToPage(page)}
                      className={`w-10 h-10 rounded-lg font-bold transition-all ${
                        currentPage === page
                          ? "bg-primary text-on-primary shadow-lg shadow-primary/20"
                          : "hover:bg-surface-variant text-on-surface-variant"
                      }`}
                    >
                      {page}
                    </button>
                  </Fragment>
                ))}
            </div>
          </section>

          <section className="p-8 bg-(--color-surface-container) rounded-xl border border-outline-variant/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <TimeSlotSlider
                formReserves={formReserves}
                horarios={availability?.horario || []}
                onTimeSelect={(time) => {
                  formReserves.setValues({
                    ...formReserves.getValues(),
                    selectedTime: time,
                  });

                  formReserves.setValue("selectedTime", time);
                }}
                selectedTime={formReserves.watch("selectedTime")}
              />

              <Calendar
                disabled={!Number(formReserves.watch("serviceId"))}
                onDateSelect={(date) => {
                  const day = String(date.getDate()).padStart(2, "0");
                  const month = String(date.getMonth() + 1).padStart(2, "0");
                  const year = date.getFullYear();

                  const formattedDate = `${year}-${month}-${day}`;
                  formReserves.setValues({
                    ...formReserves.getValues(),
                    selectedDate: formattedDate,
                  });

                  fetchAvailability({
                    fecha: formattedDate,
                    servicioId: Number(formReserves.watch("serviceId")),
                  });
                }}
                initialDate={new Date()}
              />
            </div>
          </section>
        </div>

        <aside className="lg:col-span-4">
          <div className="bg-(--color-surface-container-high) border border-outline-variant/30 rounded-xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-outline-variant/30 font-headline-md text-xl">
              Resumen de compra
            </div>
            <form
              className="p-6 space-y-6"
              onSubmit={handleSubmit((data) => {
                const [year, month, day] = data.selectedDate.split("-");
                const [hours, minutes] = data.selectedTime.split(":");
                const isoDateTime = `${year}-${month}-${day}T${hours}:${minutes}:00.000Z`;

                fetchGetReserves({
                  fecha: isoDateTime,
                  invitadoApellido: data.apellido,
                  invitadoCorreo: data.correo,
                  invitadoNombre: data.nombre,
                  invitadoTelefono: data.telefono,
                  observacion: String(data.observacion),
                  usuarioId: 1,
                  usuarioServicioId: Number(data.serviceId),
                });
              })}
            >
              <div className="space-y-4">
                {formReserves.watch("price") && (
                  <SummaryItem
                    label="Servicio"
                    value={formReserves.watch("nombreService")}
                    extra={"S/. " + formReserves.watch("price")}
                  />
                )}
                {formReserves.watch("specialistId") && (
                  <SummaryItem
                    label="Especialista"
                    value={
                      specialistData.find(
                        (data) =>
                          String(data.id) ===
                          formReserves.watch("specialistId"),
                      )?.nombre ?? ""
                    }
                    icon="person"
                  />
                )}
                {formReserves.watch("selectedDate") && (
                  <SummaryItem
                    label="Date"
                    value={formReserves.watch("selectedDate")}
                    icon="calendar_today"
                  />
                )}
              </div>

              <div className="bg-(--color-surface-container-lowest) p-4 rounded-lg flex justify-between items-center">
                <span className="text-xs uppercase opacity-70">Status</span>
                <span className="flex items-center gap-2 text-(--color-tertiary-container) font-bold text-sm">
                  <span className="w-2 h-2 rounded-full bg-current"></span>{" "}
                  PENDIENTE
                </span>
              </div>

              <InputText
                label="Nombre"
                methods={formReserves}
                name="nombre"
                error={errors.nombre?.message}
              />
              <InputText
                label="Apellido"
                methods={formReserves}
                name="apellido"
                error={errors.apellido?.message}
              />
              <InputText
                label="Telefono"
                methods={formReserves}
                name="telefono"
                error={errors.telefono?.message}
              />
              <InputText
                label="Correo"
                methods={formReserves}
                name="correo"
                error={errors.correo?.message}
              />
              <InputText
                label="Observacion"
                methods={formReserves}
                name="observacion"
                error={errors.observacion?.message}
              />

              <button
                type="submit"
                disabled={
                  !formReserves.watch("specialistId") &&
                  !formReserves.watch("serviceId") &&
                  !formReserves.watch("selectedDate")
                }
                className="w-full bg-primary text-on-primary py-4 rounded-lg font-bold hover:brightness-110 transition-all uppercase tracking-widest shadow-lg shadow-primary/20"
              >
                Confirmar Reserva
              </button>
            </form>
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
        </aside>
      </div>
    </div>
  );
};

interface ICardService {
  categoria: string;
  descripcion: string;
  tarifa: string;
  tiempoTolerancia: string;
  onClick: () => void;
  isSelected?: boolean;
}

const CardService: FC<ICardService> = ({
  categoria,
  descripcion,
  tarifa,
  tiempoTolerancia,
  onClick,
  isSelected,
}) => {
  return (
    <div
      onClick={onClick}
      className={`w-full max-w-87.5 min-h-62.5 border rounded-xl p-6 transition-all cursor-pointer ${isSelected ? "bg-blue-950 border-primary" : "bg-surface-low border-outline"}`}
    >
      <div className="flex justify-between items-start">
        <CircleDollarSign
          className={`w-8 h-8 transition-colors ${isSelected ? "text-primary" : "text-(--color-primary)"}`}
          strokeWidth={2}
        />
        {isSelected && (
          <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter">
            Seleccionado
          </span>
        )}
      </div>

      <h3
        className={`font-headline-md text-xl mb-2 transition-colors ${isSelected ? "text-white" : "text-(--color-on-surface)"}`}
      >
        {categoria}
      </h3>

      <p
        className={`text-sm mb-6 line-clamp-2 transition-colors ${isSelected ? "text-blue-100" : "text-(--color-on-surface-variant)"}`}
      >
        {descripcion}
      </p>

      <div
        className={`flex items-center justify-between border-t pt-4 ${isSelected ? "border-white/10" : "border-outline-variant/20"}`}
      >
        <div className="flex flex-col">
          <span
            className={`text-xs uppercase ${isSelected ? "text-blue-200/60" : "text-on-surface-variant"}`}
          >
            Precio
          </span>
          <span
            className={`font-bold text-xl ${isSelected ? "text-white" : "text-primary"}`}
          >
            {tarifa}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span
            className={`text-xs uppercase ${isSelected ? "text-blue-200/60" : "text-on-surface-variant"}`}
          >
            Tolerancia
          </span>
          <span
            className={`font-bold ${isSelected ? "text-white" : "text-on-surface"}`}
          >
            {tiempoTolerancia}
          </span>
        </div>
      </div>
    </div>
  );
};

interface SummanyItemProps {
  label: string;
  value: string;
  extra?: string;
  icon?: string;
}

const SummaryItem: FC<SummanyItemProps> = ({ label, value, extra, icon }) => (
  <div className="flex justify-between items-center">
    <div>
      <span className="text-[10px] uppercase opacity-60">{label}</span>
      <p className="font-bold text-sm">{value}</p>
    </div>
    {extra ? (
      <span className="text-primary font-bold">{extra}</span>
    ) : (
      <span className="material-symbols-outlined opacity-50">{icon}</span>
    )}
  </div>
);

interface CalendarProps {
  onDateSelect?: (date: Date) => void;
  initialDate?: Date;
  disabled?: boolean;
}

interface CalendarProps {
  onDateSelect?: (date: Date) => void;
  initialDate?: Date;
  disabled?: boolean;
}

export const Calendar: FC<CalendarProps> = ({
  onDateSelect,
  initialDate,
  disabled = false,
}) => {
  const [viewDate, setViewDate] = useState(initialDate || new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialDate || new Date(),
  );

  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const monthName = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(viewDate);

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handlePrevMonth = () => {
    if (disabled) return;
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    if (disabled) return;
    setViewDate(new Date(year, month + 1, 1));
  };

  const handleDayClick = (day: number) => {
    if (disabled) return;

    const newSelected = new Date(year, month, day);
    newSelected.setHours(0, 0, 0, 0);

    if (newSelected < today) {
      return;
    }

    setSelectedDate(newSelected);
    if (onDateSelect) onDateSelect(newSelected);
  };

  const isDateSelected = (day: number) => {
    return (
      selectedDate?.getDate() === day &&
      selectedDate?.getMonth() === month &&
      selectedDate?.getFullYear() === year
    );
  };

  const isDateDisabled = (day: number) => {
    const checkDate = new Date(year, month, day);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  return (
    <div
      className={`bg-(--color-surface-container-lowest) p-4 rounded-xl border border-outline-variant/20 shadow-sm w-full max-w-md transition-opacity duration-300
        ${disabled ? "opacity-50 pointer-events-none select-none grayscale-[0.5]" : "opacity-100"}
      `}
    >
      <div className="flex justify-between items-center mb-4 font-bold text-(--color-on-surface)">
        <button
          onClick={handlePrevMonth}
          disabled={disabled}
          className="p-1 hover:bg-white/5 rounded-full transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="font-label-md min-w-35 text-center">{monthName}</span>
        <button
          onClick={handleNextMonth}
          disabled={disabled}
          className="p-1 hover:bg-white/5 rounded-full transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[10px] uppercase text-(--color-outline) mb-2 font-bold tracking-wider">
        {daysOfWeek.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: offset }).map((_, i) => (
          <div key={`empty-${i}`} className="py-2" />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const selected = isDateSelected(day);
          const isPastDay = isDateDisabled(day);

          return (
            <button
              key={day}
              type="button"
              onClick={() => handleDayClick(day)}
              disabled={disabled || isPastDay}
              className={`
                py-2 text-xs rounded-md transition-all duration-200
                ${disabled || isPastDay ? "cursor-not-allowed opacity-40" : "cursor-pointer"}
                ${
                  selected
                    ? "bg-(--color-primary) text-(--color-on-primary) font-bold shadow-lg shadow-primary/20"
                    : isPastDay
                      ? "text-(--color-outline) line-through"
                      : "text-(--color-on-surface) hover:bg-(--color-surface-variant)"
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};
