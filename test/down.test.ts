import axios from "axios";

describe("test look", () => {
  let data: any;

  beforeAll(async () => {
    const response = await axios.get("http://localhost:3000/down");
    data = response.data;
  });

  // 测试释义组
  test("test definitionGroup", () => {
  });

  // 测试释义
  test("senses", () => {
  });

  // 测试例句
  test("examples", () => {
  });
});