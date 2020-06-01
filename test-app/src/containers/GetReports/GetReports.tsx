import React, { useEffect } from "react";
import { IGetReportsProps } from "./GetReports.type";

const GetReports: React.FC<IGetReportsProps> = () => {
  const getData = () => {
    fetch("http://localhost:9000/download", {
      method: "GET",
      cache: "reload",
    })
      .then((res) => {
        console.log(res);
        return res;
      })
      .then((data) => {
        console.log(data);
      });
  };

  return <button onClick={getData}>Нажми меня</button>;
};

export default GetReports;
