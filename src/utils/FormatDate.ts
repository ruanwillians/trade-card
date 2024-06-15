import { format, parseISO } from 'date-fns';

export function formatDate(date: string): string {
  const parsedDate = parseISO(date);
  const formattedDate = format(
    parsedDate,
    'dd/MM/yyyy HH:mm',
  );

  return formattedDate;
}
