type Header = {
  [key: string]: string | undefined;
};

export type Options = {
  url: string;
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: string;
  header?: Header;
};
