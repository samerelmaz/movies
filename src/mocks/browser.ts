import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// Initialize the worker
export const worker = setupWorker(...handlers);

// Start the worker
worker.start({
  onUnhandledRequest: "bypass", // Don't warn on unhandled requests
});
