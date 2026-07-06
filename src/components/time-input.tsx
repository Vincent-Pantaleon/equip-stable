import React, { useState, useEffect, useCallback, useRef } from "react";

interface TimeInputProps {
  label: string;
  id: string;
  name: string;
  required?: boolean;
  isDisabled?: boolean;
  value?: string; // "HH:mm" 24-hour, controlled
  defaultValue?: string; // "HH:mm" 24-hour, uncontrolled
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  divStyle?: string;
}

function to24Hour(hour12: number, meridiem: "AM" | "PM") {
  let hour = hour12 % 12;
  if (meridiem === "PM") hour += 12;
  return `${String(hour).padStart(2, "0")}:00`;
}

function from24Hour(value?: string) {
  if (!value) return { hour12: 12, meridiem: "AM" as const };
  const [h] = value.split(":").map(Number);
  const meridiem: "AM" | "PM" = h >= 12 ? "PM" : "AM";
  let hour12 = h % 12;
  if (hour12 === 0) hour12 = 12;
  return { hour12, meridiem };
}

export const TimeInput = React.memo(function TimeInput({
  label,
  id,
  name,
  required = true,
  isDisabled = false,
  value,
  defaultValue,
  onChange,
  divStyle = "",
}: TimeInputProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(() =>
    from24Hour(isControlled ? value : defaultValue)
  );
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isControlled) setInternal(from24Hour(value));
  }, [value, isControlled]);

  const emit = useCallback(
    (next: { hour12: number; meridiem: "AM" | "PM" }) => {
      setInternal(next);

      if (onChange && hiddenInputRef.current) {
        const newValue = to24Hour(next.hour12, next.meridiem);

        // Update the hidden input's actual value so the event target reflects it
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value"
        )?.set;
        nativeInputValueSetter?.call(hiddenInputRef.current, newValue);

        const event = new Event("input", { bubbles: true });
        hiddenInputRef.current.dispatchEvent(event);

        // React's onChange expects a React.ChangeEvent, so we wrap the native event
        onChange(
          event as unknown as React.ChangeEvent<HTMLInputElement>
        );
      }
    },
    [onChange]
  );

  const selectClass =
    "border-2 border-black/50 px-2 h-9 rounded-md text-md focus:outline-none focus:border-blue-500 disabled:bg-gray-100 bg-white";

  return (
    <div className={`w-full flex flex-col gap-1 ${divStyle}`}>
      <label htmlFor={id} className="font-medium text-gray-700">
        {label}
      </label>
      <div className="flex gap-2" id={id}>
        <select
          aria-label={`${label} hour`}
          name={`${name}-hour`}
          className={selectClass}
          disabled={isDisabled}
          required={required}
          value={internal.hour12}
          onChange={(e) =>
            emit({ ...internal, hour12: Number(e.target.value) })
          }
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>

        <select
          aria-label={`${label} AM or PM`}
          name={`${name}-meridiem`}
          className={selectClass}
          disabled={isDisabled}
          required={required}
          value={internal.meridiem}
          onChange={(e) =>
            emit({
              ...internal,
              meridiem: e.target.value as "AM" | "PM",
            })
          }
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>

        {/* hidden input so it participates in native form submission like your other inputs */}
        <input
          ref={hiddenInputRef}
          type="hidden"
          name={name}
          defaultValue={to24Hour(internal.hour12, internal.meridiem)}
        />
      </div>
    </div>
  );
});