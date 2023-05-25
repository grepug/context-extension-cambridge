import axios from "axios";

describe("test look", () => {
  let data: any;

  beforeAll(async () => {
    const response = await axios.get("http://localhost:3000/look");
    data = response.data;
  });

  // 测试释义组
  test("test definitionGroup", () => {
    expect(data.text).toEqual("look");
    expect(data.definitionGroups.length).toEqual(3);

    expect(data.definitionGroups[0].partOfSpeech).toEqual("verb");
    expect(data.definitionGroups[1].partOfSpeech).toEqual("noun");
    expect(data.definitionGroups[2].partOfSpeech).toEqual("exclamation");
  });

  // 测试释义
  test("senses", () => {
    expect(data.definitionGroups[0].senses.length).toEqual(6);
    expect(data.definitionGroups[0].senses[0].text.rawText).toEqual("SEE");
    expect(data.definitionGroups[0].senses[0].grammarTraits).toEqual(["I"]);

    expect(data.definitionGroups[0].senses[0].children.length).toEqual(1);
    expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
      "to direct your eyes in order to see",
    );

    expect(data.definitionGroups[0].senses[0].children[0].text.lang).toEqual(
      "en",
    );
  });

  // 测试例句
  test("examples", () => {
    expect(
      data.definitionGroups[0].senses[0].children[0].text.translation.rawText,
    ).toEqual(
      "看，瞧，注视",
    );

    expect(
      data.definitionGroups[0].senses[0].children[0].examples[0].text.rawText,
    )
      .toEqual(
        "Look! There's grandma.",
      );
  });
});
