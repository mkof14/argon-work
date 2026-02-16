import type { FastifyInstance } from "fastify";

const demoCourses = [
  { id: "part-107", title: "Part 107 Core", level: "beginner" },
  { id: "agro-pro", title: "Agro Operations Pro", level: "advanced" }
];

export function registerCourseRoutes(server: FastifyInstance) {
  server.get("/courses", async () => demoCourses);

  server.get("/courses/:id", async (request, reply) => {
    const id = (request.params as { id: string }).id;
    const course = demoCourses.find((item) => item.id === id);

    if (!course) {
      return reply.status(404).send({ message: "Course not found" });
    }

    return course;
  });
}
