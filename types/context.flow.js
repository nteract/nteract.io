export type ServerContext<Query> = {
  req: { params: Array<string>, headers: Headers },
  res: {},
  pathname: string,
  query: Query,
  err: Error,
};

export type ClientContext<Query> = {
  req?: { headers: Headers },
  pathname: string,
  query: Query,
  jsonPageRes?: Response,
  err: Error,
};

export type Context<Query> = ClientContext<Query> | ServerContext<Query>;

export type DocumentContext<Query> = Context<Query> & { renderPage: Function };

export type EmptyQuery = {};

export type Platforms = 'macOS' | 'Linux' | 'Windows';
export type OSProps = {
  platform: Platforms,
  assetUrl: string,
};
