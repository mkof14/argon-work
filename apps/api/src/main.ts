import Fastify from "fastify";
import { env } from "./config/env.js";
import { registerHealthRoutes } from "./modules/health.js";
import { registerAuthRoutes } from "./modules/auth/index.js";
import { registerCourseRoutes } from "./modules/courses/index.js";
import { registerPaymentRoutes } from "./modules/payments/index.js";
import { registerSimulationRoutes } from "./modules/simulation/index.js";
import { registerReportRoutes } from "./modules/reports/index.js";
import { registerMobileRoutes } from "./modules/mobile/index.js";

const server = Fastify({ logger: true });

server.addContentTypeParser(
  "application/json",
  { parseAs: "string" },
  (_request, body, done) => {
    try {
      const raw = typeof body === "string" ? body : body.toString("utf8");
      done(null, JSON.parse(raw));
    } catch (error) {
      done(error as Error, undefined);
    }
  }
);

server.addContentTypeParser("application/json+stripe", { parseAs: "string" }, (_request, body, done) => {
  done(null, body);
});

registerHealthRoutes(server);
registerAuthRoutes(server);
registerCourseRoutes(server);
registerPaymentRoutes(server);
registerSimulationRoutes(server);
registerReportRoutes(server);
registerMobileRoutes(server);

server.listen({ port: env.port, host: "0.0.0.0" }).catch((error) => {
  server.log.error(error);
  process.exit(1);
});
