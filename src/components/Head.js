import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toogleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constant";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();

  /**
   * {
   * "iphone":["iphone1","iphoe3"...]
   * }
   *
   *
   */

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestion(searchCache[searchQuery]);
      } else {
        getSearchSugesation();
      }
      getSearchSugesation();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  /**
   * pressed key-i
   * render the component
   * useEffect();
   * start a timer -> make api call after 200ms
   *
   * pressed key-ip
   * render the component again
   * again call useEffect()
   * start a timer -> make api call after 200ms
   *
   *
   *
   *
   */

  const getSearchSugesation = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggestion(json[1]);
    // update cache
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  const tooleMenuHandler = () => {
    dispatch(toogleMenu());
  };

  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1 justify-between">
        <img
          onClick={() => tooleMenuHandler()}
          className="h-8 cursor-pointer"
          alt="menu"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEX///8iICGSkZIkHyEPDA3z8vIyMTEhGx40MDEeHB4jICEeHR4AAAAxMTEgHh4gHB3W1tYtKyyXlpe6uroKBQhzcnJ+fX7CwsKysrJmZWX19fXk5OQYFhc5ODgoJidta2xUVFRfXV7Kysqsq6yjo6MHDa+eAAAB8UlEQVR4nO3c3VLaQBgGYJY/IQtE1Iogrfbn/q+xCaQ2TqtFm222+jwHDC8MMO8EdjnY+QYDAAAAAAAAAAAAAAAAeI/OL4Z5uDhP0m+yXYwzcbX4cJug4d045GN8Pem84GYd+67VUq6/dN7wou9Sjy1u0jQcjUZ9V2skaHhZfUuLbBrGYtN5w8F2HLNpGFOsNIPddlo3XGUgTK9T7BbVFzWbHX+zS1IQAAAAAAAAAABeZJKHVPXO76dHs9msul1OH+JfpOmr0ufuz15Wbhb78uzBvJzPWym2U/XU6Sk+lc6eTnEfv3Zf8PZjeTib2AihnYpwOJl5Qhp1kULY33d/1Pvbp9XTDcO/bhjGl503HD5uUX/Mn1PxTPr964pTUkhygra+hj9U16V10LS6+/pUtFLxTAo/00GCa1j/DhtFDw2Lxw1T/A7rtTRWS+ZhES2rdS3O22lep/qBX1LZSmetFI+pfvzk1HximrW03g9ns4edadboIy2XafbDWt9/Zhqp6gEAAAAAAAAAwAu89Zl7u+00xFXse2ZiLdHcxO24PLx7DpLMvrxcHy9f3+WOUswvHYZVRg2TTNktqnqjTCa0Jmm4WZcZNUwxC3pwd5VPwyLJlN3JdnHV9zD2RqKZ7G9/rj4AAAAAAAAAAAAAAAD8T74DVhZG6MsBqOQAAAAASUVORK5CYII="
        />

        <a href="/">
          <img
            className="h-8 mx-2"
            alt="logo"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ145F532Uu265HlYl-QRkMyJn3WM-eqo_EYw&usqp=CAU"
          />
        </a>
      </div>
      <div className="col-span-10 px-10">
        <div>
          <input
            className="w-1/2 border border-gray-400 p-2 rounded-l-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestion(true)}
            onBlur={() => setShowSuggestion(false)}
            type="text"
          />
          <button className="border border-gray-400 p-2  rounded-r-full bg-gray-100">
            Search
          </button>
          {showSuggestion && (
            <div className=" bg-white py-2 px-2 w-[37rem] shadow-lg rounded-lg border border-gray-100 absolute">
              <ul>
                {suggestion.map((item) => {
                  return (
                    <li
                      key={item}
                      className="py-2 px-3 shadow-sm hover:bg-gray-100"
                    >
                      🔍{item}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="col-span-1">
        <img
          className="h-8"
          alt="user"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAMAAAAqJH57AAAAY1BMVEUAAAD///+2trb39/cmJiby8vLf39+6urpubm5MTEyEhITT09Pu7u69vb3Q0NB4eHgcHBw9PT0wMDDm5uarq6uNjY2kpKQPDw+dnZ1fX1/Z2dnGxsZVVVVnZ2cXFxdDQ0OVlZXVc5RmAAAENElEQVRogc2b6ZKqMBCFI4uAsgjKooLy/k959U6NCiTpLVhz/stXCTHdfbpRG462UVMk1U3dqqRooi3rGYr+kyw+qKkOcbY+eVsHSqegpq6cRt4WrZb7VFvQ2BSyPxqxPxr9dcj7CgA/9ny/BrkBuU917slnFFips2NymCDBSt1Dl+TwjgYrVaYOyfgV/1+1O/JAAiPfNYaMO9WfwpxwBHlLBit1cUKGL5ClAhfkjgHG7DdIPrLASh3F5B2TvJOSj/MsAKsbtGiIzHvLT41CcskmlzLylQ1W6ioic8/XU8AZA8j8zVaqkpCP5oQPVms/3Xay5DUrZU/C7eSTiNwIyIWIXAjItFxkLntuYidzAuRb9lBpJ4vACnj2HyVL/s4ysuw92y8xO7kXkRMBWRIwZP9nT0Q+Cciye9seoO3kVBSr7JUdEJ8pNeRcQGEHkEcBuRaR9wIy4Jn82dxTkBvY8wKYnHIv0ADyLMC6iltkQCUGTE71Pqd4yYj6mXeDeuBzEZ4BJxmzhyksOWWQwbod5w1lZDDGaEf5YdQwDfoFaPImJoFj1DORjivFBRxwj8S6zPg6B7digr9dI8FAbGSQkZkRvn1E6GOEcA6cIF11Inmziex3eBBRHkbrV4WNOWhWDWHBZPKD7en3PPFoXFZf8tL1010P+g7hZzsgPxTm2Rj3ZVX28Zjl1NVKyC70h8n+3quTQznimlCPF9ElVVJ7e7A5CniA2fB7mAI4v3nq9ZcPhozvAebDxFaP4WWnk3B6GHIO2T8t8q9bZ99Cv7kt/uYn409MZE97WVUWtq+/30rTlaon783V606/g7k5Y7rrrxktGci7Ym86UbD1gLxBG7M15AumfqziuvEir6ljTOF11ww/LMkyV8akZcawIPPbRHYtito5WeaA2TR/2epb4AV6Sl5rq3/UmMmytgWsk4mcrwxWKteT2ZYIXlWqJVMnKDgadOS1X/KPmiU5XUS4VfRuGb7ItBKZr/OcfPkS+H2+f8nYISy5+imZMyfD1XZCHr9IHidkrCPgnrz+xfmWPz1h3/pTvcPGL9n/FvjliL5ukuhL5OUdJuzsY/UO0W9yKJkdweqjVfkRJb9wgX7Ogn7mJOtk2p/6rHMmedja98kk3Z/mnrJONyRL7imbUII06yPNawzZ7IpNc6N/TvbXQi86DIuKDuHoOgFrqlh/jfREU7vrPAP3cUs38ap1K0bHYK3Rr3doZDMVMx30jpzBlbq4q7HOBivY5IeFrmp44ziL2X3MeI3nqXrzFzEW3zOV5wq2KW6r15tLBlkeJavV7AX8bY8/vnMXzpMYrFdQPTBPjOomZPQgMrj5NuHxvgvKOS9HRK8f3UFJozNubL6Kc+TnXfjezTGDbN223OXYRgu1a5SfdoZ8qU1q4teL9H6Vf7l6XXFOqqBVbVAmw67xroxPJv8By6c24wflpjoAAAAASUVORK5CYII="
        />
      </div>
    </div>
  );
};

export default Head;
