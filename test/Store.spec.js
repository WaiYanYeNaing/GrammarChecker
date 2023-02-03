import store from "@/store/index";

jest.mock("axios");
describe("store", () => {
  it("has a history state", () => {
    const localStore = store();
    expect(localStore.state.history).toEqual([]);
  });

  it("adds to history", () => {
    const localStore = store();
    localStore.commit("addToHistory", { someData: 123 });
    expect(localStore.state.history).toEqual([{ someData: 123 }]);
  });
});
