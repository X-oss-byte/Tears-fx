// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as chai from "chai";
import "mocha";
import {
  Inputs,
  Platform,
  QTreeNode,
  StringArrayValidation,
  StringValidation,
  VsCodeEnv,
} from "../src/index";
import { FuncValidation, validate } from "../src/qm/validation";

describe("Question Model - Validation Test", () => {
  const inputs: Inputs = {
    platform: Platform.VSCode,
    vscodeEnv: VsCodeEnv.local,
  };
  describe("StringValidation", () => {
    it("equals", async () => {
      const validation: StringValidation = { equals: "123" };
      const value1 = "123";
      const res1 = await validate(validation, value1, inputs);
      chai.assert.isTrue(res1 === undefined);
      const value2 = "1234";
      const res2 = await validate(validation, value2, inputs);
      chai.assert.isTrue(res2 !== undefined);
      const value3 = "";
      const res3 = await validate(validation, value3, inputs);
      chai.assert.isTrue(res3 !== undefined);
      const value4 = undefined;
      const res4 = await validate(validation, value4, inputs);
      chai.assert.isTrue(res4 !== undefined);
    });

    it("notEquals", async () => {
      const validation: StringValidation = { notEquals: "123" };
      const value1 = "123";
      const res1 = await validate(validation, value1, inputs);
      chai.assert.isTrue(res1 !== undefined);
      const value2 = "1234";
      const res2 = await validate(validation, value2, inputs);
      chai.assert.isTrue(res2 === undefined);
      const value3 = "";
      const res3 = await validate(validation, value3, inputs);
      chai.assert.isTrue(res3 === undefined);
      const value4 = undefined;
      const res4 = await validate(validation, value4, inputs);
      chai.assert.isTrue(res4 === undefined);
    });

    it("minLength,maxLength", async () => {
      const validation: StringValidation = { minLength: 2, maxLength: 5 };
      const value1 = "a";
      const res1 = await validate(validation, value1, inputs);
      chai.assert.isTrue(res1 !== undefined);
      const value2 = "aa";
      const res2 = await validate(validation, value2, inputs);
      chai.assert.isTrue(res2 === undefined);
      const value3 = "aaaa";
      const res3 = await validate(validation, value3, inputs);
      chai.assert.isTrue(res3 === undefined);
      const value4 = "aaaaaa";
      const res4 = await validate(validation, value4, inputs);
      chai.assert.isTrue(res4 !== undefined);
      const value5 = undefined;
      const res5 = await validate(validation, value5, inputs);
      chai.assert.isTrue(res5 !== undefined);
    });

    it("enum", async () => {
      const validation: StringValidation = { enum: ["1", "2", "3"] };
      const value1 = "1";
      const res1 = await validate(validation, value1, inputs);
      chai.assert.isTrue(res1 === undefined);
      const value2 = "3";
      const res2 = await validate(validation, value2, inputs);
      chai.assert.isTrue(res2 === undefined);
      const value3 = "4";
      const res3 = await validate(validation, value3, inputs);
      chai.assert.isTrue(res3 !== undefined);
      const value4 = undefined;
      const res4 = await validate(validation, value4, inputs);
      chai.assert.isTrue(res4 !== undefined);
    });

    it("pattern", async () => {
      const validation: StringValidation = { pattern: "^[0-9a-z]+$" };
      const value1 = "1";
      const res1 = await validate(validation, value1, inputs);
      chai.assert.isTrue(res1 === undefined);
      const value2 = "asb13";
      const res2 = await validate(validation, value2, inputs);
      chai.assert.isTrue(res2 === undefined);
      const value3 = "as--123";
      const res3 = await validate(validation, value3, inputs);
      chai.assert.isTrue(res3 !== undefined);
      const value4 = undefined;
      const res4 = await validate(validation, value4, inputs);
      chai.assert.isTrue(res4 !== undefined);
    });

    it("startsWith", async () => {
      const validation: StringValidation = { startsWith: "123" };
      const value1 = "123";
      const res1 = await validate(validation, value1, inputs);
      chai.assert.isTrue(res1 === undefined);
      const value2 = "234";
      const res2 = await validate(validation, value2, inputs);
      chai.assert.isTrue(res2 !== undefined);
      const value3 = "1234";
      const res3 = await validate(validation, value3, inputs);
      chai.assert.isTrue(res3 === undefined);
      const value4 = undefined;
      const res4 = await validate(validation, value4, inputs);
      chai.assert.isTrue(res4 !== undefined);
    });

    it("endsWith", async () => {
      const validation: StringValidation = { endsWith: "123" };
      const value1 = "123";
      const res1 = await validate(validation, value1, inputs);
      chai.assert.isTrue(res1 === undefined);
      const value2 = "234";
      const res2 = await validate(validation, value2, inputs);
      chai.assert.isTrue(res2 !== undefined);
      const value3 = "345sdf123";
      const res3 = await validate(validation, value3, inputs);
      chai.assert.isTrue(res3 === undefined);
      const value4 = undefined;
      const res4 = await validate(validation, value4, inputs);
      chai.assert.isTrue(res4 !== undefined);
    });

    it("startsWith,endsWith", async () => {
      const validation: StringValidation = { startsWith: "123", endsWith: "789" };
      const value1 = "123";
      const res1 = await validate(validation, value1, inputs);
      chai.assert.isTrue(res1 !== undefined);
      const value2 = "123asfsdwer7892345789";
      const res2 = await validate(validation, value2, inputs);
      chai.assert.isTrue(res2 === undefined);
      const value3 = "sadfws789";
      const res3 = await validate(validation, value3, inputs);
      chai.assert.isTrue(res3 !== undefined);
      const value4 = undefined;
      const res4 = await validate(validation, value4, inputs);
      chai.assert.isTrue(res4 !== undefined);
    });

    it("includes", async () => {
      const validation: StringValidation = { includes: "123" };
      const value1 = "123";
      const res1 = await validate(validation, value1, inputs);
      chai.assert.isTrue(res1 === undefined);
      const value2 = "123asfsdwer7892345789";
      const res2 = await validate(validation, value2, inputs);
      chai.assert.isTrue(res2 === undefined);
      const value3 = "sadfws789";
      const res3 = await validate(validation, value3, inputs);
      chai.assert.isTrue(res3 !== undefined);
      const value4 = undefined;
      const res4 = await validate(validation, value4, inputs);
      chai.assert.isTrue(res4 !== undefined);
    });

    it("includes,startsWith,endsWith", async () => {
      const validation: StringValidation = { startsWith: "123", endsWith: "789", includes: "abc" };
      const value1 = "123";
      const res1 = await validate(validation, value1, inputs);
      chai.assert.isTrue(res1 !== undefined);
      const value2 = "123asfabcer7892345789";
      const res2 = await validate(validation, value2, inputs);
      chai.assert.isTrue(res2 === undefined);
      const value3 = "123sadfws789";
      const res3 = await validate(validation, value3, inputs);
      chai.assert.isTrue(res3 !== undefined);
      const value4 = "abc789";
      const res4 = await validate(validation, value4, inputs);
      chai.assert.isTrue(res4 !== undefined);
      const value5 = undefined;
      const res5 = await validate(validation, value5, inputs);
      chai.assert.isTrue(res5 !== undefined);
    });

    it("includes,startsWith,endsWith,maxLength", async () => {
      const validation: StringValidation = {
        startsWith: "123",
        endsWith: "789",
        includes: "abc",
        maxLength: 10,
      };
      const value1 = "123";
      const res1 = await validate(validation, value1, inputs);
      chai.assert.isTrue(res1 !== undefined);
      const value2 = "123asfabcer7892345789";
      const res2 = await validate(validation, value2, inputs);
      chai.assert.isTrue(res2 !== undefined);
      const value3 = "123sadfws789";
      const res3 = await validate(validation, value3, inputs);
      chai.assert.isTrue(res3 !== undefined);
      const value4 = "123abch789";
      const res4 = await validate(validation, value4, inputs);
      chai.assert.isTrue(res4 === undefined);
    });

    it("excludesEnum", async () => {
      const validation: StringValidation = { excludesEnum: ["1", "2", "3"] };
      const value1 = "1";
      const res1 = await validate(validation, value1, inputs);
      chai.assert.isTrue(res1 !== undefined);
      const value2 = "3";
      const res2 = await validate(validation, value2, inputs);
      chai.assert.isTrue(res2 !== undefined);
      const value3 = "4";
      const res3 = await validate(validation, value3, inputs);
      chai.assert.isUndefined(res3);
      const value4 = undefined;
      const res4 = await validate(validation, value4, inputs);
      chai.assert.isUndefined(res4);
    });
  });

  describe("StringArrayValidation", () => {
    it("maxItems,minItems", async () => {
      const validation: StringArrayValidation = { maxItems: 3, minItems: 1 };
      const value1 = ["1", "2", "3"];
      const res1 = await validate(validation, value1, inputs);
      chai.assert.isTrue(res1 === undefined);
      const value2 = ["1", "2", "3", "4"];
      const res2 = await validate(validation, value2, inputs);
      chai.assert.isTrue(res2 !== undefined);
      const value3 = ["1", "2"];
      const res3 = await validate(validation, value3, inputs);
      chai.assert.isTrue(res3 === undefined);
      const value4: string[] = [];
      const res4 = await validate(validation, value4, inputs);
      chai.assert.isTrue(res4 !== undefined);
      const value5 = undefined;
      const res5 = await validate(validation, value5, inputs);
      chai.assert.isTrue(res5 !== undefined);
    });

    it("uniqueItems", async () => {
      const validation: StringArrayValidation = { uniqueItems: true };
      const value1 = ["1", "2", "3"];
      const res1 = await validate(validation, value1, inputs);
      chai.assert.isTrue(res1 === undefined);
      const value2 = ["1", "2", "1", "2"];
      const res2 = await validate(validation, value2, inputs);
      chai.assert.isTrue(res2 !== undefined);
      const value3 = ["1", "2"];
      const res3 = await validate(validation, value3, inputs);
      chai.assert.isTrue(res3 === undefined);
      const value4: string[] = [];
      const res4 = await validate(validation, value4, inputs);
      chai.assert.isTrue(res4 === undefined);
      const value5 = undefined;
      const res5 = await validate(validation, value5, inputs);
      chai.assert.isTrue(res5 !== undefined);
    });

    it("equals", async () => {
      const validation: StringArrayValidation = { equals: ["1", "2", "3"] };
      const value1 = ["1", "2", "3"];
      const res1 = await validate(validation, value1, inputs);
      chai.assert.isTrue(res1 === undefined);
      const value2 = ["1", "2", "1", "2"];
      const res2 = await validate(validation, value2, inputs);
      chai.assert.isTrue(res2 !== undefined);
      const value3 = ["1", "2"];
      const res3 = await validate(validation, value3, inputs);
      chai.assert.isTrue(res3 !== undefined);
      const value4: string[] = [];
      const res4 = await validate(validation, value4, inputs);
      chai.assert.isTrue(res4 !== undefined);
      const value5 = undefined;
      const res5 = await validate(validation, value5, inputs);
      chai.assert.isTrue(res5 !== undefined);
    });

    it("enum", async () => {
      const validation: StringArrayValidation = { enum: ["1", "2", "3"] };
      const value1 = ["1", "2", "3"];
      const res1 = await validate(validation, value1, inputs);
      chai.assert.isTrue(res1 === undefined);
      const value2 = ["1", "2", "4", "2"];
      const res2 = await validate(validation, value2, inputs);
      chai.assert.isTrue(res2 !== undefined);
      const value3 = ["1", "2"];
      const res3 = await validate(validation, value3, inputs);
      chai.assert.isTrue(res3 === undefined);
      const value4: string[] = [];
      const res4 = await validate(validation, value4, inputs);
      chai.assert.isTrue(res4 === undefined);
      const value5 = undefined;
      const res5 = await validate(validation, value5, inputs);
      chai.assert.isTrue(res5 !== undefined);
    });

    it("contains", async () => {
      const validation: StringArrayValidation = { contains: "4" };
      const value1 = ["1", "2", "3"];
      const res1 = await validate(validation, value1, inputs);
      chai.assert.isTrue(res1 !== undefined);
      const value2 = ["1", "2", "4", "2"];
      const res2 = await validate(validation, value2, inputs);
      chai.assert.isTrue(res2 === undefined);
      const value3 = ["1", "2"];
      const res3 = await validate(validation, value3, inputs);
      chai.assert.isTrue(res3 !== undefined);
      const value4: string[] = [];
      const res4 = await validate(validation, value4, inputs);
      chai.assert.isTrue(res4 !== undefined);
      const value5 = undefined;
      const res5 = await validate(validation, value5, inputs);
      chai.assert.isTrue(res5 !== undefined);
    });

    it("containsAll", async () => {
      const validation: StringArrayValidation = { containsAll: ["1", "2"] };
      const value1 = ["1", "2", "3"];
      const res1 = await validate(validation, value1, inputs);
      chai.assert.isTrue(res1 === undefined);
      const value2 = ["1", "2", "4", "2"];
      const res2 = await validate(validation, value2, inputs);
      chai.assert.isTrue(res2 === undefined);
      const value3 = ["1", "3"];
      const res3 = await validate(validation, value3, inputs);
      chai.assert.isTrue(res3 !== undefined);
      const value4: string[] = [];
      const res4 = await validate(validation, value4, inputs);
      chai.assert.isTrue(res4 !== undefined);
      const value5 = undefined;
      const res5 = await validate(validation, value5, inputs);
      chai.assert.isTrue(res5 !== undefined);
    });

    it("containsAny", async () => {
      const validation: StringArrayValidation = { containsAny: ["1", "2"] };
      const value1 = ["1", "2", "3"];
      const res1 = await validate(validation, value1, inputs);
      chai.assert.isTrue(res1 === undefined);
      const value2 = ["4", "5", "6", "1"];
      const res2 = await validate(validation, value2, inputs);
      chai.assert.isTrue(res2 === undefined);
      const value3 = ["5", "7"];
      const res3 = await validate(validation, value3, inputs);
      chai.assert.isTrue(res3 !== undefined);
      const value4: string[] = [];
      const res4 = await validate(validation, value4, inputs);
      chai.assert.isTrue(res4 !== undefined);
      const value5 = undefined;
      const res5 = await validate(validation, value5, inputs);
      chai.assert.isTrue(res5 !== undefined);
    });
  });

  it("FuncValidation", async () => {
    const validation: FuncValidation<string> = {
      validFunc: function (input: string): string | undefined | Promise<string | undefined> {
        if ((input as string).length > 5) return "length > 5";
        return undefined;
      },
    };
    const value1 = "123456";
    const res1 = await validate(validation, value1, inputs);
    chai.assert.isTrue(res1 !== undefined);
    const value2 = "12345";
    const res2 = await validate(validation, value2, inputs);
    chai.assert.isTrue(res2 === undefined);
    const value3 = "";
    const res3 = await validate(validation, value3, inputs);
    chai.assert.isTrue(res3 === undefined);
  });
  it("FuncValidation 2", async () => {
    const validation = (inputs: Inputs) => {
      const input = inputs.input as string;
      return input.length <= 5;
    };
    const inputs: Inputs = {
      platform: Platform.VSCode,
    };
    inputs.input = "123456";
    const res1 = await validate(validation, "", inputs);
    chai.assert.isTrue(res1 !== undefined);
    inputs.input = "12345";
    const res2 = await validate(validation, "", inputs);
    chai.assert.isTrue(res2 === undefined);
    inputs.input = "";
    const res3 = await validate(validation, "", inputs);
    chai.assert.isTrue(res3 === undefined);
  });
});

describe("Question Model - QTreeNode", () => {
  it("QTreeNode", async () => {
    const node = new QTreeNode({
      type: "group",
    });
    const child1 = new QTreeNode({ type: "group" });
    node.addChild(child1);
    const child2 = new QTreeNode({ type: "text", name: "name", title: "title" });
    child1.addChild(child2);
    node.trim();
    chai.assert.isTrue(node.children!.length === 1);
    chai.assert.isTrue(node.children![0]!.data!.name === "name");
  });
});
