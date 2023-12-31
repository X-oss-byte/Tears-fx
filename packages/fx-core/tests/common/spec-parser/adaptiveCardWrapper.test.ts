// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { expect } from "chai";
import * as util from "util";
import "mocha";
import sinon from "sinon";
import { wrapAdaptiveCard } from "../../../src/common/spec-parser/adaptiveCardWrapper";
import { AdaptiveCard } from "../../../src/common/spec-parser/interfaces";
import { ConstantString } from "../../../src/common/spec-parser/constants";

describe("adaptiveCardWrapper", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("wrapAdaptiveCard", () => {
    it("should generate wrapped card correctly", () => {
      const card: AdaptiveCard = {
        type: "AdaptiveCard",
        version: "1.5",
        body: [
          {
            type: "TextBlock",
            text: "id: ${id}",
            wrap: true,
          },
          {
            type: "TextBlock",
            text: "petId: ${petId}",
            wrap: true,
          },
        ],
        $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
      };

      const expectedWrappedCard = {
        version: ConstantString.WrappedCardVersion,
        $schema: ConstantString.WrappedCardSchema,
        responseLayout: ConstantString.WrappedCardResponseLayout,
        responseCardTemplate: card,
        previewCardTemplate: {
          title: "title",
          subtitle: "subtitle",
        },
      };

      const wrappedCard = wrapAdaptiveCard(card, "title", "subtitle");

      expect(util.isDeepStrictEqual(wrappedCard, expectedWrappedCard)).to.be.true;
    });
  });
});
