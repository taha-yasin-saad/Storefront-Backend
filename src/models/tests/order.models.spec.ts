import { Order, OrderStore } from "../order.models";

const store = new OrderStore();

describe("Order Model", () => {
  let b: Order = {
    status: "completed",
    user_id: 1,
  };

  describe("The create method", () => {
    it("should have an create method", () => {
      expect(store.create).toBeDefined();
    });

    it("create method should return a order", async () => {
      const result = await store.create(b);
      expect(result).toEqual(b);
    });
  });

  describe("The index method", () => {
    it("should have an index method", () => {
      expect(store.index).toBeDefined();
    });

    it("index method should return a list of orders", async () => {
      const result = await store.index();
      expect(result).toEqual([b]);
    });
  });

  describe("The show method", () => {
    it("should have an show method", () => {
      expect(store.show).toBeDefined();
    });

    it("show method should return a one order", async () => {
      const result = await store.show("1");
      expect(result).toEqual(b);
    });
  });

  describe("The delete method", () => {
    it("should have an delete method", () => {
      expect(store.delete).toBeDefined();
    });

    it("delete method should delete a order", async () => {
      await store.delete("1");
      const result = await store.index();
      expect(result).toEqual([]);
    });
  });
});
