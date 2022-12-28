import "./App.css";
import useInput from "./useInput";
import useTabs from "./useTabs";
import useTitle from "./useTitle";
import useClick from "./useClick";
import useConfirm from "./useConfirm";
import usePreventLeave from "./usePreventLeave";
import useBeforeLeave from "./useBeforeLeave";
import useFadeIn from "./useFadeIn";
import useNetwork from "./useNetwork";
import { useRef } from "react";

const content = [
  {
    tab: "Option 1",
    content: "I'm the content of the Option 1",
  },
  {
    tab: "Option 2",
    content: "I'm the content of the Option 2",
  },
];

function App() {
  // useInput : input 유효성 검사(@ 적을 수 없게)
  const maxLen = (value) => !value.includes("@");
  const name = useInput("Mr.", maxLen);

  // useTabs : 선택하는 거에 따라 보이는 내용 바꾸기
  const { currentItem, changeItem } = useTabs(0, content);

  // useTitle : 웹페이지 title 바꾸기
  const titleUpdater = useTitle("Loading...");
  setTimeout(() => titleUpdater("Home"), 5000); // 5초 뒤 홈페이지 이름 바뀌게

  // useClick : h1의 클릭 이벤트를 감지해서 함수 실행
  const potato = useRef();
  setTimeout(() => console.log(potato.current.focus()), 5000); // input 창에 focus 효과
  const sayHello = () => console.log("say hello");
  const title = useClick(sayHello);

  // useConfirm : 버튼을 클릭하면 이벤트를 실행하기 전에 메세지를 보여줌
  const deleteWorld = () => console.log("Deleting the world.");
  const abort = () => console.log("Aborted");
  const confirmDelete = useConfirm("Are you sure?", deleteWorld, abort);

  // usePreventLeave : 끄기 전에 저장 확인
  const { enablePrevent, disablePrevent } = usePreventLeave();

  // useBeforeLeave : 마우스가 화면을 벗어나면 메세지 뜨게
  const begForLife = () => {
    console.log("Please not leave.");
  };
  useBeforeLeave(begForLife);

  // useFadeIn : 서서히 사라지는 애니메이션
  const fadeInH1 = useFadeIn(2);
  const fadeInP = useFadeIn(5);

  // useNetwork : online / offline이 되는 것을 막아줌.
  const handleNetworkChange = (online) => {
    console.log(online ? "we just went online" : "we are offline");
  };
  const online = useNetwork(handleNetworkChange);

  return (
    <div>
      <h2>You can't write down "@"</h2>
      <input placeholder="Name" {...name}></input>
      <h2>Select option</h2>
      <div>
        {content.map((section, index) => (
          <button onClick={() => changeItem(index)}>{section.tab}</button>
        ))}
      </div>
      <div>{currentItem.content}</div>
      <h2>Automatically focus after 5 seconds</h2>
      <input ref={potato} placeholder="input"></input>
      <h1 ref={title}>Click!</h1>
      <button onClick={confirmDelete}>Delete the world</button>
      <br></br>
      <button onClick={enablePrevent}>Protect</button>
      <button onClick={disablePrevent}>Unprotect</button>
      <h1 {...fadeInH1}>Fade In</h1>
      <p {...fadeInP}>lalalala</p>
      <h1>{handleNetworkChange}</h1>
    </div>
  );
}

export default App;
