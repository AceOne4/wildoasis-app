export async function GET(req, { params }) {
  console.log(req);
  console.log(params);
  return Response.json({ test: "rest" });
}
