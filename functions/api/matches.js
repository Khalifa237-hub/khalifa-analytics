export async function onRequestGet({ env }) {
  const token = env.FOOTBALL_API_TOKEN;

  if (!token) {
    return Response.json(
      { error: "Token API non configuré" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      "https://api.football-data.org/v4/matches",
      {
        headers: {
          "X-Auth-Token": token
        }
      }
    );

    const data = await response.json();

    return Response.json(data, {
      status: response.status,
      headers: {
        "Cache-Control": "public, max-age=300"
      }
    });
  } catch (error) {
    return Response.json(
      { error: "Impossible de récupérer les matchs" },
      { status: 502 }
    );
  }
}
