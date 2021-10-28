import { IncomingMessage } from "http";
import { parse } from "url";

export function parseRequest(req: IncomingMessage) {
  console.log(req.url);

  const { query = {} } = parse(req.url || "", true);
  const { title, author, debug, image, website } = query;

  if (Array.isArray(title)) {
    throw new Error("Expected a single title");
  }
  if (Array.isArray(author)) {
    throw new Error("Expected a single author");
  }
  if (Array.isArray(image)) {
    throw new Error("Expected a single image");
  }
  if (Array.isArray(website)) {
    throw new Error("Expected a single website");
  }

  if (!title) {
    throw new Error("no title");
  }
  if (!author) {
    throw new Error("no author");
  }
  if (!image) {
    throw new Error("no image");
  }
  if (!website) {
    throw new Error("no website");
  }

  const parsedRequest: ParsedRequest = {
    title,
    author,
    image,
    website,
    debug: debug ? true : false,
  };
  console.log(JSON.stringify(parsedRequest, null, 2));
  return parsedRequest;
}
