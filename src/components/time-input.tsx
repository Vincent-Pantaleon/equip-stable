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

function clamp(n: number, min: number, max: number) {
  if (Number.isNaN(n)) return min;
  return Math.min(Math.max(n, min), max);
}

function to24Hour(hour12: number, minute: number, meridiem: "AM" | "PM") {
  let hour = hour12 % 12;
  if (meridiem === "PM") hour += 12;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function from24Hour(value?: string) {
  if (!value) return { hour12: 12, minute: 0, meridiem: "AM" as const };
  const [h, m] = value.split(":").map(Number);
  const meridiem: "AM" | "PM" = h >= 12 ? "PM" : "AM";
  let hour12 = h % 12;
  if (hour12 === 0) hour12 = 12;
  return { hour12, minute: m || 0, meridiem };
}

// Shift-register digit entry: typing "3" then "0" produces "30", the same
// way the native <input type="time"> segments behave. If the two-digit
// combination would be invalid, the buffer resets to just the new digit.
const BUFFER_RESET_MS = 1000;

function nextBuffer(
  currentBuffer: string,
  digit: string,
  min: number,
  max: number
) {
  let candidate = (currentBuffer + digit).slice(-2);
  let num = parseInt(candidate, 10);

  if (candidate.length === 2 && (num < min || num > max)) {
    // invalid two-digit combo — start fresh with just the new digit
    candidate = digit;
    num = parseInt(candidate, 10);
  }

  return { candidate, num };
}

function useDigitSegment(
  committedValue: number,
  min: number,
  max: number,
  onCommit: (n: number) => void,
  onComplete: () => void
) {
  const [buffer, setBuffer] = useState<string>("");
  const lastKeyAtRef = useRef<number>(0);

  // keep the displayed value in sync when not actively mid-type
  const display =
    buffer !== "" ? buffer.padStart(2, "0") : String(committedValue).padStart(2, "0");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      const now = Date.now();
      const isFresh = now - lastKeyAtRef.current > BUFFER_RESET_MS;
      lastKeyAtRef.current = now;

      const base = isFresh ? "" : buffer;
      const { candidate, num } = nextBuffer(base, e.key, min, max);
      setBuffer(candidate);

      if (num >= min && num <= max) {
        onCommit(num);
      }

      if (candidate.length === 2) {
        // full segment typed — reset buffer and move to next field
        setBuffer("");
        onComplete();
      }
      return;
    }

    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      setBuffer("");
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setBuffer("");
      const wrapped = committedValue + 1 > max ? min : committedValue + 1;
      onCommit(wrapped);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setBuffer("");
      const wrapped = committedValue - 1 < min ? max : committedValue - 1;
      onCommit(wrapped);
      return;
    }
    // let Tab, Shift, etc. behave normally
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setBuffer("");
    e.target.select();
  };

  const handleBlur = () => {
    setBuffer("");
  };

  return { display, handleKeyDown, handleFocus, handleBlur };
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
  const minuteRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isControlled) setInternal(from24Hour(value));
  }, [value, isControlled]);

  const emit = useCallback(
    (next: { hour12: number; minute: number; meridiem: "AM" | "PM" }) => {
      setInternal(next);

      if (onChange && hiddenInputRef.current) {
        const newValue = to24Hour(next.hour12, next.minute, next.meridiem);

        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value"
        )?.set;
        nativeInputValueSetter?.call(hiddenInputRef.current, newValue);

        const event = new Event("input", { bubbles: true });
        hiddenInputRef.current.dispatchEvent(event);

        onChange(event as unknown as React.ChangeEvent<HTMLInputElement>);
      }
    },
    [onChange]
  );

  const hourSegment = useDigitSegment(
    internal.hour12,
    1,
    12,
    (num) => emit({ ...internal, hour12: num }),
    () => minuteRef.current?.focus()
  );

  const minuteSegment = useDigitSegment(
    internal.minute,
    0,
    59,
    (num) => emit({ ...internal, minute: num }),
    () => {
      const meridiemEl = document.getElementById(
        `${id}-meridiem`
      ) as HTMLSelectElement | null;
      meridiemEl?.focus();
    }
  );

  const segmentClass =
    "border-2 border-black/50 px-2 h-9 rounded-md text-md w-12 text-center focus:outline-none focus:border-blue-500 disabled:bg-gray-100 bg-white";
  const selectClass =
    "border-2 border-black/50 px-2 h-9 rounded-md text-md focus:outline-none focus:border-blue-500 disabled:bg-gray-100 bg-white";

  return (
    <div className={`w-full flex flex-col gap-1 ${divStyle}`}>
      <label htmlFor={id} className="font-medium text-gray-700">
        {label}
      </label>
      <div className="flex gap-2 items-center" id={id}>
        <input
          type="text"
          inputMode="numeric"
          aria-label={`${label} hour`}
          name={`${name}-hour`}
          className={segmentClass}
          disabled={isDisabled}
          required={required}
          value={hourSegment.display}
          onChange={() => {}} // all changes handled via onKeyDown
          onKeyDown={hourSegment.handleKeyDown}
          onFocus={hourSegment.handleFocus}
          onBlur={hourSegment.handleBlur}
        />

        <span className="font-medium">:</span>

        <input
          ref={minuteRef}
          type="text"
          inputMode="numeric"
          aria-label={`${label} minute`}
          name={`${name}-minute`}
          className={segmentClass}
          disabled={isDisabled}
          required={required}
          value={minuteSegment.display}
          onChange={() => {}}
          onKeyDown={minuteSegment.handleKeyDown}
          onFocus={minuteSegment.handleFocus}
          onBlur={minuteSegment.handleBlur}
        />

        <select
          id={`${id}-meridiem`}
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
          onKeyDown={(e) => {
            const key = e.key.toLowerCase();
            if (key === "a") {
              e.preventDefault();
              emit({ ...internal, meridiem: "AM" });
            } else if (key === "p") {
              e.preventDefault();
              emit({ ...internal, meridiem: "PM" });
            }
          }}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>

        {/* hidden input so it participates in native form submission like your other inputs */}
        <input
          ref={hiddenInputRef}
          type="hidden"
          name={name}
          defaultValue={to24Hour(
            internal.hour12,
            internal.minute,
            internal.meridiem
          )}
        />
      </div>
    </div>
  );
});