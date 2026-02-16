import type { FastifyInstance } from "fastify";

export function registerReportRoutes(server: FastifyInstance) {
  server.get("/reports/field/:fieldId", async (request) => {
    const fieldId = (request.params as { fieldId: string }).fieldId;

    return {
      fieldId,
      generatedAt: new Date().toISOString(),
      summary: "Sample AI agronomic report placeholder",
      recommendations: [
        "Increase irrigation on north zone by 8%",
        "Inspect stress area near section C-4",
        "Schedule re-scan in 72 hours"
      ]
    };
  });
}
