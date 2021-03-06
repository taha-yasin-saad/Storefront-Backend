import { User, UserStore } from "../user.models";

const store = new UserStore();

describe("User Model", () => {
  let b: User = {
    first_name: "Bary",
    last_name: "Alen",
    username: "alen001",
    password: "123456789",
    phone: 123456789,
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  };

  describe("The create method", () => {
    it("should have an create method", () => {
      expect(store.create).toBeDefined();
    });

    it("create method should return a user", async () => {
      const result = await store.create(b);
      expect(result).toEqual(b);
    });
  });

  describe("The index method", () => {
    it("should have an index method", () => {
      expect(store.index).toBeDefined();
    });

    it("index method should return a list of users", async () => {
      const result = await store.index();
      expect(result).toEqual([b]);
    });
  });

  describe("The show method", () => {
    it("should have an show method", () => {
      expect(store.show).toBeDefined();
    });

    it("show method should return a one user", async () => {
      const result = await store.show("1");
      expect(result).toEqual(b);
    });
  });

  describe("The delete method", () => {
    it("should have an delete method", () => {
      expect(store.delete).toBeDefined();
    });

    it("delete method should delete a user", async () => {
      await store.delete("1");
      const result = await store.index();
      expect(result).toEqual([]);
    });
  });
});
