import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/login", async () => {
    // Fake login response
    return HttpResponse.json(
      {
        token: "fake-token",
      },
      { status: 200 }
    );
  }),
];
