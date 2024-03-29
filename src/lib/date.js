export const convertDate = (date) => {
  if (date === '') return '';
  let dateText = date.split('.');
  if (dateText[1].length < 2) dateText[1] = '0' + dateText[1];
  if (dateText[2].length < 2) dateText[2] = '0' + dateText[2];
  return `${dateText[0]}년 ${dateText[1]}월 ${dateText[2]}일`;
};

export const parseDate = (dateStr) => {
  if (dateStr && typeof dateStr === 'string' && dateStr.length > 0) {
    const [yyyy, mm, dd] = dateStr.split('.');
    return { year: yyyy, month: mm, date: dd };
  }
  return null;
};

export const formatTime = (timeStr) => {
  if (!timeStr || typeof timeStr !== 'string' || timeStr.length <= 0) return '';
  const [hour, minute] = timeStr.split(':');
  // Before noon
  if (Number(hour) < 12) {
    if (Number(hour) === 0) return `오전 12:${minute}`;
    return `오전 ${hour}:${minute}`;
  }
  // Afternoon
  if (Number(hour) === 12) return `오후 ${hour}:${minute}`;
  const afternoon = Number(hour) - 12;
  if (afternoon < 10) return `오후 0${afternoon}:${minute}`;
  return `오후 ${afternoon}:${minute}`;
};

export const formatDate = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string' || dateStr.length <= 0) return '';
  const [year, month, day] = dateStr.split('.');
  return `${year}년 ${month}월 ${day}일`;
};
