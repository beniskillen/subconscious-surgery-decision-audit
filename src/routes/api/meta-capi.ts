import { createFileRoute } from "@tanstack/react-router";

const GRAPH = "https://graph.facebook.com/v22.0";

type CapiBody = {
  event_name?: string;
  event_id?: string;
  event_source_url?: string;
  user_agent?: string;
  fbp?: string;
  fbc?: string;
};

export const Route = createFileRoute("/api/meta-capi")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const pixelId = process.env["META_PIXEL_ID"]?.trim() || "1305330447748049";
        const token = process.env["META_CAPI_ACCESS_TOKEN"]?.trim();
        if (!token) {
          return Response.json(
            { skipped: true, reason: "META_CAPI_ACCESS_TOKEN unset" },
            { status: 200 },
          );
        }

        let body: CapiBody = {};
        try {
          body = (await request.json()) as CapiBody;
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        if (body.event_name !== "Schedule" || !body.event_id) {
          return Response.json({ error: "Schedule event_id required" }, { status: 400 });
        }

        const forwarded = request.headers.get("x-forwarded-for") || "";
        const clientIp = forwarded.split(",")[0]?.trim() || undefined;
        const userData: Record<string, string> = {};
        if (clientIp) userData["client_ip_address"] = clientIp;
        if (body.user_agent) userData["client_user_agent"] = body.user_agent;
        if (body.fbp) userData["fbp"] = body.fbp;
        if (body.fbc) userData["fbc"] = body.fbc;

        const payload = {
          data: [
            {
              event_name: "Schedule",
              event_time: Math.floor(Date.now() / 1000),
              event_id: body.event_id,
              action_source: "website",
              event_source_url: body.event_source_url,
              user_data: userData,
            },
          ],
        };

        const url = `${GRAPH}/${pixelId}/events?access_token=${encodeURIComponent(token)}`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await response.json().catch(() => ({}));
        return Response.json(json, { status: response.ok ? 200 : 502 });
      },
    },
  },
});
