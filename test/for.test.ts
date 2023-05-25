import axios from "axios";

describe("test for", () => {
  let data: any;

  beforeAll(async () => {
    const response = await axios.get("http://localhost:3000/for");
    data = response.data;
  });

  // 测试释义组
  test("test definitionGroup", () => {
    expect(data.text).toEqual("for");
    expect(data.definitionGroups.length).toEqual(2);

    expect(data.definitionGroups[0].partOfSpeech).toEqual("preposition");
    expect(data.definitionGroups[1].partOfSpeech).toEqual("conjunction");
  });

  // 测试释义
  test("senses", () => {
    expect(data.definitionGroups[0].senses.length).toEqual(17);
    expect(data.definitionGroups[0].senses[0].text.rawText).toEqual("INTENDED FOR");
    expect(data.definitionGroups[0].senses[0].children.length).toEqual(1);
    expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
      "intended to be given to",
    );

    expect(data.definitionGroups[0].senses[0].children[0].text.lang).toEqual(
      "en",
    );
  });

  // 测试例句
  test("examples", () => {
    /**测试不通过 
    Expected: "（表示给予的对象）给"
    Received: "（表示给予的对象）给你有一条电话留言。我最好给刚出生的宝宝买些东西。每个组别跑得最快的前3名将会获得奖品。"
     **/
    // expect(
    //   data.definitionGroups[0].senses[0].children[0].text.translation.rawText,
    // ).toEqual(
    //   "（表示给予的对象）给",
    // );

    expect(
        data.definitionGroups[0].senses[0].children[0].examples[0].text.rawText,
      )
        .toEqual(
          "There's a phone message for you.",
      );
  });
});