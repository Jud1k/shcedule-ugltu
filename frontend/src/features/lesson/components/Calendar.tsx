import * as calendar from '../utils/calendar';
import useAppSearchParams from '@/hooks/useAppSearchParams';
import { useEffect } from 'react';
import { Button } from '@/components/generic/Button';
import { useCalendar } from '@/context/CalendarProvider';
import { monthNames, weekDayNames } from '../types/consts';

export const Calendar = () => {
  const {
    resetToToday,
    currentMonth,
    currentYear,
    setMonth,
    setDate,
    selectedDate,
    hasLessonsOnDays,
    setHasLessonsOnDays,
  } = useCalendar();
  const { updateParams, getParam } = useAppSearchParams();
  const monthData = calendar.getMonthData(currentYear, currentMonth);
  const monthId = getParam('month');

  useEffect(() => {
    if (monthId) {
      setMonth(Number(monthId));
    } else {
      setHasLessonsOnDays([]);
      resetToToday();
    }
  }, [monthId, resetToToday, setHasLessonsOnDays, setMonth]);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(Number(e.target.value));
    updateParams({ month: e.target.value });
  };

  const handleDateClick = (date: Date) => {
    setDate(date);
  };

  const hasLessonsForDay = (date: Date): boolean => {
    const dayOfWeek = date.getDay();
    return hasLessonsOnDays.includes(dayOfWeek);
  };

  return (
    <div className="calendar">
      <header>
        <select
          value={currentMonth}
          onChange={handleMonthChange}
          className="select select-success w-full"
        >
          {monthNames.map((name, index) => (
            <option key={name} value={index}>
              {name}
            </option>
          ))}
        </select>
      </header>
      <div className="overflow-x-auto ">
        <table className="table w-full border-separate border-spacing-y-3">
          <thead>
            <tr>
              {weekDayNames.map((day) => (
                <th key={day} className="p-1 text-base-content">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {monthData.map((week, weekIndex) => (
              <tr key={weekIndex} className="hover:bg-inherit">
                {week.map((date, dayIndex) => (
                  <td key={dayIndex} className="p-0">
                    {date && (
                      <Button
                        className={`h-10 w-10 ${
                          calendar.areEqual(date, selectedDate)
                            ? 'border-accent'
                            : ''
                        }`}
                        variant={hasLessonsForDay(date) ? 'base' : 'default'}
                        onClick={() => {
                          handleDateClick(date);
                        }}
                      >
                        {date?.getDate()}
                      </Button>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
