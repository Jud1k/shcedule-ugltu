import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';

interface CalendarContextType {
  selectedDate: Date;
  selectedDayWeek: number;
  currentMonth: number;
  currentYear: number;
  setDate: (date: Date) => void;
  setMonth: (month: number) => void;
  resetToToday: () => void;
  hasLessonsOnDays: number[];
  setHasLessonsOnDays: (days: number[]) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined,
);

export const CalendarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hasLessonsOnDays, setHasLessonsOnDays] = useState<number[]>([]);

  const selectedDayWeek = useMemo(() => selectedDate.getDay(), [selectedDate]);
  const currentMonth = useMemo(() => selectedDate.getMonth(), [selectedDate]);
  const currentYear = useMemo(() => selectedDate.getFullYear(), [selectedDate]);

  const setDate = useCallback(
    (date: Date) => setSelectedDate(new Date(date)),
    [],
  );

  const setMonth = useCallback((month: number) => {
    setSelectedDate((prevDate) => {
      const d = new Date(prevDate);
      d.setMonth(month);
      return d;
    });
  }, []);

  const resetToToday = useCallback(() => setSelectedDate(new Date()), []);

  const setHasLessonsOnDaysCallback = useCallback(
    (days: number[]) => setHasLessonsOnDays(days),
    [],
  );

  const contextValue = useMemo(
    () => ({
      selectedDate,
      selectedDayWeek,
      currentMonth,
      currentYear,
      setDate,
      setMonth,
      resetToToday,
      hasLessonsOnDays,
      setHasLessonsOnDays: setHasLessonsOnDaysCallback,
    }),
    [
      selectedDate,
      selectedDayWeek,
      currentMonth,
      currentYear,
      setDate,
      setMonth,
      resetToToday,
      hasLessonsOnDays,
      setHasLessonsOnDaysCallback,
    ],
  );

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within CalendarProvider');
  }
  return context;
};
