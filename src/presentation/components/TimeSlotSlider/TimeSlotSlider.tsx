import { useMemo } from "react";
import type { FieldValues } from "react-hook-form";
import { Select } from "../DocumentInput";

interface Specialist {
  disponible: boolean;
  especialistaApellido: string;
  especialistaId: number;
  especialistaNombre: string;
  usuarioServicioId: number;
}

interface TimeSlot {
  hora: string;
  especialistas: Specialist[];
}

interface TimeSlotSliderProps {
  horarios: TimeSlot[];
  onTimeSelect: (time: string) => void;
  selectedTime?: string;
  formReserves: FieldValues;
}

interface ISpecialist {
  usuarioServicioId: number;
  especialistaId: number;
  especialistaNombre: string;
  especialistaApellido: string;
  disponible: boolean;
}

export const TimeSlotSlider = ({
  horarios,
  onTimeSelect,
  selectedTime,
  formReserves,
}: TimeSlotSliderProps) => {
  const { allHoras, timeMap } = useMemo(() => {
    const map = new Map<string, TimeSlot>();
    const horas: string[] = [];

    horarios.forEach((slot) => {
      map.set(slot.hora, slot);
      horas.push(slot.hora);
    });

    return {
      allHoras: horas.sort(),
      timeMap: map,
    };
  }, [horarios]);

  const selectedHora =
    selectedTime && timeMap.has(selectedTime) ? selectedTime : allHoras[0];
  const currentSlot = timeMap.get(selectedHora);

  const availableSpecialists = useMemo(() => {
    if (!currentSlot) return [];
    return currentSlot.especialistas.filter((spec) => spec.disponible);
  }, [currentSlot]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = Number(e.target.value);
    onTimeSelect(allHoras[index]);
  };

  if (allHoras.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No hay horarios disponibles
      </div>
    );
  }

  const currentIndex = allHoras.indexOf(selectedHora);

  const specialistAdapter = (data: ISpecialist[]) => {
    return data.map((item) => ({
      label: item.especialistaNombre + " " + item.especialistaApellido,
      value: String(item.usuarioServicioId), // Error de back por que usa ID de usuarios serivicio y no de especialista
    }));
  };

  return (
    <div className="mt-8 space-y-6">
      <div>
        <label className="block text-primary font-bold text-xs mb-4 uppercase tracking-wider">
          Selecciona una hora
        </label>

        <input
          type="range"
          min={0}
          max={allHoras.length - 1}
          step={1}
          value={currentIndex}
          onChange={handleSliderChange}
          className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer accent-primary"
        />

        <div className="mt-4 p-4 bg-primary-container/10 rounded-lg border border-primary/20">
          <p className="text-center text-primary font-semibold text-lg">
            {selectedHora}
          </p>
          <p className="text-center text-xs text-primary/70 mt-1">
            Rango: {allHoras[0]} - {allHoras[allHoras.length - 1]}
          </p>
        </div>
      </div>

      <div>
        <label className="block text-primary font-bold text-xs mb-3 uppercase tracking-wider">
          Especialistas disponibles ({availableSpecialists.length})
        </label>

        {availableSpecialists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto">
            <Select
              hookform={formReserves}
              options={specialistAdapter(availableSpecialists)}
              selectName="specialistId"
              label="Escoje un especialista"
              className="text-[14px] p-5 rounded-2xl h-full border border-(--color-border-primary) bg-(--color-bg-input)"
            />
          </div>
        ) : (
          <p className="text-center text-yellow-600 p-3 bg-yellow-50 rounded-lg">
            No hay especialistas disponibles para esta hora
          </p>
        )}
      </div>
    </div>
  );
};
