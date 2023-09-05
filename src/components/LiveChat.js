import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateRandomName, randomMessage } from "../utils/helper";

const LiveChat = () => {
  const [liveMessage, setLiveMessage] = useState("");
  const dispatch = useDispatch();

  const chatMessages = useSelector((store) => store.chat.messages);

  useEffect(() => {
    const i = setInterval(() => {
      //api polling
      dispatch(
        addMessage({
          name: generateRandomName(),
          message:
            randomMessage(20) + `this is ${generateRandomName()} here 🙋‍♂️`,
        })
      );
    }, 1500);

    return () => clearInterval(i);
  }, []);
  return (
    <>
      <div className="w-full h-[600px] ml-2 p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
        <div>
          {chatMessages.map((c, index) => {
            return (
              <ChatMessage key={index} name={c.name} message={c.message} />
            );
          })}
        </div>
      </div>

      <form
        className="w-full p-2 ml-2 border border-black-100"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("hi", liveMessage);
          dispatch(
            addMessage({
              name: "shubham",
              message: liveMessage,
            })
          );
          setLiveMessage("  ");
        }}
      >
        <input
          type="text"
          className="w-96 px-2"
          value={liveMessage}
          onChange={(e) => {
            setLiveMessage(e.target.value);
          }}
        />
        <dutton className="px-2 mx-2 bg-green-100">Send</dutton>
      </form>
    </>
  );
};

export default LiveChat;
