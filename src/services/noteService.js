import http from "./httpService";

const apiEndpoint = "/notes";

function noteUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getNotes(userId) {
  return http.get(`${apiEndpoint}/user/${userId}`);
}

export function getNote(id) {
  return http.get(noteUrl(id));
}

export function saveNote(note) {
  if (note._id) {
    const body = { ...note };
    delete body._id;
    return http.put(noteUrl(note._id), body);
  }

  return http.post(apiEndpoint, note);
}

export function deleteNote(id) {
  return http.delete(noteUrl(id));
}
