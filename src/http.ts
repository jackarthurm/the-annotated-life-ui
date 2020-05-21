import { urlString } from './models/types';

export enum HttpMethod {
  GET,
  POST,
  PUT,
  PATCH,
  OPTIONS,
  DELETE,
  HEAD,
}

const HTTP_METHODS: Map<HttpMethod, string> = new Map([
  [HttpMethod.GET, 'get'],
  [HttpMethod.POST, 'post'],
  [HttpMethod.PUT, 'put'],
  [HttpMethod.PATCH, 'patch'],
  [HttpMethod.OPTIONS, 'options'],
  [HttpMethod.DELETE, 'delete'],
  [HttpMethod.HEAD, 'head'],
]);

export class NetworkError extends Error {}
export class RequestError extends Error {}
export class AbortedError extends RequestError {}
export class BadRequestError extends RequestError {}
export class UnauthenticatedError extends RequestError {}
export class ForbiddenError extends RequestError {}
export class ThrottledError extends RequestError {}

const HTTP_STATUS_CODE_TO_ERROR_TYPE: Map<number, any> = new Map<number, any>([
  [400, BadRequestError],
  [401, UnauthenticatedError],
  [403, ForbiddenError],
  [429, ThrottledError],
]);

export interface IAbortablePromise<T> {
  promise: Promise<T>;
  abort: () => void;
}

export function abortableFetch(
  url: urlString,
  method: HttpMethod,
  body: BodyInit,
  headers: Headers
): IAbortablePromise<Response> {
  const controller: AbortController = new AbortController();
  const abort: () => void = controller.abort.bind(controller);

  let request: Request = new Request(url, {
    method: HTTP_METHODS.get(method),
    headers,
    body,
    signal: controller.signal,
  });

  const promise: Promise<Response> = handledFetch(request);

  return {
    promise,
    abort,
  };
}

export async function nonAbortablefetch(
  url: urlString,
  method: HttpMethod,
  body?: BodyInit,
  headers?: Headers
): Promise<Response> {
  let request: Request = new Request(url, {
    method: HTTP_METHODS.get(method),
    headers,
    body,
  });

  return await handledFetch(request);
}

async function handledFetch(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> {
  /* Wrapper for the fetch API which adds error handling. */

  let response: Response;

  try {
    response = await fetch(input, init);
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new AbortedError(err.message);
    }

    const msg: string = err instanceof Error ? err.message : 'Unknown error';

    throw new NetworkError(msg);
  }

  await throwForErrorResponse(response);

  return response;
}

async function throwForErrorResponse(response: Response): Promise<void> {
  if (response.ok) {
    return;
  }

  const errMessage: string = await response.text();

  const RequestErrorType: any = HTTP_STATUS_CODE_TO_ERROR_TYPE.get(
    response.status
  );

  if (RequestErrorType === undefined) {
    // We throw a generic request error
    throw new RequestError(errMessage);
  }

  throw new RequestErrorType(errMessage);
}
