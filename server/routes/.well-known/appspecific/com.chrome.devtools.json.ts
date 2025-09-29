export default defineEventHandler((event) => {
  setHeader(event, 'Content-Type', 'application/json; charset=utf-8');
  setResponseStatus(event, 204); // No Content (preferované)
  return null;

  // 200 s prázdnym objektom:
  // setResponseStatus(event, 200)
  // return {}
});
