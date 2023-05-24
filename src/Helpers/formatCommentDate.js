function formatCommentDate(date) {
  const now = new Date();
  const timeDiff = date - now;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  let relativeTime;

  switch (true) {
    case timeDiff < minute:
      relativeTime = 'just now';
      break;
    case timeDiff < hour:
      const minutes = Math.floor(timeDiff / minute);
      relativeTime = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      break;
    case timeDiff < day:
      const hours = Math.floor(timeDiff / hour);
      relativeTime = `${hours} hour${hours > 1 ? 's' : ''} ago`;
      break;
    case timeDiff < week:
      const days = Math.floor(timeDiff / day);
      relativeTime = `${days} day${days > 1 ? 's' : ''} ago`;
      break;
    case timeDiff < month:
      const weeks = Math.floor(timeDiff / week);
      relativeTime = `${weeks} week${weeks > 1 ? 's' : ''} ago`;
      break;
    case timeDiff < year:
      const months = Math.floor(timeDiff / month);
      relativeTime = `${months} month${months > 1 ? 's' : ''} ago`;
      break;
    default:
      const years = Math.floor(timeDiff / year);
      relativeTime = `${years} year${years > 1 ? 's' : ''} ago`;
  }

  return relativeTime;
}

export default formatCommentDate;