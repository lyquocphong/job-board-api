import swaggerJSDoc from "swagger-jsdoc";

// Swagger options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "JobBoard API Documentation",
      version: "1.0.0",
    },
    servers: [
      {
        url: "/api", // Specify the base URL for your API
      },
    ],
  },
  url: "/api",
  apis: ["./src/routes/api/**/*.ts"], // Replace with the path to your route files
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
