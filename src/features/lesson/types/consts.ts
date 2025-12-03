export interface TimeSlot {
  id: number;
  duration: string;
}

export const ScheduleType = {
  GROUP: 'group',
  TEACHER: 'teacher',
  ROOM: 'room',
} as const;

export type ScheduleType = (typeof ScheduleType)[keyof typeof ScheduleType];

export const TIME_SLOTS: TimeSlot[] = [
  { id: 1, duration: '9:00-10:35' },
  { id: 2, duration: '10:45-12:20' },
  { id: 3, duration: '13:20-14:55' },
  { id: 4, duration: '15:10-16:45' },
  { id: 5, duration: '16:55-18:30' },
  { id: 6, duration: '18:40-20:15' },
];

export const DAYS_OF_WEAK = [
  { id: 1, name: 'Понедельник' },
  { id: 2, name: 'Вторник' },
  { id: 3, name: 'Среда' },
  { id: 4, name: 'Четверг' },
  { id: 5, name: 'Пятница' },
  { id: 6, name: 'Суббота' },
];

export const LESSON_TYPES = ['Лекция', 'Практика', 'Лабораторная'];

export const monthNames: string[] = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

export const weekDayNames: string[] = [
  'ПН',
  'ВТ',
  'СР',
  'ЧТ',
  'ПТ',
  'СБ',
  'ВС',
];
