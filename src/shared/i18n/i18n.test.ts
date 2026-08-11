import { describe, it, expect } from "vitest";
import i18n from "./config";

describe("i18n multilingual system", () => {
  it("should support en, kn, and hi languages", () => {
    expect(i18n.options.resources).toHaveProperty("en");
    expect(i18n.options.resources).toHaveProperty("kn");
    expect(i18n.options.resources).toHaveProperty("hi");
  });

  it("should default to English and translate nav.home", () => {
    i18n.changeLanguage("en");
    expect(i18n.t("nav.home")).toBe("Home");
  });

  it("should translate nav.home to Kannada", () => {
    i18n.changeLanguage("kn");
    expect(i18n.t("nav.home")).toBe("ಮುಖಪುಟ");
  });

  it("should translate nav.home to Hindi", () => {
    i18n.changeLanguage("hi");
    expect(i18n.t("nav.home")).toBe("होम");
  });
});
