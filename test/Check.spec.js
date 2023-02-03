import { mount } from "@vue/test-utils";
import Check from "@/components/Check.vue";
import axios from "axios";
import store from "@/store/index";

jest.mock("axios");

describe("Check component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Check);
  });

  it("should render a textarea", () => {
    expect(wrapper.find("textarea").exists()).toBe(true);
  });

  it("should render a button", () => {
    expect(wrapper.find("button").exists()).toBe(true);
  });

  it("calls API and displays errors", async () => {
    axios.request.mockResolvedValue({
      data: {
        matches: [
          {
            message: "Spelling mistake",
            replacements: [{ value: "book" }],
          },
        ],
      },
    });

    wrapper.find("button").trigger("click");
    await wrapper.vm.$nextTick();
    expect(axios.request).toHaveBeenCalled();
    expect(wrapper.html()).toContain("Spelling mistake");
    expect(wrapper.html()).toContain("book");
  });
});
