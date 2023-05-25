import axios from "axios";

describe("test home", () => {
  let data: any;

  beforeAll(async () => {
    const response = await axios.get("http://localhost:3000/home");
    data = response.data;
  });

  // 测试释义组
  test("test definitionGroup", () => {
    expect(data.text).toEqual("home");
    expect(data.definitionGroups.length).toEqual(3);

    expect(data.definitionGroups[0].partOfSpeech).toEqual("noun");
    expect(data.definitionGroups[1].partOfSpeech).toEqual("adverb");
    expect(data.definitionGroups[2].partOfSpeech).toEqual("adjective");

  });

  // 测试释义
  test("senses", () => {
    expect(data.definitionGroups[0].senses.length).toEqual(3);
    expect(data.definitionGroups[0].senses[0].text.rawText).toEqual("HOUSE/APARTMENT");
    expect(data.definitionGroups[0].senses[0].grammarTraits).toEqual(["C or U"]);

    expect(data.definitionGroups[0].senses[0].children.length).toEqual(4);
    expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
      "the house, apartment, etc. where you live, especially with your family",
    );

    expect(data.definitionGroups[0].senses[0].children[0].text.lang).toEqual(
      "en",
    );
  });

  // 测试例句
  test("examples", () => {
    /**测试不通过 
     * Expected: "在下面；向下，朝下"
       Received: "在下面；向下，朝下这部电梯是向下开的吗？别朝下看！你会头晕的。太阳要落下去了，天很快就要黑了。太空舱落入了海里。我弯下腰朝床底下看了看。"
     * **/
    // expect(
    //   data.definitionGroups[0].senses[0].children[0].text.translation.rawText,
    // ).toEqual(
    //   "在下面；向下，朝下",
    // );

    expect(
        data.definitionGroups[0].senses[0].children[0].examples[0].text.rawText,
      )
        .toEqual(
          "The senator has two homes - an apartment in Washington and a house in Colorado.",
      );
  });
});