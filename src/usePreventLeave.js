const usePreventLeave = () => {
  const listener = (event) => {
    event.preventDefault();
    event.returnValue = "";
  };

  const enablePrevent = () => {
    window.addEventListener("beforeunload", listener); // 새로고침, 창닫기 막음
  };
  const disablePrevent = () => {
    window.removeEventListener("beforeunload", listener);
  };

  return { enablePrevent, disablePrevent };
};

export default usePreventLeave;
