class CartApi extends BaseApi {
  url;
  constructor() {
    super();
    this.url = "/cart";
  }

  VIETNAM() {
    return this.client.get(`/vietnam`);
  }

  DELETE(params = "") {
    return this.client.delete(`${this.url}/${params}`);
  }
  PUT(frm) {
    //console.log("body", body);
    return this.client.put(this.url, frm);
  }
  POST(frm) {
    //console.log("body", body);
    return this.client.post(this.url, frm);
  }
  GET(params = "") {
    //console.log(this.baseURL);
    return this.client.get(`${this.url}/${params}`);
  }
}
