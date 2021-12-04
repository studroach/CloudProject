class ServerCom {
  constructor(){
    this.makeRequest();
  }

  async makeRequest() {
    window.api.dataRequest("dataRequest")
  }
}
