import "./App.css";
import useInput from "./useInput";
import useTabs from "./useTabs";

const content = [
  {
    tab: "Section 1",
    content: "I'm the content od the Section 1",
  },
  {
    tab: "Section 2",
    content: "I'm the content of the Section 2",
  },
];

function App() {
  const maxLen = (value) => !value.includes("@");
  const name = useInput("Mr.", maxLen);

  const { currentItem, changeItem } = useTabs(0, content);

  return (
    <div>
      <input placeholder="Name" {...name}></input>
      <div>
        {content.map((section, index) => (
          <button onClick={() => changeItem(index)}>{section.tab}</button>
        ))}
      </div>
      {currentItem.content}
    </div>
  );
}

export default App;
