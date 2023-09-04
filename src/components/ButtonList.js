import React from "react";
import Button from "./Button";

const list = ["All", "Gaming", "Live", "Cricket","Soccer","News","Movies","cricket","South","Holywood"];

const ButtonList = () => {
  return (
    <div className="flex">
      {list.map((item) => {
        return <Button name={item}/>
      })}
    </div>
  );
};

export default ButtonList;
