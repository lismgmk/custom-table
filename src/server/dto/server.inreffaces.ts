export interface IRequestServer {
  endpoint: string;
  method: string;
  data: { list: string[] };
}
