const url = '/data.json';

export const fetchCurrentUser = async () => {
  const response = await fetch(url);
  const result = await response.json();

  if (!response.ok) {
    throw new Error('There is an error happened when fetching data ...')
  }
  return result.currentUser;
}

export const fetchComments = async () => {
  const response = await fetch(url);
  const result = await response.json();

  if (!response.ok) {
    throw new Error('There is an error happened when fetching data ...')
  }
  return result.comments;
}
